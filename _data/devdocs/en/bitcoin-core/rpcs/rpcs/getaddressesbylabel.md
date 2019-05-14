{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getaddressesbylabel.md" %}

##### GetAddressesByLabel
{% include helpers/subhead-links.md %}

{% assign summary_getAddressesByLabel="returns the list of addresses assigned the specified label." %}

{% autocrossref %}

*Added in Bitcoin Core 0.17.0*

The `getaddressesbylabel` RPC {{summary_getAddressesByLabel}}

*Parameter #1---label*

{% itemplate ntpd1 %}
- n: "label"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The label."

{% enditemplate %}

*Result*

{% endautocrossref %}

    { (json object with addresses as keys)
      "address": { (json object with information about address)
        "purpose": "string" (string)  Purpose of address ("send" for sending address, "receive" for receiving address)
      },...
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getaddressesbylabel "tabby"
{% endhighlight %}

{% endautocrossref %}
