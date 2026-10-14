// This file is licensed under the MIT License (MIT) available on
// https://opensource.org/licenses/MIT.

"use strict";

(function() {
  var search = document.getElementById('bip-search');
  var status = document.getElementById('bip-status-filter');
  var resultCount = document.getElementById('bip-result-count');
  var noResults = document.getElementById('bip-no-results');

  if (!search || !status || !resultCount || !noResults) return;

  var rows = document.getElementsByClassName('bip-index-row');

  function normalized(value) {
    return value.toLowerCase().replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
  }

  function filterBips() {
    var query = normalized(search.value);
    var selectedStatus = status.value;
    var shown = 0;

    for (var index = 0; index < rows.length; index++) {
      var row = rows[index];
      var matchesQuery = !query || normalized(row.getAttribute('data-search')).indexOf(query) !== -1;
      var matchesStatus = !selectedStatus || row.getAttribute('data-status') === selectedStatus;
      var visible = matchesQuery && matchesStatus;

      row.style.display = visible ? '' : 'none';
      row.setAttribute('aria-hidden', visible ? 'false' : 'true');
      if (visible) shown++;
    }

    resultCount.textContent = shown === rows.length ?
      'Showing all ' + rows.length + ' BIPs' :
      'Showing ' + shown + ' of ' + rows.length + ' BIPs';
    noResults.hidden = shown !== 0;
  }

  addEvent(search, 'input', filterBips);
  addEvent(search, 'keyup', filterBips);
  addEvent(status, 'change', filterBips);
  filterBips();
}());
