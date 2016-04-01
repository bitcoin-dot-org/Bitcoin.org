{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/ref_p2p_networking.md" %}

## P2P Network
{% include helpers/subhead-links.md %}

{% autocrossref %}

This section describes the Bitcoin P2P network protocol (but it is [not a
specification][]). It does not describe the discontinued direct [IP-to-IP
payment protocol][], the [BIP70 payment protocol][/en/glossary/payment-protocol], the
[GetBlockTemplate mining protocol][section getblocktemplate], or any
network protocol never implemented in an official version of Bitcoin Core.

All peer-to-peer communication occurs entirely over TCP.

**Note:** unless their description says otherwise, all multi-byte
integers mentioned in this section are transmitted in little-endian order.

{% endautocrossref %}

### Constants And Defaults
{% include helpers/subhead-links.md %}

{% autocrossref %}

The following constants and defaults are taken from Bitcoin Core's
[chainparams.cpp][core chainparams.cpp] source code file. 

| Network | Default Port | [Start String][/en/glossary/start-string]{:#term-start-string}{:.term} | Max nBits
|---------|--------------|-----------------------------------------------|---------------
| Mainnet | 8333         | 0xf9beb4d9                                    | 0x1d00ffff
| Testnet | 18333        | 0x0b110907                                    | 0x1d00ffff
| Regtest | 18444        | 0xfabfb5da                                    | 0x207fffff

Note: the testnet start string and nBits above are for testnet3; the
original testnet used a different string and higher (less difficult)
nBits.

Command line parameters can change what port a node listens on (see
`-help`). Start strings are hardcoded constants that appear at the start
of all messages sent on the Bitcoin network; they may also appear in
data files such as Bitcoin Core's block database.  The nBits displayed
above are in big-endian order; they're sent over the network in
little-endian order.

Bitcoin Core's [chainparams.cpp][core chainparams.cpp] also includes
other constants useful to programs, such as the hash of the genesis
blocks for the different networks as well as the alert keys for mainnet
and testnet.

{% endautocrossref %}

### Protocol Versions
{% include helpers/subhead-links.md %}

{% autocrossref %}

The table below lists some notable versions of the P2P network protocol,
with the most recent versions listed first. (If you know of a protocol
version that implemented a major change but which is not listed here,
please [open an issue][docs issue].)

As of Bitcoin Core 0.12.0, the most recent protocol version is 70012.

| Version | Initial Release                    | Major Changes
|---------|------------------------------------|--------------
| 70012   | Bitcoin Core 0.12.0 <br>  | [BIP130][]: <br>• Added `sendheaders` message
| 70002   | Bitcoin Core 0.9.0 <br>(Mar 2014)  | • Send multiple `inv` messages in response to a `mempool` message if necessary <br><br>[BIP61][]: <br>• Added `reject` message
| 70001   | Bitcoin Core 0.8.0 <br>(Feb 2013)  | • Added `notfound` message. <br><br>[BIP37][]: <br>• Added `filterload` message. <br>• Added `filteradd` message. <br>• Added `filterclear` message. <br>• Added `merkleblock` message. <br>• Added relay field to `version` message <br>• Added `MSG_FILTERED_BLOCK` inventory type to `getdata` message.
| 60002   | Bitcoin Core 0.7.0 <br>(Sep 2012)  | [BIP35][]: <br>• Added `mempool` message. <br>• Extended `getdata` message to allow download of memory pool transactions
| 60001   | Bitcoin Core 0.6.1 <br>(May 2012)  | [BIP31][]: <br>• Added nonce field to `ping` message <br>• Added `pong` message
| 60000   | Bitcoin Core 0.6.0 <br>(Mar 2012)  | [BIP14][]: <br>• Separated protocol version from Bitcoin Core version
| 31800   | Bitcoin Core 0.3.18 <br>(Dec 2010) | • Added `getheaders` message and `headers` message.
| 31402   | Bitcoin Core 0.3.15 <br>(Oct 2010) | • Added time field to `addr` message.
| 311     | Bitcoin Core 0.3.11 <br>(Aug 2010) | • Added `alert` message.
| 209     | Bitcoin Core 0.2.9 <br>(May 2010)  | • Added checksum field to message headers.
| 106     | Bitcoin Core 0.1.6 <br>(Oct 2009)  | • Added receive IP address fields to `version` message.

{% endautocrossref %}

### Message Headers
{% include helpers/subhead-links.md %}

{% autocrossref %}

All messages in the network protocol use the same container format,
which provides a required multi-field message header and an optional payload.
The message header format is:

| Bytes | Name         | Data Type | Description
|-------|--------------|-----------|-------------
| 4     | start string | char[4]   | Magic bytes indicating the originating network; used to seek to next message when stream state is unknown.
| 12    | command name | char[12]  | ASCII string which identifies what message type is contained in the payload.  Followed by nulls (0x00) to pad out byte count; for example: `version\0\0\0\0\0`.
| 4     | payload size | uint32_t  | Number of bytes in payload.  The current maximum number of bytes ([`MAX_SIZE`][max_size]) allowed in the payload by Bitcoin Core is 32 MiB---messages with a payload size larger than this will be dropped or rejected.
| 4     | checksum     | char[4]   | *Added in protocol version 209.* <br><br>First 4 bytes of SHA256(SHA256(payload)) in internal byte order.<br /><br /> If payload is empty, as in `verack` and `getaddr` messages, the checksum is always 0x5df6e0e2 (SHA256(SHA256(\<empty string>))).

The following example is an annotated hex dump of a mainnet message
header from a `verack` message which has no payload.

{% highlight text %}
f9beb4d9 ................... Start string: Mainnet
76657261636b000000000000 ... Command name: verack + null padding
00000000 ................... Byte count: 0
5df6e0e2 ................... Checksum: SHA256(SHA256(<empty>))
{% endhighlight %}

{% endautocrossref %}

### Data Messages
{% include helpers/subhead-links.md %}

{% autocrossref %}

The following network messages all request or provide data related to
transactions and blocks.

![Overview Of P2P Protocol Data Request And Reply Messages](/img/dev/en-p2p-data-messages.svg)

Many of the data messages use
[inventories][/en/glossary/inventory]{:#term-inventory}{:.term} as unique identifiers
for transactions and blocks.  Inventories have a simple 36-byte
structure:

| Bytes | Name            | Data Type | Description
|-------|-----------------|-----------|-------------
| 4     | type identifier | uint32_t  | The type of object which was hashed.  See list of type identifiers below.
| 32    | hash            | char[32]  | SHA256(SHA256()) hash of the object in internal byte order.

The currently-available type identifiers are:

| Type Identifier | Name                                                                          | Description
|-----------------|-------------------------------------------------------------------------------|---------------
| 1               | [`MSG_TX`][msg_tx]{:#term-msg_tx}{:.term}                                     | The hash is a TXID.
| 2               | [`MSG_BLOCK`][msg_block]{:#term-msg_block}{:.term}                            | The hash is of a block header.
| 3               | [`MSG_FILTERED_BLOCK`][msg_filtered_block]{:#term-msg_filtered_block}{:.term} | The hash is of a block header; identical to `MSG_BLOCK`. When used in a `getdata` message, this indicates the response should be a `merkleblock` message rather than a `block` message (but this only works if a bloom filter was previously configured).  **Only for use in `getdata` messages.**

Type identifier zero and type identifiers greater than three are reserved
for future implementations. Bitcoin Core ignores all inventories with
one of these unknown types.

{% endautocrossref %}

#### Block
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `block` message transmits a single serialized block in the format
described in the [serialized blocks section][section serialized blocks].
See that section for an example hexdump.  It can be sent for two
different reasons:

1. **GetData Response:** Nodes will always send it in response to a
   `getdata` message that requests the block with an inventory
   type of `MSG_BLOCK` (provided the node has that block available for
   relay).

2. **Unsolicited:** Some miners will send unsolicited `block` messages
   broadcasting their newly-mined blocks to all of their peers. Many
   mining pools do the same thing, although some may be misconfigured to
   send the block from multiple nodes, possibly sending the same block
   to some peers more than once.

{% endautocrossref %}

#### GetBlocks
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `getblocks` message requests an `inv` message that provides block
header hashes starting from a particular point in the block chain. It
allows a peer which has been disconnected or started for the first time
to get the data it needs to request the blocks it hasn't seen.

Peers which have been disconnected may have stale blocks in their
locally-stored block chain, so the `getblocks` message allows the
requesting peer to provide the receiving peer with multiple header
hashes at various heights on their local chain. This allows the
receiving peer to find, within that list, the last header hash they had
in common and reply with all subsequent header hashes.

Note: the receiving peer itself may respond with an `inv` message
containing header hashes of stale blocks.  It is up to the requesting
peer to poll all of its peers to find the best block chain.

If the receiving peer does not find a common header hash within the
list, it will assume the last common block was the genesis block (block
zero), so it will reply with in `inv` message containing header hashes
starting with block one (the first block after the genesis block).

| Bytes    | Name                 | Data Type        | Description
|----------|----------------------|------------------|----------------
| 4        | version              | uint32_t         | The protocol version number; the same as sent in the `version` message.
| *Varies* | hash count           | compactSize uint | The number of header hashes provided not including the stop hash.  There is no limit except that the byte size of the entire message must be below the [`MAX_SIZE`][max_size] limit; typically from 1 to 200 hashes are sent.
| *Varies* | block header hashes  | char[32]         | One or more block header hashes (32 bytes each) in internal byte order.  Hashes should be provided in reverse order of block height, so highest-height hashes are listed first and lowest-height hashes are listed last.
| 32       | stop hash            | char[32]         | The header hash of the last header hash being requested; set to all zeroes to request an `inv` message with all subsequent header hashes (a maximum of 500 will be sent as a reply to this message; if you need more than 500, you will need to send another `getblocks` message with a higher-height header hash as the first entry in block header hash field).

The following annotated hexdump shows a `getblocks` message.  (The
message header has been omitted.)

{% highlight text %}
71110100 ........................... Protocol version: 70001
02 ................................. Hash count: 2

d39f608a7775b537729884d4e6633bb2
105e55a16a14d31b0000000000000000 ... Hash #1

5c3e6403d40837110a2e8afb602b1c01
714bda7ce23bea0a0000000000000000 ... Hash #2

00000000000000000000000000000000
00000000000000000000000000000000 ... Stop hash
{% endhighlight %}

{% endautocrossref %}

#### GetData
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `getdata` message requests one or more data objects from another
node. The objects are requested by an inventory, which the requesting
node typically previously received by way of an `inv` message.

The response to a `getdata` message can be a `tx` message, `block`
message, `merkleblock` message, or `notfound` message.

This message cannot be used to request arbitrary data, such as historic
transactions no longer in the memory pool or relay set. Full nodes may
not even be able to provide older blocks if they've pruned old
transactions from their block database. For this reason, the `getdata`
message should usually only be used to request data from a node which
previously advertised it had that data by sending an `inv` message.

The format and maximum size limitations of the `getdata` message are
identical to the `inv` message; only the message header differs.

{% endautocrossref %}

#### GetHeaders
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 31800.*

The `getheaders` message requests a `headers` message that provides block headers
starting from a particular point in the block chain. It allows a
peer which has been disconnected or started for the first time to get
the headers it hasn’t seen yet.

The `getheaders` message is nearly identical to the `getblocks` message,
with one minor difference: the `inv` reply to the `getblocks` message
will include no more than 500 block header hashes; the `headers` reply
to the `getheaders` message will include as many as 2,000 block headers.

{% endautocrossref %}

#### Headers
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 31800.*

The `headers` message sends one or more block headers to a node which
previously requested certain headers with a `getheaders` message.

| Bytes    | Name    | Data Type        | Description
|----------|---------|------------------|-----------------
| *Varies* | count   | compactSize uint | Number of block headers up to a maximum of 2,000.  Note: headers-first sync assumes the sending node will send the maximum number of headers whenever possible.
| *Varies* | headers | block_header     | Block headers: each 80-byte block header is in the format described in the [block headers section][section block header] with an additional 0x00 suffixed.  This 0x00 is called the transaction count, but because the headers message doesn't include any transactions, the transaction count is always zero.

The following annotated hexdump shows a `headers` message.  (The message
header has been omitted.)

{% highlight text %}
01 ................................. Header count: 1

02000000 ........................... Block version: 2
b6ff0b1b1680a2862a30ca44d346d9e8
910d334beb48ca0c0000000000000000 ... Hash of previous block's header
9d10aa52ee949386ca9385695f04ede2
70dda20810decd12bc9b048aaab31471 ... Merkle root
24d95a54 ........................... Unix time: 1415239972
30c31b18 ........................... Target (bits)
fe9f0864 ........................... Nonce

00 ................................. Transaction count (0x00)
{% endhighlight %}

{% endautocrossref %}

#### Inv
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `inv` message (inventory message) transmits one or more inventories of
objects known to the transmitting peer.  It can be sent unsolicited to
announce new transactions or blocks, or it can be sent in reply to a
`getblocks` message or `mempool` message.

The receiving peer can compare the inventories from an `inv` message
against the inventories it has already seen, and then use a follow-up
message to request unseen objects.

| Bytes    | Name      | Data Type             | Description
|----------|-----------|-----------------------|-----------------
| *Varies* | count     | compactSize uint      | The number of inventory entries.
| *Varies* | inventory | inventory             | One or more inventory entries up to a maximum of 50,000 entries.

The following annotated hexdump shows an `inv` message with two
inventory entries.  (The message header has been omitted.)

{% highlight text %}
02 ................................. Count: 2

01000000 ........................... Type: MSG_TX
de55ffd709ac1f5dc509a0925d0b1fc4
42ca034f224732e429081da1b621f55a ... Hash (TXID)

01000000 ........................... Type: MSG_TX
91d36d997037e08018262978766f24b8
a055aaf1d872e94ae85e9817b2c68dc7 ... Hash (TXID)
{% endhighlight %}

{% endautocrossref %}

#### MemPool
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 60002.*

The `mempool` message requests the TXIDs of transactions that the
receiving node has verified as valid but which have not yet appeared in
a block. That is, transactions which are in the receiving node's memory
pool. The response to the `mempool` message is one or more `inv`
messages containing the TXIDs in the usual inventory format.

Sending the `mempool` message is mostly useful when a program first
connects to the network. Full nodes can use it to quickly gather most or
all of the unconfirmed transactions available on the network; this is
especially useful for miners trying to gather transactions for their
transaction fees. SPV clients can set a filter before sending a
`mempool` to only receive transactions that match that filter; this
allows a recently-started client to get most or all unconfirmed
transactions related to its wallet.

The `inv` response to the `mempool` message is, at best, one node's
view of the network---not a complete list of unconfirmed transactions
on the network. Here are some additional reasons the list might not
be complete:

* Before Bitcoin Core 0.9.0, the response to the `mempool` message was
  only one `inv` message. An `inv` message is limited to 50,000
  inventories, so a node with a memory pool larger than 50,000 entries
  would not send everything.  Later versions of Bitcoin Core send as
  many `inv` messages as needed to reference its complete memory pool.

* The `mempool` message is not currently fully compatible with the
  `filterload` message's `BLOOM_UPDATE_ALL` and
  `BLOOM_UPDATE_P2PUBKEY_ONLY` flags. Mempool transactions are not
  sorted like in-block transactions, so a transaction (tx2) spending an
  output can appear before the transaction (tx1) containing that output,
  which means the automatic filter update mechanism won't operate until
  the second-appearing transaction (tx1) is seen---missing the
  first-appearing transaction (tx2). It has been proposed in [Bitcoin
  Core issue #2381][] that the transactions should be sorted before
  being processed by the filter.

There is no payload in a `mempool` message.  See the [message header
section][section message header] for an example of a message without a payload.

{% endautocrossref %}

#### MerkleBlock
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 70001 as described by BIP37.*

The `merkleblock` message is a reply to a `getdata` message which
requested a block using the inventory type `MSG_MERKLEBLOCK`.  It is
only part of the reply: if any matching transactions are found, they will
be sent separately as `tx` messages.

If a filter has been previously set with the `filterload` message, the
`merkleblock` message will contain the TXIDs of any transactions in the
requested block that matched the filter, as well as any parts of the
block's merkle tree necessary to connect those transactions to the
block header's merkle root. The message also contains a complete copy
of the block header to allow the client to hash it and confirm its
proof of work.

| Bytes    | Name               | Data Type        | Description
|----------|--------------------|------------------|----------------
| 80       | block header       | block_header     | The block header in the format described in the [block header section][section block header].
| 4        | transaction count  | uint32_t         | The number of transactions in the block (including ones that don't match the filter).
| *Varies* | hash count         | compactSize uint | The number of hashes in the following field.
| *Varies* | hashes             | char[32]         | One or more hashes of both transactions and merkle nodes in internal byte order.  Each hash is 32 bits.
| *Varies* | flag byte count    | compactSize uint | The number of flag bytes in the following field.
| *Varies* | flags              | byte[]           | A sequence of bits packed eight in a byte with the least significant bit first.  May be padded to the nearest byte boundary but must not contain any more bits than that.  Used to assign the hashes to particular nodes in the merkle tree as described below.

The annotated hexdump below shows a `merkleblock` message which
corresponds to the examples below.  (The message header has been
omitted.)

{% highlight text %}
01000000 ........................... Block version: 1
82bb869cf3a793432a66e826e05a6fc3
7469f8efb7421dc88067010000000000 ... Hash of previous block's header
7f16c5962e8bd963659c793ce370d95f
093bc7e367117b3c30c1f8fdd0d97287 ... Merkle root
76381b4d ........................... Time: 1293629558
4c86041b ........................... nBits: 0x04864c * 256**(0x1b-3)
554b8529 ........................... Nonce

07000000 ........................... Transaction count: 7
04 ................................. Hash count: 4

3612262624047ee87660be1a707519a4
43b1c1ce3d248cbfc6c15870f6c5daa2 ... Hash #1
019f5b01d4195ecbc9398fbf3c3b1fa9
bb3183301d7a1fb3bd174fcfa40a2b65 ... Hash #2
41ed70551dd7e841883ab8f0b16bf041
76b7d1480e4f0af9f3d4c3595768d068 ... Hash #3
20d2a7bc994987302e5b1ac80fc425fe
25f8b63169ea78e68fbaaefa59379bbf ... Hash #4

01 ................................. Flag bytes: 1
1d ................................. Flags: 1 0 1 1 1 0 0 0
{% endhighlight %}

Note: when fully decoded, the above `merkleblock` message provided the
TXID for a single transaction that matched the filter. In the network
traffic dump this output was taken from, the full transaction belonging
to that TXID was sent immediately after the `merkleblock` message as
a `tx` message.

##### Parsing A MerkleBlock Message
{:.no_toc}
{% include helpers/subhead-links.md %}

As seen in the annotated hexdump above, the `merkleblock` message
provides three special data types: a transaction count, a list of
hashes, and a list of one-bit flags.

You can use the transaction count to construct an empty merkle tree.
We'll call each entry in the tree a node; on the bottom are TXID
nodes---the hashes for these nodes are TXIDs; the remaining nodes
(including the merkle root) are non-TXID nodes---they may actually have
the same hash as a TXID, but we treat them differently.

![Example Of Parsing A MerkleBlock Message](/img/dev/animated-en-merkleblock-parsing.gif)

Keep the hashes and flags in the order they appear in the `merkleblock`
message. When we say "next flag" or "next hash", we mean the next flag
or hash on the list, even if it's the first one we've used so far.

Start with the merkle root node and the first flag. The table below
describes how to evaluate a flag based on whether the node being
processed is a TXID node or a non-TXID node. Once you apply a flag to a
node, never apply another flag to that same node or reuse that same
flag again.

| Flag  | TXID Node                                                                                | Non-TXID Node
|-------|------------------------------------------------------------------------------------------|----
| **0** | Use the next hash as this node's TXID, but this transaction didn't match the filter.     | Use the next hash as this node's hash.  Don't process any descendant nodes.
| **1** | Use the next hash as this node's TXID, and mark this transaction as matching the filter. | The hash needs to be computed.  Process the left child node to get its hash; process the right child node to get its hash; then concatenate the two hashes as 64 raw bytes and hash them to get this node's hash.

Any time you begin processing a node for the first time, evaluate the next
flag. Never use a flag at any other time.

When processing a child node, you may need to process its children (the
grandchildren of the original node) or further-descended nodes before
returning to the parent node. This is expected---keep processing depth
first until you reach a TXID node or a non-TXID node with a flag of 0.

After you process a TXID node or a non-TXID node with a flag of 0, stop
processing flags and begin to ascend the tree. As you ascend, compute
the hash of any nodes for which you now have both child hashes or for
which you now have the sole child hash. See the [merkle tree
section][section merkle trees] for hashing instructions. If you reach a
node where only the left hash is known, descend into its right child (if
present) and further descendants as necessary.

However, if you find a node whose left and right children both have the
same hash, fail.  This is related to CVE-2012-2459.

Continue descending and ascending until you have enough information to
obtain the hash of the merkle root node. If you run out of flags or
hashes before that condition is reached, fail. Then perform the
following checks (order doesn't matter):

* Fail if there are unused hashes in the hashes list.

* Fail if there are unused flag bits---except for the minimum number of
  bits necessary to pad up to the next full byte.

* Fail if the hash of the merkle root node is not identical to the
  merkle root in the block header.

* Fail if the block header is invalid. Remember to ensure that the hash
  of the header is less than or equal to the target threshold encoded by
  the nBits header field. Your program should also, of course, attempt
  to ensure the header belongs to the best block chain and that the user
  knows how many confirmations this block has.

For a detailed example of parsing a `merkleblock` message, please see
the corresponding [merkle block examples section][section merkleblock
example].

##### Creating A MerkleBlock Message
{:.no_toc}
{% include helpers/subhead-links.md %}

It's easier to understand how to create a `merkleblock` message after
you understand how to parse an already-created message, so we recommend
you read the parsing section above first.

Create a complete merkle tree with TXIDs on the bottom row and all the
other hashes calculated up to the merkle root on the top row. For each
transaction that matches the filter, track its TXID node and all of its
ancestor nodes.

![Example Of Creating A MerkleBlock Message](/img/dev/animated-en-merkleblock-creation.gif)

Start processing the tree with the merkle root node. The table below
describes how to process both TXID nodes and non-TXID nodes based on
whether the node is a match, a match ancestor, or neither a match nor a
match ancestor.

|                                      | TXID Node                                                              | Non-TXID Node
|--------------------------------------|------------------------------------------------------------------------|----
| **Neither Match Nor Match Ancestor** | Append a 0 to the flag list; append this node's TXID to the hash list. | Append a 0 to the flag list; append this node's hash to the hash list.  Do not descend into its child nodes.
| **Match Or Match Ancestor**          | Append a 1 to the flag list; append this node's TXID to the hash list. | Append a 1 to the flag list; process the left child node.  Then, if the node has a right child, process the right child.  Do not append a hash to the hash list for this node.

Any time you begin processing a node for the first time, a flag should be
appended to the flag list. Never put a flag on the list at any other
time, except when processing is complete to pad out the flag list to a
byte boundary.

When processing a child node, you may need to process its children (the
grandchildren of the original node) or further-descended nodes before
returning to the parent node. This is expected---keep processing depth
first until you reach a TXID node or a node which is neither a TXID nor
a match ancestor.

After you process a TXID node or a node which is neither a TXID nor a
match ancestor, stop processing and begin to ascend the tree until you
find a node with a right child you haven't processed yet. Descend into
that right child and process it.

After you fully process the merkle root node according to the
instructions in the table above, processing is complete.  Pad your flag
list to a byte boundary and construct the `merkleblock` message using the
template near the beginning of this subsection.

{% endautocrossref %}

#### NotFound
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 70001.*

The `notfound` message is a reply to a `getdata` message which
requested an object the receiving node does not have available for
relay. (Nodes are not expected to relay historic transactions which
are no longer in the memory pool or relay set. Nodes may also have
pruned spent transactions from older blocks, making them unable to
send those blocks.)

The format and maximum size limitations of the `notfound` message are
identical to the `inv` message; only the message header differs.

{% endautocrossref %}

#### Tx
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `tx` message transmits a single transaction in the raw transaction
format. It can be sent in a variety of situations;

* **Transaction Response:** Bitcoin Core and BitcoinJ will send it in
  response to a `getdata` message that requests the transaction with an
  inventory type of `MSG_TX`.

* **MerkleBlock Response:** Bitcoin Core will send it in response to a
  `getdata` message that requests a merkle block with an inventory type
  of `MSG_MERKLEBLOCK`. (This is in addition to sending a `merkleblock`
  message.) Each `tx` message in this case provides a matched
  transaction from that block.

* **Unsolicited:** BitcoinJ will send a `tx` message unsolicited for
  transactions it originates.

For an example hexdump of the raw transaction format, see the [raw
transaction section][raw transaction format].

{% endautocrossref %}





### Control Messages
{% include helpers/subhead-links.md %}

{% autocrossref %}

The following network messages all help control the connection between
two peers or allow them to advise each other about the rest of the
network.

![Overview Of P2P Protocol Control And Advisory Messages](/img/dev/en-p2p-control-messages.svg)

Note that almost none of the control messages are authenticated in any
way, meaning they can contain incorrect or intentionally harmful
information. In addition, this section does not yet cover P2P protocol
operation over the [Tor network][tor]; if you would like to contribute
information about Tor, please [open an issue][docs issue].

{% endautocrossref %}

#### Addr
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `addr` (IP address) message relays connection information
for peers on the network. Each peer which wants to accept incoming
connections creates an `addr` message providing its connection
information and then sends that message to its peers unsolicited. Some
of its peers send that information to their peers (also unsolicited),
some of which further distribute it, allowing decentralized peer
discovery for any program already on the network.

An `addr` message may also be sent in response to a `getaddr` message.

| Bytes      | Name             | Data Type          | Description
|------------|------------------|--------------------|----------------
| *Varies*   | IP address count | compactSize uint   | The number of IP address entries up to a maximum of 1,000.
| *Varies*   | IP addresses     | network IP address | IP address entries.  See the table below for the format of a Bitcoin network IP address.

Each encapsulated network IP address currently uses the following structure:

| Bytes | Name       | Data Type | Description
|-------|------------|-----------|---------------
| 4     | time       | uint32    | *Added in protocol version 31402.* <br><br>A time in Unix epoch time format.  Nodes advertising their own IP address set this to the current time.  Nodes advertising IP addresses they've connected to set this to the last time they connected to that node.  Other nodes just relaying the IP address should not change the time.  Nodes can use the time field to avoid relaying old `addr` messages.  <br><br>Malicious nodes may change times or even set them in the future.
| 8     | services   | uint64_t  | The services the node advertised in its `version` message.
| 16    | IP address | char      | IPv6 address in **big endian byte order**. IPv4 addresses can be provided as [IPv4-mapped IPv6 addresses][] 
| 2     | port       | uint16_t  | Port number in **big endian byte order**.  Note that Bitcoin Core will only connect to nodes with non-standard port numbers as a last resort for finding peers.  This is to prevent anyone from trying to use the network to disrupt non-Bitcoin services that run on other ports.

The following annotated hexdump shows part of an `addr` message. (The
message header has been omitted and the actual IP address has been
replaced with a [RFC5737][] reserved IP address.)

{% highlight text %}
fde803 ............................. Address count: 1000

d91f4854 ........................... Epoch time: 1414012889
0100000000000000 ................... Service bits: 01 (network node)
00000000000000000000ffffc0000233 ... IP Address: ::ffff:192.0.2.51
208d ............................... Port: 8333

[...] .............................. (999 more addresses omitted)
{% endhighlight %}

{% endautocrossref %}




#### Alert
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 311.*

The `alert` message warns nodes of problems that may affect them or the
rest of the network. Each `alert` message is signed using a key controlled
by respected community members, mostly Bitcoin Core developers.

To ensure all nodes can validate and forward `alert` messages,
encapsulation is used. Developers create an alert using the data
structure appropriate for the versions of the software they want to
notify; then they serialize that data and sign it. The serialized data
and its signature make up the outer `alert` message---allowing nodes
which don't understand the data structure to validate the signature and
relay the alert to nodes which do understand it. The nodes which
actually need the message can decode the serialized data to access the
inner `alert` message.

The outer `alert` message has four fields:

| Bytes       | Name            | Data Type        | Description
|-------------|-----------------|------------------|-------------
| *Variable*  | alert bytes     | compactSize uint | The number of bytes in following alert field.
| *Variable*  | alert           | uchar            | The serialized alert.  See below for a description of the current alert format.
| *Variable*  | signature bytes | compactSize uint | The number of bytes in the following signature field.
| *Variable*  | signature       | uchar            | A DER-encoded ECDSA (secp256k1) signature of the alert signed with the developer's alert key.

Although designed to be easily upgraded, the format of the inner
serialized alert has not changed since the `alert` message was first
introduced in protocol version 311.

| Bytes    | Name              | Data Type                 | Description
|----------|-------------------|---------------------------|-------------
| 4        | version           | int32_t                   | Alert format version.  Version 1 from protocol version 311 through at least protocol version 70002.
| 8        | relayUntil        | int64_t                   | The time beyond which nodes should stop relaying this alert.  Unix epoch time format.
| 8        | expiration        | int64_t                   | The time beyond which this alert is no longer in effect and should be ignored.  Unix epoch time format.
| 4        | ID                | int32_t                   | A unique ID number for this alert.
| 4        | cancel            | int32_t                   | All alerts with an ID number less than or equal to this number should be canceled: deleted and not accepted in the future.
| *Varies* | setCancel count   | compactSize uint          | The number of IDs in the following setCancel field.  May be zero.
| *Varies* | setCancel         | int32_t                   | Alert IDs which should be canceled.  Each alert ID is a separate int32_t number.
| 4        | minVer            | int32_t                   | This alert only applies to protocol versions greater than or equal to this version. Nodes running other protocol versions should still relay it.
| 4        | maxVer            | int32_t                   | This alert only applies to protocol versions less than or equal to this version. Nodes running other protocol versions should still relay it.
| *Varies* | user\_agent count | compactSize uint          | The number of user agent strings in the following setUser\_agent field.  May be zero.
| *Varies* | setUser\_agent    | compactSize uint + string | If this field is empty, it has no effect on the alert.  If there is at least one entry is this field, this alert only applies to programs with a user agent that exactly matches one of the strings in this field.  Each entry in this field is a compactSize uint followed by a string---the uint indicates how many bytes are in the following string.  This field was originally called setSubVer; since BIP14, it applies to user agent strings as defined in the `version` message.
| 4        | priority          | int32_t                   | Relative priority compared to other alerts.
| *Varies* | comment bytes     | compactSize uint          | The number of bytes in the following comment field.  May be zero.
| *Varies* | comment           | string                    | A comment on the alert that is not displayed.
| *Varies* | statusBar bytes   | compactSize uint          | The number of bytes in the following statusBar field.  May be zero.
| *Varies* | statusBar         | string                    | The alert message that is displayed to the user.
| *Varies* | reserved bytes    | compactSize uint          | The number of bytes in the following reserved field.  May be zero.
| *Varies* | reserved          | string                    | Reserved for future use.  Originally called RPC Error.  

The annotated hexdump below shows an `alert` message. (The message
header has been omitted.)

<!-- example below from Bitcoin Wiki but it's a network capture so I
(@harding) don't think it is subject to the wiki's copyright license; I
think it's public domain. TODO: replace with a more recent
alert the next time one is live on the network. -->

{% highlight text %}
73 ................................. Bytes in encapsulated alert: 115
01000000 ........................... Version: 1
3766404f00000000 ................... RelayUntil: 1329620535
b305434f00000000 ................... Expiration: 1330917376

f2030000 ........................... ID: 1010
f1030000 ........................... Cancel: 1009
00 ................................. setCancel count: 0

10270000 ........................... MinVer: 10000
48ee0000 ........................... MaxVer: 61000
00 ................................. setUser_agent bytes: 0
64000000 ........................... Priority: 100

00 ................................. Bytes In Comment String: 0
46 ................................. Bytes in StatusBar String: 70
53656520626974636f696e2e6f72672f
666562323020696620796f7520686176
652074726f75626c6520636f6e6e6563
74696e67206166746572203230204665
627275617279 ....................... Status Bar String: "See [...]"
00 ................................. Bytes In Reserved String: 0

47 ................................. Bytes in signature: 71
30450221008389df45f0703f39ec8c1c
c42c13810ffcae14995bb648340219e3
53b63b53eb022009ec65e1c1aaeec1fd
334c6b684bde2b3f573060d5b70c3a46
723326e4e8a4f1 ..................... Signature
{% endhighlight %}

**Alert key compromise:** Bitcoin Core's source code defines a
particular set of alert parameters that can be used to notify users that
the alert signing key has been compromised and that they should upgrade
to get a new alert public key. Once a signed alert containing those
parameters has been received, no other alerts can cancel or override it.
See the `ProcessAlert()` function in the Bitcoin Core [alert.cpp][core
alert.cpp] source code for the parameters of this message.

{% endautocrossref %}


#### FilterAdd
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 70001 as described by BIP37.*

The `filteradd` message tells the receiving peer to add a single element to
a previously-set bloom filter, such as a new public key. The element is
sent directly to the receiving peer; the peer then uses the parameters set
in the `filterload` message to add the element to the bloom filter.

Because the element is sent directly to the receiving peer, there is no
obfuscation of the element and none of the plausible-deniability privacy
provided by the bloom filter. Clients that want to maintain greater
privacy should recalculate the bloom filter themselves and send a new
`filterload` message with the recalculated bloom filter.

| Bytes    | Name          | Data Type        | Description
|----------|---------------|------------------|-----------------
| *Varies* | element bytes | compactSize uint | The number of bytes in the following element field.
| *Varies* | element       | uint8_t[]        | The element to add to the current filter.  Maximum of 520 bytes, which is the maximum size of an element which can be pushed onto the stack in a pubkey or signature script.  Elements must be sent in the byte order they would use when appearing in a raw transaction; for example, hashes should be sent in internal byte order.

Note: a `filteradd` message will not be accepted unless a filter was
previously set with the `filterload` message.

The annotated hexdump below shows a `filteradd` message adding a TXID.
(The message header has been omitted.) This TXID appears in the same
block used for the example hexdump in the `merkleblock` message; if that
`merkleblock` message is re-sent after sending this `filteradd` message,
six hashes are returned instead of four.

{% highlight text %}
20 ................................. Element bytes: 32
fdacf9b3eb077412e7a968d2e4f11b9a
9dee312d666187ed77ee7d26af16cb0b ... Element (A TXID)
{% endhighlight %}

{% endautocrossref %}

#### FilterClear
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 70001 as described by BIP37.*

The `filterclear` message tells the receiving peer to remove a
previously-set bloom filter.  This also undoes the effect of setting the
relay field in the `version` message to 0, allowing unfiltered access to
`inv` messages announcing new transactions.

Bitcoin Core does not require a `filterclear` message before a
replacement filter is loaded with `filterload`.  It also doesn't require
a `filterload` message before a `filterclear` message.

There is no payload in a `filterclear` message.  See the [message header
section][section message header] for an example of a message without a payload.

{% endautocrossref %}


#### FilterLoad
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 70001 as described by BIP37.*

The `filterload` message tells the receiving peer to filter all relayed
transactions and requested merkle blocks through the provided filter.
This allows clients to receive transactions relevant to their wallet
plus a configurable rate of false positive transactions which can
provide plausible-deniability privacy.

| Bytes    | Name         | Data Type | Description
|----------|--------------|-----------|---------------
| *Varies* | nFilterBytes | uint8_t[] | Number of bytes in the following filter bit field.
| *Varies* | filter       | uint8_t[] | A bit field of arbitrary byte-aligned size. The maximum size is 36,000 bytes.
| 4        | nHashFuncs   | uint32_t  | The number of hash functions to use in this filter. The maximum value allowed in this field is 50.
| 4        | nTweak       | uint32_t  | An arbitrary value to add to the seed value in the hash function used by the bloom filter.
| 1        | nFlags       | uint8_t   | A set of flags that control how outpoints corresponding to a matched pubkey script are added to the filter. See the table in the Updating A Bloom Filter subsection below.

The annotated hexdump below shows a `filterload` message. (The message
header has been omitted.)  For an example of how this payload was
created, see the [filterload example][section creating a bloom filter].

{% highlight text %}
02 ......... Filter bytes: 2
b50f ....... Filter: 1010 1101 1111 0000
0b000000 ... nHashFuncs: 11
00000000 ... nTweak: 0/none
00 ......... nFlags: BLOOM_UPDATE_NONE
{% endhighlight %}

**Initializing A Bloom Filter**

Filters have two core parameters: the size of the bit field and the
number of hash functions to run against each data element. The following
formulas from BIP37 will allow you to automatically select appropriate
values based on the number of elements you plan to insert into the
filter (*n*) and the false positive rate (*p*) you desire to maintain
plausible deniability.

* Size of the bit field in bytes (*nFilterBytes*), up to a maximum of
  36,000: `(-1 / log(2)**2 * n * log(p)) / 8`

* Hash functions to use (*nHashFuncs*), up to a maximum of 50:
  `nFilterBytes * 8 / n * log(2)`

Note that the filter matches parts of transactions (transaction
elements), so the false positive rate is relative to the number of
elements checked---not the number of transactions checked. Each normal
transaction has a minimum of four matchable elements (described in the
comparison subsection below), so a filter with a false-positive rate of
1 percent will match about 4 percent of all transactions at a minimum.

According to BIP37, the formulas and limits described above provide
support for bloom filters containing 20,000 items with a false positive
rate of less than 0.1 percent or 10,000 items with a false positive rate
of less than 0.0001 percent.

Once the size of the bit field is known, the bit field should be
initialized as all zeroes.

**Populating A Bloom Filter**

The bloom filter is populated using between 1 and 50 unique hash
functions (the number specified per filter by the *nHashFuncs*
field). Instead of using up to 50 different hash function
implementations, a single implementation is used with a unique seed
value for each function.

The seed is `nHashNum * 0xfba4c795 + nTweak` as a *uint32\_t*, where the values
are:

* **nHashNum** is the sequence number<!--noref--> for this hash
  function, starting at 0 for the first hash iteration and increasing up
  to the value of the *nHashFuncs* field (minus one) for the last hash
  iteration.

* **0xfba4c795** is a constant optimized to create large differences in
  the seed for different values of *nHashNum*. 

* **nTweak** is a per-filter constant set by the client to require the use
  of an arbitrary set of hash functions.

If the seed resulting from the formula above is larger than four bytes,
it must be truncated to its four most significant bytes (for example,
`0x8967452301 & 0xffffffff → 0x67452301`).

The actual hash function implementation used is the [32-bit Murmur3 hash
function][murmur3].

![Warning icon](/img/icons/icon_warning.svg)
**Warning:** the Murmur3 hash function has separate 32-bit and 64-bit
versions that produce different results for the same input.  Only the
32-bit Murmur3 version is used with Bitcoin bloom filters.

The data to be hashed can be any transaction element which the bloom
filter can match. See the next subsection for the list of transaction
elements checked against the filter. The largest element which can be
matched is a script data push of 520 bytes, so the data should never
exceed 520 bytes.

The example below from Bitcoin Core [bloom.cpp][core bloom.cpp hash] combines
all the steps above to create the hash function template. The seed is
the first parameter; the data to be hashed is the second parameter. The
result is a uint32\_t modulo the size of the bit field in bits.

{% highlight c++ %}
MurmurHash3(nHashNum * 0xFBA4C795 + nTweak, vDataToHash) % (vData.size() * 8)
{% endhighlight %}

Each data element to be added to the filter is hashed by *nHashFuncs*
number of hash functions. Each time a hash function is run, the result
will be the index number (*nIndex*) of a bit in the bit field. That bit
must be set to 1. For example if the filter bit field was `00000000` and
the result is 5, the revised filter bit field is `00000100` (the first bit
is bit 0).

It is expected that sometimes the same index number will be returned
more than once when populating the bit field; this does not affect the
algorithm---after a bit is set to 1, it is never changed back to 0.

After all data elements have been added to the filter, each set of eight
bits is converted into a little-endian byte. These bytes are the value
of the *filter* field.

**Comparing Transaction Elements To A Bloom Filter**

To compare an arbitrary data element against the bloom filter, it is
hashed using the same parameters used to create the bloom filter.
Specifically, it is hashed *nHashFuncs* times, each time using the same
*nTweak* provided in the filter, and the resulting output is modulo the
size of the bit field provided in the *filter* field.  After each hash is
performed, the filter is checked to see if the bit at that indexed
location is set.  For example if the result of a hash is `5` and the
filter is `01001110`, the bit is considered set.

If the result of every hash points to a set bit, the filter matches. If
any of the results points to an unset bit, the filter does not match.

The following transaction elements are compared against bloom filters.
All elements will be hashed in the byte order used in blocks (for
example, TXIDs will be in internal byte order).

* **TXIDs:** the transaction's SHA256(SHA256()) hash.

* **Outpoints:** each 36-byte outpoint used this transaction's input
  section is individually compared to the filter.

* **Signature Script Data:** each element pushed onto the stack by a
  data-pushing opcode in a signature script from this transaction is
  individually compared to the filter.  This includes data elements
  present in P2SH redeem scripts when they are being spent.

* **PubKey Script Data:** each element pushed onto the the stack by a
  data-pushing opcode in any pubkey script from this transaction is
  individually compared to the filter. (If a pubkey script element
  matches the filter, the filter will be immediately updated if the
  `BLOOM_UPDATE_ALL` flag was set; if the pubkey script is in the P2PKH
  format and matches the filter, the filter will be immediately updated
  if the `BLOOM_UPDATE_P2PUBKEY_ONLY` flag was set. See the subsection
  below for details.)

The following annotated hexdump of a transaction is from the [raw
transaction format section][raw transaction format]; the elements which
would be checked by the filter are emphasized in bold. Note that this
transaction's TXID (**`01000000017b1eab[...]`**) would also be checked,
and that the outpoint TXID and index number below would be checked as a
single 36-byte element.

<pre><code>01000000 ................................... Version

01 ......................................... Number of inputs
|
| <b>7b1eabe0209b1fe794124575ef807057</b>
| <b>c77ada2138ae4fa8d6c4de0398a14f3f</b> ......... Outpoint TXID
| <b>00000000</b> ................................. Outpoint index number
|
| 49 ....................................... Bytes in sig. script: 73
| | 48 ..................................... Push 72 bytes as data
| | | <b>30450221008949f0cb400094ad2b5eb3</b>
| | | <b>99d59d01c14d73d8fe6e96df1a7150de</b>
| | | <b>b388ab8935022079656090d7f6bac4c9</b>
| | | <b>a94e0aad311a4268e082a725f8aeae05</b>
| | | <b>73fb12ff866a5f01</b> ..................... Secp256k1 signature
|
| ffffffff ................................. Sequence number: UINT32_MAX

01 ......................................... Number of outputs
| f0ca052a01000000 ......................... Satoshis (49.99990000 BTC)
|
| 19 ....................................... Bytes in pubkey script: 25
| | 76 ..................................... OP_DUP
| | a9 ..................................... OP_HASH160
| | 14 ..................................... Push 20 bytes as data
| | | <b>cbc20a7664f2f69e5355aa427045bc15</b>
| | | <b>e7c6c772</b> ............................. PubKey hash
| | 88 ..................................... OP_EQUALVERIFY
| | ac ..................................... OP_CHECKSIG

00000000 ................................... locktime: 0 (a block height)
</code></pre>

**Updating A Bloom Filter**

Clients will often want to track inputs that spend outputs (outpoints)
relevant to their wallet, so the filterload field *nFlags* can be set to
allow the filtering node to update the filter when a match is found.
When the filtering node sees a pubkey script that pays a pubkey,
address, or other data element matching the filter, the filtering node
immediately updates the filter with the outpoint corresponding to that
pubkey script.

![Automatically Updating Bloom Filters](/img/dev/en-bloom-update.svg)

If an input later spends that outpoint, the filter will match it,
allowing the filtering node to tell the client that one of its
transaction outputs has been spent.

The *nFlags* field has three allowed values:

| Value | Name                       | Description
|-------|----------------------------|---------------
| 0     | BLOOM_UPDATE_NONE          | The filtering node should not update the filter.
| 1     | BLOOM_UPDATE_ALL           | If the filter matches any data element in a pubkey script, the corresponding outpoint is added to the filter. 
| 2     | BLOOM_UPDATE_P2PUBKEY_ONLY | If the filter matches any data element in a pubkey script and that script is either a P2PKH or non-P2SH pay-to-multisig script, the corresponding outpoint is added to the filter.

In addition, because the filter size stays the same even though
additional elements are being added to it, the false positive rate
increases. Each false positive can result in another element being added
to the filter, creating a feedback loop that can (after a certain point)
make the filter useless. For this reason, clients using automatic filter
updates need to monitor the actual false positive rate and send a new
filter when the rate gets too high.

{% endautocrossref %}

#### GetAddr
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `getaddr` message requests an `addr` message from the receiving
node, preferably one with lots of IP addresses of other receiving nodes.
The transmitting node can use those IP addresses to quickly update its
database of available nodes rather than waiting for unsolicited `addr`
messages to arrive over time.

There is no payload in a `getaddr` message.  See the [message header
section][section message header] for an example of a message without a payload.

{% endautocrossref %}


#### Ping
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `ping` message helps confirm that the receiving peer is still
connected. If a TCP/IP error is encountered when sending the `ping`
message (such as a connection timeout), the transmitting node can assume
that the receiving node is disconnected. The response to a `ping`
message is the `pong` message.

Before protocol version 60000, the `ping` message had no payload. As of
protocol version 60001 and all later versions, the message includes a
single field, the nonce.

| Bytes | Name  | Data Type | Description
|-------|-------|-----------|---------------
| 8     | nonce | uint64_t  | *Added in protocol version 60000 as described by BIP31.* <br><br>Random nonce assigned to this `ping` message.  The responding `pong` message will include this nonce to identify the `ping` message to which it is replying.

The annotated hexdump below shows a `ping` message. (The message
header has been omitted.)

{% highlight text %}
0094102111e2af4d ... Nonce
{% endhighlight %}

{% endautocrossref %}

#### Pong
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 60001 as described by BIP31.*

The `pong` message replies to a `ping` message, proving to the pinging
node that the ponging node is still alive. Bitcoin Core will, by
default, disconnect from any clients which have not responded to a
`ping` message within 20 minutes.

To allow nodes to keep track of latency, the `pong` message sends back
the same nonce received in the `ping` message it is replying to.

The format of the `pong` message is identical to the `ping` message;
only the message header differs.

{% endautocrossref %}

#### Reject
{% include helpers/subhead-links.md %}

{% autocrossref %}

*Added in protocol version 70002 as described by BIP61.*

The `reject` message informs the receiving node that one of its previous
messages has been rejected.

| Bytes    | Name          | Data Type        | Description
|----------|---------------|------------------|--------------
| *Varies* | message bytes | compactSize uint | The number of bytes in the following message field.
| *Varies* | message       | string           | The type of message rejected as ASCII text *without null padding*.  For example: "tx", "block", or "version".
| 1        | code          | char             | The reject message code.  See the table below.
| *Varies* | reason bytes  | compactSize uint | The number of bytes in the following reason field.  May be 0x00 if a text reason isn't provided.
| *Varies* | reason        | string           | The reason for the rejection in ASCII text.  This should not be displayed to the user; it is only for debugging purposes.
| *Varies* | extra data    | *varies*         | Optional additional data provided with the rejection.  For example, most rejections of `tx` messages or `block` messages include the hash of the rejected transaction or block header.  See the code table below.

The following table lists message reject codes.  Codes are tied to the
type of message they reply to; for example there is a 0x10 reject code
for transactions and a 0x10 reject code for blocks.

<!-- several descriptions below copied verbatim from BIP61; sort order:
ascending code number (primary) and alphabetic in reply to (secondary) -->

| Code | In Reply To       | Extra Bytes | Extra Type | Description
|------|-------------------|-------------|------------|----------------
| 0x01 | *any message*     | 0           | N/A        | Message could not be decoded.  Be careful of `reject` message feedback loops where two peers each don't understand each other's `reject` messages and so keep sending them back and forth forever.
| 0x10 | `block` message   | 32          | char[32]   | Block is invalid for some reason (invalid proof-of-work, invalid signature, etc).  Extra data is the rejected block's header hash.
| 0x10 | `tx` message      | 32          | char[32]   | Transaction is invalid for some reason (invalid signature, output value greater than input, etc.).  Extra data is the rejected transaction's TXID. 
| 0x11 | `block` message   | 32          | char[32]   | The block uses a version that is no longer supported.  Extra data is the rejected block's header hash.
| 0x11 | `version` message | 0           | N/A        | Connecting node is using a protocol version that the rejecting node considers obsolete and unsupported.
| 0x12 | `tx` message      | 32          | char[32]   | Duplicate input spend (double spend): the rejected transaction spends the same input as a previously-received transaction.  Extra data is the rejected transaction's TXID.
| 0x12 | `version` message | 0           | N/A        | More than one `version` message received in this connection.
| 0x40 | `tx` message      | 32          | char[32]   | The transaction will not be mined or relayed because the rejecting node considers it non-standard---a transaction type or version unknown by the server.  Extra data is the rejected transaction's TXID.
| 0x41 | `tx` message      | 32          | char[32]   | One or more output amounts are below the dust threshold.  Extra data is the rejected transaction's TXID.
| 0x42 | `tx` message      |             | char[32]   | The transaction did not have a large enough fee or priority to be relayed or mined.  Extra data is the rejected transaction's TXID.
| 0x43 | `block` message   | 32          | char[32]   | The block belongs to a block chain which is not the same block chain as provided by a compiled-in checkpoint.  Extra data is the rejected block's header hash.

The annotated hexdump below shows a `reject` message. (The message
header has been omitted.)

{% highlight text %}
02 ................................. Number of bytes in message: 2
7478 ............................... Type of message rejected: tx
12 ................................. Reject code: 0x12 (duplicate)
15 ................................. Number of bytes in reason: 21
6261642d74786e732d696e707574732d
7370656e74 ......................... Reason: bad-txns-inputs-spent
394715fcab51093be7bfca5a31005972
947baf86a31017939575fb2354222821 ... TXID
{% endhighlight %}

{% endautocrossref %}

#### SendHeaders
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `sendheaders` message tells the receiving peer to send new block
announcements using a `headers` message rather than an `inv` message.

There is no payload in a `sendheaders` message.  See the [message header
section][section message header] for an example of a message without a payload.

{% endautocrossref %}

#### VerAck
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `verack` message acknowledges a previously-received `version`
message, informing the connecting node that it can begin to send
other messages. The `verack` message has no payload; for an example
of a message with no payload, see the [message headers
section][section message header].

{% endautocrossref %}


#### Version
{% include helpers/subhead-links.md %}

{% autocrossref %}

The `version` message provides information about the transmitting node
to the receiving node at the beginning of a connection. Until both peers
have exchanged `version` messages, no other messages will be accepted.

If a `version` message is accepted, the receiving node should send a
`verack` message---but no node should send a `verack` message
before initializing its half of the connection by first sending a
`version` message.

| Bytes    | Name                  | Data Type        | Description
|----------|-----------------------|------------------|--------------
| 4        | version               | int32_t          | The highest protocol version understood by the transmitting node.  See the [protocol version section][section protocol versions].
| 8        | services              | uint64_t         | The services supported by the transmitting node encoded as a bitfield.  See the list of service codes below.
| 8        | timestamp             | int64_t          | The current Unix epoch time according to the transmitting node's clock.  Because nodes will reject blocks with timestamps more than two hours in the future, this field can help other nodes to determine that their clock is wrong.
| 8        | addr_recv services    | uint64_t         | *Added in protocol version 106.* <br><br>The services supported by the receiving node as perceived by the transmitting node.  Same format as the 'services' field above. Bitcoin Core will attempt to provide accurate information.  BitcoinJ will, by default, always send 0.
| 16       | addr_recv IP address  | char             | *Added in protocol version 106.* <br><br>The IPv6 address of the receiving node as perceived by the transmitting node in **big endian byte order**. IPv4 addresses can be provided as [IPv4-mapped IPv6 addresses][]. Bitcoin Core will attempt to provide accurate information.  BitcoinJ will, by default, always return ::ffff:127.0.0.1
| 2        | addr_recv port        | uint16_t         | *Added in protocol version 106.* <br><br>The port number of the receiving node as perceived by the transmitting node in **big endian byte order**.
| 8        | addr_trans services   | uint64_t         | The services supported by the transmitting node.  Should be identical to the 'services' field above.
| 16       | addr_trans IP address | char             | The IPv6 address of the transmitting node in **big endian byte order**. IPv4 addresses can be provided as [IPv4-mapped IPv6 addresses][].  Set to ::ffff:127.0.0.1 if unknown.
| 2        | addr_trans port       | uint16_t         | The port number of the transmitting node in **big endian byte order**.
| 8        | nonce                 | uint64_t         | A random nonce which can help a node detect a connection to itself.  If the nonce is 0, the nonce field is ignored.  If the nonce is anything else, a node should terminate the connection on receipt<!--noref--> of a `version` message with a nonce it previously sent.
| *Varies* | user_agent bytes      | compactSize uint | Number of bytes in following user\_agent field.  If 0x00, no user agent field is sent.
| *Varies* | user_agent            | string           | *Renamed in protocol version 60000.* <br><br>User agent as defined by BIP14. Previously called subVer.
| 4        | start_height          | int32_t          | The height of the transmitting node's best block chain or, in the case of an SPV client, best block header chain.
| 1        | relay                 | bool             | *Added in protocol version 70001 as described by BIP37.* <br><br>Transaction relay flag.  If 0x00, no `inv` messages or `tx` messages announcing new transactions should be sent to this client until it sends a `filterload` message or `filterclear` message.  If 0x01, this node wants `inv` messages and `tx` messages announcing new transactions.

The following service identifiers have been assigned.

| Value | Name         | Description
|-------|--------------|---------------
| 0x00  | *Unnamed*    | This node is not a full node.  It may not be able to provide any data except for the transactions it originates.
| 0x01  | NODE_NETWORK | This is a full node and can be asked for full blocks.  It should implement all protocol features available in its self-reported protocol version.

The following annotated hexdump shows a `version` message. (The
message header has been omitted and the actual IP addresses have been
replaced with [RFC5737][] reserved IP addresses.)

{% highlight text %}
72110100 ........................... Protocol version: 70002
0100000000000000 ................... Services: NODE_NETWORK 
bc8f5e5400000000 ................... Epoch time: 1415483324

0100000000000000 ................... Receiving node's services
00000000000000000000ffffc61b6409 ... Receiving node's IPv6 address
208d ............................... Receiving node's port number

0100000000000000 ................... Transmitting node's services
00000000000000000000ffffcb0071c0 ... Transmitting node's IPv6 address
208d ............................... Transmitting node's port number

128035cbc97953f8 ................... Nonce

0f ................................. Bytes in user agent string: 15
2f5361746f7368693a302e392e332f ..... User agent: /Satoshi:0.9.2.1/

cf050500 ........................... Start height: 329167
01 ................................. Relay flag: true
{% endhighlight %}

{% endautocrossref %}
