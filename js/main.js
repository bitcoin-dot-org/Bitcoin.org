// This file is licensed under the MIT License (MIT) available on
// http://opensource.org/licenses/MIT.

// This file is used for javascript code
// necessary for some pages to work properly.

"use strict";

function getWidth(a) {
  // Return the integer value of the computed width of a DOM node.
  // Ex. getWidth(node);
  var w = getStyle(a, 'width');
  if (w.indexOf('px') !== -1) return parseInt(w.replace('px', ''));
  var p = [getStyle(a, 'padding-top'), getStyle(a, 'padding-right'), getStyle(a, 'padding-bottom'), getStyle(a, 'padding-left')];
  for (var i = 0; i < 4; i++) {
    p[i] = (p[i].indexOf('px') !== -1) ? parseInt(p[i]) : 0;
  }
  return Math.max(0, a.offsetWidth - p[1] - p[3]);
}

function getHeight(a) {
  // Return the integer value of the computed height of a DOM node.
  // Ex. getHeight(node);
  var h = getStyle(a, 'height');
  if (h.indexOf('px') !== -1) return parseInt(h.replace('px', ''));
  var p = [getStyle(a, 'padding-top'), getStyle(a, 'padding-right'), getStyle(a, 'padding-bottom'), getStyle(a, 'padding-left')];
  for (var i = 0; i < 4; i++) {
    p[i] = (p[i].indexOf('px') !== -1) ? parseInt(p[i]) : 0;
  }
  return Math.max(0, a.offsetHeight - p[0] - p[2]);
}

function getLeft(a) {
  // Return the integer value of the computed distance between given node and the browser window.
  // Ex. getLeft(node);
  var b = a.offsetLeft;
  while (a.offsetParent) {
    a = a.offsetParent;
    b += a.offsetLeft;
  }
  return b;
}

function getTop(a) {
  // Return the integer value of the computed distance between given node and the browser window.
  // Ex. getTop(node);
  var b = a.offsetTop;
  while (a.offsetParent) {
    a = a.offsetParent;
    b += a.offsetTop;
  }
  return b;
}

function getPageYOffset() {
  // Return the integer value for the vertical position of the scroll bar.
  return window.pageYOffset || document.documentElement.scrollTop;
}

function getPageXOffset() {
  // Return the integer value for the horizontal position of the scroll bar.
  return window.pageXOffset || document.documentElement.scrollLeft;
}

function getWindowY() {
  // Return the integer value for the browser window height.
  return window.innerHeight || document.documentElement.clientHeight;
}

function getWindowX() {
  // Return the integer value for the browser window width.
  return window.innerWidth || document.documentElement.clientWidth;
}

function isMobile() {
  // Return true if the mobile CSS stylesheet is used.
  if (getStyle(document.getElementById('detectmobile'), 'display') !== 'none') return true;
  return false;
}

function scrollToNode(t) {
  // Scroll to any node on the page.
  var status = document.body.getAttribute('data-scrollstatus');
  if (status !== null && status !== '') {
    clearInterval(document.body.getAttribute('data-scrollstatus'));
    document.body.removeAttribute('data-scrollstatus');
  }
  var delay = 800;
  var py = getPageYOffset();
  var fy = getTop(t);
  var dy = fy - py;
  var x = getPageXOffset();
  var oti = new Date().getTime();
  document.body.setAttribute('data-scrollstatus', setInterval(function() {
    var nti = new Date().getTime() - oti;
    if (nti >= delay) {
      window.scrollTo(x, fy);
      clearInterval(document.body.getAttribute('data-scrollstatus'));
      document.body.removeAttribute('data-scrollstatus');
      return;
    }
    var p = nti / delay;
    p = p * (1 + (0.5 * (1 - p)));
    window.scrollTo(x, (py + (dy * p)).toFixed(0));
  }, 10));
}

function supportCSS(id) {
  // Return true if the browser supports given CSS feature.
  var domPrefixes = 'Webkit Moz ms O'.split(' ');
  var nd = document.createElement('DIV');
  id = id.toLowerCase();
  if (nd.style[id] !== undefined) return true;
  var idc = id.charAt(0).toUpperCase() + id.substr(1);
  for (var i = 0, n = domPrefixes.length; i < n; i++) {
    if (nd.style[domPrefixes[i] + idc] !== undefined) return true;
  }
  return false;
}

