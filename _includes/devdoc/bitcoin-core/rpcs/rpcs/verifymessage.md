{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/verifymessage.md" %}

##### VerifyMessage
{% include helpers/subhead-links.md %}

{% assign summary_verifyMessage="verifies a signed message." %}

{% autocrossref %}

The `verifymessage` RPC {{summary_verifyMessage}}

*Parameter #1---the address corresponding to the signing key*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The P2PKH address corresponding to the private key which made the signature.  A P2PKH address is a hash of the public key corresponding to the private key which made the signature.  When the ECDSA signature is checked, up to four possible ECDSA public keys will be reconstructed from from the signature; each key will be hashed and compared against the P2PKH address provided to see if any of them match.  If there are no matches, signature validation will fail"

{% enditemplate %}

*Parameter #2---the signature*

{% itemplate ntpd1 %}
- n: "Signature"
  t: "string (base64)"
  p: "Required<br>(exactly 1)"
  d: "The signature created by the signer encoded as base-64 (the format output by the `signmessage` RPC)"

{% enditemplate %}

*Parameter #3---the message*

{% itemplate ntpd1 %}
- n: "Message"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The message exactly as it was signed (e.g. no extra whitespace)"

{% enditemplate %}

*Result: `true`, `false`, or an error*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "bool/null"
  p: "Required<br>(exactly 1)"
  d: "Set to `true` if the message was signed by a key corresponding to the provided P2PKH address; set to `false` if it was not signed by that key; set to JSON `null` if an error occurred"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Check the signature on the message created in the example for
`signmessage`:

{% highlight bash %}
bitcoin-cli -testnet verifymessage \
  mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe \
  IL98ziCmwYi5pL+dqKp4Ux+zCa4hP/xbjHmWh+Mk/lefV/0pWV1p/gQ94jgExSmgH2/+PDcCCrOHAady2IEySSI= \
  'Hello, World!'
{% endhighlight %}

Result:

{% highlight json %}
true
{% endhighlight %}

*See also*

* [SignMessage][rpc signmessage]: {{summary_signMessage}}

{% endautocrossref %}
