// This file is licensed under the MIT License (MIT) available on
// http://opensource.org/licenses/MIT.

// This file is used for javascript code
// necessary for some pages to work properly.

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

function getTop (a) {
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
if (getStyle(document.getElementById('detectmobile'), 'display') != 'none') return true;
return false;
}

function scrollToNode(t) {
// Scroll to any node on the page.
if (document.body.getAttribute('data-scrollstatus') != null) {
	clearInterval(document.body.getAttribute('data-scrollstatus'));
	document.body.removeAttribute('data-scrollstatus');
}
var delay = 800;
var py = getPageYOffset();
var fy = getTop(t)
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
var x = domPrefixes = 'Webkit Moz ms O'.split(' ');
var nd = document.createElement('DIV');
id = id.toLowerCase();
if (nd.style[id] !== undefined) return true;
idc = id.charAt(0).toUpperCase() + id.substr(1);
for (var i = 0, n = domPrefixes.length; i < n; i++) {
	if (nd.style[domPrefixes[i] + idc] !== undefined) return true;
}
return false;
}

function boxShow(e) {
// Display the box content when the user click a box on the "Secure your wallet" page.
var p = t = getEventTarget(e);
while (p.nodeName != 'DIV') p = p.parentNode;
var sh = getHeight(p);
for (var i = 0, nds = p.childNodes, n = nds.length; i < n; i++)
	if (nds[i].nodeType == 1) nds[i].style.display = 'block';
t.removeAttribute('href');
t.onclick = '';
var dh = getHeight(p);
p.style.height = sh + 'px';
setTimeout(function() {
	p.style.transition = 'height 400ms ease-out';
	p.style.MozTransition = 'height 400ms ease-out';
	p.style.WebkitTransition = 'height 400ms ease-out';
	setTimeout(function() {
		p.style.height = dh + 'px';
	}, 20);
}, 20);
cancelEvent(e);
}

function faqShow(e) {
// Display the content of a question in the FAQ at user request.
var p = t = getEventTarget(e);
while (p.nodeType != 1 || p.nodeName != 'DIV') p = p.nextSibling;
var pp = p.cloneNode(true);
pp.style.visibility = 'hidden';
pp.style.height = 'auto';
p.parentNode.appendChild(pp);
var nhe = getHeight(pp);
pp.parentNode.removeChild(pp);
p.style.height = (p.style.height != '0px' && p.style.height != '') ? '0px' : nhe + 'px';
cancelEvent(e);
}

function materialShow(e) {
// Display more materials on the "Press center" page at user request.
var p = t = getEventTarget(e);
while (p.nodeType != 1 || p.nodeName != 'DIV') p = p.previousSibling;
var pp = p.cloneNode(true);
pp.style.visibility = 'hidden';
pp.style.height = 'auto';
p.parentNode.appendChild(pp);
var nhe = getHeight(pp);
pp.parentNode.removeChild(pp);
p.style.height = (p.style.height != '0px' && p.style.height != '') ? '0px' : nhe + 'px';
t.style.display = 'none';
cancelEvent(e);
}

