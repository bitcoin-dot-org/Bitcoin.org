---
## This file is licensed under the MIT License (MIT) available on
## http://opensource.org/licenses/MIT.

title: "Potential network disruption"
shorturl: "potential-split"
active: true
banner: "Warning: potential network disruption starting July 31st"

## 7/12 to 7/28: "warning" (orange); 7/29 until resolution: "alert" (red)
bannerclass: "warning"
---
{% assign start='<span class="date">2017/08/01 00:00 UTC</span>' %}

*Last updated: <span class="date">2017/07/13 18:47 UTC</span>.  This
page will be updated when new information becomes available.  See the
[list of updates][].*

## Chain split

Since Bitcoin's inception, its network has facilitated hundreds of millions of
transactions.  As a result, different groups of people (developers, investors,
entrepreneurs, etc.), have debated on the best ways Bitcoin can be optimized to
allow it to exponentially scale even further.  In recent months, alternative
software has been released that represents some of the interests of the
aforementioned groups of people - software that is scheduled to go live toward
the end of July.

The Bitcoin block chain, which is a record of all Bitcoin transactions to date,
relies on a network of thousands of Bitcoin nodes running Bitcoin software. On
{{start}}, the Bitcoin block chain may experience what is known as a chain
split.  This is when a portion of Bitcoin's nodes run software that another
portion of nodes are not fully compatible with.  As a result, some nodes may
propagate confirmed transactions that other nodes may not accept or recognize.
This may result in unreliable [confirmation scoring][] for an unknown length of
time.  This means that any bitcoins you receive during this period could
disappear from your wallet or be a type of bitcoin that other people will not
accept as payment, until the situation is resolved.

Once the situation is resolved, confirmation scoring will either automatically
return to their normal reliability or there will be two (or more) competing
versions of Bitcoin as a result of a split block chain.  In the former case, you
may return to using Bitcoin normally; in the latter case, you will need to take
extra steps in order to begin safely receiving bitcoins again.

This post currently describes what actions you can take to prepare for
this situation.  Subsequent to {{start}}, we will update this post as
best we can with relevant information, but you are also advised to
monitor other Bitcoin [news sites][] and [community resources][] for
updates and to cross-check all information, as someone may attempt to
spread false news in order to exploit the situation.

Remember that you alone are responsible for the safety of your bitcoins,
and that if you lose control of them for any reason, there is nothing
the operators or contributors to this website can do to help you.

*Note:* there is a chance a milder level of disruption could start
between now and {{start}}.  If that is the case, this post will be
updated with details.

## Preparation

1. If you accept bitcoins as payments, we recommend that you stop
accepting Bitcoin payments at least 12 hours before {{start}}, although
24 to 48 hours earlier may be safer.  This will give time for all
pending payments to confirm on the Bitcoin block chain before the event.

1. If you send bitcoins as payments, note that many services may stop
accepting bitcoins at {{start}} or earlier.

1. Be wary of storing your bitcoins on an exchange or any service that
doesn't allow you to make a local backup copy of your private keys.  If
they accept transactions during the event, they could lose money and
will likely spread those losses across all their users.  If there end up
being two or more competing versions of Bitcoin, then they may refuse to
give you your bitcoins on versions they don't like.

1. Bitcoin may experience significant price fluctuations in relation to
other currencies.  Learn more about [price volatility][] and ensure you
aren't holding more bitcoin than you can afford to lose.

## During the event

1. Do not trust any payments you receive after {{start}} until the situation
is resolved.  No matter how many confirmations the new payment says it
has, it can disappear from your wallet at any point up until the
situation is resolved.

1. Try not to send any payments.  During the event there may be two or
more different types of bitcoin and you may send all of the different
types to a recipient who only expects one type.  This would benefit the
recipient at your expense.

1. Be wary of offers to allow you to invest in the outcome of the event
by "splitting" your coins.  Some of these offers may be scams, and
software claiming to split your coins can also steal them.

## After the event

We will update this section with more information after {{start}}.  Please
monitor this page accordingly and wait until multiple news sources that you
trust have stated that the event is resolved before returning to normal Bitcoin
use.

### Using a specific chain

In the event that there are multiple chains, you will need to tell your wallet
software which chain you wish to use. Below are instructions for some wallet
software for selecting the chain that you wish to use. If you wish to transact
on multiple chains, you will need to maintain separate wallets and wallet software
instances.

Below are instructions for various wallets on how to use a specific chain with
that wallet.

#### Bitcoin Core

Bitcoin Core and any software based upon it has the capability to reject otherwise-valid
blocks and reconsider previously rejected blocks. You can use the `invalidateblock` RPC
command to reject the blocks of the chains you do not wish to follow. This will
make your wallet software follow the chain that you want it to follow. However this
could result in your node becoming separated from the nodes that are following the
chain that you wish to follow. In that case, you will need to add `addnode` options
to your `bitcoin.conf` file so that your node will connect to other nodes following
the same chain.

