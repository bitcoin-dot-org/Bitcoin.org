{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getaddednodeinfo.md" %}

##### GetAddedNodeInfo
{% include helpers/subhead-links.md %}

{% assign summary_getAddedNodeInfo="returns information about the given added node, or all added nodes (note that onetry addnodes are not listed here)." %}

{% autocrossref %}

The `getaddednodeinfo` RPC {{summary_getAddedNodeInfo}}

*Parameter #1---node*

{% itemplate ntpd1 %}
- n: "node"
  t: "string"
  p: "Optional<br>Default=all nodes"
  d: "If provided, return information about this specific node, otherwise all nodes are returned."

{% enditemplate %}

*Result*

{% endautocrossref %}

    [
      {
        "addednode" : "192.168.0.201",   (string) The node IP address or name (as provided to addnode)
        "connected" : true|false,          (boolean) If connected
        "addresses" : [                    (list of objects) Only when connected = true
           {
             "address" : "192.168.0.201:8333",  (string) The bitcoin server IP and port we're connected to
             "connected" : "outbound"           (string) connection, inbound or outbound
           }
         ]
      }
      ,...
    ]

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getaddednodeinfo "192.168.0.201"
{% endhighlight %}

*See also*

* [AddNode][rpc addnode]: {{summary_addNode}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}

{% endautocrossref %}
