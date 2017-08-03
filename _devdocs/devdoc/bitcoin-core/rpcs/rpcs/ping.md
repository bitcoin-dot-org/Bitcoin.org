{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/ping.md" %}

##### Ping {#ping-rpc}
{% include helpers/subhead-links.md %}

{% assign summary_ping-rpc="sends a P2P ping message to all connected nodes to measure ping time. Results are provided by the `getpeerinfo` RPC pingtime and pingwait fields as decimal seconds. The P2P `ping` message is handled in a queue with all other commands, so it measures processing backlog, not just network ping." %}

{% autocrossref %}

The `ping` RPC {{summary_ping-rpc}}

*Parameters: none*

*Result---`null`*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required"
  d: "Always JSON `null`"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet ping
{% endhighlight %}

(Success: no result printed.)

Get the results using the `getpeerinfo` RPC:

{% highlight bash %}
bitcoin-cli -testnet getpeerinfo | grep ping
{% endhighlight %}

Results:

{% highlight json %}
        "pingtime" : 0.11790800,
        "pingtime" : 0.22673400,
        "pingtime" : 0.16451900,
        "pingtime" : 0.12465200,
        "pingtime" : 0.13267900,
        "pingtime" : 0.23983300,
        "pingtime" : 0.16764700,
        "pingtime" : 0.11337300,
{% endhighlight %}

*See also*

* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}
* [P2P Ping Message][ping message]


{% endautocrossref %}
