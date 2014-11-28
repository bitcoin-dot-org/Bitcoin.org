{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

## P2P Network

### Retrieving A MerkleBlock

{% autocrossref %}

For the `merkleblock` message documentation on the reference page, an
actual merkle block was retrieved from the network and manually
processed.  This section walks through each step of the process,
demonstrating basic network communication and merkle block processing.

{% highlight python %}

#!/usr/bin/env python

from time import sleep
from hashlib import sha256
import struct
import sys

network_string = "f9beb4d9".decode("hex")  # Mainnet

def send(msg,payload):
    ## Command is ASCII text, null padded to 12 bytes
    command = msg + ( ( 12 - len(msg) ) * "\00" )

    ## Payload length is a uint32_t
    payload_raw = payload.decode("hex")
    payload_len = struct.pack("I", len(payload_raw))

    ## Checksum is first 4 bytes of SHA256(SHA256(<payload>))
    checksum = sha256(sha256(payload_raw).digest()).digest()[:4]

    sys.stdout.write(
        network_string
        + command
        + payload_len
        + checksum
        + payload_raw
    )
    sys.stdout.flush()
{% endhighlight %}

To connect to the P2P network, the trivial Python function above was
developed to compute message headers and send payloads decoded from hex.

{% highlight python %}
## Create a version message
send("version",
      "71110100" # ........................ Protocol Version: 70001
    + "0000000000000000" # ................ Services: Headers Only (SPV)
    + "c6925e5400000000" # ................ Time: 1415484102
    + "00000000000000000000000000000000"
    + "0000ffff7f000001208d" # ............ Receiver IP Address/Port
    + "00000000000000000000000000000000"
    + "0000ffff7f000001208d" # ............ Sender IP Address/Port
    + "0000000000000000" # ................ Nonce (not used here)
    + "1b" # .............................. Bytes in version string
    + "2f426974636f696e2e6f726720457861"
    + "6d706c653a302e392e332f" # .......... Version string
    + "93050500" # ........................ Starting block height: 329107
    + "00" # .............................. Relay transactions: false
)
{% endhighlight %}

Peers on the network will not accept any requests until you send them a
`version` message. The receiving node will reply with their `version`
message and a `verack` message.

{% highlight python %}
sleep(1)
send("verack", "")
{% endhighlight %}

We're not going to validate their `version` message with this simple
script, but we will sleep a short bit and send back our own `verack`
message as if we had accepted their `version` message.

{% highlight python %}
send("filterload", "02b50f0b0000000000000000")
{% endhighlight %}

We set a bloom filter with the `filterload` message. This filter was
quickly created using [python-bitcoinlib][]'s bloom module. <!-- TODO:
consider expanding this section once filterload has been documented. -->

{% highlight python %}
send("getdata",
      "01" # ................................. Number of inventories: 1
    + "03000000" # ........................... Inventory type: filtered block
    + "a4deb66c0d726b0aefb03ed51be407fb"
    + "ad7331c6e8f9eef231b7000000000000" # ... Block header hash
)
{% endhighlight %}

We request a merkle block for transactions matching our filter,
completing our script.

To run the script, we simply pipe it to the Unix [`netcat`
command][netcat] or one of its many clones, one of which is available
for practically any platform. For example, with the original netcat and
using hexdump (`hd`) to display the output:

{% highlight bash %}
## Connect to the Bitcoin Core peer running on localhost
python get-merkle.py | nc localhost 8333 | hd
{% endhighlight %}

Part of the response is shown in the section below.

{% endautocrossref %}

### Parsing A MerkleBlock

{% autocrossref %}

In the section above, we retrieved a merkle block from the network; now
we will parse it. Most of the block header has been omitted. For
a more complete hexdump, see the example in the [`merkleblock` message
section][merkleblock message].

{% highlight text %}
7f16c5962e8bd963659c793ce370d95f
093bc7e367117b3c30c1f8fdd0d97287 ... Merkle root

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

We parse the above `merkleblock` message using the following
instructions.  Each illustration is described in the paragraph below it.

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-001.svg)

We start by building the structure of a merkle tree based on the number
of transactions in the block.

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-002.svg)

The first flag is a 1 and the merkle root is (as always) a non-TXID
node, so we will need to compute the hash later based on this node's
children. Accordingly, we descend into the merkle root's left child and
look at the next flag for instructions.

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-003.svg)

The next flag in the example is a 0 and this is also a non-TXID node, so
we apply the first hash from the `merkleblock` message to this node. We
also don't process any child nodes---according to the peer which created
the `merkleblock` message, none of those nodes will lead to TXIDs of
transactions that match our filter, so we don't need them. We go back up
to the merkle root and then descend into its right child and look at the
next (third) flag for instructions.

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-004.svg)

The third flag in the example is another 1 on another non-TXID node, so
we descend into its left child.

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-005.svg)

The fourth flag is also a 1 on another non-TXID node, so we descend
again---we will always continue descending until we reach a TXID node or
a non-TXID node with a 0 flag (or we finish filling out the tree).

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-006.svg)

Finally, on the fifth flag in the example (a 1), we reach a TXID node.
The 1 flag indicates this TXID's transaction matches our filter and
that we should take the next (second) hash and use it as this node's
TXID. 

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-007.svg)

The sixth flag also applies to a TXID, but it's a 0 flag, so this
TXID's transaction doesn't match our filter; still, we take the next
(third) hash and use it as this node's TXID.

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-008.svg)

We now have enough information to compute the hash for the fourth node
we encountered---it's the hash of the concatenated hashes of the two
TXIDs we filled out.

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-009.svg)

Moving to the right child of the third node we encountered, we fill it
out using the seventh flag and final hash---and discover there are no
more child nodes to process.

![Parsing A MerkleBlock](/img/dev/gifs/en-merkleblock-parsing/en-merkleblock-parsing-011.svg)

We hash as appropriate to fill out the tree.  Note that the eighth flag is
not used---this is acceptable as it was required to pad out a flag byte.

The final steps would be to ensure the computed computed merkle root
is identical to the merkle root in the header and check the other steps
of the parsing checklist in the `merkleblock` message section.

{% endautocrossref %}
