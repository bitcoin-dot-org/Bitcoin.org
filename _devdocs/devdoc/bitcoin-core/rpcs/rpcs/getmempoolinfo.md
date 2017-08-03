{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getmempoolinfo.md" %}

##### GetMemPoolInfo
{% include helpers/subhead-links.md %}

{% assign summary_getMemPoolInfo="returns information about the node's current transaction memory pool." %}

{% autocrossref %}

The `getmempoolinfo` RPC {{summary_getMemPoolInfo}}

*Parameters: none*

*Result---information about the transaction memory pool*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "A object containing information about the memory pool"

- n: "→<br>`size`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of transactions currently in the memory pool"

- n: "→<br>`bytes`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total number of bytes in the transactions in the memory pool"

- n: "→<br>`usage`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.11.0*<br><br>Total memory usage for the mempool in bytes"

- n: "→<br>`maxmempool`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>Maximum memory usage for the mempool in bytes"

- n: "→<br>`mempoolminfee`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>The lowest fee per kilobyte paid by any transaction in the memory pool"

{% enditemplate %}

*Example from Bitcoin Core 0.14.1*

{% highlight bash %}
bitcoin-cli -testnet getmempoolinfo
{% endhighlight %}

Result:

{% highlight json %}
{
  "size": 1237,
  "bytes": 591126,
  "usage": 1900416,
  "maxmempool": 300000000,
  "mempoolminfee": 0.00000000
}
{% endhighlight %}

*See also*

* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}

{% endautocrossref %}
