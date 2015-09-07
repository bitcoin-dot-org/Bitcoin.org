{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getunconfirmedbalance.md" %}

##### GetUnconfirmedBalance
{% include helpers/subhead-links.md %}

{% assign summary_getUnconfirmedBalance="returns the wallet's total unconfirmed balance." %}

{% autocrossref %}

*Requires wallet support.*

The `getunconfirmedbalance` RPC {{summary_getUnconfirmedBalance}}

*Parameters: none*

*Result---the balance of unconfirmed transactions paying this wallet*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The total number of bitcoins paid to this wallet in unconfirmed transactions"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getunconfirmedbalance
{% endhighlight %}

Result (no unconfirmed incoming payments):

{% highlight json %}
0.00000000
{% endhighlight %}

*See also*

* [GetBalance][rpc getbalance]: {{summary_getBalance}}

{% endautocrossref %}
