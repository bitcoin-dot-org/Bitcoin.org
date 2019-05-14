{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/importpubkey.md" %}

##### ImportPubKey
{% include helpers/subhead-links.md %}

{% assign summary_importPubKey="adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend." %}

{% autocrossref %}

The `importpubkey` RPC {{summary_importPubKey}}

Requires a new wallet backup.

Note: This call can take over an hour to complete if rescan is true, during that time, other rpc calls
may report that the imported pubkey exists but related transactions are still missing, leading to temporarily incorrect/bogus balances and unspent outputs until rescan completes.

*Parameter #1---pubkey*

{% itemplate ntpd1 %}
- n: "pubkey"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The hex-encoded public key"

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

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

Import a public key with rescan

{% highlight bash %}
bitcoin-cli importpubkey "mypubkey"
{% endhighlight %}
Import using a label without rescan

{% highlight bash %}
bitcoin-cli importpubkey "mypubkey" "testing" false
{% endhighlight %}

{% endautocrossref %}
