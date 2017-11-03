{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/clearbanned.md" %}

##### ClearBanned
{% include helpers/subhead-links.md %}

{% assign summary_clearBanned="clears list of banned nodes." %}

{% autocrossref %}

*Added in Bitcoin Core 0.12.0*

The `clearbanned` RPC {{summary_clearBanned}}

*Parameters: none*

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the list was cleared"

{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

Clears the ban list.

{% highlight bash %}
bitcoin-cli clearbanned
{% endhighlight %}

Result (no output from `bitcoin-cli` because result is set to `null`).

*See also*

* [ListBanned][rpc listbanned]: {{summary_listBanned}}
* [SetBan][rpc setban]: {{summary_setBan}}

{% endautocrossref %}
