{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/createrawtransaction.md" %}

##### CreateRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_createRawTransaction="creates an unsigned serialized transaction that spends a previous output to a new output with a P2PKH or P2SH address. The transaction is not stored in the wallet or transmitted to the network." %}

{% autocrossref %}

The `createrawtransaction` RPC {{summary_createRawTransaction}}

*Parameter #1---Inputs*

{% itemplate ntpd1 %}
- n: "Inputs"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of objects, each one to be used as an input to the transaction"

- n: "→ Input"
  t: "object"
  p: "Required<br>(1 or more)"
  d: "An object describing a particular input"

- n: "→ →<br>`txid`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the outpoint to be spent encoded as hex in RPC byte order"

- n: "→ →<br>`vout`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The output index number (vout) of the outpoint to be spent; the first output in a transaction is index `0`"
  
- n: "→ →<br>`Sequence`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The sequence number to use for the input"

{% enditemplate %}

*Parameter #2---P2PKH or P2SH addresses and amounts*

{% itemplate ntpd1 %}
- n: "Outputs"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "The addresses and amounts to pay"

- n: "→<br>Address/Amount"
  t: "string : number (bitcoins)"
  p: "Required<br>(1 or more)"
  d: "A key/value pair with the address to pay as a string (key) and the amount to pay that address (value) in bitcoins"

{% enditemplate %}

*Parameter #3---locktime*

{% itemplate ntpd1 %}
- n: "Locktime"
  t: "numeric (int)"
  p: "Optional<br>(0 or 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>Indicates the earliest time a transaction can be added to the block chain"

{% enditemplate %}

*Result---the unsigned raw transaction in hex*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string"
  p: "Required<br>(Exactly 1)"
  d: "The resulting unsigned raw transaction in serialized transaction format encoded as hex.  If the transaction couldn't be generated, this will be set to JSON `null` and the JSON-RPC error field may contain an error message"

{% enditemplate %}

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
* [Serialized Transaction Format][raw transaction format]

{% endautocrossref %}
