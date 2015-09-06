{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rest/requests/get_block.md" %}

##### GET Block
{% include helpers/subhead-links.md %}

{% assign summary_restGetBlock="gets a block with a particular header hash from the local block database either as a JSON object or as a serialized block." %}

{% autocrossref %}

The `GET block` operation {{summary_restGetBlock}}

*Request*

{% highlight text %}
GET /block/<hash>.<format>
{% endhighlight %}

*Parameter #1---the header hash of the block to retrieve*

{% itemplate ntpd1 %}
- n: "Header Hash"
  t: "path (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the header of the block to get, encoded as hex in RPC byte order"

{% enditemplate %}

*Parameter #2---the output format*

{% itemplate ntpd1 %}
- n: "Format"
  t: "suffix"
  p: "Required<br>(exactly 1)"
  d: "Set to `.json` for decoded block contents in JSON, or `.bin` or `hex` for a serialized block in binary or hex"

{% enditemplate %}

*Response as JSON*

{% assign DEPTH="→ →" %}
{% include helpers/vars.md %}

{% itemplate ntpd1 %}
- n: "Result"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object containing the requested block"

- n: "→<br>`hash`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of this block's block header encoded as hex in RPC byte order.  This is the same as the hash provided in parameter #1"

- n: "→<br>`confirmations`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of confirmations the transactions in this block have, starting at 1 when this block is at the tip of the best block chain.  This score will be -1 if the the block is not part of the best block chain"

- n: "→<br>`size`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of this block in serialized block format, counted in bytes"

- n: "→<br>`height`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of this block on its block chain"

- n: "→<br>`version`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "This block's version number.  See [block version numbers][section block versions]"

- n: "→<br>`merkleroot`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The merkle root for this block, encoded as hex in RPC byte order"

- n: "→<br>`tx`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array containing all transactions in this block.  The transactions appear in the array in the same order they appear in the serialized block"

- n: "→ →<br>Transaction"
  t: "object"
  p: "Required<br>(1 or more)"
  d: "An object describing a particular transaction within this block"

{{INCLUDE_DECODE_RAW_TRANSACTION}}
- n: "→<br>`time`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The value of the *time* field in the block header, indicating approximately when the block was created"

- n: "→<br>`nonce`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The nonce which was successful at turning this particular block into one that could be added to the best block chain"

- n: "→<br>`bits`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The value of the *nBits* field in the block header, indicating the target threshold this block's header had to pass"

- n: "→<br>`difficulty`"
  t: "number (real)"
  p: "Required<br>(exactly 1)"
  d: "The estimated amount of work done to find this block relative to the estimated amount of work done to find block 0"

- n: "→<br>`chainwork`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The estimated number of block header hashes miners had to check from the genesis block to this block, encoded as big-endian hex"

- n: "→<br>`previousblockhash`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the header of the previous block, encoded as hex in RPC byte order"

- n: "→<br>`nextblockhash`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The hash of the next block on the best block chain, if known, encoded as hex in RPC byte order"

{% enditemplate %}

*Examples from Bitcoin Core 0.10.0*

Request a block in hex-encoded serialized block format:

{% highlight bash %}
curl http://localhost:18332/rest/block/000000000fe549a89848c76070d4132872cfb6efe5315d01d7ef77e4900f2d39.hex
{% endhighlight %}

Result (wrapped):

{% highlight text %}
02000000df11c014a8d798395b5059c722ebdf3171a4217ead71bf6e0e99f4c7\
000000004a6f6a2db225c81e77773f6f0457bcb05865a94900ed11356d0b7522\
8efb38c7785d6053ffff001d005d437001010000000100000000000000000000\
00000000000000000000000000000000000000000000ffffffff0d03b4770301\
64062f503253482fffffffff0100f9029500000000232103adb7d8ef6b63de74\
313e0cd4e07670d09a169b13e4eda2d650f529332c47646dac00000000
{% endhighlight %}

Get the same block in JSON:

{% highlight bash %}
curl http://localhost:18332/rest/block/000000000fe549a89848c76070d4132872cfb6efe5315d01d7ef77e4900f2d39.json
{% endhighlight %}

Result (whitespaced added):

{% highlight json %}
{
    "hash": "000000000fe549a89848c76070d4132872cfb6efe5315d01d7ef77e4900f2d39",
    "confirmations": 91785,
    "size": 189,
    "height": 227252,
    "version": 2,
    "merkleroot": "c738fb8e22750b6d3511ed0049a96558b0bc57046f3f77771ec825b22d6a6f4a",
    "tx": [
        {
            "txid": "c738fb8e22750b6d3511ed0049a96558b0bc57046f3f77771ec825b22d6a6f4a",
            "version": 1,
            "locktime": 0,
            "vin": [
                {
                    "coinbase": "03b477030164062f503253482f",
                    "sequence": 4294967295
                }
            ],
            "vout": [
                {
                    "value": 25.0,
                    "n": 0,
                    "scriptPubKey": {
                        "asm": "03adb7d8ef6b63de74313e0cd4e07670d09a169b13e4eda2d650f529332c47646d OP_CHECKSIG",
                        "hex": "2103adb7d8ef6b63de74313e0cd4e07670d09a169b13e4eda2d650f529332c47646dac",
                        "reqSigs": 1,
                        "type": "pubkey",
                        "addresses": [
                            "muXeUp1QYscuPRFH3qHtSrHyG6DQpvg7xZ"
                        ]
                    }
                }
            ]
        }
    ],
    "time": 1398824312,
    "nonce": 1883462912,
    "bits": "1d00ffff",
    "difficulty": 1.0,
    "chainwork": "000000000000000000000000000000000000000000000000083ada4a4009841a",
    "previousblockhash": "00000000c7f4990e6ebf71ad7e21a47131dfeb22c759505b3998d7a814c011df",
    "nextblockhash": "00000000afe1928529ac766f1237657819a11cfcc8ca6d67f119e868ed5b6188"
}
{% endhighlight %}

*See also*

* [GET Block/NoTxDetails][rest get block-notxdetails] {{summary_restGetBlock-noTxDetails}}
* [GetBlock][rpc getblock] RPC: {{summary_getBlock}}
* [GetBlockHash][rpc getblockhash] RPC: {{summary_getBlockHash}}
* [GetBestBlockHash][rpc getbestblockhash] RPC: {{summary_getBestBlockHash}}

{% endautocrossref %}
