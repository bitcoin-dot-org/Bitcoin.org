{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/utxoupdatepsbt.md" %}

##### UtxoUpdatePsbt
{% include helpers/subhead-links.md %}

{% assign summary_utxoUpdatePsbt="updates a PSBT with witness UTXOs retrieved from the UTXO set or the mempool." %}

{% autocrossref %}

*Added in Bitcoin Core 0.18.0*

The `utxoupdatepsbt` RPC {{summary_utxoUpdatePsbt}}

*Parameter #1---psbt*

{% itemplate ntpd1 %}
- n: "psbt"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "A base64 string of a PSBT"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli utxoupdatepsbt "psbt"
{% endhighlight %}

{% endautocrossref %}
