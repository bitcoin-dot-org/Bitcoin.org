{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getblockhash.md" %}

##### GetBlockHash
{% include helpers/subhead-links.md %}

{% assign summary_getBlockHash="returns the header hash of a block at the given height in the local best block chain." %}

{% autocrossref %}

The `getblockhash` RPC {{summary_getBlockHash}}

*Parameter---a block height*

{{json_table}}

* Block Height
* number (int)
* Required (exactly 1)
* The height of the block whose header hash should be returned.  The height of the hardcoded genesis block is 0

*Result---the block header hash*

{{json_table}}

* `result`
* string (hex)/null
* Required (exactly 1)
* The hash of the block at the requested height, encoded as hex in RPC byte order, or JSON `null` if an error occurred

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getblockhash 240886
{% endhighlight %}

Result:

{% highlight text %}
00000000a0faf83ab5799354ae9c11da2a2bd6db44058e03c528851dee0a3fff
{% endhighlight %}

*See also*

* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBestBlockHash][rpc getbestblockhash]: {{summary_getBestBlockHash}}

{% endautocrossref %}
