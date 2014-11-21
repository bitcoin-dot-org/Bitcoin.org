{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

## P2P Network

{% autocrossref %}

The Bitcoin network protocol allows full nodes
([peers][peer]{:#term-peer}{:.term}) to collaboratively maintain a
[peer-to-peer network][network]{:#term-network}{:.term} for block and
transaction exchange. Many SPV clients also use this protocol to connect
to full nodes.

Consensus rules do not cover networking, so Bitcoin programs may use
alternative networks and protocols, such as the [high-speed block relay
network][] used by some miners and the [dedicated transaction
information servers][electrum server] used by some wallets that provide
SPV-level security.

To provide practical examples of the Bitcoin peer-to-peer network, this
section uses Bitcoin Core as a representative full node and [BitcoinJ][]
as a representative SPV client. Both programs are flexible, so only
default behavior is described. Also, for privacy, actual IP addresses
in the example output below have been replaced with [RFC5737][] reserved
IP addresses.

{% endautocrossref %}

### Peer Discovery

{% autocrossref %}

When started for the first time, programs don't know the IP
addresses of any active full nodes. In order to discover some IP
addresses, they query one or more DNS names (called [DNS seeds][dns
seed]{:#term-dns-seed}{:.term}) hardcoded into Bitcoin Core and
BitcoinJ. The response to the lookup should include one or more [DNS
A records][] with the IP addresses of full nodes that may accept new
incoming connections. For example, using the [Unix `dig`
command][dig command]:

    ;; QUESTION SECTION:
    ;seed.bitcoin.sipa.be.	    IN  A

    ;; ANSWER SECTION:
    seed.bitcoin.sipa.be.	60  IN  A  192.0.2.113
    seed.bitcoin.sipa.be.	60  IN  A  198.51.100.231
    seed.bitcoin.sipa.be.	60  IN  A  203.0.113.183
    [...]

The DNS seeds are maintained by Bitcoin community members: some of them
provide dynamic DNS seed servers which automatically get IP addresses
of active nodes by scanning the network; others provide static DNS
seeds that are updated manually and are more likely to provide IP
addresses for inactive nodes. In either case, nodes are added to the
DNS seed if they run on the default Bitcoin ports of 8333 for mainnet
or 18333 for testnet.

<!-- paragraph below based on Greg Maxwell's email in
     http://comments.gmane.org/gmane.comp.bitcoin.devel/5378 -->

DNS seed results are not authenticated and a malicious seed operator or
network man-in-the-middle attacker can return only IP addresses of
nodes controlled by the attacker, isolating a program on the attacker's
own network and allowing the attacker to feed it bogus transactions and
blocks.  For this reason, programs should not rely on DNS seeds
exclusively.

Once a program has connected to the network, its peers can begin to send
it [`addr`][addr message]{:#term-addr-message}{:.term}
(address<!--noref-->) messages with the IP addresses and port numbers of
other peers on the network, providing a fully decentralized method of
peer discovery. Bitcoin Core keeps a record of known peers in a
persistent on-disk database which usually allows it to connect directly
to those peers on subsequent startups without having to use DNS seeds.

However, peers often leave the network or change IP addresses, so
programs may need to make several different connection attempts at
startup before a successful connection is made. This can add a
significant delay to the amount of time it takes to connect to the
network, forcing a user to wait before sending a transaction or checking
the status of payment.

<!-- reference for "Bitcoin Core...11 seconds" below:
     https://github.com/bitcoin/bitcoin/pull/4559 -->

To avoid this possible delay, BitcoinJ always uses dynamic DNS seeds to
get IP addresses for nodes believed to be currently active.
Bitcoin Core also tries to strike a balance between minimizing delays
and avoiding unnecessary DNS seed use: if Bitcoin Core has entries in
its peer database, it spends up to 11 seconds attempting to connect to
at least one of them before falling back to seeds; if a connection is
made within that time, it does not query any seeds.

<!-- reference for Bitcoin Core behavior described below: search for
"FixedSeeds" in src/net.cpp; BitcoinJ has IPv4 seeds in its chainparams
and a function to use them, but I don't see that function being used in
any of the examples/wallet templates (but I'm not Java fluent, so
maybe PEBKAC). -@harding -->

Both Bitcoin Core and BitcoinJ also include a hardcoded list of IP
addresses and port numbers to several dozen nodes which were active
around the time that particular version of the software was first
released. Bitcoin Core will start attempting to connect to these nodes
if none of the DNS seed servers have responded to a query within 60
seconds, providing an automatic fallback option.

As a manual fallback option, Bitcoin Core also provides several
command-line connection options, including the ability to get a list of
peers from a specific node by IP address, or to make a persistent
connection to a specific node by IP address.  See the `-help` text for
details.  BitcoinJ can be programmed to do the same thing.

**Resources:** [Bitcoin Seeder][], the program run by several of the
seeds used by Bitcoin Core and BitcoinJ. The Bitcoin Core [DNS Seed
Policy][].  The hardcoded list of IP addresses used by Bitcoin Core and
BitcoinJ is generated using the [makeseeds script][].

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

Transactions which are mined into blocks that are later orphaned may be
added back into the memory pool. These re-added transactions may be
re-removed from the pool almost immediately if the replacement blocks
include them. This is the case in Bitcoin Core, which removes orphaned
blocks from the chain one by one, starting with the tip (highest block).
As each block is removed, its transactions are added back to the memory
pool. After all of the orphaned blocks are removed, the replacement
blocks are added to the chain one by one, ending with the new tip. As
each block is added, any transactions it confirms are removed from the
memory pool.

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
