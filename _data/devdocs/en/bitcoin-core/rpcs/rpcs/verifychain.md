{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/verifychain.md" %}

##### VerifyChain
{% include helpers/subhead-links.md %}

{% assign summary_verifyChain="verifies blockchain database." %}

{% autocrossref %}

The `verifychain` RPC {{summary_verifyChain}}

*Parameter #1---checklevel*

{% itemplate ntpd1 %}
- n: "checklevel"
  t: "number (int)"
  p: "Optional"
  d: "How thorough the block verification is."

{% enditemplate %}

*Parameter #2---nblocks*

{% itemplate ntpd1 %}
- n: "nblocks"
  t: "number (int)"
  p: "Optional"
  d: "The number of blocks to check."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "boolean"
  p: "Required<br>(exactly 1)"
  d: "Verified or not"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli verifychain
{% endhighlight %}

*See also*

* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}

{% endautocrossref %}
