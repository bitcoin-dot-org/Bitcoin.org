{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxoutsetinfo.md" %}

##### GetTxOutSetInfo
{% include helpers/subhead-links.md %}

{% assign summary_getTxOutSetInfo="returns statistics about the unspent transaction output set." %}

{% autocrossref %}

The `gettxoutsetinfo` RPC {{summary_getTxOutSetInfo}}

Note this call may take some time.

*Parameters: none*

*Result*

{% endautocrossref %}

    {
      "height":n,     (numeric) The current block height (index)
      "bestblock": "hex",   (string) The hash of the block at the tip of the chain
      "transactions": n,      (numeric) The number of transactions with unspent outputs
      "txouts": n,            (numeric) The number of unspent transaction outputs
      "bogosize": n,          (numeric) A meaningless metric for UTXO set size
      "hash_serialized_2": "hash", (string) The serialized hash
      "disk_size": n,         (numeric) The estimated size of the chainstate on disk
      "total_amount": x.xxx          (numeric) The total amount
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli gettxoutsetinfo
{% endhighlight %}

*See also*

* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}
* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}}

{% endautocrossref %}
