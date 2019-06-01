{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/listlabels.md" %}

##### ListLabels
{% include helpers/subhead-links.md %}

{% assign summary_listLabels="returns the list of all labels, or labels that are assigned to addresses with a specific purpose." %}

{% autocrossref %}

*Added in Bitcoin Core 0.17.0*

The `listlabels` RPC {{summary_listLabels}}

*Parameter #1---purpose*

{% itemplate ntpd1 %}
- n: "purpose"
  t: "string"
  p: "Optional"
  d: "Address purpose to list labels for ('send','receive'). An empty string is the same as not providing this argument."

{% enditemplate %}

*Result*

{% endautocrossref %}

    [               (json array of string)
      "label",      (string) Label name
      ...
    ]

{% autocrossref %}

*Example*

List all labels

{% highlight bash %}
bitcoin-cli listlabels
{% endhighlight %}
List labels that have receiving addresses

{% highlight bash %}
bitcoin-cli listlabels receive
{% endhighlight %}
List labels that have sending addresses

{% highlight bash %}
bitcoin-cli listlabels send
{% endhighlight %}

{% endautocrossref %}
