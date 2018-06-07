{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/guides/mining.md" %}

## Mining
{% include helpers/subhead-links.md %}

{% autocrossref %}

Mining adds new blocks to the block chain, making transaction history
hard to modify.  Mining today takes on two forms:

* Solo mining, where the miner attempts to generate new blocks on his
  own, with the proceeds from the block reward and transaction fees
  going entirely to himself, allowing him to receive large payments with
  a higher variance (longer time between payments)

* Pooled mining, where the miner pools resources with other miners to
  find blocks more often, with the proceeds being shared among the pool
  miners in rough correlation to the amount of hashing power
  they each contributed, allowing the miner to receive small
  payments with a lower variance (shorter time between payments).

{% endautocrossref %}

### Solo Mining
{% include helpers/subhead-links.md %}

{% autocrossref %}

As illustrated below, solo miners typically use `bitcoind` to get new
transactions from the network. Their mining software periodically polls
`bitcoind` for new transactions using the `getblocktemplate` RPC, which
provides the list of new transactions plus the public key to which the
coinbase transaction should be sent.

![Solo Bitcoin Mining](/img/dev/en-solo-mining-overview.svg)

The mining software constructs a block using the template (described below) and creates a
block header. It then sends the 80-byte block header to its mining
hardware (an ASIC) along with a target threshold (difficulty setting).
The mining hardware iterates through every possible value for the block
header nonce and generates the corresponding hash.

If none of the hashes are below the threshold, the mining hardware gets
an updated block header with a new merkle root from the mining software;
this new block header is created by adding extra nonce data to the
coinbase field of the coinbase transaction.

On the other hand, if a hash is found below the target threshold, the
mining hardware returns the block header with the successful nonce to
the mining software. The mining software combines the header with the
block and sends the completed block to `bitcoind` to be broadcast to the network for addition to the
block chain.

{% endautocrossref %}

### Pool Mining
{% include helpers/subhead-links.md %}

{% autocrossref %}

Pool miners follow a similar workflow, illustrated below, which allows
mining pool operators to pay miners based on their share of the work
done. The mining pool gets new transactions from the network using
`bitcoind`. Using one of the methods discussed later, each miner's mining
software connects to the pool and requests the information it needs to
construct block headers.

![Pooled Bitcoin Mining](/img/dev/en-pooled-mining-overview.svg)

In pooled mining, the mining pool sets the target threshold a few orders
of magnitude higher (less difficult) than the network
difficulty. This causes the mining hardware to return many block headers
which don't hash to a value eligible for inclusion on the block chain
but which do hash below the pool's target, proving (on average) that the
miner checked a percentage of the possible hash values.

The miner then sends to the pool a copy of the information the pool
needs to validate that the header will hash below the target and that
the block of transactions referred to by the header merkle root field
is valid for the pool's purposes. (This usually means that the coinbase
transaction must pay the pool.)

The information the miner sends to the pool is called a share because it
proves the miner did a share of the work. By chance, some shares the
pool receives will also be below the network target---the mining pool
sends these to the network to be added to the block chain.

The block reward and transaction fees that come from mining that block
are paid to the mining pool. The mining pool pays out a portion of
these proceeds to individual miners based on how many shares they generated. For
example, if the mining pool's target threshold is 100 times lower than
the network target threshold, 100 shares will need to be generated on
average to create a successful block, so the mining pool can pay 1/100th
of its payout for each share received.  Different mining pools use
different reward distribution systems based on this basic share system.

{% endautocrossref %}

### Block Prototypes
{% include helpers/subhead-links.md %}

{% autocrossref %}

In both solo and pool mining, the mining software needs to get the
information necessary to construct block headers. This subsection
describes, in a linear way, how that information is transmitted and
used. However, in actual implementations, parallel threads and queuing
are used to keep ASIC hashers working at maximum capacity,

{% endautocrossref %}

#### getwork RPC
{% include helpers/subhead-links.md %}

{% autocrossref %}

The simplest and earliest method was the now-deprecated Bitcoin Core
`getwork` RPC, which constructs a header for the miner directly. Since a
header only contains a single 4-byte nonce good for about 4 gigahashes,
many modern miners need to make dozens or hundreds of `getwork` requests
a second. Solo miners may still use `getwork` on v0.9.5 or below, but most pools today
discourage or disallow its use.

{% endautocrossref %}

#### getblocktemplate RPC
{% include helpers/subhead-links.md %}

{% autocrossref %}

An improved method is the Bitcoin Core `getblocktemplate` RPC. This
provides the mining software with much more information:

1. The information necessary to construct a coinbase transaction
   paying the pool or the solo miner's `bitcoind` wallet.

2. A complete dump of the transactions `bitcoind` or the mining pool
   suggests including in the block, allowing the mining software to
   inspect the transactions, optionally add additional transactions, and
   optionally remove non-required transactions.

3. Other information necessary to construct a block header for the next
   block: the block version, previous block hash, and bits (target).

4. The mining pool's current target threshold for accepting shares. (For
   solo miners, this is the network target.)

Using the transactions received, the mining software adds a nonce to the
coinbase extra nonce field and then converts all the transactions into a
merkle tree to derive a merkle root it can use in a block header.
Whenever the extra nonce field needs to be changed, the mining software
rebuilds the necessary parts of the merkle tree and updates the time and
merkle root fields in the block header.

Like all `bitcoind` RPCs, `getblocktemplate` is sent over HTTP. To
ensure they get the most recent work, most miners use [HTTP longpoll][] to
leave a `getblocktemplate` request open at all times. This allows the
mining pool to push a new `getblocktemplate` to the miner as soon as any
miner on the peer-to-peer network publishes a new block or the pool
wants to send more transactions to the mining software.

{% endautocrossref %}

#### Stratum
{% include helpers/subhead-links.md %}

{% autocrossref %}

A widely used alternative to `getblocktemplate` is the [Stratum mining
protocol][]. Stratum focuses on giving miners the minimal information they
need to construct block headers on their own:

1. The information necessary to construct a coinbase transaction
   paying the pool.

2. The parts of the merkle tree which need to be re-hashed to
   create a new merkle root when the coinbase transaction is
   updated with a new extra nonce. The other parts of the merkle
   tree, if any, are not sent, effectively limiting the amount of data which needs
   to be sent to (at most) about a kilobyte at current transaction
   volume.

3. All of the other non-merkle root information necessary to construct a
   block header for the next block.

4. The mining pool's current target threshold for accepting shares.

Using the coinbase transaction received, the mining software adds a
nonce to the coinbase extra nonce field, hashes the coinbase
transaction, and adds the hash to the received parts of the merkle tree.
The tree is hashed as necessary to create a merkle root, which is added
to the block header information received. Whenever the extra nonce field
needs to be changed, the mining software updates and re-hashes the
coinbase transaction, rebuilds the merkle root, and updates the header
merkle root field.

Unlike `getblocktemplate`, miners using Stratum cannot inspect or add
transactions to the block they're currently mining. Also unlike
`getblocktemplate`, the Stratum protocol uses a two-way TCP socket directly,
so miners don't need to use HTTP longpoll to ensure they receive
immediate updates from mining pools when a new block is broadcast to the
peer-to-peer network.

<!-- SOMEDAY: describe p2pool -->

**Resources:** The GPLv3 [BFGMiner][] mining software and AGPLv3
[Eloipool][] mining pool software are widely-used among miners and
pools. The [libblkmaker][] C library and [python-blkmaker][] library,
both MIT licensed, can interpret GetBlockTemplate for your programs.

{% endautocrossref %}
