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
   sizes of 4 GiB, max block size is currently capped at 1 MB and the
   default max block size (used by most miners) is 750 KB (although
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

### Hash Endianness

Bitcoin generally displays and transmits hashes with a little-endian
byte order rather than the big-endian byte order commonly used in other
network<!--noref--> software. For block header hashes, this is easy to
illustrate because the least significant bits are all zeros:

* **Little endian:** 0x0000 0000 3e5c ec96 3682 2919 dfcc 702d 4a6c 9ae7 2765
0edb be26 bcec dc8e 1abd

* **Big endian:** 0xbd1a 8edc ecbc 26be db0e 6527 e79a 6c4a 2d70 ccdf 1929 8236
96ec 5c3e 0000 0000

This can create some confusion as the double SHA256(SHA256()) hashing
commonly used in Bitcoin sends the output from the first hash function
to the second hash function in big-endian byte order. After hashing is
complete, the byte order of the final hash is reversed.  For example:

* **SHA256(0x00); big endian output:** 0x6e34 0b9c ffb3 7a98
9ca5 44e6 bb78 0a2c 7890 1d3f b337 3876 8511 a306 17af a01d

* **SHA256(0x6e34...); big endian output:** 0x1406
e058 81e2 9936 7766 d313 e26c 0556 4ec9 1bf7 21d3 1726 bd6e 46e6 0689 539a

* **Reverse byte order of 0x1406...:**
0x9a53 8906 e646 6ebd 2617 d321 f71b c94e 5605 6ce2 13d3 6677 3699 e281 58e0
0614

The code below may help you check endianness by generating header hashes
or txids from raw hex.
{% endautocrossref %}

{% highlight python %}
#!/usr/bin/env python

from sys import byteorder
from hashlib import sha256

## You can put in $data an 80-byte block header to get its header hash,
## or a raw transaction to get its txid
data = "00".decode("hex")
hash = sha256(sha256(data).digest()).digest()

print "Warning: this code only tested on little-endian x86_64 system"
print
print "System byte order:", byteorder
print "Generated Big Endian Hash:    ", hash.encode('hex_codec')
print "Generated Little-Endian Hash: ", hash[::-1].encode('hex_codec')
print "0x00 Little-Endian Hash:      ", \
  "9a538906e6466ebd2617d321f71bc94e56056ce213d366773699e28158e00614"
{% endhighlight %}
