{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getconnectioncount.md" %}

##### GetConnectionCount
{% include helpers/subhead-links.md %}

{% assign summary_getConnectionCount="returns the number of connections to other nodes." %}

{% autocrossref %}

The `getconnectioncount` RPC {{summary_getConnectionCount}}

*Parameters: none*

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The connection count"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli getconnectioncount
{% endhighlight %}

*See also*

* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}

{% endautocrossref %}
