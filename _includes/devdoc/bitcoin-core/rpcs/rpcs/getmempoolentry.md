{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getmempoolentry.md" %}

##### GetMemPoolEntry
{% include helpers/subhead-links.md %}

{% assign summary_getMemPoolEntry="returns mempool data for given transaction (must be in mempool)." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

The `getmempoolentry` RPC {{summary_getMemPoolEntry}}

*Parameter #1---a transaction identifier (TXID)*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The address whose transactions should be tallied"

{% enditemplate %}

*Result ---a JSON object describing the transaction*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "A object containing transactions currently in the memory pool.  May be empty"

- n: "→<br>`size`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of the serialized transaction in bytes"

- n: "→<br>`fee`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The transaction fee paid by the transaction in decimal bitcoins"
  
- n: "→<br>`modifiedfee`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The transaction fee with fee deltas used for mining priority in decimal bitcoins"

- n: "→<br>`time`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The time the transaction entered the memory pool, Unix epoch time format"

- n: "→<br>`height`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The block height when the transaction entered the memory pool"

- n: "→<br>`startingpriority`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The priority of the transaction when it first entered the memory pool"

- n: "→<br>`currentpriority`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The current priority of the transaction"

- n: "→<br>`descendantcount`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of in-mempool descendant transactions (including this one)"

- n: "→<br>`descendantsize`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of in-mempool descendants (including this one)"

- n: "→<br>`descendantfees`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The modified fees (see `modifiedfee` above) of in-mempool descendants (including this one)"

- n: "→<br>`ancestorcount`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of in-mempool ancestor transactions (including this one)"

- n: "→<br>`ancestorsize`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of in-mempool ancestors (including this one)"

- n: "→<br>`ancestorfees`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The modified fees (see `modifiedfee` above) of in-mempool ancestors (including this one)"

- n: "→<br>`depends`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array holding TXIDs of unconfirmed transactions this transaction depends upon (parent transactions).  Those transactions must be part of a block before this transaction can be added to a block, although all transactions may be included in the same block.  The array may be empty"

- n: "→ →<br>Depends TXID"
  t: "string"
  p: "Optional (0 or more)"
  d: "The TXIDs of any unconfirmed transactions this transaction depends upon, encoded as hex in RPC byte order"

{% enditemplate %}

*Examples from Bitcoin Core 0.13.1*

{% highlight bash %}
bitcoin-cli getmempoolentry 52273e0ce6cf3452932cfbc1c517c0ce1af1\
d255fda67a6e3bd63ba1d908c8c2
{% endhighlight %}

Result:

{% highlight json %}
{
    "size": 485,
    "fee": 0.00009700,
    "modifiedfee": 0.00009700,
    "time": 1479423635,
    "height": 439431,
    "startingpriority": 15327081.81818182,
    "currentpriority": 21536936.36363636,
    "descendantcount": 1,
    "descendantsize": 485,
    "descendantfees": 9700,
    "ancestorcount": 1,
    "ancestorsize": 485,
    "ancestorfees": 9700,
    "depends": [
    ]
}
{% endhighlight %}

*See also*

* [GetMemPoolAncestors][rpc getmempoolancestors]: {{summary_getMemPoolAncestors}}
* [GetMemPoolDescendants][rpc getmempooldescendants]: {{summary_getMemPoolDescendants}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}

{% endautocrossref %}