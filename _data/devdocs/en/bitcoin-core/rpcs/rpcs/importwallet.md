{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/importwallet.md" %}

##### ImportWallet
{% include helpers/subhead-links.md %}

{% assign summary_importWallet="imports keys from a wallet dump file (see dumpwallet)." %}

{% autocrossref %}

The `importwallet` RPC {{summary_importWallet}}

Requires a new wallet backup to include imported keys.

*Parameter #1---filename*

{% itemplate ntpd1 %}
- n: "filename"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The wallet file"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Dump the wallet

{% highlight bash %}
bitcoin-cli dumpwallet "test"
{% endhighlight %}
Import the wallet

{% highlight bash %}
bitcoin-cli importwallet "test"
{% endhighlight %}
Import using the json rpc call


*See also*

* [DumpWallet][rpc dumpwallet]: {{summary_dumpWallet}}
* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}

{% endautocrossref %}
