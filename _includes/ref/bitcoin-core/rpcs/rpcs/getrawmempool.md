{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getrawmempool.md" %}

##### GetRawMemPool
{% include helpers/subhead-links.md %}

{% assign summary_getRawMemPool="returns all transaction identifiers (TXIDs) in the memory pool as a JSON array, or detailed information about each transaction in the memory pool as a JSON object." %}

{% autocrossref %}

The `getrawmempool` RPC {{summary_getRawMemPool}}

*Parameter---desired output format*

{{json_table}}

* Format
* bool
* Optional (0 or 1)
* Set to `true` to get verbose output describing each transaction in the memory pool; set to `false` (the default) to only get an array of TXIDs for transactions in the memory pool

*Result (format `false`)---an array of TXIDs*

{{json_table}}

* `result`
* array
* Required (exactly 1)
* An array of TXIDs belonging to transactions in the memory pool.  The array may be empty if there are no transactions in the memory pool

* →<br>TXID
* string
* Optional (0 or more)
* The TXID of a transaction in the memory pool, encoded as hex in RPC byte order

*Result (format: `true`)---a JSON object describing each transaction*

{{json_table}}

* `result`
* object
* Required (exactly 1)
* A object containing transactions currently in the memory pool.  May be empty

* →<br>TXID
* string : object
* Optional (0 or more)
* The TXID of a transaction in the memory pool, encoded as hex in RPC byte order

* → →<br>`size`
* number (int)
* Required (exactly 1)
* The size of the serialized transaction in bytes

* → →<br>`fee`
* number (bitcoins)
* Required (exactly 1)
* The transaction fee paid by the transaction in decimal bitcoins

* → →<br>`time`
* number (int)
* Required (exactly 1)
* The time the transaction entered the memory pool, Unix epoch time format

* → →<br>`height`
* number (int)
* Required (exactly 1)
* The block height when the transaction entered the memory pool

* → →<br>`startingpriority`
* number (int)
* Required (exactly 1)
* The priority of the transaction when it first entered the memory pool

* → →<br>`currentpriority`
* number (int)
* Required (exactly 1)
* The current priority of the transaction

* → →<br>`depends`
* array
* Required (exactly 1)
* An array holding TXIDs of unconfirmed transactions this transaction depends upon.  Those transactions must be part of a block before this transaction can be added to a block, although all transactions may be included in the same block.  The array may be empty

* → → →<br>Depends TXID
* string
* Optional (0 or more)
* The TXIDs of any unconfirmed transactions this transaction depends upon, encoded as hex in RPC byte order

*Examples from Bitcoin Core 0.10.0*

The default (`false`):

{% highlight bash %}
bitcoin-cli -testnet getrawmempool
{% endhighlight %}

Result:

{% highlight json %}
[
    "2b1f41d6f1837e164d6d6811d3d8dad2e66effbd1058cd9ed7bdbe1cab20ae03",
    "2baa1f49ac9b951fa781c4c95814333a2f3eda71ed3d0245cd76c2829b3ce354"
]
{% endhighlight %}

Verbose output (`true`):

{% highlight bash %}
bitcoin-cli -testnet getrawmempool true
{% endhighlight %}

Result:

{% highlight json %}
{
    "2baa1f49ac9b951fa781c4c95814333a2f3eda71ed3d0245cd76c2829b3ce354" : {
        "size" : 191,
        "fee" : 0.00020000,
        "time" : 1398867772,
        "height" : 227310,
        "startingpriority" : 54545454.54545455,
        "currentpriority" : 54545454.54545455,
        "depends" : [
        ]
    }
}
{% endhighlight %}

*See also*

* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}

{% endautocrossref %}
