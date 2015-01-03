{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/listtransactions.md" %}

##### ListTransactions
{% include helpers/subhead-links.md %}

{% assign summary_listTransactions="returns the most recent transactions that affect the wallet." %}

{% autocrossref %}

*Requires wallet support.*

The `listtransactions` RPC {{summary_listTransactions}}

*Parameter #1---an account name to get transactions from*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Account            | string          | Optional<br>(0 or 1)        | The name of an account to get transactinos from.  Use an empty string ("") to get transactions for the default account.  Default is `*` to get transactions for all accounts
{:.ntpd}

*Parameter #2---the number of transactions to get*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Count              | number (int)    | Optional<br>(0 or 1)        | The number of the most recent transactions to list.  Default is `10`
{:.ntpd}

*Parameter #3---the number of transactions to skip*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Skip               | number (int)    | Optional<br>(0 or 1)        | The number of the most recent transactions which should not be returned.  Allows for pagination of results.  Default is `0`
{:.ntpd}

*Parameter #4---whether to include watch-only addresses in details and calculations*

{{INCLUDE_INCLUDE_WATCH_ONLY_PARAMETER}}

*Result---payment details*

| Name                     | Type              | Presence                    | Description
|--------------------------|-------------------|----------------------------|----------------
| `result`                 | array             | Required<br>(exactly 1)    | An array containing objects, with each object describing a **payment** or internal accounting entry (not a transaction).  More than one object in this array may come from a single transaction.  Array may be empty
| →<br>Payment             | object            | Optional<br>(0 or more)    | A payment or internal accounting entry
| → →<br>`account`         | string            | Required<br>(exactly 1)    | The account which the payment was credited to or debited from.  May be an empty string ("") for the default account
| → →<br>`address`         | string (base58)   | Optional<br>(0 or 1)       | The address paid in this payment, which may be someone else's address not belonging to this wallet.  May be empty if the address is unknown, such as when paying to a non-standard pubkey script or if this is in the *move* category
| → →<br>`category`        | string            | Required<br>(exactly 1)    | Set to one of the following values:<br>• `send` if sending payment<br>• `receive` if this wallet received payment in a regular transaction<br>• `generate` if a matured and spendable coinbase<br>• `immature` if a coinbase that is not spendable yet<br>• `orphan` if a coinbase from a block that's not in the local best block chain<br>• `move` if an off-block-chain move made with the `move` RPC
| → →<br>`amount`          | number (bitcoins) | Required<br>(exactly 1)    | A negative bitcoin amount if sending payment; a positive bitcoin amount if receiving payment (including coinbases)
| → →<br>`vout`            | number (int)      | Optional<br>(0 or 1)       | *Added in Bitcoin Core 0.10.0*<br><br>For an output, the output index (vout) for this output in this transaction.  For an input, the output index for the output being spent in its transaction.  Because inputs list the output indexes from previous transactions, more than one entry in the details array may have the same output index.  Not returned for *move* category payments
| → →<br>`fee`             | number (bitcoins)| Optional<br>(0 or 1)        | If sending payment, the fee paid as a negative bitcoins value.  May be `0`. Not returned if receiving payment or for *move* category payments
| → →<br>`confirmations`   | number (int)     | Optional<br>(0 or 1)        | The number of confirmations the transaction has received.  Will be `0` for unconfirmed and `-1` for conflicted.  Not returned for *move* category payments
| → →<br>`generated`       | bool             | Optional<br>(0 or 1)        | Set to `true` if the transaction is a coinbase.  Not returned for regular transactions or *move* category payments
| → →<br>`blockhash`       | string (hex)     | Optional<br>(0 or 1)        | Only returned for confirmed transactions.  The hash of the block on the local best block chain which includes this transaction, encoded as hex in RPC byte order
| → →<br>`blockindex`      | number (int)     | Optional<br>(0 or 1)        | Only returned for confirmed transactions.  The block height of the block on the local best block chain which includes this transaction
| → →<br>`blocktime`       | number (int)     | Optional<br>(0 or 1)        | Only returned for confirmed transactions.  The block header time (Unix epoch time) of the block on the local best block chain which includes this transaction
| → →<br>`txid`            | string (hex)     | Optional<br>(0 or 1)        | The TXID of the transaction, encoded as hex in RPC byte order.  Not returned for *move* category payments
| → →<br>`walletconflicts` | array            | Optional<br>(0 or 1)        | An array containing the TXIDs of other transactions that spend the same inputs (UTXOs) as this transaction.  Array may be empty.  Not returned for *move* category payments
| → → →<br>TXID            | string (hex)     | Optional<br>(0 or more)     | The TXID of a conflicting transaction, encoded as hex in RPC byte order
| → →<br>`time`            | number (int)     | Required<br>(exactly 1)     | A Unix epoch time when the transaction was added to the wallet
| → →<br>`timerecived`     | number (int)     | Optional<br>(0 or 1)        | A Unix epoch time when the transaction was detected by the local node, or the time of the block on the local best block chain that included the transaction.  Not returned for *move* category payments
| → →<br>`comment`         | string           | Optional<br>(0 or 1)        | For transaction originating with this wallet, a locally-stored comment added to the transaction.  Only returned in regular payments if a comment was added.  Always returned in *move* category payments.  May be an empty string
| → →<br>`to`              | string           | Optional<br>(0 or 1)        | For transaction originating with this wallet, a locally-stored comment added to the transaction identifying who the transaction was sent to.  Only returned if a comment-to was added.  Never returned by *move* category payments.  May be an empty string
| → →<br>`otheraccount`    | string           | Optional<br>(0 or 1)        | Only returned by *move* category payments.  This is the account the bitcoins were moved from or moved to, as indicated by a negative or positive *amount* field in this payment
{:.ntpd}

*Example from Bitcoin Core 0.10.0*

List the most recent transaction from the account "someone else's
address2" including watch-only addresses.

{% highlight bash %}
bitcoin-cli -testnet listtransactions \
  "someone else's address2" 1 0 true
{% endhighlight %}

Result:

{% highlight json %}
[
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
        "timereceived" : 1418925580
    }
]
{% endhighlight %}

*See also*

* [GetTransaction][rpc gettransaction]: {{summary_getTransaction}}
* [ListSinceBlock][rpc listsinceblock]: {{summary_listSinceBlock}}

{% endautocrossref %}
