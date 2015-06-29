---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: developer-guide
title: "Developer Guide - Bitcoin"
---
<link rel="stylesheet" href="/css/jquery-ui.min.css">

# Bitcoin Developer Guide

<p class="summary">Find detailed information about the Bitcoin protocol and related specifications.</p>

<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="goback"><li><a href="/en/developer-documentation">Return To Overview</a></li></ul>
<ul class="reportissue"><li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report An Issue</a></li></ul>
<ul class="editsource"><li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">Edit On GitHub</a></li></ul>

</div></div>

<div markdown="1" class="toccontent">

<!-- includes should be separated by an empty line to prevent a
paragraph at the end of one file from breaking the heading at the start
of the following file. -->

{% include fragment_reviews_needed.md %}

<input id="glossary_term" class="glossary_term" placeholder="Search the glossary, RPCs, and more">

{% include guide_intro.md %}

{% include guide_block_chain.md %}

{% include guide_transactions.md %}

{% include guide_contracts.md %}

{% include guide_wallets.md %}

{% include guide_payment_processing.md %}

{% include guide_operating_modes.md %}

{% include guide_p2p_network.md %}

{% include guide_mining.md %}

{% include references.md %}
{{site.glossary_links}}

</div>

<script>updateToc();</script>
<script>addAnchorLinks();</script>
<script src="/js/jquery-1.11.2.min.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/js/devsearch.js"></script>
