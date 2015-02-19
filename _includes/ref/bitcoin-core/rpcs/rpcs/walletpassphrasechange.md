{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md" %}

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

{{json_table}}

* Current Passphrase
* string
* Required (exactly 1)
* The current wallet passphrase

*Parameter #2---the new passphrase*

{{json_table}}

* New Passphrase
* string
* Required (exactly 1)
* The new passphrase for the wallet

*Result---`null` on success*

{{json_table}}

* `result`
* null
* Required (exactly 1)
* Always set to JSON `null`

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
