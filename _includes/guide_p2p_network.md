## P2P Network

{% autocrossref %}

The Bitcoin [network][network]{:#term-network}{:.term} uses simple methods to perform peer discovery and communicate between nodes. The following section applies to both full nodes and SPV clients, with the exception that SPV's Bloom filters take the role of block discovery.

{% endautocrossref %}

### Peer Discovery

{% autocrossref %}

Bitcoin Core maintains a list of [peers][peer]{:#term-peer}{:.term} to connect to on startup. When a full node is started for the first time, it must be bootstrapped to the network. This is done automatically today in Bitcoin Core by a short list of trusted DNS seeds. The option `-dnsseed` can be set to define this behavior, though the default is `1`. DNS requests return a list of IP addresses that can be connected to. From there, the client can start connecting the Bitcoin network.

Alternatively, bootstrapping can be done by using the option `-seednode=<ip>`, allowing the user to predefine what seed server to connect to, then disconnect after building a peer list. Another method is starting Bitcoin Core with `-connect=<ip>` which disallows the node from connecting to any peers except those specified. Lastly, the argument `-addnode=<ip>` simply allows the user to add a single node to his peer list.

After bootstrapping, nodes send out a `addr` message containing their own IP to peers. Each peer of that node then forwards this message to a couple of their own peers to expand the pool of possible connections.  

To see which peers one is connected with (and associated data), use the `getpeerinfo` RPC.

{% endautocrossref %}

### Connecting To Peers

{% autocrossref %}

Connecting to a peer is done by sending a `version` message, which contains your version number, block, and current time to the remote node. Once the message is received by the remote node, it must respond with a `verack` message, which may be followed by its own `version` message if the node desires to peer. 

Once connected, the client can send to the remote node `getaddr` and `addr` messages to gather additional peers.

In order to maintain a connection with a peer, nodes by default will send a message to peers before 30 minutes of inactivity. If 90 minutes pass without a message being received by a peer, the client will assume that connection has closed.

{% endautocrossref %}

### Block Broadcasting

{% autocrossref %}

At the start of a connection with a peer, both nodes send `getblocks` messages containing the hash of the latest known block. If a peer believes they have newer blocks or a longer chain, that peer will send an `inv` message which includes a list of up to 500 hashes of newer blocks, stating that it has the longer chain. The receiving node would then request these blocks using the command `getdata`, and the remote peer would reply via `block`<!--noref--> messages. After all 500 blocks have been processed, the node can request another set with `getblocks`, until the node is caught up with the network. Blocks are only accepted when validated by the receiving node.

New blocks are also discovered as miners publish their found blocks, and these messages are propagated in a similar manner. Through previously established connections, an `inv` message is sent with the new block hashed, and the receiving node requests the block via the `getdata` message. 

{% endautocrossref %}

### Transaction Broadcasting

{% autocrossref %}

In order to send a transaction to a peer, an `inv` message is sent. If a `getdata` response message is received, the transaction is sent using `tx`. The peer receiving this transaction also forwards the transaction in the same manner, given that it is a valid transaction.

{% endautocrossref %}

#### Memory Pool

{% autocrossref %}

Full peers may keep track of unconfirmed transactions which are eligible to
be included in the next block. This is essential for miners who will
actually mine some or all of those transactions, but it's also useful
for any peer who wants to keep track of unconfirmed transactions, such
as peers serving unconfirmed transaction information to SPV clients.

Because unconfirmed transactions have no permanent status in Bitcoin,
Bitcoin Core stores them in non-persistent memory, calling them a memory
pool or mempool. When a peer shuts down, its memory pool is lost except
for any transactions stored by its wallet. This means that never-mined
unconfirmed transactions tend to slowly disappear from the network as
peers restart or as they purge some transactions to make room in memory
for others.

SPV clients don't have a memory pool for the same reason they don't
relay transactions. They can't independently verify that a transaction
hasn't yet been included in a block and that it only spends UTXOs, so
they can't know which transactions are eligible to be included in the
next block.

{% endautocrossref %}




### Misbehaving Nodes

{% autocrossref %}

Take note that for both types of broadcasting, mechanisms are in place to punish misbehaving peers who take up bandwidth and computing resources by sending false information. If a peer gets a banscore above the `-banscore=<n>` threshold, he will be banned for the number of seconds defined by `-bantime=<n>`, which is 86,400 by default (24 hours).

{% endautocrossref %}

### Alerts

{% autocrossref %}

In case of a bug or attack,
the Bitcoin Core developers provide a
[Bitcoin alert service](https://bitcoin.org/en/alerts) with an RSS feed
and users of Bitcoin Core can check the error field of the `getinfo` RPC
results to get currently active alerts for their specific version of
Bitcoin Core.

These messages are aggressively broadcast using the `alert` message, being sent to each peer upon connect for the duration of the alert. 

These messages are signed by a specific ECDSA private key that only a small number of developers control. 

**Resource:** More details about the structure of messages and a complete list of message types can be found at the [Protocol Specification](https://en.bitcoin.it/wiki/Protocol_specification) page of the Bitcoin Wiki.

{% endautocrossref %}
