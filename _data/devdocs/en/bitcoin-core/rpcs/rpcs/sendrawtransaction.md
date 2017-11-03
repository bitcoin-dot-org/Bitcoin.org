{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/sendrawtransaction.md" %}

##### SendRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_sendRawTransaction="validates a transaction and broadcasts it to the peer-to-peer network." %}

{% autocrossref %}

The `sendrawtransaction` RPC {{summary_sendRawTransaction}}

*Parameter #1---a serialized transaction to broadcast*

{% itemplate ntpd1 %}
- n: "Transaction"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The serialized transaction to broadcast encoded as hex"

{% enditemplate %}

*Parameter #2--whether to allow high fees**

{% itemplate ntpd1 %}
- n: "Allow High Fees"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` to allow the transaction to pay a high transaction fee.  Set to `false` (the default) to prevent Bitcoin Core from broadcasting the transaction if it includes a high fee.  Transaction fees are the sum of the inputs minus the sum of the outputs, so this high fees check helps ensures user including a change address to return most of the difference back to themselves"

{% enditemplate %}

*Result---a TXID or error message*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null/string (hex)"
  p: "Required<br>(exactly 1)"
  d: "If the transaction was accepted by the node for broadcast, this will be the TXID of the transaction encoded as hex in RPC byte order.  If the transaction was rejected by the node, this will set to `null`, the JSON-RPC error field will be set to a code, and the JSON-RPC message field may contain an informative error message"

{% enditemplate %}

*Examples from Bitcoin Core 0.10.0*

Broadcast a signed transaction:

{% highlight bash %}
bitcoin-cli -testnet sendrawtransaction 01000000011da9283b4ddf8d\
89eb996988b89ead56cecdc44041ab38bf787f1206cd90b51e000000006a4730\
4402200ebea9f630f3ee35fa467ffc234592c79538ecd6eb1c9199eb23c4a16a\
0485a20220172ecaf6975902584987d295b8dddf8f46ec32ca19122510e22405\
ba52d1f13201210256d16d76a49e6c8e2edc1c265d600ec1a64a45153d45c29a\
2fd0228c24c3a524ffffffff01405dc600000000001976a9140dfc8bafc84198\
53b34d5e072ad37d1a5159f58488ac00000000
{% endhighlight %}

Result:

{% highlight text %}
f5a5ce5988cc72b9b90e8d1d6c910cda53c88d2175177357cc2f2cf0899fbaad
{% endhighlight %}

*See also*

* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [DecodeRawTransaction][rpc decoderawtransaction]: {{summary_decodeRawTransaction}}
* [SignRawTransaction][rpc signrawtransaction]: {{summary_signRawTransaction}}

{% endautocrossref %}
