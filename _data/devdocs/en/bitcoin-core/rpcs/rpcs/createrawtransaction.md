{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/createrawtransaction.md" %}

##### CreateRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_createRawTransaction="create a transaction spending the given inputs and creating new outputs." %}

{% autocrossref %}

The `createrawtransaction` RPC {{summary_createRawTransaction}}

Outputs can be addresses or data.

Returns hex-encoded raw transaction.

Note that the transaction's inputs are not signed, and
it is not stored in the wallet or transmitted to the network.

*Parameter #1---inputs*

{% itemplate ntpd1 %}
- n: "inputs"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "A json array of json objects"

{% enditemplate %}

{% endautocrossref %}

    [
      {                       (json object)
        "txid": "hex",        (string, required) The transaction id
        "vout": n,            (numeric, required) The output number
        "sequence": n,        (numeric, optional, default=depends on the value of the 'replaceable' and 'locktime' arguments) The sequence number
      },
      ...
    ]

{% autocrossref %}

*Parameter #2---outputs*

{% itemplate ntpd1 %}
- n: "outputs"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "a json array with outputs (key-value pairs), where none of the keys are duplicated.
       That is, each address can only appear once and there can only be one 'data' object.
       For compatibility reasons, a dictionary, which holds the key-value pairs directly, is also
       accepted as second parameter."

{% enditemplate %}

{% endautocrossref %}

    [
      {                       (json object)
        "address": amount,    (numeric or string, required) A key-value pair. The key (string) is the bitcoin address, the value (float or string) is the amount in BTC
      },
      {                       (json object)
        "data": "hex",        (string, required) A key-value pair. The key must be "data", the value is hex-encoded data
      },
      ...
    ]

{% autocrossref %}

*Parameter #3---locktime*

{% itemplate ntpd1 %}
- n: "locktime"
  t: "number (int)"
  p: "Optional<br>Default=0"
  d: "Raw locktime. Non-0 value also locktime-activates inputs"

{% enditemplate %}

*Parameter #4---replaceable*

{% itemplate ntpd1 %}
- n: "replaceable"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Marks this transaction as BIP125-replaceable.
       Allows this transaction to be replaced by a transaction with higher fees. If provided, it is an error if explicit sequence numbers are incompatible."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "hex string of the transaction"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli createrawtransaction "[{\"txid\":\"myid\",\"vout\":0}]" "[{\"address\":0.01}]"
{% endhighlight %}
{% highlight bash %}
bitcoin-cli createrawtransaction "[{\"txid\":\"myid\",\"vout\":0}]" "[{\"data\":\"00010203\"}]"
{% endhighlight %}

*See also*

* [DecodeRawTransaction][rpc decoderawtransaction]: {{summary_decodeRawTransaction}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}

{% endautocrossref %}
