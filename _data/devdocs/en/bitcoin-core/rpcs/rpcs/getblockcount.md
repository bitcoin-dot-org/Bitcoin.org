{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockcount.md" %}

##### GetBlockCount
{% include helpers/subhead-links.md %}

{% assign summary_getBlockCount="returns the number of blocks in the longest blockchain." %}

{% autocrossref %}

The `getblockcount` RPC {{summary_getBlockCount}}

*Parameters: none*

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The current block count"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli getblockcount
{% endhighlight %}

*See also*

* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}
* [GetBlock][rpc getblock]: {{summary_getBlock}}

{% endautocrossref %}
