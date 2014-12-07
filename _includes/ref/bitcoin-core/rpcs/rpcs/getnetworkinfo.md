{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getnetworkinfo.md" %}

##### GetNetworkInfo
{% include helpers/subhead-links.md %}

{% assign summary_getNetworkInfo="returns information about the node's connection to the network." %}

{% autocrossref %}

*Added in Bitcoin Core 0.9.2.*

The `getnetworkinfo` RPC {{summary_getNetworkInfo}}

*Parameters: none*

*Result---information about the node's connection to the network*

| Name                      | Type            | Presence                    | Description
|---------------------------|-------------------|-----------------------------|----------------
| `result`                  | object            | Required<br>(exactly 1)     | Information about this node's connection to the network
| →<br>`version`            | number            | Required<br>(exactly 1)     | This node's version of Bitcoin Core in its internal integer format.  For example, Bitcoin Core 0.9.2 has the integer version number 90200
| →<br>`subversion`         | string            | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>The user agent this node sends in its `version` message
| →<br>`protocolversion`    | number (int)      | Required<br>(exactly 1)     | The protocol version number used by this node.  See the [protocol versions section][section protocol versions] for more information
| →<br>`timeoffset`         | number (int)      | Required<br>(exactly 1)     | The offset of the node's clock from the computer's clock (both in UTC) in seconds.  The offset may be up to 4200 seconds (70 minutes)
| →<br>`connections`        | number (int)      | Required<br>(exactly 1)     | The total number of open connections (both outgoing and incoming) between this node and other nodes
| →<br>`proxy`              | string            | Required<br>(exactly 1)     | The hostname/IP address and port number of the proxy, if set, or an empty string if unset
| →<br>`relayfee`           | number (bitcoins) | Required<br>(exactly 1)     | The minimum fee a low-priority transaction must pay in order for this node to accept it into its memory pool
| →<br>`localservices`      | string (hex)      | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>The services supported by this node as advertised in its `version` message
| →<br>`networks`           | array             | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>An array with three objects: one describing the IPv4 connection, one describing the IPv6 connection, and one describing the Tor hidden service (onion) connection
| → →<br>Network            | object            | Optional<br>(0 to 3)        | An object describing a network.  If the network is unroutable, it will not be returned
| → → →<br>`name`           | string            | Required<br>(exactly 1)     | The name of the network.  Either `ipv4`, `ipv6`, or `onion`
| → → →<br>`limited`        | bool              | Required<br>(exactly 1)     | Set to `true` if only connections to this network are allowed according to the `-onlynet` Bitcoin Core command-line/configuration-file parameter.  Otherwise set to `false`
| → → →<br>`reachable`      | bool              | Required<br>(exactly 1)     | Set to `true` if connections can be made to or from this network.  Otherwise set to `false`
| → → →<br>`proxy`          | string            | Required<br>(exactly 1)     | The hostname and port of any proxy being used for this network.  If a proxy is not in use, an empty string
| → → →<br>`localaddresses` | array             | Required<br>(exactly 1)     | An array of objects each describing the local addresses this node believes it listens on
| → → → →<br>Address       | object             | Optional<br>(0 or more)     | An object describing a particular address this node believes it listens on
| → → → → →<br>`address`    | string            | Required<br>(exactly 1)     | An IP address or .onion address this node believes it listens on.  This may be manually configured, auto detected, or based on `version` messages this node received from its peers
| → → → → →<br>`port`       | number (int)      | Required<br>(exactly 1)     | The port number this node believes it listens on for the associated `address`.  This may be manually configured, auto detected, or based on `version` messages this node received from its peers
| → → → → →<br>`score`      | number (int)      | Required<br>(exactly 1)     | The self-assigned score this node gives to this connection; higher scores means the node thinks this connection is better <!-- SOMEDAY: figure out scores -->

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getnetworkinfo
{% endhighlight %}

Result (actual addresses have been replaced with reserved addresses):

{% highlight json %}
{
    "version" : 100000,
    "subversion" : "/Satoshi:0.10.0/",
    "protocolversion" : 70002,
    "localservices" : "0000000000000001",
    "timeoffset" : 0,
    "connections" : 51,
    "networks" : [
        {
            "name" : "ipv4",
            "limited" : false,
            "reachable" : true,
            "proxy" : ""
        },
        {
            "name" : "ipv6",
            "limited" : false,
            "reachable" : true,
            "proxy" : ""
        },
        {
            "name" : "onion",
            "limited" : false,
            "reachable" : false,
            "proxy" : ""
        }
    ],
    "relayfee" : 0.00001000,
    "localaddresses" : [
        {
            "address" : "192.0.2.113",
            "port" : 18333,
            "score" : 6470
        },
        {
            "address" : "0600:3c03::f03c:91ff:fe89:dfc4",
            "port" : 18333,
            "score" : 2029
        }
    ]
}
{% endhighlight %}

*See also*

* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}
* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}

{% endautocrossref %}
