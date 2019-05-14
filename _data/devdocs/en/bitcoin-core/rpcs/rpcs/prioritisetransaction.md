{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/prioritisetransaction.md" %}

##### PrioritiseTransaction
{% include helpers/subhead-links.md %}

{% assign summary_prioritiseTransaction="accepts the transaction into mined blocks at a higher (or lower) priority." %}

{% autocrossref %}

The `prioritisetransaction` RPC {{summary_prioritiseTransaction}}

*Parameter #1---txid*

{% itemplate ntpd1 %}
- n: "txid"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The transaction id."

{% enditemplate %}

*Parameter #2---dummy*

{% itemplate ntpd1 %}
- n: "dummy"
  t: "number (int)"
  p: "Optional"
  d: "API-Compatibility for previous API. Must be zero or null.
       DEPRECATED. For forward compatibility use named arguments and omit this parameter."

{% enditemplate %}

*Parameter #3---fee_delta*

{% itemplate ntpd1 %}
- n: "fee_delta"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The fee value (in satoshis) to add (or subtract, if negative).
       Note, that this value is not a fee rate. It is a value to modify absolute fee of the TX.
       The fee is not actually paid, only the algorithm for selecting transactions into a block
       considers the transaction as it would have paid a higher (or lower) fee."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "boolean"
  p: "Required<br>(exactly 1)"
  d: "Returns true"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli prioritisetransaction "txid" 0.0 10000
{% endhighlight %}

*See also*

* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
