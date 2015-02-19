{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getconnectioncount.md" %}

##### GetConnectionCount
{% include helpers/subhead-links.md %}

{% assign summary_getConnectionCount="returns the number of connections to other nodes." %}

{% autocrossref %}

The `getconnectioncount` RPC {{summary_getConnectionCount}}

*Parameters: none*

*Result---the number of connections to other nodes*

{{json_table}}

* `result`
* number (int)
* Required (exactly 1)
* The total number of connections to other nodes (both inbound and outbound)

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getconnectioncount
{% endhighlight bash %}

Result:

{% highlight json %}
14
{% endhighlight %}

*See also*

* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}

{% endautocrossref %}
