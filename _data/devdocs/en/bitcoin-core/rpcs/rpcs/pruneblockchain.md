{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/pruneblockchain.md" %}

##### PruneBlockChain
{% include helpers/subhead-links.md %}

{% assign summary_pruneBlockChain="does PruneBlockChain." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

The `pruneblockchain` RPC {{summary_pruneBlockChain}}

*Parameter #1---height*

{% itemplate ntpd1 %}
- n: "height"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The block height to prune up to. May be set to a discrete height, or a unix timestamp
       to prune blocks whose block time is at least 2 hours older than the provided timestamp."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "Height of the last block pruned."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli pruneblockchain 1000
{% endhighlight %}

*See also*

* [ImportPrunedFunds][rpc importprunedfunds]: {{summary_importPrunedFunds}}

{% endautocrossref %}
