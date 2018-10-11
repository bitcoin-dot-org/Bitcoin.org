---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
---
"use strict";

var search_data = {{ site.devsearches_json }};

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
    source: search_data,
    delay: 0,
    minLength: 2,
    autoFocus: true,
    select: function(event, ui) {
      location.href = ui.item.uri;
    }
  }).bind('focus', function(){ $(this).catcomplete("search"); if (this.setSelectionRange) { var len = $(this).val().length * 2; var input = this; window.setTimeout(function() { input.setSelectionRange(len, len); }, 0); } else { $(this).val($(this).val());}});


});
{% endraw %}
