{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/createmultisig.md" %}

##### CreateMultiSig
{% include helpers/subhead-links.md %}

{% assign summary_createMultiSig="creates a multi-signature address with n signature of m keys required." %}

{% autocrossref %}

The `createmultisig` RPC {{summary_createMultiSig}}

It returns a json object with the address and redeemScript.

*Parameter #1---nrequired*

{% itemplate ntpd1 %}
- n: "nrequired"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of required signatures out of the n keys."

{% enditemplate %}

*Parameter #2---keys*

{% itemplate ntpd1 %}
- n: "keys"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "A json array of hex-encoded public keys."

{% enditemplate %}

{% endautocrossref %}

    [
      "key",      (string) The hex-encoded public key
      ...
    ]

{% autocrossref %}

*Parameter #3---address_type*

{% itemplate ntpd1 %}
- n: "address_type"
  t: "string"
  p: "Optional<br>Default=legacy"
  d: "The address type to use. Options are \"legacy\", \"p2sh-segwit\", and \"bech32\"."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "address":"multisigaddress",  (string) The value of the new multisig address.
      "redeemScript":"script"       (string) The string value of the hex-encoded redemption script.
    }

{% autocrossref %}

*Example*

Create a multisig address from 2 public keys

{% highlight bash %}
bitcoin-cli createmultisig 2 "[\"03789ed0bb717d88f7d321a368d905e7430207ebbd82bd342cf11ae157a7ace5fd\",\"03dbc6764b8884a92e871274b87583e6d5c2a58819473e17e107ef3f6aa5a61626\"]"
{% endhighlight %}

*See also*

* [AddMultiSigAddress][rpc addmultisigaddress]: {{summary_addMultiSigAddress}}
* [DecodeScript][rpc decodescript]: {{summary_decodeScript}}

{% endautocrossref %}
