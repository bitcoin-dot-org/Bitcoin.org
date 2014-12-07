{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getpeerinfo.md" %}

##### GetPeerInfo
{% include helpers/subhead-links.md %}

{% assign summary_getPeerInfo="returns data about each connected network node." %}

{% autocrossref %}

The `getpeerinfo` RPC {{summary_getPeerInfo}}

*Parameters: none*

*Result---information about each currently-connected network node*

| Name                    | Type              | Presence                    | Description
|-------------------------|-------------------|-----------------------------|----------------
| `result`                | array             | Required<br>(exactly 1)     | An array of objects each describing one connected node.  If there are no connections, the array will be empty
| →<br>Node               | object            | Optional<br>(0 or more)     | An object describing a particular connected node
| → →<br>`id`             | number (int)      | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>The node's index number in the local node address database
| → →<br>`addr`           | string            | Required<br>(exactly 1)     | The IP address and port number used for the connection to the remote node
| → →<br>`addrlocal`      | string            | Optional<br>(0 or 1)        | Our IP address and port number according to the remote node.  May be incorrect due to error or lying.  Many SPV nodes set this to `127.0.0.1:8333`
| → →<br>`services`       | string (hex)      | Required<br>(exactly 1)     | The services advertised by the remote node in its `version` message
| → →<br>`lastsend`       | number (int)      | Required<br>(exactly 1)     | The Unix epoch time when we last successfully sent data to the TCP socket for this node
| → →<br>`lastrecv`       | number (int)      | Required<br>(exactly 1)     | The Unix epoch time when we last received data from this node
| → →<br>`bytessent`      | number (int)      | Required<br>(exactly 1)     | The total number of bytes we've sent to this node
| → →<br>`bytesrecv`      | number (int)      | Required<br>(exactly 1)     | The total number of bytes we've received from this node
| → →<br>`conntime`       | number (int)      | Required<br>(exactly 1)     | The Unix epoch time when we connected to this node
| → →<br>`pingtime`       | number (real)     | Required<br>(exactly 1)     | The number of seconds this node took to respond to our last P2P `ping` message
| → →<br>`pingwait`       | number (real)     | Optional<br>(0 or 1)        | The number of seconds we've been waiting for this node to respond to a P2P `ping` message.  Only shown if there's an outstanding `ping` message
| → →<br>`version`        | number (int)      | Required<br>(exactly 1)     | The protocol version number used by this node.  See the [protocol versions section][section protocol versions] for more information
| → →<br>`subver`         | string            | Required<br>(exactly 1)     | The user agent this node sends in its `version` message.  This string will have been sanitized to prevent corrupting the JSON results.  May be an empty string
| → →<br>`inbound`        | bool              | Required<br>(exactly 1)     | Set to `true` if this node connected to us; set to `false` if we connected to this node
| → →<br>`startingheight` | number (int)      | Required<br>(exactly 1)     | The height of the remote node's block chain when it connected to us as reported in its `version` message
| → →<br>`banscore`       | number (int)      | Required<br>(exactly 1)     | The ban score we've assigned the node based on any misbehavior it's made.  By default, Bitcoin Core disconnects when the ban score reaches `100`
| → →<br>`synced_headers` | number (int)      | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>The highest-height header we have in common with this node based the last P2P `headers` message it sent us.  If a `headers` message has not been received, this will be set to `-1`
| → →<br>`synced_blocks`  | number (int)      | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>The highest-height block we have in common with this node based on P2P `inv` messages this node sent us.  If no block `inv` messages have been received from this node, this will be set to `-1`
| → →<br>`syncnode`       | bool              | Required<br>(exactly 1)     | *Removed in Bitcoin Core 0.10.0*<br><br>Whether we're using this node as our syncnode during initial block download
| → →<br>`inflight`       | array             | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>An array of blocks which have been requested from this peer.  May be empty
| → → →<br>Blocks         | number (int)      | Optional<br>(0 or more)     | The height of a block being requested from the remote peer
| → →<br>`whitelisted`    | bool              | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>Set to `true` if the remote peer has been whitelisted; otherwise, set to `false`.  Whitelisted peers will not be banned if their ban score exceeds the maximum (100 by default).  By default, peers connecting from localhost are whitelisted

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
