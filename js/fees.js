/*
This file is licensed under the MIT License (MIT) available on
https://opensource.org/licenses/MIT.
*/

/* global Promise, fetch */

(function() {
    'use strict';

    var MEMPOOL_URL = 'https://mempool.space/api/v1/fees/recommended';
    var BLOCKSTREAM_URL = 'https://blockstream.info/api/fee-estimates';
    var PRICE_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    var FEES_CACHE_KEY = 'bitcoin-org-fees-v1';
    var PRICE_CACHE_KEY = 'bitcoin-org-fees-usd-v1';
    var FEES_TTL = 2 * 60 * 1000;
    var PRICE_TTL = 5 * 60 * 1000;
    var REQUEST_TIMEOUT = 8000;
    var REFRESH_INTERVAL = 60 * 1000;
    var TYPICAL_VBYTES = 140;

    var tiers = [
        { key: 'fastestFee', rateId: 'fee-rate-fastest', costId: 'fee-cost-fastest' },
        { key: 'halfHourFee', rateId: 'fee-rate-half', costId: 'fee-cost-half' },
        { key: 'hourFee', rateId: 'fee-rate-hour', costId: 'fee-cost-hour' },
        { key: 'economyFee', rateId: 'fee-rate-economy', costId: 'fee-cost-economy' }
    ];

    function fetchJson(url) {
        return new Promise(function(resolve, reject) {
            var timer = setTimeout(function() { reject(new Error('timeout')); }, REQUEST_TIMEOUT);
            fetch(url, { cache: 'no-store' }).then(function(res) {
                clearTimeout(timer);
                if (!res.ok) { reject(new Error('http ' + res.status)); return; }
                resolve(res.json());
            }).catch(function(err) { clearTimeout(timer); reject(err); });
        });
    }

    function readCache(key, ttl) {
        try {
            var raw = window.localStorage.getItem(key);
            if (!raw) { return null; }
            var entry = JSON.parse(raw);
            if (!entry || typeof entry.time !== 'number') { return null; }
            if (Date.now() - entry.time > ttl) { return null; }
            return entry.data;
        } catch (e) { return null; }
    }

    function writeCache(key, data) {
        try {
            window.localStorage.setItem(key, JSON.stringify({ time: Date.now(), data: data }));
        } catch (e) { /* storage unavailable */ }
    }

    function normalizeBlockstream(data) {
        function pick(target) {
            var v = data[String(target)];
            return typeof v === 'number' ? v : null;
        }
        var fastest = pick(1), half = pick(3), hour = pick(6);
        var economy = pick(144) || pick(72) || pick(25);
        if (fastest === null || half === null || hour === null || economy === null) { return null; }
        return { fastestFee: fastest, halfHourFee: half, hourFee: hour, economyFee: economy };
    }

    function formatRate(rate) {
        if (typeof rate !== 'number' || isNaN(rate) || rate <= 0) { return null; }
        if (rate >= 10) { return String(Math.round(rate)); }
        var rounded = Math.round(rate * 10) / 10;
        return String(rounded % 1 === 0 ? Math.round(rounded) : rounded);
    }

    function renderFees(data, usdPrice) {
        var ok = false;
        tiers.forEach(function(tier) {
            var rateEl = document.getElementById(tier.rateId);
            var costEl = document.getElementById(tier.costId);
            if (!rateEl || !costEl) { return; }
            var formatted = formatRate(data && data[tier.key]);
            if (formatted === null) { rateEl.textContent = '\u2014'; costEl.innerHTML = '&nbsp;'; return; }
            ok = true;
            rateEl.textContent = formatted;
            var sats = Math.round(data[tier.key] * TYPICAL_VBYTES);
            var text = '\u2248 ' + sats.toLocaleString('en-US') + ' sats';
            if (typeof usdPrice === 'number' && usdPrice > 0) {
                var usd = sats / 1e8 * usdPrice;
                text += ' (' + (usd < 0.01 ? '<\u200a$0.01' : '$' + usd.toFixed(2)) + ')';
            }
            costEl.textContent = text;
        });
        return ok;
    }

    function setStatus(message) {
        var el = document.getElementById('fees-updated');
        if (el) { el.textContent = message; }
    }

    function loadPrice() {
        var cached = readCache(PRICE_CACHE_KEY, PRICE_TTL);
        if (cached !== null) { return Promise.resolve(cached); }
        return fetchJson(PRICE_URL).then(function(data) {
            var usd = data && data.bitcoin && data.bitcoin.usd;
            if (typeof usd === 'number') { writeCache(PRICE_CACHE_KEY, usd); return usd; }
            return null;
        }).catch(function() { return null; });
    }

    function loadFees() {
        var cached = readCache(FEES_CACHE_KEY, FEES_TTL);
        if (cached !== null) { return Promise.resolve(cached); }
        return fetchJson(MEMPOOL_URL).then(function(data) {
            if (data && typeof data.fastestFee === 'number') { writeCache(FEES_CACHE_KEY, data); return data; }
            throw new Error('unexpected payload');
        }).catch(function() {
            return fetchJson(BLOCKSTREAM_URL).then(function(data) {
                var normalized = normalizeBlockstream(data);
                if (normalized) { writeCache(FEES_CACHE_KEY, normalized); return normalized; }
                throw new Error('unexpected fallback payload');
            });
        });
    }

    function refresh() {
        Promise.all([loadFees(), loadPrice()]).then(function(results) {
            if (renderFees(results[0], results[1])) {
                setStatus('Live estimates \u00b7 updated ' + new Date().toLocaleTimeString());
            } else {
                setStatus('Live fee data is unavailable right now. Please try again in a moment.');
            }
        }).catch(function() {
            setStatus('Live fee data is unavailable right now. Please try again in a moment.');
        });
    }

    if (document.getElementById('fees-page')) {
        refresh();
        window.setInterval(refresh, REFRESH_INTERVAL);
    }
}());
