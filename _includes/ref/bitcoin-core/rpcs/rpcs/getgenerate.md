{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getgenerate.md" %}

##### GetGenerate
{% include helpers/subhead-links.md %}

{% assign summary_getGenerate="returns true if the node is set to generate blocks using its CPU." %}

{% autocrossref %}

*Requires wallet support.*

The `getgenerate` RPC {{summary_getGenerate}}

*Parameters: none*

*Result---whether the server is set to generate blocks*

{{json_table}}

* `result`
* bool
* Required (exactly 1)
* Set to `true` if the server is set to generate blocks; set to `false` if it is not

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getgenerate
{% endhighlight %}

Result:

{% highlight json %}
false
{% endhighlight %}

*See also*

* [SetGenerate][rpc setgenerate]: {{summary_setGenerate}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetHashesPerSec][rpc gethashespersec]: {{summary_getHashesPerSec}}

{% endautocrossref %}
