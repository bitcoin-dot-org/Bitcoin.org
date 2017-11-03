{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/bumpfee.md" %}

##### BumpFee
{% include helpers/subhead-links.md %}

{% assign summary_bumpFee="replaces an unconfirmed wallet transaction that signaled RBF with a new transaction that pays a higher fee." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

*Requires wallet support. Wallet must be unlocked.*

The `bumpfee` RPC {{summary_bumpFee}} The increased fee is deducted from the change output. The command fails if the change output is too small to increase the fee or 
if the wallet or mempool contains a transaction that spends one of the transaction's outputs. The `-walletrbf` option needs to be enabled (default is `false`).

*Parameter #1---The TXID of the transaction*

{% itemplate ntpd1 %}
- n: "TXID"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The id of the transaction"

{% enditemplate %}

*Parameter #2---Additional options*

{% itemplate ntpd1 %}
- n: "Options"
  t: "Object"
  p: "Optional<br>(0 or 1)"
  d: "Additional options"

- n: "→ <br>`confTarget`"
  t: "numeric (int)"
  p: "Optional<br>(0 or 1)"
  d: "The confirmation target in blocks. Based on this value the new fee will be calculated using the same code as the `estimatefee` RPC. If not set, the default target of ´6´ blocks will be used"
  
- n: "→ <br>`totalFee`"
  t: "numeric (satoshis)"
  p: "Optional<br>(0 or 1)"
  d: "The total fee to pay in satoshis (not the feerate). The actual fee can be higher in rare cases if the change output is close to the dust limit"

- n: "→ <br>`replaceable`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Whether the new transaction should still be BIP 125 replaceable. Even if set to `false` the transaction may still be replacable, for example if it has unconfirmed ancestors which are replaceable. The default is `true`"
  
{% enditemplate %}

*Result---information about the new transaction*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object including information about the new transaction"

- n: "→ <br>`txid`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The id of the new transaction"

- n: "→ <br>`origfee`"
  t: "numeric (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The fee of the replaced transaction"

- n: "→ <br>`fee`"
  t: "numeric (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The fee of the new transaction"
  
- n: "→ <br>`errors`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "Errors encountered during processing (may be empty)"

{% enditemplate %}

*Example from Bitcoin Core 0.14.1*

{% highlight bash %}
bitcoin-cli -testnet bumpfee d4a33e0cabaz723149e1fcab4e033a40173\
88a644c65370e3cb06ba2f0e13975\
'{
    "totalFee": 4000,
    "replaceable": false
}'
{% endhighlight %}

Result:

{% highlight json %}
{
	"txid": "37a55ce49636977k79bcb04ee1143573b570b1743e09660e79e7ec3320968ca54",
	"origfee": 0.00002450,
	"fee": 0.00004000,
	"errors": ""
}
{% endhighlight %}

*See also*

* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [FundRawTransaction][rpc fundrawtransaction]: {{summary_fundRawTransaction}}
* [SignRawTransaction][rpc signrawtransaction]: {{summary_signRawTransaction}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}
* [Serialized Transaction Format][raw transaction format]

{% endautocrossref %}
