{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getbalance.md" %}

##### GetBalance
{% include helpers/subhead-links.md %}

{% assign summary_getBalance="returns the total available balance." %}

{% autocrossref %}

The `getbalance` RPC {{summary_getBalance}}

The available balance is what the wallet considers currently spendable, and is
thus affected by options which limit spendability such as -spendzeroconfchange.

*Parameter #1---dummy*

{% itemplate ntpd1 %}
- n: "dummy"
  t: "string"
  p: "Optional"
  d: "Remains for backward compatibility. Must be excluded or set to \"*\"."

{% enditemplate %}

*Parameter #2---minconf*

{% itemplate ntpd1 %}
- n: "minconf"
  t: "number (int)"
  p: "Optional<br>Default=0"
  d: "Only include transactions confirmed at least this many times."

{% enditemplate %}

*Parameter #3---include_watchonly*

{% itemplate ntpd1 %}
- n: "include_watchonly"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Also include balance in watch-only addresses (see 'importaddress')"

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total amount in BTC received for this wallet."

{% enditemplate %}

*Example*

The total amount in the wallet with 1 or more confirmations

{% highlight bash %}
bitcoin-cli getbalance
{% endhighlight %}
The total amount in the wallet at least 6 blocks confirmed

{% highlight bash %}
bitcoin-cli getbalance "*" 6
{% endhighlight %}

*See also*

* [GetReceivedByAddress][rpc getreceivedbyaddress]: {{summary_getReceivedByAddress}}

{% endautocrossref %}
