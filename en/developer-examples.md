---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: developer-examples
title: "Developer Examples - Bitcoin"
---
<link rel="stylesheet" href="/css/jquery-ui.min.css">

# Bitcoin Developer Examples

<p class="summary">Find examples of how to build programs using Bitcoin.</p>

<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="goback"><li><a href="/en/developer-documentation">Return To Overview</a></li></ul>
<ul class="reportissue"><li><a href="https://github.com/bitcoin/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report An Issue</a></li></ul>
<ul class="editsource"><li><a href="https://github.com/bitcoin/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">Edit On GitHub</a></li></ul>

</div></div>
<div markdown="1" class="toccontent">

{% include fragment_reviews_needed.md %}

<input id="glossary_term" class="glossary_term" placeholder="Search the glossary, RPCs, and more">

{% include example_intro.md %}

{% include example_testing.md %}

{% include example_transactions.md %}

{% include example_payment_processing.md %}

{% include example_p2p_networking.md %}

{% include references.md %}
{{site.glossary_links}}

</div>

<script>updateToc();</script>
<script>addAnchorLinks();</script>
<script src="/js/jquery-1.11.2.min.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/js/devsearch.js"></script>
