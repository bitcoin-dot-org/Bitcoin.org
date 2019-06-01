{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/generatetoaddress.md" %}

##### GenerateToAddress
{% include helpers/subhead-links.md %}

{% assign summary_generateToAddress="mine blocks immediately to a specified address (before the RPC call returns)." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

The `generatetoaddress` RPC {{summary_generateToAddress}}

*Parameter #1---nblocks*

{% itemplate ntpd1 %}
- n: "nblocks"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "How many blocks are generated immediately."

{% enditemplate %}

*Parameter #2---address*

{% itemplate ntpd1 %}
- n: "address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The address to send the newly generated bitcoin to."

{% enditemplate %}

*Parameter #3---maxtries*

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

Generate 11 blocks to myaddress

{% highlight bash %}
bitcoin-cli generatetoaddress 11 "myaddress"
{% endhighlight %}
If you are running the bitcoin core wallet, you can get a new address to send the newly generated bitcoin to with:

{% highlight bash %}
bitcoin-cli getnewaddress
{% endhighlight %}

*See also*

* [Generate][rpc generate]: {{summary_generate}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
