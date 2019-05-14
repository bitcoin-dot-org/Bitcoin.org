{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/signmessagewithprivkey.md" %}

##### SignMessageWithPrivKey
{% include helpers/subhead-links.md %}

{% assign summary_signMessageWithPrivKey="sign a message with the private key of an address." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

The `signmessagewithprivkey` RPC {{summary_signMessageWithPrivKey}}

*Parameter #1---privkey*

{% itemplate ntpd1 %}
- n: "privkey"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The private key to sign the message with."

{% enditemplate %}

*Parameter #2---message*

{% itemplate ntpd1 %}
- n: "message"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The message to create a signature of."

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The signature of the message encoded in base 64"

{% enditemplate %}

*Example*

Create the signature

{% highlight bash %}
bitcoin-cli signmessagewithprivkey "privkey" "my message"
{% endhighlight %}
Verify the signature

{% highlight bash %}
bitcoin-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"
{% endhighlight %}

*See also*

* [SignMessage][rpc signmessage]: {{summary_signMessage}}
* [VerifyMessage][rpc verifymessage]: {{summary_verifyMessage}}

{% endautocrossref %}
