{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/disconnectnode.md" %}

##### DisconnectNode
{% include helpers/subhead-links.md %}

{% assign summary_disconnectNode="immediately disconnects from the specified peer node." %}

{% autocrossref %}

*Added in Bitcoin Core 0.12.0*

The `disconnectnode` RPC {{summary_disconnectNode}}

Strictly one out of 'address' and 'nodeid' can be provided to identify the node.

To disconnect by nodeid, either set 'address' to the empty string, or call using the named 'nodeid' argument only.

*Parameter #1---address*

{% itemplate ntpd1 %}
- n: "address"
  t: "string"
  p: "Optional<br>Default=fallback to nodeid"
  d: "The IP address/port of the node"

{% enditemplate %}

*Parameter #2---nodeid*

{% itemplate ntpd1 %}
- n: "nodeid"
  t: "number (int)"
  p: "Optional<br>Default=fallback to address"
  d: "The node ID (see getpeerinfo for node IDs)"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli disconnectnode "192.168.0.6:8333"
{% endhighlight %}
{% highlight bash %}
bitcoin-cli disconnectnode "" 1
{% endhighlight %}

*See also*

* [AddNode][rpc addnode]: {{summary_addNode}}
* [GetAddedNodeInfo][rpc getaddednodeinfo]: {{summary_getAddedNodeInfo}}

{% endautocrossref %}