function loadYoutubeVideo(e) {
  // Load Youtube video on target node on click.
  function init(e) {
    var t = getEvent(e, 'target'),
      nd = document.createElement('IFRAME');
    while (t.getAttribute('data-youtubeurl') === null || t.getAttribute('data-youtubeurl') === '') t = t.parentNode;
    nd.src = t.getAttribute('data-youtubeurl');
    nd.setAttribute('frameborder', 0);
    nd.setAttribute('allowfullscreen', true);
    t.innerHTML = '';
    t.appendChild(nd);
    t.onclick = '';
  }
  onTouchClick(e, init);
}

function expandBox(t) {
  // Expand or shrink box.
  var phe = getHeight(t);
  t.style.transition = t.style.MozTransition = t.style.WebkitTransition = 'all 0s ease 0s';
  if (t.className.indexOf('expanded') === -1) addClass(t, 'expanded');
  else removeClass(t, 'expanded');
  t.style.height = '';
  var nhe = getHeight(t);
  t.style.height = phe + 'px';
  // Async call to prevent transition from applying on last style.height statement.
  setTimeout(function() {
    t.style.transition = t.style.MozTransition = t.style.WebkitTransition = '';
    t.style.height = nhe + 'px';
  }, 20);
}

function boxShow(e) {
  // Display the box content when the user click a box on the "Secure your wallet" page.
  function init(e) {
    var t = getEvent(e, 'target');
    while (t.nodeName !== 'DIV') t = t.parentNode;
    expandBox(t);
    cancelEvent(e);
  }
  onTouchClick(e, init);
}

function faqShow(e) {
  // Display the content of a question in the FAQ at user request.
  function init(e) {
    var t = getEvent(e, 'target');
    while (t.nodeType !== 1 || t.nodeName !== 'DIV') t = t.nextSibling;
    expandBox(t);
    cancelEvent(e);
  }
  onTouchClick(e, init);
}

function materialShow(e) {
  // Display more materials on the "Press center" page at user request.
  function init(e) {
    var t = getEvent(e, 'target'),
      p = t;
    while (p.nodeType !== 1 || p.nodeName !== 'DIV') p = p.parentNode;
    expandBox(p);
    cancelEvent(e);
  }
  onTouchClick(e, init);
}

function librariesShow(e) {
  // Display more open source projects on the "Development" page at user request.
  function init(e) {
    var t = getEvent(e, 'target'),
      p = t;
    while (p.nodeType !== 1 || p.nodeName !== 'UL') p = p.parentNode;
    expandBox(p);
    cancelEvent(e);
  }
  onTouchClick(e, init);
}

function freenodeShow(e) {
  // Display freenode chat window on the "Development" page at user request.
  document.getElementById('chatbox').innerHTML = '<iframe style=width:98%;min-width:400px;height:600px src="http://webchat.freenode.net/?channels=bitcoin-dev" />';
  cancelEvent(e);
}

