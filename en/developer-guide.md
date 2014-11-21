---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: developer-guide
title: "Developer Guide - Bitcoin"
---

# Bitcoin Developer Guide

<p class="summary">Find detailed information about the Bitcoin protocol and related specifications.</p>

<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="goback"><li><a href="/en/developer-documentation">Return To Overview</a></li></ul>
<ul class="reportissue"><li><a href="https://github.com/bitcoin/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report An Issue</a></li></ul>
<ul class="editsource"><li><a href="https://github.com/bitcoin/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">Edit On GitHub</a></li></ul>

</div></div>

<div markdown="1" class="toccontent">

<!-- includes should be separated by an empty line to prevent a
paragraph at the end of one file from breaking the heading at the start
of the following file. -->

{% include fragment_reviews_needed.md %}

{% include guide_intro.md %}

<div class="sourcefile" data-sourcefile="guide_block_chain.md"></div>

{% include guide_block_chain.md %}

<div class="sourcefile" data-sourcefile="guide_transactions.md"></div>

{% include guide_transactions.md %}

<div class="sourcefile" data-sourcefile="guide_contracts.md"></div>

{% include guide_contracts.md %}

<div class="sourcefile" data-sourcefile="guide_wallets.md"></div>

{% include guide_wallets.md %}

<div class="sourcefile" data-sourcefile="guide_payment_processing.md"></div>

{% include guide_payment_processing.md %}

<div class="sourcefile" data-sourcefile="guide_operating_modes.md"></div>

{% include guide_operating_modes.md %}

<div class="sourcefile" data-sourcefile="guide_p2p_network.md"></div>

{% include guide_p2p_network.md %}

<div class="sourcefile" data-sourcefile="guide_mining.md"></div>

{% include guide_mining.md %}

{% include references.md %}

</div>

<script>updateToc();</script>
<script>addAnchorLinks();</script>
