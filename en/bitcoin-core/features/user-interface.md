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
<div class="hero">
<div class="container hero-container" markdown="block">

# Bitcoin Core's User Interface
</div>
</div>

<div class="bitcore-content">
<div class="container" markdown="block">

![Bitcoin Core User Interface](/img/bitcoin-core/slider-ui.svg?{{site.time | date: '%s'}})

{% include bitcoin-core/download-bitcoin-core.html %}

Bitcoin Core has a built in wallet with [graphical](#graphical) and
[command line/API](#cli) modes. It can also simultaneously support multiple
lightweight wallets with similar [security][bcc validation] and
[privacy][bcc privacy] to its built-in wallet.

![Multiple wallet support](/img/bitcoin-core/multi-wallet-support.svg?{{site.time | date: '%s'}})

**Warning:** you only get the security and privacy benefits in supported
lightweight wallets if they make a secure and private connection to your
Bitcoin Core *every* time you use them. This usually requires special
configuration.

## Bitcoin Core Wallet GUI (Graphical) {#graphical}

{% comment %}<!-- Limit to a maximum of 10 features to avoid overwhelming the reader -->{% endcomment %}
<div markdown="block" class="row card-row">

<div class="card core-card">
<img src="/img/icons/ico_clear.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="clear-overview" data-container="gui_overview">Clear overview</h3>
<p>See your current balance and recent transactions</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_fee_slider.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="fee-slider" data-container="gui_fee_slider">Fee slider</h3>
<p>Easily choose between low fees and fast confirmation</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_coin_control.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="coin-control" data-container="gui_coin_control">Coin control</h3>
<p>Enhance privacy or save money by choosing your inputs</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_qrcode.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="qr-codes" data-container="gui_qr_codes">QR codes</h3>
<p>Generate QR codes to receive payment</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_invoices.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="unique-invoices" data-container="gui_unique_invoices">Unique invoices</h3>
<p>Easily track who paid you</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_control.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="proxy-configuration" data-container="gui_proxy_configuration">Proxy configuration</h3>
<p>Use Tor or a proxy for privacy</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_monitoring.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="network-monitoring" data-container="gui_network_monitoring">Network monitoring</h3>
<p>Track how much bandwidth you use</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_watch-only.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="support" data-container="gui_watch_only">Watch-only support</h3>
<p>Track bitcoins stored safely offline</p>
</div>

</div>


## Bitcoin Core Wallet RPC/REST (CLI) {#cli}

{% comment %}<!-- Limit to a maximum of 10 features to avoid overwhelming the reader -->{% endcomment %}

<div markdown="block" class="row card-row">

<div class="card core-card">
<img src="/img/icons/get-new-address.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="GetNewAddress" data-container="rpc_getnewaddress">GetNewAddress</h3>
<p>Get a new address for receiving payment</p>
</div>

<div class="card core-card">
<img src="/img/icons/get-balance.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="GetBalance" data-container="rpc_getbalance">GetBalance</h3>
<p>Instantly see your available Bitcoin balance</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_send.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="SendMany" data-container="rpc_sendmany">SendMany</h3>
<p>Send a single payment to multiple addresses</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_list.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="ListUnspent" data-container="rpc_listunspent">ListUnspent</h3>
<p>See what received transactions you can spend</p>
</div>

<div class="card core-card">
<img src="/img/icons/create-sign-send.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="create-sign-send" data-container="rpc_rawtx">Create/Sign/Send</h3>
<p>Create and send raw transactions</p>
</div>

<div class="card core-card">
<img src="/img/icons/ico_notification.svg?{{site.time | date: '%s'}}" alt="icon">
<h3 class="popup js" id="Notification" data-container="notification">Notification</h3>
<p>Be notified of new blocks and transactions</p>
</div>

</div>

<div class="alert ui-alert" markdown="block">
**Learn more:** documentation for the [Bitcoin Core APIs](https://bitcoin.org/en/developer-reference#bitcoin-core-apis)
</div>

## Lightweight Wallets Using Bitcoin Core {#lightweight}

<div class="row lightweight-wallets-row" markdown="block">

<div markdown="block">
![Non-private connection](/img/bitcoin-core/connection-types-p2p-spv.svg?{{site.time | date: '%s'}})

Lightweight wallets usually connect to several random full nodes (like
Bitcoin Core) to send and receive all of their data. In the process they
[leak private data][bcc privacy data leaking] and make themselves more
[vulnerable to attacks][bcc validation protection].
</div>

<div markdown="block">

![Secure and private connection](/img/bitcoin-core/connection-types-trusted-peer.svg?{{site.time | date: '%s'}})

But it's also possible to connect certain lightweight wallets solely to
your own Bitcoin Core full node, called a trusted peer. If you do this
with a secure and private connection every time you use that
lightweight wallet, you'll get most of the security and privacy
benefits of a full node as well as [help protect decentralization][bcc
validation decentralization].

</div>
</div>

<div class="not-displayed">
  <div id="gui_overview" title="Wallet Overview" markdown="block">
  ![Clear overview](/img/bitcoin-core/clear-overview.png?{{site.time | date: '%s'}})
  </div>

  <div id="gui_fee_slider" title="Fee Slider" markdown="block">
  ![Fee slider](/img/bitcoin-core/fee-slider.png?{{site.time | date: '%s'}})
  </div>

  <div id="gui_coin_control" title="Coin Control" markdown="block">
  ![Coin control](/img/bitcoin-core/coin-control.png?{{site.time | date: '%s'}})
  </div>

  <div id="gui_qr_codes" title="QR Codes" markdown="block">
  ![QR codes](/img/bitcoin-core/qr-codes.png?{{site.time | date: '%s'}})
  </div>

  <div id="gui_unique_invoices" title="Unique Invoices" markdown="block">
  ![Unique invoice](/img/bitcoin-core/unique-invoice.png?{{site.time | date: '%s'}})
  </div>

  <div id="gui_proxy_configuration" title="Proxy Configuration" markdown="block">
  ![Proxy configuration](/img/bitcoin-core/proxy-configuration.png?{{site.time | date: '%s'}})
  </div>

  <div id="gui_network_monitoring" title="Network monitoring" markdown="block">
  ![Network monitoring](/img/bitcoin-core/network-monitoring.png?{{site.time | date: '%s'}})
  </div>

  <div id="gui_watch_only" title="Watching-only Wallets" markdown="block">
  ![Fee slider](/img/bitcoin-core/watching-only.png?{{site.time | date: '%s'}})
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

<div class="prevnext" markdown="block">
[PREV][bcc requirements]
[NEXT][bcc network support]
</div>
<br class="clear">

{% include references.md %}
</div>
</div>
