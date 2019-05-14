{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/listreceivedbylabel.md" %}

##### ListReceivedByLabel
{% include helpers/subhead-links.md %}

{% assign summary_listReceivedByLabel="list received transactions by label." %}

{% autocrossref %}

*Added in Bitcoin Core 0.17.0*

The `listreceivedbylabel` RPC {{summary_listReceivedByLabel}}

*Parameter #1---minconf*

{% itemplate ntpd1 %}
- n: "minconf"
  t: "number (int)"
  p: "Optional<br>Default=1"
  d: "The minimum number of confirmations before payments are included."

{% enditemplate %}

*Parameter #2---include_empty*

{% itemplate ntpd1 %}
- n: "include_empty"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Whether to include labels that haven't received any payments."

{% enditemplate %}

*Parameter #3---include_watchonly*

{% itemplate ntpd1 %}
- n: "include_watchonly"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Whether to include watch-only addresses (see 'importaddress')."

{% enditemplate %}

*Result*

{% endautocrossref %}

    [
      {
        "involvesWatchonly" : true,   (bool) Only returned if imported addresses were involved in transaction
        "amount" : x.xxx,             (numeric) The total amount received by addresses with this label
        "confirmations" : n,          (numeric) The number of confirmations of the most recent transaction included
        "label" : "label"           (string) The label of the receiving address. The default label is "".
      }
      ,...
    ]

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli listreceivedbylabel
{% endhighlight %}
{% highlight bash %}
bitcoin-cli listreceivedbylabel 6 true
{% endhighlight %}

{% endautocrossref %}
