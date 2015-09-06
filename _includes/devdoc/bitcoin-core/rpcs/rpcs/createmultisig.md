{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/createmultisig.md" %}

##### CreateMultiSig
{% include helpers/subhead-links.md %}

{% assign summary_createMultiSig="creates a P2SH multi-signature address." %}

{% autocrossref %}

The `createmultisig` RPC {{summary_createMultiSig}}

*Parameter #1---the number of signatures required*

{% itemplate ntpd1 %}
- n: "Required"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The minimum (*m*) number of signatures required to spend this m-of-n multisig script"

{% enditemplate %}

*Parameter #2---the full public keys, or addresses for known public keys*

{% itemplate ntpd1 %}
- n: "Keys Or Addresses"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of strings with each string being a public key or address"

- n: "→<br>Key Or Address"
  t: "string"
  p: "Required<br>(1 or more)"
  d: "A public key against which signatures will be checked.  If wallet support is enabled, this may be a P2PKH address belonging to the wallet---the corresponding public key will be substituted.  There must be at least as many keys as specified by the Required parameter, and there may be more keys"

{% enditemplate %}

*Result---P2SH address and hex-encoded redeem script*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object describing the multisig address"

- n: "→<br>`address`"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The P2SH address for this multisig redeem script"

- n: "→<br>`redeemScript`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The multisig redeem script encoded as hex"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Creating a 2-of-3 P2SH multisig address by mixing two P2PKH addresses and
one full public key:

{% highlight bash %}
bitcoin-cli -testnet createmultisig 2 '''
  [
    "mjbLRSidW1MY8oubvs4SMEnHNFXxCcoehQ",
    "02ecd2d250a76d204011de6bc365a56033b9b3a149f679bc17205555d3c2b2854f",
    "mt17cV37fBqZsnMmrHnGCm9pM28R1kQdMG"
  ]
'''
{% endhighlight %}

Result:

{%highlight json %}
{
  "address" : "2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq",
  "redeemScript" : "522103ede722780d27b05f0b1169efc90fa15a601a32fc6c3295114500c586831b6aaf2102ecd2d250a76d204011de6bc365a56033b9b3a149f679bc17205555d3c2b2854f21022d609d2f0d359e5bc0e5d0ea20ff9f5d3396cb5b1906aa9c56a0e7b5edc0c5d553ae"
}
{% endhighlight %}

*See also*

* [AddMultiSigAddress][rpc addmultisigaddress]: {{summary_addMultiSigAddress}}
* [DecodeScript][rpc decodescript]: {{summary_decodeScript}}
* [Pay-To-Script-Hash (P2SH)][/en/glossary/p2sh-address]

{% endautocrossref %}
