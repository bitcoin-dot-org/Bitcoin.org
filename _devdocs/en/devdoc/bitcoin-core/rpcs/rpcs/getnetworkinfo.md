{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getnetworkinfo.md" %}

##### GetNetworkInfo
{% include helpers/subhead-links.md %}

{% assign summary_getNetworkInfo="returns information about the node's connection to the network." %}

{% autocrossref %}

The `getnetworkinfo` RPC {{summary_getNetworkInfo}}

*Parameters: none*

*Result---information about the node's connection to the network*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "Information about this node's connection to the network"

- n: "→<br>`version`"
  t: "number"
  p: "Required<br>(exactly 1)"
  d: "This node's version of Bitcoin Core in its internal integer format.  For example, Bitcoin Core 0.9.2 has the integer version number 90200"

- n: "→<br>`subversion`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The user agent this node sends in its `version` message"

- n: "→<br>`protocolversion`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The protocol version number used by this node.  See the [protocol versions section][section protocol versions] for more information"
  
- n: "→<br>`localservices`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The services supported by this node as advertised in its `version` message"
  
- n: "→<br>`localrelay`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>The services supported by this node as advertised in its `version` message"

- n: "→<br>`timeoffset`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The offset of the node's clock from the computer's clock (both in UTC) in seconds.  The offset may be up to 4200 seconds (70 minutes)"

- n: "→<br>`connections`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total number of open connections (both outgoing and incoming) between this node and other nodes"

- n: "→<br>`networks`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array with three objects: one describing the IPv4 connection, one describing the IPv6 connection, and one describing the Tor hidden service (onion) connection"

- n: "→ →<br>Network"
  t: "object"
  p: "Optional<br>(0 to 3)"
  d: "An object describing a network.  If the network is unroutable, it will not be returned"

- n: "→ → →<br>`name`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The name of the network.  Either `ipv4`, `ipv6`, or `onion`"

- n: "→ → →<br>`limited`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Set to `true` if only connections to this network are allowed according to the `-onlynet` Bitcoin Core command-line/configuration-file parameter.  Otherwise set to `false`"

- n: "→ → →<br>`reachable`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Set to `true` if connections can be made to or from this network.  Otherwise set to `false`"

- n: "→ → →<br>`proxy`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The hostname and port of any proxy being used for this network.  If a proxy is not in use, an empty string"
  
- n: "→ → →<br>`proxy_randomize_credentials`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.11.0*<br><br>Set to `true` if randomized credentials are set for this proxy. Otherwise set to `false`"
  
- n: "→<br>`relayfee`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The minimum fee a low-priority transaction must pay in order for this node to accept it into its memory pool"

- n: "→<br>`localaddresses`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of objects each describing the local addresses this node believes it listens on"

- n: "→ →<br>Address"
  t: "object"
  p: "Optional<br>(0 or more)"
  d: "An object describing a particular address this node believes it listens on"

- n: "→ → →<br>`address`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "An IP address or .onion address this node believes it listens on.  This may be manually configured, auto detected, or based on `version` messages this node received from its peers"

- n: "→ → →<br>`port`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The port number this node believes it listens on for the associated `address`.  This may be manually configured, auto detected, or based on `version` messages this node received from its peers"

- n: "→ → →<br>`score`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of incoming connections during the uptime of this node that have used this address in their `version` message"
  
- n: "→<br>`warnings`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.11.0*<br><br>A plain-text description of any network warnings. If there are no warnings, an empty string will be returned. "

{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

{% highlight bash %}
bitcoin-cli getnetworkinfo
{% endhighlight %}

Result (actual addresses have been replaced with reserved addresses):

{% highlight json %}
{
  "version": 130100,
  "subversion": "/Satoshi:0.13.1/",
  "protocolversion": 70014,
  "localservices": "000000000000000d",
  "localrelay": true,
  "timeoffset": -19,
  "connections": 8,
  "networks": [
    {
      "name": "ipv4",
      "limited": false,
      "reachable": true,
      "proxy": "",
      "proxy_randomize_credentials": false
    }, 
    {
      "name": "ipv6",
      "limited": false,
      "reachable": true,
      "proxy": "",
      "proxy_randomize_credentials": false
    }, 
    {
      "name": "onion",
      "limited": true,
      "reachable": false,
      "proxy": "",
      "proxy_randomize_credentials": false
    }
  ],
  "relayfee": 5000.00000000,
  "localaddresses": [
    {
      "address": "0600:3c03::f03c:91ff:fe89:dfc4",
      "port": 8333,
      "score": 4
    }
  ],
  "warnings": ""
}
{% endhighlight %}

*See also*

* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}
* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}

{% endautocrossref %}
