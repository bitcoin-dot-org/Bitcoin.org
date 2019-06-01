{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getdescriptorinfo.md" %}

##### GetDescriptorInfo
{% include helpers/subhead-links.md %}

{% assign summary_getDescriptorInfo="analyses a descriptor." %}

{% autocrossref %}

*Added in Bitcoin Core 0.18.0*

The `getdescriptorinfo` RPC {{summary_getDescriptorInfo}}

*Parameter #1---descriptor*

{% itemplate ntpd1 %}
- n: "descriptor"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The descriptor."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "descriptor" : "desc",         (string) The descriptor in canonical form, without private keys
      "isrange" : true|false,        (boolean) Whether the descriptor is ranged
      "issolvable" : true|false,     (boolean) Whether the descriptor is solvable
      "hasprivatekeys" : true|false, (boolean) Whether the input descriptor contained at least one private key
    }

{% autocrossref %}

*Example*

Analyse a descriptor

{% highlight bash %}
bitcoin-cli getdescriptorinfo "wpkh([d34db33f/84h/0h/0h]0279be667ef9dcbbac55a06295Ce870b07029Bfcdb2dce28d959f2815b16f81798)"
{% endhighlight %}

{% endautocrossref %}
