{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getblockchaininfo.md" %}

##### GetBlockChainInfo
{% include helpers/subhead-links.md %}

{% assign summary_getBlockChainInfo="provides information about the current state of the block chain." %}

{% autocrossref %}

*Added in Bitcoin Core 0.9.2*

The `getblockchaininfo` RPC {{summary_getBlockChainInfo}}

*Parameters: none*

*Result---A JSON object providing information about the block chain*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "Information about the current state of the local block chain"

- n: "→<br>`chain`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The name of the block chain.  One of `main` for mainnet, `test` for testnet, or `regtest`<!--noref--> for regtest"

- n: "→<br>`blocks`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of validated blocks in the local best block chain.  For a new node with just the hardcoded genesis block, this will be 0"

- n: "→<br>`headers`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.10.0*<br><br>The number of validated headers in the local best headers chain.  For a new node with just the hardcoded genesis block, this will be zero.  This number may be higher than the number of *blocks*"

- n: "→<br>`bestblockhash`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the header of the highest validated block in the best block chain, encoded as hex in RPC byte order.  This is identical to the string returned by the `getbestblockhash` RPC"

- n: "→<br>`difficulty`"
  t: "number (real)"
  p: "Required<br>(exactly 1)"
  d: "The difficulty of the highest-height block in the best block chain"

- n: "→<br>`verificationprogress`"
  t: "number (real)"
  p: "Required (exactly 1)"
  d: "Estimate of what percentage of the block chain transactions have been verified so far, starting at 0.0 and increasing to 1.0 for fully verified.  May slightly exceed 1.0 when fully synced to account for transactions in the memory pool which have been verified before being included in a block"

- n: "→<br>`chainwork`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The estimated number of block header hashes checked from the genesis block to this block, encoded as big-endian hex"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getblockchaininfo
{% endhighlight %}

Result:

{% highlight json %}
{
    "chain" : "test",
    "blocks" : 315280,
    "headers" : 315280,
    "bestblockhash" : "000000000ebb17fb455e897b8f3e343eea1b07d926476d00bc66e2c0342ed50f",
    "difficulty" : 1.00000000,
    "verificationprogress" : 1.00000778,
    "chainwork" : "0000000000000000000000000000000000000000000000015e984b4fb9f9b350"
}
{% endhighlight %}

*See also*

* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}
* [GetWalletInfo][rpc getwalletinfo]: {{summary_getWalletInfo}}

{% endautocrossref %}
