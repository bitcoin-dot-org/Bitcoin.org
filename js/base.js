// This file is licensed under the MIT License (MIT) available on
// http://opensource.org/licenses/MIT.

// This file should be used only for javascript code
// necessary for all pages to work properly.

"use strict";

function addEvent(a, b, c) {
  // Attach event to a DOM node.
  // Ex. addEvent(node,'click',function);
  return (a.addEventListener) ? a.addEventListener(b, c, false) : (a.attachEvent) ? a.attachEvent('on' + b, c) : false;
}

function removeEvent(a, b, c) {
  // Detach event from a DOM node.
  // Ex. removeEvent(node,'click',function);
  return (a.removeEventListener) ? a.removeEventListener(b, c, false) : (a.detachEvent) ? a.detachEvent('on' + b, c) : false;
}

function cancelEvent(e) {
  // Cancel current event.
  // Ex. cancelEvent(event);
  e = e || window.event;
  (e.preventDefault) ? e.preventDefault(): e.returnValue = false;
}

function getEvent(e, a) {
  // Return requested event property.
  // Ex. var target = getEvent(event, 'target');
  e = (e) ? e : window.event;
  switch (a) {
    case 'type':
      return e.type;
    case 'target':
      return (e.target && e.target.nodeType === 3) ? e.target.parentNode : (e.target) ? e.target : e.srcElement;
  }
}

function getStyle(a, b) {
  // Return the value of the computed style on a DOM node.
  // Ex. getStyle(node,'padding-bottom');
  if (window.getComputedStyle) return document.defaultView.getComputedStyle(a, null).getPropertyValue(b);
  var n = b.indexOf('-');
  if (n !== -1) b = b.substr(0, n) + b.substr(n + 1, 1).toUpperCase() + b.substr(n + 2);
  return a.currentStyle[b];
}

function addClass(node, data) {
  // Add class to node.
  var cl = node.className.split(' ');
  for (var i = 0, n = cl.length; i < n; i++) {
    if (cl[i] === data) return;
  }
  cl.push(data);
  node.className = cl.join(' ');
}

function removeClass(node, data) {
  // Remove class from node.
  var ocl = node.className.split(' ');
  var ncl = [];
  for (var i = 0, n = ocl.length; i < n; i++) {
    if (ocl[i] !== data) ncl.push(ocl[i]);
  }
  node.className = ncl.join(' ');
}

function supportsSVG() {
  // Return true if the browser supports SVG.
  // Ex. if(!supportsSVG()){..apply png fallback..}
  // Old FF 3.5 and Safari 3 versions have svg support, but a very poor one
  // http://www.w3.org/TR/SVG11/feature#Image Defeat FF 3.5 only
  // http://www.w3.org/TR/SVG11/feature#Animation Defeat Saf 3 but also returns false in IE9
  // http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute Defeat Saf 3 but also returns false in Chrome and safari4
  // http://www.w3.org/TR/SVG11/feature#Text Defeat Saf 3 but also returns false in FF and safari4
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return false;
  if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) return false;
  if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute", "1.1") && !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Animation", "1.1") && !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Text", "1.1")) return false;
  return true;
}

function fallbackSVG() {
  // Replace all images extensions from .svg to .png if browser doesn't support SVG files.
  if (supportsSVG()) return;
  for (var i = 0, nd = document.getElementsByTagName('*'), n = nd.length; i < n; i++) {
    if (nd[i].nodeName === 'IMG' && /.*\.svg$/.test(nd[i].src)) nd[i].src = nd[i].src.slice(0, -3) + 'png';
    if (/\.svg/.test(getStyle(nd[i], 'background-image'))) nd[i].style.backgroundImage = getStyle(nd[i], 'background-image').replace('.svg', '.png');
    if (/\.svg/.test(getStyle(nd[i], 'background'))) nd[i].style.background = getStyle(nd[i], 'background').replace('.svg', '.png');
  }
}

function onTouchClick(e, callback, callbackClick) {
  // Detect and handle clicks using click and touch events while preventing accidental or ghost clicks.
  var timeout = 1000,
    srcEvent = e,
    touchEndListener = function(e) {
      // Call callback if touch events match the patterns of a click.
      removeEvent(t, 'touchend', touchEndListener);
      setClickTimeout();
      if (Math.abs(e.changedTouches[0].pageX - x) > 20 || Math.abs(e.changedTouches[0].pageY - y) > 20) return;
      callback(srcEvent);
    },
    wrongClickListener = function(e) {
      // Cancel click events on different targets within timeframe.
      // This avoids accidental clicks when the page is scrolled or updated due to the 300ms click event delay on mobiles.
      removeEvent(document.body, 'click', wrongClickListener);
      if (!clickReady() && getEvent(e, 'target') !== t) cancelEvent(e);
    },
    setClickTimeout = function() {
      // Update timeout during which click events will be blocked.
      document.body.setAttribute('data-touchtimeout', new Date().getTime() + timeout);
    },
    clickReady = function() {
      // Check if timeout during click events are blocked has expired.
      var ti = document.body.getAttribute('data-touchtimeout');
      return (ti === null || ti === '' || parseInt(ti, 10) < new Date().getTime());
    };
  if (callbackClick === undefined) callbackClick = function() {};
  // Apply appropriate actions according to each event type.
  switch (getEvent(e, 'type')) {
    case 'touchstart':
      // Save initial touchstart coordinates and listen for touchend events and accidental click events.
      var x = e.changedTouches[0].pageX,
        y = e.changedTouches[0].pageY,
        t = e.changedTouches[0].target;
      setClickTimeout();
      addEvent(t, 'touchend', touchEndListener);
      addEvent(document.body, 'click', wrongClickListener);
      setTimeout(function() {
        removeEvent(document.body, 'click', wrongClickListener);
      }, timeout);
      break;
    case 'click':
      // Call callback on click in the absence of a recent touchstart event to prevent ghost clicks.
      // Always call callbackClick to let it cancel click events on links.
      callbackClick(srcEvent);
      if (!clickReady()) return;
      callback(srcEvent);
      break;
  }
}

