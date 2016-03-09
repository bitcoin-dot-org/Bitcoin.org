---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: en
id: bitcoin-core-capacity-increases-faq
columns: 1
title: Capacity increases FAQ — Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - Capacity increases FAQ

moved_url: https://bitcoincore.org/en/2015/12/23/capacity-increases-faq/
---
# Capacity increases FAQ

Other versions: [Italiano](/it/bitcoin-core/capacity-increases-faq) \| [简体中文](/zh_CN/bitcoin-core/capacity-increases-faq) \| [繁體中文](/zh_TW/bitcoin-core/capacity-increases-faq)

1. toc
{:toc}

## What is the roadmap? {#roadmap}

**[Capacity increases for the Bitcoin system][roadmap]**, written by Gregory
Maxwell and published 7 Dec 2015 to the bitcoin-dev mailing list. A
[statement][] supporting the roadmap has been signed by developers who
([according to GitHub][commit stats]) generated more than [90% of all
commits][commit spreadsheet] to Bitcoin Core in 2015.

## What specific technologies are included in the roadmap, and when can we expect them?  {#roadmap-dates}

New technology will be deployed when it is ready and has been tested.
However, we believe the following is a reasonable schedule for the
specific improvements described in the [roadmap][].

| Dec 2015 | | Deploy segregated witness testnet |
| Feb 2016 | 0.12.0 | [libsecp256k1 verification][] |
| Feb 2016 | | Segregated witness feature complete & ready for general review |
| Mar 2016\* | 0.12.x | Deploy OP_CHECKSEQUENCEVERIFY (BIPs [68][BIP68] & [112][BIP112]) + [BIP113][] as first [BIP9][] versionbits soft fork |
| April 2016\* |  0.12.x |  Segregated witness deployment including [block size increase](#segwit-size) |
| 2016 | | Weak blocks, IBLTs, or both |

\* Dates with an asterisk are when we expect to release soft fork-ready code. The code will not be released until it has been well reviewed, and the actual fork will take time to activate ([BIP66][] activated in July 2015 after a few months; [BIP65][] activated in Dec 2015 after only 5 weeks).

- **Segregated witness testnet:** a separate testnet (not part of the
  regular testnet) that provides an opportunity for Bitcoin Core
  contributors to test segregated witness and for wallet authors to
  begin working with it.

- **[Libsecp256k1][] verification:** 500% to 700% speed boost on x86\_64
  hardware during verification to help new full nodes join the network
  and to lighten the burden on existing nodes.

- **[OP\_CHECKSEQUENCEVERIFY][BIP112]:** 25,000% improvement in bi-directional
  [payment channel efficiency][] by allowing users to keep channels open
  as long as they want.

- **[VersionBits][BIP9]:** increase the maximum number of soft forks able to be
  deployed simultaneously from 1 to 29, allowing for faster and more
  decentralized future upgrades of the network.

- **[Segregated witness][bip-segwit]:** 175% to 400% direct capacity upgrade, 66%
  additional improvement in bi-directional channel efficiency by
  consolidating channel open and close operations, an end to
  third-party malleability that hurts smart contract deployment, fraud
  proofs to allow lightweight clients to better participate in
  economic enforcement, and ability to more easily upgrade Bitcoin's
  Script language so that new and more powerful trustless contracts
  may be devised.

- **IBLTs and weak blocks:** 90% or more reduction in critical bandwidth
  to relay blocks created by miners who want their blocks to propagate
  quickly with a modest [increase in total bandwidth][], bringing many of
  the benefits of the [Bitcoin Relay Network][] to all full nodes. This
  improvement is accomplished by spreading bandwidth usage out over time
  for full nodes, which means IBLT and weak blocks may allow for safer
  future increases to the max block size.

## Is the segregated witness soft fork equivalent to a 4MB block size increase, a 2MB increase, a 1.75MB increase, or what? I keep hearing different numbers.  {#segwit-size}

The [current proposal][] for soft fork segregated witness (segwit) counts
each byte in a witness as 0.25 bytes towards the maximum block size
limit, meaning the maximum size of a block is just under 4MB.

However, blocks are not expected to consist entirely of witness data and
each non-witness byte is counted as 1.00 bytes towards the maximum block
size limit, so blocks near 4MB in size would be unlikely.

According to some [calculations][] performed by Anthony Towns, a block
filled with standard single-signature P2PKH transactions would be about
1.6MB and a block filled with 2-of-2 multisignature transactions would
be about 2.0MB.

[current proposal]: https://youtu.be/fst1IK_mrng?t=2234
[calculations]: http://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-December/011869.html

## Segregated witness sounds complicated; will the ecosystem be prepared for its deployment?  {#ecosystem-ready}

Some ideas are easy to explain but hard to execute. Other ideas are easy
to execute but hard to explain. Segregated witness (segwit) seems to be
the latter.

Segwit can be deployed incrementally without breaking compatibility, so
no significant preparation of the ecosystem is necessary. Developers
who want immediate hands-on experience with segwit can begin to test
their software on the segwit testnet being deployed in Dec 2015.

Initially, only miners who wish to support it need to upgrade in
order to activate it and enforce it on the mainnet. Existing
applications only need to change if they wish to take advantage of the
new features.

Segregated witness transactions will require lower fees, will afford
much greater performance optimizations, and can support multistage smart
contracts and protocols such as bi-directional payment channels that can
scale without writing extra data to the blockchain. Wallets are strongly
encouraged to upgrade but can continue to operate without modification
as the deployment does not break backwards compatibility.

## Segregated witness still sounds complicated. Why not simply raise the maximum block size?  {#size-bump}

There's a [single line of code][max_block_size] in Bitcoin Core that says the maximum block size is 1,000,000 bytes (1MB). The simplest change would be a hard fork to update that line to say, for example, 2,000,000 bytes (2MB).

Hard forks are anything but simple:

- **We don't have experience:** Miners, merchants, developers, and users
  have never deployed a hard fork, so techniques for safely deploying
  them have not been tested.

    This is unlike soft forks, whose deployments were initially managed
    by Nakamoto, where we gained experience from the complications in
    the [BIP16][] deployment, where we refined our technique in the [BIP34][]
    deployment, and where we've gained enough experience with BIPs [66][BIP66]
    and [65][BIP65] to begin managing multiple soft forks with [BIP9][] version bits
    in the future.

- **Upgrades required:** Hard forks require all full nodes to upgrade or
  everyone who uses that node may lose money. This includes the node
  operator, if they use it to protect their wallet, as well as
  lightweight clients who get their data from the node.

- **Other changes required:** Even a single-line change such as
  increasing the maximum block size has effects on other parts of the
  code, some of which are undesirable. For example, right now it's
  possible to construct a transaction that takes up almost 1MB of
  space and which takes 30 seconds or more to validate on a modern
  computer (blocks containing such transactions have been mined). In
  2MB blocks, a 2MB transaction can be constructed that may take over
  10 minutes to validate which opens up dangerous denial-of-service
  attack vectors.  Other lines of code would need to be changed to
  prevent these problems.

Despite these considerable complications, with sufficient precautions,
none of them is fatal to a hard fork, and we do expect to make hard
forks in the future. But with segregated witness (segwit) we have a
soft fork, similar to other soft forks we've performed and gained
experience in deploying, that provides us with many benefits in addition
to allowing more transactions to be added to the blockchain.

Segwit does require more changes in higher level software stacks than a
simple block size increase, but if we truly want to see bitcoin scale,
far more invasive changes will be needed anyway, and segwit will
gently encourage people to upgrade to more scalable models right away
without forcing them to do so.

Developers, miners, and the community have accrued significant
experience deploying soft forks, and we believe segwit can be deployed
at least as fast, and probably more securely, than a hard fork that
increases the maximum block size.

## Will there be a hard fork before or as part of the segregated witness implementation?  {#pre-segwit-fork}

No. That is not part of the [roadmap][].

[roadmap]: https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-December/011865.html

## If there's eventually going to be a hard fork, why not do it now? {#why-not-now}

We currently have the ability to increase the capacity of the
system through soft forks that have widespread consensus without any
of the complications of a hard fork, as described in an [earlier
question][q simple raise], so the expectation that there will be an
eventual hard fork is not sufficient reason to attempt one now.

In addition to giving us extra transaction capacity, the improvements
proposed in the roadmap (combined with other technology such as
bi-directional payment channels) give users the ability to reduce the
amount of blockchain space they use on average---effectively increasing
the capacity of the Bitcoin system without increasing the amount of full
node bandwidth used.

For example,

- [BIP68][] and [BIP112][] allow bi-directional payment channels to stay open
  indefinitely, which we expect to vastly reduce the number of payment
  channel transactions that need to be committed to the blockchain.

- Segregated witness allows a payment channel close transaction to be
  combined with a payment channel open transaction, reducing the
  blockchain space used to change channels by about 66%.

- Segregated witness allows soft forks to change the Bitcoin Script
  language in ways that could reduce the average size of a transaction,
  such as using public-key-recovery-from-signatures or Schnorr combined
  signatures.

- Segregated witness permits the creation of compact fraud proofs that
  may bring the security of Simplified Payment Verification (SPV)
  lightweight clients up near to that of full nodes, which may allow the
  network to function well with fewer full nodes than it can under
  currently-deployed technology.

The actual effect of these technologies is unknown, but scaling now with
a soft fork that has wide consensus allows us to obtain the immediate
gains, test and measure the mid-term possibilities, and use that data to
formulate long-term plans.

## How will segregated witness transactions work for wallets?  {#segwit-in-wallets}

Wallets that currently support P2SH can migrate to full segregated
witness in two phases:

- Phase 1: Scripts are hashed twice, first to 256 bits and then to 160
  bits. The 160 bit hash will be compatible with existing P2SH
  addresses, so upgraded wallets will be able to send and receive
  bitcoins to and from currently existing wallets.

- Phase 2: Scripts are hashed once to 256 bits. This format will not be
  compatible with existing wallets but will allow more efficient use of
  block space and will offer better security due to greater collision
  resistance.

## If no one is forced to upgrade, why will anyone bother to upgrade? I heard P2SH took almost two years to become widely deployed.  {#why-upgrade}

Each byte of the witness part of a segregated witness (segwit)
transaction will only count as 0.25 bytes towards the size of the
transaction. Since transaction fees are based on the size of a
transaction, this is effectively a 75% discount on fees for that part of
a transaction---but only for people who use segwit.

David Harding provided a table of [estimated savings][] at various
fee/transaction levels. That is, if the fee for a typical 250-byte
transaction is $0.01 USD, using segwit will save about $0.003 when
spending a P2PK-in-P2SH transaction output.

| Transaction | Bytes saved | $0.01/250B | $0.05/250B | $0.25/250B | $1.00/250B |
|-------------|-------------|------------|------------|------------|------------|
| P2PK-in-P2SH |  79/107 | $0.003 | $0.015 | $0.079 | $0.316 |
| 1-of-1 P2SH multisig | 83/112 | $0.003 | $0.016 | $0.083 | $0.332 |
| 2-of-2 P2SH multisig | 163/219 | $0.006 | $0.032 | $0.163 | $0.652 |
| 2-of-3 P2SH multisig | 189/254 | $0.007 | $0.037 | $0.189 | $0.756 |

(We don't expect fees to get as high as the highest seen in this
table; they are just provided for reference.)

Web wallets and exchanges that send large numbers of transactions each
day at fixed rates (such as for free or for 1% per spend) are expected
to be early adopters---even the small savings per spend seen in the
table above will add up to significant amounts of money if repeated hundreds
or thousands of times a day.

## I heard you were breaking zero-confirmation transactions. Which technology in the scaling roadmap is doing that?  {#rbf}

None of them. By default, current versions of Bitcoin Core won't
replace an unconfirmed transaction with another transaction that spends
any of the same inputs. Some people think this means the first
transaction they see that spends a particular input is safe, but this is
untrue. (If it were true, we wouldn't need the blockchain.)

This current default policy does mean that people who want to be able to
update their unconfirmed transactions can't do that. The original
version of Bitcoin provided people with a way to indicate that they
wanted to be able to update their transactions, but Nakamoto had to
disable it in 2010 to prevent denial-of-service attacks.

Recent Bitcoin Core developers realized that they could prevent the
DOS attack by requiring updated transactions pay extra fees, and they've
re-enabled Nakamoto's mechanism for indicating when a transactions can
be replaced. This feature is planned for Bitcoin Core 0.12.0 (expected
Jan/Feb 2016) but, like Nakamoto's original feature, is opt-in so
people who want to be able to replace their transactions have to use a
wallet that supports that feature.

Currently there are no wallets that provide this feature, but wallets
that do provide it in the future may be able to combine multiple
transactions together to reduce the amount of blockchain space they use
as well as increase the fees they pay on transactions that are taking a
long time to confirm, helping to prevent transactions from getting
“stuck” (a known usability problem).

## Weak blocks and IBLTs just say “2016” in the roadmap schedule. Does this mean you have no idea when they'll be available?  {#weak-blocks-iblts}

[Weak blocks and IBLTs][] are two separate technologies that are still being
[actively studied][] to choose the right parameters, but the number of
developers working on them is limited and so it's difficult to guess
when they'll be deployed.

Weak blocks and IBLTs can both be deployed as network-only enhancements
(no soft or hard fork required) which means that there will probably
only be a short time from when testing is completed to when their
benefits are available to all upgraded nodes. We hope this will happen
within 2016.

After deployment, both weak blocks and IBLTs may benefit from a simple
non-controversial soft fork ([canonical transaction ordering][]), which
should be easy to deploy using the [BIP9][] versionBits system described
elsewhere in this FAQ.

[canonical transaction ordering]: https://gist.github.com/gavinandresen/e20c3b5a1d4b97f79ac2#canonical-ordering-of-transactions

## “Why would miners adopt the SegWit format, given that it does not provide any savings of bandwidth, storage, or processing time to them?” {#why-mine-segwit}

Most [previous soft forks][] have not provided these benefits to miners
either. For example,

| [BIP16][] (P2SH) | New transaction type |
| [BIP30][] (duplicate txids) | Required checking for duplicate txids |
| [BIP34][] (height in coinbase) | Reduced miner coinbase space by 4 bytes |
| [BIP65][] (OP_CLTV) | New opcode |

The [BIP66][] (strict DER) soft fork which activated in July 2015 will
soon be providing reduced processing time by making it possible to
switch to libsecp256k1 for validation as described elsewhere is this
FAQ. The reduced validation time makes it uncommon among soft
forks in providing direct benefits to miners.

What segregated witness (segwit) does is provide several major benefits
to anyone who uses it to create transactions:

A permanent fix for third-party malleability, allowing multi-stage
smart contracts to flourish. A modest reduction in fees. Easy future
upgrades to Bitcoin Script, so wallets can more easily gain access to
new features.

Through the previous soft forks, and through conversations such as the
[Miners' Panel][] at Scaling Bitcoin Hong Kong, miners have
repeatedly shown that they want Bitcoin to be the most useful system
possible even if they don't receive any direct benefits. Segwit and
the other improvements in the roadmap provide significant usability
enhancements.

In addition, segwit allows miners to put more transactions in their
blocks, which may allow them to increase their per-block revenue.

## How can I help?

Start by reading the [Bitcoin Core contributor][] pages on Bitcoin.org.
In particular, [code review][] is a critical part of getting soft forks
deployed.

To get specific suggestions on how you can help, please join the
[#bitcoin-dev][] IRC channel.

[#bitcoin-dev]: https://webchat.freenode.net/?channels=bitcoin-dev&amp;uio=d4
[actively studied]: http://diyhpl.us/wiki/transcripts/scalingbitcoin/bitcoin-block-propagation-iblt-rusty-russell/
[bip-segwit]: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
[BIP9]: https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki
[BIP16]: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
[BIP30]: https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
[BIP34]: https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki
[BIP50]: https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki
[BIP65]: https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki
[BIP66]: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
[BIP68]: https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki
[BIP112]: https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki
[BIP113]: https://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki
[bitcoin core contributor]: /en/bitcoin-core/
[Bitcoin relay network]: http://bitcoinrelaynetwork.org/
[code review]: https://bitcoin.org/en/development#code-review
[commit spreadsheet]: https://docs.google.com/spreadsheets/d/15jtxuA3dVY5NUuYezZ4d_69ASUMYjqFOMxsF9ZX-BKA/edit?usp=sharing
[commit stats]: https://github.com/bitcoin/bitcoin/graphs/contributors?from=2015-01-01&to=2015-12-31&type=c
[estimated savings]: https://www.reddit.com/r/bitcoinxt/comments/3w1i6b/i_attended_scaling_bitcoin_hong_kong_these_are_my/cxtkaih
[increase in total bandwidth]: https://scalingbitcoin.org/hongkong2015/presentations/DAY1/3_block_propagation_1_rosenbaum.pdf
[libsecp256k1]: https://github.com/bitcoin/secp256k1
[libsecp256k1 verification]: https://github.com/bitcoin/bitcoin/pull/6954
[max_block_size]: https://github.com/bitcoin/bitcoin/blob/3038eb63e8a674b4818cb5d5e461f1ccf4b2932f/src/consensus/consensus.h#L10
[miners' panel]: https://youtu.be/H-ErmmDQRFs?t=1086
[payment channel efficiency]: https://scalingbitcoin.org/hongkong2015/presentations/DAY2/1_layer2_2_dryja.pdf
[previous soft forks]: https://github.com/bitcoin/bips/blob/master/bip-0123.mediawiki#classification-of-existing-bips
[statement]: /en/bitcoin-core/capacity-increases
[weak blocks and iblts]: https://www.youtube.com/watch?v=ivgxcEOyWNs&t=1h40m20s
[q simple raise]: #size-bump
