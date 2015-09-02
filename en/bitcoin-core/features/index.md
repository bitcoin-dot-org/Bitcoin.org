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

# Bitcoin Core
{:.not-displayed}

<div id="slidebox">
  <div class="slide-viewer">
    <div class="slide-group">
      <div class="slide slide-1">
        <a href="#validation"><img src="/img/bitcoin-core/slider-validation.svg" alt="Full Validation: the best possible decentralized security" /></a>
      </div>
      <div class="slide slide-2">
        <a href="#privacy"><img src="/img/bitcoin-core/slider-privacy.svg" alt="Strong privacy" /></a>
      </div>
      <div class="slide slide-3">
        <a href="#requirements"><img src="/img/bitcoin-core/slider-warning.svg" alt="Requirements and warnings" /></a>
      </div>
      <div class="slide slide-4">
        <a href="#user-interface"><img src="/img/bitcoin-core/slider-ui.svg" alt="User interface" /></a>
      </div>
      <div class="slide slide-5">
        <a href="#network-support"><img src="/img/bitcoin-core/slider-network.svg" alt="Support the network" /></a>
      </div>
    </div>
  </div>
  <div class="slide-buttons"
   ><button type="image" class="slide-btn button-1" markdown="1"
     ><span class="fa fa-check-square-o"></span></button>

   <button type="button" class="slide-btn button-2" markdown="1"
     ><span class="fa fa-shield"></span></button>

   <button type="button" class="slide-btn button-3" markdown="1"
     ><span class="fa fa-bar-chart"></span></button>

   <button type="button" class="slide-btn button-4" markdown="1"
     ><span class="fa fa-sign-in"></span></button>

   <button type="button" class="slide-btn button-5" markdown="1"
     ><span class="fa fa-globe"></span></button
  ></div>
</div>

<br class="clear">
{% include bitcoin-core/download-bitcoin-core.html %}

## <span class="fa fa-check-square-o fa-lg"></span> Full Validation {#validation}
{:.no_gap}

Bitcoin Core ensures every block and transaction it accepts is valid,
increasing not only your security but also **helping prevent miners and
banks from taking control of Bitcoin.**

{:.right-hanger}
[Learn about full validation][bcc validation]

## <span class="fa fa-shield fa-lg"></span> Better Privacy {#privacy}

Bitcoin Core provides **exclusive privacy features** that can make it
hard for anyone to link you to your transactions.

{:.right-hanger}
[Discover the privacy advantages][bcc privacy]


## <span class="fa fa-bar-chart fa-lg"></span> Warning: Better Security Has Costs {#requirements}

Bitcoin Core uses more resources than other wallets, but it's still
convenient to run on most computers and Internet connections.

{:.right-hanger}
[System requirements & warnings][bcc requirements]


## <span class="fa fa-sign-in fa-lg"></span> A Better User Interface {#user-interface}

Bitcoin Core wallet has **features most other wallets don't have.** But
if you don't need them, you can use several other wallets on top of
Bitcoin Core without losing Bitcoin Core's [security][bcc validation] and
[privacy][bcc privacy] benefits.

{:.right-hanger}
[Tour the user interface][bcc user interface]


## <span class="fa fa-globe fa-lg"></span> Support The Network {#network-support}

Bitcoin Core helps support other peers. This isn't as useful as [helping
to keep Bitcoin decentralized](#validation), but it's **an easy way for
broadband users to contribute** to less well-connected users.

{:.right-hanger}
[Begin donating bandwidth][bcc network support]

<br>
{% include references.md %}
