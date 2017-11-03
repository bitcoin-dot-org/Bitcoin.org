{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getblockheader.md" %}

##### GetBlockHeader
{% include helpers/subhead-links.md %}

{% assign summary_getBlockHeader="gets a block header with a particular header hash from the local block database either as a JSON object or as a serialized block header." %}

{% autocrossref %}

*Added in Bitcoin Core 0.12.0*

The `getblockheader` RPC {{summary_getBlockHeader}}

*Parameter #1---header hash*

{% itemplate ntpd1 %}
- n: "Header Hash"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the block header to get, encoded as hex in RPC byte order"

{% enditemplate %}

*Parameter #2---JSON or hex output*

{% itemplate ntpd1 %}
- n: "Format"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `false` to get the block header in serialized block format; set to `true` (the default) to get the decoded block header as a JSON object"

{% enditemplate %}

*Result (if format was `false`)---a serialized block header*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)/null"
  p: "Required<br>(exactly 1)"
  d: "The requested block header as a serialized block, encoded as hex, or JSON `null` if an error occurred"

{% enditemplate %}

*Result (if format was `true` or omitted)---a JSON block header*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object/null"
  p: "Required<br>(exactly 1)"
  d: "An object containing the requested block, or JSON `null` if an error occurred"

- n: "→<br>`hash`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of this block's block header encoded as hex in RPC byte order.  This is the same as the hash provided in parameter #1"

- n: "→<br>`confirmations`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of confirmations the transactions in this block have, starting at 1 when this block is at the tip of the best block chain.  This score will be -1 if the the block is not part of the best block chain"

- n: "→<br>`height`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of this block on its block chain"

- n: "→<br>`version`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "This block's version number.  See [block version numbers][section block versions]"
  
- n: "→<br>`versionHex`"
  t: "number (hex)"
  p: "Required<br>(exactly 1)"
  d: "This block's hex version number.  See [block version numbers][section block versions]"

- n: "→<br>`merkleroot`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The merkle root for this block, encoded as hex in RPC byte order"

- n: "→<br>`mediantime`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The computed median time of the previous 11 blocks.  Used for validating transaction locktime under BIP113"

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
  p: "Optional<br>(0 or 1)"
  d: "The hash of the header of the previous block, encoded as hex in RPC byte order.  Not returned for genesis block"

- n: "→<br>`nextblockhash`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The hash of the next block on the best block chain, if known, encoded as hex in RPC byte order"

{% enditemplate %}

*Example from Bitcoin Core 0.12.1*

Get a block header in raw hex:

{% highlight bash %}
bitcoin-cli -testnet getblockheader \
            00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09 \
            false
{% endhighlight %}

Result (wrapped):

{% highlight text %}
010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e608\
00000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa93\
0b0528fe021f7449ffff001d36b4af9a

{% endhighlight %}

Get the same block in JSON:

{% highlight bash %}
bitcoin-cli -testnet getblockheader \
            00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09
{% endhighlight %}

Result:

{% highlight json %}

{
  "hash": "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
  "confirmations": 437926,
  "height": 1000,
  "version": 1,
  "versionHex": "00000001",
  "merkleroot": "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
  "time": 1232346882,
  "mediantime": 1232344831,
  "nonce": 2595206198,
  "bits": "1d00ffff",
  "difficulty": 1,
  "chainwork": "000000000000000000000000000000000000000000000000000003e903e903e9",
  "previousblockhash": "0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d",
  "nextblockhash": "00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6"
}

{% endhighlight %}

*See also*

* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}
* [GetBestBlockHash][rpc getbestblockhash]: {{summary_getBestBlockHash}}

{% endautocrossref %}
