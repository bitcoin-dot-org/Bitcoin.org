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
  d: "The node's index number in the local node address database"

- n: "→ →<br>`addr`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The IP address and port number used for the connection to the remote node"

- n: "→ →<br>`addrlocal`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "Our IP address and port number according to the remote node.  May be incorrect due to error or lying.  Most SPV nodes set this to `127.0.0.1:8333`"

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
  
- n: "→ →<br>`timeoffset`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>The time offset in seconds"

- n: "→ →<br>`pingtime`"
  t: "number (real)"
  p: "Required<br>(exactly 1)"
  d: "The number of seconds this node took to respond to our last P2P `ping` message"
  
- n: "→ →<br>`minping`"
  t: "number (real)"
  p: "Optional<br>(0 or 1)"
  d: "*Updated in Bitcoin Core 0.13.0*<br><br>The minimum observed ping time (if any at all)"

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
  d: "The height of the remote node's block chain when it connected to us as reported in its `version` message"

- n: "→ →<br>`banscore`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The ban score we've assigned the node based on any misbehavior it's made.  By default, Bitcoin Core disconnects when the ban score reaches `100`"

- n: "→ →<br>`synced_headers`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The highest-height header we have in common with this node based the last P2P `headers` message it sent us.  If a `headers` message has not been received, this will be set to `-1`"

- n: "→ →<br>`synced_blocks`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The highest-height block we have in common with this node based on P2P `inv` messages this node sent us.  If no block `inv` messages have been received from this node, this will be set to `-1`"

- n: "→ →<br>`inflight`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of blocks which have been requested from this peer.  May be empty"

- n: "→ → →<br>Blocks"
  t: "number (int)"
  p: "Optional<br>(0 or more)"
  d: "The height of a block being requested from the remote peer"

- n: "→ →<br>`whitelisted`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Set to `true` if the remote peer has been whitelisted; otherwise, set to `false`.  Whitelisted peers will not be banned if their ban score exceeds the maximum (100 by default).  By default, peers connecting from localhost are whitelisted"

- n: "→ →<br>`bytessent_per_msg`"
  t: "string : <br>object"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>Information about total sent bytes aggregated by message type"
  
- n: "→ → →<br>Message Type"
  t: "number (int)"
  p: "Required<br>(1 or more)"
  d: "Total sent bytes aggregated by message type. One field for every used message type"
  
- n: "→ →<br>`bytesrecv_per_msg`"
  t: "string : <br>object"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>Information about total received bytes aggregated by message type"
  
- n: "→ → →<br>Message Type"
  t: "number (int)"
  p: "Required<br>(1 or more)"
  d: "Total received bytes aggregated by message type. One field for every used message type"

 
{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

{% highlight bash %}
bitcoin-cli getpeerinfo
{% endhighlight %}

Result (edited to show only a single entry, with IP addresses changed to
[RFC5737][] reserved IP addresses):

{% highlight json %}
[
    {
    "id": 3,
    "addr": "192.0.2.113:43132",
    "addrlocal": "127.0.0.1:8333",
    "services": "0000000000000000",
    "relaytxes": true,
    "lastsend": 1481158534,
    "lastrecv": 1481158534,
    "bytessent": 142772,
    "bytesrecv": 14167,
    "conntime": 1481158420,
    "timeoffset": 11,
    "pingtime": 0.226368,
    "minping": 0.226368,
    "version": 70001,
    "subver": "/Satoshi:0.12.1/",
    "inbound": true,
    "startingheight": 0,
    "banscore": 0,
    "synced_headers": -1,
    "synced_blocks": -1,
    "inflight": [
    ],
    "whitelisted": false,
    "bytessent_per_msg": {
      "addr": 55,
      "inv": 12161,
      "ping": 32,
      "pong": 1824,
      "tx": 128549,
      "verack": 24,
      "version": 127
    },
    "bytesrecv_per_msg": {
      "getdata": 12161,
      "ping": 1824,
      "pong": 32,
      "verack": 24,
      "version": 126
    }
  }
]
{% endhighlight %}

*See also*

* [GetAddedNodeInfo][rpc getaddednodeinfo]: {{summary_getAddedNodeInfo}}
* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}

{% endautocrossref %}
