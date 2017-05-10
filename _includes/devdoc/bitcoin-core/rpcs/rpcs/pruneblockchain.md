{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/pruneblockchain.md" %}

##### PruneBlockChain
{% include helpers/subhead-links.md %}

{% assign summary_pruneBlockChain="prunes the blockchain up to a specified height or timestamp." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

The `pruneblockchain` RPC {{summary_pruneBlockChain}} The `-prune` option needs to be enabled (disabled by default).

*Parameter #1---the block height or timestamp*

{% itemplate ntpd1 %}
- n: "Height"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The block height to prune up to. May be set to a particular height, or a unix timestamp to prune blocks whose block time is at least 2 hours older than the provided timestamp"

{% enditemplate %}

*Result---the height of the last block pruned*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of the last block pruned"

{% enditemplate %}

*Examples from Bitcoin Core 0.14.1*

{% highlight bash %}
bitcoin-cli pruneblockchain 413555
{% endhighlight %}

Result:

{% highlight text %}
413555
{% endhighlight %}

*See also*

* [ImportPrunedFunds][rpc importprunedfunds]: {{summary_importPrunedFunds}}

{% endautocrossref %}
