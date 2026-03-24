---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: en
id: bitcoin-core-feature-overview
columns: 1
title: Features - Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - Features
end_of_page: |
  <script>
    start_slideshow($('#slidebox'));
  </script>
---

<div class="hero">
<div class="container hero-container" markdown="block">

# Bitcoin Core
</div>
</div>

<div class="bitcore-content clearfix">
<div class="container" markdown="block">

<div id="slidebox">
  <div class="slide-viewer">
    <div class="slide-group">
      <div class="slide slide-1">
        <a href="#validation"><img src="/img/bitcoin-core/slider-validation.svg?{{site.time | date: '%s'}}" alt="Full Validation: the best possible decentralized security" /></a>
      </div>
      <div class="slide slide-2">
        <a href="#privacy"><img src="/img/bitcoin-core/slider-privacy.svg?{{site.time | date: '%s'}}" alt="Strong privacy" /></a>
      </div>
      <div class="slide slide-3">
        <a href="#requirements"><img src="/img/bitcoin-core/slider-warning.svg?{{site.time | date: '%s'}}" alt="Requirements and warnings" /></a>
      </div>
      <div class="slide slide-4">
        <a href="#user-interface"><img src="/img/bitcoin-core/slider-ui.svg?{{site.time | date: '%s'}}" alt="User interface" /></a>
      </div>
      <div class="slide slide-5">
        <a href="#network-support"><img src="/img/bitcoin-core/slider-network.svg?{{site.time | date: '%s'}}" alt="Support the network" /></a>
      </div>
    </div>
  </div>
  <div class="slide-buttons">
  <button type="image" class="slide-btn button-1" markdown="1"></button>

  <button type="button" class="slide-btn button-2" markdown="1"></button>

  <button type="button" class="slide-btn button-3" markdown="1"></button>

  <button type="button" class="slide-btn button-4" markdown="1"></button>

  <button type="button" class="slide-btn button-5" markdown="1"></button>
  </div>
</div>

<br class="clear">
{% include bitcoin-core/download-bitcoin-core.html %}

<div markdown="block" class="row card-row">

<div class="card core-card" markdown="block">
<img src="/img/icons/ico_validation.svg?{{site.time | date: '%s'}}" alt="icon">

## Full Validation {#validation}
{:.no_gap}

Bitcoin Core ensures every block and transaction it accepts is valid,
increasing not only your security but also **helping prevent miners and
banks from taking control of Bitcoin.**

[Learn about full validation][bcc validation]
{:.overview-link}

</div>
<div class="card core-card" markdown="block">
<img src="/img/icons/ico_control.svg?{{site.time | date: '%s'}}" alt="icon">

## Better Privacy {#privacy}

Bitcoin Core provides **exclusive privacy features** that can make it
hard for anyone to link you to your transactions.

[Discover the privacy advantages][bcc privacy]
{:.overview-link}

</div>
<div class="card core-card" markdown="block">
<img src="/img/icons/ico_better_security.svg?{{site.time | date: '%s'}}" alt="icon">

## Warning: Better Security Has Costs {#requirements}

Bitcoin Core uses more resources than other wallets, but it's still
convenient to run on most computers and Internet connections.

[System requirements & warnings][bcc requirements]
{:.overview-link}

</div>
<div class="card core-card" markdown="block">
<img src="/img/icons/ico_better_ui.svg?{{site.time | date: '%s'}}" alt="icon">

## A Better User Interface {#user-interface}

Bitcoin Core wallet has **features most other wallets don't have.** But
if you don't need them, you can use several other wallets on top of
Bitcoin Core without losing Bitcoin Core's [security][bcc validation] and
[privacy][bcc privacy] benefits.

[Tour the user interface][bcc user interface]
{:.overview-link}

</div>
<div class="card core-card" markdown="block">
<img src="/img/icons/ico_international.svg?{{site.time | date: '%s'}}" alt="icon">

## Support The Network {#network-support}

Bitcoin Core helps support other peers. This isn't as useful as [helping
to keep Bitcoin decentralized](#validation), but it's **an easy way for
broadband users to contribute** to less well-connected users.

[Begin donating bandwidth][bcc network support]
{:.overview-link}

</div>
</div>

<br>
{% include references.md %}

</div>
</div>