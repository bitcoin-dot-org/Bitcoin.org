{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/stop.md" %}

##### Stop
{% include helpers/subhead-links.md %}

{% assign summary_stop="safely shuts down the Bitcoin Core server." %}

{% autocrossref %}

The `stop` RPC {{summary_stop}}

*Parameters: none*

*Result---the server is safely shut down*

{{json_table}}

* `result`
* string
* Required (exactly 1)
* The string "Bitcoin server stopping"

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet stop
{% endhighlight %}

Result:

{% highlight text %}
Bitcoin server stopping
{% endhighlight %}

*See also: none*

{% endautocrossref %}
