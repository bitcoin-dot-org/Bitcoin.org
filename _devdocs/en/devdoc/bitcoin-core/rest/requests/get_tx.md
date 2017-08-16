{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rest/requests/get_tx.md" %}

##### GET Tx
{% include helpers/subhead-links.md %}

{% assign summary_restGetTx="gets a hex-encoded serialized transaction or a JSON object describing the transaction. By default, Bitcoin Core only stores complete transaction data for UTXOs and your own transactions, so this method may fail on historic transactions unless you use the non-default `txindex=1` in your Bitcoin Core startup settings." %}

{% autocrossref %}

The `GET tx` operation {{summary_restGetTx}}

{{reindexNote}}

*Request*

{% highlight text %}
GET /tx/<txid>.<format>
{% endhighlight %}

*Parameter #1---the TXID of the transaction to retrieve*

{% itemplate ntpd1 %}
- n: "TXID"
  t: "path (hex)"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the transaction to get, encoded as hex in RPC byte order"

{% enditemplate %}

*Parameter #2---the output format*

{% itemplate ntpd1 %}
- n: "Format"
  t: "suffix"
  p: "Required<br>(exactly 1)"
  d: "Set to `.json` for decoded transaction contents in JSON, or `.bin` or `hex` for a serialized transaction in binary or hex"

{% enditemplate %}

*Response as JSON*

{% assign DEPTH="" %}
{% include helpers/vars.md %}

{% itemplate ntpd1 %}
- n: "Result"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object describing the request transaction"

{{INCLUDE_DECODE_RAW_TRANSACTION}}
- n: "→<br>`blockhash`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "If the transaction has been included in a block on the local best block chain, this is the hash of that block encoded as hex in RPC byte order"

- n: "→<br>`confirmations`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "If the transaction has been included in a block on the local best block chain, this is how many confirmations it has.  Otherwise, this is `0`"

- n: "→<br>`time`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "If the transaction has been included in a block on the local best block chain, this is the block header time of that block (may be in the future)"

- n: "→<br>`blocktime`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "This field is currently identical to the time field described above"

{% enditemplate %}

*Examples from Bitcoin Core 0.13.1*

Request a transaction in hex-encoded serialized transaction format:

{% highlight bash %}
curl http://localhost:8332/rest/tx/42f9df54a39026ccb54362141c41713968f19e1f14949ab6609b03ffa4b7f120.hex
{% endhighlight %}

Result (wrapped):

{% highlight text %}
0100000001bf33f5e034d1774f4019c03e119f4fa9e421339271f7476e5e34ff\
72839ebc16000000006b483045022100dab0ade70063cbc5ad44664b707391f8\
ffe6e406b1bab43abfb547d701694d98022067580db89b81c69ba83487ea0a1b\
cb6a325d2903b726980865210d2127de09710121023ee7a6437e9ad2957cd032\
38b9668c15cb1dc6ac9c9d142f829168e1a3e4a9c4feffffff02c88833030000\
00001976a9145f4865d1865127807f714b0ad1ddfae9870866d888ac102697eb\
000000001976a91479e19d5c1cbc1c18f59c57d37ca403f3bcdaa73f88acd0c3\
0600
{% endhighlight %}

Get the same transaction in JSON:

{% highlight bash %}
curl http://localhost:8332/rest/tx/42f9df54a39026ccb54362141c41713968f19e1f14949ab6609b03ffa4b7f120.json
{% endhighlight %}

Result (whitespaced added):

{% highlight json %}
{
  "txid": "42f9df54a39026ccb54362141c41713968f19e1f14949ab6609b03ffa4b7f120",
  "hash": "42f9df54a39026ccb54362141c41713968f19e1f14949ab6609b03ffa4b7f120",
  "size": 226,
  "vsize": 226,
  "version": 1,
  "locktime": 443344,
  "vin": [
    {
      "txid": "16bc9e8372ff345e6e47f771923321e4a94f9f113ec019404f77d134e0f533bf",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100dab0ade70063cbc5ad44664b707391f8ffe6e406b1bab43abfb547d701694d98022067580db89b81c69ba83487ea0a1bcb6a325d2903b726980865210d2127de0971[ALL] 023ee7a6437e9ad2957cd03238b9668c15cb1dc6ac9c9d142f829168e1a3e4a9c4",
        "hex": "483045022100dab0ade70063cbc5ad44664b707391f8ffe6e406b1bab43abfb547d701694d98022067580db89b81c69ba83487ea0a1bcb6a325d2903b726980865210d2127de09710121023ee7a6437e9ad2957cd03238b9668c15cb1dc6ac9c9d142f829168e1a3e4a9c4"
      },
      "sequence": 4294967294
    }
  ],
  "vout": [
    {
      "value": 0.53709,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 5f4865d1865127807f714b0ad1ddfae9870866d8 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a9145f4865d1865127807f714b0ad1ddfae9870866d888ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "19govWMzsRXqLUsUrHQKQ3DzekRxhsqwWH"
        ]
      }
    },
    {
      "value": 39.5255144,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 79e19d5c1cbc1c18f59c57d37ca403f3bcdaa73f OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a91479e19d5c1cbc1c18f59c57d37ca403f3bcdaa73f88ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "1C7T3CJ6MEYf1YCYYPfN6zuGirqZcD3wuE"
        ]
      }
    }
  ],
  "blockhash": "0000000000000000023da07114323ad9676896f354951e6b563d143428b69c03",
  "confirmations": 28,
  "time": 1481662934,
  "blocktime": 1481662934
}
{% endhighlight %}

*See also*

* [GetRawTransaction][rpc getrawtransaction] RPC: {{summary_getRawTransaction}}
* [GetTransaction][rpc gettransaction] RPC: {{summary_getTransaction}}

{% endautocrossref %}
