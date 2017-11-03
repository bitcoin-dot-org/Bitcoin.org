{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

##### GetReceivedByAddress

{% assign summary_getReceivedByAddress="returns the total amount received by the specified address in transactions with the specified number of confirmations. It does not count coinbase transactions." %}

*Requires wallet support.*

The `getreceivedbyaddress` RPC {{summary_getReceivedByAddress}}

*Parameter #1---the address*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The address whose transactions should be tallied"

{% enditemplate %}

*Parameter #2---the minimum number of confirmations*

{{INCLUDE_CONFIRMATIONS_PARAMETER}}

*Result---the number of bitcoins received*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The number of bitcoins received by the address, excluding coinbase transactions.  May be `0`"

{% enditemplate %}

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

