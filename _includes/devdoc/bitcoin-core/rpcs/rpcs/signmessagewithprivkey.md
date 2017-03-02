{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/signmessagewithprivkey.md" %}

##### SignMessageWithPrivKey
{% include helpers/subhead-links.md %}

{% assign summary_signMessageWithPrivKey="signs a message with a given private key." %}

{% autocrossref %}

*Added in Bitcoin Core 0.13.0*

The `signmessagewithprivkey` RPC {{summary_signMessageWithPrivKey}}

*Parameter #1---the private key to sign with*

{% itemplate ntpd1 %}
- n: "Privat Key"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The private key to sign the message with encoded in base58check using wallet import format (WIF)"

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

Sign a the message "Hello, World!" using the following private key:

{% highlight bash %}
bitcoin-cli signmessagewithprivkey 5HpHagT65TZzG1PH3CSu63k8DbpvD\
8s5ip4nEB3kEsreKamq6aB "Hello, World!"
{% endhighlight %}

Result:

{% highlight text %}
G+ZauMFgQExAJRKZSldbAVEaZo4i0p2AVivbFASo50PkUnynAMDUiNMVdXDlpYMWvatxCmYmLn8C9zygPRn3Y1c=
{% endhighlight %}

*See also*

* [SignMessage][rpc signmessage]: {{summary_signMessage}}
* [VerifyMessage][rpc verifymessage]: {{summary_verifyMessage}}

{% endautocrossref %}