{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getmininginfo.md" %}

##### GetMiningInfo
{% include helpers/subhead-links.md %}

{% assign summary_getMiningInfo="returns various mining-related information." %}

{% autocrossref %}

The `getmininginfo` RPC {{summary_getMiningInfo}}

*Parameters: none*

*Result---various mining-related information*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "Various mining-related information"

- n: "→<br>`blocks`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of the highest block on the local best block chain"

- n: "→<br>`currentblocksize`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "If generation was enabled since the last time this node was restarted, this is the size in bytes of the last block built by this node for header hash checking.  Otherwise, the value `0`"

- n: "→<br>`currentblocktx`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "If generation was enabled since the last time this node was restarted, this is the number of transactions in the last block built by this node for header hash checking.  Otherwise, this is the value `0`"

- n: "→<br>`difficulty`"
  t: "number (real)"
  p: "Required<br>(exactly 1)"
  d: "If generation was enabled since the last time this node was restarted, this is the difficulty of the highest-height block in the local best block chain.  Otherwise, this is the value `0`"

- n: "→<br>`errors`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "A plain-text description of any errors this node has encountered or detected.  If there are no errors, an empty string will be returned.  This is not related to the JSON-RPC `error` field"

- n: "→<br>`genproclimit`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Removed in Bitcoin Core 0.13.0*<br><br>The limit on the number of processors to use for generation.  If generation was enabled since the last time this node was restarted, this is the number used in the second parameter of the `setgenerate` RPC (or the default).  Otherwise, it is `-1`"

- n: "→<br>`networkhashps`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "An estimate of the number of hashes per second the network is generating to maintain the current difficulty.  See the `getnetworkhashps` RPC for configurable access to this data"

- n: "→<br>`pooledtx`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of transactions in the memory pool"

- n: "→<br>`testnet`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "*Removed in Bitcoin Core 0.14.0*<br><br>Set to `true` if this node is running on testnet.  Set to `false` if this node is on mainnet or a regtest"

- n: "→<br>`chain`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "Set to `main` for mainnet, `test` for testnet, and `regtest` for regtest"

- n: "→<br>`generate`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "*Removed in Bitcoin Core 0.13.0*<br><br>Set to `true` if generation is currently enabled; set to `false` if generation is currently disabled.  Only returned if the node has wallet support enabled"

- n: "→<br>`hashespersec`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "*Removed in Bitcoin Core 0.11.0*<br><br>The approximate number of hashes per second this node is generating across all CPUs, if generation is enabled.  Otherwise `0`.  Only returned if the node has wallet support enabled"

{% enditemplate %}

*Example from Bitcoin Core 0.14.1*

{% highlight bash %}
bitcoin-cli getmininginfo
{% endhighlight %}

Result:

{% highlight json %}
{
    "blocks": 464545,
    "currentblocksize": 0,
    "currentblockweight": 0,
    "currentblocktx": 0,
    "difficulty": 521974519553.6282,
    "errors": "",
    "networkhashps": 4.126888339085874e+18,
    "pooledtx": 31241,
    "chain": "main"
}
{% endhighlight %}

*See also*

* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}
* [Generate][rpc generate]: {{summary_generate}}

{% endautocrossref %}
