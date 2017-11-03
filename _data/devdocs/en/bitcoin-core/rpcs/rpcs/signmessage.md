{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/signmessage.md" %}

##### SignMessage
{% include helpers/subhead-links.md %}

{% assign summary_signMessage="signs a message with the private key of an address." %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet or an
unencrypted wallet.*

The `signmessage` RPC {{summary_signMessage}}

*Parameter #1---the address corresponding to the private key to sign with*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "A P2PKH address whose private key belongs to this wallet"

{% enditemplate %}

*Parameter #2---the message to sign*

{% itemplate ntpd1 %}
- n: "Message"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The message to sign"

{% enditemplate %}

*Result---the message signature*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (base64)"
  p: "Required<br>(exactly 1)"
  d: "The signature of the message, encoded in base64.  Note that Bitcoin Core before 0.10.0 creates signatures with random *k* values, so each time you sign the same message, it will create a different signature"

{% enditemplate %}

*Example from Bitcoin Core 0.13.1*

Sign a the message "Hello, World!" using the following address:

{% highlight bash %}
bitcoin-cli signmessage 17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu "Hello, World!"
{% endhighlight %}

Result:

{% highlight text %}
ILypRih424AWRYXK1goB6mskx99aelWcVCTEKolaW7U4VPnwj6Khf+vJSED7pMtPQd3KnXuqq1JvavrQdPMFFB0=
{% endhighlight %}

*See also*

* [SignMessageWithPrivKey][rpc signmessagewithprivkey]: {{summary_signMessageWithPrivKey}}
* [VerifyMessage][rpc verifymessage]: {{summary_verifyMessage}}

{% endautocrossref %}