{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/finalizepsbt.md" %}

##### FinalizePsbt
{% include helpers/subhead-links.md %}

{% assign summary_finalizePsbt="finalize the inputs of a PSBT." %}

{% autocrossref %}

The `finalizepsbt` RPC {{summary_finalizePsbt}}

If the transaction is fully signed, it will produce a
network serialized transaction which can be broadcast with sendrawtransaction. Otherwise a PSBT will be
created which has the final_scriptSig and final_scriptWitness fields filled for inputs that are complete.

Implements the Finalizer and Extractor roles.

*Parameter #1---psbt*

{% itemplate ntpd1 %}
- n: "psbt"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "A base64 string of a PSBT"

{% enditemplate %}

*Parameter #2---extract*

{% itemplate ntpd1 %}
- n: "extract"
  t: "boolean"
  p: "Optional<br>Default=true"
  d: "If true and the transaction is complete,
       extract and return the complete transaction in normal network serialization instead of the PSBT."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "psbt" : "value",          (string) The base64-encoded partially signed transaction if not extracted
      "hex" : "value",           (string) The hex-encoded network transaction if extracted
      "complete" : true|false,   (boolean) If the transaction has a complete set of signatures
      ]
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli finalizepsbt "psbt"
{% endhighlight %}

{% endautocrossref %}
