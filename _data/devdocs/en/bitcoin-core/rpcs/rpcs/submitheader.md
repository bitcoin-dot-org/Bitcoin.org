{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/submitheader.md" %}

##### SubmitHeader
{% include helpers/subhead-links.md %}

{% assign summary_submitHeader="decode the given hexdata as a header and submit it as a candidate chain tip if valid." %}

{% autocrossref %}

*Added in Bitcoin Core 0.18.0*

The `submitheader` RPC {{summary_submitHeader}}

Throws when the header is invalid.

*Parameter #1---hexdata*

{% itemplate ntpd1 %}
- n: "hexdata"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "the hex-encoded block header data"

{% enditemplate %}

*Result*

{% endautocrossref %}

    None

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli submitheader "aabbcc"
{% endhighlight %}

{% endautocrossref %}
