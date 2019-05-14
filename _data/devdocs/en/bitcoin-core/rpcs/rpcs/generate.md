{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/generate.md" %}

##### Generate
{% include helpers/subhead-links.md %}

{% assign summary_generate="mine up to nblocks blocks immediately (before the RPC call returns) to an address in the wallet." %}

{% autocrossref %}

*Added in Bitcoin Core 0.11.0*

The `generate` RPC {{summary_generate}}

*Parameter #1---nblocks*

{% itemplate ntpd1 %}
- n: "nblocks"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "How many blocks are generated immediately."

{% enditemplate %}

*Parameter #2---maxtries*

{% itemplate ntpd1 %}
- n: "maxtries"
  t: "number (int)"
  p: "Optional<br>Default=1000000"
  d: "How many iterations to try."

{% enditemplate %}

*Result*

{% endautocrossref %}

    [ blockhashes ]     (array) hashes of blocks generated

{% autocrossref %}

*Example*

Generate 11 blocks

{% highlight bash %}
bitcoin-cli generate 11
{% endhighlight %}

*See also*

* [GenerateToAddress][rpc generatetoaddress]: {{summary_generateToAddress}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
