// This file is licensed under the MIT License (MIT) available on
// http://opensource.org/licenses/MIT.

// This file should be used only for javascript code
// necessary for all pages to work properly.

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
if (!e) var e = window.event;
(e.preventDefault) ? e.preventDefault() : e.returnValue = false;
}

function getEventTarget(e) {
// Return target DOM node on which the event is triggered.
// Ex. getEventTarget(event);
if (!e) var e = window.event;
return (e.target && e.target.nodeType == 3) ? e.target.parentNode : (e.target) ? e.target : e.srcElement;
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
	if (cl[i] == data) return;
}
cl.push(data);
node.className = cl.join(' ');
}

function removeClass(node, data) {
// Remove class from node.
var ocl = node.className.split(' ');
var ncl = [];
for (var i = 0, n = ocl.length; i < n; i++) {
	if (ocl[i] != data) ncl.push(ocl[i]);
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
	if (nd[i].nodeName == 'IMG' && /.*\.svg$/.test(nd[i].src)) nd[i].src = nd[i].src.slice(0, -3) + 'png';
	if (/\.svg/.test(getStyle(nd[i], 'background-image'))) nd[i].style.backgroundImage = getStyle(nd[i], 'background-image').replace('.svg', '.png');
	if (/\.svg/.test(getStyle(nd[i], 'background'))) nd[i].style.background = getStyle(nd[i], 'background').replace('.svg', '.png');
}
}

function mobileMenuShow(e) {
// Show the mobile menu when the visitors touch the menu icon.
var mm = document.getElementById('menusimple');
var ml = document.getElementById('langselect');
var t = document.getElementById('menumobile');
mm.style.display = ml.style.display = (mm.style.display == 'block') ? '' : 'block';
cancelEvent(e);
}

function mobileMenuHover(e) {
// Add a delay before hiding menu for mobiles to prevent accidental clicks.
var p = t = getEventTarget(e);
if (t.nodeName != 'A') return;
while (p.parentNode.nodeName != 'DIV') p = p.parentNode;
while (t.nodeName != 'LI' || t.parentNode != p) t = t.parentNode;
var ul = null;
if (t.getElementsByTagName('UL').length > 0) {
	var ul = t.getElementsByTagName('UL')[0];
	addClass(ul, 'hover');
}
setTimeout(function() {
	for (var i = 0, nd = p.getElementsByTagName('UL'), n = nd.length; i < n; i++) {
		if (nd[i] == ul) continue;
		removeClass(nd[i], 'hover');
	}
}, 1);
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
	if (nodes[i].getElementsByTagName('A').length > 0 && nodes[i].getElementsByTagName('A')[0].innerHTML == '') return;
	addClass(nodes[i], 'anchorAf');
	var anc = document.createElement('A');
	anc.href = '#' + nodes[i].id;
	nodes[i].insertBefore(anc, nodes[i].firstChild);
}
}
