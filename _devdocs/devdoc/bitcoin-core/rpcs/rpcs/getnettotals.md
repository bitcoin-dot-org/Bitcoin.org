{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getnettotals.md" %}

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
  
- n: "→<br>`uploadtarget`"
  t: "string : <br>object"
  p: "Required<br>(exactly 1)"
  d: "The upload traget information"
  
- n: "→ →<br>`timeframe`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "Length of the measuring timeframe in seconds.  The timeframe is currently set to `24` hours"

- n: "→ →<br>`target`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The maximum allowed outbound traffic in bytes.  The default is `0`.  Can be changed with `-maxuploadtarget`"

- n: "→ →<br>`target_reached`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Indicates if the target is reached.  If the target is reached the node won't serve SPV and historical block requests anymore"  

- n: "→ →<br>`serve_historical_blocks`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Indicates if historical blocks are served"  
  
- n: "→ →<br>`bytes_left_in_cycle`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "Amount of bytes left in current time cycle.  `0` is displayed if no upload target is set"  

- n: "→ →<br>`time_left_in_cycle`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "Seconds left in current time cycle.  `0` is displayed if no upload target is set"    

{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

{% highlight bash %}
bitcoin-cli getnettotals
{% endhighlight %}

Result:

{% highlight json %}
{
  "totalbytesrecv": 7137052851,
  "totalbytessent": 211648636140,
  "timemillis": 1481227418585,
  "uploadtarget": {
    "timeframe": 86400,
    "target": 0,
    "target_reached": false,
    "serve_historical_blocks": true,
    "bytes_left_in_cycle": 0,
    "time_left_in_cycle": 0
  }
}
{% endhighlight %}

*See also*

* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}

{% endautocrossref %}
