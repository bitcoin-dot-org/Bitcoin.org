{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getrawmempool.md" %}

##### GetRawMemPool
{% include helpers/subhead-links.md %}

{% assign summary_getRawMemPool="returns all transaction ids in memory pool as a json array of string transaction ids." %}

{% autocrossref %}

The `getrawmempool` RPC {{summary_getRawMemPool}}

Hint: use getmempoolentry to fetch a specific transaction from the mempool.

*Parameter #1---verbose*

{% itemplate ntpd1 %}
- n: "verbose"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "True for a json object, false for array of transaction ids"

{% enditemplate %}

*Result---(for verbose = false)*

{% endautocrossref %}

    [                     (json array of string)
      "transactionid"     (string) The transaction id
      ,...
    ]

{% autocrossref %}

*Result---(for verbose = true)*

{% endautocrossref %}

    {                           (json object)
      "transactionid" : {       (json object)
        "size" : n,             (numeric) virtual transaction size as defined in BIP 141. This is different from actual serialized size for witness transactions as witness data is discounted.
        "fee" : n,              (numeric) transaction fee in BTC (DEPRECATED)
        "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority (DEPRECATED)
        "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
        "height" : n,           (numeric) block height when transaction entered pool
        "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
        "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
        "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one) (DEPRECATED)
        "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
        "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
        "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one) (DEPRECATED)
        "wtxid" : hash,         (string) hash of serialized transaction, including witness data
        "fees" : {
            "base" : n,         (numeric) transaction fee in BTC
            "modified" : n,     (numeric) transaction fee with fee deltas used for mining priority in BTC
            "ancestor" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one) in BTC
            "descendant" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one) in BTC
        }
        "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
            "transactionid",    (string) parent transaction id
           ... ]
        "spentby" : [           (array) unconfirmed transactions spending outputs from this transaction
            "transactionid",    (string) child transaction id
           ... ]
        "bip125-replaceable" : true|false,  (boolean) Whether this transaction could be replaced due to BIP125 (replace-by-fee)
      }, ...
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getrawmempool true
{% endhighlight %}

*See also*

* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}}
* [GetMemPoolEntry][rpc getmempoolentry]: {{summary_getMemPoolEntry}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}

{% endautocrossref %}
