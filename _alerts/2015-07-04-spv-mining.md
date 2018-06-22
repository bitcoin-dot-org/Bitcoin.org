---
## This file is licensed under the MIT License (MIT) available on
## http://opensource.org/licenses/MIT.

title: "Some Miners Generating Invalid Blocks"
shorturl: "spv-mining"
show_toc: true
active: false
date: 2015-07-04
#banner: "WARNING: many wallets currently vulnerable to double-spending of confirmed transactions (click here to read)"
bannerclass: "alert"
---

<div class="post-content" markdown="1">

*This document is being updated as new information arrives.  Last
update: 2015-07-15 13:00.  All times are UTC.*

**Note: this situation has not been fully resolved, and it does not
appear that it will be fully resolved anytime soon. Users of the
affected wallets listed below are still advised to wait additional
confirmations or to switch to a safer wallet.**

{% assign confs="30" %}

##Summary

Your bitcoins are safe if you received them in transactions confirmed before 2015-07-15 12:00 UTC.

However, there has been a problem with a planned upgrade. For
bitcoins received later than the time above, confirmation scores are
significantly less reliable then they usually are for users of
certain software:

- **Lightweight ([SPV][SPV]) wallet users** should wait an additional {{confs}}
confirmations more than you would normally wait.  Electrum users,
please see [this note][electrum note].
- **Bitcoin Core 0.9.4 or earlier users** should wait an
additional {{confs}} confirmations more than you would normally
wait or upgrade to [Bitcoin Core 0.10.2][bitcoin core].
- **Web wallet users** should wait an additional {{confs}} confirmations
more than you would normally wait, unless you know for sure that your
wallet is secured by Bitcoin Core 0.9.5 or later.
- **Bitcoin Core 0.9.5 or later users are unaffected.**  (Note:
[upgrade to 0.10.2][bitcoin core] is recommended due to
denial-of-service vulnerabilities unrelated to this alert.)
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

##Miners

If you pool mine, please switch to a pool that properly validates
blocks.  The Wiki Mining Pool Comparison page currently contains a list of [known (or
suspected) good and bad pools][pool list].

If you solo mine, please switch to Bitcoin Core 0.10.2.
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">
<h2 id="solution">When Will Things Go Back To Normal?</h2>

The problem is miners creating invalid blocks.  Some software can detect
that those blocks are invalid and reject them; other software can't
detect that blocks are invalid, so they show confirmations that aren't
real.

- **Bitcoin Core 0.9.5 and later** never had any problems because
it could detect which blocks were invalid.
- **Bitcoin Core 0.9.4 and earlier** will never provide as much
security as later versions of Bitcoin Core because it doesn't know
about the additional [BIP66][BIP66]
consensus rules. [Upgrade][bitcoin core] is recommended
to return to full node security.
- **Lightweight (SPV) wallets** are not safe for less than
{{confs}} confirmations until all the major pools switch to full
validation.
- **Web wallets** are very diverse in what infrastructure they
run and how they handle double spends, so unless you know for sure
that they use Bitcoin Core 0.9.5 or later for full validation, you
should assume they have the same security as the lightweight
wallets described above.
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">
<h2 id="cause">What's Happening</h2>

Summary: Some miners are currently generating invalid blocks. Almost
all software (besides Bitcoin Core 0.9.5 and later) will accept these
invalid blocks under certain conditions.

So far, the following forks of two or more blocks have occurred:

{% assign Blocks='Blocks <sup><a href="#invalid-blocks">[1]</a></sup>' %}

<a name="list-of-forks" />

| Start date     | End time | {{Blocks}} | Double Spends |
|----------------|----------|------------|---------------|
| 4 July @ 02:10 | 03:50    | 6          | 0             |
| 5 July @ 21:50 | 23:40    | 3          | Not yet known |


The paragraphs that follow explain the cause more throughly.

For several months, an increasing amount of mining hash rate has been
signaling its intent to begin enforcing [BIP66][BIP66]
strict DER signatures.  As part of the BIP66 rules,
once 950 of the last 1,000 blocks were version 3 (v3) blocks, all
upgraded miners would reject version 2 (v2) blocks.

Early morning on 4 July 2015, the 950/1000 (95%) threshold was
reached. Shortly thereafter, a small miner (part of the non-upgraded
5%) mined an invalid block--as was an expected occurrence.
Unfortunately, it turned out that roughly half the network hash rate
was mining without fully validating blocks (called SPV mining), and
built new blocks on top of that invalid block.

Note that the roughly 50% of the network that was SPV mining had
explicitly indicated that they would enforce the BIP66 rules. By not
doing so, several large miners have lost over $50,000 dollars worth
of mining income so far.

All software that assumes blocks are valid (because invalid blocks
cost miners money) is at risk of showing transactions as confirmed
when they really aren't. This particularly affects lightweight (SPV)
wallets and software such as old versions of Bitcoin Core which have
been downgraded to SPV-level security by the new BIP66 consensus
rules.

The recommended fix, which was attempted, was to
get all miners off of SPV mining and back to full validation (at
least temporarily). If this happens, Bitcoin.org will reduce its
current recommendation of waiting {{confs}} extra confirmations to a
lower number.
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

## Updates

1. **6 July 04:00:**{:#update-1} A new fork occurred starting 5 July at
21:30 with three blocks before the valid chain again became the
strongest chain. See the recently-added [list of forks](#list-of-forks).
Reports that the situation has passed are **not correct.** Please continue
to wait {{confs}} more confirmations than you usually would wait before
accepting a transaction.
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

## Invalid Blocks

Please see the list of [invalid block hashes][] on the Bitcoin Wiki.

<!--
<div style="text-align:right">
  <i>This notice last updated: 2015-07-04 06:00 UTC</i>
</div>
-->

[BIP66]: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
[pool list]: https://en.bitcoin.it/wiki/Comparison_of_mining_pools#SPV_Mining_.2F_Old_Bitcoin_Core
[bitcoin core]: /en/download
[SPV]: http://bitcoin.stackexchange.com/questions/4649/what-is-an-spv-client
[electrum note]: https://en.bitcoin.it/wiki/July_2015_Forks#Electrum
[invalid block hashes]: https://en.bitcoin.it/wiki/July_2015_Forks#Invalid_Block_Hashes
</div>