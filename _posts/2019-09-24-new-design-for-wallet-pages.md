---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

type: posts
layout: post
category: blog

title: "A New Design for Wallet Pages"
permalink: /en/posts/new-design-for-wallet-pages.html
date: 2019-09-24
author: |
  <a href="https://github.com/wbnns">Will Binns</a>
---

A new, more user-friendly and simple set of pages designed to help people find
an ideal bitcoin wallet is now available. It includes a step-by-step wizard to
help people become more familiar with wallets, ratings to compare how they stack
up alongside other wallets, as well as explanations of features they provide
in order to help people make their own informed decisions. Aside from the
wizard, a completely new comparative table and selector is available so people
can see how wallets fare against one another. This is designed to help
people quickly find a wallet to meet their needs.

[Check out the new wallet pages and curate your own list of
wallets.](https://bitcoin.org/en/choose-your-wallet)

## The Old Design

While the old wallet pages presented an assortment of wallets people could
choose from, the experience of doing so was cumbersome and tedious. In order to
see how wallets were rated one would need to navigate to each individual wallet
and then browse back to the overview page to select another wallet to see how
the two might compare. It was not possible to see these comparisons side by
side. One would need to use multiple tabs or browser windows and toggle back and
forth, or a single window, navigating backward and forward.

In addition to the comparative difficulties, millions of people visit
bitcoin.org, many of whom are new to Bitcoin, and have little to no familiarity
with how it works. This is further complicated when a person needs to choose a
bitcoin wallet and has no idea what makes one an optimal choice, what the
features are and what they do, or what they need.

The new design resolves these issues by allowing people to easily compare
wallets, see how they're rated and subsequently generate a list of wallets based
on available features - in addition to explaining things each step along the
way.

## Wallet Ratings

Wallets are given one of four ratings - good, acceptable, caution or neutral.
These ratings are applied across six categories:

+ **Control:** Some wallets give you full control over your bitcoin. This means
  no third party can freeze or take away your funds. You are still responsible,
however, for securing and backing up your wallet.
+ **Validation:** Some wallets have the ability to operate as a full node. This
  means no trust in a third party is required when processing transactions. Full
nodes provide a high level of security, but they require a large amount of
memory.
+ **Transparency:** Some wallets are open-source and can be built
  deterministically, a process of compiling software which ensures the resulting
code can be reproduced to help ensure it hasn't been tampered with.
+ **Environment:** Some wallets can be loaded on computers which are vulnerable
  to malware. Securing your computer, using a strong passphrase, moving most of
your funds to cold store or enabling 2FA or multifactor authentication can help
you protect your bitcoin.
+ **Privacy:** Some wallets make it harder to spy on your transactions by
  rotating addresses. They do not disclose information to peers on the network.
They can also optionally let you setup and use Tor as a proxy to prevent others
from associating transactions with your IP address.
+ **Fees:** Some wallets give you full control over setting the fee paid to the
  bitcoin network before making a transaction, or modifying it afterward, to
ensure that your transactions are confirmed in a timely manner without paying
more than you have to.

These ratings are available to review both on the overview page that includes
all wallets, as well as the individual landing pages for each wallet.

## Wallet Features

There are nine features people can choose from to sort wallets by. These
features are:

+ **2FA:** Two-factor authentication (2FA) is a way to add additional security
  to your wallet. The first 'factor' is your password for your wallet. The
second 'factor' is a verification code retrieved via text message or from an app
on a mobile device. 2FA is conceptually similar to a security token device that
banks in some countries require for online banking. It likely requires relying
on the availability of a third party to provide the service.
+ **Bech32:** Bech32 is a special address format made possible by SegWit (see
  the feature description for SegWit for more info). This address format is also
known as 'bc1 addresses'. Some bitcoin wallets and services do not yet support
sending or receiving to Bech32 addresses.
+ **Full Node:** Some wallets fully validate transactions and blocks. Almost all
  full nodes help the network by accepting transactions and blocks from other
full nodes, validating those transactions and blocks, and then relaying them to
further full nodes.
+ **Hardware Wallet Compatibility:** Some wallets can pair and connect to a
  hardware wallet in addition to being able to send to them. While sending to a
hardware wallet is something most all wallets can do, being able to pair with
one is a unique feature. This feature enables you to be able to send and receive
directly to and from a hardware wallet.
+ **Legacy Addresses:** Most wallets have the ability to send and receive legacy
  bitcoin addresses. Legacy addresses start with 1 or 3 (as opposed to starting
with bc1). Without legacy address support you may not be able to receive bitcoin
from older wallets or exchanges.
+ **Lightning:** Some wallets support transactions on the Lightning Network. The
  Lightning Network is new and somewhat experimental. It supports transferring
bitcoin without having to record each transaction on the blockchain, resulting
in faster transactions and lower fees.
+ **Multisig:** Some wallets have the ability to require more than one key to
  authorize a transaction. This can be used to divide responsibility and control
over multiple parties.
+ **SegWit:** Some wallets support SegWit, which uses block chain space more
  efficiently. This helps reduce fees paid by helping the Bitcoin network scale
and sets the foundation for second layer solutions such as the Lightning
Network.

People can select features that are important to them alongside the ratings
described above, based on their operating system and/or environment.

## Acknowledgments

The new wallet page improvements wouldn't have been possible without donations
from the community, as well as community feedback that we received as various
milestones were passed and presented along the way. A special thanks is also
due to several people who spent a significant amount of their personal time on
this project - Craig Watkins, Cøbra, Natalia Kirejczyk, Alex Cherman, and
Maxwell Mons. Lastly, we appreciate the efforts of many contributors that spent
time reporting issues on GitHub with regard to both the old and new design, that
we were able to resolve as part of this work:

+ [1986](https://github.com/bitcoin-dot-org/bitcoin.org/issues/1986)
+ [2723](https://github.com/bitcoin-dot-org/bitcoin.org/issues/2723)
+ [2861](https://github.com/bitcoin-dot-org/bitcoin.org/issues/2861)
+ [2892](https://github.com/bitcoin-dot-org/bitcoin.org/issues/2892)
+ [3020](https://github.com/bitcoin-dot-org/bitcoin.org/issues/3020)
+ [3022](https://github.com/bitcoin-dot-org/bitcoin.org/issues/3022)
+ [3023](https://github.com/bitcoin-dot-org/bitcoin.org/issues/3023)
+ [3032](https://github.com/bitcoin-dot-org/bitcoin.org/issues/3032)
+ [3051](https://github.com/bitcoin-dot-org/bitcoin.org/issues/3051)

## Adding a Wallet

For people who would like to submit a wallet that isn't listed on the site for
potential inclusion, [documentation is
available](https://github.com/bitcoin-dot-org/bitcoin.org/blob/master/docs/managing-wallets.md)
for review.

## Feedback

If you have any feedback on the new wallet pages, ideas on how they can be made
better, or if you've encountered a problem, please let us know by [opening an
issue on GitHub](https://github.com/bitcoin-dot-org/bitcoin.org/issues/new).

## About bitcoin.org

Bitcoin.org was originally registered and owned by Satoshi Nakamoto and Martti
Malmi. When Satoshi left the project, he gave ownership of the domain to
additional people, separate from the Bitcoin developers, to spread
responsibility and prevent any one person or group from easily gaining control
over the Bitcoin project. Since then, the site has been developed and maintained
by different members of the Bitcoin community.

Despite being a privately owned site, its code is open-source and there have
been thousands of commits from hundreds of contributors from all over the world.
In addition to this, over a thousand translators have helped to make the site
display natively to visitors in their own languages — now 25 different languages
and growing.

Bitcoin.org receives millions of visitors a year from people all over the world
who want to get started with and learn more about Bitcoin.