function librariesShow(e) {
// Display more open source projects on the "Development" page at user request.
var p = t = getEventTarget(e);
while (p.nodeType != 1 || p.nodeName != 'UL') p = p.parentNode;
var sh = getHeight(p);
for (var i = 0, nds = p.getElementsByTagName('LI'), n = nds.length; i < n; i++) nds[i].style.display = 'list-item';
t.parentNode.parentNode.removeChild(t.parentNode);
var dh = getHeight(p);
p.style.height = sh + 'px';
setTimeout(function() {
	p.style.transition = 'height 400ms ease-out';
	p.style.MozTransition = 'height 400ms ease-out';
	p.style.WebkitTransition = 'height 400ms ease-out';
	setTimeout(function() {
		p.style.height = dh + 'px';
	}, 20);
}, 20);
cancelEvent(e);
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
var first;
var last;
var closer;
var init = function() {
	setenv();
	updatehistory();
	updatetoc();
}
// Set variables.
var setenv = function() {
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
			if (t[ii].className.indexOf('no_toc')!==-1) continue;
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
var updatetoc = function() {
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
		if (t[i].nodeName == 'A' && t[i].getAttribute('href') == '#' + closer[0].id) a = t[i];
	}
	if (a === false) return;
	// Set .active class on new active toc entry.
	var nd = a;
	while (nd.parentNode.nodeName == 'LI' || nd.parentNode.nodeName == 'UL') {
		addClass(nd, 'active');
		nd = nd.parentNode;
	}
	// Auto-scroll in toc to keep active toc entry visible.
	var nd = a;
	var otop = nd.offsetTop;
	while (nd.offsetParent != div && nd.offsetParent) {
		nd = nd.offsetParent;
		otop += nd.offsetTop;
	}
	var bdiff = getHeight(a) + otop - div.scrollTop - getHeight(div);
	var tdiff = getHeight(a) - otop + div.scrollTop;
	if (tdiff > 0 || bdiff > 0) div.scrollTop -= tdiff;
}
// Update browser url.
var updatehistory = function() {
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
var evtimeout = function() {
	toc = document.getElementById('toc');
	clearTimeout(toc.getAttribute('data-timeout'));
	toc.setAttribute('data-timeout', setTimeout(init, 1));
}
// Reset timestamp on page load and each time the user clicks a url.
var evtimestamp = function() {
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
var t = getEventTarget(e);
t.href = 'https://github.com/bitcoin/bitcoin.org/issues/new?body=' + encodeURIComponent('Location: ' + window.location.href.toString() + "\n\n");
}

function updateSource(e){
// Update GitHub source file link pre-filled with current page location.
if (!document.getElementsByClassName) return;
var t = getEventTarget(e),
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
t.href = 'https://github.com/bitcoin/bitcoin.org/edit/master/' + closer[0].getAttribute('data-sourcefile');
}

function disclaimerClose(e) {
// Auto close temporary disclaimer in devel-docs.
if (e) cancelEvent(e);
var t = document.getElementById('develdocdisclaimer')
t.parentNode.removeChild(t);
if (typeof(Storage) === 'undefined') return;
sessionStorage.setItem('develdocdisclaimerclose', '1');
}

function disclaimerAutoClose() {
// Auto close temporary disclaimer in devel-docs if session says so.
if (typeof(Storage) === 'undefined') return;
if (sessionStorage.getItem('develdocdisclaimerclose') === '1') disclaimerClose();
}

function walletListener(e) {
// Listen events on the wallets categories menu and hide / show / select wallets accordingly.
var t = getEventTarget(e);
switch (e.type) {
	case 'click':
		if (t.nodeName == 'A') walletSelectPlatform(t);
		break;
	case 'mouseover':
		if (t.nodeName == 'A') walletShowPlatform(t.getAttribute('data-walletcompat'));
		if (t.nodeName == 'A') clearTimeout(document.getElementById('walletmenu').getAttribute('data-wallettimeout'));
		break;
	case 'mouseout':
		clearTimeout(document.getElementById('walletmenu').getAttribute('data-wallettimeout'));
		document.getElementById('walletmenu').setAttribute('data-wallettimeout', setTimeout(walletFallbackPlatform, 100));
		break;
}
}

function walletSelectPlatform(t) {
// Select wallets platform when the mouse clicks on the menu.
var p = t;
while (p.nodeName != 'DIV') p = p.parentNode;
for (var i = 0, nds = p.getElementsByTagName('A'), n = nds.length; i < n; i++) {
	nds[i].removeAttribute('data-select');
	removeClass(nds[i].parentNode, 'select');
}
t.setAttribute('data-select', '1');
addClass(t.parentNode, 'select');
if (isMobile() && t.parentNode.getElementsByTagName('UL').length == 0) {
	setTimeout(function() {
		scrollToNode(document.getElementById('wallets'));
	}, 10);
}
}

function walletFallbackPlatform() {
// Show back wallets for selected platform when the mouse leaves the menu without selecting another platform.
var select = null;
var active = null;
for (var i = 0, nds = document.getElementById('walletmenu').getElementsByTagName('A'), n = nds.length; i < n; i++) {
	if (nds[i].getAttribute('data-select') == '1') select = nds[i];
	if (nds[i].getAttribute('data-active') == '1') active = nds[i];
}
if (select === null || active === null) return;
walletShowPlatform(select.getAttribute('data-walletcompat'));
}

function walletShowPlatform(platform) {
// Show wallets for given platform in the menu.
var fallback = '';
// Update menu and set fallback category if hovering in a submenu.
for (var i = 0, nds = document.getElementById('walletmenu').getElementsByTagName('A'), n = nds.length; i < n; i++) {
	if (nds[i].getAttribute('data-walletcompat') != platform) continue;
	if (nds[i].getAttribute('data-active') == 1) return;
	var t = nds[i];
	if (nds[i].parentNode.parentNode.parentNode.nodeName == 'LI') fallback = nds[i].parentNode.parentNode.parentNode.getElementsByTagName('A')[0].getAttribute('data-walletcompat');
	break;
}
for (var i = 0, nds = document.getElementById('walletmenu').getElementsByTagName('A'), n = nds.length; i < n; i++) {
	nds[i].removeAttribute('data-active');
	removeClass(nds[i].parentNode, 'active');
}
if (platform != 'default') {
	t.setAttribute('data-active', '1');
	addClass(t.parentNode, 'active');
	if (t.parentNode.parentNode.parentNode.nodeName == 'LI') addClass(t.parentNode.parentNode.parentNode, 'active');
}
// Replace wallets by those for given platform and rotate.
var p = document.getElementById('wallets');
var ti = 200;
if (p.getAttribute('timeout') === null || p.getAttribute('timeout') === '' || !supportCSS('transition')) ti = 1;
addClass(p, 'disabled');
clearTimeout(p.getAttribute('timeout'));
p.setAttribute('timeout', setTimeout(function() {
	p.innerHTML = '';
	for (var i = 0, nds = document.getElementById('walletsswitch').childNodes, n = nds.length; i < n; i++) {
		if (nds[i].nodeType != 1) continue;
		var id = nds[i].id.split('-')[1];
		if (document.getElementById('wallet-' + id)) continue;
		var nd = null;
		if (platform == 'default') {
			var defpl = ['desktop', 'mobile'];
			for (var ii = 0, nn = defpl.length; ii < nn; ii++) {
				if (document.getElementById('wallet-' + id + '-' + defpl[ii])) var nd = document.getElementById('wallet-' + id + '-' + defpl[ii]);
			}
		}
		else {
			if (document.getElementById('wallet-' + id + '-' + platform)) var nd = document.getElementById('wallet-' + id + '-' + platform);
			else if (document.getElementById('wallet-' + id + '-' + fallback) && document.getElementById('wallet-' + id + '-' + fallback).getAttribute('data-walletcompat').indexOf(platform) !== -1) var nd = document.getElementById('wallet-' + id + '-' + fallback);
		}
		if (nd === null) continue;
		nd = nd.cloneNode(true);
		nd.id = 'wallet-' + id;
		addClass(nd, 'nohover');
		p.appendChild(nd);
	}
	walletRotate()
	removeClass(p, 'disabled');
	document.getElementById('walletsmobile').innerHTML = '';
}, ti));
}

function walletRotate() {
// Rotate wallets once a day.
var ar = {
	1: [],
	2: [],
	3: [],
	4: []
}
for (var i = 0, nds = document.getElementById('wallets').childNodes, n = nds.length; i < n; i++) {
	if (nds[i].nodeType != 1) continue;
	ar[parseInt(nds[i].getAttribute('data-walletlevel'))].push(nds[i]);
}
var sum = Math.floor(new Date() / 86400000);
for (var k in ar) {
	if (ar[k].length == 0) continue;
	var pre = ar[k][ar[k].length - 1].nextSibling;
	for (i = 0, n = sum % ar[k].length; i < n; i++) ar[k][i].parentNode.insertBefore(ar[k][i], pre);
}
}

function walletShow(e) {
// Show wallet on click on mobile or desktop.
var t = getEventTarget(e);
if (t.id == 'wallets') return;
while (t.parentNode.id != 'wallets') t = t.parentNode;
if (isMobile()) {
	var p = document.getElementById('walletsmobile');
	t = t.cloneNode(true);
	p.innerHTML = '';
	p.appendChild(t);
	scrollToNode(p);
} else {
	t.setAttribute('data-previousclass', t.className);
	removeClass(t, 'nohover');
	removeClass(t, 'disabled');
	addEvent(t, 'mouseover', walletHide);
	addEvent(t, 'mouseout', walletHide);
}
}

function walletHide(e) {
// Disable wallet when the mouse leaves the wallet bubble.
var t = getEventTarget(e);
if (t.id == 'wallets') return;
while (t.parentNode.id != 'wallets') t = t.parentNode;
clearTimeout(t.getAttribute('data-disabletimeout'));
if (e.type == 'mouseover') return;
t.setAttribute('data-disabletimeout', setTimeout(function() {
	for (var i = 0, nds = t.getAttribute('data-previousclass').split(' '), n = nds.length; i < n; i++) addClass(t, nds[i]);
	t.removeAttribute('data-disabletimeout');
	removeEvent(t, 'mouseout', walletHide);
	removeEvent(t, 'mouseover', walletHide);
}, 1));
}

function makeEditable(e) {
// An easter egg that makes the page editable when user click on the page and hold their mouse button for one second.
// This trick allows translators and writers to preview their work.
if (!e) var e = window.event;
switch (e.type) {
	case 'mousedown':
		if ((e.which && e.which == 3) || (e.button && e.button == 2)) return;
		var t = getEventTarget(e);
		while (t.parentNode) {
			if (getStyle(t, 'overflow') == 'auto' || getStyle(t, 'overflow-y') == 'auto' || getStyle(t, 'overflow-x') == 'auto') return;
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
