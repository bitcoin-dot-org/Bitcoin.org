{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/decoderawtransaction.md" %}

##### DecodeRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_decodeRawTransaction="decodes a serialized transaction hex string into a JSON object describing the transaction." %}

{% autocrossref %}

The `decoderawtransaction` RPC {{summary_decodeRawTransaction}}

*Parameter #1---serialized transaction in hex*

{% itemplate ntpd1 %}
- n: "Serialized Transaction"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The transaction to decode in serialized transaction format"

{% enditemplate %}

*Result---the decoded transaction*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object describing the decoded transaction, or JSON `null` if the transaction could not be decoded"

{{INCLUDE_DECODE_RAW_TRANSACTION}}
{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

Decode a signed one-input, three-output transaction:

{% highlight bash %}
bitcoin-cli decoderawtransaction 0100000001bafe2175b9d7b3041ebac\
529056b393cf2997f7964485aa382ffa449ffdac02a000000008a47304402201\
3d212c22f0b46bb33106d148493b9a9723adb2c3dd3a3ebe3a9c9e3b95d8cb00\
220461661710202fbab550f973068af45c294667fc4dc526627a7463eb23ab39\
e9b01410479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815\
b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08\
ffb10d4b8ffffffff01b0a86a00000000001976a91401b81d5fa1e55e069e3cc\
2db9c19e2e80358f30688ac00000000
{% endhighlight %}

Result:

{% highlight json %}
{
    "txid": "52309405287e737cf412fc42883d65a392ab950869fae80b2a5f1e33326aca46",
    "hash": "52309405287e737cf412fc42883d65a392ab950869fae80b2a5f1e33326aca46",
    "size": 223,
    "vsize": 223,
    "version": 1,
    "locktime": 0,
    "vin": [
        {
            "txid": "2ac0daff49a4ff82a35a4864797f99f23c396b0529c5ba1e04b3d7b97521feba",
            "vout": 0,
            "scriptSig": {
                "asm": "3044022013d212c22f0b46bb33106d148493b9a9723adb2c3dd3a3ebe3a9c9e3b95d8cb00220461661710202fbab550f973068af45c294667fc4dc526627a7463eb23ab39e9b[ALL] 0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
                "hex": "473044022013d212c22f0b46bb33106d148493b9a9723adb2c3dd3a3ebe3a9c9e3b95d8cb00220461661710202fbab550f973068af45c294667fc4dc526627a7463eb23ab39e9b01410479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"
            },
            "sequence": 4294967295
        }
    ],
    "vout": [
        {
            "value": 0.06990000,
            "n": 0,
            "scriptPubKey": {
            "asm": "OP_DUP OP_HASH160 01b81d5fa1e55e069e3cc2db9c19e2e80358f306 OP_EQUALVERIFY OP_CHECKSIG",
                "hex": "76a91401b81d5fa1e55e069e3cc2db9c19e2e80358f30688ac",
                "reqSigs": 1,
                "type": "pubkeyhash",
                "addresses": [
                    "1A6Ei5cRfDJ8jjhwxfzLJph8B9ZEthR9Z"
                ]
            }
        }
    ]
}
{% endhighlight %}

*See also*

* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [SignRawTransaction][rpc signrawtransaction]: {{summary_signRawTransaction}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}

{% endautocrossref %}
