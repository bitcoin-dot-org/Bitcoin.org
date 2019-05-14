{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/setlabel.md" %}

##### SetLabel
{% include helpers/subhead-links.md %}

{% assign summary_setLabel="sets the label associated with the given address." %}

{% autocrossref %}

*Added in Bitcoin Core 0.17.0*

The `setlabel` RPC {{summary_setLabel}}

*Parameter #1---address*

{% itemplate ntpd1 %}
- n: "address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The bitcoin address to be associated with a label."

{% enditemplate %}

*Parameter #2---label*

{% itemplate ntpd1 %}
- n: "label"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The label to assign to the address."

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
bitcoin-cli setlabel "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "tabby"
{% endhighlight %}

{% endautocrossref %}
