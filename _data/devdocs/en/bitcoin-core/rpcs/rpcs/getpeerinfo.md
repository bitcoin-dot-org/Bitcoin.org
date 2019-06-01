{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getpeerinfo.md" %}

##### GetPeerInfo
{% include helpers/subhead-links.md %}

{% assign summary_getPeerInfo="returns data about each connected network node as a json array of objects." %}

{% autocrossref %}

The `getpeerinfo` RPC {{summary_getPeerInfo}}

*Parameters: none*

*Result*

{% endautocrossref %}

    [
      {
        "id": n,                   (numeric) Peer index
        "addr":"host:port",      (string) The IP address and port of the peer
        "addrbind":"ip:port",    (string) Bind address of the connection to the peer
        "addrlocal":"ip:port",   (string) Local address as reported by the peer
        "services":"xxxxxxxxxxxxxxxx",   (string) The services offered
        "relaytxes":true|false,    (boolean) Whether peer has asked us to relay transactions to it
        "lastsend": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
        "lastrecv": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
        "bytessent": n,            (numeric) The total bytes sent
        "bytesrecv": n,            (numeric) The total bytes received
        "conntime": ttt,           (numeric) The connection time in seconds since epoch (Jan 1 1970 GMT)
        "timeoffset": ttt,         (numeric) The time offset in seconds
        "pingtime": n,             (numeric) ping time (if available)
        "minping": n,              (numeric) minimum observed ping time (if any at all)
        "pingwait": n,             (numeric) ping wait (if non-zero)
        "version": v,              (numeric) The peer version, such as 70001
        "subver": "/Satoshi:0.8.5/",  (string) The string version
        "inbound": true|false,     (boolean) Inbound (true) or Outbound (false)
        "addnode": true|false,     (boolean) Whether connection was due to addnode/-connect or if it was an automatic/inbound connection
        "startingheight": n,       (numeric) The starting height (block) of the peer
        "banscore": n,             (numeric) The ban score
        "synced_headers": n,       (numeric) The last header we have in common with this peer
        "synced_blocks": n,        (numeric) The last block we have in common with this peer
        "inflight": [
           n,                        (numeric) The heights of blocks we're currently asking from this peer
           ...
        ],
        "whitelisted": true|false, (boolean) Whether the peer is whitelisted
        "minfeefilter": n,         (numeric) The minimum fee rate for transactions this peer accepts
        "bytessent_per_msg": {
           "msg": n,               (numeric) The total bytes sent aggregated by message type
                                   When a message type is not listed in this json object, the bytes sent are 0.
                                   Only known message types can appear as keys in the object.
           ...
        },
        "bytesrecv_per_msg": {
           "msg": n,               (numeric) The total bytes received aggregated by message type
                                   When a message type is not listed in this json object, the bytes received are 0.
                                   Only known message types can appear as keys in the object and all bytes received of unknown message types are listed under '*other*'.
           ...
        }
      }
      ,...
    ]

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getpeerinfo
{% endhighlight %}

*See also*

* [GetAddedNodeInfo][rpc getaddednodeinfo]: {{summary_getAddedNodeInfo}}
* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}

{% endautocrossref %}
