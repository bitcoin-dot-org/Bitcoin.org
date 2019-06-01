{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/unloadwallet.md" %}

##### UnloadWallet
{% include helpers/subhead-links.md %}

{% assign summary_unloadWallet="unloads the wallet referenced by the request endpoint otherwise unloads the wallet specified in the argument." %}

{% autocrossref %}

The `unloadwallet` RPC {{summary_unloadWallet}}

Specifying the wallet name on a wallet endpoint is invalid.

*Parameter #1---wallet_name*

{% itemplate ntpd1 %}
- n: "wallet_name"
  t: "string"
  p: "Optional<br>Default=the wallet name from the RPC request"
  d: "The name of the wallet to unload."

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
bitcoin-cli unloadwallet wallet_name
{% endhighlight %}

{% endautocrossref %}
