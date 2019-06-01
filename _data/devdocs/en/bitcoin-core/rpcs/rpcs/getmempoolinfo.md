{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempoolinfo.md" %}

##### GetMemPoolInfo
{% include helpers/subhead-links.md %}

{% assign summary_getMemPoolInfo="returns details on the active state of the TX memory pool." %}

{% autocrossref %}

The `getmempoolinfo` RPC {{summary_getMemPoolInfo}}

*Parameters: none*

*Result*

{% endautocrossref %}

    {
      "size": xxxxx,               (numeric) Current tx count
      "bytes": xxxxx,              (numeric) Sum of all virtual transaction sizes as defined in BIP 141. Differs from actual serialized size because witness data is discounted
      "usage": xxxxx,              (numeric) Total memory usage for the mempool
      "maxmempool": xxxxx,         (numeric) Maximum memory usage for the mempool
      "mempoolminfee": xxxxx       (numeric) Minimum fee rate in BTC/kB for tx to be accepted. Is the maximum of minrelaytxfee and minimum mempool fee
      "minrelaytxfee": xxxxx       (numeric) Current minimum relay fee for transactions
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getmempoolinfo
{% endhighlight %}

*See also*

* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}

{% endautocrossref %}
