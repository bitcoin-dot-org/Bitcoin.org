{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getbestblockhash.md" %}

##### GetBestBlockHash
{% include helpers/subhead-links.md %}

{% assign summary_getBestBlockHash="returns the hash of the best (tip) block in the longest blockchain." %}

{% autocrossref %}

The `getbestblockhash` RPC {{summary_getBestBlockHash}}

*Parameters: none*

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "the block hash, hex-encoded"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli getbestblockhash
{% endhighlight %}

*See also*

* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}

{% endautocrossref %}
