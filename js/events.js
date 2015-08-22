---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: null
---

"use strict";

var zoom = 2;
var minzoom = 1;
if (isMobile()) zoom = minzoom = 0;
var map = L.map('eventmap', {
  'zoom': zoom,
  'minZoom': minzoom,
  'center': [20.00, 10.00]
});
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Data &copy; by <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>.',
  maxZoom: 18
}).addTo(map);

var markers = new L.MarkerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 40
});
for (var i = 0, nds = document.getElementById('eventdata').getElementsByTagName('DIV'), n = nds.length; i < n; i++) {
  L.marker([parseFloat(nds[i].getAttribute('data-lat')), parseFloat(nds[i].getAttribute('data-lon'))]).bindPopup(nds[i].innerHTML).addTo(markers);
}

map.addLayer(markers);
