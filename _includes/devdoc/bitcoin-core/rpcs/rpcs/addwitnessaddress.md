{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/addwitnessaddress.md" %}

##### AddWitnessAddress
{% include helpers/subhead-links.md %}

{% assign summary_addWitnessAddress="adds a witness address for a script (with pubkey or redeem script known)." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

*Requires wallet support. Requires an unlocked wallet or an unencrypted wallet.*

The `addwitnessaddress` RPC {{summary_addWitnessAddress}}

*Parameter #1---the witness address*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "A witness address that gets added to a script.  Needs to be in the wallet and uncompressed"

{% enditemplate %}

*Result---the witness script*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The value of the new address (P2SH of witness script)"

{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

{% highlight bash %}
bitcoin-cli addwitnessaddress 1BRo7qrYHMPrzdBDzfjmzteBdYAyTMXW75
{% endhighlight %}

Result:

The RPC is disabled by default on mainnet as long as Segregated Witness has not been activated.
`-walletprematurewitness` enables the RPC.

{% highlight text %}
3LfAujMsBHgQKoxLn59dVbeYPmfUrHSAQb
{% endhighlight %}

*See also*

* [BIP-141 - Segregated Witness](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)
* [BIP-142 - Address Format for Segregated Witness](https://github.com/bitcoin/bips/blob/master/bip-0142.mediawiki)

{% endautocrossref %}
