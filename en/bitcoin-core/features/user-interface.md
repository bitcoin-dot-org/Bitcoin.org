---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitcoin-core-user-interface
layout: base-core
lang: en
columns: 1
title: User Interface - Bitcoin Core Features
breadcrumbs:
  - bitcoin
  - bcc
  - bcc features
  - Interface
---
# Bitcoin Core's User Interface
{:.not-displayed}

![Bitcoin Core User Interface](/img/bitcoin-core/slider-ui.svg)

{% include bitcoin-core/download-bitcoin-core.html %}

Bitcoin Core has a built in wallet with [graphical](#graphical) and
[command line/API](#cli) modes. It can also simultaneously support multiple
lightweight wallets with similar [security][bcc validation] and
[privacy][bcc privacy] to its built-in wallet.

![Multiple wallet support](/img/bitcoin-core/multi-wallet-support.svg)

**Warning:** you only get the security and privacy benefits in supported
lightweight wallets if they make a secure and private connection to your
Bitcoin Core *every* time you use them. This usually requires special
configuration.

## Bitcoin Core Wallet GUI (Graphical) {#graphical}

{% comment %}<!-- Limit to a maximum of 10 features to avoid overwhelming the reader -->{% endcomment %}
<div markdown="block" class="two-column-list">

{:.fa-ul}
- <span class="fa fa-li fa-desktop fa-2x"></span> **<button class="popup js" data-container="gui_overview">Clear overview</button>**<br
>See your current balance and recent transactions

- <span class="fa fa-li fa-toggle-on fa-2x"></span> **<button class="popup js" data-container="gui_fee_slider">Fee slider</button>**<br
>Easily choose between low fees and fast confirmation

- <span class="fa fa-li fa-btc fa-2x"></span> **<button class="popup js" data-container="gui_coin_control">Coin control</button>**<br
>Enhance privacy or save money by choosing your inputs

- <span class="fa fa-li fa-qrcode fa-2x"></span> **<button class="popup js" data-container="gui_qr_codes">QR codes</button>**<br
>Generate QR codes to receive payment

- <span class="fa fa-li fa-file-text-o fa-2x"></span> **<button class="popup js" data-container="gui_unique_invoices">Unique invoices</button>**<br
>Easily track who paid you

- <span class="fa fa-li fa-shield fa-2x"></span> **<button class="popup js" data-container="gui_proxy_configuration">Proxy configuration</button>**<br
>Use Tor or a proxy for privacy

- <span class="fa fa-li fa-bar-chart fa-2x"></span> **<button class="popup js" data-container="gui_network_monitoring">Network monitoring</button>**<br
>Track how much bandwidth you use

- <span class="fa fa-li fa-power-off fa-2x"></span> **<button class="popup js" data-container="gui_watch_only">Watch-only support</button>**<br
>Track bitcoins stored safely offline

</div>
<br class="clear">


## Bitcoin Core Wallet RPC/REST (CLI) {#cli}

{% comment %}<!-- Limit to a maximum of 10 features to avoid overwhelming the reader -->{% endcomment %}

<div markdown="block" class="two-column-list">

{:.fa-ul}
- <span class="fa fa-li fa-plus-square-o fa-2x"></span> **<button class="popup js" data-container="rpc_getnewaddress">GetNewAddress</button>**<br
>Get a new address for receiving payment

- <span class="fa fa-li fa-area-chart fa-2x"></span> **<button class="popup js" data-container="rpc_getbalance">GetBalance</button>**<br
>Instantly see your available Bitcoin balance

- <span class="fa fa-li fa-arrows fa-2x"></span> **<button class="popup js" data-container="rpc_sendmany">SendMany</button>**<br
>Send a single payment to multiple addresses

- <span class="fa fa-li fa-list fa-2x"></span> **<button class="popup js" data-container="rpc_listunspent">ListUnspent</button>**<br
>See what received transactions you can spend

- <span class="fa fa-li fa-share-square-o fa-2x"></span> **<button class="popup js" data-container="rpc_rawtx">Create/Sign/Send</button>**<br
>Create and send raw transactions

- <span class="fa fa-li fa-bell-o fa-2x"></span> **<button class="popup js" data-container="notification">Notification</button>**<br
>Be notified of new blocks and transactions


</div>
<br class="clear">

**Learn more:** documentation for the [RPC][rpc] and [REST][rest] interfaces

## Lightweight Wallets Using Bitcoin Core {#lightweight}

Lightweight wallets usually connect to several random full nodes (like
Bitcoin Core) to send and receive all of their data. In the process they
[leak private data][bcc privacy data leaking] and make themselves more
[vulnerable to attacks][bcc validation protection].

![Non-private connection](/img/bitcoin-core/connection-types-p2p-spv.svg)

But it's also possible to connect certain lightweight wallets solely to
your own Bitcoin Core full node, called a trusted peer. If you do this
with a secure and private connection every time you use that
lightweight wallet, you'll get most of the security and privacy
benefits of a full node as well as [help protect decentralization][bcc
validation decentralization].

![Secure and private connection](/img/bitcoin-core/connection-types-trusted-peer.svg)

<br>

### Trusted Peer Support {#trusted-peer}

The following wallets can securely connect to a trusted peer.

<div markdown="block" class="wallet_accordion">
{% comment %}<!-- Put wallets in alphabetical order -->{% endcomment %}

### GreenBits

<div markdown="block">
![GreenBits screenshot](/img/screenshots/greenbits.png)

GreenBits is a fast and easy to use wallet. Enjoy improved security with
a minimal/zero trust approach, optional hardware wallets support,
multisignature based 2FA and spending limits functionality.

**Requires you setup a [Tor .onion address][bcc tor hs].**

1. Open the GreenBits app

2. Go to the configuration screen

3. Choose to *Enable SPV* (default) and tap *Only connect to a
   trusted peer*.

4. Enter your .onion address in the *trusted peer* field.

5. Restart the app.

Note that GreenAddress will still be able to see your payments; however,
you'll have enhanced security as well as privacy from random peers on
the Bitcoin network.

{:.right-hanger}
[Get GreenBits <span class="fa fa-external-link-square"></span>](https://play.google.com/store/apps/details?id=com.greenaddress.greenbits_android_wallet)
</div>

### mSigna

<div markdown="block">
![mSigma screenshot](/img/screenshots/msigna.png)

{% translate walletmsigna choose-your-wallet %}

**No configuration necessary:** just install Bitcoin Core on the same
computer you plan to use mSigna, wait for Bitcoin Core to sync the block
chain, and then start mSigna---it will automatically connect to your
Bitcoin Core full node.

{:.right-hanger}
[Get mSigna <span class="fa fa-external-link-square"></span>](https://ciphrex.com/redirect/?referer=bitcoin.org)
</div>

</div>

<div class="not-displayed">
  <div id="gui_overview" title="Wallet Overview" markdown="block">
  ![Clear overview](/img/bitcoin-core/clear-overview.png)
  </div>

  <div id="gui_fee_slider" title="Fee Slider" markdown="block">
  ![Fee slider](/img/bitcoin-core/fee-slider.png)
  </div>

  <div id="gui_coin_control" title="Coin Control" markdown="block">
  ![Coin control](/img/bitcoin-core/coin-control.png)
  </div>

  <div id="gui_qr_codes" title="QR Codes" markdown="block">
  ![QR codes](/img/bitcoin-core/qr-codes.png)
  </div>

  <div id="gui_unique_invoices" title="Unique Invoices" markdown="block">
  ![Unique invoice](/img/bitcoin-core/unique-invoice.png)
  </div>

  <div id="gui_proxy_configuration" title="Proxy Configuration" markdown="block">
  ![Proxy configuration](/img/bitcoin-core/proxy-configuration.png)
  </div>

  <div id="gui_network_monitoring" title="Network monitoring" markdown="block">
  ![Network monitoring](/img/bitcoin-core/network-monitoring.png)
  </div>

  <div id="gui_watch_only" title="Watching-only Wallets" markdown="block">
  ![Fee slider](/img/bitcoin-core/watching-only.png)
  </div>

  <div id="rpc_getnewaddress" title="GetNewAddress" markdown="block">
  <div class="multicode" markdown="block">
  {% highlight bash %}
  bitcoin-cli -testnet getnewaddress "doc test"
  {% endhighlight %}
  {% highlight text %}
  mft61jjkmiEJwJ7Zw3r1h344D6aL1xwhma
  {% endhighlight %}
  </div>
  </div>

  <div id="rpc_getbalance" title="GetBalance" markdown="block">
  <div class="multicode" markdown="block">
  {% highlight bash %}
  bitcoin-cli -testnet getbalance
  {% endhighlight %}
  {% highlight json %}
  1.99900000
  {% endhighlight %}
  </div>
  </div>

  <div id="rpc_sendmany" title="SendMany" markdown="block">
  <div class="multicode" markdown="block">
  {% highlight bash %}
  bitcoin-cli -testnet sendmany \
    "test1" \
    '''
      {
        "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN": 0.1,
        "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe": 0.2
      } ''' \
    6       \
    "Example Transaction"
  {% endhighlight %}
  {% highlight text %}
  ec259ab74ddff199e61caa67a26e29b13b5688dc60f509ce0df4d044e8f4d63d
  {% endhighlight %}
  </div>
  </div>

  <div id="rpc_listunspent" title="ListUnspent" markdown="block">
  <div class="multicode" markdown="block">
  {% highlight bash %}
  bitcoin-cli -testnet listunspent 6 99999999 '''
    [
      "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe"
    ]
  '''
  {% endhighlight %}
  {% highlight json %}
  [
      {
          "txid" : "d54994ece1d11b19785c7248868696250ab195605b469632b7bd68130e880c9a",
          "vout" : 1,
          "address" : "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe",
          "account" : "test label",
          "scriptPubKey" : "76a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac",
          "amount" : 0.00010000,
          "confirmations" : 6210,
          "spendable" : true
      }
  ]
  {% endhighlight %}
  </div>
  </div>

  <div id="rpc_rawtx" title="Create/Sign/Spent Raw Transactions" markdown="block">
  Create a raw transaction:

  <div class="multicode" markdown="block">
  {% highlight bash %}
  bitcoin-cli -testnet createrawtransaction '''
    [
      {
        "txid": "1eb590cd06127f78bf38ab4140c4cdce56ad9eb8886999eb898ddf4d3b28a91d",
        "vout" : 0
      }
    ]''' '{ "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe": 0.13 }'
  {% endhighlight %}
  {% highlight text %}
  01000000011da9283b4ddf8d89eb996988b89ead56cecdc44041ab38bf787f1206cd90b51e0000000000ffffffff01405dc600000000001976a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac00000000
  {% endhighlight %}
  </div>

  Sign the above raw transaction:

  <div class="multicode" markdown="block">
  {% highlight bash %}
  bitcoin-cli -testnet signrawtransaction 01000000011da9283b4ddf8d\
  89eb996988b89ead56cecdc44041ab38bf787f1206cd90b51e0000000000ffff\
  ffff01405dc600000000001976a9140dfc8bafc8419853b34d5e072ad37d1a51\
  59f58488ac00000000
  {% endhighlight %}
  {% highlight json %}
  {
      "hex" : "01000000011da9283b4ddf8d89eb996988b89ead56cecdc44041ab38bf787f1206cd90b51e000000006a47304402200ebea9f630f3ee35fa467ffc234592c79538ecd6eb1c9199eb23c4a16a0485a20220172ecaf6975902584987d295b8dddf8f46ec32ca19122510e22405ba52d1f13201210256d16d76a49e6c8e2edc1c265d600ec1a64a45153d45c29a2fd0228c24c3a524ffffffff01405dc600000000001976a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac00000000",
      "complete" : true
  }
  {% endhighlight %}
  </div>

  Send the above signed raw transaction:

  <div class="multicode" markdown="block">
  {% highlight bash %}
  bitcoin-cli -testnet sendrawtransaction 01000000011da9283b4ddf8d\
  89eb996988b89ead56cecdc44041ab38bf787f1206cd90b51e000000006a4730\
  4402200ebea9f630f3ee35fa467ffc234592c79538ecd6eb1c9199eb23c4a16a\
  0485a20220172ecaf6975902584987d295b8dddf8f46ec32ca19122510e22405\
  ba52d1f13201210256d16d76a49e6c8e2edc1c265d600ec1a64a45153d45c29a\
  2fd0228c24c3a524ffffffff01405dc600000000001976a9140dfc8bafc84198\
  53b34d5e072ad37d1a5159f58488ac00000000
  {% endhighlight %}
  {% highlight text %}
  f5a5ce5988cc72b9b90e8d1d6c910cda53c88d2175177357cc2f2cf0899fbaad
  {% endhighlight %}
  </div>

  The returned value is the transaction's identifier (TXID).
  </div>

  <div id="notification" title="Programmable Notification" markdown="block">
  <div class="multicode" markdown="block">
  {% highlight bash %}
  bitcoind -daemon -walletnotify=your_notification_command
  {% endhighlight %}
  </div>
  </div>

</div>

<br class="clear big">
<div class="prevnext">
<span markdown="1">**Previous Feature**<br>[Requirements][bcc requirements]</span>
<span markdown="1">**Next feature**<br>[Network Support][bcc network support]</span>
</div>
<br class="clear">

{% include references.md %}
