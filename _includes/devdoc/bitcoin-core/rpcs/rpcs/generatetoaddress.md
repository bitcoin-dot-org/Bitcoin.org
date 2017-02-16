{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/generatetoaddress.md" %}

##### GenerateToAddress
{% include helpers/subhead-links.md %}

{% assign summary_generateToAddress="mines blocks immediately to a specified address." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

*Requires wallet support.*

The `generatetoaddress` RPC {{summary_generateToAddress}}

*Parameter #1---the number of blocks to generate*

{% itemplate ntpd1 %}
- n: "Blocks"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of blocks to generate.  The RPC call will not return until all blocks have been generated or the maxium number of iterations has been reached"
  
{% enditemplate %}

*Parameter #2---a transaction identifier (TXID)*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The address to send the newly generated Bitcoin to"
  
{% enditemplate %}

*Parameter #3---the maximum number of iterations to try*

{% itemplate ntpd1 %}
- n: "Maxtries"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The maximum number of iterations that are tried to create the requested number of blocks.  Default is `1000000`"

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
  d: "The hashes of the headers of the blocks generated, as hex in RPC byte order"
{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

Using regtest mode, generate 2 blocks with maximal 500000 iterations:

{% highlight bash %}
bitcoin-cli -regtest generatetoaddress 2 "1BRo7qrYHMPrzdBDzfjmzt\
eBdYAyTMXW75" 500000
{% endhighlight %}

Result:

{% highlight json %}
[
    "36252b5852a5921bdfca8701f936b39edeb1f8c39fffe73b0d8437921401f9af",
    "5f2956817db1e386759aa5794285977c70596b39ea093b9eab0aa4ba8cd50c06"
]
{% endhighlight %}

*See also*

* [Generate][rpc generate]: {{summary_generate}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
