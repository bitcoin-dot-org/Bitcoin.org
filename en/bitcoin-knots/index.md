---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-knots
id: bitcoin-knots-overview
columns: 1
lang: en
title: Bitcoin Knots
breadcrumbs:
  - bitcoin
  - Bitcoin Knots
---

# Bitcoin Knots
{:.not-displayed}

<!-- ![Bitcoin Knots: Helping You Keep Bitcoin Decentralized](/img/bitcoin-core/en-big-logo.svg?{{site.time | date: '%s'}}) -->

<div class="hero core-hero">
  <div class="container hero-container">
    <h1>Bitcoin Knots</h1>
    <p class="summary">Helping you keep Bitcoin decentralized.</p>
  </div>
</div>

<div class="container core-content clearfix">
<div class="core-column-left">{% include bitcoin-knots/download-bitcoin-knots.html %}</div>

<div class="show_less_more core-column-right">
  <div class="show_less" markdown="block">
  Bitcoin Knots is programmed to decide which block chain contains
  valid transactions and give extended control over your node. 
  The users of Bitcoin Knots only accept transactions for that block chain,
  making it the Bitcoin block chain that everyone else wants to use. For the latest developments related to
  Bitcoin Knots, be sure to visit the project's <a href="https://bitcoinknots.org">official website</a>.
  </div>

  <div class="show_more" markdown="block">
  <div class="row show_more-row">
    <div class="show_more-block">
      <img class="show_more-icon" src="/img/bitcoin-core/decentralized.svg?{{site.time | date: '%s'}}" alt="icon">
      <p class="show_more-title">Decentralized</p>
      <p>
      It is these users who keep Bitcoin decentralized. They
      individually run their own Bitcoin Knots full nodes, and each of
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
  This shared agreement (called consensus) allows people like you to only accept valid bitcoins, enforcing Bitcoin's rules against even the most powerful miners.In addition to improving Bitcoin's decentralization, Bitcoin Knots users get:
  </p>
  
  <div class="show_more-list" markdown="block">

* <span>Better security for their bitcoins</span>
* <span>Privacy featuresnot available in other wallets</span>
* <span>User interfaces and other powerful features</span>

&nbsp;

  </div>
  </div>

  <p class="center"><button class="toggle_show_more_less js not-displayed"><span class="fa fa-caret-down"></span> Read more</button></p>
</div>

<div class="core-column-left">
  <p class="corecard-label">Shortcut:</p>

  <div class="corecard help-card" markdown="block">
  [Get help][bck help]
  Documentation, forums, chat rooms
  </div>
  
  <div class="corecard contribute-card" markdown="block">
  [Contribute][bck contribute]
  Code, translations, and more
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
