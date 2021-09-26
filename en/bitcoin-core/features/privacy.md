---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitcoin-core-privacy
layout: base-core
lang: en
columns: 1
title: Privacy - Bitcoin Core Features
breadcrumbs:
  - bitcoin
  - bcc
  - bcc features
  - Privacy

third_party_privacy:
  ## Alphabetical order

  - name: "Bitcoin Core"
    css_class: bitcoin_core
    group: default-show

    tracks_real_names: "no"
    knows_your_bitcoin_balance: "no"
    susceptible_to_taint_analysis: "yes"
    tracks_payments: "no"
    tracks_amounts: "no"
    tracks_ip_addresses: "no"

  - name: "BitGo"
    css_class: bitcoin_go
    group: not-displayed

    tracks_real_names: "no"
    knows_your_bitcoin_balance: "yes"
    susceptible_to_taint_analysis: "yes"
    tracks_payments: "yes"
    tracks_amounts: "yes"
    tracks_ip_addresses: "yes"

---

<div class="hero">
<div class="container hero-container" markdown="block">

# Bitcoin Core's Excellent Privacy
</div>
</div>

<div class="bitcore-content clearfix">
<div class="container" markdown="block">

![Excellent privacy](/img/bitcoin-core/slider-privacy.svg?{{site.time | date: '%s'}})

{% include bitcoin-core/download-bitcoin-core.html %}

> What if every time you spent or received cash, all the transaction
> details were published to your Twitter or Facebook feed for all your
> friends to see? You probably wouldn't want to use cash any more.

Every confirmed Bitcoin transaction is published to the block chain
where anyone can see it. So **why do people still use Bitcoin?** And why
do many of them believe that Bitcoin is a private way of sending money?

One reason is that Bitcoin Core and some other Bitcoin software tries to
avoid associating your real-world identity with the transactions you
make. The difference looks like this:

![Privacy difference: pseudonymous transactions](/img/bitcoin-core/privacy-difference.svg?{{site.time | date: '%s'}})

The second type of transaction (a pseudonymous transaction) only provides
practical privacy if nobody can figure out that "5a35b" is really Alice.
It's up to your wallet to prevent anyone from making that connection.
See below for how Bitcoin Core's privacy compares to other wallets.


## No Sign-Up Required

Third-party Bitcoin services can both increase and decrease your
privacy. They can increase it by mixing your transactions with those of
other users; they can decrease it by tracking your activity and directly
associating it with your real name or other identifying information.

<div class="center service-choose">
<p class="service-choose-title">Click an entry below to show it:</p>

{% for service in page.third_party_privacy %}
  {% if service.name != 'Bitcoin Core' %}
    <button
      {% if service.group == "default-show" %}
        class="js showcolumn active"
      {% else %}
        class="js showcolumn"
      {% endif %}
      id="{{service.css_class}}"
    >{{service.name}}</button>
  {% endif %}
{% endfor %}
</div>

