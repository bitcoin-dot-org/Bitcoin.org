{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/encryptwallet.md" %}

##### EncryptWallet
{% include helpers/subhead-links.md %}

{% assign summary_encryptWallet="encrypts the wallet with a passphrase.  This is only to enable encryption for the first time. After encryption is enabled, you will need to enter the passphrase to use private keys." %}

{% autocrossref %}

*Requires wallet support.*

The `encryptwallet` RPC {{summary_encryptWallet}}

{{WARNING}} if using this RPC on the command line, remember
that your shell probably saves your command lines (including the value
of the passphrase parameter). In addition, there is no RPC to completely
disable encryption. If you want to return to an unencrypted wallet, you
must create a new wallet and restore your data from a backup made with
the `dumpwallet` RPC.

*Parameter #1---a passphrase*

{% itemplate ntpd1 %}
- n: "Passphrase"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The passphrase to use for the encrypted wallet.  Must be at least one character"

{% enditemplate %}

*Result---a notice (with program shutdown)*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "A notice that the server is stopping and that you need to make a new backup.  The wallet is now encrypted"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet encryptwallet "test"
{% endhighlight %}

Result:

{% highlight text %}
wallet encrypted; Bitcoin server stopping, restart to run with encrypted
wallet. The keypool has been flushed, you need to make a new backup.
{% endhighlight %}

*See also*

* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletLock][rpc walletlock]: {{summary_walletLock}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}

{% endautocrossref %}
