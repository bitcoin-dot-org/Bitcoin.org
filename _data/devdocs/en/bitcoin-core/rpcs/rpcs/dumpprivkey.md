{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/dumpprivkey.md" %}

##### DumpPrivKey
{% include helpers/subhead-links.md %}

{% assign summary_dumpPrivKey="reveals the private key corresponding to 'address'." %}

{% autocrossref %}

The `dumpprivkey` RPC {{summary_dumpPrivKey}}

Then the importprivkey can be used with this output

*Parameter #1---address*

{% itemplate ntpd1 %}
- n: "address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The bitcoin address for the private key"

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The private key"

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli dumpprivkey "myaddress"
{% endhighlight %}
{% highlight bash %}
bitcoin-cli importprivkey "mykey"
{% endhighlight %}

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [DumpWallet][rpc dumpwallet]: {{summary_dumpWallet}}

{% endautocrossref %}
