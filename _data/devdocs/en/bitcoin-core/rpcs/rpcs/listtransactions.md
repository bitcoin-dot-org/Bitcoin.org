{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/listtransactions.md" %}

##### ListTransactions
{% include helpers/subhead-links.md %}

{% assign summary_listTransactions="if a label name is provided, this will return only incoming transactions paying to addresses with the specified label." %}

{% autocrossref %}

The `listtransactions` RPC {{summary_listTransactions}}

Returns up to 'count' most recent transactions skipping the first 'from' transactions.

*Parameter #1---label*

{% itemplate ntpd1 %}
- n: "label"
  t: "string"
  p: "Optional"
  d: "If set, should be a valid label name to return only incoming transactions
       with the specified label, or \"*\" to disable filtering and return all transactions."

{% enditemplate %}

*Parameter #2---count*

{% itemplate ntpd1 %}
- n: "count"
  t: "number (int)"
  p: "Optional<br>Default=10"
  d: "The number of transactions to return"

{% enditemplate %}

*Parameter #3---skip*

{% itemplate ntpd1 %}
- n: "skip"
  t: "number (int)"
  p: "Optional<br>Default=0"
  d: "The number of transactions to skip"

{% enditemplate %}

*Parameter #4---include_watchonly*

{% itemplate ntpd1 %}
- n: "include_watchonly"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Include transactions to watch-only addresses (see 'importaddress')"

{% enditemplate %}

*Result*

{% endautocrossref %}

    [
      {
        "address":"address",    (string) The bitcoin address of the transaction.
        "category":               (string) The transaction category.
                    "send"                  Transactions sent.
                    "receive"               Non-coinbase transactions received.
                    "generate"              Coinbase transactions received with more than 100 confirmations.
                    "immature"              Coinbase transactions received with 100 or fewer confirmations.
                    "orphan"                Orphaned coinbase transactions received.
        "amount": x.xxx,          (numeric) The amount in BTC. This is negative for the 'send' category, and is positive
                                            for all other categories
        "label": "label",       (string) A comment for the address/transaction, if any
        "vout": n,                (numeric) the vout value
        "fee": x.xxx,             (numeric) The amount of the fee in BTC. This is negative and only available for the
                                             'send' category of transactions.
        "confirmations": n,       (numeric) The number of confirmations for the transaction. Negative confirmations indicate the
                                             transaction conflicts with the block chain
        "trusted": xxx,           (bool) Whether we consider the outputs of this unconfirmed transaction safe to spend.
        "blockhash": "hashvalue", (string) The block hash containing the transaction.
        "blockindex": n,          (numeric) The index of the transaction in the block that includes it.
        "blocktime": xxx,         (numeric) The block time in seconds since epoch (1 Jan 1970 GMT).
        "txid": "transactionid", (string) The transaction id.
        "time": xxx,              (numeric) The transaction time in seconds since epoch (midnight Jan 1 1970 GMT).
        "timereceived": xxx,      (numeric) The time received in seconds since epoch (midnight Jan 1 1970 GMT).
        "comment": "...",       (string) If a comment is associated with the transaction.
        "bip125-replaceable": "yes|no|unknown",  (string) Whether this transaction could be replaced due to BIP125 (replace-by-fee);
                                                         may be unknown for unconfirmed transactions not in the mempool
        "abandoned": xxx          (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the
                                             'send' category of transactions.
      }
    ]

{% autocrossref %}

*Example*

List the most recent 10 transactions in the systems

{% highlight bash %}
bitcoin-cli listtransactions
{% endhighlight %}
List transactions 100 to 120

{% highlight bash %}
bitcoin-cli listtransactions "*" 20 100
{% endhighlight %}

*See also*

* [GetTransaction][rpc gettransaction]: {{summary_getTransaction}}
* [ListSinceBlock][rpc listsinceblock]: {{summary_listSinceBlock}}

{% endautocrossref %}
