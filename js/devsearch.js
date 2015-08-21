---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
---
{% comment %}

NOTICE: if you edit this template, you should also edit
        /quality-assurance/devsearches.html which creates a page whose
        links can be checked by HTML proofer

Nested loops below:
  1. site.devsearches: container for all searches defined in _config.yaml in
     the arbitrary order they should appear
  2. list: a list item in devsearches; only has two elements:
     a. the name of the category
     b. an array containing the sublist items (pre-sorted)
  3. sublist: a list of the items we want to display as a one-entry hash table
  4. term: the term as the key [0] and the uri as the value [1]

{% endcomment %}

"use strict";

var search_data = [
{% for list in site.devsearches %}{% for item in list %}
{% if forloop.first %}{% capture category_name %}{{item}}{% endcapture %}
{% else %}{% for sublist in item %}{% for term in sublist %}
{
label: "{{term[0]}}",
uri: "{{term[1]}}",
category: "{{category_name}}"
}{% endfor %}{% unless forloop.last %},{% endunless %}{% endfor %}{% endif %}{% endfor %}{% unless forloop.last %},{% endunless %}{% endfor %}
];


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
  });
});
{% endraw %}
