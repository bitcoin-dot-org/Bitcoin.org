{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getnodeaddresses.md" %}

##### GetNodeAddresses
{% include helpers/subhead-links.md %}

{% assign summary_getNodeAddresses="return known addresses which can potentially be used to find new nodes in the network." %}

{% autocrossref %}

*Added in Bitcoin Core 0.18.0*

The `getnodeaddresses` RPC {{summary_getNodeAddresses}}

*Parameter #1---count*

{% itemplate ntpd1 %}
- n: "count"
  t: "number (int)"
  p: "Optional<br>Default=1"
  d: "How many addresses to return. Limited to the smaller of 2500 or 23% of all known addresses."

{% enditemplate %}

*Result*

{% endautocrossref %}

    [
      {
        "time": ttt,                (numeric) Timestamp in seconds since epoch (Jan 1 1970 GMT) keeping track of when the node was last seen
        "services": n,              (numeric) The services offered
        "address": "host",          (string) The address of the node
        "port": n                   (numeric) The port of the node
      }
      ,....
    ]

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getnodeaddresses 8
{% endhighlight %}

{% endautocrossref %}