<table class="privacy-comparison center">
{% comment %}
<!-- Don't overdo it!  Limit table to a total of seven content rows, with a
maximum of five content rows in each category. -->
{% endcomment %}
  <tr>
    <th markdown="span" colspan="99">Who knows your information? **Just you**{:.fggreen} or also a **service provider?**{:.fgred}</th>
  </tr>
  <tr>
    <th></th>
    {% for service in page.third_party_privacy %}
      {% if service.name %}
        <th class="{{service.css_class}} {{service.group}}">{{service.name}}</th>
      {% else %}
        {% die "Some service doesn't have a name" %}
      {% endif %}
    {% endfor %}
  </tr>

  <tr>
    <td>Your real name</td>
    {% for service in page.third_party_privacy %}
      {% case service.tracks_real_names %}
      {% when "yes" %}
        <td class="bgred {{service.css_class}} {{service.group}}"></td>
      {% when "no" %}
        <td class="bggreen {{service.css_class}} {{service.group}}"></td>
      {% when "maybe" %}
        <td class="bgyellow {{service.css_class}} {{service.group}}"></td>
      {% else %}
        {% die "missing service information" %}
      {% endcase %}
    {% endfor %}
  </tr>

  <tr>
    <td>Your bitcoin balance</td>
    {% for service in page.third_party_privacy %}
      {% case service.knows_your_bitcoin_balance %}
      {% when "yes" %}
        <td class="bgred {{service.css_class}} {{service.group}}"></td>
      {% when "no" %}
        <td class="bggreen {{service.css_class}} {{service.group}}"></td>
      {% when "maybe" %}
        <td class="bgyellow {{service.css_class}} {{service.group}}"></td>
      {% else %}
        {% die "missing service information" %}
      {% endcase %}
    {% endfor %}
  </tr>
  <tr>
    <td>Who you pay, and/or who pays you (in some cases)</td>
    {% for service in page.third_party_privacy %}
      {% case service.tracks_payments %}
      {% when "yes" %}
        <td class="bgred {{service.css_class}} {{service.group}}"></td>
      {% when "no" %}
        <td class="bggreen {{service.css_class}} {{service.group}}"></td>
      {% when "maybe" %}
        <td class="bgyellow {{service.css_class}} {{service.group}}"></td>
      {% else %}
        {% die "missing service information" %}
      {% endcase %}
    {% endfor %}
  </tr>
  <tr>
    <td>How much you spend and/or receive</td>
    {% for service in page.third_party_privacy %}
      {% case service.tracks_amounts %}
      {% when "yes" %}
        <td class="bgred {{service.css_class}} {{service.group}}"></td>
      {% when "no" %}
        <td class="bggreen {{service.css_class}} {{service.group}}"></td>
      {% when "maybe" %}
        <td class="bgyellow {{service.css_class}} {{service.group}}"></td>
      {% else %}
        {% die "missing service information" %}
      {% endcase %}
    {% endfor %}
  </tr>
  <tr>
    <td>The IP address your connection came from</td>
    {% for service in page.third_party_privacy %}
      {% case service.tracks_ip_addresses %}
      {% when "yes" %}
        <td class="bgred {{service.css_class}} {{service.group}}"></td>
      {% when "no" %}
        <td class="bggreen {{service.css_class}} {{service.group}}"></td>
      {% when "maybe" %}
        <td class="bgyellow {{service.css_class}} {{service.group}}"></td>
      {% else %}
        {% die "missing service information" %}
      {% endcase %}
    {% endfor %}
  </tr>

  <tr class="empty"></tr>
  <tr>
    <th markdown="span" colspan="99">Who can guess your information? **Just you**{:.fggreen} or also **people
    you trade with?**{:.fgred}</th>
  </tr>

  <tr>
    <th></th>
    {% for service in page.third_party_privacy %}
      {% if service.name %}
        <th class="{{service.css_class}} {{service.group}}">{{service.name}}</th>
      {% else %}
        {% die "Some service doesn't have a name" %}
      {% endif %}
    {% endfor %}
  </tr>

  <tr>
    <td>Other transactions you made or received</td>
    {% for service in page.third_party_privacy %}
      {% case service.susceptible_to_taint_analysis %}
      {% when "yes" %}
        <td class="bgred {{service.css_class}} {{service.group}}"></td>
      {% when "no" %}
        <td class="bggreen {{service.css_class}} {{service.group}}"></td>
      {% when "maybe" %}
        <td class="bgyellow {{service.css_class}} {{service.group}}"></td>
      {% else %}
        {% die "missing service information" %}
      {% endcase %}
    {% endfor %}
  </tr>

</table>

## Perfect Privacy for Received Transactions

There are {{site.text.total_tx_count_in_millions}} million transactions on the Bitcoin block
chain. How do you find which ones pay you?  Here are some common
options:

<table class="received_transactions center">
  <tr>
    <td class="center" markdown="span">**Ask bankers**{:.fgred}<br>
      They'll monitor your every transaction<br><br>
      <button class="popup js" data-container="bitcoin_bank_receiving">Bitcoin banks</button></td>

    <td class="center" markdown="span">**Ask random nodes**{:.fgred}<br>
      Some of which sell your data<br><br>
      <button class="popup js" data-container="bloom_filter_receiving">P2P lightweight wallets</button></td>
  </tr>

  <tr>
    <td class="center" markdown="span">**Ask a free service**{:.fgred}<br>
      (Actually, some do care about privacy)<br><br>
      <button class="popup js" data-container="electrum_style_receiving">Client lightweight wallets</button></td>

    <td class="center" markdown="span">**Get all {{site.text.total_tx_count_in_millions}} million transactions**{:.fggreen}<br>
      For **perfect** receiving privacy<br><br>
      **Bitcoin Core**</td>
  </tr>
</table>

Bitcoin Core downloads all {{site.text.total_tx_count_in_millions}} million transactions on the Bitcoin block
chain and processes them to find which transactions pay you.

This currently takes about {{site.text.typical_ibd_time_in_hours}} hours the first time
you start Bitcoin Core and about {{site.text.typical_144_block_catchup_time_in_minutes}}
minutes a day to keep updated, but it gives you what scientists call
**<button class="popup js" data-container="information_theoretic_privacy">information-theoretic (perfect) privacy</button>**
against eavesdroppers for received transactions.

## Strong Privacy for Sent Transactions

To put a transaction on the block chain, you must send it publicly---but
how you send it can make a big difference.

![Sending privacy](/img/bitcoin-core/sending-privacy.svg?{{site.time | date: '%s'}})

**Can you guess who made which transactions?** Nearly all peer-to-peer
lightweight clients today make no attempt to obscure their sent
transactions. They simply send them to some or all of their peers.

Bitcoin Core does much better. By default, it relays transactions for
all of its peers---thousands of separate transactions a day under common
conditions---which allows it both [support the peer-to-peer network][bcc
network support] and confuse anti-privacy organizations that try to
track your transactions.


