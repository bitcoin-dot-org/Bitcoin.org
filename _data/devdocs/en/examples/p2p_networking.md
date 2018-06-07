{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/examples/p2p_networking.md" %}

## P2P Network
{% include helpers/subhead-links.md %}

### Creating A Bloom Filter
{% include helpers/subhead-links.md %}

{% autocrossref %}

In this section, we'll use variable names that correspond to the field
names in the [`filterload` message documentation][filterload message].
Each code block precedes the paragraph describing it.

{% highlight python %}
#!/usr/bin/env python

BYTES_MAX = 36000
FUNCS_MAX = 50

nFlags = 0
{% endhighlight %}

We start by setting some maximum values defined in BIP37: the maximum
number of bytes allowed in a filter and the maximum number of hash
functions used to hash each piece of data.  We also set nFlags to zero,
indicating we don't want the remote node to update the filter for us.
(We won't use nFlags again in the sample program, but real programs will
need to use it.)

{% highlight python %}
n = 1
p = 0.0001
{% endhighlight %}

We define the number (n) of elements we plan to insert into the filter
and the false positive rate (p) we want to help protect our privacy. For
this example, we will set *n* to one element and *p* to a rate of
1-in-10,000 to produce a small and precise filter for illustration
purposes. In actual use, your filters will probably be much larger.

{% highlight python %}
from math import log
nFilterBytes = int(min((-1 / log(2)**2 * n * log(p)) / 8, BYTES_MAX))
nHashFuncs = int(min(nFilterBytes * 8 / n * log(2), FUNCS_MAX))

from bitarray import bitarray  # from pypi.python.org/pypi/bitarray
vData = nFilterBytes * 8 * bitarray('0', endian="little")
{% endhighlight %}

Using the formula described in BIP37, we calculate the ideal size of the
filter (in bytes) and the ideal number of hash functions to use. Both
are truncated down to the nearest whole number and both are also
constrained to the maximum values we defined earlier. The results of
this particular fixed computation are 2 filter bytes and 11 hash
functions. We then use *nFilterBytes* to create a little-endian bit
array of the appropriate size.

{% highlight python %}
nTweak = 0
{% endhighlight %}

We also should choose a value for *nTweak*.  In this case, we'll simply
use zero.

{% highlight python %}
import pyhash  # from https://github.com/flier/pyfasthash
murmur3 = pyhash.murmur3_32()

def bloom_hash(nHashNum, data):
    seed = (nHashNum * 0xfba4c795 + nTweak) & 0xffffffff
    return( murmur3(data, seed=seed) % (nFilterBytes * 8) )
{% endhighlight %}

We setup our hash function template using the formula and 0xfba4c795
constant set in BIP37. Note that we limit the size of the seed to four
bytes and that we're returning the result of the hash modulo the size of
the filter in bits.

{% highlight python %}
data_to_hash = "019f5b01d4195ecbc9398fbf3c3b1fa9" \
               + "bb3183301d7a1fb3bd174fcfa40a2b65"
data_to_hash = data_to_hash.decode("hex")
{% endhighlight %}

For the data to add to the filter, we're adding a TXID. Note that the
TXID is in internal byte order.

{% highlight python %}
print "                             Filter (As Bits)"
print "nHashNum   nIndex   Filter   0123456789abcdef"
print "~~~~~~~~   ~~~~~~   ~~~~~~   ~~~~~~~~~~~~~~~~"
for nHashNum in range(nHashFuncs):
    nIndex = bloom_hash(nHashNum, data_to_hash)

    ## Set the bit at nIndex to 1
    vData[nIndex] = True

    ## Debug: print current state
    print '      {0:2}      {1:2}     {2}   {3}'.format(
        nHashNum,
        hex(int(nIndex)),
        vData.tobytes().encode("hex"),
        vData.to01()
    )

print
print "Bloom filter:", vData.tobytes().encode("hex")
{% endhighlight %}

Now we use the hash function template to run a slightly different hash
function for *nHashFuncs* times. The result of each function being run
on the transaction is used as an index number: the bit at that index is
set to 1. We can see this in the printed debugging output:

{% highlight text %}
                             Filter (As Bits)
nHashNum   nIndex   Filter   0123456789abcdef
~~~~~~~~   ~~~~~~   ~~~~~~   ~~~~~~~~~~~~~~~~
       0      0x7     8000   0000000100000000
       1      0x9     8002   0000000101000000
       2      0xa     8006   0000000101100000
       3      0x2     8406   0010000101100000
       4      0xb     840e   0010000101110000
       5      0x5     a40e   0010010101110000
       6      0x0     a50e   1010010101110000
       7      0x8     a50f   1010010111110000
       8      0x5     a50f   1010010111110000
       9      0x8     a50f   1010010111110000
      10      0x4     b50f   1010110111110000

Bloom filter: b50f
{% endhighlight %}

Notice that in iterations 8 and 9, the filter did not change because the
corresponding bit was already set in a previous iteration (5 and 7,
respectively).  This is a normal part of bloom filter operation.

We only added one element to the filter above, but we could repeat the
process with additional elements and continue to add them to the same
filter. (To maintain the same false-positive rate, you would need a
larger filter size as computed earlier.)

Note: for a more optimized Python implementation with fewer external
dependencies, see [python-bitcoinlib's][python-bitcoinlib] bloom filter
module which is based directly on Bitcoin Core's C++ implementation.

Using the `filterload` message format, the complete filter created above 
would be the binary form of the annotated hexdump shown below:

{% highlight text %}
02 ......... Filter bytes: 2
b50f ....... Filter: 1010 1101 1111 0000
0b000000 ... nHashFuncs: 11
00000000 ... nTweak: 0/none
00 ......... nFlags: BLOOM_UPDATE_NONE
{% endhighlight %}

{% endautocrossref %}

### Evaluating A Bloom Filter
{% include helpers/subhead-links.md %}

{% autocrossref %}

Using a bloom filter to find matching data is nearly identical to
constructing a bloom filter---except that at each step we check to see
if the calculated index bit is set in the existing filter.

{% highlight python %}
vData = bitarray(endian='little')
vData.frombytes("b50f".decode("hex"))
nHashFuncs = 11
nTweak = 0
nFlags = 0
{% endhighlight %}

Using the bloom filter created above, we import its various parameters.
Note, as indicated in the section above, we won't actually use *nFlags*
to update the filter.

{% highlight python %}
def contains(nHashFuncs, data_to_hash):
    for nHashNum in range(nHashFuncs):
        ## bloom_hash as defined in previous section
        nIndex = bloom_hash(nHashNum, data_to_hash)

        if vData[nIndex] != True:
            print "MATCH FAILURE: Index {0} not set in {1}".format(
                hex(int(nIndex)),
                vData.to01()
            )
            return False
{% endhighlight %}

We define a function to check an element against the provided filter.
When checking whether the filter might contain an element, we test to
see whether a particular bit in the filter is already set to 1 (if it
isn't, the match fails).

{% highlight python %}
## Test 1: Same TXID as previously added to filter
data_to_hash = "019f5b01d4195ecbc9398fbf3c3b1fa9" \
               + "bb3183301d7a1fb3bd174fcfa40a2b65"
data_to_hash = data_to_hash.decode("hex")
contains(nHashFuncs, data_to_hash)
{% endhighlight %}

Testing the filter against the data element we previously added, we get
no output (indicating a possible match).  Recall that bloom filters have
a zero false negative rate---so they should always match the inserted
elements.

{% highlight python %}
## Test 2: Arbitrary string
data_to_hash = "1/10,000 chance this ASCII string will match"
contains(nHashFuncs, data_to_hash)
{% endhighlight %}

Testing the filter against an arbitrary element, we get the failure
output below.  Note: we created the filter with a 1-in-10,000 false
positive rate (which was rounded up somewhat when we truncated), so it
was possible this arbitrary string would've matched the filter anyway.
It is not possible to set a bloom filter to a false positive rate of
zero, so your program will always have to deal with false positives.
The output below shows us that one of the hash functions returned an
index number of 0x06, but that bit wasn't set in the filter, causing the
match failure:

{% highlight text %}
MATCH FAILURE: Index 0x6 not set in 1010110111110000
{% endhighlight %}

{% endautocrossref %}

### Retrieving A MerkleBlock
{% include helpers/subhead-links.md %}

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
send("filterload", 
      "02"  # ........ Filter bytes: 2
    + "b50f" # ....... Filter: 1010 1101 1111 0000
    + "0b000000" # ... nHashFuncs: 11
    + "00000000" # ... nTweak: 0/none
    + "00" # ......... nFlags: BLOOM_UPDATE_NONE
)
{% endhighlight %}

We set a bloom filter with the `filterload` message. This filter is
described in the two preceeding sections.

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
{% include helpers/subhead-links.md %}

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

The final steps would be to ensure the computed merkle root
is identical to the merkle root in the header and check the other steps
of the parsing checklist in the `merkleblock` message section.

{% endautocrossref %}
