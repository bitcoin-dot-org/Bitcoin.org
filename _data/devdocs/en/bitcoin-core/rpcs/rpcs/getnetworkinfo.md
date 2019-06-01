{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getnetworkinfo.md" %}

##### GetNetworkInfo
{% include helpers/subhead-links.md %}

{% assign summary_getNetworkInfo="returns an object containing various state info regarding P2P networking." %}

{% autocrossref %}

The `getnetworkinfo` RPC {{summary_getNetworkInfo}}

*Parameters: none*

*Result*

{% endautocrossref %}

    {
      "version": xxxxx,                      (numeric) the server version
      "subversion": "/Satoshi:x.x.x/",     (string) the server subversion string
      "protocolversion": xxxxx,              (numeric) the protocol version
      "localservices": "xxxxxxxxxxxxxxxx", (string) the services we offer to the network
      "localrelay": true|false,              (bool) true if transaction relay is requested from peers
      "timeoffset": xxxxx,                   (numeric) the time offset
      "connections": xxxxx,                  (numeric) the number of connections
      "networkactive": true|false,           (bool) whether p2p networking is enabled
      "networks": [                          (array) information per network
      {
        "name": "xxx",                     (string) network (ipv4, ipv6 or onion)
        "limited": true|false,               (boolean) is the network limited using -onlynet?
        "reachable": true|false,             (boolean) is the network reachable?
        "proxy": "host:port"               (string) the proxy that is used for this network, or empty if none
        "proxy_randomize_credentials": true|false,  (string) Whether randomized credentials are used
      }
      ,...
      ],
      "relayfee": x.xxxxxxxx,                (numeric) minimum relay fee for transactions in BTC/kB
      "incrementalfee": x.xxxxxxxx,          (numeric) minimum fee increment for mempool limiting or BIP 125 replacement in BTC/kB
      "localaddresses": [                    (array) list of local addresses
      {
        "address": "xxxx",                 (string) network address
        "port": xxx,                         (numeric) network port
        "score": xxx                         (numeric) relative score
      }
      ,...
      ]
      "warnings": "..."                    (string) any network and blockchain warnings
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getnetworkinfo
{% endhighlight %}

*See also*

* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}
* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}

{% endautocrossref %}
