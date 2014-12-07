{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getreceivedbyaccount.md" %}

##### GetReceivedByAccount
{% include helpers/subhead-links.md %}

{% assign summary_getReceivedByAccount="returns the total amount received by addresses in a particular account from transactions with the specified number of confirmations.  It does not count coinbase transactions." %}

{% autocrossref %}

*Requires wallet support.*

The `getreceivedbyaccount` RPC {{summary_getReceivedByAccount}}

*Parameter #1---the account name*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Account            | string          | Required<br>(exactly 1)     | The name of the account containing the addresses to get.  For the default account, use an empty string ("")

*Parameter #2---the minimum number of confirmations*

{{INCLUDE_CONFIRMATIONS_PARAMETER}}

*Result---the number of bitcoins received*

| Name               | Type              | Presence                    | Description
|--------------------|-------------------|-----------------------------|----------------
| `result`           | number (bitcoins) | Required<br>(exactly 1)     | The number of bitcoins received by the account.  May be `0`

*Example from Bitcoin Core 0.10.0*

Get the bitcoins received by the "doc test" account with six or more
confirmations:

{% highlight bash %}
bitcoin-cli -testnet getreceivedbyaccount "doc test" 6
{% endhighlight %}

Result:

{% highlight json %}
0.30000000
{% endhighlight %}

*See also*

* [GetReceivedByAddress][rpc getreceivedbyaddress]: {{summary_getReceivedByAddress}}
* [GetAddressesByAccount][rpc getaddressesbyaccount]: {{summary_getAddressesByAccount}}
* [ListAccounts][rpc listaccounts]: {{summary_listAccounts}}

{% endautocrossref %}
