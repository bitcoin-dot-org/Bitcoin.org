{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/createrawtransaction.md" %}

##### CreateRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_createRawTransaction="creates an unsigned serialized transaction that spends a previous output to a new output with a P2PKH or P2SH address. The transaction is not stored in the wallet or transmitted to the network." %}

{% autocrossref %}

The `createrawtransaction` RPC {{summary_createRawTransaction}}

*Parameter #1---references to previous outputs*

{{json_table}}

* Outpoints
* array
* Required (exactly 1)
* An array of objects, each one being an unspent outpoint

* → Outpoint
* object
* Required (1 or more)
* An object describing a particular unspent outpoint

* → →<br>`txid`
* string (hex)
* Required (exactly 1)
* The TXID of the outpoint encoded as hex in RPC byte order

* → →<br>`vout`
* number (int)
* Required (exactly 1)
* The output index number (vout) of the outpoint; the first output in a transaction is index `0`

*Parameter #2---P2PKH or P2SH addresses and amounts*

{{json_table}}

* Outputs
* object
* Required (exactly 1)
* The addresses and amounts to pay

* →<br>Address/Amount
* string : number (bitcoins)
* Required (1 or more)
* A key/value pair with the address to pay as a string (key) and the amount to pay that address (value) in bitcoins

*Result---the unsigned raw transaction in hex*

{{json_table}}

* `result`
* string
* Required (Exactly 1)
* The resulting unsigned raw transaction in serialized transaction format encoded as hex.  If the transaction couldn't be generated, this will be set to JSON `null` and the JSON-RPC error field may contain an error message

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet createrawtransaction '''
  [
    {
      "txid": "1eb590cd06127f78bf38ab4140c4cdce56ad9eb8886999eb898ddf4d3b28a91d",
      "vout" : 0
    }
  ]''' '{ "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe": 0.13 }'
{% endhighlight %}

Result (wrapped):

{% highlight text %}
01000000011da9283b4ddf8d89eb996988b89ead56cecdc44041ab38bf787f12\
06cd90b51e0000000000ffffffff01405dc600000000001976a9140dfc8bafc8\
419853b34d5e072ad37d1a5159f58488ac00000000
{% endhighlight %}

*See also*

* [DecodeRawTransaction][rpc decoderawtransaction]: {{summary_decodeRawTransaction}}
* [SignRawTransaction][rpc signrawtransaction]: {{summary_signRawTransaction}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}
* [Serialized Transaction Format][raw format]

{% endautocrossref %}
