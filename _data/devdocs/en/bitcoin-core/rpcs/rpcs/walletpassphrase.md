{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/walletpassphrase.md" %}

##### WalletPassphrase
{% include helpers/subhead-links.md %}

{% assign summary_walletPassphrase="stores the wallet decryption key in memory for 'timeout' seconds." %}

{% autocrossref %}

The `walletpassphrase` RPC {{summary_walletPassphrase}}

This is needed prior to performing transactions related to private keys such as sending bitcoins
Note:

Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock
time that overrides the old one.

*Parameter #1---passphrase*

{% itemplate ntpd1 %}
- n: "passphrase"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The wallet passphrase"

{% enditemplate %}

*Parameter #2---timeout*

{% itemplate ntpd1 %}
- n: "timeout"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The time to keep the decryption key in seconds; capped at 100000000 (~3 years)."

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Unlock the wallet for 60 seconds

{% highlight bash %}
bitcoin-cli walletpassphrase "my pass phrase" 60
{% endhighlight %}
Lock the wallet again (before 60 seconds)

{% highlight bash %}
bitcoin-cli walletlock
{% endhighlight %}

*See also*

* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}
* [WalletLock][rpc walletlock]: {{summary_walletLock}}

{% endautocrossref %}
