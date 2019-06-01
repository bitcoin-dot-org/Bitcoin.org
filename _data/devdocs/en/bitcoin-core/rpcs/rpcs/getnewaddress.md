{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getnewaddress.md" %}

##### GetNewAddress
{% include helpers/subhead-links.md %}

{% assign summary_getNewAddress="returns a new Bitcoin address for receiving payments." %}

{% autocrossref %}

The `getnewaddress` RPC {{summary_getNewAddress}}

If 'label' is specified, it is added to the address book
so payments received with the address will be associated with 'label'.

*Parameter #1---label*

{% itemplate ntpd1 %}
- n: "label"
  t: "string"
  p: "Optional<br>Default=\"\""
  d: "The label name for the address to be linked to. It can also be set to the empty string \"\" to represent the default label. The label does not need to exist, it will be created if there is no label by the given name."

{% enditemplate %}

*Parameter #2---address_type*

{% itemplate ntpd1 %}
- n: "address_type"
  t: "string"
  p: "Optional<br>Default=set by -addresstype"
  d: "The address type to use. Options are \"legacy\", \"p2sh-segwit\", and \"bech32\"."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The new bitcoin address"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli getnewaddress
{% endhighlight %}

*See also*

* [GetRawChangeAddress][rpc getrawchangeaddress]: {{summary_getRawChangeAddress}}
* [GetBalance][rpc getbalance]: {{summary_getBalance}}

{% endautocrossref %}
