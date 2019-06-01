{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/listbanned.md" %}

##### ListBanned
{% include helpers/subhead-links.md %}

{% assign summary_listBanned="list all banned IPs/Subnets." %}

{% autocrossref %}

*Added in Bitcoin Core 0.12.0*

The `listbanned` RPC {{summary_listBanned}}

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
bitcoin-cli listbanned
{% endhighlight %}

*See also*

* [SetBan][rpc setban]: {{summary_setBan}}
* [ClearBanned][rpc clearbanned]: {{summary_clearBanned}}

{% endautocrossref %}
