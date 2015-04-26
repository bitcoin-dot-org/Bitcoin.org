---
layout: null
---
var zoom=2;
var minzoom=1;
if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))var zoom=minzoom=0;
var map = L.map('eventmap',{ 'zoom': zoom, 'minZoom': minzoom, 'center': [20.00, 10.00]});
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Data &copy; by <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>.',
	maxZoom: 18
}).addTo(map);

var markers = new L.MarkerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 40});
{% filter_for p in site.conferences sort_by:date %}{% if p.geoloc %}
L.marker([{{ p.geoloc }}]).bindPopup('<b><a href="{{ p.link | htmlescape }}">{{ p.title | htmlescape }}</a></b><br>{{ p.date }}<br>{{ p.venue | htmlescape }}<br>{{ p.address | htmlescape }}<br>{{ p.city | htmlescape }}, {{ p.country | htmlescape }}').addTo(markers);
{% endif %}{% endfilter_for %}

{% filter_for p in site.meetups sort_by:date %}{% if p.geoloc %}
L.marker([{{ p.geoloc }}]).bindPopup('<b><a href="{{ p.link | htmlescape }}">{{ p.title | htmlescape }}</a></b><br>{{ p.date }}<br>{{ p.venue | htmlescape }}<br>{{ p.address | htmlescape }}<br>{{ p.city | htmlescape }}, {{ p.country | htmlescape }}').addTo(markers);
{% endif %}{% endfilter_for %}

map.addLayer(markers);
