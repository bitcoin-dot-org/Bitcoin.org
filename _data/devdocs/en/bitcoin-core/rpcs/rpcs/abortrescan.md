{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/abortrescan.md" %}

##### AbortRescan
{% include helpers/subhead-links.md %}

{% assign summary_abortRescan="Stops current wallet rescan" %}

{% autocrossref %}

The `abortrescan` RPC {{summary_abortRescan}}

Stops current wallet rescan triggered by an RPC call, e.g. by an importprivkey call.

*Parameters: none*

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Import a private key

{% highlight bash %}
bitcoin-cli importprivkey "mykey"
{% endhighlight %}
Abort the running wallet rescan

{% highlight bash %}
bitcoin-cli abortrescan
{% endhighlight %}

{% endautocrossref %}
