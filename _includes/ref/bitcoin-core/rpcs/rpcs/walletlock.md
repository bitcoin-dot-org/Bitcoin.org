{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/walletlock.md" %}

##### WalletLock
{% include helpers/subhead-links.md %}

{% assign summary_walletLock="removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call `walletpassphrase` again before being able to call any methods which require the wallet to be unlocked." %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet.*

The `walletlock` RPC {{summary_walletLock}}

*Parameters: none*

*Result---`null` on success*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| `result`           | null            | Required<br>(exactly 1)     | Always set to JSON `null`

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet walletlock
{% endhighlight %}

(Success: nothing printed.)

*See also*

* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}

{% endautocrossref %}