function mobileMenuShow(e) {
  // Show the mobile menu when the visitors touch the menu icon.
  var show = function() {
    var mm = document.getElementById('menusimple');
    var ml = document.getElementById('langselect');
    mm.style.display = ml.style.display = (mm.style.display === 'block') ? '' : 'block';
    addClass(mm, 'menutap');
    cancelEvent(e);
  };
  onTouchClick(e, show);
}

function mobileMenuHover(e) {
  // Prevent mobile menu to shrink on hover to prevent accidental clicks on other entries.
  var t = getEvent(e, 'target'),
    fn = (t.parentNode.className.indexOf('hover') === -1) ? addClass : removeClass,
    initHover = function() {
      if (t.nodeName !== 'A') return;
      if (fn === removeClass && !hasSubItems(t)) return;
      var p = t;
      while (p.parentNode.nodeName === 'UL' || p.parentNode.nodeName === 'LI') p = p.parentNode;
      for (var i = 0, nds = p.getElementsByTagName('LI'), n = nds.length; i < n; i++) {
        if (nds[i] === t.parentNode) continue;
        removeClass(nds[i], 'active');
        if (hasSubItems(nds[i])) continue;
        removeClass(nds[i], 'hover');
      }
      while (t !== p) {
        if (t.nodeName === 'LI') {
          fn(t, 'hover');
          fn(t, 'active');
        }
        t = t.parentNode;
      }
    },
    hasSubItems = function(t) {
      while (t.nodeName !== 'LI') t = t.parentNode;
      return (t.getElementsByTagName('UL').length > 0);
    },
    // Prevent clicks on parent element links in the menu.
    filterClick = function(e) {
      var t = getEvent(e, 'target');
      if (t.nodeName !== 'A') return;
      if (hasSubItems(t)) cancelEvent(e);
    };
  onTouchClick(e, initHover, filterClick);
}

function addAnchorLinks() {
  // Apply anchor links icon on each title displayed on CSS hover.
  var nodes = [];
  var tags = ['H2', 'H3', 'H4', 'H5', 'H6'];
  for (var i = 0, n = tags.length; i < n; i++) {
    for (var ii = 0, t = document.getElementsByTagName(tags[i]), nn = t.length; ii < nn; ii++) nodes.push(t[ii]);
  }
  for (var i = 0, n = nodes.length; i < n; i++) {
    if (!nodes[i].id) continue;
    if (nodes[i].getElementsByTagName('A').length > 0 && nodes[i].getElementsByTagName('A')[0].innerHTML === '') return;
    addClass(nodes[i], 'anchorAf');
    var anc = document.createElement('A');
    anc.href = '#' + nodes[i].id;
    nodes[i].insertBefore(anc, nodes[i].firstChild);
  }
}

/* jshint ignore:start */

 function _gaLt(event) {

	/* If GA is blocked or not loaded, or not main|middle|touch click then don't track */
	if (!ga.hasOwnProperty("loaded") || ga.loaded != true || (event.which != 1 && event.which != 2)) {
		return;
	}

	var el = event.srcElement || event.target;

	/* Loop up the DOM tree through parent elements if clicked element is not a link (eg: an image inside a link) */
	while (el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href)) {
		el = el.parentNode;
	}

	/* if a link with valid href has been clicked */
	if (el && el.href) {

		var link = el.href;

		/* Only if it is an external link */
		if (link.indexOf(location.host) == -1 && !link.match(/^javascript\:/i)) {

			/* Is actual target set and not _(self|parent|top)? */
			var target = (el.target && !el.target.match(/^_(self|parent|top)$/i)) ? el.target : false;

			/* Assume a target if Ctrl|shift|meta-click */
			if (event.ctrlKey || event.shiftKey || event.metaKey || event.which == 2) {
				target = "_blank";
			}

			var hbrun = false; // tracker has not yet run

			/* HitCallback to open link in same window after tracker */
			var hitBack = function() {
				/* run once only */
				if (hbrun) return;
				hbrun = true;
				window.location.href = link;
			};

			if (target) { /* If target opens a new window then just track */
				ga(
					"send", "event", "Outgoing Links", link,
					document.location.pathname + document.location.search
				);
			} else { /* Prevent standard click, track then open */
				event.preventDefault ? event.preventDefault() : event.returnValue = !1;
				/* send event with callback */
				ga(
					"send", "event", "Outgoing Links", link,
					document.location.pathname + document.location.search, {
						"hitCallback": hitBack
					}
				);

				/* Run hitCallback again if GA takes longer than 1 second */
				setTimeout(hitBack, 1000);
			}
		}
	}
}

function trackOutgoingLinks() {
	if (navigator.doNotTrack != "yes" && navigator.doNotTrack != "1" && window.doNotTrack != "1" && navigator.msDoNotTrack != "1") {
		var _w = window;
		/* Use "click" if touchscreen device, else "mousedown" */
		var _gaLtEvt = ("ontouchstart" in _w) ? "click" : "mousedown";
		/* Attach the event to all clicks in the document after page has loaded */
		_w.addEventListener ? _w.addEventListener("load", function() {document.body.addEventListener(_gaLtEvt, _gaLt, !1)}, !1) : _w.attachEvent && _w.attachEvent("onload", function() {document.body.attachEvent("on" + _gaLtEvt, _gaLt)});
	}
}

/* jshint ignore:end */
