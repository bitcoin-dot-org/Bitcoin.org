{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getaddednodeinfo.md" %}

##### GetAddedNodeInfo
{% include helpers/subhead-links.md %}

{% assign summary_getAddedNodeInfo="returns information about the given added node, or all added nodes (except onetry nodes). Only nodes which have been manually added using the `addnode` RPC will have their information displayed." %}

{% autocrossref %}

The `getaddednodeinfo` RPC {{summary_getAddedNodeInfo}}

*Parameter #1---whether to display connection information*

| Name             | Type         | Presence                    | Description
|------------------|--------------|-----------------------------|----------------
| Details          | bool         | Required<br>(exactly 1)     | Set to `true` to display detailed information about each added node; set to `false` to only display the IP address or hostname and port added
{:.ntpd}

*Parameter #2---what node to display information about*

| Name             | Type         | Presence                    | Description
|------------------|--------------|-----------------------------|----------------
| Node             | string       | Optional<br>(0 or 1)        | The node to get information about in the same `<IP address>:<port>` format as the `addnode` RPC.  If this parameter is not provided, information about all added nodes will be returned
{:.ntpd}

*Result---a list of added nodes*

| Name                   | Type         | Presence                    | Description
|------------------------|--------------|-----------------------------|----------------
| `result`               | array        | Required<br>(exactly 1)     | An array containing objects describing each added node.  If no added nodes are present, the array will be empty.  Nodes added with `onetry` will not be returned
| →<br>Added Node        | object       | Optional<br>(0 or more)     | An object containing details about a single added node
| → →<br>`addednode`     | string       | Required<br>(exactly 1)     | An added node in the same `<IP address>:<port>` format as used in the `addnode` RPC.  This element is present for any added node whether or not the Details parameter was set to `true`
| → →<br>`connected`     | bool         | Optional<br>(0 or 1)        | If the Details parameter was set to `true`, this will be set to `true` if the node is currently connected and `false` if it is not
| → →<br>`addresses`     | array        | Optional<br>(0 or 1)        | If the Details parameter was set to `true`, this will be an array of addresses belonging to the added node
| → → →<br>Address       | object       | Optional<br>(0 or more)     | An object describing one of this node's addresses
| → → → →<br>`address`   | string       | Required<br>(exactly 1)     | An IP address and port number of the node.  If the node was added using a DNS address, this will be the resolved IP address
| → → → →<br>`connected` | string       | Required<br>(exactly 1)     | Whether or not the local node is connected to this addnode using this IP address.  Valid values are:<br>• `false` for not connected<br>• `inbound` if the addnode connected to us<br>• `outbound` if we connected to the addnode
{:.ntpd}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getaddednodeinfo true
{% endhighlight %}

Result (real hostname and IP address replaced):

{% highlight json %}
[
    {
        "addednode" : "bitcoind.example.com:18333",
        "connected" : true,
        "addresses" : [
            {
                "address" : "192.0.2.113:18333",
                "connected" : "outbound"
            }
        ]
    }
]
{% endhighlight %}

*See also*

* [AddNode][rpc addnode]: {{summary_addNode}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}

{% endautocrossref %}
