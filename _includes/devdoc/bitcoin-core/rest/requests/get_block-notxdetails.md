{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rest/requests/get_block-notxdetails.md" %}

##### GET Block/NoTxDetails
{% include helpers/subhead-links.md %}

{% assign summary_restGetBlock-noTxDetails="gets a block with a particular header hash from the local block database either as a JSON object or as a serialized block.  The JSON object includes TXIDs for transactions within the block rather than the complete transactions [GET block][rest get block] returns." %}

{% autocrossref %}

The `GET block<!--noref-->/notxdetails` operation {{summary_restGetBlock-noTxDetails}}

*Request*

{% highlight text %}
GET /block/notxdetails/<hash>.<format>
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

- n: "→<br>`strippedsize`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>The size of this block in serialized block format excluding witness data, counted in bytes"  
  
- n: "→<br>`size`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The size of this block in serialized block format, counted in bytes"

- n: "→<br>`height`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of this block on its block chain"
  
- n: "→<br>`weight`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>The block weight as defined in BIP 141"

- n: "→<br>`version`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "This block's version number.  See [block version numbers][section block versions]"
  
- n: "→<br>`versionHex`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>This block's version number formatted in hexadecimal.  See [BIP9 assignments][]"

- n: "→<br>`merkleroot`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The merkle root for this block, encoded as hex in RPC byte order"

- n: "→<br>`tx`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array containing all transactions in this block.  The transactions appear in the array in the same order they appear in the serialized block"

- n: "→ →<br>TXID"
  t: "string (hex)"
  p: "Required<br>(1 or more)"
  d: "The TXID of a transaction in this block, encoded as hex in RPC byte order"

- n: "→<br>`time`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The value of the *time* field in the block header, indicating approximately when the block was created"

- n: "→<br>`mediantime`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>The median time of the 11 blocks before the most recent block on the blockchain.  Used for validating transaction locktime under BIP113"  
  
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
curl http://localhost:8332/rest/block/notxdetails/00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048.hex
{% endhighlight %}

Result (wrapped):

{% highlight bash %}
010000006fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d61900\
00000000982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e8\
57233e0e61bc6649ffff001d01e3629901010000000100000000000000000000\
00000000000000000000000000000000000000000000ffffffff0704ffff001d\
0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec1\
1600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781\
e62294721166bf621e73a82cbf2342c858eeac00000000

{% endhighlight %}

Get the same block in JSON:

{% highlight bash %}
curl http://localhost:8332/rest/block/notxdetails/00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048.json
{% endhighlight %}

Result (whitespaced added):

{% highlight json %}
{
  "hash": "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
  "confirmations": 443375,
  "strippedsize": 215,
  "size": 215,
  "weight": 860,
  "height": 1,
  "version": 1,
  "versionHex": "00000001",
  "merkleroot": "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
  "tx": [
    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098"
  ],
  "time": 1231469665,
  "mediantime": 1231469665,
  "nonce": 2573394689,
  "bits": "1d00ffff",
  "difficulty": 1,
  "chainwork": "0000000000000000000000000000000000000000000000000000000200020002",
  "previousblockhash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
  "nextblockhash": "000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd"
}
{% endhighlight %}

*See also*

* [GET Block][rest get block]: {{summary_restGetBlock}}
* [GetBlock][rpc getblock] RPC: {{summary_getBlock}}
* [GetBlockHash][rpc getblockhash] RPC: {{summary_getBlockHash}}
* [GetBestBlockHash][rpc getbestblockhash] RPC: {{summary_getBestBlockHash}}

{% endautocrossref %}
