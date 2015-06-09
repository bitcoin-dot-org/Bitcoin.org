{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getmempoolinfo.md" %}

##### GetMemPoolInfo
{% include helpers/subhead-links.md %}

{% assign summary_getMemPoolInfo="returns information about the node's current transaction memory pool." %}

{% autocrossref %}

*Added in Bitcoin Core 0.10.0*

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

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getmempoolinfo
{% endhighlight %}

Result:

{% highlight json %}
{
    "size" : 37,
    "bytes" : 9423
}
{% endhighlight %}

*See also*

* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}

{% endautocrossref %}
