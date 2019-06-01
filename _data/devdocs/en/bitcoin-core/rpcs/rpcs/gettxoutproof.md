{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxoutproof.md" %}

##### GetTxOutProof
{% include helpers/subhead-links.md %}

{% assign summary_getTxOutProof="returns a hex-encoded proof that "txid" was included in a block." %}

{% autocrossref %}

*Added in Bitcoin Core 0.11.0*

The `gettxoutproof` RPC {{summary_getTxOutProof}}

NOTE: By default this function only works sometimes. This is when there is an
unspent output in the utxo for this transaction. To make it always work,
you need to maintain a transaction index, using the -txindex command line option or
specify the block in which the transaction is included manually (by blockhash).

*Parameter #1---txids*

{% itemplate ntpd1 %}
- n: "txids"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "A json array of txids to filter"

{% enditemplate %}

{% endautocrossref %}

    [
      "txid",    (string) A transaction hash
      ...
    ]

{% autocrossref %}

*Parameter #2---blockhash*

{% itemplate ntpd1 %}
- n: "blockhash"
  t: "string"
  p: "Optional"
  d: "If specified, looks for txid in the block with this hash"

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "A string that is a serialized, hex-encoded data for the proof."

{% enditemplate %}

*See also*

* [VerifyTxOutProof][rpc verifytxoutproof]: {{summary_verifyTxOutProof}}
* [`merkleblock` message][merkleblock message]: A description of the
  format used for the proof.

{% endautocrossref %}
