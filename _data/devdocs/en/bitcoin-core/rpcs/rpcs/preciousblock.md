{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/preciousblock.md" %}

##### PreciousBlock
{% include helpers/subhead-links.md %}

{% assign summary_preciousBlock="treats a block as if it were received before others with the same work." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

The `preciousblock` RPC {{summary_preciousBlock}}

A later preciousblock call can override the effect of an earlier one.

The effects of preciousblock are not retained across restarts.

*Parameter #1---blockhash*

{% itemplate ntpd1 %}
- n: "blockhash"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "the hash of the block to mark as precious"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli preciousblock "blockhash"
{% endhighlight %}

{% endautocrossref %}
