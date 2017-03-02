{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/listaccounts.md" %}

##### ListAccounts
{% include helpers/subhead-links.md %}

{% assign summary_listAccounts="lists accounts and their balances." %}

{% autocrossref %}

*Requires wallet support.*

The `listaccounts` RPC {{summary_listAccounts}}

{{WARNING}} `listaccounts` will be removed in a later version of Bitcoin
Core.  Use the RPCs listed in the See Also subsection below instead.

*Parameter #1---the minimum number of confirmations a transaction must have*

{{INCLUDE_CONFIRMATIONS_PARAMETER}}

*Parameter #2---whether to include watch-only addresses in results*

{{INCLUDE_INCLUDE_WATCH_ONLY_PARAMETER}}

*Result---a list of accounts and their balances*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "A JSON array containing key/value pairs with account names and values.  Must include, at the very least, the default account (\"\")"

- n: "→<br>Account : Balance"
  t: "string : number (bitcoins)"
  p: "Required<br>(1 or more)"
  d: "The name of an account as a string paired with the balance of the account as a number of bitcoins.  The number of bitcoins may be negative if the account has spent more bitcoins than it received.  Accounts with zero balances and zero transactions will be displayed"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Display account balances with one confirmation and watch-only addresses
included.

{% highlight bash %}
bitcoin-cli -testnet listaccounts 1 true
{% endhighlight %}

Result:

{% highlight json %}
{
    "" : -2.73928803,
    "Refund from example.com" : 0.00000000,
    "doc test" : -498.45900000,
    "someone else's address" : 0.00000000,
    "someone else's address2" : 0.00050000,
    "test" : 499.97975293,
    "test account" : 0.00000000,
    "test label" : 0.48961280,
    "test1" : 1.99900000
}
{% endhighlight %}

*See also*

* [GetAccount][rpc getaccount]: {{summary_getAccount}}
* [GetAddressesByAccount][rpc getaddressesbyaccount]: {{summary_getAddressesByAccount}}
* [ListReceivedByAccount][rpc listreceivedbyaccount]: {{summary_listReceivedByAccount}}


{% endautocrossref %}
