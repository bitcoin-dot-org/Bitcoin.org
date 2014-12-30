{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getblockcount.md" %}

##### GetBlockCount
{% include helpers/subhead-links.md %}

{% assign summary_getBlockCount="returns the number of blocks in the local best block chain." %}

{% autocrossref %}

The `getblockcount` RPC {{summary_getBlockCount}}

*Parameters: none*

*Result---the number of blocks in the local best block chain*

| Name             | Type            | Presence                    | Description
|------------------|-----------------|-----------------------------|----------------
| `result`         | number (int)    | Required<br>(exactly 1)     | The number of blocks in the local best block chain.  For a new node with only the hardcoded genesis block, this number will be 0
{:.ntpd}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getblockcount
{% endhighlight %}

Result:

{% highlight text %}
315280
{% endhighlight %}

*See also*

* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}
* [GetBlock][rpc getblock]: {{summary_getBlock}}

{% endautocrossref %}
