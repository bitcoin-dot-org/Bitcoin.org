{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getmininginfo.md" %}

##### GetMiningInfo
{% include helpers/subhead-links.md %}

{% assign summary_getMiningInfo="returns a json object containing mining-related information." %}

{% autocrossref %}

The `getmininginfo` RPC {{summary_getMiningInfo}}

*Parameters: none*

*Result*

{% endautocrossref %}

    {
      "blocks": nnn,             (numeric) The current block
      "currentblockweight": nnn, (numeric, optional) The block weight of the last assembled block (only present if a block was ever assembled)
      "currentblocktx": nnn,     (numeric, optional) The number of block transactions of the last assembled block (only present if a block was ever assembled)
      "difficulty": xxx.xxxxx    (numeric) The current difficulty
      "networkhashps": nnn,      (numeric) The network hashes per second
      "pooledtx": n              (numeric) The size of the mempool
      "chain": "xxxx",           (string) current network name as defined in BIP70 (main, test, regtest)
      "warnings": "..."          (string) any network and blockchain warnings
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getmininginfo
{% endhighlight %}

*See also*

* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}
* [Generate][rpc generate]: {{summary_generate}}

{% endautocrossref %}
