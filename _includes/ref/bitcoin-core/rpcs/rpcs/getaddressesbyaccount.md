{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getaddressesbyaccount.md" %}

##### GetAddressesByAccount
{% include helpers/subhead-links.md %}

{% assign summary_getAddressesByAccount="returns a list of every address assigned to a particular account." %}

{% autocrossref %}

*Requires wallet support.*

The `getaddressesbyaccount` RPC {{summary_getAddressesByAccount}}

*Parameter #1---the account name*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Account            | string          | Required<br>(exactly 1)     | The name of the account containing the addresses to get.  To get addresses from the default account, pass an empty string ("")

*Result---a list of addresses*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| `result`           | array           | Required<br>(exactly 1)     | An array containing all addresses belonging to the specified account.  If the account has no addresses, the array will be empty
| Address            | string (base58) | Optional<br>(1 or more) | A P2PKH or P2SH address belonging to the account

*Example from Bitcoin Core 0.10.0*

Get the addresses assigned to the account "doc test":

{% highlight bash %}
bitcoin-cli -testnet getaddressesbyaccount "doc test"
{% endhighlight %}

Result:

{% highlight json %}
[
    "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN",
    "mft61jjkmiEJwJ7Zw3r1h344D6aL1xwhma",
    "mmXgiR6KAhZCyQ8ndr2BCfEq1wNG2UnyG6"
]
{% endhighlight %}

*See also*

* [GetAccount][rpc getaccount]: {{summary_getAccount}}
* [GetBalance][rpc getbalance]: {{summary_getBalance}}

{% endautocrossref %}
