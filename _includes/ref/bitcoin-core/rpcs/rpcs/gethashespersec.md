{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/gethashespersec.md" %}

##### GetHashesPerSec
{% include helpers/subhead-links.md %}

{% assign summary_getHashesPerSec="was removed in Bitcoin Core master (unreleased). It returned a recent hashes per second performance measurement when the node was generating blocks." %}

{% autocrossref %}

*Requires wallet support.*

The `gethashespersec` RPC {{summary_getHashesPerSec}}

*Parameters: none*

*Result---the number of hashes your computer generated per second*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "If generation is enabled, the number of hashes per second your computer most recently generated.  If generation is disabled, the value `0`"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet gethashespersec
{% endhighlight %}

Result:

{% highlight json %}
1995356
{% endhighlight %}

*See also*

* [SetGenerate][rpc setgenerate]: {{summary_setGenerate}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}

{% endautocrossref %}
