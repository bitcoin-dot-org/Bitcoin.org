{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/sethdseed.md" %}

##### SetHdSeed
{% include helpers/subhead-links.md %}

{% assign summary_setHdSeed="set or generate a new HD wallet seed." %}

{% autocrossref %}

The `sethdseed` RPC {{summary_setHdSeed}}

Non-HD wallets will not be upgraded to being a HD wallet. Wallets that are already
HD will have a new HD seed set so that new keys added to the keypool will be derived from this new seed.

Note that you will need to MAKE A NEW BACKUP of your wallet after setting the HD wallet seed.

*Parameter #1---newkeypool*

{% itemplate ntpd1 %}
- n: "newkeypool"
  t: "boolean"
  p: "Optional<br>Default=true"
  d: "Whether to flush old unused addresses, including change addresses, from the keypool and regenerate it.
       If true, the next address from getnewaddress and change address from getrawchangeaddress will be from this new seed.
       If false, addresses (including change addresses if the wallet already had HD Chain Split enabled) from the existing
       keypool will be used until it has been depleted."

{% enditemplate %}

*Parameter #2---seed*

{% itemplate ntpd1 %}
- n: "seed"
  t: "string"
  p: "Optional<br>Default=random seed"
  d: "The WIF private key to use as the new HD seed.
       The seed value can be retrieved using the dumpwallet command. It is the private key marked hdseed=1"

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
bitcoin-cli sethdseed
{% endhighlight %}
{% highlight bash %}
bitcoin-cli sethdseed false
{% endhighlight %}
{% highlight bash %}
bitcoin-cli sethdseed true "wifkey"
{% endhighlight %}

{% endautocrossref %}
