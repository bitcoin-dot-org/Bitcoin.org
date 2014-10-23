## Block Chain

{% autocrossref %}

The block chain provides Bitcoin's public ledger, an ordered and timestamped record
of transactions. This system is used to protect against double spending
and modification of previous transaction records, using proof of
work verified by the peer-to-peer network to maintain a global consensus.

{% endautocrossref %}

### Block Chain Overview

{% autocrossref %}

![Block Chain Overview](/img/dev/en-blockchain-overview.svg)

The illustration above shows a simplified version of a block chain.
A [block][]{:#term-block}{:.term} of one or more new transactions 
is collected into the transaction data part of a block.
Copies of each transaction are hashed, and the hashes are then paired,
hashed, paired again, and hashed again until a single hash remains, the
[merkle root][]{:#term-merkle-root}{:.term} of a merkle tree.

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

Outputs are tied to [transaction identifiers (TXIDs)][txid]{:#term-txid}{:.term}, which are the hashes
of signed transactions.

Because each output of a particular transaction can only be spent once,
the outputs of all transactions included in the block chain can be categorized as either
[Unspent Transaction Outputs (UTXOs)][utxo]{:#term-utxo}{:.term} or spent transaction outputs. For a
payment to be valid, it must only use UTXOs as inputs.

Satoshis cannot be left in a UTXO after a transaction or they will be
irretrievably lost, so any difference between the number of satoshis in a
transaction's inputs and outputs is given as a [transaction fee][]{:#term-transaction-fee}{:.term} to 
the Bitcoin [miner][]{:#term-miner}{:.term} who creates the block containing that transaction. 
For example, in the illustration above, each transaction spends 10,000 satoshis
fewer than it receives from its combined inputs, effectively paying a 10,000
satoshi transaction fee.

{% endautocrossref %}

### Proof Of Work

{% autocrossref %}

The block chain is collaboratively maintained by anonymous peers on the network, so
Bitcoin requires that each block prove a significant amount of work was invested in
its creation to ensure that untrustworthy peers who want to modify past blocks have
to work harder than honest peers who only want to add new blocks to the
block chain.

Chaining blocks together makes it impossible to modify transactions included
in any block without modifying all following blocks. As a
result, the cost to modify a particular block increases with every new block
added to the block chain, magnifying the effect of the proof of work.

The [proof of work][]{:#term-proof-of-work}{:.term} used in Bitcoin
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
that a given hash attempt will generate a number below the [target][]{:#term-target}{:.term}
threshold.
Bitcoin assumes a linear probability that the lower it makes the target threshold, the more hash attempts (on average) will need to be tried.

New blocks will only be added to the block chain if their hash is at
least as challenging as a [difficulty][]{:#term-difficulty}{:.term} value expected by the consensus protocol.
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
could you reliably execute such a [51 percent attack][]{:#term-51-attack}{:.term} against
transaction history (although, it should be noted, that even less than 50% of the hashing power still has a good chance of performing such attacks).

The block header provides several easy-to-modify fields, such as a
dedicated nonce field, so obtaining new hashes doesn't require waiting
for new transactions. Also, only the 80-byte block header is hashed for
proof-of-work, so adding more bytes of transaction data to
a block does not slow down hashing with extra I/O.

{% endautocrossref %}

### Block Height And Forking

{% autocrossref %}

Any Bitcoin miner who successfully hashes a block header to a value
below the target threshold can add the entire block to the block chain
(assuming the block is otherwise valid).
These blocks are commonly addressed
by their [block height][]{:#term-block-height}{:.term}---the number of blocks between them and the first Bitcoin
block (block 0, most commonly known as the [genesis block]{:#term-genesis-block}{:.term}). For example,
block 2016 is where difficulty could have first been adjusted.

![Common And Uncommon Block Chain Forks](/img/dev/en-blockchain-fork.svg)

Multiple blocks can all have the same block height, as is common when
two or more miners each produce a block at roughly the same time. This
creates an apparent [fork][accidental fork]{:#term-accidental-fork}{:.term} in the block chain, as shown in the
illustration above.

When miners produce simultaneous blocks at the end of the block chain, each
node individually chooses which block to accept. In the absence of
other considerations, discussed below, nodes usually use the first
block they see.

Eventually a miner produces another block which attaches to only one of
the competing simultaneously-mined blocks. This makes that side of
the fork stronger than the other side.
Assuming a fork only contains valid
blocks, normal peers always follow the the most difficult chain
to recreate and throw away [stale blocks][stale block]{:#term-stale-block}{:.term} belonging to shorter forks.
(Stale blocks are also sometimes called orphans or orphan blocks, but
those terms are also used for blocks without a known parent block.)

[Long-term forks][long-term fork]{:#term-long-term-fork}{:.term} are possible if different miners work at cross-purposes,
such as some miners diligently working to extend the block chain at the
same time other miners are attempting a 51 percent attack to revise
transaction history.

Since multiple blocks can have the same height during a block chain fork, block
height should not be used as a globally unique identifier. Instead, blocks
are usually referenced by the hash of their header (often with the byte order reversed, and in hexadecimal).

{% endautocrossref %}

### Transaction Data

{% autocrossref %}

Every block must include one or more transactions. The first one of these
transactions must be a generation transaction, also called a generation transaction, which should collect and
spend the block reward (comprised of a block subsidy and any transaction fees paid by transactions included in this block).

The UTXO of a generation transaction has the special condition that
it cannot be spent (used as an input) for at least 100 blocks. This temporarily
prevents a miner from spending the transaction fees and block reward from a
block that may later be determined to be stale (and therefore the generation transaction destroyed) after a block chain fork.

Blocks are not required to include any non-generation transactions, but
miners almost always do include additional transactions in order to
collect their transaction fees.

All transactions, including the generation transaction, are encoded into
blocks in binary rawtransaction format.

The rawtransaction format is hashed to create the transaction
identifier (txid). From these txids, the [merkle tree][]{:#term-merkle-tree}{:.term} is constructed by pairing each
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
