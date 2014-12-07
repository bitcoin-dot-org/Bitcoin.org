{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getnettotals.md" %}

##### GetNetTotals
{% include helpers/subhead-links.md %}

{% assign summary_getNetTotals="returns information about network traffic, including bytes in, bytes out, and the current time." %}

{% autocrossref %}

The `getnettotals` RPC {{summary_getNetTotals}}

*Parameters: none*

*Result---the current bytes in, bytes out, and current time*

| Name                  | Type            | Presence                    | Description
|-----------------------|-----------------|-----------------------------|----------------
| `result`              | object          | Required<br>(exactly 1)     | An object containing information about the node's network totals
| →<br>`totalbytesrecv` | number (int)    | Required<br>(exactly 1)     | The total number of bytes received since the node was last restarted
| →<br>`totalbytessent` | number (int)    | Required<br>(exactly 1)     | The total number of bytes sent since the node was last restarted
| →<br>`timemillis`     | number (int)    | Required<br>(exactly 1)     | Unix epoch time in milliseconds according to the operating system's clock (not the node adjusted time)

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getnettotals
{% endhighlight %}

Result:

{% highlight json %}
{
    "totalbytesrecv" : 723992206,
    "totalbytessent" : 16846662695,
    "timemillis" : 1419268217354
}
{% endhighlight %}

*See also*

* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}

{% endautocrossref %}
