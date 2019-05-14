{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/importaddress.md" %}

##### ImportAddress
{% include helpers/subhead-links.md %}

{% assign summary_importAddress="adds an address or script (in hex) that can be watched as if it were in your wallet but cannot be used to spend." %}

{% autocrossref %}

The `importaddress` RPC {{summary_importAddress}}

Requires a new wallet backup.

Note: This call can take over an hour to complete if rescan is true, during that time, other rpc calls
may report that the imported address exists but related transactions are still missing, leading to temporarily incorrect/bogus balances and unspent outputs until rescan completes.

If you have the full public key, you should call importpubkey instead of this.

Note: If you import a non-standard raw script in hex form, outputs sending to it will be treated
as change, and not show up in many RPCs.

*Parameter #1---address*

{% itemplate ntpd1 %}
- n: "address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The Bitcoin address (or hex-encoded script)"

{% enditemplate %}

*Parameter #2---label*

{% itemplate ntpd1 %}
- n: "label"
  t: "string"
  p: "Optional<br>Default=\"\""
  d: "An optional label"

{% enditemplate %}

*Parameter #3---rescan*

{% itemplate ntpd1 %}
- n: "rescan"
  t: "boolean"
  p: "Optional<br>Default=true"
  d: "Rescan the wallet for transactions"

{% enditemplate %}

*Parameter #4---p2sh*

{% itemplate ntpd1 %}
- n: "p2sh"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Add the P2SH version of the script as well"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Import an address with rescan

{% highlight bash %}
bitcoin-cli importaddress "myaddress"
{% endhighlight %}
Import using a label without rescan

{% highlight bash %}
bitcoin-cli importaddress "myaddress" "testing" false
{% endhighlight %}

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [ListReceivedByAddress][rpc listreceivedbyaddress]: {{summary_listReceivedByAddress}}

{% endautocrossref %}
