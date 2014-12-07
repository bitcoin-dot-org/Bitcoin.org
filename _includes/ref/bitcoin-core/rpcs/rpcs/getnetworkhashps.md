{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getnetworkhashps.md" %}

##### GetNetworkHashPS
{% include helpers/subhead-links.md %}

{% assign summary_getNetworkHashPS="returns the estimated current or historical network hashes per second based on the last *n* blocks." %}

{% autocrossref %}

The `getnetworkhashps` RPC {{summary_getNetworkHashPS}}

*Parameter #1---number of blocks to average*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Blocks             | number (int)    | Optional<br>(0 or 1)        | The number of blocks to average together for calculating the estimated hashes per second.  Default is `120`.  Use `-1` to average all blocks produced since the last difficulty change

*Parameter #2---block height*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Height             | number (int)    | Optional<br>(0 or 1)        | The height of the last block to use for calculating the average.  Defaults to `-1` for the highest-height block on the local best block chain.  If the specified height is higher than the highest block on the local best block chain, it will be interpreted the same as `-1`

*Result---estimated hashes per second*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| `result`           | number (int)    | Required<br>(exactly 1)     | The estimated number of hashes per second based on the parameters provided.  May be 0 (for Height=`0`, the genesis block) or a negative value if the highest-height block averaged has a block header time earlier than the lowest-height block averaged

*Example from Bitcoin Core 0.10.0*

Get the average hashes per second for all the blocks since the last
difficulty change before block 227255.

{% highlight bash %}
bitcoin-cli -testnet getnetworkhashps -1 227255
{% endhighlight %}

Result:

{% highlight json %}
79510076167
{% endhighlight %}

*See also*

* [GetDifficulty][rpc getdifficulty]: {{summary_getDifficultly}}
* [GetBlock][rpc getblock]: {{summary_getBlock}}

{% endautocrossref %}
