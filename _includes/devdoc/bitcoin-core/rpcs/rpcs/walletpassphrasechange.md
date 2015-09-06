{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md" %}

##### WalletPassphraseChange
{% include helpers/subhead-links.md %}

{% assign summary_walletPassphraseChange="changes the wallet passphrase from 'old passphrase' to 'new passphrase'." %}

{% autocrossref %}

*Requires wallet support.  Requires an encrypted wallet.*

The `walletpassphrasechange` RPC {{summary_walletPassphraseChange}}

{{WARNING}} if using this RPC on the command line, remember
that your shell probably saves your command lines (including the
value of the passphrase parameter).

*Parameter #1---the current passphrase*

{% itemplate ntpd1 %}
- n: "Current Passphrase"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The current wallet passphrase"

{% enditemplate %}

*Parameter #2---the new passphrase*

{% itemplate ntpd1 %}
- n: "New Passphrase"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The new passphrase for the wallet"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "Always set to JSON `null`"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Change the wallet passphrase from "test" to "example":

{% highlight bash %}
bitcoin-cli -testnet walletpassphrasechange test example
{% endhighlight %}

(Success: no result printed.)

*See also*

* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletLock][rpc walletlock]: {{summary_walletLock}}

{% endautocrossref %}