function updateToc() {
  // Update table of content active entry and browser url on scroll.
  var pageoffset;
  var windowy;
  var toc;
  var fallback;
  var first;
  var last;
  var closer;
  function init() {
      setenv();
      updatehistory();
      updatetoc();
    }
    // Set variables.
  function setenv() {
      pageoffset = getPageYOffset();
      windowy = getWindowY();
      toc = document.getElementById('toc');
      fallback = document.getElementsByTagName('H2')[0];
      first = [fallback, getTop(fallback)];
      last = [fallback, getTop(fallback)];
      closer = [fallback, getTop(fallback)];
      // Find all titles in toc.
      var nodes = [];
      var tags = ['H2', 'H3', 'H4', 'H5', 'H6'];
      for (var i = 0, n = tags.length; i < n; i++) {
        for (var ii = 0, t = document.getElementsByTagName(tags[i]), nn = t.length; ii < nn; ii++) {
          if (t[ii].className.indexOf('no_toc') !== -1) continue;
          nodes.push(t[ii]);
        }
      }
      // Find first title, last title and closer title.
      for (var i = 0, n = nodes.length; i < n; i++) {
        if (!nodes[i].id) continue;
        var top = getTop(nodes[i]);
        if (top < first[1]) first = [nodes[i], top];
        if (top > last[1]) last = [nodes[i], top];
        if (top < pageoffset + 10 && top > closer[1]) closer = [nodes[i], top];
      }
      // Set closer title to first or last title if at the top or bottom of the page.
      if (pageoffset < first[1]) closer = [first[0], first[1]];
      if (windowy + pageoffset >= getHeight(document.body)) closer = [last[0], last[1]];
    }
    // Update toc position and set active toc entry.
  function updatetoc() {
      // Set bottom and top to fit within window and not overflow its parent node.
      var div = toc.getElementsByTagName('DIV')[0];
      if (pageoffset > getTop(toc)) {
        addClass(div, 'scroll');
        div.style.top = '20px';
        div.style.bottom = Math.max((pageoffset + windowy) - (getHeight(toc.parentNode) + getTop(toc.parentNode)), 20) + 'px';
      } else removeClass(div, 'scroll');
      // Remove .active class from toc and find new active toc entry.
      var a = false;
      for (var i = 0, t = toc.getElementsByTagName('*'), n = t.length; i < n; i++) {
        removeClass(t[i], 'active');
        if (t[i].nodeName === 'A' && t[i].getAttribute('href') === '#' + closer[0].id) a = t[i];
      }
      if (a === false) return;
      // Set .active class on new active toc entry.
      var nd = a;
      while (nd.parentNode.nodeName === 'LI' || nd.parentNode.nodeName === 'UL') {
        addClass(nd, 'active');
        nd = nd.parentNode;
      }
      // Auto-scroll in toc to keep active toc entry visible.
      var nd = a;
      var otop = nd.offsetTop;
      while (nd.offsetParent !== div && nd.offsetParent) {
        nd = nd.offsetParent;
        otop += nd.offsetTop;
      }
      var bdiff = getHeight(a) + otop - div.scrollTop - getHeight(div);
      var tdiff = getHeight(a) - otop + div.scrollTop;
      if (tdiff > 0 || bdiff > 0) div.scrollTop -= tdiff;
    }
    // Update browser url.
  function updatehistory() {
      // Don't call window.history if not supported.
      if (!window.history || !window.history.replaceState) return;
      // Don't update window url when it doesn't need to be updated.
      if (new RegExp('#' + closer[0].id + '$').test(window.location.href.toString())) return;
      // Don't update window url when the window is over the first title in the page.
      if (pageoffset < first[1]) return;
      // Don't update window url when page is not loaded, or user just clicked a url.
      if (!toc.hasAttribute('data-timestamp') || toc.getAttribute('data-timestamp') > new Date().getTime() - 1000) return;
      window.history.replaceState(null, null, '#' + closer[0].id);
    }
    // Update the toc when the page stops scrolling.
  function evtimeout() {
      toc = document.getElementById('toc');
      clearTimeout(toc.getAttribute('data-timeout'));
      toc.setAttribute('data-timeout', setTimeout(init, 1));
    }
    // Reset timestamp on page load and each time the user clicks a url.
  function evtimestamp() {
    toc = document.getElementById('toc');
    document.getElementById('toc').setAttribute('data-timestamp', new Date().getTime());
  }
  addEvent(window, 'scroll', evtimeout);
  addEvent(window, 'popstate', evtimestamp);
  addEvent(window, 'load', evtimestamp);
  init();
}

function updateIssue(e) {
  // Update GitHub issue link pre-filled with current page location.
  var t = getEvent(e, 'target');
  t.href = 'https://github.com/bitcoin-dot-org/bitcoin.org/issues/new?body=' + encodeURIComponent('Location: ' + window.location.href.toString() + "\n\n");
}

function updateSource(e) {
  // Update GitHub source file link pre-filled with current page location.
  if (!document.getElementsByClassName) return;
  var t = getEvent(e, 'target'),
    nodes = document.getElementsByClassName('sourcefile'),
    pageoffset = Math.max(0, getPageYOffset() + 100),
    windowy = getWindowY(),
    fallback = nodes[0],
    first = [fallback, getTop(fallback)],
    last = [fallback, getTop(fallback)],
    closer = [fallback, getTop(fallback)];
  // Find first, last and closer node.
  for (var i = 0, n = nodes.length; i < n; i++) {
    var top = getTop(nodes[i]);
    if (top < first[1]) first = [nodes[i], top];
    if (top > last[1]) last = [nodes[i], top];
    if (top < pageoffset + 10 && top > closer[1]) closer = [nodes[i], top];
  }
  // Set closer title to first or last title if at the top or bottom of the page.
  if (pageoffset < first[1]) closer = [first[0], first[1]];
  if (windowy + pageoffset >= getHeight(document.body)) closer = [last[0], last[1]];
  // Set updated url to source file.
  t.href = 'https://github.com/bitcoin-dot-org/bitcoin.org/edit/master/' + closer[0].getAttribute('data-sourcefile');
}

