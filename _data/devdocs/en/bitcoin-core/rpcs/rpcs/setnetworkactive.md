{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/setnetworkactive.md" %}

##### SetNetworkActive
{% include helpers/subhead-links.md %}

{% assign summary_setNetworkActive="disable/enable all p2p network activity." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

The `setnetworkactive` RPC {{summary_setNetworkActive}}

*Parameter #1---state*

{% itemplate ntpd1 %}
- n: "state"
  t: "boolean"
  p: "Required<br>(exactly 1)"
  d: "true to enable networking, false to disable"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*See also*

* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}

{% endautocrossref %}
