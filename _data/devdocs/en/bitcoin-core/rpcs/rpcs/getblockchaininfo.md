{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockchaininfo.md" %}

##### GetBlockChainInfo
{% include helpers/subhead-links.md %}

{% assign summary_getBlockChainInfo="returns an object containing various state info regarding blockchain processing." %}

{% autocrossref %}

The `getblockchaininfo` RPC {{summary_getBlockChainInfo}}

*Parameters: none*

*Result*

{% endautocrossref %}

    {
      "chain": "xxxx",              (string) current network name as defined in BIP70 (main, test, regtest)
      "blocks": xxxxxx,             (numeric) the current number of blocks processed in the server
      "headers": xxxxxx,            (numeric) the current number of headers we have validated
      "bestblockhash": "...",       (string) the hash of the currently best block
      "difficulty": xxxxxx,         (numeric) the current difficulty
      "mediantime": xxxxxx,         (numeric) median time for the current best block
      "verificationprogress": xxxx, (numeric) estimate of verification progress [0..1]
      "initialblockdownload": xxxx, (bool) (debug information) estimate of whether this node is in Initial Block Download mode.
      "chainwork": "xxxx"           (string) total amount of work in active chain, in hexadecimal
      "size_on_disk": xxxxxx,       (numeric) the estimated size of the block and undo files on disk
      "pruned": xx,                 (boolean) if the blocks are subject to pruning
      "pruneheight": xxxxxx,        (numeric) lowest-height complete block stored (only present if pruning is enabled)
      "automatic_pruning": xx,      (boolean) whether automatic pruning is enabled (only present if pruning is enabled)
      "prune_target_size": xxxxxx,  (numeric) the target size used by pruning (only present if automatic pruning is enabled)
      "softforks": [                (array) status of softforks in progress
         {
            "id": "xxxx",           (string) name of softfork
            "version": xx,          (numeric) block version
            "reject": {             (object) progress toward rejecting pre-softfork blocks
               "status": xx,        (boolean) true if threshold reached
            },
         }, ...
      ],
      "bip9_softforks": {           (object) status of BIP9 softforks in progress
         "xxxx" : {                 (string) name of the softfork
            "status": "xxxx",       (string) one of "defined", "started", "locked_in", "active", "failed"
            "bit": xx,              (numeric) the bit (0-28) in the block version field used to signal this softfork (only for "started" status)
            "startTime": xx,        (numeric) the minimum median time past of a block at which the bit gains its meaning
            "timeout": xx,          (numeric) the median time past of a block at which the deployment is considered failed if not yet locked in
            "since": xx,            (numeric) height of the first block to which the status applies
            "statistics": {         (object) numeric statistics about BIP9 signalling for a softfork (only for "started" status)
               "period": xx,        (numeric) the length in blocks of the BIP9 signalling period
               "threshold": xx,     (numeric) the number of blocks with the version bit set required to activate the feature
               "elapsed": xx,       (numeric) the number of blocks elapsed since the beginning of the current period
               "count": xx,         (numeric) the number of blocks with the version bit set in the current period
               "possible": xx       (boolean) returns false if there are not enough blocks left in this period to pass activation threshold
            }
         }
      }
      "warnings" : "...",           (string) any network and blockchain warnings.
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getblockchaininfo
{% endhighlight %}

*See also*

* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}
* [GetWalletInfo][rpc getwalletinfo]: {{summary_getWalletInfo}}

{% endautocrossref %}