function disclaimerClose(e) {
  // Auto close temporary disclaimer in devel-docs.
  if (e) cancelEvent(e);
  var t = document.getElementById('develdocdisclaimer');
  t.parentNode.removeChild(t);
  if (typeof(Storage) === 'undefined') return;
  sessionStorage.setItem('develdocdisclaimerclose', '1');
}

function disclaimerAutoClose() {
  // Auto close temporary disclaimer in devel-docs if session says so.
  if (typeof(Storage) === 'undefined') return;
  if (sessionStorage.getItem('develdocdisclaimerclose') === '1') disclaimerClose();
}

function walletMenuListener(e) {
  // Listen for events on the wallet menu.
  var walletSelectPlatform = function(e) {
      var t = getEvent(e, 'target'),
        p = t;
      if (t.nodeName !== 'A') return;
      while (p.parentNode.nodeName === 'UL' || p.parentNode.nodeName === 'LI') p = p.parentNode;
      for (var i = 0, nds = p.getElementsByTagName('LI'), n = nds.length; i < n; i++) removeClass(nds[i], 'active');
      var tt = t;
      while (tt !== p) {
        if (tt.nodeName === 'LI') addClass(tt, 'active');
        tt = tt.parentNode;
      }
      walletShowPlatform(t.getAttribute('data-walletcompat'));
      if (isMobile() && !hasSubItems(t)) scrollToNode(document.getElementById('wallets'));
    },
    hasSubItems = function(t) {
      while (t.nodeName !== 'LI') t = t.parentNode;
      return (t.getElementsByTagName('UL').length > 0);
    };
  // Pre-process events and call appropriate function.
  onTouchClick(e, walletSelectPlatform);
}

function walletListener(e) {
  // Listen for events on wallets.
  var t = getEvent(e, 'target'),
    walletShow = function() {
      // Show wallet on click on mobile or desktop.
      if (t.id === 'wallets') return;
      while (t.parentNode && t.parentNode.id !== 'wallets') t = t.parentNode;
      if (!t.parentNode) return;
      if (isMobile()) {
        var p = document.getElementById('walletsmobile');
        t = t.cloneNode(true);
        p.innerHTML = '';
        p.appendChild(t);
        scrollToNode(p);
      } else {
        addClass(t, 'active');
        addEvent(document.body, 'click', walletListener);
      }
    },
    walletHide = function() {
      // Disable wallet when the mouse clicks elsewhere.
      for (var i = 0, wallets = document.getElementById('wallets').childNodes, n = wallets.length; i < n; i++) {
        if (wallets[i].nodeType !== 1) continue;
        removeClass(wallets[i], 'active');
      }
      removeEvent(document.body, 'click', walletListener);
    };
  // Call appropriate function on click.
  onTouchClick(e, function() {
    walletHide();
    walletShow();
  });
}

function walletScoreListener(e) {
  // Listen for events on wallet scores and display them on tap.
  var init = function(e) {
    var t = getEvent(e, 'target');
    while (!t.parentNode.parentNode.parentNode.id) t = t.parentNode;
    (t.className.indexOf('hover') === -1) ? addClass(t, 'hover'): removeClass(t, 'hover');
  };
  onTouchClick(e, init);
}

