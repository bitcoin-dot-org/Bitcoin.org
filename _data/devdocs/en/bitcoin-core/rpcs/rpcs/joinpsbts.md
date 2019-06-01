{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/joinpsbts.md" %}

##### JoinPsbts
{% include helpers/subhead-links.md %}

{% assign summary_joinPsbts="joins multiple distinct PSBTs with different inputs and outputs into one PSBT with inputs and outputs from all of the PSBTs No input in any of the PSBTs can be in more than one of the PSBTs." %}

{% autocrossref %}

*Added in Bitcoin Core 0.18.0*

The `joinpsbts` RPC {{summary_joinPsbts}}

*Parameter #1---txs*

{% itemplate ntpd1 %}
- n: "txs"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "A json array of base64 strings of partially signed transactions"

{% enditemplate %}

{% endautocrossref %}

    [
      "psbt",    (string, required) A base64 string of a PSBT
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
bitcoin-cli joinpsbts "psbt"
{% endhighlight %}

{% endautocrossref %}
