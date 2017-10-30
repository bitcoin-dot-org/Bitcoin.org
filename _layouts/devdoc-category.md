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

<h1>{{ page.header_title }}</h1>
<p class="summary">{{ page.header_description }}</p>

{% markdown %}
<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="goback"><li><a href="/en/developer-documentation">Return To Overview</a></li></ul>
<ul class="reportissue"><li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report An Issue</a></li></ul>
<ul class="editsource"><li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">Edit On GitHub</a></li></ul>

</div></div>
<div markdown="1" class="toccontent">

{% include_absolute _devdocs/en/devdoc/fragment_reviews_needed.html %}

<input id="glossary_term" class="glossary_term" placeholder="Search the glossary, RPCs, and more">

{% autocrossref %}
{% for subpage in page.pages %}
{% include_absolute {{ subpage }} %}
{% endfor %}
{% endautocrossref %}

{{ site.glossary_links }}
{% include references.md %}
{% endmarkdown %}

</div>
