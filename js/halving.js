/*
This file is licensed under the MIT License (MIT) available on
https://opensource.org/licenses/MIT.
*/

(function () {
  'use strict';

  var INTERVAL = 210000;
  var NEXT_BLOCK = 1050000;
  var SECONDS_PER_BLOCK = 600;
  var MAX_BLOCK = 1260000;
  var CAP = 21000000;
  var YEARS = ['2012', '2016', '2020', '2024', '2028'];
  var ORANGE = '#f7931a';
  var GRID = '#e0e6eb';
  var LABEL = '#6b7f8f';
  var FONT = '12px "Titillium Web", Arial, sans-serif';
  var lastHeight = null;

  function byId(id) { return document.getElementById(id); }

  function fmt(n) {
    try { return n.toLocaleString(document.documentElement.lang || 'en'); }
    catch (e) { return String(n); }
  }

  function subsidyAt(block) {
    return 50 / Math.pow(2, Math.floor(block / INTERVAL));
  }

  function supplyAt(block) {
    var total = 0;
    var era = Math.floor(block / INTERVAL);
    var i;
    for (i = 0; i < era; i++) {
      total += INTERVAL * (50 / Math.pow(2, i));
    }
    return total + (block - era * INTERVAL) * (50 / Math.pow(2, era));
  }

  function setupCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    var w = 900;
    var h = 420;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx: ctx, w: w, h: h, l: 70, r: 30, t: 30, b: 45 };
  }

  function xPos(g, block) {
    return g.l + (block / MAX_BLOCK) * (g.w - g.l - g.r);
  }

  function yPos(g, v, max) {
    return g.h - g.b - (v / max) * (g.h - g.t - g.b);
  }

  function drawFrame(g, canvas, yMax, yTicks, yFmt) {
    var ctx = g.ctx;
    var i, b, x, y;
    ctx.font = FONT;
    ctx.strokeStyle = GRID;
    ctx.fillStyle = LABEL;
    ctx.lineWidth = 1;
    for (i = 0; i < yTicks.length; i++) {
      y = yPos(g, yTicks[i], yMax);
      ctx.beginPath();
      ctx.moveTo(g.l, y);
      ctx.lineTo(g.w - g.r, y);
      ctx.stroke();
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(yFmt(yTicks[i]), g.l - 8, y);
    }
    ctx.setLineDash([4, 4]);
    for (i = 1; i <= 5; i++) {
      b = i * INTERVAL;
      x = xPos(g, b);
      ctx.beginPath();
      ctx.moveTo(x, g.t);
      ctx.lineTo(x, g.h - g.b);
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(YEARS[i - 1], x, g.t - 8);
      ctx.fillText((b / 1000) + 'k', x, g.h - g.b + 18);
    }
    ctx.setLineDash([]);
    ctx.textAlign = 'center';
    ctx.fillText(canvas.getAttribute('data-label-x') || '', (g.l + g.w - g.r) / 2, g.h - 8);
  }

  function drawDot(g, block, v, yMax) {
    var ctx = g.ctx;
    ctx.fillStyle = ORANGE;
    ctx.beginPath();
    ctx.arc(xPos(g, block), yPos(g, v, yMax), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawSubsidy() {
    var canvas = byId('halving-subsidy-chart');
    if (!canvas || !canvas.getContext) { return; }
    var g = setupCanvas(canvas);
    var ctx = g.ctx;
    var i, x0, x1, y;
    drawFrame(g, canvas, 50, [0, 12.5, 25, 37.5, 50], function (v) { return String(v); });
    ctx.strokeStyle = ORANGE;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (i = 0; i < 6; i++) {
      x0 = xPos(g, i * INTERVAL);
      x1 = xPos(g, (i + 1) * INTERVAL);
      y = yPos(g, 50 / Math.pow(2, i), 50);
      if (i === 0) { ctx.moveTo(x0, y); } else { ctx.lineTo(x0, y); }
      ctx.lineTo(x1, y);
    }
    ctx.stroke();
    if (lastHeight) { drawDot(g, lastHeight, subsidyAt(lastHeight), 50); }
  }

  function drawSupply() {
    var canvas = byId('halving-supply-chart');
    if (!canvas || !canvas.getContext) { return; }
    var g = setupCanvas(canvas);
    var ctx = g.ctx;
    var i, b, y;
    drawFrame(g, canvas, CAP, [0, 7000000, 14000000, 21000000], function (v) { return (v / 1000000) + 'M'; });
    y = yPos(g, CAP, CAP);
    ctx.strokeStyle = LABEL;
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(g.l, y);
    ctx.lineTo(g.w - g.r, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = LABEL;
    ctx.textAlign = 'right';
    ctx.fillText(canvas.getAttribute('data-label-cap') || '', g.w - g.r - 4, y - 6);
    ctx.strokeStyle = ORANGE;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xPos(g, 0), yPos(g, 0, CAP));
    for (i = 1; i <= 6; i++) {
      b = i * INTERVAL;
      ctx.lineTo(xPos(g, b), yPos(g, supplyAt(b), CAP));
    }
    ctx.stroke();
    if (lastHeight) { drawDot(g, lastHeight, supplyAt(lastHeight), CAP); }
  }

  function drawAll() {
    drawSubsidy();
    drawSupply();
  }

  function update(height) {
    var remaining = NEXT_BLOCK - height;
    if (remaining < 0) { remaining = 0; }
    var eta = new Date(Date.now() + remaining * SECONDS_PER_BLOCK * 1000);
    var done = INTERVAL - remaining;
    var pct = Math.round((done / INTERVAL) * 100);
    byId('halving-height').textContent = fmt(height);
    byId('halving-remaining').textContent = fmt(remaining);
    try {
      byId('halving-date').textContent = eta.toLocaleDateString(
        document.documentElement.lang || 'en',
        { year: 'numeric', month: 'short' }
      );
    } catch (e) {
      byId('halving-date').textContent = eta.getFullYear();
    }
    byId('halving-progress-bar').style.width = pct + '%';
    lastHeight = height;
    drawAll();
  }

  function load() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://blockchain.info/q/getblockcount?cors=true', true);
    xhr.timeout = 10000;
    xhr.onload = function () {
      var h = parseInt(xhr.responseText, 10);
      if (xhr.status === 200 && h > 800000 && h < NEXT_BLOCK + INTERVAL) {
        update(h);
      }
    };
    xhr.send();
  }

  function start() {
    drawAll();
    load();
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) { clearTimeout(resizeTimer); }
    resizeTimer = setTimeout(drawAll, 150);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}());
