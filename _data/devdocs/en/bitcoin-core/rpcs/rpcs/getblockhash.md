{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockhash.md" %}

##### GetBlockHash
{% include helpers/subhead-links.md %}

{% assign summary_getBlockHash="returns hash of block in best-block-chain at height provided." %}

{% autocrossref %}

The `getblockhash` RPC {{summary_getBlockHash}}

*Parameter #1---height*

{% itemplate ntpd1 %}
- n: "height"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height index"

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The block hash"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli getblockhash 1000
{% endhighlight %}

*See also*

* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBestBlockHash][rpc getbestblockhash]: {{summary_getBestBlockHash}}

{% endautocrossref %}
