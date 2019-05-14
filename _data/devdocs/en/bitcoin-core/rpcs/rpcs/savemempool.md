{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/savemempool.md" %}

##### SaveMemPool
{% include helpers/subhead-links.md %}

{% assign summary_saveMemPool="dumps the mempool to disk." %}

{% autocrossref %}

*Added in Bitcoin Core 0.16.0*

The `savemempool` RPC {{summary_saveMemPool}}

It will fail until the previous dump is fully loaded.

*Parameters: none*

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli savemempool
{% endhighlight %}

{% endautocrossref %}
