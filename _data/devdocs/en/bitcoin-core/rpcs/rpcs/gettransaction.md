{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/gettransaction.md" %}

##### GetTransaction
{% include helpers/subhead-links.md %}

{% assign summary_getTransaction="get detailed information about in-wallet transaction <txid>." %}

{% autocrossref %}

The `gettransaction` RPC {{summary_getTransaction}}

*Parameter #1---txid*

{% itemplate ntpd1 %}
- n: "txid"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The transaction id"

{% enditemplate %}

*Parameter #2---include_watchonly*

{% itemplate ntpd1 %}
- n: "include_watchonly"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Whether to include watch-only addresses in balance calculation and details[]"

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "amount" : x.xxx,        (numeric) The transaction amount in BTC
      "fee": x.xxx,            (numeric) The amount of the fee in BTC. This is negative and only available for the
                                  'send' category of transactions.
      "confirmations" : n,     (numeric) The number of confirmations
      "blockhash" : "hash",  (string) The block hash
      "blockindex" : xx,       (numeric) The index of the transaction in the block that includes it
      "blocktime" : ttt,       (numeric) The time in seconds since epoch (1 Jan 1970 GMT)
      "txid" : "transactionid",   (string) The transaction id.
      "time" : ttt,            (numeric) The transaction time in seconds since epoch (1 Jan 1970 GMT)
      "timereceived" : ttt,    (numeric) The time received in seconds since epoch (1 Jan 1970 GMT)
      "bip125-replaceable": "yes|no|unknown",  (string) Whether this transaction could be replaced due to BIP125 (replace-by-fee);
                                                       may be unknown for unconfirmed transactions not in the mempool
      "details" : [
        {
          "address" : "address",          (string) The bitcoin address involved in the transaction
          "category" :                      (string) The transaction category.
                       "send"                  Transactions sent.
                       "receive"               Non-coinbase transactions received.
                       "generate"              Coinbase transactions received with more than 100 confirmations.
                       "immature"              Coinbase transactions received with 100 or fewer confirmations.
                       "orphan"                Orphaned coinbase transactions received.
          "amount" : x.xxx,                 (numeric) The amount in BTC
          "label" : "label",              (string) A comment for the address/transaction, if any
          "vout" : n,                       (numeric) the vout value
          "fee": x.xxx,                     (numeric) The amount of the fee in BTC. This is negative and only available for the
                                               'send' category of transactions.
          "abandoned": xxx                  (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the
                                               'send' category of transactions.
        }
        ,...
      ],
      "hex" : "data"         (string) Raw data for transaction
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
{% endhighlight %}
{% highlight bash %}
bitcoin-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d" true
{% endhighlight %}

*See also*

* [GetRawTransaction][rpc getrawtransaction]: {{summary_getRawTransaction}}

{% endautocrossref %}
