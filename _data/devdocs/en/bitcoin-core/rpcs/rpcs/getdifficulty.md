{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getdifficulty.md" %}

##### GetDifficulty
{% include helpers/subhead-links.md %}

{% assign summary_getDifficulty="returns the proof-of-work difficulty as a multiple of the minimum difficulty." %}

{% autocrossref %}

The `getdifficulty` RPC {{summary_getDifficulty}}

*Parameters: none*

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "the proof-of-work difficulty as a multiple of the minimum difficulty."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli getdifficulty
{% endhighlight %}

*See also*

* [GetNetworkHashPs][rpc getnetworkhashps]: {{summary_getNetworkHashPs}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}

{% endautocrossref %}
