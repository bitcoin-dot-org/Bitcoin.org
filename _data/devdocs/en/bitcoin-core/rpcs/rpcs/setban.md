{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/setban.md" %}

##### SetBan
{% include helpers/subhead-links.md %}

{% assign summary_setBan="attempts to add or remove an IP/Subnet from the banned list." %}

{% autocrossref %}

*Added in Bitcoin Core 0.12.0*

The `setban` RPC {{summary_setBan}}

*Parameter #1---subnet*

{% itemplate ntpd1 %}
- n: "subnet"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The IP/Subnet (see getpeerinfo for nodes IP) with an optional netmask (default is /32 = single IP)"

{% enditemplate %}

*Parameter #2---command*

{% itemplate ntpd1 %}
- n: "command"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "'add' to add an IP/Subnet to the list, 'remove' to remove an IP/Subnet from the list"

{% enditemplate %}

*Parameter #3---bantime*

{% itemplate ntpd1 %}
- n: "bantime"
  t: "number (int)"
  p: "Optional<br>Default=0"
  d: "time in seconds how long (or until when if [absolute] is set) the IP is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)"

{% enditemplate %}

*Parameter #4---absolute*

{% itemplate ntpd1 %}
- n: "absolute"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "If set, the bantime must be an absolute timestamp in seconds since epoch (Jan 1 1970 GMT)"

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
bitcoin-cli setban "192.168.0.6" "add" 86400
{% endhighlight %}
{% highlight bash %}
bitcoin-cli setban "192.168.0.0/24" "add"
{% endhighlight %}

*See also*

* [ListBanned][rpc listbanned]: {{summary_listBanned}}
* [ClearBanned][rpc clearbanned]: {{summary_clearBanned}}

{% endautocrossref %}
