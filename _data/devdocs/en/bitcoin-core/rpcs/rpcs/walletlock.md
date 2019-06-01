{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/walletlock.md" %}

##### WalletLock
{% include helpers/subhead-links.md %}

{% assign summary_walletLock="removes the wallet encryption key from memory, locking the wallet." %}

{% autocrossref %}

The `walletlock` RPC {{summary_walletLock}}

After calling this method, you will need to call walletpassphrase again
before being able to call any methods which require the wallet to be unlocked.

*Parameters: none*

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Set the passphrase for 2 minutes to perform a transaction

{% highlight bash %}
bitcoin-cli walletpassphrase "my pass phrase" 120
{% endhighlight %}
Perform a send (requires passphrase set)

{% highlight bash %}
bitcoin-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 1.0
{% endhighlight %}
Clear the passphrase since we are done before 2 minutes is up

{% highlight bash %}
bitcoin-cli walletlock
{% endhighlight %}

*See also*

* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}

{% endautocrossref %}
