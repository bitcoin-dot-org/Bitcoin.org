{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/combinerawtransaction.md" %}

##### CombineRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_combineRawTransaction="combine multiple partially signed transactions into one transaction." %}

{% autocrossref %}

The `combinerawtransaction` RPC {{summary_combineRawTransaction}}

The combined transaction may be another partially signed transaction or a
fully signed transaction.

*Parameter #1---txs*

{% itemplate ntpd1 %}
- n: "txs"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "A json array of hex strings of partially signed transactions"

{% enditemplate %}

{% endautocrossref %}

    [
      "hexstring",    (string) A transaction hash
      ...
    ]

{% autocrossref %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hex-encoded raw transaction with signature(s)"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli combinerawtransaction ["myhex1", "myhex2", "myhex3"]
{% endhighlight %}

{% endautocrossref %}
