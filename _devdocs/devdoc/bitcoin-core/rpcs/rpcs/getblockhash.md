{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getblockhash.md" %}

##### GetBlockHash
{% include helpers/subhead-links.md %}

{% assign summary_getBlockHash="returns the header hash of a block at the given height in the local best block chain." %}

{% autocrossref %}

The `getblockhash` RPC {{summary_getBlockHash}}

*Parameter---a block height*

{% itemplate ntpd1 %}
- n: "Block Height"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of the block whose header hash should be returned.  The height of the hardcoded genesis block is 0"

{% enditemplate %}

*Result---the block header hash*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)/null"
  p: "Required<br>(exactly 1)"
  d: "The hash of the block at the requested height, encoded as hex in RPC byte order, or JSON `null` if an error occurred"

{% enditemplate %}

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
