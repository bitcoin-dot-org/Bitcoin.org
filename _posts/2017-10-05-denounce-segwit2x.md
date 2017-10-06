---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

type: posts
layout: post
lang: en
category: blog

title: "Bitcoin.org to denounce \"Segwit2x\""
permalink: /en/posts/denounce-segwit2x.html
date: 2017-10-05
---
On 2017-10-11 at noon (UTC), Bitcoin.org is planning to publish a banner on every page of the site warning users about the risks of using services that will default to the so-called Segwit2x<sup><b>1</b></sup> (S2X) contentious hard fork. S2X companies will be called out by name. To ensure that we only warn users against companies that will actually put user deposits at risk, we urge all companies to publicly clarify their stance before the above date, either by a highly-visible public statement or by commenting on Bitcoin.org issue #[1835](https://github.com/bitcoin-dot-org/bitcoin.org/issues/1835) (or by doing both).

In particular, we need to know that:

1. The company will not under any circumstances list "Segwit2x" as "BTC" and/or "Bitcoin". Note that [Bitcoin is not ruled by miners](https://en.bitcoin.it/wiki/Bitcoin_is_not_ruled_by_miners), and miner actions cannot be used as a justification to redefine Bitcoin.
2. The company will not by default do anything that would deprive users of their bitcoins (by eg. using S2X software without addressing replay attacks<sup><b>2</b></sup>, selling user bitcoins automatically, crediting BTC deposits only as S2X deposits, etc.). Providing access to S2X-coins is acceptable, however.
3. The company will continue to provide normal service to Bitcoin (ie. non-S2X) users.

Although bitcoin.org [condemns](/en/posts/hard-fork-policy) contentious hard fork attempts such as S2X, we consider it *tolerable* for companies to support S2X in ways that do not contradict the above three points, such as by supporting both Bitcoin and S2X simultaneously as separate cryptocurrencies.

By default, we will be using the following list of companies known to oppose S2X in our warning:

+ Blocksteam

### Notes

1. "SegWit2x" has nothing to do with SegWit. SegWit is already activated, and was supported by an entirely different set of people.
2. S2X claims to have replay protection, but their version requires extra manual steps in order to prevent loss of BTC. If you use S2X software without careful engineering, you are likely to lose any associated BTC.
