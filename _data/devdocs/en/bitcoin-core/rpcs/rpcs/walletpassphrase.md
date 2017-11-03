{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/walletpassphrase.md" %}

##### WalletPassphrase
{% include helpers/subhead-links.md %}

{% assign summary_walletPassphrase="stores the wallet decryption key in memory for the indicated number of seconds. Issuing the `walletpassphrase` command while the wallet is already unlocked will set a new unlock time that overrides the old one." %}

{% autocrossref %}

*Requires wallet support. Requires an encrypted wallet.*

The `walletpassphrase` RPC {{summary_walletPassphrase}}

{{WARNING}} if using this RPC on the command line, remember
that your shell probably saves your command lines (including the
value of the passphrase parameter).

*Parameter #1---the passphrase*

{% itemplate ntpd1 %}
- n: "Passphrase"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The passphrase that unlocks the wallet"

{% enditemplate %}

*Parameter #2---the number of seconds to leave the wallet unlocked*

{% itemplate ntpd1 %}
- n: "Seconds"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of seconds after which the decryption key will be automatically deleted from memory"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "Always set to JSON `null`"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Unlock the wallet for 10 minutes (the passphrase is "test"):

{% highlight bash %}
bitcoin-cli -testnet walletpassphrase test 600
{% endhighlight %}

(Success: no result printed.)

*See also*

* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}
* [WalletLock][rpc walletlock]: {{summary_walletLock}}

{% endautocrossref %}
