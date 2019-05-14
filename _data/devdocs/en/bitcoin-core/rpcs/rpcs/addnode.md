{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/addnode.md" %}

##### AddNode
{% include helpers/subhead-links.md %}

{% assign summary_addNode="attempts to add or remove a node from the addnode list." %}

{% autocrossref %}

The `addnode` RPC {{summary_addNode}}

Or try a connection to a node once.

Nodes added using addnode (or -connect) are protected from DoS disconnection and are not required to be
full nodes/support SegWit as other outbound peers are (though such peers will not be synced from).

*Parameter #1---node*

{% itemplate ntpd1 %}
- n: "node"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The node (see getpeerinfo for nodes). The node to add as a string in the form of `<IP address>:<port>`.  The IP address may be a hostname resolvable through DNS, an IPv4 address, an IPv4-as-IPv6 address, or an IPv6 address"

{% enditemplate %}

*Parameter #2---command*

{% itemplate ntpd1 %}
- n: "command"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once. What to do with the IP address above.  Options are:<br>• `add` to add a node to the addnode list.  Up to 8 nodes can be added additional to the default 8 nodes. Not limited by `-maxconnections`<br>• `remove` to remove a node from the list.  If currently connected, this will disconnect immediately<br>• `onetry` to immediately attempt connection to the node even if the outgoing connection slots are full; this will only attempt the connection once"

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
bitcoin-cli addnode "192.168.0.6:8333" "onetry"
{% endhighlight %}

*See also*

* [GetAddedNodeInfo][rpc getaddednodeinfo]: {{summary_getAddedNodeInfo}}

{% endautocrossref %}
