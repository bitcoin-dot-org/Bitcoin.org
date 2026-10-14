// This file is licensed under the MIT License (MIT) available on
// https://opensource.org/licenses/MIT.

(function () {
    'use strict';

    var loader = document.getElementById('bitcoin-animation-loader');
    var playerUrl = loader && loader.getAttribute('data-player-src');
    var motion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    var items = [];
    var queue = [];
    var busy = false;
    var scheduled = false;
    var scanScheduled = false;
    var engineState = 'idle';
    var observer;

    function visible(item) {
        if (document.hidden || (motion && motion.matches)) return false;
        if (!item.node.getClientRects().length) return false;
        var rect = item.node.getBoundingClientRect();
        var style = window.getComputedStyle(item.node);
        return rect.width > 0 && rect.height > 0 &&
            style.visibility !== 'hidden' && style.visibility !== 'collapse';
    }

    function nearby(item) {
        if (!visible(item)) return false;
        var rect = item.node.getBoundingClientRect();
        return rect.top < window.innerHeight + 150 && rect.bottom > -150 &&
            rect.left < window.innerWidth && rect.right > 0;
    }

    function idle(callback) {
        if (window.requestIdleCallback) {
            window.requestIdleCallback(callback, { timeout: 1500 });
        } else {
            window.setTimeout(callback, 100);
        }
    }

    function loadEngine(done) {
        if (window.customElements && window.customElements.get('lottie-player')) {
            engineState = 'ready';
            done(true);
            return;
        }
        if (engineState === 'failed' || !window.customElements || !playerUrl) {
            done(false);
            return;
        }
        var script = document.createElement('script');
        var finished = false;
        var timer;
        function finish(success) {
            if (finished) return;
            finished = true;
            window.clearTimeout(timer);
            script.onload = script.onerror = null;
            engineState = success ? 'ready' : 'failed';
            done(success);
        }
        script.setAttribute('data-cfasync', 'false');
        script.async = true;
        script.src = playerUrl;
        script.onload = function () {
            finish(!!window.customElements.get('lottie-player'));
        };
        script.onerror = function () { finish(false); };
        timer = window.setTimeout(function () { finish(false); }, 15000);
        document.head.appendChild(script);
    }

    function request(item, play) {
        if (!visible(item)) return;
        if (play) item.playRequested = true;
        if (item.state === 'ready') {
            if (play || (item.resume && nearby(item))) {
                item.player.play();
                item.resume = false;
                item.playRequested = false;
            }
            return;
        }
        // A failed download keeps its poster. A later deliberate interaction can retry.
        if (play && item.state === 'failed') {
            item.state = 'idle';
            if (engineState === 'failed') engineState = 'idle';
        }
        if (item.state !== 'idle') return;
        item.state = 'queued';
        queue.push(item);
        scheduleNext();
    }

    function scheduleNext() {
        if (busy || scheduled || !queue.length) return;
        scheduled = true;
        idle(function () {
            scheduled = false;
            var item;
            while (queue.length) {
                item = queue.shift();
                if (nearby(item)) break;
                item.state = 'idle';
                item.playRequested = false;
                item = null;
            }
            if (!item) return;
            busy = true;
            item.state = 'loading';
            loadEngine(function (success) {
                if (!success) {
                    item.state = 'failed';
                    busy = false;
                    scheduleNext();
                } else if (!nearby(item)) {
                    item.state = 'idle';
                    item.playRequested = false;
                    busy = false;
                    scheduleNext();
                } else {
                    createPlayer(item);
                }
            });
        });
    }

    function createPlayer(item) {
        var player = document.createElement('lottie-player');
        // Avoid fetching our bundled JSON twice for URL validation. Lottie's
        // normal loading and parse errors still keep the static fallback visible.
        player.disableCheck = true;
        var finished = false;
        var timer;
        item.player = player;
        function finish(success) {
            if (finished) return;
            finished = true;
            window.clearTimeout(timer);
            if (success) {
                item.state = 'ready';
                var startFrame = item.node.getAttribute('data-start-frame');
                if (startFrame) player.seek(Number(startFrame));
                if (visible(item)) {
                    item.node.classList.add('is-ready');
                    if (item.playRequested) player.play();
                } else {
                    item.resume = item.autoplay || item.playRequested;
                    player.pause();
                }
                item.playRequested = false;
            } else {
                item.state = 'failed';
                item.node.classList.remove('is-ready');
                if (player.parentNode) player.parentNode.removeChild(player);
                item.player = null;
            }
            busy = false;
            scheduleNext();
        }
        player.setAttribute('aria-hidden', 'true');
        player.setAttribute('src', item.node.getAttribute('data-bitcoin-animation'));
        if (item.autoplay) player.setAttribute('autoplay', '');
        if (item.node.hasAttribute('data-loop')) player.setAttribute('loop', '');
        player.addEventListener('ready', function () { finish(true); });
        player.addEventListener('error', function () { finish(false); });
        if (item.interactive) {
            player.addEventListener('complete', function () { player.stop(); });
        }
        timer = window.setTimeout(function () { finish(false); }, 15000);
        item.node.appendChild(player);
    }

    function scan() {
        scanScheduled = false;
        items.forEach(function (item) {
            if (item.state === 'ready') {
                if (!visible(item)) {
                    item.resume = item.resume || item.player.currentState === 'playing' ||
                        item.player.currentState === 'frozen';
                    item.player.pause();
                    item.node.classList.remove('is-ready');
                } else {
                    item.node.classList.add('is-ready');
                    if (item.resume && nearby(item)) {
                        item.player.play();
                        item.resume = false;
                    }
                }
            } else if (nearby(item)) {
                request(item, false);
            }
        });
    }

    function scheduleScan() {
        if (scanScheduled) return;
        scanScheduled = true;
        window.setTimeout(scan, 100);
    }

    function init() {
        var nodes = document.querySelectorAll('[data-bitcoin-animation]');
        var mutations;
        if (!nodes.length) return;
        if (window.IntersectionObserver) {
            observer = new window.IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        items.forEach(function (item) {
                            if (item.node === entry.target) request(item, false);
                        });
                    }
                });
            }, { rootMargin: '150px 0px' });
        } else {
            window.addEventListener('scroll', scheduleScan, { passive: true });
        }
        if (window.MutationObserver) {
            mutations = new window.MutationObserver(scheduleScan);
        }
        Array.prototype.forEach.call(nodes, function (node) {
            var item = {
                node: node,
                state: 'idle',
                player: null,
                playRequested: false,
                resume: false,
                autoplay: node.hasAttribute('data-autoplay'),
                interactive: node.hasAttribute('data-interactive')
            };
            items.push(item);
            if (item.interactive) {
                node.addEventListener('click', function () { request(item, true); });
            }
            var hover = document.getElementById(node.getAttribute('data-hover'));
            if (hover) {
                hover.addEventListener('mouseenter', function () { request(item, true); });
            }
            if (observer) observer.observe(node);
            // Observe only the outer wrapper, not the SVG mutations made by Lottie.
            if (mutations && node.parentNode) {
                mutations.observe(node.parentNode, {
                    attributes: true,
                    attributeFilter: ['class', 'style', 'hidden']
                });
            }
        });
        window.addEventListener('resize', scheduleScan);
        document.addEventListener('visibilitychange', scheduleScan);
        if (motion) {
            if (motion.addEventListener) motion.addEventListener('change', scheduleScan);
            else if (motion.addListener) motion.addListener(scheduleScan);
        }
        scan();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
