{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/verifymessage.md" %}

##### VerifyMessage
{% include helpers/subhead-links.md %}

{% assign summary_verifyMessage="verify a signed message." %}

{% autocrossref %}

The `verifymessage` RPC {{summary_verifyMessage}}

*Parameter #1---address*

{% itemplate ntpd1 %}
- n: "address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The bitcoin address to use for the signature."

{% enditemplate %}

*Parameter #2---signature*

{% itemplate ntpd1 %}
- n: "signature"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The signature provided by the signer in base 64 encoding (see signmessage)."

{% enditemplate %}

*Parameter #3---message*

{% itemplate ntpd1 %}
- n: "message"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The message that was signed."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "boolean"
  p: "Required<br>(exactly 1)"
  d: "If the signature is verified or not."

{% enditemplate %}

*Example*

Unlock the wallet for 30 seconds

{% highlight bash %}
bitcoin-cli walletpassphrase "mypassphrase" 30
{% endhighlight %}
Create the signature

{% highlight bash %}
bitcoin-cli signmessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "my message"
{% endhighlight %}
Verify the signature

{% highlight bash %}
bitcoin-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"
{% endhighlight %}

*See also*

* [SignMessage][rpc signmessage]: {{summary_signMessage}}

{% endautocrossref %}
