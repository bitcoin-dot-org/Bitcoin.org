{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getblock.md" %}

##### GetBlock
{% include helpers/subhead-links.md %}

{% assign summary_getBlock="gets a block with a particular header hash from the local block database either as a JSON object or as a serialized block." %}

{% autocrossref %}

The `getblock` RPC {{summary_getBlock}}

If verbosity is 0, returns a string that is serialized, hex-encoded data for block 'hash'.

If verbosity is 1, returns an Object with information about block 'hash'.

If verbosity is 2, returns an Object with information about block 'hash' and information about each transaction.

*Parameter #1---blockhash*

{% itemplate ntpd1 %}
- n: "blockhash"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The block hash"

{% enditemplate %}

*Parameter #2---verbosity*

{% itemplate ntpd1 %}
- n: "verbosity"
  t: "number (int)"
  p: "Optional<br>Default=1"
  d: "0 for hex-encoded data, 1 for a json object, and 2 for json object with transaction data"

{% enditemplate %}

*Result---(for verbosity = 0)*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "A string that is serialized, hex-encoded data for block 'hash'."

{% enditemplate %}

*Result---(for verbosity = 1)*

{% endautocrossref %}

    {
      "hash" : "hash",     (string) the block hash (same as provided)
      "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
      "size" : n,            (numeric) The block size
      "strippedsize" : n,    (numeric) The block size excluding witness data
      "weight" : n           (numeric) The block weight as defined in BIP 141
      "height" : n,          (numeric) The block height or index
      "version" : n,         (numeric) The block version
      "versionHex" : "00000000", (string) The block version formatted in hexadecimal
      "merkleroot" : "xxxx", (string) The merkle root
      "tx" : [               (array of string) The transaction ids
         "transactionid"     (string) The transaction id
         ,...
      ],
      "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
      "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
      "nonce" : n,           (numeric) The nonce
      "bits" : "1d00ffff", (string) The bits
      "difficulty" : x.xxx,  (numeric) The difficulty
      "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
      "nTx" : n,             (numeric) The number of transactions in the block.
      "previousblockhash" : "hash",  (string) The hash of the previous block
      "nextblockhash" : "hash"       (string) The hash of the next block
    }

{% autocrossref %}

*Result---(for verbosity = 2)*

{% endautocrossref %}

    {
      ...,                     Same output as verbosity = 1.
      "tx" : [               (array of Objects) The transactions in the format of the getrawtransaction RPC. Different from verbosity = 1 "tx" result.
             ,...
      ],
      ,...                     Same output as verbosity = 1.
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getblock "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
{% endhighlight %}

*See also*

* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}
* [GetBestBlockHash][rpc getbestblockhash]: {{summary_getBestBlockHash}}

{% endautocrossref %}
