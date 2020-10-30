---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: en
columns: 1
id: bitcoin-core-requirements
title: Requirements and Warnings - Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - bcc features
  - Requirements
---

<div class="hero">
<div class="container hero-container" markdown="block">

# Bitcoin Core Requirements and Warnings
</div>
</div>

<div class="bitcore-content clearfix">
<div class="container" markdown="block">

![Bitcoin Core requirements and warnings](/img/bitcoin-core/slider-warning.svg?{{site.time | date: '%s'}})

{% include bitcoin-core/download-bitcoin-core.html %}

Bitcoin Core gives you increased [security][bcc validation] and
[privacy][bcc privacy] at a cost. You need to [take
responsibility](#wallet-responsibility-checklist) for the security of
your bitcoins, meet higher [minimum system
requirements](#system-requirements), and beware of some [possible
problems](#possible-problems).

<div class="warning" markdown="block">
**No matter what Bitcoin software you use,** you should never
buy more bitcoins than you can afford to lose. Bitcoin is still an
experimental system and bitcoins remain a risky investment.
</div>

## Wallet Responsibility Checklist

Bitcoin Core puts you in charge of your wallet, which means your
bitcoins are at risk unless you complete certain tasks:

{% comment %}
<!-- Note: the short pop-ups below are a temporary measure.  I (@harding) plan
to write a Bitcoin Core user guide for the site that will provide more
detailed instructions for at least some of these things. -->
{% endcomment %}

- <button class="popup js" data-container="backup_your_keys">Backup your keys</button>

- Make sure your <button class="popup js" data-container="secure_your_wallet">wallet is secure</button>

- Setup an <button class="popup js" data-container="offline_wallet">offline wallet</button>
  (cold storage) for significant amounts of bitcoins

- Watch for [security notifications](/en/alerts)

- Allow your heirs to <button class="popup js" data-container="bitcoin_inheritance">receive your bitcoins</button>
  if you die or become incapacitated

If you need help with any step, please ask for assistance in any of
Bitcoin's [friendly forums][bcc forums] or [live chatrooms][bcc live
help].

## System Requirements

{% assign DISK='<span class="accordion-icon disk-icon"></span> **Disk space**<br>' %}
{% assign DOWNLOAD='<span class="accordion-icon download-icon"></span> **Download**<br>' %}
{% assign UPLOAD='<span class="accordion-icon upload-icon"></span> **Upload**<br>' %}
{% assign MEMORY='<span class="accordion-icon memory-icon"></span> **Memory (RAM)**<br>' %}
{% assign SYSTEM='<span class="accordion-icon system-icon"></span> **System**<br>' %}
{% assign OS='<span class="accordion-icon os-icon"></span> **Operating system**<br>' %}
{% assign FOOTNOTE='<b>*</b>' %}
{% capture INITIAL_DOWNLOAD %}<p class="notation"><b>*</b> Plus a one-time {{site.text.chain_gb}} GB download the first time you start Bitcoin Core.</p>{% endcapture %}

<div markdown="block" class="two-column-list" id="system-requirements-accordion">

### Bare Minimum (With Default Settings)

<div markdown="block">

{:.system-requirements-list.clearfix}
- {{DISK}} {{site.text.bitcoin_datadir_gb}} GB

- {{DOWNLOAD}} 250 MB/day (8 GB/month){{FOOTNOTE}}

- {{UPLOAD}} 5 GB/day (150 GB/month)

- {{MEMORY}} 512 MB

- {{SYSTEM}} Desktop<br>
  Laptop<br>
  [Some ARM chipsets][wiki bitcoin core compatible devices arm] >1 GHz

- {{OS}} Windows 7/8.x<br>
  Mac OS X<br>
  Linux<br>
  Some BSDs


{{INITIAL_DOWNLOAD}}


</div>

### Bare Minimum (With Custom Settings)

<div markdown="block">

{:.system-requirements-list.clearfix}
- {{DISK}} {{site.text.bitcoin_datadir_gb_pruned}} GB

- {{DOWNLOAD}} 150 MB/day (5 GB/month){{FOOTNOTE}}

- {{UPLOAD}} 10 MB/day (300 MB/month)

- {{MEMORY}} 256 MB

- {{SYSTEM}} Desktop<br>
  Laptop<br>
  [Most ARM chipsets][wiki bitcoin core compatible devices arm]

- {{OS}} Windows 7/8.x<br>
  Mac OS X<br>
  Linux<br>
  Some BSDs


{{INITIAL_DOWNLOAD}}

**Learn more:** [Bitcoin Core configuration options][bcc configuration]


</div>

### Minimum Recommended

<div markdown="block">

{:.system-requirements-list.clearfix}
- {{DISK}} {{site.text.bitcoin_datadir_gb}} GB

- {{DOWNLOAD}} 500 MB/day (15 GB/month){{FOOTNOTE}}

- {{UPLOAD}} 5 GB/day (150 GB/month)

- {{MEMORY}} 1 GB

- {{SYSTEM}} Desktop<br>
  Laptop<br>
  [Some ARM chipsets][wiki bitcoin core compatible devices arm] >1 GHz

- {{OS}} Windows 7/8.x/10<br>
  Mac OS X<br>
  Linux


{{INITIAL_DOWNLOAD}}


</div>

</div>

## Possible Problems

{% include bitcoin-core/bitcoin-core-possible-problems.md %}

<div class="not-displayed">
  <div id="backup_your_keys" title="Backup Your Keys" markdown="block">
  By default, you need to backup Bitcoin Core after every 100
  transactions.  This includes both transactions you send as well as
  payments you request (whether or not you actually received the payment).

  For example, you need to backup after sending 33 payments and requesting
  67 payments (even though you only received 60 payments).

  Bitcoin Core can be configured to allow you to go more transactions
  between backups.  See the [`-keypool` setting][bcc configuration].
  </div>

  <div id="secure_your_wallet" title="Secure Your Wallet" markdown="block">
  Anyone who gets access to your wallet can steal your bitcoins.  The
  first line of defense against this is encrypting your wallet, an option
  from the File menu in the graphical interface.

  However, encrypting may not be enough if your computer becomes infected
  by malware.  Learn about <button class="popup js" data-container="offline_wallet">offline wallets</button>
  for security against this type of attack.

  In addition to securing your wallet, you also need to keep your backups
  secure.  Anyone who gets access to them can also steal your bitcoins.

  **Learn more:** [secure your wallet][]
  </div>

  <div id="offline_wallet" title="Offline Wallet" markdown="block">
  Computers that connect to the Internet are frequently hacked or infected
  with bitcoin-stealing malware.  Computers that never connect to the
  Internet are a much more secure location for your bitcoins.

  Bitcoin Core can be run on an always-offline computer, creating an
  offline wallet (also called a cold wallet).  The offline wallet will
  securely store the private keys, while a separate online Bitcoin Core
  wallet will send and receive transactions.

  **Learn more:** [Creating and signing offline transactions][offline transactions]
  </div>

  <div id="bitcoin_inheritance" title="Bitcoin Inheritance" markdown="block">
  Your Bitcoin wallet isn't like a bank account---it won't automatically
  go to your heirs if you die or become disabled.

  You have to plan ahead and make sure there is a way for your heirs
  to access your wallet backups when you're no longer available.

  **Learn more:** [Estate planning: how can I ensure my bitcoins are inheritable?][inherit bitcoins]

  </div>
</div>

<div class="prevnext" markdown="block">
[PREV][bcc privacy]
[NEXT][bcc user interface]
</div>

{% include references.md %}
</div>
</div>
