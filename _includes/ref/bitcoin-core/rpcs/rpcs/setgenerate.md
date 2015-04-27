{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/setgenerate.md" %}

##### SetGenerate
{% include helpers/subhead-links.md %}

{% assign summary_setGenerate="enables or disables hashing to attempt to find the next block." %}

{% autocrossref %}

*Requires wallet support.*

The `setgenerate` RPC {{summary_setGenerate}}

*Parameter #1---whether to enable or disable generation*

{% itemplate ntpd1 %}
- n: "Enable/Disable"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Set to `true` to enable generation; set to `false` to disable generation"

{% enditemplate %}

*Parameter #2 (regular)---the number of processors to use*

{% itemplate ntpd1 %}
- n: "Processors"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The number of processors to use.  Defaults to `1`.  Set to `-1` to use all processors"

{% enditemplate %}

*Parameter #2 (regtest)---the number of blocks to generate*

Note: setgenerate in regtest mode has been removed in Bitcoin Core
master. See the `generate` RPC for the replacement.

{% itemplate ntpd1 %}
- n: "Blocks"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "In regtest mode, set to the number of blocks to generate.  Defaults to `1`"

{% enditemplate %}

*Result (regular)---generating is enabled*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "Always JSON `null`"

{% enditemplate %}

*Result (regtest)---the generated block header hashes*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "array/null"
  p: "Required<br>(exactly 1)"
  d: "An array containing the block header hashes of the generated blocks, or JSON `null` if no blocks were generated"

- n: "→<br>Header Hashes"
  t: "string (hex)"
  p: "Required<br>(1 or more)"
  d: "The hashes of the headers of the blocks generated in regtest mode, as hex in RPC byte order"

{% enditemplate %}

*Examples from Bitcoin Core 0.10.0*

Enable generation using two logical processors (on this machine, two
cores of one physical processor):

{% highlight bash %}
bitcoin-cli -testnet setgenerate true 2
{% endhighlight %}

(Success: no result displayed.  Process manager shows 200% CPU usage.)

Using regtest mode, generate 2 blocks:

{% highlight bash %}
bitcoin-cli -regtest setgenerate true 101
{% endhighlight %}

Result:

{% highlight json %}
[
    "7e38de938d0dcbb41be63d78a8353e77e9d1b3ef82e0368eda051d4926eef915",
    "61d6e5f1a64d009659f45ef1c614e57f4aa0501708641212be236dc56d726da8"
]
{% endhighlight %}

*See also*

* [GetGenerate][rpc getgenerate]: {{summary_getGenerate}}
* [GetHashesPerSec][rpc gethashespersec]: {{summary_getHashesPerSec}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
