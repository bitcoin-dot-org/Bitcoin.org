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

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object containing information about the node's network totals"

- n: "→<br>`totalbytesrecv`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total number of bytes received since the node was last restarted"

- n: "→<br>`totalbytessent`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total number of bytes sent since the node was last restarted"

- n: "→<br>`timemillis`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "Unix epoch time in milliseconds according to the operating system's clock (not the node adjusted time)"

{% enditemplate %}

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
