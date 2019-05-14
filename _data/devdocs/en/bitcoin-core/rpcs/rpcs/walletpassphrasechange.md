{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md" %}

##### WalletPassphraseChange
{% include helpers/subhead-links.md %}

{% assign summary_walletPassphraseChange="changes the wallet passphrase from 'oldpassphrase' to 'newpassphrase'." %}

{% autocrossref %}

The `walletpassphrasechange` RPC {{summary_walletPassphraseChange}}

*Parameter #1---oldpassphrase*

{% itemplate ntpd1 %}
- n: "oldpassphrase"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The current passphrase"

{% enditemplate %}

*Parameter #2---newpassphrase*

{% itemplate ntpd1 %}
- n: "newpassphrase"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The new passphrase"

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
bitcoin-cli walletpassphrasechange "old one" "new one"
{% endhighlight %}

*See also*

* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletLock][rpc walletlock]: {{summary_walletLock}}

{% endautocrossref %}
