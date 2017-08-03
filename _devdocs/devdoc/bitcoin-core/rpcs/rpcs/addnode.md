{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/addnode.md" %}

##### AddNode
{% include helpers/subhead-links.md %}

{% assign summary_addNode="attempts to add or remove a node from the addnode list, or to try a connection to a node once." %}

{% autocrossref %}

The `addnode` RPC {{summary_addNode}}

*Parameter #1---hostname/IP address and port of node to add or remove*

{% itemplate ntpd1 %}
- n: "Node"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The node to add as a string in the form of `<IP address>:<port>`.  The IP address may be a hostname resolvable through DNS, an IPv4 address, an IPv4-as-IPv6 address, or an IPv6 address"

{% enditemplate %}

*Parameter #2---whether to add or remove the node, or to try only once to connect*

{% itemplate ntpd1 %}
- n: "Command"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "What to do with the IP address above.  Options are:<br>• `add` to add a node to the addnode list.  Up to 8 nodes can be added additional to the default 8 nodes. Not limited by `-maxconnections`<br>• `remove` to remove a node from the list.  If currently connected, this will disconnect immediately<br>• `onetry` to immediately attempt connection to the node even if the outgoing connection slots are full; this will only attempt the connection once"

{% enditemplate %}

*Result---`null` plus error on failed remove*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "Always JSON `null` whether the node was added, removed, tried-and-connected, or tried-and-not-connected.  The JSON-RPC error field will be set only if you try removing a node that is not on the addnodes list"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Try connecting to the following node.

{% highlight bash %}
bitcoin-cli -testnet addnode 192.0.2.113:18333 onetry
{% endhighlight %}

Result (no output from `bitcoin-cli` because result is set to `null`).

*See also*

* [GetAddedNodeInfo][rpc getaddednodeinfo]: {{summary_getAddedNodeInfo}}

{% endautocrossref %}
