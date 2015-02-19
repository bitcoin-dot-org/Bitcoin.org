{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/verifychain.md" %}

##### VerifyChain
{% include helpers/subhead-links.md %}

{% assign summary_verifyChain="verifies each entry in the local block chain database." %}

{% autocrossref %}

The `verifychain` RPC {{summary_verifyChain}}

*Parameter #1---how thoroughly to check each block*

{{json_table}}

* Check Level
* number (int)
* Optional (0 or 1)
* How thoroughly to check each block, from 0 to 4.  Default is the level set with the `-checklevel` command line argument; if that isn't set, the default is `3`.  Each higher level includes the tests from the lower levels<br><br>Levels are:<br>**0.** Read from disk to ensure the files are accessible<br>**1.**  Ensure each block is valid<br>**2.** Make sure undo files can be read from disk and are in a valid format<br>**3.** Test each block undo to ensure it results in correct state<br>**4.** After undoing blocks, reconnect them to ensure they reconnect correctly

*Parameter #2---the number of blocks to check*

{{json_table}}

* Number Of Blocks
* number (int)
* Optional (0 or 1)
* The number of blocks to verify.  Set to `0` to check all blocks.  Defaults to the value of the `-checkblocks` command-line argument; if that isn't set, the default is `288`

*Result---verification results*

{{json_table}}

* `result`
* bool
* Required (exactly 1)
* Set to `true` if verified; set to `false` if verification failed for any reason

*Example from Bitcoin Core 0.10.0*

Verify the most recent 10,000 blocks in the most through way:

{% highlight bash %}
bitcoin-cli -testnet verifychain 4 10000
{% endhighlight %}

Result (took 4 minutes and 25 seconds on a generic PC laptop; it
would've taken much longer on mainnet):

{% highlight json %}
true
{% endhighlight %}

*See also*

* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}

{% endautocrossref %}
