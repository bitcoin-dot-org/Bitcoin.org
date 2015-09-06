{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/submitblock.md" %}

##### SubmitBlock
{% include helpers/subhead-links.md %}

{% assign summary_submitBlock="accepts a block, verifies it is a valid addition to the block chain, and broadcasts it to the network. Extra parameters are ignored by Bitcoin Core but may be used by mining pools or other programs." %}

{% autocrossref %}

The `submitblock` RPC {{summary_submitBlock}}

*Parameter #1---the new block in serialized block format as hex*

{% itemplate ntpd1 %}
- n: "Block"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The full block to submit in serialized block format as hex"

{% enditemplate %}

*Parameter #2---additional parameters*

{% itemplate ntpd1 %}
- n: "Parameters"
  t: "object"
  p: "Optional<br>(0 or 1)"
  d: "A JSON object containing extra parameters.  Not used directly by Bitcoin Core and also not broadcast to the network.  This is available for use by mining pools and other software.  A common parameter is a `workid` string"

{% enditemplate %}

*Result---`null` or error string*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null/string"
  p: "Required<br>(exactly 1)"
  d: "If the block submission succeeded, set to JSON `null`.  If submission failed, set to one of the following strings: `duplicate`, `duplicate-invalid`, `inconclusive`, or `rejected`.  The JSON-RPC `error` field will still be set to `null` if submission failed for one of these reasons"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Submit the following block with the workid, "test".

{% highlight bash %}
bitcoin-cli -testnet submitblock 02000000df11c014a8d798395b5059c\
722ebdf3171a4217ead71bf6e0e99f4c7000000004a6f6a2db225c81e77773f6\
f0457bcb05865a94900ed11356d0b75228efb38c7785d6053ffff001d005d437\
0010100000001000000000000000000000000000000000000000000000000000\
0000000000000ffffffff0d03b477030164062f503253482fffffffff0100f90\
29500000000232103adb7d8ef6b63de74313e0cd4e07670d09a169b13e4eda2d\
650f529332c47646dac00000000 \
'{ "workid": "test" }'
{% endhighlight %}

Result (the block above was already on a local block chain):

{% highlight text %}
duplicate
{% endhighlight %}

*See also*

* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