## Tor Compatible

The Tor anonymity network helps disassociate your online activity from
your IP address (which is often closely associated with your real name).
This significantly increases your ability to confound anti-privacy
organizations.

Once you [setup Tor][], using it with Bitcoin Core is [easy][bcc
tor]. If you also [setup a Tor hidden service][bcc tor hs], you will
be able to [connect mobile clients][bcc user interface lightweight]
to your Bitcoin Core full node for increased security and privacy
wherever you go.

{:.center-hanger.center}
[Start using Tor today][setup tor]


## Decentralized Peer Discovery

The first time any Bitcoin program connects to the peer-to-peer network,
it has to ask a centralized authority for a list of recommended peers.

Once the program gets on the network, it can ask its peers for more
recommendations in a fully decentralized way---but
<button class="popup js" data-container="spv_decentralized_peer">most</button>
lightweight wallets don't bother.

<table class="center_header">
  <tr>
    <th class="fgred">P2P Lightweight Wallets</th>
    <th class="fggreen">Bitcoin Core</th>
  </tr>

  <tr>
    <td>Asks the same centralized services every time program is
    restarted. This can be faster.</td>

    <td>Uses the peer-to-peer network to independently discover new
    peers.  Uses found peers on restart.</td>
  </tr>
</table>

This allows the centralized authority to connect lightweight wallets to
dishonest peers that can **completely destroy lightweight transaction
privacy.** Those dishonest peers can work with dishonest miners to
**weaken lightweight security too.**

Bitcoin Core prefers decentralized peer discovery, so after the first
time it starts, it no longer has to trust the centralized authority.
Isn't that worth occasionally starting up a few seconds slower?

<div class="prevnext" markdown="block">
[PREV][bcc validation]
[NEXT][bcc requirements]
</div>

<div class="not-displayed">
  <div id="bitcoin_bank_receiving" title="Bitcoin Bank Receiving Privacy" markdown="block">
  ![Bitcoin Core receiving privacy features](/img/bitcoin-core/bank-receiving-privacy.svg?{{site.time | date: '%s'}})

  When you receive bitcoins to a Bitcoin bank, the money is sent to one of
  the bank's addresses---not your own---which can give you excellent
  privacy against random strangers.

  However, the bank knows you received the transaction and they can likely
  also see any information you associate with the transaction, such as the
  sender's name or another note you attach to the transaction.

  The bank may also be required by law to disclose information about your
  account. They can also sell your information or have a hacker steal your
  information.
  </div>

  <div id="bloom_filter_receiving" title="Bloom Filter Privacy" markdown="block">
  ![Receiving privacy](/img/bitcoin-core/receiving-privacy.svg?{{site.time | date: '%s'}})

  By only asking for payments related to your wallet, plus maybe a few
  others as bloom filter camouflage, lightweight wallets may reveal who you
  paid, who paid you, and what your current bitcoin balance is.

  > A [2014 study of lightweight clients][study of SPV privacy over tor]
  > said, "Our results show that bloom filters incur serious privacy
  > leakage in existing SPV client implementations [...] such an
  > information leakage might severely harm the privacy of users" **Nearly
  > all lightweight clients are still vulnerable today.**

  **Learn more:** ["Lying consistently is hard"][lying consistently is hard]

  </div>

  <div id="electrum_style_receiving" title="Client Lightweight Wallet Receiving Privacy" markdown="block">
  ![Electrum-style receiving privacy](/img/bitcoin-core/electrum-receiving-privacy.svg?{{site.time | date: '%s'}})

  Some lightweight wallets don't connect to the Bitcoin peer-to-peer (P2P)
  network.  Instead, they make a (usually secure) connection to a single
  server that provides block chain data.

  The wallet tells the server all of its addresses, and the server replies
  with all of the transactions that belong to the wallet.  This explicitly
  reveals all of your addresses, which is bad for your privacy---but it
  only gives that information to one server, as long as you don't change
  servers later.

  The server can, of course, give away your information and further
  reduce your privacy. However, as of
  {{site.text.assertion_month | date: "%B %Y"}}, most of these types of
  servers are run by volunteers who likely want to help protect your
  privacy, so this model can be more private than bank wallets or P2P
  lightweight wallets.

  </div>

  <div id="spv_decentralized_peer" title="P2P Decentralized Peer Discovery" markdown="block">
  The following P2P lightweight wallets use decentralized peer discovery
  by default.

  - BRD

  If you know of another compliant lightweight wallet, please [tell us
  about it][docs issue].
  </div>

  <div id="information_theoretic_privacy" title="Information-Theoretic Privacy" markdown="block">
  Information-theoretic privacy means that the privacy can't be broken even
  if an attacker has unlimited computing resources.

  **Learn more:** [Information theoretic security][] (Wikipedia)
  </div>
</div>

{% include references.md %}
</div>
</div>
