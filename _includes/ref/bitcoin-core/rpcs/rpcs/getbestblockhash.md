{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getbestblockhash.md" %}

##### GetBestBlockHash
{% include helpers/subhead-links.md %}

{% assign summary_getBestBlockHash="returns the header hash of the most recent block on the best block chain." %}

{% autocrossref %}

*Added in Bitcoin Core 0.9.0*

The `getbestblockhash` RPC {{summary_getBestBlockHash}}

*Parameters: none*

*Result---hash of the tip from the best block chain*

{{json_table}}

* `result`
* string (hex)
* Required (exactly 1)
* The hash of the block header from the most recent block on the best block chain, encoded as hex in RPC byte order

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getbestblockhash
{% endhighlight %}

Result:

{% highlight text %}
0000000000075c58ed39c3e50f99b32183d090aefa0cf8c324a82eea9b01a887
{% endhighlight %}

*See also*

* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}

{% endautocrossref %}
