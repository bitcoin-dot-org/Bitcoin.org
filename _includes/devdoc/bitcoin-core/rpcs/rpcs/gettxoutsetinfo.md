{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/gettxoutsetinfo.md" %}

##### GetTxOutSetInfo
{% include helpers/subhead-links.md %}

{% assign summary_getTxOutSetInfo="returns statistics about the confirmed unspent transaction output (UTXO) set. Note that this call may take some time and that it only counts outputs from confirmed transactions---it does not count outputs from the memory pool." %}

{% autocrossref %}

The `gettxoutsetinfo` RPC {{summary_getTxOutSetInfo}}

*Parameters: none*

*Result---statistics about the UTXO set*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "Information about the UTXO set"

- n: "→<br>`height`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of the local best block chain.  A new node with only the hardcoded genesis block will have a height of 0"

- n: "→<br>`bestblock`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the header of the highest block on the local best block chain, encoded as hex in RPC byte order"

- n: "→<br>`transactions`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of transactions with unspent outputs"

- n: "→<br>`txouts`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of unspent transaction outputs"

- n: "→<br>`bytes_serialized`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of the serialized UTXO set in bytes; not counting overhead, this is the size of the `chainstate` directory in the Bitcoin Core configuration directory"

- n: "→<br>`hash_serialized`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "A SHA256(SHA256()) hash of the serialized UTXO set; useful for comparing two nodes to see if they have the same set (they should, if they always used the same serialization format and currently have the same best block).  The hash is encoded as hex in RPC byte order"

- n: "→<br>`total_amount`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The total number of bitcoins in the UTXO set"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet gettxoutsetinfo
{% endhighlight %}

Result:

{% highlight json %}
{
    "height" : 315293,
    "bestblock" : "00000000c92356f7030b1deeab54b3b02885711320b4c48523be9daa3e0ace5d",
    "transactions" : 771920,
    "txouts" : 2734587,
    "bytes_serialized" : 102629817,
    "hash_serialized" : "4753470fda0145760109e79b8c218a1331e84bb4269d116857b8a4597f109905",
    "total_amount" : 13131746.33839451
}
{% endhighlight %}

*See also*

* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}
* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}}

{% endautocrossref %}
