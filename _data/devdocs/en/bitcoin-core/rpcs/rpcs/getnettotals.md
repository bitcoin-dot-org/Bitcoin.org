{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getnettotals.md" %}

##### GetNetTotals
{% include helpers/subhead-links.md %}

{% assign summary_getNetTotals="returns information about network traffic, including bytes in, bytes out, and current time." %}

{% autocrossref %}

The `getnettotals` RPC {{summary_getNetTotals}}

*Parameters: none*

*Result*

{% endautocrossref %}

    {
      "totalbytesrecv": n,   (numeric) Total bytes received
      "totalbytessent": n,   (numeric) Total bytes sent
      "timemillis": t,       (numeric) Current UNIX time in milliseconds
      "uploadtarget":
      {
        "timeframe": n,                         (numeric) Length of the measuring timeframe in seconds
        "target": n,                            (numeric) Target in bytes
        "target_reached": true|false,           (boolean) True if target is reached
        "serve_historical_blocks": true|false,  (boolean) True if serving historical blocks
        "bytes_left_in_cycle": t,               (numeric) Bytes left in current time cycle
        "time_left_in_cycle": t                 (numeric) Seconds left in current time cycle
      }
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getnettotals
{% endhighlight %}

*See also*

* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}

{% endautocrossref %}
