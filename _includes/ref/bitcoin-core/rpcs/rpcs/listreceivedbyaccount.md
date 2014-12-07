{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/listreceivedbyaccount.md" %}

##### ListReceivedByAccount
{% include helpers/subhead-links.md %}

{% assign summary_listReceivedByAccount="lists the total number of bitcoins received by each account." %}

{% autocrossref %}

*Requires wallet support.*

The `listreceivedbyaccount` RPC {{summary_listReceivedByAccount}}

*Parameter #1---the minimum number of confirmations a transaction must have to be counted*

{{INCLUDE_CONFIRMATIONS_PARAMETER}}

*Parameter #2---whether to include empty accounts*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Include Empty      | bool            | Optional<br>(0 or 1)        | Set to `true` to display accounts which have never received a payment.  Set to `false` (the default) to only include accounts which have received a payment.  Any account which has received a payment will be displayed even if its current balance is `0`

*Parameter #3---whether to include watch-only addresses in results*

{{INCLUDE_INCLUDE_WATCH_ONLY_PARAMETER}}

*Result---account names, balances, and minimum confirmations*

| Name                       | Type              | Presence                    | Description
|----------------------------|-------------------|-----------------------------|----------------
| `result`                   | array             | Required<br>(exactly 1)     | An array containing objects each describing an account.  At the very least, the default account ("") will be included
| →<br>Account               | object            | Required<br>(1 or more)     | An object describing an account
| → →<br>`involvesWatchonly` | bool              | Optional<br>(0 or 1)        | *Added in Bitcoin Core 0.10.0*<br><br>Set to `true` if the balance of this account includes a watch-only address which has received a spendable payment (that is, a payment with at least the specified number of confirmations and which is not an immature coinbase).  Otherwise not returned
| → →<br>`account`           | string            | Required<br>(exactly 1)     | The name of the account
| → →<br>`amount`<!--noref-->| number (bitcoins) | Required<br>(exactly 1)     | The total amount received by this account in bitcoins
| → →<br>`confirmations`     | number (int)      | Required<br>(exactly 1)     | The number of confirmations received by the last transaction received by this account.  May be `0`

*Example from Bitcoin Core 0.10.0*

Get the balances for all non-empty accounts, including only transactions
which have been confirmed at least six times:

{% highlight bash %}
bitcoin-cli -testnet listreceivedbyaccount 6 false
{% endhighlight %}

Result (edited to only show the first two results):

{% highlight json %}
[
    {
        "account" : "",
        "amount" : 0.19960000,
        "confirmations" : 53601
    },
    {
        "account" : "doc test",
        "amount" : 0.30000000,
        "confirmations" : 8991
    }
]
{% endhighlight %}

*See also*

* [ListReceivedByAddress][rpc listreceivedbyaddress]: {{summary_listReceivedByAddress}}
* [GetReceivedByAccount][rpc getreceivedbyaccount]: {{summary_getReceivedByAccount}}
* [GetReceivedByAddress][rpc getreceivedbyaddress]: {{summary_getReceivedByAddress}}


{% endautocrossref %}
