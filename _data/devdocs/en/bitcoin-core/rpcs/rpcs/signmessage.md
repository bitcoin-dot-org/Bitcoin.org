{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/signmessage.md" %}

##### SignMessage
{% include helpers/subhead-links.md %}

{% assign summary_signMessage="sign a message with the private key of an address." %}

{% autocrossref %}

The `signmessage` RPC {{summary_signMessage}}

*Parameter #1---address*

{% itemplate ntpd1 %}
- n: "address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The bitcoin address to use for the private key."

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

* [SignMessageWithPrivKey][rpc signmessagewithprivkey]: {{summary_signMessageWithPrivKey}}
* [VerifyMessage][rpc verifymessage]: {{summary_verifyMessage}}

{% endautocrossref %}
