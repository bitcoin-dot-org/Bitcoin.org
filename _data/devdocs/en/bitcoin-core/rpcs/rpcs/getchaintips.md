{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getchaintips.md" %}

##### GetChainTips
{% include helpers/subhead-links.md %}

{% assign summary_getChainTips="return information about all known tips in the block tree, including the main chain as well as orphaned branches." %}

{% autocrossref %}

The `getchaintips` RPC {{summary_getChainTips}}

*Parameters: none*

*Result*

{% endautocrossref %}

    [
      {
        "height": xxxx,         (numeric) height of the chain tip
        "hash": "xxxx",         (string) block hash of the tip
        "branchlen": 0          (numeric) zero for main chain
        "status": "active"      (string) "active" for the main chain
      },
      {
        "height": xxxx,
        "hash": "xxxx",
        "branchlen": 1          (numeric) length of branch connecting the tip to the main chain
        "status": "xxxx"        (string) status of the chain (active, valid-fork, valid-headers, headers-only, invalid)
      }
    ]

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getchaintips
{% endhighlight %}

*See also*

* [GetBestBlockHash][rpc getbestblockhash]: {{summary_getBestBlockHash}}
* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}

{% endautocrossref %}
