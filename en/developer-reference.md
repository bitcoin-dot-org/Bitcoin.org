---
layout: base
lang: en
id: developer-reference
title: "Developer Reference - Bitcoin"
---

# Bitcoin Developer Reference

<p class="summary">Find technical specifications and API documentation.</p>

<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="goback"><li><a href="/en/developer-documentation">Return To Overview</a></li></ul>
<ul class="reportissue"><li><a href="https://github.com/bitcoin/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report An Issue</a></li></ul>

</div></div>
<div markdown="1" class="toccontent">

{% include fragment_reviews_needed.md %}

{% include ref_intro.md %}

{% include ref_block_chain.md %}

{% include ref_transactions.md %}

{% include ref_wallets.md %}

{% include ref_p2p_networking.md %}

## Bitcoin Core APIs

<!-- TODO, Relevant links:
-- * https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_Calls_list
-- * https://en.bitcoin.it/wiki/API_reference_(JSON-RPC)
-->

{% include ref_core_rpc_intro.md %}

### Remote Procedure Calls (RPCs)

**Warning:** the block chain and memory pool can include arbitrary data
which several of the commands below will return in hex format. If you
convert this data to another format in an executable context, it could
be used in an exploit. For example, displaying an output script as
ASCII text in a webpage could add arbitrary Javascript to that page and
create a cross-site scripting (XSS) exploit. To avoid problems, please
treat block chain and memory pool data as an arbitrary input from an
untrusted source.

{% include ref_core_rpcs-abcdefg.md %}
{% include ref_core_rpcs-hijklmn.md %}
{% include ref_core_rpcs-opqrst.md %}
{% include ref_core_rpcs-uvwxyz.md %}
{% include references.md %}

</div>

<script>updateToc();</script>
<script>addAnchorLinks();</script>
