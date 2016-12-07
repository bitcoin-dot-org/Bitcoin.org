{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getmempooldescendants.md" %}

##### GetMemPoolDescendants
{% include helpers/subhead-links.md %}

{% assign summary_getMemPoolDescendants="returns all in-mempool descendants for a transaction in the mempool." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

The `getmempooldescendants` RPC {{summary_getMemPoolDescendants}}

*Parameter #1---a transaction identifier (TXID)*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The address whose transactions should be tallied"

{% enditemplate %}

*Parameter #2---desired output format*

{% itemplate ntpd1 %}
- n: "Format"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` to get json objects describing each transaction in the memory pool; set to `false` (the default) to only get an array of TXIDs"

{% enditemplate %}

*Result---list of descendant transactions*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of TXIDs belonging to transactions in the memory pool.  The array may be empty if there are no transactions in the memory pool"

- n: "→<br>TXID"
  t: "string"
  p: "Optional<br>(0 or more)"
  d: "The TXID of a transaction in the memory pool, encoded as hex in RPC byte order"

{% enditemplate %}

*Result (format: `true`)---a JSON object describing each transaction*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "A object containing transactions currently in the memory pool.  May be empty"

- n: "→<br>TXID"
  t: "string : object"
  p: "Optional<br>(0 or more)"
  d: "The TXID of a transaction in the memory pool, encoded as hex in RPC byte order"

- n: "→ →<br>`size`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of the serialized transaction in bytes"

- n: "→ →<br>`fee`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The transaction fee paid by the transaction in decimal bitcoins"
  
- n: "→ →<br>`modifiedfee`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The transaction fee with fee deltas used for mining priority in decimal bitcoins"

- n: "→ →<br>`time`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The time the transaction entered the memory pool, Unix epoch time format"

- n: "→ →<br>`height`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The block height when the transaction entered the memory pool"

- n: "→ →<br>`startingpriority`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The priority of the transaction when it first entered the memory pool"

- n: "→ →<br>`currentpriority`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The current priority of the transaction"

- n: "→ →<br>`descendantcount`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of in-mempool descendant transactions (including this one)"

- n: "→ →<br>`descendantsize`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of in-mempool descendants (including this one)"

- n: "→ →<br>`descendantfees`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The modified fees (see `modifiedfee` above) of in-mempool descendants (including this one)"

- n: "→ →<br>`ancestorcount`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of in-mempool ancestor transactions (including this one)"

- n: "→ →<br>`ancestorsize`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of in-mempool ancestors (including this one)"

- n: "→ →<br>`ancestorfees`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The modified fees (see `modifiedfee` above) of in-mempool ancestors (including this one)"

- n: "→ →<br>`depends`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array holding TXIDs of unconfirmed transactions this transaction depends upon (parent transactions).  Those transactions must be part of a block before this transaction can be added to a block, although all transactions may be included in the same block.  The array may be empty"

- n: "→ → →<br>Depends TXID"
  t: "string"
  p: "Optional (0 or more)"
  d: "The TXIDs of any unconfirmed transactions this transaction depends upon, encoded as hex in RPC byte order"

{% enditemplate %}

*Examples from Bitcoin Core 0.13.1*

The default (`false`):

{% highlight bash %}
bitcoin-cli getmempooldescendants 52273e0ce6cf3452932cfbc1c517c0\
ce1af1d255fda67a6e3bd63ba1d908c8c2
{% endhighlight %}

Result:

{% highlight json %}
[
    "b104586f229e330caf42c475fd52684e9eb5e2d02f0fcd216d9554c5347b0873",
    "094f7dcbc7494510d4daeceb2941ed73b1bd011bf527f6c3b7c897fee85c11d4"
]
{% endhighlight %}

Verbose output (`true`):

{% highlight bash %}
bitcoin-cli getmempooldescendants 52273e0ce6cf3452932cfbc1c517c0\
ce1af1d255fda67a6e3bd63ba1d908c8c2 true
{% endhighlight %}

Result:

{% highlight json %}
{
  "b104586f229e330caf42c475fd52684e9eb5e2d02f0fcd216d9554c5347b0873": {
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
  },
  "094f7dcbc7494510d4daeceb2941ed73b1bd011bf527f6c3b7c897fee85c11d4": {
    "size": 554,
    "fee": 0.00005540,
    "modifiedfee": 0.00005540,
    "time": 1479423327,
    "height": 439430,
    "startingpriority": 85074.91071428571,
    "currentpriority": 3497174.4375,
    "descendantcount": 1,
    "descendantsize": 554,
    "descendantfees": 5540,
    "ancestorcount": 1,
    "ancestorsize": 554,
    "ancestorfees": 5540,
    "depends": [
    ]
  }
}
{% endhighlight %}

*See also*

* [GetMemPoolAncestors][rpc getmempoolancestors]: {{summary_getMemPoolAncestors}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}

{% endautocrossref %}
