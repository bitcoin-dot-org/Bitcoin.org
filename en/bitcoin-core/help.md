---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: en
id: bitcoin-core-help
columns: 1
title: Get Help - Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - Help

end_of_page: |
  <script src="/js/devsearch.js"></script>
---
# Getting Help For Bitcoin Core

There are many ways to get help for Bitcoin Core, including
[documentation](#documentation), [forums](#forums), and [live chatrooms](#live).

<span class="fa fa-exclamation-triangle"></span> *To report an issue,
please see the [bug reporting][bcc contribute issues] page.*

## Documentation

Bitcoin Core currently doesn't have any cohesive or complete
documentation---but we hope to improve that situation soon. For now, you
can use the following resources:

- Bitcoin Wiki pages: [running Bitcoin][bcc configuration], [data
  directory][bcc data directory], and other articles in the [Bitcoin
  Core documentation category][wiki bitcoin core documentation].

    <form id="searchform" action="https://en.bitcoin.it/w/index.php">
      <input id="searchInput" class="glossary_term" type="search" placeholder="Search the Bitcoin Wiki" name="search"></input>
    </form>

- The [developer reference][RPCs] provides complete documentation of the
  RPCs that can be used with `bitcoin-cli` or in third-party programs.
  The [REST][rest] interface is also fully documented.  Both can be searched
  using the box below:

    <input id="glossary_term" class="glossary_term" placeholder="Search the RPCs and more">

- The [bandwidth sharing guide][] describes installing Bitcoin Core in
  detail as well as opening port 8333 to allow other Bitcoin programs to
  download blocks and transactions from you.

## Forums

Bitcoin has a wide range of [communities][communities], but the following places
are the best place to ask for help using Bitcoin Core:

- [Bitcoin StackExchange][] is a community dedicated entirely to
  answering questions about Bitcoin and related technology.  Many
  questions about Bitcoin Core can be found under the [Bitcoin-Qt
  tag](http://bitcoin.stackexchange.com/questions/tagged/bitcoin-qt)

- [BitcoinTalk Technical Support][forum tech support] is a
  sub-forum dedicated to providing help for Bitcoin Core and other
  Bitcoin programs.

- [/r/BitcoinBeginners][bitcoin beginners] is a Reddit community for
  users who have questions about anything Bitcoin-related, including
  Bitcoin Core.

## Live

Internet Relay Chat (IRC) is the most popular way to get live online
help with Bitcoin Core. When you join an IRC chatroom, you must read
the topic (which is usually automatically displayed) to learn the rules
for that chatroom.

- [#bitcoin][] is the best place to ask general questions about
  Bitcoin Core.

- [#bitcoin-mining][] hosts discussion about Bitcoin mining, including
  decentralized mining using Bitcoin Core as part of the system.

- For more channels, please see the [comprehensive listing][irc channels]
  on the Bitcoin Wiki.

{% include references.md %}
