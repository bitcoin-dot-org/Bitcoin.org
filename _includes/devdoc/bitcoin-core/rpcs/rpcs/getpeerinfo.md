{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getpeerinfo.md" %}

##### GetPeerInfo
{% include helpers/subhead-links.md %}

{% assign summary_getPeerInfo="returns data about each connected network node." %}

{% autocrossref %}

The `getpeerinfo` RPC {{summary_getPeerInfo}}

*Parameters: none*

*Result---information about each currently-connected network node*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of objects each describing one connected node.  If there are no connections, the array will be empty"

- n: "→<br>Node"
  t: "object"
  p: "Optional<br>(0 or more)"
  d: "An object describing a particular connected node"

- n: "→ →<br>`id`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.10.0*<br><br>The node's index number in the local node address database"

- n: "→ →<br>`addr`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The IP address and port number used for the connection to the remote node"

- n: "→ →<br>`addrlocal`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "Our IP address and port number according to the remote node.  May be incorrect due to error or lying.  Many SPV nodes set this to `127.0.0.1:8333`"

- n: "→ →<br>`services`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The services advertised by the remote node in its `version` message"

- n: "→ →<br>`lastsend`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The Unix epoch time when we last successfully sent data to the TCP socket for this node"

- n: "→ →<br>`lastrecv`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The Unix epoch time when we last received data from this node"

- n: "→ →<br>`bytessent`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total number of bytes we've sent to this node"

- n: "→ →<br>`bytesrecv`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total number of bytes we've received from this node"

- n: "→ →<br>`conntime`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The Unix epoch time when we connected to this node"

- n: "→ →<br>`pingtime`"
  t: "number (real)"
  p: "Required<br>(exactly 1)"
  d: "The number of seconds this node took to respond to our last P2P `ping` message"

- n: "→ →<br>`pingwait`"
  t: "number (real)"
  p: "Optional<br>(0 or 1)"
  d: "The number of seconds we've been waiting for this node to respond to a P2P `ping` message.  Only shown if there's an outstanding `ping` message"

- n: "→ →<br>`version`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The protocol version number used by this node.  See the [protocol versions section][section protocol versions] for more information"

- n: "→ →<br>`subver`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The user agent this node sends in its `version` message.  This string will have been sanitized to prevent corrupting the JSON results.  May be an empty string"

- n: "→ →<br>`inbound`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Set to `true` if this node connected to us; set to `false` if we connected to this node"

- n: "→ →<br>`startingheight`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of the remote node's blockchain when it connected to us as reported in its `version` message"

- n: "→ →<br>`banscore`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The ban score we've assigned the node based on any misbehavior it's made.  By default, Bitcoin Core disconnects when the ban score reaches `100`"

- n: "→ →<br>`synced_headers`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.10.0*<br><br>The highest-height header we have in common with this node based the last P2P `headers` message it sent us.  If a `headers` message has not been received, this will be set to `-1`"

- n: "→ →<br>`synced_blocks`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.10.0*<br><br>The highest-height block we have in common with this node based on P2P `inv` messages this node sent us.  If no block `inv` messages have been received from this node, this will be set to `-1`"

- n: "→ →<br>`syncnode`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "*Removed in Bitcoin Core 0.10.0*<br><br>Whether we're using this node as our syncnode during initial block download"

- n: "→ →<br>`inflight`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.10.0*<br><br>An array of blocks which have been requested from this peer.  May be empty"

- n: "→ → →<br>Blocks"
  t: "number (int)"
  p: "Optional<br>(0 or more)"
  d: "The height of a block being requested from the remote peer"

- n: "→ →<br>`whitelisted`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.10.0*<br><br>Set to `true` if the remote peer has been whitelisted; otherwise, set to `false`.  Whitelisted peers will not be banned if their ban score exceeds the maximum (100 by default).  By default, peers connecting from localhost are whitelisted"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getpeerinfo
{% endhighlight %}

Result (edited to show only a single entry, with IP addresses changed to
[RFC5737][] reserved IP addresses):

{% highlight json %}
[
    {
        "id" : 9,
        "addr" : "192.0.2.113:18333",
        "addrlocal" : "192.0.2.51:18333",
        "services" : "0000000000000002",
        "lastsend" : 1419277992,
        "lastrecv" : 1419277992,
        "bytessent" : 4968,
        "bytesrecv" : 105078,
        "conntime" : 1419265985,
        "pingtime" : 0.05617800,
        "version" : 70001,
        "subver" : "/Satoshi:0.8.6/",
        "inbound" : false,
        "startingheight" : 315280,
        "banscore" : 0,
        "synced_headers" : -1,
        "synced_blocks" : -1,
        "inflight" : [
        ],
        "whitelisted" : false
    }
]
{% endhighlight %}

*See also*

* [GetAddedNodeInfo][rpc getaddednodeinfo]: {{summary_getAddedNodeInfo}}
* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}

{% endautocrossref %}