function walletShowPlatform(platform) {
  // Show wallets for given platform in the menu.
  var t = null,
    fallback = '',
    walletMenu = document.getElementById('walletmenu'),
    getMenuState = function() {
      // Find active node in the menu for given platform and fallback category if in a submenu.
      for (var i = 0, nds = walletMenu.getElementsByTagName('A'), n = nds.length; i < n; i++) {
        if (nds[i].getAttribute('data-walletcompat') !== platform) continue;
        if (nds[i].getAttribute('data-active') === '1') return false;
        t = nds[i];
        var p = nds[i].parentNode.parentNode.parentNode;
        if (p.nodeName === 'LI') fallback = p.getElementsByTagName('A')[0].getAttribute('data-walletcompat');
        break;
      }
      return true;
    },
    updateMenu = function() {
      // Set active nodes in the menu for the new platform.
      addClass(walletMenu.getElementsByTagName('UL')[0], 'menutap');
      for (var i = 0, nds = walletMenu.getElementsByTagName('A'), n = nds.length; i < n; i++) {
        nds[i].removeAttribute('data-active');
        removeClass(nds[i].parentNode, 'active');
      }
      if (platform !== 'default') {
        t.setAttribute('data-active', '1');
        addClass(t.parentNode, 'active');
        var p = t.parentNode.parentNode.parentNode;
        if (p.nodeName === 'LI') addClass(p, 'active');
      }
    },
    updateWallets = function() {
      // Replace wallets by those for given platform and rotate them.
      var p = document.getElementById('wallets');
      var lasttimeout = p.getAttribute('data-timeout');
      var timeout = (lasttimeout !== null && lasttimeout !== '' && supportCSS('transition')) ? 200 : 1;
      addClass(p, 'disabled');
      addClass(p, 'nohover');
      clearTimeout(lasttimeout);
      p.setAttribute('data-timeout', setTimeout(function() {
        p.innerHTML = '';
        var platforms = (platform === 'default') ? ['desktop', 'mobile'] : [platform];
        for (var i = 0, nds = document.getElementById('walletsswitch').childNodes, n = nds.length; i < n; i++) {
          if (nds[i].nodeType !== 1) continue;
          var id = nds[i].id.split('-')[1];
          if (document.getElementById('wallet-' + id)) continue;
          var nd = null;
          for (var ii = 0, nn = platforms.length; ii < nn; ii++) {
            var wp = document.getElementById('wallet-' + id + '-' + platforms[ii]);
            if (wp) var nd = wp;
          }
          if (nd === null) {
            var wf = document.getElementById('wallet-' + id + '-' + fallback);
            if (wf && wf.getAttribute('data-walletcompat').indexOf(platform) !== -1) var nd = wf;
          }
          if (nd === null) continue;
          nd = nd.cloneNode(true);
          nd.id = 'wallet-' + id;
          p.appendChild(nd);
        }
        walletRotate();
        removeClass(p, 'disabled');
        document.getElementById('walletsmobile').innerHTML = '';
      }, timeout));
    };
  if (!getMenuState()) return;
  updateMenu();
  updateWallets();
}

function walletRotate() {
  // Rotate wallets once a day.
  var ar = {
    1: [],
    2: [],
    3: [],
    4: []
  };
  for (var i = 0, nds = document.getElementById('wallets').childNodes, n = nds.length; i < n; i++) {
    if (nds[i].nodeType !== 1) continue;
    ar[parseInt(nds[i].getAttribute('data-walletlevel'))].push(nds[i]);
  }
  var sum = Math.floor(new Date() / 86400000);
  for (var k in ar) {
    if (!ar.hasOwnProperty(k)) continue;
    if (ar[k].length === 0) continue;
    var pre = ar[k][ar[k].length - 1].nextSibling;
    for (i = 0, n = sum % ar[k].length; i < n; i++) ar[k][i].parentNode.insertBefore(ar[k][i], pre);
  }
}

function makeEditable(e) {
  // An easter egg that makes the page editable when user click on the page and hold their mouse button for one second.
  // This trick allows translators and writers to preview their work.
  e = e || window.event;
  switch (getEvent(e, 'type')) {
    case 'mousedown':
      if ((e.which && e.which === 3) || (e.button && e.button === 2)) return;
      var t = getEvent(e, 'target');
      while (t.parentNode) {
        if (getStyle(t, 'overflow') === 'auto' || getStyle(t, 'overflow-y') === 'auto' || getStyle(t, 'overflow-x') === 'auto') return;
        t = t.parentNode;
      }
      addEvent(document.body, 'mouseup', makeEditable);
      addEvent(document.body, 'mousemove', makeEditable);
      document.body.setAttribute('timeoutEdit', setTimeout(function() {
        removeEvent(document.body, 'mouseup', makeEditable);
        removeEvent(document.body, 'mousemove', makeEditable);
        var c = document.getElementById('content');
        c.contentEditable = true;
        c.style.borderColor = '#bfbfbf';
        setTimeout(function() {
          c.style.borderColor = '';
        }, 200);
      }, 1000));
      break;
    case 'mouseup':
    case 'mousemove':
      removeEvent(document.body, 'mouseup', makeEditable);
      removeEvent(document.body, 'mousemove', makeEditable);
      clearTimeout(document.body.getAttribute('timeoutEdit'));
      break;
  }
}

// Add makeEditable event listener
var xint = setInterval(function() {
  if (!document.body) return;
  addEvent(document.body, 'mousedown', makeEditable);
  clearInterval(xint);
}, 200);
