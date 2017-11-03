{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/setaccount.md" %}

##### SetAccount
{% include helpers/subhead-links.md %}

{% assign summary_setAccount="puts the specified address in the given account." %}

{% autocrossref %}

*Requires wallet support.*

The `setaccount` RPC {{summary_setAccount}}

{{WARNING}} `setaccount` will be removed in a later version of Bitcoin
Core.  Use the RPCs listed in the See Also subsection below instead.

*Parameter #1---a bitcoin address*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The P2PKH or P2SH address to put in the account.  Must already belong to the wallet"

{% enditemplate %}

*Parameter #2---an account*

{% itemplate ntpd1 %}
- n: "Account"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The name of the account in which the address should be placed.  May be the default account, an empty string (\"\")"

{% enditemplate %}

*Result---`null` if successful*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "Set to JSON `null` if the address was successfully placed in the account"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Put the address indicated below in the "doc test" account.

{% highlight bash %}
bitcoin-cli -testnet setaccount \
    mmXgiR6KAhZCyQ8ndr2BCfEq1wNG2UnyG6 "doc test"
{% endhighlight %}

(Success: no result displayed.)

*See also*

* [GetAccount][rpc getaccount]: {{summary_getAccount}}
* [ListAccounts][rpc listaccounts]: {{summary_listAccounts}}
* [GetAddressesByAccount][rpc getaddressesbyaccount]: {{summary_getAddressesByAccount}}

{% endautocrossref %}
