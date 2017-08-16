{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getaccount.md" %}

##### GetAccount
{% include helpers/subhead-links.md %}

{% assign summary_getAccount="returns the name of the account associated with the given address." %}

{% autocrossref %}

*Requires wallet support.*

The `getaccount` RPC {{summary_getAccount}}

*Parameter #1---a Bitcoin address*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "A P2PKH or P2SH Bitcoin address belonging either to a specific account or the default account (\"\")"

{% enditemplate %}

*Result---an account name*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The name of an account, or an empty string (\"\", the default account)"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getaccount mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN
{% endhighlight %}

Result:

{% highlight text %}
doc test
{% endhighlight %}

*See also*

* [GetAddressesByAccount][rpc getaddressesbyaccount]: {{summary_getAddressesByAccount}}

{% endautocrossref %}
