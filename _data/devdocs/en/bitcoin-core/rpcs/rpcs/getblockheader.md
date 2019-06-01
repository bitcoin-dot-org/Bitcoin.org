{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockheader.md" %}

##### GetBlockHeader
{% include helpers/subhead-links.md %}

{% assign summary_getBlockHeader="if verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'." %}

{% autocrossref %}

*Added in Bitcoin Core 0.12.0*

The `getblockheader` RPC {{summary_getBlockHeader}}

If verbose is true, returns an Object with information about blockheader 'hash'.

*Parameter #1---blockhash*

{% itemplate ntpd1 %}
- n: "blockhash"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The block hash"

{% enditemplate %}

*Parameter #2---verbose*

{% itemplate ntpd1 %}
- n: "verbose"
  t: "boolean"
  p: "Optional<br>Default=true"
  d: "true for a json object, false for the hex-encoded data"

{% enditemplate %}

*Result---(for verbose = true)*

{% endautocrossref %}

    {
      "hash" : "hash",     (string) the block hash (same as provided)
      "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
      "height" : n,          (numeric) The block height or index
      "version" : n,         (numeric) The block version
      "versionHex" : "00000000", (string) The block version formatted in hexadecimal
      "merkleroot" : "xxxx", (string) The merkle root
      "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
      "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
      "nonce" : n,           (numeric) The nonce
      "bits" : "1d00ffff", (string) The bits
      "difficulty" : x.xxx,  (numeric) The difficulty
      "chainwork" : "0000...1f3"     (string) Expected number of hashes required to produce the current chain (in hex)
      "nTx" : n,             (numeric) The number of transactions in the block.
      "previousblockhash" : "hash",  (string) The hash of the previous block
      "nextblockhash" : "hash",      (string) The hash of the next block
    }

{% autocrossref %}

*Result---(for verbose=false)*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "A string that is serialized, hex-encoded data for block 'hash'."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli getblockheader "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
{% endhighlight %}

*See also*

* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}
* [GetBestBlockHash][rpc getbestblockhash]: {{summary_getBestBlockHash}}

{% endautocrossref %}
