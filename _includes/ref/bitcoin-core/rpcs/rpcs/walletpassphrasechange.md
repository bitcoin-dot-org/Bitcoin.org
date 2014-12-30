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

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| Current Passphrase | string          | Required<br>(exactly 1)     | The current wallet passphrase
{:.ntpd}

*Parameter #2---the new passphrase*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| New Passphrase     | string          | Required<br>(exactly 1)     | The new passphrase for the wallet
{:.ntpd}

*Result---`null` on success*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| `result`           | null            | Required<br>(exactly 1)     | Always set to JSON `null`
{:.ntpd}

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