This post will be updated with the necessary commands, block hashes, and `bitcoin.conf`
options in the event of a chain split.

### Splitting your coins

In the event that thre are multiple chains, you may wish to be able to transact on
multiple chains. However there is the risk that a transaction you make on one chain
also confirms on another chain thereby resulting in you having spent coins on a
chain which you did not want to spend coins on. The process of separating your coins
is also known as tainting.

The easiest method by which to taint your coins is to make use of the locktime
feature of Bitcoin transactions. In the event that there are multiple block chains,
these chains will likely be at different block heights. By creating a transaction
which has a lock time of the block height of the longest chain, you will be making
a transaction which is invalid on the other block chains. Once that transaction confirms,
you can create a transaction that spends the same coins and has a locktime of the
block height of the second longest chain. Since this spends coins already spent on
the longest chain, the transaction will be invalid there; with a locktime of
the block height of the second longest chain, the transaction will be invalid on
any of the shorter chains. Repeat this method on all chains. Once all of the transactions
have confirmed on their respective chains, you can now safely spend from them and
not risk having your transactions replayed onto other chains.

Note: this method only works if you pay a sufficient transaction fee for your
transaction to be confirmed in the next block and if the next longest chain
is several blocks behind the chain that you are currently tainting for.

The exact steps are as follows:

1. Make a transaction that has a locktime of the block height of the longest block chain.
2. Wait for the transaction to confirm.
3. Once the transaction has confirmed, make another transaction which spends the same
inputs as the previous transaction and has a locktime of the next longest block chain.
4. Repeat for each chain that you wish to transact on.

Below are instructions with how to taint your coins with a that wallet. These will
require that you have multiple instances of that wallet and have already set it
to use the chain that you wish to transact on by following the earlier instructions.

#### Bitcoin Core

Bitcoin Core already automatically sets a locktime on all of your sending transactions.
Thus you will be able to easily split your coins with Bitcoin Core as the locktime
will already be set. However Bitcoin Core does randomly choose to set a locktime up
to 100 blocks prior to the current block height of the chain it is following, so
you can only take advantage of this automatic feature if the next longest block chain
is at least 100 blocks behind the longest blockchain.

To use the automatic locktime set by Bitcoin Core, simply use the instance of Bitcoin
Core which is following the longest blockchain and create a transaction which sends all
of your coins to an address in the same wallet. Be sure to include a sufficient
transaction fee. Once the transaction has confirmed, go to the wallet with the next
longest blockchain and do the same thing; send all of the Bitcoin in your wallet
to an address that is also in your wallet. Repeat this for all chains that you
wish to split your coins on. Once all of the transactions have confirmed on their
respective chains, your coins are split and can be spent safely from your wallet
as normal.

If the next longest blockchain is less than 100 blocks behind the longest blockchain,
then you will need to use the RPC commands to create a transaction and send it.
The following are the commands that you will need to use:

    getblockcount
    getbalance
    createrawtransaction '[]' '{"<address>":<amount>}' <block height>
    fundrawtransaction <create raw hex> '{"subtractFeeFromOutputs:[0]"}'
    signrawtransaction <fund raw hex>
    sendrawtransaction <sign raw hex>

where `<address>` is an address from your wallet that you will be sending to.
`<amount>` is the amount of Bitcoin you are sending to `<address>`, and this
should be your entire wallet balance which is given by the `getbalance` command.
`<block height>` is the current block height which is given by the `getblockcount`
command. `<create raw hex>` is the output of the previous `createrawtransaction`.
`<fund raw hex>` is the string from the `hex` field of the output of `fundrawtransaction`.
`<sign raw hex>` is the string from the `hex` field of the output of `signrawtransaction`.
The transaction fee for this transaction will be deducted from `<amount>`.

## Document history

**Note:** The information contained herein is not to be construed as an official
statement by Bitcoin Core. Bitcoin.org and Bitcoin Core open source projects are
run by separate teams.

A [full history][] of this document is available.  The following points
summarize major changes, with the most recent changes being listed
first.

- <span class="date">2017/07/13 18:47 UTC</span>: Information for chain and coin splitting with Core.
- <span class="date">2017/07/13 11:21 UTC</span>: add general info about split.
- <span class="date">2017/07/12 12:00 UTC</span>: initial version.

[full history]: https://github.com/bitcoin-dot-org/bitcoin.org/commits/master/_alerts/2017-07-12-potential-split.md
[list of updates]: #document-history
[news sites]: /en/resources#news
[community resources]: /en/community
[confirmation scoring]: /en/you-need-to-know#instant
[price volatility]: /en/you-need-to-know#volatile

<script src="/js/jquery/jquery-1.11.2.min.js"></script>
<script>
// Localize dates
$(".date").each(function() {
  // Try to parse the string as a date
  epoch = Date.parse($(this).text());
  // Only convert the string to localtime if it's a number
  if (isNaN(epoch) == false) {
    var utcdate=new Date(epoch);
    var localedate = utcdate.toString();
    $(this).text(localedate);
  }
});
</script>
