{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getreceivedbylabel.md" %}

##### GetReceivedByLabel
{% include helpers/subhead-links.md %}

{% assign summary_getReceivedByLabel="returns the total amount received by addresses with <label> in transactions with at least [minconf] confirmations." %}

{% autocrossref %}

*Added in Bitcoin Core 0.17.0*

The `getreceivedbylabel` RPC {{summary_getReceivedByLabel}}

*Parameter #1---label*

{% itemplate ntpd1 %}
- n: "label"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The selected label, may be the default label using \"\"."

{% enditemplate %}

*Parameter #2---minconf*

{% itemplate ntpd1 %}
- n: "minconf"
  t: "number (int)"
  p: "Optional<br>Default=1"
  d: "Only include transactions confirmed at least this many times."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total amount in BTC received for this label."

{% enditemplate %}

*Example*

Amount received by the default label with at least 1 confirmation

{% highlight bash %}
bitcoin-cli getreceivedbylabel ""
{% endhighlight %}
Amount received at the tabby label including unconfirmed amounts with zero confirmations

{% highlight bash %}
bitcoin-cli getreceivedbylabel "tabby" 0
{% endhighlight %}
The amount with at least 6 confirmations

{% highlight bash %}
bitcoin-cli getreceivedbylabel "tabby" 6
{% endhighlight %}

{% endautocrossref %}
