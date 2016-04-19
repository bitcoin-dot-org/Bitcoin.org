---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: developer-examples
title: "Developer Examples - Bitcoin"
breadcrumbs:
  - bitcoin
  - dev docs
  - Examples
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
  <h2 class="content_guide--subtitle" id="summary">Find useful resources, guides and reference material for developers.</h2>
      <!-- no subhead-links here -->
  <div class="content_guide--search">
    <input id="glossary_term" class="glossary_term" placeholder="Search">
  </div>
  <ul class="content_guide--header--menu">
    <li class="content_guide--header--menu--item">
      <a href="/en/developer-guide">
        <i class="fa fa-info-circle fa-2x"></i><span>Guide</span>
      </a>
    </li>
    <li class="content_guide--header--item">
      <a href="/en/developer-reference">
        <i class="fa fa-book fa-2x"></i><span>Reference</span>
      </a>
    </li>
    <li class="content_guide--header--menu--item--active">
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
    <h2 class="content_guide--toc--title" id="title">Examples</h2>
    <h3 class="content_guide--toc--subtitle" id="subtitle">Find examples of how to build programs using Bitcoin.</h3>
      <!-- no subhead-links here -->
    <ul class="content_guide--toc--buttons">
      <li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report Issue</a></li>
      <li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">Edit GitHub</a></li>
    </ul>
  </div>

* Table of contents
{:toc}

</div></div>

<div markdown="1" class="toccontent">

{% include devdoc/fragment_reviews_needed.md %}

{% include devdoc/example_intro.md %}

{% include devdoc/example_testing.md %}

{% include devdoc/example_transactions.md %}

{% include devdoc/example_payment_processing.md %}

{% include devdoc/example_p2p_networking.md %}

{% include references.md %}
{{site.glossary_links}}

</div>
</div>
</div>
