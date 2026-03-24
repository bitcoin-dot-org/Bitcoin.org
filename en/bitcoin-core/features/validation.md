---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: en
columns: 1
id: bitcoin-core-validation
title: Validation - Bitcoin Core Features
breadcrumbs:
  - bitcoin
  - bcc
  - bcc features
  - Validation
---
<div class="hero">
<div class="container hero-container" markdown="block">

# Bitcoin Core Validation
</div>
</div>

<div class="bitcore-content">
<div class="container" markdown="block">
![Full validation](/img/bitcoin-core/slider-validation.svg?{{site.time | date: '%s'}})

{% include bitcoin-core/download-bitcoin-core.html %}

> Imagine a scientist reading about an experimental result and then
> repeating the experiment for herself. Doing so allows her to **trust
> the result without having to trust the original scientists.**

Bitcoin Core checks each block of transactions it receives to ensure
that everything in that block is fully valid---allowing it to trust the
block without trusting the miner who created it.

This prevents miners from tricking Bitcoin Core users into accepting
blocks that violate the 21 million bitcoin limit or which break other
important rules.

Users of other wallets don't get this level of security, so miners can
trick them into accepting fabricated transactions or hijacked block chains.

Why take that risk if you don't have to? Bitcoin Core provides
the **best possible security against dishonest miners** along
with additional security against other easier attacks (see below
for details).


## How Validation Protects Your Bitcoins

<button class="popup js" data-container="bitcoin_banks">Bitcoin banks</button>
and
<button class="popup js" data-container="spv_wallets">lightweight (SPV) wallets</button>
put your bitcoins at
increased risk of being stolen. That risk may be acceptable for small
values of bitcoin on mobile wallets, but is it what you want for your
real wallet?

*Click any row below for more details about that attack*
{:.center}

<table class="validation">
<tr>
  <th>Attack</th>
  <th markdown="span">Bank Wallet</th>
  <th markdown="span">SPV Wallet</th>
  <th>Bitcoin Core</th>
</tr>

<tr class="brief">
  <td><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-e"></span>Direct theft</td>
  <td class="bgred"></td>
  <td class="bggreen"></td>
  <td class="bggreen"></td>
</tr>

<tr class="details">
<td colspan="4" markdown="block">
> Alice deposits 100 bitcoins to Bank.Example.com. The next day, the
> owners of the site disappear with Alice's money.

- **Bitcoin bank**{:.fgred} users are vulnerable to direct theft because
  they don't control their own private keys.

- **Lightweight (SPV) wallet**{:.fggreen} users and **Bitcoin
  Core**{:.fggreen} users are not vulnerable because they control their
  own private keys.

Direct theft is likely the leading cause of stolen bitcoins so far.

### Real Example

Bitcoin exchange Mt Gox reportedly had 650,000 bitcoins (worth $347
million USD) stolen from their customer deposits and their own operating
funds. They declared bankruptcy on 28 February 2014.

Even when the bankruptcy proceeding is complete, customers are unlikely to
recover more than a small fraction of the bitcoins they had on deposit.

