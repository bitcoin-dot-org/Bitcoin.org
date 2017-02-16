{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/listsinceblock.md" %}

##### ListSinceBlock
{% include helpers/subhead-links.md %}

{% assign summary_listSinceBlock="gets all transactions affecting the wallet which have occurred since a particular block, plus the header hash of a block at a particular depth." %}

{% autocrossref %}

*Requires wallet support.*

The `listsinceblock` RPC {{summary_listSinceBlock}}

*Parameter #1---a block header hash*

{% itemplate ntpd1 %}
- n: "Header Hash"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The hash of a block header encoded as hex in RPC byte order.  All transactions affecting the wallet which are not in that block or any earlier block will be returned, including unconfirmed transactions.  Default is the hash of the genesis block, so all transactions affecting the wallet are returned by default"

{% enditemplate %}

*Parameter #2---the target confirmations for the lastblock field*

{% itemplate ntpd1 %}
- n: "Target Confirmations"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "Sets the lastblock field of the results to the header hash of a block with this many confirmations.  This does not affect which transactions are returned.  Default is `1`, so the hash of the most recent block on the local best block chain is returned"

{% enditemplate %}

*Parameter #3---whether to include watch-only addresses in details and calculations*

{{INCLUDE_INCLUDE_WATCH_ONLY_PARAMETER}}

**Result**

{% assign DEPTH="→ → → " %}
{% include helpers/vars.md %}

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object containing an array of transactions and the lastblock field"

- n: "→<br>`transactions`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of objects each describing a particular **payment** to or from this wallet.  The objects in this array do not describe an actual transactions, so more than one object in this array may come from the same transaction.  This array may be empty"

- n: "→ →<br>Payment"
  t: "object"
  p: "Optional<br>(0 or more)"
  d: "An payment which did not appear in the specified block or an earlier block"

{{INCLUDE_F_LIST_TRANSACTIONS}}
{{INCLUDE_F_LIST_TRANSACTIONS_F_FULL}}
- n: "→<br>`lastblock`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The header hash of the block with the number of confirmations specified in the *target confirmations* parameter, encoded as hex in RPC byte order"

{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

Get all transactions since a particular block (including watch-only
transactions) and the header hash of the sixth most recent block.

{% highlight bash %}
bitcoin-cli -testnet listsinceblock \
              00000000688633a503f69818a70eac281302e9189b1bb57a76a05c329fcda718 \
              6 true
{% endhighlight %}

Result (edited to show only two payments):

{% highlight json %}
{
    "transactions" : [
        {
            "account" : "doc test",
            "address" : "mmXgiR6KAhZCyQ8ndr2BCfEq1wNG2UnyG6",
            "category" : "receive",
            "amount" : 0.10000000,
            "vout" : 0,
            "confirmations" : 76478,
            "blockhash" : "000000000017c84015f254498c62a7c884a51ccd75d4dd6dbdcb6434aa3bd44d",
            "blockindex" : 1,
            "blocktime" : 1399294967,
            "txid" : "85a98fdf1529f7d5156483ad020a51b7f3340e47448cf932f470b72ff01a6821",
            "walletconflicts" : [
            ],
            "time" : 1399294967,
            "timereceived" : 1418924714,
            "bip125-replaceable": "no"		
        },
        {
            "involvesWatchonly" : true,
            "account" : "someone else's address2",
            "address" : "n3GNqMveyvaPvUbH469vDRadqpJMPc84JA",
            "category" : "receive",
            "amount" : 0.00050000,
            "vout" : 0,
            "confirmations" : 34714,
            "blockhash" : "00000000bd0ed80435fc9fe3269da69bb0730ebb454d0a29128a870ea1a37929",
            "blockindex" : 11,
            "blocktime" : 1411051649,
            "txid" : "99845fd840ad2cc4d6f93fafb8b072d188821f55d9298772415175c456f3077d",
            "walletconflicts" : [
            ],
            "time" : 1418695703,
            "timereceived" : 1418925580,
            "bip125-replaceable": "no"
        }
    ],
    "lastblock" : "0000000000984add1a686d513e66d25686572c7276ec3e358a7e3e9f7eb88619"
}
{% endhighlight %}

*See also*

* [ListReceivedByAccount][rpc listreceivedbyaccount]: {{summary_listReceivedByAccount}}
* [ListReceivedByAddress][rpc listreceivedbyaddress]: {{summary_listReceivedByAddress}}

{% endautocrossref %}
