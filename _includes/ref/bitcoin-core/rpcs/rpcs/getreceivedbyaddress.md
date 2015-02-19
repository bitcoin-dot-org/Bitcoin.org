{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getreceivedbyaddress.md" %}

##### GetReceivedByAddress
{% include helpers/subhead-links.md %}

{% assign summary_getReceivedByAddress="returns the total amount received by the specified address in transactions with the specified number of confirmations. It does not count coinbase transactions." %}

{% autocrossref %}

*Requires wallet support.*

The `getreceivedbyaddress` RPC {{summary_getReceivedByAddress}}

*Parameter #1---the address*

{{json_table}}

* Address
* string
* Required (exactly 1)
* The address whose transactions should be tallied

*Parameter #2---the minimum number of confirmations*

{{INCLUDE_CONFIRMATIONS_PARAMETER}}

*Result---the number of bitcoins received*

{{json_table}}

* `result`
* number (bitcoins)
* Required (exactly 1)
* The number of bitcoins received by the address, excluding coinbase transactions.  May be `0`

*Example from Bitcoin Core 0.10.0*

Get the bitcoins received for a particular address, only counting
transactions with six or more confirmations:

{% highlight bash %}
bitcoin-cli -testnet getreceivedbyaddress mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN 6
{% endhighlight %}

Result:

{% highlight json %}
0.30000000
{% endhighlight %}

*See also*

* [GetReceivedByAccount][rpc getreceivedbyaccount]: {{summary_getReceivedByAccount}}
* [GetAddressesByAccount][rpc getaddressesbyaccount]: {{summary_getAddressesByAccount}}
* [ListAccounts][rpc listaccounts]: {{summary_listAccounts}}

{% endautocrossref %}
