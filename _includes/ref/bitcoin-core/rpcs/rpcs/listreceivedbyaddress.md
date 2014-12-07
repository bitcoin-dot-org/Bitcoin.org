{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/listreceivedbyaddress.md" %}

##### ListReceivedByAddress
{% include helpers/subhead-links.md %}

{% assign summary_listReceivedByAddress="lists the total number of bitcoins received by each address." %}

{% autocrossref %}

*Requires wallet support.*

The `listreceivedbyaddress` RPC {{summary_listReceivedByAddress}}

*Parameter #1---the minimum number of confirmations a transaction must have to be counted*

{{INCLUDE_CONFIRMATIONS_PARAMETER}}

*Parameter #2---whether to include empty accounts*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Include Empty      | bool            | Optional<br>(0 or 1)        | Set to `true` to display accounts which have never received a payment.  Set to `false` (the default) to only include accounts which have received a payment.  Any account which has received a payment will be displayed even if its current balance is `0`

*Parameter #3---whether to include watch-only addresses in results*

{{INCLUDE_INCLUDE_WATCH_ONLY_PARAMETER}}

*Result---addresses, account names, balances, and minimum confirmations*

| Name                       | Type              | Presence                    | Description
|----------------------------|-------------------|-----------------------------|----------------
| `result`                   | array             | Required<br>(exactly 1)     | An array containing objects each describing a particular address
| →<br>Address               | object            | Optional<br>(0 or more)     | An object describing an address
| → →<br>`involvesWatchonly` | bool              | Optional<br>(0 or 1)        | *Added in Bitcoin Core 0.10.0*<br><br>Set to `true` if this address is a watch-only address which has received a spendable payment (that is, a payment with at least the specified number of confirmations and which is not an immature coinbase).  Otherwise not returned
| → →<br>`address`           | string (base58)   | Required<br>(exactly 1)     | The address being described encoded in base58check
| → →<br>`account`           | string            | Required<br>(exactly 1)     | The account the address belongs to; may be the default account, an empty string ("")
| → →<br>`amount`            | number (bitcoins) | Required<br>(exactly 1)     | The total amount the address has received in bitcoins
| → →<br>`confirmations`     | number (int)      | Required<br>(exactly 1)     | The number of confirmations of the latest transaction to the address.  May be `0` for unconfirmed
| → →<br>TXIDs               | array             | Required<br>(exactly 1)     | An array of TXIDs belonging to transactions that pay the address
| → → →<br>TXID              | string            | Optional<br>(0 or more)     | The TXID of a transaction paying the address, encoded as hex in RPC byte order

*Example from Bitcoin Core 0.10.0*

List addresses with balances confirmed by at least six blocks, including
watch-only addresses:

{% highlight bash %}
bitcoin-cli -testnet listreceivedbyaddress 6 false true
{% endhighlight %}

Result (edit to show only two entries):

{% highlight json %}
[
    {
        "address" : "mnUbTmdAFD5EAg3348Ejmonub7JcWtrMck",
        "account" : "test1",
        "amount" : 1.99900000,
        "confirmations" : 55680,
        "txids" : [
            "4d71a6127796766c39270881c779b6e05183f2bf35589261e9572436356f287f",
            "997115d0cf7b83ed332e6c1f2e8c44f803c95ea43490c84ce3e9ede4b2e1605f"
        ]
    },
    {
        "involvesWatchonly" : true,
        "address" : "n3GNqMveyvaPvUbH469vDRadqpJMPc84JA",
        "account" : "someone else's address2",
        "amount" : 0.00050000,
        "confirmations" : 34714,
        "txids" : [
            "99845fd840ad2cc4d6f93fafb8b072d188821f55d9298772415175c456f3077d"
        ]
    }
]
{% endhighlight %}

*See also*

* [ListReceivedByAccount][rpc listreceivedbyaccount]: {{summary_listReceivedByAccount}}
* [GetReceivedByAddress][rpc getreceivedbyaddress]: {{summary_getReceivedByAddress}}
* [GetReceivedByAccount][rpc getreceivedbyaccount]: {{summary_getReceivedByAccount}}


{% endautocrossref %}
