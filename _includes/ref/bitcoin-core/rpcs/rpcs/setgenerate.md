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

{{json_table}}

* Enable/Disable
* bool
* Required (exactly 1)
* Set to `true` to enable generation; set to `false` to disable generation

*Parameter #2 (regular)---the number of processors to use*

{{json_table}}

* Processors
* number (int)
* Optional (0 or 1)
* The number of processors to use.  Defaults to `1`.  Set to `-1` to use all processors

*Parameter #2 (regtest)---the number of blocks to generate*

{{json_table}}

* Blocks
* number (int)
* Optional (0 or 1)
* In regtest mode, set to the number of blocks to generate.  Defaults to `1`

*Result (regular)---generating is enabled*

{{json_table}}

* `result`
* null
* Required (exactly 1)
* Always JSON `null`

*Result (regtest)---the generated block header hashes*

{{json_table}}

* `result`
* array/null
* Required (exactly 1)
* An array containing the block header hashes of the generated blocks, or JSON `null` if no blocks were generated

* →<br>Header Hashes
* string (hex)
* Required (1 or more)
* The hashes of the headers of the blocks generated in regtest mode, as hex in RPC byte order

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
