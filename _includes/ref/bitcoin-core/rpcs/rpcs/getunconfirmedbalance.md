{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getunconfirmedbalance.md" %}

##### GetUnconfirmedBalance
{% include helpers/subhead-links.md %}

{% assign summary_getUnconfirmedBalance="returns the wallet's total unconfirmed balance." %}

{% autocrossref %}

*Requires wallet support.*

The `getunconfirmedbalance` RPC {{summary_getUnconfirmedBalance}}

*Parameters: none*

*Result---the balance of unconfirmed transactions paying this wallet*

| Name               | Type              | Presence                    | Description
|--------------------|-------------------|-----------------------------|----------------
| `result`           | number (bitcoins) | Required<br>(exactly 1)     | The total number of bitcoins paid to this wallet in unconfirmed transactions

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
