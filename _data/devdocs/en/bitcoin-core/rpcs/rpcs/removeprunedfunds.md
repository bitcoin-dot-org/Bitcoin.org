{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/removeprunedfunds.md" %}

##### RemovePrunedFunds
{% include helpers/subhead-links.md %}

{% assign summary_removePrunedFunds="deletes the specified transaction from the wallet." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

The `removeprunedfunds` RPC {{summary_removePrunedFunds}}

Meant for use with pruned wallets and as a companion to importprunedfunds. This will affect wallet balances.

*Parameter #1---txid*

{% itemplate ntpd1 %}
- n: "txid"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The hex-encoded id of the transaction you are deleting"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli removeprunedfunds "a8d0c0184dde994a09ec054286f1ce581bebf46446a512166eae7628734ea0a5"
{% endhighlight %}

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [ImportPrunedFunds][rpc importprunedfunds]: {{summary_importPrunedFunds}}

{% endautocrossref %}
