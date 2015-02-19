{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/dumpprivkey.md" %}

##### DumpPrivKey
{% include helpers/subhead-links.md %}

{% assign summary_dumpPrivKey="returns the wallet-import-format (WIP) private key corresponding to an address. (But does not remove it from the wallet.)" %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet or an
unencrypted wallet.*

The `dumpprivkey` RPC {{summary_dumpPrivKey}}

*Parameter #1---the address corresponding to the private key to get*

{{json_table}}

* P2PKH Address
* string (base58)
* Required (exactly 1)
* The P2PKH address corresponding to the private key you want returned.  Must be the address corresponding to a private key in this wallet

*Result---the private key*

{{json_table}}

* `result`
* string (base58)
* Required (exactly 1)
* The private key encoded as base58check using wallet import format

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet dumpprivkey moQR7i8XM4rSGoNwEsw3h4YEuduuP6mxw7
{% endhighlight %}

Result:

{% highlight text %}
cTVNtBK7mBi2yc9syEnwbiUpnpGJKohDWzXMeF4tGKAQ7wvomr95
{% endhighlight %}

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [DumpWallet][rpc dumpwallet]: {{summary_dumpWallet}}

{% endautocrossref %}
