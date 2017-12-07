---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
end_of_page: |
  <script src="/js/jquery/jquery-1.11.2.min.js"></script>
  <script src="/js/jquery/jquery-ui.min.js"></script>
  <script src="/js/devsearch.js"></script>
  <script>updateToc();</script>
---
<link rel="stylesheet" href="/css/jquery-ui.min.css">

{% if page.show_subhead_links_on_top %}
{% capture filename %}{{page.filename}}{% endcapture %}
{% include helpers/subhead-links.md %}
<br>
{% endif %}

{% if page.pagetitle-translated %}
<h1>{{ page.pagetitle-translated }}</h1>
{% else %}
<h1>{% translate pagetitle %}</h1>
{% endif %}
<p class="summary">{% translate summary %}</p>

{% markdown %}

{% if page.show_toc %}
<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="goback"><li><a href="/{{ page.lang }}/developer-documentation">{% translate navigationreturn developer-documentation %}</a></li></ul>
<ul class="reportissue"><li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new" onmouseover="updateIssue(event);">{% translate navigationreport developer-documentation %}</a></li></ul>
<ul class="editsource"><li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">{% translate navigationedit developer-documentation %}</a></li></ul>

</div></div>
<div markdown="1" class="toccontent">
{% endif %}

{% if page.show_fragments %}
{% include helpers/fragment_reviews_needed.md %}
{% endif %}

<input id="glossary_term" class="glossary_term" placeholder="{% translate glossarysearchplaceholder developer-documentation %}">

{% unless page.hide_translation_disclaimer %}
{% if page.lang != 'en' %}
{% include helpers/fragment_translation_warning.md %}
{% endif %}
{% endunless %}

{{ content }}

{{ site.glossary_links }}
{% include references.md %}
{% endmarkdown %}
