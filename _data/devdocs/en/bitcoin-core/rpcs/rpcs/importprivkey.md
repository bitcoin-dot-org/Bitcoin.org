{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/importprivkey.md" %}

##### ImportPrivKey
{% include helpers/subhead-links.md %}

{% assign summary_importPrivKey="adds a private key (as returned by dumpprivkey) to your wallet." %}

{% autocrossref %}

The `importprivkey` RPC {{summary_importPrivKey}}

Requires a new wallet backup.

Hint: use importmulti to import more than one private key.

Note: This call can take over an hour to complete if rescan is true, during that time, other rpc calls
may report that the imported key exists but related transactions are still missing, leading to temporarily incorrect/bogus balances and unspent outputs until rescan completes.

*Parameter #1---privkey*

{% itemplate ntpd1 %}
- n: "privkey"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The private key (see dumpprivkey)"

{% enditemplate %}

*Parameter #2---label*

{% itemplate ntpd1 %}
- n: "label"
  t: "string"
  p: "Optional"
  d: "An optional label"

{% enditemplate %}

*Parameter #3---rescan*

{% itemplate ntpd1 %}
- n: "rescan"
  t: "boolean"
  p: "Optional<br>Default=true"
  d: "Rescan the wallet for transactions"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Dump a private key

{% highlight bash %}
bitcoin-cli dumpprivkey "myaddress"
{% endhighlight %}
Import the private key with rescan

{% highlight bash %}
bitcoin-cli importprivkey "mykey"
{% endhighlight %}
Import using a label and without rescan

{% highlight bash %}
bitcoin-cli importprivkey "mykey" "testing" false
{% endhighlight %}
Import using default blank label and without rescan

{% highlight bash %}
bitcoin-cli importprivkey "mykey" "" false
{% endhighlight %}

*See also*

* [DumpPrivKey][rpc dumpprivkey]: {{summary_dumpPrivKey}}
* [ImportAddress][rpc importaddress]: {{summary_importAddress}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}

{% endautocrossref %}
