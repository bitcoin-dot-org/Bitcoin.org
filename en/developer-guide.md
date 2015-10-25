---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: developer-guide
title: "Developer Guide - Bitcoin"
breadcrumbs:
  - bitcoin
  - dev docs
  - Guide
end_of_page: |
  <script src="/js/jquery/jquery-1.11.2.min.js"></script>
  <script src="/js/jquery/jquery-ui.min.js"></script>
  <script src="/js/devsearch.js"></script>
  <script>updateToc();</script>
---
<div class="content_guide">
<link rel="stylesheet" href="/css/jquery-ui.min.css">

<div class="content_guide--header">
  <h1 class="content_guide--title" id="developer-documentation">Developer Documentation</h1>
  <h2 class="content_guide--subtitle">Find useful resources, guides and reference material for developers.</h2>
  <div class="content_guide--search">
    <input id="glossary_term" class="glossary_term" placeholder="Search">
  </div>
  <ul class="content_guide--header--menu">
    <li class="content_guide--header--menu--item--active">
      <a href="/en/developer-guide">
        <i class="fa fa-info-circle fa-2x"></i><span>Guide</span>
      </a>
    </li>
    <li class="content_guide--header--item">
      <a href="/en/developer-reference">
        <i class="fa fa-book fa-2x"></i><span>Reference</span>
      </a>
    </li>
    <li class="content_guide--header--item">
      <a href="/en/developer-examples">
        <i class="fa fa-code fa-2x"></i><span>Examples</span>
      </a>
    </li>
    <li class="content_guide--header--item">
      <a href="/en/developer-glossary">
        <i class="fa fa-font fa-2x"></i><span>Glossary</span>
      </a>
    </li>
  </ul>
</div>

<div class="content_guide--body">

<div markdown="1" id="toc" class="toc"><div markdown="1">
  <div class="content_guide--toc--top">
    <a class="content_guide--toc--back" href="/en/developer-documentation">Return to Overview</a>
    <h2 class="content_guide--toc--title">Guide</h2>
    <h3 class="content_guide--toc--subtitle">Find detailed information about the Bitcoin protocol and related specifications.</h3>
    <ul class="content_guide--toc--buttons">
      <li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report Issue</a></li>
      <li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">Edit GitHub</a></li>
    </ul>
  </div>

* Table of contents
{:toc}

</div></div>

<div markdown="1" class="toccontent">

<!-- includes should be separated by an empty line to prevent a
paragraph at the end of one file from breaking the heading at the start
of the following file. -->

{% include devdoc/fragment_reviews_needed.md %}

{% include devdoc/guide_intro.md %}

{% include devdoc/guide_block_chain.md %}

{% include devdoc/guide_transactions.md %}

{% include devdoc/guide_contracts.md %}

{% include devdoc/guide_wallets.md %}

{% include devdoc/guide_payment_processing.md %}

{% include devdoc/guide_operating_modes.md %}

{% include devdoc/guide_p2p_network.md %}

{% include devdoc/guide_mining.md %}

{% include references.md %}
{{site.glossary_links}}

</div>
</div>
