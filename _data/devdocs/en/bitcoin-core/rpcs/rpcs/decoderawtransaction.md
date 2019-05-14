{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/decoderawtransaction.md" %}

##### DecodeRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_decodeRawTransaction="return a JSON object representing the serialized, hex-encoded transaction." %}

{% autocrossref %}

The `decoderawtransaction` RPC {{summary_decodeRawTransaction}}

*Parameter #1---hexstring*

{% itemplate ntpd1 %}
- n: "hexstring"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The transaction hex string"

{% enditemplate %}

*Parameter #2---iswitness*

{% itemplate ntpd1 %}
- n: "iswitness"
  t: "boolean"
  p: "Optional<br>Default=depends on heuristic tests"
  d: "Whether the transaction hex is a serialized witness transaction
       If iswitness is not present, heuristic tests will be used in decoding"

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "txid" : "id",        (string) The transaction id
      "hash" : "id",        (string) The transaction hash (differs from txid for witness transactions)
      "size" : n,             (numeric) The transaction size
      "vsize" : n,            (numeric) The virtual transaction size (differs from size for witness transactions)
      "weight" : n,           (numeric) The transaction's weight (between vsize*4 - 3 and vsize*4)
      "version" : n,          (numeric) The version
      "locktime" : ttt,       (numeric) The lock time
      "vin" : [               (array of json objects)
         {
           "txid": "id",    (string) The transaction id
           "vout": n,         (numeric) The output number
           "scriptSig": {     (json object) The script
             "asm": "asm",  (string) asm
             "hex": "hex"   (string) hex
           },
           "txinwitness": ["hex", ...] (array of string) hex-encoded witness data (if any)
           "sequence": n     (numeric) The script sequence number
         }
         ,...
      ],
      "vout" : [             (array of json objects)
         {
           "value" : x.xxx,            (numeric) The value in BTC
           "n" : n,                    (numeric) index
           "scriptPubKey" : {          (json object)
             "asm" : "asm",          (string) the asm
             "hex" : "hex",          (string) the hex
             "reqSigs" : n,            (numeric) The required sigs
             "type" : "pubkeyhash",  (string) The type, eg 'pubkeyhash'
             "addresses" : [           (json array of string)
               "12tvKAXCxZjSmdNbao16dKXC8tRWfcF5oc"   (string) bitcoin address
               ,...
             ]
           }
         }
         ,...
      ],
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli decoderawtransaction "hexstring"
{% endhighlight %}

*See also*

* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}

{% endautocrossref %}
