{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rest/requests/get_headers.md" %}

##### GET Headers
{% include helpers/subhead-links.md %}

{% assign summary_restGetHeaders="returns a specified amount of block headers in upward direction." %}

{% autocrossref %}

The `GET headers` operation {{summary_restGetHeaders}}

*Request*

{% highlight text %}
GET /headers/<count>/<hash>.<format>
{% endhighlight %}

*Parameter #1---the amount of block headers to retrieve*

{% itemplate ntpd1 %}
- n: "Amount"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The amount of block headers in upward direction to return (including the start header hash)"

{% enditemplate %}

*Parameter #2---the header hash of the block to retrieve*

{% itemplate ntpd1 %}
- n: "Header Hash"
  t: "path (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the header of the block to get, encoded as hex in RPC byte order"

{% enditemplate %}

*Parameter #3---the output format*

{% itemplate ntpd1 %}
- n: "Format"
  t: "suffix"
  p: "Required<br>(exactly 1)"
  d: "Set to `.json` for decoded block contents in JSON, or `.bin` or `hex` for a serialized block in binary or hex"

{% enditemplate %}

*Response as JSON*

{% itemplate ntpd1 %}
- n: "Result"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array containing the requested block headers"
  
- n: "→<br>Block Header"
  t: "object"
  p: "Required<br>(1 or more)"
  d: "An object containing a block header.  The amount of the objects is the same as the amount provided in parameter #1 "

- n: "→→<br>`hash`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of this block's block header encoded as hex in RPC byte order.  This is the same as the hash provided in parameter #2"

- n: "→→<br>`confirmations`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of confirmations the transactions in this block have, starting at 1 when this block is at the tip of the best block chain.  This score will be -1 if the the block is not part of the best block chain"

- n: "→→<br>`height`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of this block on its block chain"

- n: "→→<br>`version`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "This block's version number.  See [block version numbers][section block versions]"
  
- n: "→→<br>`versionHex`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>This block's version number formatted in hexadecimal.  See [BIP9 assignments][]"

- n: "→→<br>`merkleroot`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The merkle root for this block, encoded as hex in RPC byte order"

- n: "→→<br>`time`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The value of the *time* field in the block header, indicating approximately when the block was created"
  
- n: "→→<br>`mediantime`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>The median time of the 11 blocks before the most recent block on the blockchain.  Used for validating transaction locktime under BIP113"

- n: "→→<br>`nonce`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The nonce which was successful at turning this particular block into one that could be added to the best block chain"

- n: "→→<br>`bits`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The value of the *nBits* field in the block header, indicating the target threshold this block's header had to pass"

- n: "→→<br>`difficulty`"
  t: "number (real)"
  p: "Required<br>(exactly 1)"
  d: "The estimated amount of work done to find this block relative to the estimated amount of work done to find block 0"

- n: "→→<br>`chainwork`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The estimated number of block header hashes miners had to check from the genesis block to this block, encoded as big-endian hex"

- n: "→→<br>`previousblockhash`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the header of the previous block, encoded as hex in RPC byte order"

- n: "→→<br>`nextblockhash`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The hash of the next block on the best block chain, if known, encoded as hex in RPC byte order"

{% enditemplate %}

*Examples from Bitcoin Core 0.13.1*

Request 5 block headers in hex-encoded serialized block format:

{% highlight bash %}
curl http://localhost:8332/rest/headers/5/000000000000000002538dfef658564662025e0687b0c65c6d5c9d765984ec5a.hex
{% endhighlight %}

Result (wrapped):

{% highlight bash %}
040000004b9e8debb1bb9df8f85d0f64cf45d408f5f7fcf3293ec40400000000\
000000008c37685c878a66aa2709c3dc27a35020269ce1ce7ecb41dabe8f4e0c\
ca8fc508651b2b5776270618cb395012000000205aec8459769d5c6d5cc6b087\
065e0262465658f6fe8d53020000000000000000cb9a492474a4791b7f4dee49\
0b3d813b1eb192fb67109c0c99317101019f72a7cd1f2b57762706185c2921b4
{% endhighlight %}

Get the same block headers in JSON:

{% highlight bash %}
curl http://localhost:8332/rest/headers/5/000000000000000002538dfef658564662025e0687b0c65c6d5c9d765984ec5a.json
{% endhighlight %}

Result (whitespaced added):

{% highlight json %}
[
  {
    "hash": "000000000000000002538dfef658564662025e0687b0c65c6d5c9d765984ec5a",
    "confirmations": 33009,
    "height": 410334,
    "version": 4,
    "versionHex": "00000004",
    "merkleroot": "08c58fca0c4e8fbeda41cb7ecee19c262050a327dcc30927aa668a875c68378c",
    "time": 1462442853,
    "mediantime": 1462441310,
    "nonce": 307247563,
    "bits": "18062776",
    "difficulty": 178659257772.5273,
    "chainwork": "00000000000000000000000000000000000000000018562bc90589834ae929d0",
    "previousblockhash": "000000000000000004c43e29f3fcf7f508d445cf640f5df8f89dbbb1eb8d9e4b",
    "nextblockhash": "000000000000000000f198b9f92bc29fa294be4bb777e61fdd56aac07f174553"
  },
  {
    "hash": "000000000000000000f198b9f92bc29fa294be4bb777e61fdd56aac07f174553",
    "confirmations": 33008,
    "height": 410335,
    "version": 536870912,
    "versionHex": "20000000",
    "merkleroot": "a7729f01017131990c9c1067fb92b11e3b813d0b49ee4d7f1b79a47424499acb",
    "time": 1462443981,
    "mediantime": 1462441496,
    "nonce": 3022072156,
    "bits": "18062776",
    "difficulty": 178659257772.5273,
    "chainwork": "000000000000000000000000000000000000000000185655621b104558a77160",
    "previousblockhash": "000000000000000002538dfef658564662025e0687b0c65c6d5c9d765984ec5a",
    "nextblockhash": "0000000000000000005b3caade164fcc5f3f00fd99ddbdb47ee66ea4bbe9387a"
  }
]
{% endhighlight %}

*See also*

* [GET Block/NoTxDetails][rest get block-notxdetails] {{summary_restGetBlock-noTxDetails}}
* [GetBlock][rpc getblock] RPC: {{summary_getBlock}}
* [GetBlockHash][rpc getblockhash] RPC: {{summary_getBlockHash}}
* [GetBlockHeader][rpc getblockheader] RPC: {{summary_getBlockHeader}}

{% endautocrossref %}
