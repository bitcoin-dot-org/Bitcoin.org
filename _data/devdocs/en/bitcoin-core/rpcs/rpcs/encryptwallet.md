{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/encryptwallet.md" %}

##### EncryptWallet
{% include helpers/subhead-links.md %}

{% assign summary_encryptWallet="encrypts the wallet with 'passphrase'." %}

{% autocrossref %}

The `encryptwallet` RPC {{summary_encryptWallet}}

This is for first time encryption.

After this, any calls that interact with private keys such as sending or signing
will require the passphrase to be set prior the making these calls.

Use the walletpassphrase call for this, and then walletlock call.

If the wallet is already encrypted, use the walletpassphrasechange call.

*Parameter #1---passphrase*

{% itemplate ntpd1 %}
- n: "passphrase"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The pass phrase to encrypt the wallet with. It must be at least 1 character, but should be long."

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Encrypt your wallet

{% highlight bash %}
bitcoin-cli encryptwallet "my pass phrase"
{% endhighlight %}
Now set the passphrase to use the wallet, such as for signing or sending bitcoin

{% highlight bash %}
bitcoin-cli walletpassphrase "my pass phrase"
{% endhighlight %}
Now we can do something like sign

{% highlight bash %}
bitcoin-cli signmessage "address" "test message"
{% endhighlight %}
Now lock the wallet again by removing the passphrase

{% highlight bash %}
bitcoin-cli walletlock
{% endhighlight %}

*See also*

* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletLock][rpc walletlock]: {{summary_walletLock}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}

{% endautocrossref %}
