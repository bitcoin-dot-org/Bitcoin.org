{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/listtransactions.md" %}

##### ListTransactions
{% include helpers/subhead-links.md %}

{% assign summary_listTransactions="returns the most recent transactions that affect the wallet." %}

{% autocrossref %}

*Requires wallet support.*

The `listtransactions` RPC {{summary_listTransactions}}

*Parameter #1---an account name to get transactions from*

{% itemplate ntpd1 %}
- n: "Account"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "*Deprecated: will be removed in a later version of Bitcoin Core*<br><br>The name of an account to get transactinos from.  Use an empty string (\"\") to get transactions for the default account.  Default is `*` to get transactions for all accounts."

{% enditemplate %}

*Parameter #2---the number of transactions to get*

{% itemplate ntpd1 %}
- n: "Count"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The number of the most recent transactions to list.  Default is `10`"

{% enditemplate %}

*Parameter #3---the number of transactions to skip*

{% itemplate ntpd1 %}
- n: "Skip"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The number of the most recent transactions which should not be returned.  Allows for pagination of results.  Default is `0`"

{% enditemplate %}

*Parameter #4---whether to include watch-only addresses in details and calculations*

{{INCLUDE_INCLUDE_WATCH_ONLY_PARAMETER}}

*Result---payment details*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array containing objects, with each object describing a **payment** or internal accounting entry (not a transaction).  More than one object in this array may come from a single transaction.  Array may be empty"

- n: "→<br>Payment"
  t: "object"
  p: "Optional<br>(0 or more)"
  d: "A payment or internal accounting entry"

- n: "→ →<br>`account`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "*Deprecated: will be removed in a later version of Bitcoin Core*<br><br>The account which the payment was credited to or debited from.  May be an empty string (\"\") for the default account"

- n: "→ →<br>`address`"
  t: "string (base58)"
  p: "Optional<br>(0 or 1)"
  d: "The address paid in this payment, which may be someone else's address not belonging to this wallet.  May be empty if the address is unknown, such as when paying to a non-standard pubkey script or if this is in the *move* category"

- n: "→ →<br>`category`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "Set to one of the following values:<br>• `send` if sending payment<br>• `receive` if this wallet received payment in a regular transaction<br>• `generate` if a matured and spendable coinbase<br>• `immature` if a coinbase that is not spendable yet<br>• `orphan` if a coinbase from a block that's not in the local best block chain<br>• `move` if an off-block-chain move made with the `move` RPC"

- n: "→ →<br>`amount`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "A negative bitcoin amount if sending payment; a positive bitcoin amount if receiving payment (including coinbases)"

- n: "→ →<br>`label`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "A comment for the address/transaction"  
 
- n: "→ →<br>`vout`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "For an output, the output index (vout) for this output in this transaction.  For an input, the output index for the output being spent in its transaction.  Because inputs list the output indexes from previous transactions, more than one entry in the details array may have the same output index.  Not returned for *move* category payments"

- n: "→ →<br>`fee`"
  t: "number (bitcoins)"
  p: "Optional<br>(0 or 1)"
  d: "If sending payment, the fee paid as a negative bitcoins value.  May be `0`. Not returned if receiving payment or for *move* category payments"

- n: "→ →<br>`confirmations`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The number of confirmations the transaction has received.  Will be `0` for unconfirmed and `-1` for conflicted.  Not returned for *move* category payments"
  
- n: "→ →<br>`trusted`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Indicates whether we consider the outputs of this unconfirmed transaction safe to spend.  Only returned for unconfirmed transactions"

- n: "→ →<br>`generated`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` if the transaction is a coinbase.  Not returned for regular transactions or *move* category payments"

- n: "→ →<br>`blockhash`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The hash of the block on the local best block chain which includes this transaction, encoded as hex in RPC byte order.  Only returned for confirmed transactions"

- n: "→ →<br>`blockindex`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The index of the transaction in the block that includes it.  Only returned for confirmed transactions"

- n: "→ →<br>`blocktime`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The block header time (Unix epoch time) of the block on the local best block chain which includes this transaction.  Only returned for confirmed transactions"

- n: "→ →<br>`txid`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The TXID of the transaction, encoded as hex in RPC byte order.  Not returned for *move* category payments"

- n: "→ →<br>`walletconflicts`"
  t: "array"
  p: "Optional<br>(0 or 1)"
  d: "An array containing the TXIDs of other transactions that spend the same inputs (UTXOs) as this transaction.  Array may be empty.  Not returned for *move* category payments"

- n: "→ → →<br>TXID"
  t: "string (hex)"
  p: "Optional<br>(0 or more)"
  d: "The TXID of a conflicting transaction, encoded as hex in RPC byte order"

- n: "→ →<br>`time`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "A Unix epoch time when the transaction was added to the wallet"

- n: "→ →<br>`timereceived`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "A Unix epoch time when the transaction was detected by the local node, or the time of the block on the local best block chain that included the transaction.  Not returned for *move* category payments"

- n: "→ →<br>`comment`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "For transaction originating with this wallet, a locally-stored comment added to the transaction.  Only returned in regular payments if a comment was added.  Always returned in *move* category payments.  May be an empty string"

- n: "→ →<br>`to`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "For transaction originating with this wallet, a locally-stored comment added to the transaction identifying who the transaction was sent to.  Only returned if a comment-to was added.  Never returned by *move* category payments.  May be an empty string"

- n: "→ →<br>`otheraccount`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "This is the account the bitcoins were moved from or moved to, as indicated by a negative or positive *amount* field in this payment.  Only returned by *move* category payments"

- n: "→ →<br>`bip125-replaceable`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>Indicates if a transaction is replaceable under BIP125:<br>• `yes` replaceable<br>• `no` not replaceable<br>• `unknown` for unconfirmed transactions not in the mempool"
  
- n: "→ →<br>`abandoned`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "*Added in Bitcoin Core 0.12.1*<br><br>Indicates if a transaction is was abandoned:<br>• `true` if it was abandoned (inputs are respendable)<br>• `false`  if it was not abandoned<br>Only returned by *send* category payments"
  
{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

List the most recent transaction from all accounts including watch-only addresses.

{% highlight bash %}
bitcoin-cli listtransactions "*" 1 0 true
{% endhighlight %}

Result:

{% highlight json %}
[
    {
        "involvesWatchonly" : true,
        "account" : "",
        "address" : "1GeDA9rRpqaCdsdkTzGtbajt6jPvn3pg2N",
        "category" : "send",
        "amount" : -3.45902877,
        "vout" : 0,
        "fee" : -0.00032890,
        "confirmations" : 29710,
        "blockhash" : "0000000000000000008b9cb38cd3105e75af94b3af79d0a59cbe4edb618fb814",
        "blockindex" : 1705,
        "blocktime" : 1463173519,
        "txid" : "9b32d4315ac4c5e0d3a5fb947b9a198d3641698badc820643a7df23081f99695e",
        "walletconflicts" : [
        ],
        "time" : 1418695703,
        "timereceived" : 1418925580,
	"bip125-replaceable" : "no",
	"abandoned": false
    }
]
{% endhighlight %}

*See also*

* [GetTransaction][rpc gettransaction]: {{summary_getTransaction}}
* [ListSinceBlock][rpc listsinceblock]: {{summary_listSinceBlock}}

{% endautocrossref %}
