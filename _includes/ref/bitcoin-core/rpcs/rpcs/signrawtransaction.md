{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/signrawtransaction.md" %}

##### SignRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_signRawTransaction="signs a transaction in the serialized transaction format using private keys stored in the wallet or provided in the call." %}

{% autocrossref %}

The `signrawtransaction` RPC {{summary_signRawTransaction}}

*Parameter #1---the transaction to sign*

{{json_table}}

* Transaction
* string (hex
* Required (exactly 1)
* The transaction to sign as a serialized transaction

*Parameter #2---unspent transaction output details*

{{json_table}}

* Dependencies
* array
* Optional (0 or 1)
* The previous outputs being spent by this transaction

* →<br>Output
* object
* Optional (0 or more)
* An output being spent

* → →<br>`txid`
* string (hex)
* Required (exactly 1)
* The TXID of the transaction the output appeared in.  The TXID must be encoded in hex in RPC byte order

* → →<br>`vout`
* number (int)
* Required (exactly 1)
* The index number of the output (vout) as it appeared in its transaction, with the first output being 0

* → →<br>`scriptPubKey`
* string (hex)
* Required (exactly 1)
* The output's pubkey script encoded as hex

* → →<br>`redeemScript`
* string (hex)
* Optional (0 or 1)
* If the pubkey script was a script hash, this must be the corresponding redeem script

*Parameter #3---private keys for signing*

{{json_table}}

* Private Keys
* array
* Optional (0 or 1)
* An array holding private keys.  If any keys are provided, only they will be used to sign the transaction (even if the wallet has other matching keys).  If this array is empty or not used, and wallet support is enabled, keys from the wallet will be used

* →<br>Key
* string (base58)
* Required (1 or more)
* A private key in base58check format to use to create a signature for this transaction

*Parameter #4---signature hash type*

{{json_table}}

* SigHash
* string
* Optional (0 or 1)
* The type of signature hash to use for all of the signatures performed.  (You must use separate calls to the `signrawtransaction` RPC if you want to use different signature hash types for different signatures.  The allowed values are: `ALL`, `NONE`, `SINGLE`, `ALL
*ANYONECANPAY`, `NONE
*ANYONECANPAY`, and `SINGLE
*ANYONECANPAY`

*Result---the transaction with any signatures made*

{{json_table}}

* `result`
* object
* Required (exactly 1)
* The results of the signature

* →<br>`hex`
* string (hex)
* Required (exactly 1)
* The resulting serialized transaction encoded as hex with any signatures made inserted.  If no signatures were made, this will be the same transaction provided in parameter #1

* →<br>`complete`
* bool
* Required (exactly 1)
* The value `true` if transaction is fully signed; the value `false` if more signatures are required

*Example from Bitcoin Core 0.10.0*

Sign the hex generated in the example section for the `createrawtransaction`
RPC:

{% highlight bash %}
bitcoin-cli -testnet signrawtransaction 01000000011da9283b4ddf8d\
89eb996988b89ead56cecdc44041ab38bf787f1206cd90b51e0000000000ffff\
ffff01405dc600000000001976a9140dfc8bafc8419853b34d5e072ad37d1a51\
59f58488ac00000000
{% endhighlight %}

Result:

{% highlight json %}
{
    "hex" : "01000000011da9283b4ddf8d89eb996988b89ead56cecdc44041ab38bf787f1206cd90b51e000000006a47304402200ebea9f630f3ee35fa467ffc234592c79538ecd6eb1c9199eb23c4a16a0485a20220172ecaf6975902584987d295b8dddf8f46ec32ca19122510e22405ba52d1f13201210256d16d76a49e6c8e2edc1c265d600ec1a64a45153d45c29a2fd0228c24c3a524ffffffff01405dc600000000001976a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac00000000",
    "complete" : true
}
{% endhighlight %}

*See also*

* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [DecodeRawTransaction][rpc decoderawtransaction]: {{summary_decodeRawTransaction}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}

{% endautocrossref %}
