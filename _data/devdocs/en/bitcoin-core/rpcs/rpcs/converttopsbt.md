{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/converttopsbt.md" %}

##### ConvertToPsbt
{% include helpers/subhead-links.md %}

{% assign summary_convertToPsbt="converts a network serialized transaction to a PSBT." %}

{% autocrossref %}

The `converttopsbt` RPC {{summary_convertToPsbt}}

This should be used only with createrawtransaction and fundrawtransaction
createpsbt and walletcreatefundedpsbt should be used for new applications.

*Parameter #1---hexstring*

{% itemplate ntpd1 %}
- n: "hexstring"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The hex string of a raw transaction"

{% enditemplate %}

*Parameter #2---permitsigdata*

{% itemplate ntpd1 %}
- n: "permitsigdata"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "If true, any signatures in the input will be discarded and conversion.
       will continue. If false, RPC will fail if any signatures are present."

{% enditemplate %}

*Parameter #3---iswitness*

{% itemplate ntpd1 %}
- n: "iswitness"
  t: "boolean"
  p: "Optional<br>Default=depends on heuristic tests"
  d: "Whether the transaction hex is a serialized witness transaction.
       If iswitness is not present, heuristic tests will be used in decoding. If true, only witness deserializaion
       will be tried. If false, only non-witness deserialization will be tried. Only has an effect if
       permitsigdata is true."

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Create a transaction

{% highlight bash %}
bitcoin-cli createrawtransaction "[{\"txid\":\"myid\",\"vout\":0}]" "[{\"data\":\"00010203\"}]"
{% endhighlight %}
Convert the transaction to a PSBT

{% highlight bash %}
bitcoin-cli converttopsbt "rawtransaction"
{% endhighlight %}

{% endautocrossref %}
