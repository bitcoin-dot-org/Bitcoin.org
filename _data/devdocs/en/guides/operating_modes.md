{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/guides/operating_modes.md" %}

## Operating Modes
{% include helpers/subhead-links.md %}

{% autocrossref %}

Currently there are two primary methods of validating the block chain as a client: Full nodes and SPV clients. Other methods, such as server-trusting methods, are not discussed as they are not recommended.

{% endautocrossref %}

### Full Node
{% include helpers/subhead-links.md %}

{% autocrossref %}

The first and most secure model is the one followed by Bitcoin Core, also known as a “thick” or “full chain” client. This security model assures the validity of the block chain by downloading and validating blocks from the genesis block all the way to the most recently discovered block. This is known as using the *height* of a particular block to verify the client’s view of the network. 

For a client to be fooled, an adversary would need to give a complete alternative block chain history that is of greater difficulty than the current “true” chain, which is computationally expensive (if not impossible) due to the fact that the chain with the most cumulative proof of work is by definition the "true" chain. Due to the computational difficulty required to generate a new block at the tip of the chain, the ability to fool a full node becomes very expensive after 6 confirmations. This form of verification is highly resistent to sybil attacks---only a single honest network peer is required in order to receive and verify the complete state of the "true" block chain. 

![Block Height Compared To Block Depth](/img/dev/en-block-height-vs-depth.svg)

{% endautocrossref %}

### Simplified Payment Verification (SPV)
{% include helpers/subhead-links.md %}

{% autocrossref %}

An alternative approach detailed in the [original Bitcoin paper][bitcoinpdf] is a client that only downloads the headers of blocks during the initial syncing process and then requests transactions from full nodes as needed. This scales linearly with the height of the block chain at only 80 bytes per block header, or up to 4.2MB per year, regardless of total block size. 

As described in the white paper, the merkle root in the block header along with a merkle branch can prove to the SPV client that the transaction in question is embedded in a block in the block chain. This does not guarantee validity of the transactions that are embedded. Instead it demonstrates the amount of work required to perform a double-spend attack. 

The block's depth in the block chain corresponds to the cumulative difficulty that has been performed to build on top of that particular block. The SPV client knows the merkle root and associated transaction information, and requests the respective merkle branch from a full node. Once the merkle branch has been retrieved, proving the existence of the transaction in the block, the SPV client can then look to block *depth* as a proxy for transaction validity and security. The cost of an attack on a user by a malicious node who inserts an invalid transaction grows with the cumulative difficulty built on top of that block, since the malicious node alone will be mining this forged chain. 

{% endautocrossref %}

#### Potential SPV Weaknesses
{% include helpers/subhead-links.md %}

{% autocrossref %}

If implemented naively, an SPV client has a few important weaknesses. 

First, while the SPV client can not be easily fooled into thinking a transaction is in a block when it is not, the reverse is not true. A full node can simply lie by omission, leading an SPV client to believe a transaction has not occurred. This can be considered a form of Denial of Service. One mitigation strategy is to connect to a number of full nodes, and send the requests to each node. However this can be defeated by network partitioning or Sybil attacks, since identities are essentially free, and can be bandwidth intensive. Care must be taken to ensure the client is not cut off from honest nodes.

Second, the SPV client only requests transactions from full nodes corresponding to keys it owns. If the SPV client downloads all blocks and then discards unneeded ones, this can be extremely bandwidth intensive. If they simply ask full nodes for blocks with specific transactions, this allows full nodes a complete view of the public addresses that correspond to the user. This is a large privacy leak, and allows for tactics such as denial of service for clients, users, or addresses that are disfavored by those running full nodes, as well as trivial linking of funds. A client could simply spam many fake transaction requests, but this creates a large strain on the SPV client, and can end up defeating the purpose of thin clients altogether. 

To mitigate the latter issue, Bloom filters have been implemented as a method of obfuscation and compression of block data requests. 

{% endautocrossref %}

#### Bloom Filters
{% include helpers/subhead-links.md %}

{% autocrossref %}

A Bloom filter is a space-efficient probabilistic data structure that is used to test membership of an element. The data structure achieves great data compression at the expense of a prescribed false positive rate. 

A Bloom filter starts out as an array of n bits all set to 0. A set of k random hash functions are chosen, each of which output<!--noref--> a single integer between the range of 1 and n.

When adding an element to the Bloom filter, the element is hashed k times separately, and for each of the k outputs<!--noref-->, the corresponding Bloom filter bit at that index is set to 1. 

<!-- Add picture here from wikipedia to explain the bits -->

Querying of the Bloom filter is done by using the same hash functions as before. If all k bits accessed in the bloom filter are set to 1, this demonstrates with high probability that the element lies in the set. Clearly, the k indices could have been set to 1 by the addition of a combination of other elements in the domain, but the parameters allow the user to choose the acceptable false positive rate. 

Removal of elements can only be done by scrapping the bloom filter and re-creating it from scratch.

{% endautocrossref %}

#### Application Of Bloom Filters 
{% include helpers/subhead-links.md %}

{% autocrossref %}

Rather than viewing the false positive rates as a liability, it is used to create a tunable parameter that represents the desired privacy level and bandwidth trade-off. A SPV client creates their Bloom filter and sends it to a full node using the message `filterload`, which sets the filter for which transactions are desired. The command `filteradd` allows addition of desired data to the filter without needing to send a totally new Bloom filter, and `filterclear` allows the connection to revert to standard block discovery mechanisms. If the filter has been loaded, then full nodes will send a modified form of blocks, called a merkle block. The merkle block is simply the block header with the merkle branch associated with the set Bloom filter. 

An SPV client can not only add transactions as elements to the filter, but also public keys, data from signature
scripts and pubkey scripts, and more. This enables P2SH transaction finding.

If a user is more privacy-conscious, he can set the Bloom filter to include more false positives, at the expense of extra bandwidth used for transaction discovery. If a user is on a tight bandwidth budget, he can set the false-positive rate to low, knowing that this will allow full nodes a clear view of what transactions are associated with his client. 

**Resources:** [BitcoinJ][], a Java implementation of Bitcoin that is based on the SPV security model and Bloom filters. Used in most Android wallets.

Bloom filters were standardized for use via [BIP37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki). Review the BIP for implementation details.

{% endautocrossref %}

### Future Proposals 
{% include helpers/subhead-links.md %}

{% autocrossref %}

There are future proposals such as Unspent Transaction Output (UTXO) commitments in the block chain to find a more satisfactory middle-ground for clients between needing a complete copy of the block chain, or trusting that a majority of your connected peers are not lying. UTXO commitments would enable a very secure client using a finite amount of storage using a data structure that is authenticated in the block chain. These type of proposals are, however, in very early stages, and will require soft forks in the network.

Until these types of operating modes are implemented, modes should be chosen based on the likely threat model, computing and bandwidth constraints, and liability in bitcoin value.

**Resources:** [Original Thread on UTXO Commitments](https://bitcointalk.org/index.php?topic=88208.0), [Authenticated Prefix Trees BIP Proposal](https://github.com/maaku/bips/blob/master/drafts/auth-trie.mediawiki)

{% endautocrossref %}
