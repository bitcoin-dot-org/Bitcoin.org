{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getaccount.md" %}

##### GetAccount
{% include helpers/subhead-links.md %}

{% assign summary_getAccount="returns the name of the account associated with the given address." %}

{% autocrossref %}

*Requires wallet support.*

The `getaccount` RPC {{summary_getAccount}}

*Parameter #1---a Bitcoin address*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Address            | string (base58) | Required<br>(exactly 1)     | A P2PKH or P2SH Bitcoin address belonging either to a specific account or the default account ("")
{:.ntpd}

*Result---an account name*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| `result`           | string          | Required<br>(exactly 1)     | The name of an account, or an empty string ("", the default account)
{:.ntpd}

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
