{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/combinepsbt.md" %}

##### CombinePsbt
{% include helpers/subhead-links.md %}

{% assign summary_combinePsbt="combine multiple partially signed Bitcoin transactions into one transaction." %}

{% autocrossref %}

The `combinepsbt` RPC {{summary_combinePsbt}}

Implements the Combiner role.

*Parameter #1---txs*

{% itemplate ntpd1 %}
- n: "txs"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "A json array of base64 strings of partially signed transactions"

{% enditemplate %}

{% endautocrossref %}

    [
      "psbt",    (string) A base64 string of a PSBT
      ...
    ]

{% autocrossref %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli combinepsbt ["mybase64_1", "mybase64_2", "mybase64_3"]
{% endhighlight %}

{% endautocrossref %}
