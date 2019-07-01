{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rest/requests/get_blockhashbyheight.md" %}

##### GET BlockHashByHeight
{% include helpers/subhead-links.md %}

{% assign summary_restGetBlockHashByHeight="gets the hash of the block in the current best blockchain based on its height (how many blocks it is after the Genesis Block)." %}

{% autocrossref %}

The `GET blockhashbyheight` operation {{summary_restGetBlockHashByHeight}}

*Request*

{% highlight text %}
GET /blockhashbyheight/<height>.<format>
{% endhighlight %}

*Parameter #1---the height of the block hash to retrieve*

{% itemplate ntpd1 %}
- n: "Block Height"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of the block (how many blocks it is after the Genesis Block)"

{% enditemplate %}

*Parameter #2---the output format*

{% itemplate ntpd1 %}
- n: "Format"
  t: "suffix"
  p: "Required<br>(exactly 1)"
  d: "Set to `.json`, `.bin` or `hex`."

{% enditemplate %}

*Response as JSON*

{% assign DEPTH="→ →" %}
{% include helpers/vars.md %}

{% itemplate ntpd1 %}
- n: "Result"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object containing the requested block"

- n: "→<br>`blockhash`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the block at height set in parameter #1 in the current best blockchain."

{% enditemplate %}

*Examples from Bitcoin Core 0.18.0*

Request a blockhash in hex-encoded serialized block format:

{% highlight bash %}
curl http://localhost:8332/rest/blockhashbyheight/1.hex
{% endhighlight %}

Result (wrapped):

{% highlight bash %}
00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048

{% endhighlight %}

Get the same blockhash in JSON:

{% highlight bash %}
curl http://localhost:8332/rest/blockhashbyheight/1.json
{% endhighlight %}

Result (whitespaced added):

{% highlight json %}
{
  "blockhash": "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
}
{% endhighlight %}

*See also*

* [GET Block/NoTxDetails][rest get block-notxdetails] {{summary_restGetBlockHashByHeight-noTxDetails}}
* [GetBestBlockHash][rpc getbestblockhash] RPC: {{summary_getBestBlockHash}}
* [GetBlockHashByHeight][rpc GetBlockHashByHeight] RPC: {{summary_GetBlockHashByHeight}}
* [GetBlockHashByHeightHash][rpc GetBlockHashByHeighthash] RPC: {{summary_GetBlockHashByHeightHash}}

{% endautocrossref %}
