{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/abandontransaction.md" %}

##### AbandonTransaction
{% include helpers/subhead-links.md %}

{% assign summary_abandonTransaction="marks an in-wallet transaction and all its in-wallet descendants as abandoned. This allows their inputs to be respent." %}

{% autocrossref %}

*Added in Bitcoin Core 0.12.0*

The `abandontransaction` RPC {{summary_abandonTransaction}}

*Parameter #1---a transaction identifier (TXID)*

{% itemplate ntpd1 %}
- n: "TXID"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the transaction that you want to abandon.  The TXID must be encoded as hex in RPC byte order"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the transaction and all descendants were abandoned"

{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

Abandons the transaction on your node.

{% highlight bash %}
bitcoin-cli abandontransaction fa3970c341c9f5de6ab13f128cbfec58d732e736a505fe32137ad551c799ecc4
{% endhighlight %}

Result (no output from `bitcoin-cli` because result is set to `null`).

*See also*

* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}

{% endautocrossref %}
