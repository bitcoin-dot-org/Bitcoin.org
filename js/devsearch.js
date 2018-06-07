---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
---
"use strict";

var search_data = {{ site.devsearches_json }}

{% raw %}
// code adapted from http://jqueryui.com/autocomplete/#categories
// MIT license: https://jquery.org/license/

$.widget("custom.catcomplete", $.ui.autocomplete, {
  _create: function() {
    this._super();
    this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
  },
  _renderMenu: function(ul, items) {
    var that = this,
      currentCategory = "";
    $.each(items, function(index, item) {
      var li;
      if (item.category !== currentCategory) {
        ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
        currentCategory = item.category;
      }
      li = that._renderItemData(ul, item);
      if (item.category) {
        li.attr("aria-label", item.category + " : " + item.label);
      }
    });
  }
});
$(function() {
  $("#glossary_term").catcomplete({
    source: function(request, respond) {
        var lang = $('html').attr('lang');
        var term = request.term;

        var results = search_data.filter(function(data) {
            return (
                (data.label.indexOf(term) !== -1 && data.lang === lang) || data.category !== "Glossary"
            );
        });

        respond(results);
    },
    delay: 0,
    minLength: 2,
    autoFocus: true,
    select: function(event, ui) {
      location.href = ui.item.uri;
    }
  });
});
{% endraw %}
