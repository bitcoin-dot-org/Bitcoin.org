{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/preciousblock.md" %}

##### PreciousBlock
{% include helpers/subhead-links.md %}

{% assign summary_preciousBlock="treats a block as if it were received before others with the same work." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

The `preciousblock` RPC {{summary_preciousBlock}} A later `preciousblock` call can override the effect of an earlier one. The effects of `preciousblock` are not retained across restarts.

*Parameter #1---the block hash*

{% itemplate ntpd1 %}
- n: "Header Hash"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the block to mark as precious"

{% enditemplate %}

*Result---`null` or error on failure*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null`.  The JSON-RPC error field will be set only if you entered an invalid block hash"

{% enditemplate %}

*Example from Bitcoin Core 0.14.1*

{% highlight bash %}
bitcoin-cli preciousblock 000000000000000001517a0bac70b8cd6f27ee\
1b50a8f12bf606ea6fb6d561cd
{% endhighlight %}

Result (no output from `bitcoin-cli` because result is set to `null`).

{% endautocrossref %}
