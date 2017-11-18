---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: devdoc-category
id: developer-glossary
breadcrumbs:
  - bitcoin
  - dev docs
  - dev docs glossary
show_fragments: false
show_toc: false
---

<div markdown="block" class="notice">
<span markdown="span">{% translate subsummary %}</span>
</div>

{% comment %}
## The following single-space-indented code (sorry, whitespace
## sensitive) takes the alphabetized array of individual hash objects
## and puts them in a list sorted by the first character of each term
## characters (case insensitive). E.g.:
##
##     Alpha
##     Apropos
##
##     Beta
##
##     Gamma
##     Gnu
##
## The current style sheet gives each item a certain width and then
## floats them so terms starting with the same character are grouped
## together. Hopefully this strikes the right balance between
## information density and too much whitespace.
{% endcomment %}
## {% translate categorynumbers developer-glossary %}
<!-- no subhead-links here -->
{% for item in site.devsearches.Glossary[page.lang] %}
{% if forloop.first %}{% assign first_term = true %}{% else %}{% assign first_term = false %}{% endif %}
{% for term in item %}
 {% capture text_and_link %}<a href="{{term[1]}}">{{term[0]}}</a>{% endcapture %}
 {% capture first_character %}{{term[0] | downcase | truncate: 1, '' }}{% endcapture %}
 {% if first_character != '0' ||
       first_character != '1' ||
       first_character != '2' ||
       first_character != '3' ||
       first_character != '4' ||
       first_character != '5' ||
       first_character != '6' ||
       first_character != '7' ||
       first_character != '8' ||
       first_character != '9' %}
  {% assign finished_with_numbers = true %}
 {% endif %}
 {% if first_character == last_first_character %}
  <li markdown="span">{{text_and_link}}</li>
 {% else %}
  {% unless first_term %}
   </ul><br class="clear">
  {% endunless %}
  {% if finished_with_numbers %}
## {{ first_character | upcase }}
<!-- no subhead-links here -->
  {% endif %}

  {% case first_character %}
  {% when 'b' %}
   See also: [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips#readme)
  {% when 'o' %}
   See also: [Opcodes](https://en.bitcoin.it/wiki/Script#Words)
  {% when 'p' %}
   See also: [P2P protocol messages](/en/developer-reference#data-messages)
  {% when 'r' %}
   See also: [Bitcoin Core RPCs](/en/developer-reference#rpc-quick-reference)
  {% endcase %}

  <ul class="wrapped_list">
  <li markdown="span">{{text_and_link}}</li>
 {% endif %}
 {% capture last_first_character %}{{first_character}}{% endcapture %}
{% endfor %}
{% endfor %}
{% comment %}Close off last list and end the float: {% endcomment %}
</ul><br class="clear">

<div markdown="block" class="notice">
<span markdown="span">{% translate suggestnewterm %}</span>
</div>

[1]: https://github.com/bitcoin-dot-org/bitcoin.org/issues/new?title=New%20glossary%20term%20suggestion:
