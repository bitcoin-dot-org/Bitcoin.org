{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/importprunedfunds.md" %}

##### ImportPrunedFunds
{% include helpers/subhead-links.md %}

{% assign summary_importPrunedFunds="imports funds without the need of a rescan. Meant for use with pruned wallets." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

*Requires wallet support.*

The `importprunedfunds` RPC {{summary_importPrunedFunds}} Corresponding address or script must previously be included in wallet. 
The end-user is responsible to import additional transactions that subsequently spend the imported 
outputs or rescan after the point in the blockchain the transaction is included.

*Parameter #1---the raw transaction to import*

{% itemplate ntpd1 %}
- n: "Raw Transaction"
  t: "string<br>(hex)"
  p: "Required<br>(exactly 1)"
  d: "A raw transaction in hex funding an already-existing address in wallet"

{% enditemplate %}

*Parameter #2---the tx out proof that cointains the transaction*

{% itemplate ntpd1 %}
- n: "TX Out Proof"
  t: "string<br>(hex)"
  p: "Required<br>(exactly 1)"
  d: "The hex output from gettxoutproof that contains the transaction"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "If the funds are added to wallet, JSON `null` will be returned"

{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

{% highlight bash %}
bitcoin-cli importprunedfunds "txhex" "txoutproof"
{% endhighlight %}

(Success: no result displayed.)

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [RemovePrunedFunds][rpc removeprunedfunds]: {{summary_removePrunedFunds}}

{% endautocrossref %}
