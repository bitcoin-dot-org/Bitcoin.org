{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref_core_rpc_intro.md" %}

## Bitcoin Core APIs
{% include helpers/subhead-links.md %}

### Hash Byte Order
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin Core RPCs accept and return hashes in the reverse of their
normal byte order. For example, the Unix `sha256sum` command would display the
SHA256(SHA256()) hash of mainnet block 300,000's header as the
following string:

    5472ac8b1187bfcf91d6d218bbda1eb2405d7c55f1f8cc820000000000000000

The string above is also how the hash appears in the
previous-header-hash part of block 300,001's header:

<pre>02000000<b>5472ac8b1187bfcf91d6d218bbda1eb2405d7c55f1f8cc82000\
0000000000000</b>ab0aaa377ca3f49b1545e2ae6b0667a08f42e72d8c24ae\
237140e28f14f3bb7c6bcc6d536c890019edd83ccf</pre>

However Bitcoin RPCs use the reverse byte order for hashes, so if you
want to get information about block 300,000 using the `getblock` RPC,
you need to reverse the byte order:

    > bitcoin-cli getblock \
      000000000000000082ccf8f1557c5d40b21edabb18d2d691cfbf87118bac7254

(Note: hex representation uses two characters to display each byte of
data, which is why the reversed string looks somewhat mangled.)

The rational for the reversal is unknown, but it likely stems from
Bitcoin's use of hash digests (which are byte arrays in C++) as integers
for the purpose of determining whether the hash is below the network
target. Whatever the reason for reversing header hashes, the reversal
also extends to other hashes used in RPCs, such as TXIDs and merkle
roots. 

Off-site documentation such as the Bitcoin Wiki tends to use the terms
big endian and little endian as shown in the table below, but they
aren't always consistent. Worse, these two different ways of
representing a hash digest can confuse anyone who looks at the Bitcoin
Core source code and finds a so-called "big endian" value being stored
in a little-endian data type.

As header hashes and TXIDs are widely used as global identifiers in
other Bitcoin software, this reversal of hashes has become the standard
way to refer to certain objects. The table below should make clear where
each byte order is used.

|---------------+---------------------|-----------------|
| Data | Internal Byte Order ("Big Endian") | RPC Byte Order ("Little Endian") |
|---------------|---------------------|-----------------|
| Example: SHA256(SHA256(0x00))  | Hash: 1406...539a         | Hash: 9a53...0614     |
|---------------|---------------------|-----------------|
| Header Hashes: SHA256(SHA256(block header))  | Used when constructing block headers  | Used by RPCs such as `getblock`; widely used in block explorers |
|---------------|---------------------|-----------------|
| Merkle Roots: SHA256(SHA256(TXIDs and merkle rows))  | Used when constructing block headers  | Returned by RPCs such as `getblock` |
|---------------|---------------------|-----------------|
| TXIDs: SHA256(SHA256(transaction))  | Used in transaction inputs | Used by RPCs such as `gettransaction` and transaction data parts of `getblock`; widely used in wallet programs |
|---------------|---------------------|-----------------|
| P2PKH Hashes: RIPEMD160(SHA256(pubkey))  | Used in both addresses and pubkey scripts  | **N/A:** RPCs use addresses which use internal byte order |
|---------------|---------------------|-----------------|
| P2SH Hashes: RIPEMD160(SHA256(redeem script))  | Used in both addresses and pubkey scripts | **N/A:** RPCs use addresses which use internal byte order |
|---------------|---------------------|-----------------|

Note: RPCs which return raw results, such as `getrawtransaction` or the
raw mode of `getblock`, always display hashes as they appear in blocks
(internal byte order).

The code below may help you check byte order by generating hashes
from raw hex.
{% endautocrossref %}

{% highlight python %}
#!/usr/bin/env python

from sys import byteorder
from hashlib import sha256

## You can put in $data an 80-byte block header to get its header hash,
## or a raw transaction to get its txid
data = "00".decode("hex")
hash = sha256(sha256(data).digest()).digest()

print "Warning: this code only tested on a little-endian x86_64 arch"
print
print "System byte order:", byteorder
print "Internal-Byte-Order Hash: ", hash.encode('hex_codec')
print "RPC-Byte-Order Hash:      ", hash[::-1].encode('hex_codec')
{% endhighlight %}

### JSON-RPC & Bitcoin-CLI
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin Core provides a large number of Remote Procedure Calls (RPCs)
using a [HTTP JSON-RPC version 1.0][] interface. Any program can access
the RPCs using JSON-RPC, but Bitcoin Core also provides the
`bitcoin-cli` command to wrap the JSON-RPC access for Command Line
Interface (CLI) users. Most of the RPC examples in this documentation
use `bitcoin-cli` for simplicity, so this subsection describes raw
JSON-RPC interface and how the command-line interface translates it.

In order to start `bitcoind`, you will need to set a password for
JSON-RPC in the `bitcoin.conf` file. See the [Examples
Page][devexamples] for details. JSON-RPC starts on port 8332 for mainnet
and 18332 for testnet and regtest. By default, `bitcoind` doesn't use a
JSON-RPC user, but you can set one (see `bitcoind --help`).

RPCs are made using the standard JSON-RPC 1.0 syntax, which sends several
standard arguments:


| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| RPC                  | object          | Required<br>(exactly 1)     | An object containing the standard RPC arguments
| →`jsonrpc`           | number (float)  | Optional<br>(0 or 1)        | The version of JSON-RPC used.  Bitcoin Core currently ignores this, as it only supports version 1.0.  Default is `1.0`
| →`id`                | string          | Required<br>(exactly 1)     | An arbitrary string that will be returned when the response is sent.  May be set to an empty string ("")
| →`method`            | string          | Required<br>(exactly 1)     | The RPC, such as `getbestblockhash`.  See the RPC section for a list of available commands
| →`params`            | array           | Required<br>(exactly 1)     | An array containing parameters for the RPC.  May be an empty array if allowed by the particular RPC
| →→Parameter          | *any*           | Optional<br>(0 or more)     | A parameter.  May be any JSON type allowed by the particular RPC

In table above and in other tables describing JSON-RPC input<!--noref-->
and output<!--noref-->, we use the following formatting

* "→" to indicate an argument that is the child of a JSON array or
  JSON object. For example, "→→Parameter" above means Parameter
  is the child of the `params` array which itself is a child of the
  RPC array.

* "Plain Text" names (like "RPC" above) are unnamed in the actual
  JSON-RPC

* `literal` names (like `id` above) are the strings that appear in the
  actual JSON-RPC

* Type (specifics) are the general JSON-RPC type and the specific
  Bitcoin Core type

* Required/Optional describe whether a field must be returned within its
  containing array or object. (So an optional object may still have
  required children.)

For example, here is the JSON-RPC requesting the hash of the latest
block on the local best block chain:

{% highlight json %}
{
    "jsonrpc": "1.0",
    "id": "bitcoin.org developer documentation",
    "method": "getbestblockhash",
    "params": []
}
{% endhighlight %}

We can send that to a local Bitcoin Core running on testnet using cURL
with the following command:

{% highlight bash %}
curl --user ':your_password' --data-binary '''
  {
      "jsonrpc": "1.0",
      "id":"bitcoin.org developer documentation",
      "method": "getbestblockhash",
      "params": []
  }''' \
  -H 'content-type: text/plain;' http://127.0.0.1:18332/
{% endhighlight %}

The output<!--noref--> will be sent using the standard JSON-RPC 1.0
format. For example (whitespace added):

{% highlight json %}
{
    "result": "00000000bd68bfdf381efd5fff17c723d2bb645bcbb215a6e333d4204888e951",
    "error": null,
    "id": "bitcoin.org developer documentation"
}
{% endhighlight %}

The standard JSON-RPC 1.0 result format is described below:

| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| Result               | object          | Required<br>(exactly 1)     | An object describing the results
| →`result`            | *any*           | Required<br>(exactly 1)     | The results as any JSON data type.  If an error occured, set to `null`
| →`error`             | null/object     | Required<br>(exactly 1)     | If no error occurred, set to `null`.  If an error occured, an object describing the error
| →→`code`             | number (int)    | Required<br>(exactly 1)     | The error code as set by the returning function and defined in Bitcoin Core's [rpcprotocol.h][]
| →→`message`          | string          | Required<br>(exactly 1)     | An attempt to describe the problem in human-readable text.  May be an empty string ("").  Bitcoin Core often returns help text with embedded newline strings ("\n"); `bitcoin-cli` can expand these to actual newlines
| →`id`                | string          | Required<br>(exactly 1)     | The arbitrary string passed in when the RPC was called

For an example of the error output<!--noref-->, here's the result
after passing an invalid address to the `sendtoaddress` RPC
(whitespace added):

{% highlight json %}
{
    "result": null,
    "error": {
        "code": -5,
        "message": "Invalid Bitcoin address"
    },
    "id": "bitcoin.org developer documentation"
}
{% endhighlight %}

The `bitcoin-cli` command can save command line users a lot of typing
compared to using cURL or another HTTP-sending command. For example, to
get the block hash we got before, we would use the following command:

{% highlight bash %}
bitcoin-cli getbestblockhash
{% endhighlight %}

For non-error output<!--noref-->, `bitcoin-cli` will only display the
value of the `result` field, and if it's a string, `bitcoin-cli` will
remove its JSON quotation marks. For example, the result for the
command above:

{% highlight text %}
00000000bd68bfdf381efd5fff17c723d2bb645bcbb215a6e333d4204888e951
{% endhighlight %}

For errors, `bitcoin-cli` will display only the `error` object.  For
example, the result of the invalid address command above as formatted by
`bitcoin-cli`:

{% highlight json %}
error: {"code":-5,"message":"Invalid Bitcoin address"}
{% endhighlight %}

Because `bitcoin-cli` abstracts away the parts of JSON-RPC we would need
to repeatedly describe in each RPC description below, we describe the
Bitcoin Core RPCs using `bitcoin-cli`. However, using an actual
programming interface to the full JSON-RPC will serve you much better
for automated tasks.

![Warning icon](/img/icons/icon_warning.svg) **Warning:** if you write
programs using the JSON-RPC interface, you must ensure they handle high-precision
floating point numbers correctly.  See the [Proper Money Handling][]
Bitcoin Wiki article for details and example code.

{% endautocrossref %}

### Remote Procedure Calls (RPCs)
{% include helpers/subhead-links.md %}

**Warning:** the block chain and memory pool can include arbitrary data
which several of the commands below will return in hex format. If you
convert this data to another format in an executable context, it could
be used in an exploit. For example, displaying an output script as
ASCII text in a webpage could add arbitrary Javascript to that page and
create a cross-site scripting (XSS) exploit. To avoid problems, please
treat block chain and memory pool data as an arbitrary input from an
untrusted source.
