{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/clearbanned.md" %}

##### ClearBanned
{% include helpers/subhead-links.md %}

{% assign summary_clearBanned="clear all banned IPs." %}

{% autocrossref %}

*Added in Bitcoin Core 0.12.0*

The `clearbanned` RPC {{summary_clearBanned}}

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
bitcoin-cli clearbanned
{% endhighlight %}

*See also*

* [ListBanned][rpc listbanned]: {{summary_listBanned}}
* [SetBan][rpc setban]: {{summary_setBan}}

{% endautocrossref %}
