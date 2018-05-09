{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/rescanblockchain.md" %}

##### RescanBlockchain
{% include helpers/subhead-links.md %}

{% assign summary_rescanblockchain="Rescan the local blockchain for wallet related transactions with start and end-height arguments support, and can be used in a multiwallet environment to rescan the blockchain at runtime." %}

{% autocrossref %}

*Added in Bitcoin Core 0.16.0*

The `rescanblockchain` RPC {{summary_rescanblockchain}}

*Parameter #1---a start height (block number)*

{% itemplate ntpd1 %}
- n: "start_height"
  t: "number (int)"
  p: "optional"
  d: "block height where the rescan should start"
{% enditemplate %}

*Parameter #2---a end height (block number)*

{% itemplate ntpd1 %}
- n: "end_height"
  t: "number (int)"
  p: "optional"
  d: "the last block height that should be scanned"
{% enditemplate %}


*Example from Bitcoin Core 0.16.0*

Rescan blockchain blocks starts from block 25000 ends on block 50000

{% highlight bash %}
bitcoin-cli rescanblockchain 25000 50000
{% endhighlight %}

{% endautocrossref %}
