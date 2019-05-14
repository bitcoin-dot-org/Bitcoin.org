{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/walletprocesspsbt.md" %}

##### WalletProcessPsbt
{% include helpers/subhead-links.md %}

{% assign summary_walletProcessPsbt="update a PSBT with input information from our wallet and then sign inputs that we can sign for." %}

{% autocrossref %}

The `walletprocesspsbt` RPC {{summary_walletProcessPsbt}}

*Parameter #1---psbt*

{% itemplate ntpd1 %}
- n: "psbt"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The transaction base64 string"

{% enditemplate %}

*Parameter #2---sign*

{% itemplate ntpd1 %}
- n: "sign"
  t: "boolean"
  p: "Optional<br>Default=true"
  d: "Also sign the transaction when updating"

{% enditemplate %}

*Parameter #3---sighashtype*

{% itemplate ntpd1 %}
- n: "sighashtype"
  t: "string"
  p: "Optional<br>Default=ALL"
  d: "The signature hash type to sign with if not specified by the PSBT. Must be one of
       \"ALL\"
       \"NONE\"
       \"SINGLE\"
       \"ALL|ANYONECANPAY\"
       \"NONE|ANYONECANPAY\"
       \"SINGLE|ANYONECANPAY\""

{% enditemplate %}

*Parameter #4---bip32derivs*

{% itemplate ntpd1 %}
- n: "bip32derivs"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "If true, includes the BIP 32 derivation paths for public keys if we know them"

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "psbt" : "value",          (string) The base64-encoded partially signed transaction
      "complete" : true|false,   (boolean) If the transaction has a complete set of signatures
      ]
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli walletprocesspsbt "psbt"
{% endhighlight %}

{% endautocrossref %}
