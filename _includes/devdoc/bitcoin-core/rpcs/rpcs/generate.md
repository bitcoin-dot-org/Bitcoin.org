{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/generate.md" %}

##### Generate
{% include helpers/subhead-links.md %}

{% assign summary_generate="nearly instantly generates blocks (in regtest mode only)" %}

{% autocrossref %}

*Requires wallet support.*

The `generate` RPC {{summary_generate}}

*Parameter #1---the number of blocks to generate*

{% itemplate ntpd1 %}
- n: "Blocks"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of blocks to generate.  The RPC call will not return until all blocks have been generated"
{% enditemplate %}

*Result---the generated block header hashes*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array containing the block header hashes of the generated blocks (may be empty if used with `generate 0`)"

- n: "→<br>Header Hashes"
  t: "string (hex)"
  p: "Required<br>(1 or more)"
  d: "The hashes of the headers of the blocks generated in regtest mode, as hex in RPC byte order"
{% enditemplate %}

*Examples from Bitcoin Core master (commit c2fa0846)*

Using regtest mode, generate 2 blocks:

{% highlight bash %}
bitcoin-cli -regtest generate 2
{% endhighlight %}

Result:

{% highlight json %}
[
    "36252b5852a5921bdfca8701f936b39edeb1f8c39fffe73b0d8437921401f9af",
    "5f2956817db1e386759aa5794285977c70596b39ea093b9eab0aa4ba8cd50c06"
]
{% endhighlight %}

*See also*

* [SetGenerate][rpc getgenerate]: {{summary_getGenerate}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
