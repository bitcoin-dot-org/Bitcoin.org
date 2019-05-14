{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/importprunedfunds.md" %}

##### ImportPrunedFunds
{% include helpers/subhead-links.md %}

{% assign summary_importPrunedFunds="imports funds without rescan." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

The `importprunedfunds` RPC {{summary_importPrunedFunds}}

Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included.

*Parameter #1---rawtransaction*

{% itemplate ntpd1 %}
- n: "rawtransaction"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "A raw transaction in hex funding an already-existing address in wallet"

{% enditemplate %}

*Parameter #2---txoutproof*

{% itemplate ntpd1 %}
- n: "txoutproof"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The hex output from gettxoutproof that contains the transaction"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [RemovePrunedFunds][rpc removeprunedfunds]: {{summary_removePrunedFunds}}

{% endautocrossref %}
