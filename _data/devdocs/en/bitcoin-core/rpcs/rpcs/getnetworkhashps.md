{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getnetworkhashps.md" %}

##### GetNetworkHashPs
{% include helpers/subhead-links.md %}

{% assign summary_getNetworkHashPs="returns the estimated network hashes per second based on the last n blocks." %}

{% autocrossref %}

The `getnetworkhashps` RPC {{summary_getNetworkHashPs}}

Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change.

Pass in [height] to estimate the network speed at the time when a certain block was found.

*Parameter #1---nblocks*

{% itemplate ntpd1 %}
- n: "nblocks"
  t: "number (int)"
  p: "Optional<br>Default=120"
  d: "The number of blocks, or -1 for blocks since last difficulty change."

{% enditemplate %}

*Parameter #2---height*

{% itemplate ntpd1 %}
- n: "height"
  t: "number (int)"
  p: "Optional<br>Default=-1"
  d: "To estimate at the time of the given height."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "Hashes per second estimated"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli getnetworkhashps
{% endhighlight %}

*See also*

* [GetDifficulty][rpc getdifficulty]: {{summary_getDifficulty}}
* [GetBlock][rpc getblock]: {{summary_getBlock}}

{% endautocrossref %}
