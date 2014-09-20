## Block Chain

The following subsections briefly document core block details.

### Block Contents

{% autocrossref %}

This section describes [version 2 blocks][v2 block]{:#term-v2-block}{:.term}, which are any blocks with a
block height greater than 227,835. (Version 1 and version 2 blocks were
intermingled for some time before that point.) Future block versions may
break compatibility with the information in this section. You can determine
the version of any block by checking its `version` field using
bitcoind RPC calls.

As of version 2 blocks, each block consists of four root elements:

1. A [magic number][block header magic]{:#term-block-header-magic}{:.term} (0xd9b4bef9).

2. A 4-byte unsigned integer indicating how many bytes follow until the
   end of the block. Although this field would suggest maximum block
   sizes of 4 GiB, max block size is currently capped at 1 MiB and the
   default max block size (used by most miners) is 350 KiB (although
   this will likely increase over time).

3. An 80-byte block header described in the section below.

4. One or more transactions.

The first transaction in a block must be a [coinbase transaction][]{:#term-coinbase-tx}{:.term} which should collect and
spend any transaction fees paid by transactions included in this block.
All blocks with a block height less than 6,930,000 are entitled to
receive a [block reward][]{:#term-block-reward}{:.term} of newly created bitcoin value, which also
should be spent in the coinbase transaction. (The block reward started
at 50 bitcoins and is being halved every 210,000 blocks---approximately once every four years. As of
June 2014, it's 25 bitcoins.) A coinbase transaction is invalid if it 
tries to spend more value than is available from the transaction 
fees and block reward.

The coinbase transaction has the same basic format as any other
transaction, but it references a single non-existent UTXO and a special
[coinbase field][]{:#term-coinbase-field}{:.term} replaces the field that would normally hold a signature script and
secp256k1 signature. In version 2 blocks, the coinbase parameter must begin with
the current block's block height and may contain additional arbitrary
data or a script up to a maximum total of 100 bytes.

{% endautocrossref %}

### Block Header

{% autocrossref %}

The 80-byte block header contains the following six fields:

| Field             | Bytes  | Format                         |
|-------------------|--------|--------------------------------|
| 1. Version        | 4      | Unsigned Int                   |
| 2. hashPrevBlock  | 32     | Unsigned Int (SHA256 Hash)     |
| 3. hashMerkleRoot | 32     | Unsigned Int (SHA256 Hash)     |
| 4. Time           | 4      | Unsigned Int (Epoch Time)      |
| 5. Bits           | 4      | Internal Bitcoin Target Format |
| 6. Nonce          | 4      | (Arbitrary Data)               |

1. The *[block version][]{:#term-block-version}{:.term}* number indicates which set of block validation rules
   to follow so Bitcoin Core developers can add features or
   fix bugs. As of block height 227,836, all blocks use version number
   2.

2. The *hash of the previous block header* puts this block on the
   block chain and ensures no previous block can be changed without also
   changing this block's header.

3. The *Merkle root* is a hash derived from hashes of all the
   transactions included in this block. It ensures no transactions can
   be modified in this block without changing the block header hash.

4. The *[block time][]{:#term-block-time}{:.term}* is the approximate time when this block was created in
   Unix Epoch time format (number of seconds elapsed since
   1970-01-01T00:00 UTC). The time value must be greater than the
   median time of the previous 11 blocks. No peer will accept a block with a
   time currently more than two hours in the future according to the
   peer's clock.

5. *Bits* translates into the target threshold value---the maximum allowed
   value for this block's hash. The bits value must match the network
   difficulty at the time the block was mined.

6. The *[header nonce][]{:#term-header-nonce}{:.term}* is an arbitrary input that miners can change to test different
   hash values for the header until they find a hash value less than or
   equal to the target threshold. If all values within the nonce's four
   bytes are tested, the time can be updated or the
   coinbase transaction can be changed and the Merkle
   root updated.

{% endautocrossref %}
