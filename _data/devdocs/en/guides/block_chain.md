{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/guides/block_chain.md" %}

## Block Chain
{% include helpers/subhead-links.md %}

{% autocrossref %}

The block chain provides Bitcoin's public ledger, an ordered and timestamped record
of transactions. This system is used to protect against double spending
and modification of previous transaction records.

Each full node in the Bitcoin network independently stores a block chain
containing only blocks validated by that node. When several nodes all
have the same blocks in their block chain, they are considered to be in
[consensus][/en/glossary/consensus]{:#term-consensus}{:.term}. The validation rules these
nodes follow to maintain consensus are called [consensus
rules][/en/glossary/consensus-rules]{:#term-consensus-rules}{:.term}. This section describes many of
the consensus rules used by Bitcoin Core.

{% endautocrossref %}

### Block Chain Overview
{% include helpers/subhead-links.md %}

{% autocrossref %}

![Block Chain Overview](/img/dev/en-blockchain-overview.svg)

The illustration above shows a simplified version of a block chain.
A [block][/en/glossary/block]{:#term-block}{:.term} of one or more new transactions
is collected into the transaction data part of a block.
Copies of each transaction are hashed, and the hashes are then paired,
hashed, paired again, and hashed again until a single hash remains, the
[merkle root][/en/glossary/merkle-root]{:#term-merkle-root}{:.term} of a merkle tree.

The merkle root is stored in the block header. Each block also
stores the hash of the previous block's header, chaining the blocks
together. This ensures a transaction cannot be modified without
modifying the block that records it and all following blocks.

Transactions are also chained together. Bitcoin wallet software gives
the impression that satoshis are sent from and to wallets, but
bitcoins really move from transaction to transaction. Each
transaction spends the satoshis previously received in one or more earlier
transactions, so the input of one transaction is the output of a
previous transaction.

![Transaction Propagation](/img/dev/en-transaction-propagation.svg)

A single transaction can create multiple outputs, as would be
the case when sending to multiple addresses, but each output of
a particular transaction can only be used as an input once in the
block chain. Any subsequent reference is a forbidden double
spend---an attempt to spend the same satoshis twice.

Outputs are tied to [transaction identifiers (TXIDs)][/en/glossary/txid]{:#term-txid}{:.term}, which are the hashes
of signed transactions.

Because each output of a particular transaction can only be spent once,
the outputs of all transactions included in the block chain can be categorized as either
[Unspent Transaction Outputs (UTXOs)][/en/glossary/unspent-transaction-output]{:#term-utxo}{:.term} or spent transaction outputs. For a
payment to be valid, it must only use UTXOs as inputs.

Ignoring coinbase transactions (described later), if the value of a
transaction's outputs exceed its inputs, the transaction will be
rejected---but if the inputs exceed the value of the outputs, any
difference in value may be claimed as a [transaction
fee][/en/glossary/transaction-fee]{:#term-transaction-fee}{:.term} by the Bitcoin
[miner][/en/glossary/mining]{:#term-miner}{:.term} who creates the block containing that
transaction.
For example, in the illustration above, each transaction spends 10,000 satoshis
fewer than it receives from its combined inputs, effectively paying a 10,000
satoshi transaction fee.

{% endautocrossref %}

### Proof Of Work
{% include helpers/subhead-links.md %}

{% autocrossref %}

The block chain is collaboratively maintained by anonymous peers on the network, so
Bitcoin requires that each block prove a significant amount of work was invested in
its creation to ensure that untrustworthy peers who want to modify past blocks have
to work harder than honest peers who only want to add new blocks to the
block chain.

Chaining blocks together makes it impossible to modify transactions included
in any block without modifying all subsequent blocks. As a
result, the cost to modify a particular block increases with every new block
added to the block chain, magnifying the effect of the proof of work.

The [proof of work][/en/glossary/proof-of-work]{:#term-proof-of-work}{:.term} used in Bitcoin
takes advantage of the apparently random nature of cryptographic hashes.
A good cryptographic hash algorithm converts arbitrary data into a
seemingly-random number. If the data is modified in any way and
the hash re-run, a new seemingly-random number is produced, so there is
no way to modify the data to make the hash number predictable.

To prove you did some extra work to create a block, you must create a
hash of the block header which does not exceed a certain value. For
example, if the maximum possible hash value is <span
class="math">2<sup>256</sup> − 1</span>, you can prove that you
tried up to two combinations by producing a hash value less than <span
class="math">2<sup>255</sup></span>.

In the example given above, you will produce a successful hash on average every other try.
You can even estimate the probability
that a given hash attempt will generate a number below the [target][/en/glossary/nbits]{:#term-target}{:.term}
threshold.
Bitcoin assumes a linear probability that the lower it makes the target threshold, the more hash attempts (on average) will need to be tried.

New blocks will only be added to the block chain if their hash is at
least as challenging as a [difficulty][/en/glossary/difficulty]{:#term-difficulty}{:.term} value expected by the consensus protocol.
Every 2,016 blocks, the network uses timestamps stored in each
block header to calculate the number of seconds elapsed between generation
of the first and last of those last 2,016 blocks. The ideal value is
1,209,600 seconds (two weeks).

* If it took fewer than two weeks to generate the 2,016 blocks,
  the expected difficulty value is increased proportionally (by as much
  as 300%) so that the next 2,016 blocks should take exactly two weeks
  to generate if hashes are checked at the same rate.

* If it took more than two weeks to generate the blocks, the expected
  difficulty value is decreased proportionally (by as much as 75%) for
  the same reason.

(Note: an off-by-one error in the Bitcoin Core implementation causes the
difficulty to be updated every 2,01*6* blocks using timestamps from only
2,01*5* blocks, creating a slight skew.)

Because each block header must hash to a value below the target
threshold, and because each block is linked to the block that
preceded it, it requires (on average) as much hashing power to
propagate a modified block as the entire Bitcoin network expended
between the time the original block was created and the present time.
Only if you acquired a majority of the network's hashing power
could you reliably execute such a [51 percent attack][/en/glossary/51-percent-attack]{:#term-51-attack}{:.term} against
transaction history (although, it should be noted, that even less than 50% of the hashing power still has a good chance of performing such attacks).

The block header provides several easy-to-modify fields, such as a
dedicated nonce field, so obtaining new hashes doesn't require waiting
for new transactions. Also, only the 80-byte block header is hashed for
proof-of-work, so including a large volume of transaction data in
a block does not slow down hashing with extra I/O, and adding additional
transaction data only requires the recalculation of the ancestor hashes in
the merkle tree.

{% endautocrossref %}

### Block Height And Forking
{% include helpers/subhead-links.md %}

{% autocrossref %}

Any Bitcoin miner who successfully hashes a block header to a value
below the target threshold can add the entire block to the block chain
(assuming the block is otherwise valid).
These blocks are commonly addressed
by their [block height][/en/glossary/block-height]{:#term-block-height}{:.term}---the number of blocks between them and the first Bitcoin
block (block 0, most commonly known as the [genesis block][/en/glossary/genesis-block]{:#term-genesis-block}{:.term}). For example,
block 2016 is where difficulty could have first been adjusted.

![Common And Uncommon Block Chain Forks](/img/dev/en-blockchain-fork.svg)

Multiple blocks can all have the same block height, as is common when
two or more miners each produce a block at roughly the same time. This
creates an apparent [fork][/en/glossary/fork]{:#term-fork}{:.term} in the block chain, as shown in the
illustration above.

When miners produce simultaneous blocks at the end of the block chain, each
node individually chooses which block to accept. In the absence of
other considerations, discussed below, nodes usually use the first
block they see.

Eventually a miner produces another block which attaches to only one of
the competing simultaneously-mined blocks. This makes that side of
the fork stronger than the other side.
Assuming a fork only contains valid
blocks, normal peers always follow the most difficult chain
to recreate and throw away [stale blocks][/en/glossary/stale-block]{:#term-stale-block}{:.term} belonging to shorter forks.
(Stale blocks are also sometimes called orphans or orphan blocks<!--noref-->, but
those terms are also used for true orphan blocks without a known parent block.)

Long-term forks are possible if different miners work at cross-purposes,
such as some miners diligently working to extend the block chain at the
same time other miners are attempting a 51 percent attack to revise
transaction history.

Since multiple blocks can have the same height during a block chain fork, block
height should not be used as a globally unique identifier. Instead, blocks
are usually referenced by the hash of their header (often with the byte order reversed, and in hexadecimal).

{% endautocrossref %}

### Transaction Data
{% include helpers/subhead-links.md %}

{% autocrossref %}

Every block must include one or more transactions. The first one of these
transactions must be a coinbase transaction, also called a generation transaction, which should collect and
spend the block reward (comprised of a block subsidy and any transaction fees paid by transactions included in this block).

The UTXO of a coinbase transaction has the special condition that
it cannot be spent (used as an input) for at least 100 blocks. This temporarily
prevents a miner from spending the transaction fees and block reward from a
block that may later be determined to be stale (and therefore the coinbase transaction destroyed) after a block chain fork.

Blocks are not required to include any non-coinbase transactions, but
miners almost always do include additional transactions in order to
collect their transaction fees.

All transactions, including the coinbase transaction, are encoded into
blocks in binary rawtransaction format.

The rawtransaction format is hashed to create the transaction
identifier (txid). From these txids, the [merkle tree][/en/glossary/merkle-tree]{:#term-merkle-tree}{:.term} is constructed by pairing each
txid with one other txid and then hashing them together. If there are
an odd number of txids, the txid without a partner is hashed with a
copy of itself.

The resulting hashes themselves are each paired with one other hash and
hashed together. Any hash without a partner is hashed with itself. The
process repeats until only one hash remains, the merkle root.

For example, if transactions were merely joined (not hashed), a
five-transaction merkle tree would look like the following text diagram:

{% endautocrossref %}

~~~
       ABCDEEEE .......Merkle root
      /        \
   ABCD        EEEE
  /    \      /
 AB    CD    EE .......E is paired with itself
/  \  /  \  /
A  B  C  D  E .........Transactions
~~~

{% autocrossref %}

As discussed in the Simplified Payment Verification (SPV) subsection,
the merkle tree allows clients to verify for
themselves that a transaction was included in a block by obtaining the
merkle root from a block header and a list of the intermediate hashes
from a full peer. The full peer does not need to be trusted: it is
expensive to fake block headers and the intermediate hashes cannot be faked or
the verification will fail.

For example, to verify transaction D was added to the
block, an SPV client only needs a copy of the C, AB, and EEEE hashes in addition to the
merkle root; the client doesn't need to know anything about any of the
other transactions. If the five transactions in this block were all at
the maximum size, downloading the entire block would require over
500,000 bytes---but downloading three hashes plus the block header
requires only 140 bytes.

Note: If identical txids are found within the same block, there is a possibility that the merkle tree may collide with a block with some or all duplicates removed due to how unbalanced merkle trees are implemented (duplicating the lone hash).
Since it is impractical to have separate transactions with identical txids, this does not impose a burden on honest software, but must be checked if the invalid status of a block is to be cached;
otherwise, a valid block with the duplicates eliminated could have the same merkle root and block hash, but be rejected by the cached invalid outcome, resulting in security bugs such as CVE-2012-2459.

{% endautocrossref %}

### Consensus Rule Changes
{% include helpers/subhead-links.md %}

{% autocrossref %}

To maintain consensus, all full nodes validate blocks using the same
consensus rules. However, sometimes the consensus rules are changed to
introduce new features or prevent network abuse. When the new rules are
implemented, there will likely be a period of time when non-upgraded
nodes follow the old rules and upgraded nodes follow the new rules,
creating two possible ways consensus can break:

1. A block following the new consensus rules is accepted by upgraded
   nodes but rejected by non-upgraded nodes. For example, a new
   transaction feature is used within a block: upgraded nodes understand
   the feature and accept it, but non-upgraded nodes reject it because
   it violates the old rules.

2. A block violating the new consensus rules is rejected by upgraded
   nodes but accepted by non-upgraded nodes. For example, an abusive
   transaction feature is used within a block: upgraded nodes reject it
   because it violates the new rules, but non-upgraded nodes accept it
   because it follows the old rules.

In the first case, rejection by non-upgraded nodes, mining software
which gets block chain data from those non-upgraded nodes refuses to
build on the same chain as mining software getting data from upgraded
nodes. This creates permanently divergent chains---one for non-upgraded
nodes and one for upgraded nodes---called a [hard
fork][/en/glossary/hard-fork]{:#term-hard-fork}{:.term}.

![Hard Fork](/img/dev/en-hard-fork.svg)

In the second case, rejection by upgraded nodes, it's possible to keep
the block chain from permanently diverging if upgraded nodes control a
majority of the hash rate. That's because, in this case, non-upgraded
nodes will accept as valid all the same blocks as upgraded nodes, so the
upgraded nodes can build a stronger chain that the non-upgraded nodes
will accept as the best valid block chain. This is called a [soft
fork][/en/glossary/soft-fork]{:#term-soft-fork}{:.term}.

![Soft Fork](/img/dev/en-soft-fork.svg)

Although a fork is an actual divergence in block chains, changes to the
consensus rules are often described by their potential to create either
a hard or soft fork. For example, "increasing the block size above 1 MB
requires a hard fork." In this example, an actual block chain fork is
not required---but it is a possible outcome.

Consensus rule changes may be activated in various ways. During Bitcoin's 
first two years, Satoshi Nakamoto performed several soft forks by just 
releasing the backwards-compatible change in a client that began immediately 
enforcing the new rule. Multiple soft forks such as BIP30 have
been activated via a flag day where the new rule began to be enforced at a 
preset time or block height. Such forks activated via a flag day are known as
[User Activated Soft Forks][/en/glossary/uasf]{:#term-uasf}{:.term} (UASF) as
they are dependent on having sufficient users (nodes) to enforce the new rules
after the flag day.

Later soft forks waited for a majority of hash rate (typically 75% or 95%) 
to signal their readiness for enforcing the new consensus rules. Once the signalling
threshold has been passed, all nodes will begin enforcing the new rules. Such
forks are known as [Miner Activated Soft Forks][/en/glossary/masf]{:#term-masf}{:.term} (MASF)
as they are dependent on miners for activation.

**Resources:** [BIP16][], [BIP30][], and [BIP34][] were implemented as
changes which might have lead to soft forks. [BIP50][] describes both an
accidental hard fork, resolved by temporary downgrading the capabilities
of upgraded nodes, and an intentional hard fork when the temporary
downgrade was removed. A document from Gavin Andresen outlines [how
future rule changes may be
implemented](https://gist.github.com/gavinandresen/2355445).

{% endautocrossref %}

#### Detecting Forks
{% include helpers/subhead-links.md %}

{% autocrossref %}

Non-upgraded nodes may use and distribute incorrect information during
both types of forks, creating several situations which could lead to
financial loss. In particular, non-upgraded nodes may relay and accept
transactions that are considered invalid by upgraded nodes and so will
never become part of the universally-recognized best block chain.
Non-upgraded nodes may also refuse to relay blocks or transactions which
have already been added to the best block chain, or soon will be, and so
provide incomplete information.

<!-- paragraph below based on src/main.cpp CheckForkWarningConditions() -->

Bitcoin Core includes code that detects a hard fork by looking at block
chain proof of work. If a non-upgraded node receives block chain headers
demonstrating at least six blocks more proof of work than the best chain
it considers valid, the node reports a warning in the `getnetworkinfo` RPC
results and runs the `-alertnotify` command if set.  This warns the
operator that the non-upgraded node can't switch to what is likely the
best block chain.

Full nodes can also check block and transaction version numbers. If the
block or transaction version numbers seen in several recent blocks are
higher than the version numbers the node uses, it can assume it doesn't
use the current consensus rules. Bitcoin Core reports this situation 
through the `getnetworkinfo` RPC and `-alertnotify` command if set.

In either case, block and transaction data should not be relied upon 
if it comes from a node that apparently isn't using the current 
consensus rules.

SPV clients which connect to full nodes can detect a likely hard fork by
connecting to several full nodes and ensuring that they're all on the
same chain with the same block height, plus or minus several blocks to
account for transmission delays and stale blocks.  If there's a
divergence, the client can disconnect from nodes with weaker chains.

SPV clients should also monitor for block and transaction version number
increases to ensure they process received transactions and create new
transactions using the current consensus rules.

{% endautocrossref %}
