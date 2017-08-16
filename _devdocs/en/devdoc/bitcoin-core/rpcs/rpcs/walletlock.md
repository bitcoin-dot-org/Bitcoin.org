---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
---

##### WalletLock

{% assign summary_walletLock="removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call `walletpassphrase` again before being able to call any methods which require the wallet to be unlocked." %}

*Requires wallet support. Requires an unlocked wallet.*

The `walletlock` RPC {{summary_walletLock}}

*Parameters: none*

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "Always set to JSON `null`"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet walletlock
{% endhighlight %}

(Success: nothing printed.)

*See also*

* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}