**Learn More:** [Collapse of Mt
Gox](https://en.bitcoin.it/wiki/Collapse_of_Mt._Gox)
</td>
</tr>

<tr class="brief">
  <td><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-e"></span>Bait and switch</td>
  <td class="bgred"></td>
  <td class="bgyellow"></td>
  <td class="bggreen"></td>
</tr>

<tr class="details">
<td colspan="4" markdown="block">
> Alice installs Example Wallet, whose open source code has been
> audited.  The next day, the authors of Example Wallet push new code to
> Alice's device and steal all her bitcoins.

- **Bitcoin bank**{:.fgred} users are vulnerable because they can only
  spend their bitcoins when they use the bank's approved software.

- **Lightweight (SPV) wallet**{:.fgyellow} users are vulnerable with
  most software because auditors can't easily verify the software you
  run (the executable) is the same as the program source code, called a
  deterministic build. However, some lightweight wallets are moving to
  deterministic builds.

- **Bitcoin Core**{:.fggreen} is built deterministically.  Cryptographic
  signatures from build auditors---many of whom are well known to the
  community---are [released publicly][gitian sigs].

<div class="callout" markdown="block">
Bitcoin.org's [Choose Your Wallet][] page tells you whether or not
wallet builds are audited in the *Transparency* score for each wallet.
</div>

### Real Example

In April 2013, the OzCoin mining pool was hacked. The thief stole 923
bitcoins (worth $135,000 USD), but online wallet StrongCoin modified
their wallet code to 'steal back' 569 of those bitcoins ($83,000)
from one of their users who was suspected of the theft.

Although this attack was done with good intentions, it illustrated
that the operators of StrongCoin could steal bitcoins from their users
at any time even though the users supposedly controlled their own
private keys.

**Learn More:** [OzCoin Hacked, Stolen Funds Seized and Returned by StrongCoin](https://bitcoinmagazine.com/4273/ozcoin-hacked-stolen-funds-seized-and-returned-by-strongcoin/)
</td>
</tr>

<tr class="brief">
<td><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-e"></span>Fabricated transactions</td>
  <td class="bgred"></td>
  <td class="bgred"></td>
  <td class="bggreen"></td>
</tr>

<tr class="details">
<td colspan="4" markdown="block">
> Mallory creates a transaction giving Alice 1,000 bitcoins, so Alice
> gives Mallory some cash. Later Alice discovers the transaction Mallory
> created was fake.

- **Bitcoin bank**{:.fgred} users depend on the information reported by the
  bank, so they can easily be fooled into accepting fabricated
  transactions.

- **Lightweight (SPV) wallet**{:.fgred} users depend on full nodes and
  miners to validate transactions for them. It costs nothing for
  dishonest full nodes to send unconfirmed fabricated transactions to an
  SPV wallet. Getting one or more confirmations of those fabricated
  transactions is also possible with help from a dishonest miner.

- **Bitcoin Core**{:.fggreen} users don't have to worry about fabricated
  transactions because Bitcoin Core validates every transaction before
  displaying it.

<div class="callout" markdown="block">
Currently the best defense against fabricated transactions, besides
using Bitcoin Core, is to wait for as many confirmations as possible.
</div>

### Real Example

On 4 August 2015, web wallet BlockChain.info began indicating that a
transaction had spent the earliest mined 250 bitcoins, coins that some
people believed were owned by Bitcoin creator Satoshi Nakamoto.

It was soon discovered that the transaction was invalid. BlockChain.info
was not validating transactions with Bitcoin Core and that transaction
had been [created by a security researcher][fake satoshi transaction].

**Learn more:** [BitcoinJ documentation about pending transaction
safety][]

</td>
</tr>

<tr class="brief">
<td><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-e"></span>Chain hijacking</td>
  <td class="bgred"></td>
  <td class="bgred"></td>
  <td class="bggreen"></td>
</tr>

<tr class="details">
<td colspan="4" markdown="block">
> Alice believes that there should never be more than 21 million
> bitcoins---but one day she's tricked into buying "bitcoins" that
> are only valid on a block chain with permanent 10% inflation.

- **Bitcoin bank**{:.fgred} users have to use whatever block chain the
  bank uses.  Banks can even profit from switching their users to a new
  chain and selling their users' bitcoins from the old chain.

- **Lightweight (SPV) wallet**{:.fgred} users accept the block chain
  they know about with the most proof of work. This lets the hash rate
  majority of miners force SPV wallet users off of Bitcoin.

- **Bitcoin Core**{:.fggreen} users don't have to worry about chain
  hijacking because Bitcoin Core validates every block using *all* of
  Bitcoin's consensus rules.

<div class="callout" markdown="block">
Preventing chain hijacking is one of Bitcoin Core's most important jobs.
The alternative is to allow miners to do whatever they want.
</div>

### Real Example

In July 2015, several large Bitcoin miners accidentally produced an
invalid block chain several blocks longer than the correct block chain.
Some bank wallets and many SPV wallets accepted this longer chain,
putting their users' bitcoins at risk.

Recent versions of Bitcoin Core never accepted any of the blocks from
the invalid chain and never put any bitcoins at risk.

It is believed that the miners at fault controlled more than 50% of the
network hash rate, so they could have continued to fool SPV wallets
indefinitely.  It was only their desire to remain compatible with
Bitcoin Core users that forced them to abandon over $37,500 USD worth of
mining income.

**Learn more:** [July 2015 chain forks][]
</td>
</tr>

<tr class="brief">
<td><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-e"></span>Transaction withholding</td>
  <td class="bgred"></td>
  <td class="bgred"></td>
  <td class="bggreen"></td>
</tr>

<tr class="details">
<td colspan="4" markdown="block">
> Mallory shows Alice $1,000 USD that he will pay her if she sends him some
> bitcoins.  Alice sends the bitcoins but the transaction never seems to
> confirm.  After waiting a long time, Alice returns Mallory's cash.  It
> turns out the transaction did confirm, so Alice gave away her bitcoins
> for nothing.

- **Bitcoin bank**{:.fgred} users only see the transactions the bank
  choose to show them.

- **Lightweight (SPV) wallets**{:.fgred} users only see the
  transactions their full node peers choose to send them, even if those
  transactions were included in a block the SPV wallet knows about.

- **Bitcoin Core**{:.fggreen} users see all transactions included in
  received blocks. If Bitcoin Core hasn't received a block for too long,
  it displays a catching-up progress bar in the graphical [user
  interface][bcc user interface] or a warning message in the CLI/API user
  interface.

<div class="callout" markdown="block">
Unless you use Bitcoin Core, you can never be sure that your bitcoin balance
is correct according to the block chain.
</div>

### Real Example

In March 2015, spy nodes run by the company Chainalysis accidentally
prevented some users of the lightweight BreadWallet from connecting to
honest nodes. Since the spy nodes didn't relay transactions, BreadWallet
users stopped receiving notification of new transactions.

**Learn more:** [Chainalysis CEO Denies 'Sybil Attack' on Bitcoin's Network](http://www.coindesk.com/chainalysis-ceo-denies-launching-sybil-attack-on-bitcoin-network/)
</td>
</tr>

<tr class="brief">
<td><span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-e"></span>Chain rewrites</td>
  <td class="bgred"></td>
  <td class="bgred"></td>
  <td class="bgred"></td>
</tr>

<tr class="details">
<td colspan="4" markdown="block">
> Mallory gives Alice 1,000 bitcoins. When Alice's wallet says the
> transaction is confirmed, Alice gives Mallory some cash. Later Alice
> discovers that Mallory has managed to steal back the bitcoins.

This attack applies to **all Bitcoin wallets.**{:.fgred}

The attack works because powerful miners have the ability to rewrite the
block chain and replace their own transactions, allowing them to take
back previous payments.

The cost of this attack depends on the percentage of total network hash
rate the attacking miner controls. The more centralized mining becomes,
the less expensive the attack for a powerful miner.

![The cost of a chain rewrite](/img/bitcoin-core/en-confirmed-double-spend-cost.svg?{{site.time | date: '%s'}})

### Real Example

In September 2013, someone used centralized mining pool GHash.io to
steal an estimated 1,000 bitcoins (worth $124,000 USD) from the gambling
site BetCoin.

The attacker would spend bitcoins to make a bet.  If he won, he would
confirm the transaction.  If he lost, he would create a transaction
returning the bitcoins to himself and confirm that, invalidating the
transaction that lost the bet.

By doing so, he gained bitcoins from his winning bets without losing
bitcoins on his losing bets.

Although this attack was performed on unconfirmed transactions, the
attacker had enough hash rate (about 30%) to have profited from
attacking transactions with one, two, or even more confirmations.

**Learn more:** [GHash.IO and double-spending against BetCoin
Dice][ghash betcoin double spend]
</td>
</tr>
</table>

Note that although all programs---including Bitcoin Core---are
vulnerable to chain rewrites, Bitcoin provides a defense mechanism: the
more confirmations your transactions have, the safer you are. *There is
no known decentralized defense better than that.*


## Help Protect Decentralization

{% comment %}<!-- 1231006505 is the time in block 0; 31558149 is the average number of seconds in a year -->{% endcomment %}
{% capture bitcoin_age %}{{ site.time | date: "%s" | minus: "1231006505" | divided_by: "31558149" }}{% endcapture %}

The bitcoin currency only works when people accept bitcoins in exchange
for other valuable things. That means it's the people accepting
bitcoins who give it value and who get to decide how Bitcoin should work.

When you accept bitcoins, you have the power to enforce Bitcoin's rules,
such as preventing confiscation of any person's bitcoins without access
to that person's private keys.

Unfortunately, **many users outsource their enforcement power**. This
leaves Bitcoin's decentralization in a weakened state where a handful of
miners can collude with a handful of banks and free services to change
Bitcoin's rules for all those non-verifying users who outsourced their power.

<table class="received_transactions center">
  <tr>
    <td class="center" markdown="span">*Users of Bitcoin banks*<br>
      **Trust bankers**{:.fgred}</td>

    <td class="center" markdown="span">*Users of P2P lightweight wallets*<br>
    **Trust miners**{:.fgred}</td>
  </tr>

  <tr>
    <td class="center" markdown="span">*Users of client lightweight wallets*<br>
    **Trust "free" services**{:.fgred}</td>

    <td class="center" markdown="span">*Users of Bitcoin Core*<br>
    **Enforce the rules**{:.fggreen}</td>
  </tr>
</table>

Unlike other wallets, **Bitcoin Core *does* enforce the rules**---so
if the miners and banks change the rules for their non-verifying
users, those users will be unable to pay full validation Bitcoin Core
users like you.

As long as there are many non-verifying users who want to be able to
pay Bitcoin Core users, miners and others know they can't effectively
change Bitcoin's rules.

But what if not enough non-verifying users care about paying Bitcoin
Core users? Then it becomes easy for miners and banks to take control of
Bitcoin, likely bringing to an end this {{bitcoin_age}} year experiment
in decentralized currency.

![History of Bitcoin](/img/bitcoin-core/history-of-bitcoin.svg?{{site.time | date: '%s'}})

If you think **Bitcoin should remain decentralized,** the best thing you
can do is [validate every payment you receive](#do-you-validate) using your own personal
full node such as Bitcoin Core.

We don't know how many full validation users and business are needed,
but it's possible that for each person or business who validates their
own transactions, Bitcoin can remain decentralized even if there are ten
or a hundred other non-verifying users. If this is the case, **your
small contribution can have a large impact** towards keeping Bitcoin
decentralized.

## Do You Validate Your Transactions? {#do-you-validate}

Some people confuse [supporting the network][bcc network support] with
helping to [protect Bitcoin's decentralization][bcc validation
decentralization].

To [improve your security][bcc validation protection] and help
protect decentralization, you must use a wallet that fully validates
received transactions. There are three ways to do that with Bitcoin
Core right now:

1. **Use the built-in wallet's graphical mode.** If you request payment
   using the following screen in Bitcoin Core, your received
   transactions will be fully validated.

    ![Bitcoin Core request payment](/img/bitcoin-core/unique-invoice.png?{{site.time | date: '%s'}})

2. **Use Bitcoin Core as a trusted peer for certain lightweight
   wallets.** Learn more on the [user interface][bcc user interface
   lightweight] page. If you use a secure connection to your personal
   trusted peer *every time* you use the wallet, your received
   transactions will be fully validated.

3. **Use the built-in wallet's CLI/API interface.** This is meant for
   power users, businesses, and programmers. The [user interface][bcc
   user interface] page provides an overview, the [installation
   instructions][bandwidth sharing guide] can help you get started, and
   the [RPC](https://developer.bitcoin.org/reference/rpc/)documentation can help you find specific
   commands. If you're using [`getnewaddress`](https://developer.bitcoin.org/reference/rpc/getnewaddress.html) to
   create receiving addresses, your received transactions will be fully
   validated.

If you have any questions, please ask on the [forums][bcc forums] or
[chatrooms][bcc live help].



<br class="clear big">
<div class="prevnext" markdown="block">
[PREV][bcc main]
[NEXT][bcc privacy]
</div>
<br class="clear">


<div class="not-displayed">
  <div id="bitcoin_banks" title="Bitcoin Banks" markdown="block">
  **Bitcoin banks and exchanges** are organizations that control your
  bitcoins on your behalf similar to the way traditional banks control
  your fiat deposits on your behalf.
  </div>

  <div id="spv_wallets" title="SPV Wallets" markdown="block">
  **Simplified Payment Verification (SPV)** wallets are lightweight
  wallets that can verify whether or not a transaction is part of a block
  without downloading the {{site.text.chain_gb}} GB block chain. However,
  they cannot verify whether or not the transaction is actually valid.
  (Only full validation nodes like Bitcoin Core can do that.)

  Honest miners who only create blocks with valid transactions currently
  receive a {{site.text.subsidy_in_decimal_bitcoins}} bitcoin subsidy.
  Dishonest miners who create blocks with invalid transactions don't
  receive that subsidy, but they might still attempt to trick SPV
  wallets if they can steal more bitcoins than they would make honestly (or
  steal any amount of bitcoins from people they don't like).
  </div>
</div>

{% include references.md %}
</div>
</div>
