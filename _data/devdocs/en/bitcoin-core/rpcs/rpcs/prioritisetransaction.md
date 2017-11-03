{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/prioritisetransaction.md" %}

##### PrioritiseTransaction
{% include helpers/subhead-links.md %}

{% assign summary_prioritiseTransaction="adds virtual priority or fee to a transaction, allowing it to be accepted into blocks mined by this node (or miners which use this node) with a lower priority or fee. (It can also remove virtual priority or fee, requiring the transaction have a higher priority or fee to be accepted into a locally-mined block.)" %}

{% autocrossref %}

The `prioritisetransaction` RPC {{summary_prioritiseTransaction}}

*Parameter #1---the TXID of the transaction to modify*

{% itemplate ntpd1 %}
- n: "TXID"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the transaction whose virtual priority or fee you want to modify, encoded as hex in RPC byte order"

{% enditemplate %}

*Parameter #2---the change to make to the virtual priority*

{% itemplate ntpd1 %}
- n: "Priority"
  t: "number (real)"
  p: "Required<br>(exactly 1)"
  d: "If positive, the priority to add to the transaction in addition to its computed priority; if negative, the priority to subtract from the transaction's computed priory.  Computed priority is the age of each input in days since it was added to the block chain as an output (coinage) times the value of the input in satoshis (value) divided by the size of the serialized transaction (size), which is `coinage * value / size`"

{% enditemplate %}

*Parameter #3---the change to make to the virtual fee*

{% itemplate ntpd1 %}
- n: "Fee"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "**Warning:** this value is in satoshis, not bitcoins<br><br>If positive, the virtual fee to add to the actual fee paid by the transaction; if negative, the virtual fee to subtract from the actual fee paid by the transaction.  No change is made to the actual fee paid by the transaction"

{% enditemplate %}

*Result---`true` if the priority is changed*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "bool (true only)"
  p: "Required<br>(exactly 1)"
  d: "Always set to `true` if all three parameters are provided.  Will not return an error if the TXID is not in the memory pool.  If fewer or more than three arguments are provided, or if something goes wrong, will be set to `null`"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet prioritisetransaction \
    fe0165147da737e16f5096ab6c1709825217377a95a882023ed089a89af4cff9 \
    1234 456789
{% endhighlight %}

Result:

{% highlight json %}
true
{% endhighlight %}

*See also*

* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
