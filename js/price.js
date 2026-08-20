/*
This file is licensed under the MIT License (MIT) available on
https://opensource.org/licenses/MIT.
*/

/*global Intl */

(function() {
    'use strict';

    var COINGECKO_ROOT = 'https://api.coingecko.com/api/v3';
    var BLOCKCHAIN_TICKER = 'https://blockchain.info/ticker?cors=true';
    var BLOCKCHAIN_CHART = 'https://api.blockchain.info/charts/market-price';
    var CURRENT_CACHE_KEY = 'bitcoin-org-price-current-v1';
    var CHART_CACHE_PREFIX = 'bitcoin-org-price-chart-v1-';
    var PREFERENCE_KEY = 'bitcoin-org-price-currency';
    var CURRENT_TTL = 5 * 60 * 1000;
    var REQUEST_TIMEOUT = 8000;
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

    var currencies = {
        usd: { code: 'USD', name: 'US dollars' },
        eur: { code: 'EUR', name: 'euros' },
        gbp: { code: 'GBP', name: 'British pounds' },
        jpy: { code: 'JPY', name: 'Japanese yen' },
        cad: { code: 'CAD', name: 'Canadian dollars' },
        aud: { code: 'AUD', name: 'Australian dollars' },
        chf: { code: 'CHF', name: 'Swiss francs' },
        cny: { code: 'CNY', name: 'Chinese yuan' },
        inr: { code: 'INR', name: 'Indian rupees' },
        brl: { code: 'BRL', name: 'Brazilian reais' },
        mxn: { code: 'MXN', name: 'Mexican pesos' },
        zar: { code: 'ZAR', name: 'South African rand' },
        ngn: { code: 'NGN', name: 'Nigerian naira' },
        sgd: { code: 'SGD', name: 'Singapore dollars' }
    };

    var currencyOrder = [
        'usd', 'eur', 'gbp', 'jpy', 'cad', 'aud', 'chf',
        'cny', 'inr', 'brl', 'mxn', 'zar', 'ngn', 'sgd'
    ];

    var regionCurrencies = {
        US: 'usd', GB: 'gbp', IE: 'eur', DE: 'eur', FR: 'eur', ES: 'eur',
        IT: 'eur', NL: 'eur', PT: 'eur', AT: 'eur', BE: 'eur', FI: 'eur',
        GR: 'eur', JP: 'jpy', CA: 'cad', AU: 'aud', CH: 'chf', CN: 'cny',
        IN: 'inr', BR: 'brl', MX: 'mxn', ZA: 'zar', NG: 'ngn', SG: 'sgd'
    };

    var ranges = {
        '1': { label: '1-day', description: 'one day', ttl: 5 * 60 * 1000, blockchain: '1days' },
        '7': { label: '7-day', description: 'seven days', ttl: 30 * 60 * 1000, blockchain: '7days' },
        '30': { label: '1-month', description: 'one month', ttl: 30 * 60 * 1000, blockchain: '30days' },
        '365': { label: '1-year', description: 'one year', ttl: 12 * 60 * 60 * 1000, blockchain: '1year' }
    };

    var state = {
        currency: 'usd',
        days: '1',
        current: null,
        currentSource: '',
        currentFetchedAt: 0,
        currentLoading: false,
        currentError: false,
        currentStale: false,
        currentRequestToken: 0,
        chart: [],
        chartSource: '',
        chartFetchedAt: 0,
        chartLoading: false,
        chartError: false,
        chartStale: false,
        chartRequestToken: 0,
        chartTooltipIndex: -1,
        converterSource: 'btc'
    };

    var elements = {};

    function getElement(id) {
        return document.getElementById(id);
    }

    function cacheElements() {
        elements.current = getElement('price-current');
        elements.change = getElement('price-change');
        elements.updated = getElement('price-updated');
        elements.currency = getElement('price-currency');
        elements.status = getElement('price-status');
        elements.refresh = getElement('price-refresh');
        elements.chart = getElement('price-chart');
        elements.svg = getElement('price-chart-svg');
        elements.grid = getElement('price-chart-grid');
        elements.axis = getElement('price-chart-axis');
        elements.line = getElement('price-chart-line');
        elements.area = getElement('price-chart-area');
        elements.crosshair = getElement('price-chart-crosshair');
        elements.point = getElement('price-chart-point');
        elements.loading = getElement('price-chart-loading');
        elements.tooltip = getElement('price-chart-tooltip');
        elements.tooltipValue = getElement('price-tooltip-value');
        elements.tooltipDate = getElement('price-tooltip-date');
        elements.chartDescription = getElement('price-chart-description');
        elements.highLabel = getElement('price-high-label');
        elements.lowLabel = getElement('price-low-label');
        elements.high = getElement('price-high');
        elements.low = getElement('price-low');
        elements.marketCap = getElement('price-market-cap');
        elements.volume = getElement('price-volume');
        elements.btcAmount = getElement('price-btc-amount');
        elements.fiatAmount = getElement('price-fiat-amount');
        elements.sats = getElement('price-sats');
    }

    function addClass(element, className) {
        if ((' ' + element.className + ' ').indexOf(' ' + className + ' ') === -1) {
            element.className += (element.className ? ' ' : '') + className;
        }
    }

    function removeClass(element, className) {
        var expression = new RegExp('(^|\\s)' + className + '(?=\\s|$)', 'g');
        element.className = element.className.replace(expression, '').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
    }

    function setHidden(element, hidden) {
        if (hidden) {
            element.setAttribute('hidden', 'hidden');
        } else {
            element.removeAttribute('hidden');
        }
    }

    function readStorage(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function writeStorage(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            return;
        }
    }

    function readCache(key) {
        var raw = readStorage(key);
        if (!raw) {
            return null;
        }

        try {
            return JSON.parse(raw);
        } catch (error) {
            return null;
        }
    }

    function writeCache(key, value) {
        try {
            writeStorage(key, JSON.stringify(value));
        } catch (error) {
            return;
        }
    }

    function isFinitePositive(value) {
        return typeof value === 'number' && isFinite(value) && value > 0;
    }

    function requestJSON(url, callback) {
        var xhr = new XMLHttpRequest();
        var finished = false;

        function finish(error, data, status) {
            if (finished) {
                return;
            }
            finished = true;
            callback(error, data, status);
        }

        xhr.open('GET', url, true);
        xhr.timeout = REQUEST_TIMEOUT;
        xhr.withCredentials = false;
        xhr.onreadystatechange = function() {
            var data;
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    data = JSON.parse(xhr.responseText);
                    finish(null, data, xhr.status);
                } catch (error) {
                    finish('invalid', null, xhr.status);
                }
            } else {
                finish('http', null, xhr.status);
            }
        };
        xhr.onerror = function() {
            finish('network', null, xhr.status || 0);
        };
        xhr.ontimeout = function() {
            finish('timeout', null, xhr.status || 0);
        };
        xhr.send();
    }

    function requestWithRetry(url, retries, callback) {
        requestJSON(url, function(error, data, status) {
            var retryable = status === 0 || status >= 500;
            if (error && retries > 0 && retryable) {
                window.setTimeout(function() {
                    requestWithRetry(url, retries - 1, callback);
                }, 1200);
                return;
            }
            callback(error, data, status);
        });
    }

    function initialCurrency() {
        var stored = readStorage(PREFERENCE_KEY);
        var language;
        var parts;
        var region;

        if (stored && currencies[stored]) {
            return stored;
        }

        language = navigator.language || navigator.userLanguage || '';
        parts = language.replace('_', '-').split('-');
        region = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
        return regionCurrencies[region] || 'usd';
    }

    function updateCurrencyText() {
        var codeNodes = document.querySelectorAll('[data-currency-code]');
        var nameNodes = document.querySelectorAll('[data-currency-name]');
        var currency = currencies[state.currency];
        var i;

        for (i = 0; i < codeNodes.length; i++) {
            codeNodes[i].textContent = currency.code;
        }
        for (i = 0; i < nameNodes.length; i++) {
            nameNodes[i].textContent = currency.name;
        }
    }

    function numberFormatter(options) {
        if (typeof Intl === 'undefined' || !Intl.NumberFormat) {
            return null;
        }
        try {
            return new Intl.NumberFormat(undefined, options);
        } catch (error) {
            return null;
        }
    }

    function formatPlainNumber(value, decimals) {
        var parts = Number(value).toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    function formatCurrency(value, compact) {
        var currency = currencies[state.currency].code;
        var decimals = currency === 'JPY' || value >= 1000 ? 0 : 2;
        var options = {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: compact ? 0 : decimals,
            maximumFractionDigits: compact ? 1 : decimals
        };
        var formatter;

        if (compact) {
            options.notation = 'compact';
            options.compactDisplay = 'short';
        }

        formatter = numberFormatter(options);
        if (formatter) {
            try {
                return formatter.format(value);
            } catch (error) {
                return currency + ' ' + formatPlainNumber(value, decimals);
            }
        }
        return currency + ' ' + formatPlainNumber(value, decimals);
    }

    function formatCompactCurrency(value) {
        var absolute = Math.abs(value);
        var divisor = 1;
        var suffix = '';

        if (absolute >= 1000000000000) {
            divisor = 1000000000000;
            suffix = 'T';
        } else if (absolute >= 1000000000) {
            divisor = 1000000000;
            suffix = 'B';
        } else if (absolute >= 1000000) {
            divisor = 1000000;
            suffix = 'M';
        } else if (absolute >= 1000) {
            divisor = 1000;
            suffix = 'K';
        }

        if (suffix) {
            return currencies[state.currency].code + ' ' + (value / divisor).toFixed(value / divisor >= 100 ? 0 : 1) + suffix;
        }
        return formatCurrency(value, false);
    }

    function formatInput(value, precision) {
        var fixed;
        if (!isFinite(value)) {
            return '';
        }
        fixed = Number(value).toFixed(precision);
        if (precision === 0) {
            return fixed;
        }
        return fixed.replace(/0+$/, '').replace(/\.$/, '');
    }

    function formatDateTime(timestamp) {
        var formatter;
        var date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return '';
        }
        if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
            try {
                formatter = new Intl.DateTimeFormat(undefined, {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                });
                return formatter.format(date);
            } catch (error) {
                return date.toLocaleString();
            }
        }
        return date.toLocaleString();
    }

    function formatChartDate(timestamp) {
        var options;
        var formatter;
        var date = new Date(timestamp);
        if (state.days === '1') {
            options = { hour: '2-digit', minute: '2-digit' };
        } else if (state.days === '365') {
            options = { day: 'numeric', month: 'short', year: 'numeric' };
        } else {
            options = { day: 'numeric', month: 'short' };
        }

        if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
            try {
                formatter = new Intl.DateTimeFormat(undefined, options);
                return formatter.format(date);
            } catch (error) {
                return date.toLocaleDateString();
            }
        }
        return date.toLocaleDateString();
    }

    function normalizeCoinGeckoCurrent(response) {
        var bitcoin = response && response.bitcoin;
        var result = {};
        var key;
        var item;
        var i;

        if (!bitcoin) {
            return null;
        }

        for (i = 0; i < currencyOrder.length; i++) {
            key = currencyOrder[i];
            if (!isFinitePositive(bitcoin[key])) {
                continue;
            }
            item = {
                price: bitcoin[key],
                change: bitcoin[key + '_24h_change'],
                marketCap: bitcoin[key + '_market_cap'],
                volume: bitcoin[key + '_24h_vol']
            };
            result[key] = item;
        }

        if (!result.usd) {
            return null;
        }

        return {
            values: result,
            updatedAt: isFinitePositive(bitcoin.last_updated_at) ? bitcoin.last_updated_at * 1000 : Date.now(),
            source: 'CoinGecko'
        };
    }

    function normalizeBlockchainCurrent(response) {
        var result = {};
        var currency;
        var entry;
        var i;

        if (!response) {
            return null;
        }

        for (i = 0; i < currencyOrder.length; i++) {
            currency = currencyOrder[i];
            entry = response[currencies[currency].code];
            if (entry && isFinitePositive(Number(entry.last))) {
                result[currency] = {
                    price: Number(entry.last),
                    change: null,
                    marketCap: null,
                    volume: null
                };
            }
        }

        if (!result.usd) {
            return null;
        }

        return {
            values: result,
            updatedAt: Date.now(),
            source: 'Blockchain.com'
        };
    }

    function validCurrentCache(cache) {
        return cache && cache.data && cache.data.values && cache.data.values.usd &&
            isFinitePositive(cache.data.values.usd.price) && isFinitePositive(cache.fetchedAt);
    }

    function applyCurrent(data, fetchedAt, stale) {
        state.currentLoading = false;
        state.current = data;
        state.currentSource = data.source;
        state.currentFetchedAt = fetchedAt;
        state.currentStale = stale;
        state.currentError = false;
        renderCurrent();
        updateStatus();
    }

    function loadCurrent(force) {
        var cached = readCache(CURRENT_CACHE_KEY);
        var now = Date.now();
        var query;
        var url;
        var token;

        if (state.currentLoading && !force) {
            return;
        }

        if (validCurrentCache(cached)) {
            applyCurrent(cached.data, cached.fetchedAt, now - cached.fetchedAt >= CURRENT_TTL);
            if (!force && now - cached.fetchedAt < CURRENT_TTL) {
                return;
            }
        }

        state.currentLoading = true;
        state.currentError = false;
        token = state.currentRequestToken + 1;
        state.currentRequestToken = token;
        updateStatus();

        query = 'ids=bitcoin&vs_currencies=' + currencyOrder.join(',') +
            '&include_market_cap=true&include_24hr_vol=true' +
            '&include_24hr_change=true&include_last_updated_at=true&precision=full';
        url = COINGECKO_ROOT + '/simple/price?' + query;

        requestWithRetry(url, 1, function(error, response) {
            var normalized = error ? null : normalizeCoinGeckoCurrent(response);
            if (token !== state.currentRequestToken) {
                return;
            }
            if (normalized) {
                writeCache(CURRENT_CACHE_KEY, { fetchedAt: Date.now(), data: normalized });
                applyCurrent(normalized, Date.now(), false);
                return;
            }
            loadBlockchainCurrent(token);
        });
    }

    function loadBlockchainCurrent(token) {
        requestWithRetry(BLOCKCHAIN_TICKER, 0, function(error, response) {
            var normalized = error ? null : normalizeBlockchainCurrent(response);
            if (token !== state.currentRequestToken) {
                return;
            }
            state.currentLoading = false;
            if (normalized) {
                writeCache(CURRENT_CACHE_KEY, { fetchedAt: Date.now(), data: normalized });
                applyCurrent(normalized, Date.now(), false);
                return;
            }

            state.currentError = true;
            if (state.current) {
                state.currentStale = true;
            }
            renderCurrent();
            updateStatus();
        });
    }

    function renderCurrent() {
        var item = state.current && state.current.values ? state.current.values[state.currency] : null;
        var change;

        updateCurrencyText();
        if (!item || !isFinitePositive(item.price)) {
            elements.current.textContent = 'Unavailable';
            elements.change.textContent = '—';
            elements.updated.textContent = 'Current price temporarily unavailable';
            removeClass(elements.change, 'is-positive');
            removeClass(elements.change, 'is-negative');
            elements.marketCap.textContent = '—';
            elements.volume.textContent = '—';
            updateConverter();
            return;
        }

        elements.current.textContent = formatCurrency(item.price, false);
        change = Number(item.change);
        removeClass(elements.change, 'is-positive');
        removeClass(elements.change, 'is-negative');
        if (isFinite(change)) {
            elements.change.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '% 24h';
            addClass(elements.change, change >= 0 ? 'is-positive' : 'is-negative');
        } else {
            elements.change.textContent = 'Reference price';
        }

        elements.updated.textContent = (state.currentStale ? 'Saved price' :
            (state.currentSource === 'Blockchain.com' ? 'Retrieved' : 'Updated')) + ' ' +
            formatDateTime(state.current.updatedAt) + ' · ' + state.currentSource;
        elements.marketCap.textContent = isFinitePositive(item.marketCap) ? formatCompactCurrency(item.marketCap) : 'Unavailable';
        elements.volume.textContent = isFinitePositive(item.volume) ? formatCompactCurrency(item.volume) : 'Unavailable';
        updateConverter();
    }

    function chartCacheKey() {
        return CHART_CACHE_PREFIX + state.currency + '-' + state.days;
    }

    function normalizeCoinGeckoChart(response) {
        var prices = response && response.prices;
        var points = [];
        var i;
        var timestamp;
        var price;

        if (!prices || !prices.length) {
            return null;
        }

        for (i = 0; i < prices.length; i++) {
            timestamp = Number(prices[i][0]);
            price = Number(prices[i][1]);
            if (isFinitePositive(timestamp) && isFinitePositive(price)) {
                points.push([timestamp, price]);
            }
        }
        return points.length >= 2 ? points : null;
    }

    function normalizeBlockchainChart(response) {
        var values = response && response.values;
        var points = [];
        var i;
        var timestamp;
        var price;

        if (!values || !values.length) {
            return null;
        }

        for (i = 0; i < values.length; i++) {
            timestamp = Number(values[i].x) * 1000;
            price = Number(values[i].y);
            if (isFinitePositive(timestamp) && isFinitePositive(price)) {
                points.push([timestamp, price]);
            }
        }
        return points.length >= 2 ? points : null;
    }

    function validChartCache(cache) {
        var i;
        if (!cache || !Array.isArray(cache.points) || cache.points.length < 2 ||
                !isFinitePositive(cache.fetchedAt)) {
            return false;
        }
        for (i = 0; i < cache.points.length; i++) {
            if (!Array.isArray(cache.points[i]) || cache.points[i].length < 2 ||
                    !isFinitePositive(Number(cache.points[i][0])) ||
                    !isFinitePositive(Number(cache.points[i][1]))) {
                return false;
            }
        }
        return true;
    }

    function applyChart(points, source, fetchedAt, stale) {
        state.chartLoading = false;
        state.chart = points;
        state.chartSource = source;
        state.chartFetchedAt = fetchedAt;
        state.chartStale = stale;
        state.chartError = false;
        drawChart();
        updateStatus();
    }

    function loadChart(force) {
        var key = chartCacheKey();
        var cached = readCache(key);
        var now = Date.now();
        var ttl = ranges[state.days].ttl;
        var token = state.chartRequestToken + 1;
        var url;

        state.chartRequestToken = token;
        hideTooltip();

        if (validChartCache(cached)) {
            applyChart(cached.points, cached.source || 'CoinGecko', cached.fetchedAt, now - cached.fetchedAt >= ttl);
            if (!force && now - cached.fetchedAt < ttl) {
                return;
            }
        }

        state.chartLoading = true;
        state.chartError = false;
        showChartMessage('Loading chart data…', false);
        updateStatus();

        url = COINGECKO_ROOT + '/coins/bitcoin/market_chart?vs_currency=' +
            encodeURIComponent(state.currency) + '&days=' + encodeURIComponent(state.days) + '&precision=full';

        requestWithRetry(url, 1, function(error, response) {
            var points;
            if (token !== state.chartRequestToken) {
                return;
            }
            points = error ? null : normalizeCoinGeckoChart(response);
            if (points) {
                state.chartLoading = false;
                writeCache(key, { fetchedAt: Date.now(), source: 'CoinGecko', points: points });
                applyChart(points, 'CoinGecko', Date.now(), false);
                return;
            }
            loadBlockchainChart(token, key);
        });
    }

    function loadBlockchainChart(token, key) {
        var url;
        if (state.currency !== 'usd') {
            finishChartError();
            return;
        }

        url = BLOCKCHAIN_CHART + '?timespan=' + encodeURIComponent(ranges[state.days].blockchain) +
            '&format=json&sampled=false&cors=true';
        requestWithRetry(url, 0, function(error, response) {
            var points;
            if (token !== state.chartRequestToken) {
                return;
            }
            points = error ? null : normalizeBlockchainChart(response);
            if (points) {
                state.chartLoading = false;
                writeCache(key, { fetchedAt: Date.now(), source: 'Blockchain.com', points: points });
                applyChart(points, 'Blockchain.com', Date.now(), false);
                return;
            }
            finishChartError();
        });
    }

    function finishChartError() {
        state.chartLoading = false;
        state.chartError = true;
        if (state.chart && state.chart.length >= 2) {
            state.chartStale = true;
            drawChart();
        } else {
            state.chart = [];
            showChartMessage('Chart data is temporarily unavailable.', true);
            clearChart();
        }
        updateStatus();
    }

    function showChartMessage(message, error) {
        elements.loading.textContent = message;
        setHidden(elements.loading, false);
        if (error) {
            addClass(elements.loading, 'is-error');
        } else {
            removeClass(elements.loading, 'is-error');
        }
    }

    function clearChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function clearChart() {
        state.chartTooltipIndex = -1;
        hideTooltip();
        elements.line.setAttribute('d', '');
        elements.area.setAttribute('d', '');
        clearChildren(elements.grid);
        clearChildren(elements.axis);
        elements.high.textContent = '—';
        elements.low.textContent = '—';
    }

    function svgElement(name, attributes) {
        var element = document.createElementNS(SVG_NAMESPACE, name);
        var key;
        for (key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
        return element;
    }

    function drawChart() {
        var points = state.chart;
        var left = 18;
        var right = 884;
        var top = 18;
        var bottom = 326;
        var minimum = Infinity;
        var maximum = -Infinity;
        var actualMinimum;
        var actualMaximum;
        var range;
        var linePath = '';
        var areaPath;
        var startTime;
        var endTime;
        var i;
        var x;
        var y;

        if (!points || points.length < 2) {
            clearChart();
            return;
        }

        for (i = 0; i < points.length; i++) {
            minimum = Math.min(minimum, points[i][1]);
            maximum = Math.max(maximum, points[i][1]);
        }

        actualMinimum = minimum;
        actualMaximum = maximum;
        range = maximum - minimum;
        if (range === 0) {
            minimum -= maximum * 0.01;
            maximum += maximum * 0.01;
            range = maximum - minimum;
        }

        startTime = points[0][0];
        endTime = points[points.length - 1][0];
        for (i = 0; i < points.length; i++) {
            x = endTime === startTime ? left + (i / (points.length - 1)) * (right - left) :
                left + ((points[i][0] - startTime) / (endTime - startTime)) * (right - left);
            y = bottom - ((points[i][1] - minimum) / range) * (bottom - top);
            linePath += (i === 0 ? 'M' : ' L') + x.toFixed(2) + ' ' + y.toFixed(2);
        }

        areaPath = linePath + ' L' + right + ' ' + bottom + ' L' + left + ' ' + bottom + ' Z';
        elements.line.setAttribute('d', linePath);
        elements.area.setAttribute('d', areaPath);
        elements.svg.setAttribute('data-minimum', minimum);
        elements.svg.setAttribute('data-maximum', maximum);
        drawGrid(minimum, maximum, left, right, top, bottom, points);
        elements.chartDescription.textContent = 'Historical Bitcoin price in ' +
            currencies[state.currency].name + ' over ' + ranges[state.days].description + '.';
        elements.highLabel.textContent = ranges[state.days].label + ' high';
        elements.lowLabel.textContent = ranges[state.days].label + ' low';
        elements.high.textContent = formatCurrency(actualMaximum, false);
        elements.low.textContent = formatCurrency(actualMinimum, false);
        setHidden(elements.loading, true);
    }

    function drawGrid(minimum, maximum, left, right, top, bottom, points) {
        var horizontalLines = 4;
        var i;
        var y;
        var value;
        var label;
        var middleTime = points[0][0] + (points[points.length - 1][0] - points[0][0]) / 2;
        var xIndexes = [0, nearestChartIndex(middleTime), points.length - 1];
        var x;
        var anchor;

        clearChildren(elements.grid);
        clearChildren(elements.axis);

        for (i = 0; i < horizontalLines; i++) {
            y = top + (i / (horizontalLines - 1)) * (bottom - top);
            value = maximum - (i / (horizontalLines - 1)) * (maximum - minimum);
            elements.grid.appendChild(svgElement('line', {
                x1: left, x2: right, y1: y, y2: y, 'class': 'price-chart__grid-line'
            }));
            label = svgElement('text', {
                x: right + 17, y: y + 5, 'class': 'price-chart__axis-label'
            });
            label.textContent = formatCompactCurrency(value);
            elements.axis.appendChild(label);
        }

        for (i = 0; i < xIndexes.length; i++) {
            x = left + (i / (xIndexes.length - 1)) * (right - left);
            anchor = i === 0 ? 'start' : (i === xIndexes.length - 1 ? 'end' : 'middle');
            label = svgElement('text', {
                x: x, y: bottom + 35, 'text-anchor': anchor, 'class': 'price-chart__axis-label'
            });
            label.textContent = formatChartDate(points[xIndexes[i]][0]);
            elements.axis.appendChild(label);
        }
    }

    function chartPointFromClientX(clientX) {
        var bounds = elements.svg.getBoundingClientRect();
        var left = 18;
        var right = 884;
        var ratio = (clientX - bounds.left) / bounds.width;
        var chartX = ratio * 1000;
        var clamped = Math.max(left, Math.min(right, chartX));
        var timeRatio = (clamped - left) / (right - left);
        var startTime = state.chart[0][0];
        var endTime = state.chart[state.chart.length - 1][0];
        var index = nearestChartIndex(startTime + timeRatio * (endTime - startTime));
        return chartPointForIndex(index);
    }

    function nearestChartIndex(timestamp) {
        var nearest = 0;
        var distance = Infinity;
        var nextDistance;
        var i;
        for (i = 0; i < state.chart.length; i++) {
            nextDistance = Math.abs(state.chart[i][0] - timestamp);
            if (nextDistance < distance) {
                nearest = i;
                distance = nextDistance;
            }
        }
        return nearest;
    }

    function chartPointForIndex(index) {
        var left = 18;
        var right = 884;
        var minimum = Number(elements.svg.getAttribute('data-minimum'));
        var maximum = Number(elements.svg.getAttribute('data-maximum'));
        var startTime = state.chart[0][0];
        var endTime = state.chart[state.chart.length - 1][0];
        var price = state.chart[index][1];
        var x = endTime === startTime ? left + (index / (state.chart.length - 1)) * (right - left) :
            left + ((state.chart[index][0] - startTime) / (endTime - startTime)) * (right - left);
        var y = 326 - ((price - minimum) / (maximum - minimum)) * (326 - 18);
        return { index: index, x: x, y: y };
    }

    function showTooltipPoint(point) {
        var selected;
        var percent;
        if (!state.chart || state.chart.length < 2) {
            return;
        }

        state.chartTooltipIndex = point.index;
        selected = state.chart[point.index];
        elements.crosshair.setAttribute('x1', point.x);
        elements.crosshair.setAttribute('x2', point.x);
        elements.point.setAttribute('cx', point.x);
        elements.point.setAttribute('cy', point.y);
        setHidden(elements.crosshair, false);
        setHidden(elements.point, false);
        elements.tooltipValue.textContent = formatCurrency(selected[1], false);
        elements.tooltipDate.textContent = formatDateTime(selected[0]);
        percent = (point.x / 1000) * 100;
        elements.tooltip.style.left = Math.max(9, Math.min(91, percent)) + '%';
        elements.tooltip.style.top = ((point.y / 380) * 100) + '%';
        if (point.y < 90) {
            addClass(elements.tooltip, 'is-below');
        } else {
            removeClass(elements.tooltip, 'is-below');
        }
        setHidden(elements.tooltip, false);
    }

    function showTooltip(clientX) {
        if (!state.chart || state.chart.length < 2) {
            return;
        }
        showTooltipPoint(chartPointFromClientX(clientX));
    }

    function showTooltipIndex(index) {
        if (!state.chart || state.chart.length < 2) {
            return;
        }
        index = Math.max(0, Math.min(state.chart.length - 1, index));
        showTooltipPoint(chartPointForIndex(index));
    }

    function hideTooltip() {
        if (!elements.tooltip) {
            return;
        }
        setHidden(elements.tooltip, true);
        setHidden(elements.crosshair, true);
        setHidden(elements.point, true);
    }

    function updateStatus() {
        var sources = [];
        var status;
        var hasData = state.current || (state.chart && state.chart.length);

        elements.refresh.disabled = state.currentLoading || state.chartLoading;
        if (state.currentLoading || state.chartLoading) {
            status = hasData ? 'Showing saved data while checking for an update…' : 'Loading independent market data…';
            elements.status.textContent = status;
            removeClass(elements.status, 'is-error');
            return;
        }

        if (state.currentError || state.chartError || state.currentStale || state.chartStale) {
            status = hasData ? 'Showing saved data because a live update is temporarily unavailable.' :
                'Market data is temporarily unavailable. Please try again.';
            elements.status.textContent = status;
            addClass(elements.status, 'is-error');
            return;
        }

        if (state.currentSource) {
            sources.push(state.currentSource);
        }
        if (state.chartSource && sources.indexOf(state.chartSource) === -1) {
            sources.push(state.chartSource);
        }
        status = sources.length === 1 && sources[0] === 'CoinGecko' ? 'Powered by CoinGecko' :
            'Market data from ' + sources.join(' and ');
        if (state.current && state.current.updatedAt) {
            status += state.currentSource === 'Blockchain.com' ? ' · Retrieved ' : ' · Updated ';
            status += formatDateTime(state.current.updatedAt);
        }
        elements.status.textContent = status + '.';
        removeClass(elements.status, 'is-error');
    }

    function currentPrice() {
        var item = state.current && state.current.values ? state.current.values[state.currency] : null;
        return item && isFinitePositive(item.price) ? item.price : null;
    }

    function updateConverter() {
        var price = currentPrice();
        var btc;
        var fiat;

        if (!price) {
            elements.fiatAmount.value = '';
            elements.fiatAmount.placeholder = 'Unavailable';
            elements.sats.textContent = '1 bitcoin equals 100,000,000 satoshis.';
            return;
        }

        elements.fiatAmount.placeholder = '';
        if (state.converterSource === 'fiat') {
            fiat = Number(elements.fiatAmount.value);
            if (isFinite(fiat) && fiat >= 0) {
                elements.btcAmount.value = formatInput(fiat / price, 8);
            }
        } else {
            btc = Number(elements.btcAmount.value);
            if (isFinite(btc) && btc >= 0) {
                elements.fiatAmount.value = formatInput(btc * price, currencies[state.currency].code === 'JPY' ? 0 : 2);
            }
        }

        elements.sats.textContent = '1,000 satoshis are approximately ' + formatCurrency(price / 100000, false) +
            '. 1 bitcoin equals 100,000,000 satoshis.';
    }

    function selectRange(button) {
        var buttons = document.querySelectorAll('.price-range');
        var days = button.getAttribute('data-days');
        var i;

        if (!ranges[days] || days === state.days) {
            return;
        }
        state.days = days;
        for (i = 0; i < buttons.length; i++) {
            removeClass(buttons[i], 'is-active');
            buttons[i].setAttribute('aria-pressed', 'false');
        }
        addClass(button, 'is-active');
        button.setAttribute('aria-pressed', 'true');
        state.chart = [];
        state.chartSource = '';
        clearChart();
        loadChart(false);
    }

    function refreshStaleCurrent() {
        if (Date.now() - state.currentFetchedAt >= CURRENT_TTL) {
            loadCurrent(false);
        }
    }

    function bindEvents() {
        var rangeButtons = document.querySelectorAll('.price-range');
        var i;

        elements.currency.onchange = function() {
            if (!currencies[this.value]) {
                return;
            }
            state.currency = this.value;
            writeStorage(PREFERENCE_KEY, state.currency);
            state.chartRequestToken += 1;
            state.chart = [];
            state.chartSource = '';
            clearChart();
            renderCurrent();
            if (!currentPrice()) {
                loadCurrent(true);
            }
            loadChart(false);
        };

        for (i = 0; i < rangeButtons.length; i++) {
            rangeButtons[i].onclick = function() {
                selectRange(this);
            };
        }

        elements.refresh.onclick = function() {
            loadCurrent(true);
            loadChart(true);
        };

        elements.btcAmount.oninput = function() {
            state.converterSource = 'btc';
            updateConverter();
        };

        elements.fiatAmount.oninput = function() {
            state.converterSource = 'fiat';
            updateConverter();
        };

        elements.svg.onmousemove = function(event) {
            showTooltip(event.clientX);
        };
        elements.svg.onmouseleave = hideTooltip;
        elements.svg.onfocus = function() {
            showTooltipIndex(state.chartTooltipIndex >= 0 ? state.chartTooltipIndex : state.chart.length - 1);
        };
        elements.svg.onblur = hideTooltip;
        elements.svg.onkeydown = function(event) {
            var index = state.chartTooltipIndex >= 0 ? state.chartTooltipIndex : state.chart.length - 1;
            if (event.keyCode === 37) {
                index -= 1;
            } else if (event.keyCode === 39) {
                index += 1;
            } else if (event.keyCode === 36) {
                index = 0;
            } else if (event.keyCode === 35) {
                index = state.chart.length - 1;
            } else {
                return;
            }
            event.preventDefault();
            showTooltipIndex(index);
        };
        elements.svg.ontouchstart = function(event) {
            if (event.touches && event.touches.length) {
                showTooltip(event.touches[0].clientX);
            }
        };
        elements.svg.ontouchmove = function(event) {
            if (event.touches && event.touches.length) {
                showTooltip(event.touches[0].clientX);
            }
        };
        elements.svg.ontouchend = hideTooltip;

        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                refreshStaleCurrent();
            }
        });
        window.addEventListener('focus', refreshStaleCurrent);
    }

    function init() {
        if (!getElement('price-page')) {
            return;
        }

        cacheElements();
        state.currency = initialCurrency();
        elements.currency.value = state.currency;
        updateCurrencyText();
        bindEvents();
        loadCurrent(false);
        loadChart(false);
    }

    init();
}());
