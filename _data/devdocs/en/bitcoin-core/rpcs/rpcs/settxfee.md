{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/settxfee.md" %}

##### SetTxFee
{% include helpers/subhead-links.md %}

{% assign summary_setTxFee="set the transaction fee per kB for this wallet." %}

{% autocrossref %}

The `settxfee` RPC {{summary_setTxFee}}

Overrides the global -paytxfee command line parameter.

*Parameter #1---amount*

{% itemplate ntpd1 %}
- n: "amount"
  t: "numeric or string"
  p: "Required<br>(exactly 1)"
  d: "The transaction fee in BTC/kB"

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "boolean"
  p: "Required<br>(exactly 1)"
  d: "Returns true if successful"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli settxfee 0.00001
{% endhighlight %}

*See also*

* [GetWalletInfo][rpc getwalletinfo]: {{summary_getWalletInfo}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}

{% endautocrossref %}
