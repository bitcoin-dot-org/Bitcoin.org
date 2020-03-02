---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
id: bitcoin-core-overview
columns: 1
lang: en
title: Bitcoin Core
breadcrumbs:
  - bitcoin
  - Bitcoin Core
---

{% assign date_sorted_releases = site.releases | sort: 'optional_date', 'last' %}

<link rel="alternate" type="application/rss+xml" href="/en/rss/releases.rss" title="Bitcoin Core releases">

# Bitcoin Core
{:.not-displayed}

<!-- ![Bitcoin Core: Helping You Keep Bitcoin Decentralized](/img/bitcoin-core/en-big-logo.svg?{{site.time | date: '%s'}}) -->

<div class="hero core-hero">
  <div class="container hero-container">
    <h1>Bitcoin Core</h1>
    <p class="summary">Helping you keep Bitcoin decentralized.</p>
  </div>
</div>

<div class="container core-content clearfix">
<div class="core-column-left">{% include bitcoin-core/download-bitcoin-core.html %}</div>

<div class="show_less_more core-column-right">
  <div class="show_less" markdown="block">
  Bitcoin Core is programmed to decide which block chain contains
  valid transactions. The users of Bitcoin Core only accept
  transactions for that block chain, making it the Bitcoin block
  chain that everyone else wants to use. For the latest developments related to
  Bitcoin Core, be sure to visit the project's <a href="https://bitcoincore.org">official website</a>.
  </div>

  <div class="show_more" markdown="block">
  <div class="row show_more-row">
    <div class="show_more-block">
      <img class="show_more-icon" src="/img/bitcoin-core/decentralized.svg?{{site.time | date: '%s'}}" alt="icon">
      <p class="show_more-title">Decentralized</p>
      <p>
      It is these users who keep Bitcoin decentralized. They
      individually run their own Bitcoin Core full nodes, and each of
      those full nodes separately follows the exact same rules to decide
      which block chain is valid.
      </p>
    </div>
    <div class="show_more-block">
      <img class="show_more-icon" src="/img/bitcoin-core/no_voting.svg?{{site.time | date: '%s'}}" alt="icon">
      <p class="show_more-title">No Voting</p>
      <p>
      There's no voting or other corruptible process involved: there's
      just individual software following identical rules—"math"—to
      evaluate identical blocks and coming to identical conclusions
      about which block chain is valid.
      </p>
    </div>
  </div>

  <p>
  This shared agreement (called consensus) allows people like you to only accept valid bitcoins, enforcing Bitcoin's rules against even the most powerful miners.In addition to improving Bitcoin's decentralization, Bitcoin Core users get:
  </p>
  
  <div class="show_more-list" markdown="block">

* <span>[Better security][bcc validation] for their bitcoins</span>
* <span>[Privacy features][bcc privacy] not available in other wallets</span>
* <span>[User interfaces][bcc user interface] and other powerful features</span>

&nbsp;

  </div>
  </div>

  <p class="center"><button class="toggle_show_more_less js not-displayed"><span class="fa fa-caret-down"></span> Read more</button></p>
</div>

<div class="core-column-left">
  <p class="corecard-label">Shortcut:</p>
  <div class="corecard features-card" markdown="block">
  [Features][bcc features]
  Discover what Bitcoin Core offers
  </div>

  <div class="corecard help-card" markdown="block">
  [Get help][bcc help]
  Documentation, forums, chat rooms
  </div>
  
  <div class="corecard contribute-card" markdown="block">
  [Contribute][bcc contribute]
  Code, translations, and more
  </div>
</div>

<div class="core-column-right news-block clearfix">

<hr class="separator core-separator">

<h2 id="news" class="section-title news-title">News</h2>
<div class="news-list" markdown="block">
{% comment %}<!-- Capture all the releases into a string and convert it to an array -->{% endcomment %}
{% capture text_releases %}
{% for p in date_sorted_releases reversed %}
  {% if p.optional_date %}{{ p.optional_date | date:"%Y-%m-%d" }}{% endif %}<a href="{{ p.url | replace:'.html','' }}">{{ p.title }}</a>::
 {% endfor %}
{% endcapture %}
{% assign array_releases = text_releases | strip_newlines | split: '::' %}

  {% comment %}<!-- show the latest three releases -->{% endcomment %}
  {% for release in array_releases %}
  {% if forloop.index <= 2 %}
* {{ release }}
  {% endif %}
  {% endfor %}
  </div>
</div>

<div class="core-column-left clearfix">
  <div class="corecard releases-card" markdown="block">
  <a href="/en/version-history">Bitcoin Core Releases</a>
  For more News, see the complete list
  </div>
  <div class="corecard rss-card" markdown="block">
  <a type="application/atom+xml" href="/en/rss/blog.xml">Subscribe to the RSS feed</a>
  For more notifications of new releases
  </div>
</div>

</div>

<script>
if ( $( window ).width() > 400 && $( window ).height() > 600 ) {
  $(".show_more").removeClass("show_more");
  $(".toggle_show_more_less").removeClass("toggle_show_more_less");
}
</script>

{% include references.md %}
