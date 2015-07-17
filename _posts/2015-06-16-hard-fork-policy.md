---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

type: posts
layout: post
lang: en
category: blog

title: "Bitcoin.org Hard Fork Policy"
permalink: /en/posts/hard-fork-policy.html
date: 2015-06-16
---
Contentious hard forks are bad for Bitcoin. At the very best, a
contentious hard fork will leave people who chose the losing side of the
fork feeling disenfranchised. At the very worst, it will make bitcoins
permanently lose their value. In between are many possible outcomes, but
none of them are good.

The danger of a contentious hard fork is potentially so significant
that Bitcoin.org has decided to adopt a new policy:

> Bitcoin.org will not promote software or services that will leave the
> previous consensus because of an intentional and contentious hard fork attempt.

This policy applies to full node software, such as Bitcoin Core,
software forks of Bitcoin Core, and alternative full node
implementations.

It also applies to wallets and services that have the ability to detect
the contentious hard fork, and which release code or make announcements
indicating that they will cease operating on the side of the previous
consensus.
It does not apply to software that cannot detect the contentious hard
fork and which continues doing whatever it would've done anyway.

To be clear, we encourage wallet authors and service providers to offer
their opinions on hard fork proposals, and we will not penalize anyone
for contributing to a discussion. We will only stop promoting particular
wallets and services if they plan to move their users onto a
contentious hard fork by default.
