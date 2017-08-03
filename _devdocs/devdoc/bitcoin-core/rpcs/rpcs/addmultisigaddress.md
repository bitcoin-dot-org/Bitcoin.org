{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/addmultisigaddress.md" %}

##### AddMultiSigAddress
{% include helpers/subhead-links.md %}

{% assign summary_addMultiSigAddress="adds a P2SH multisig address to the wallet." %}

{% autocrossref %}

*Requires wallet support.*

The `addmultisigaddress` RPC {{summary_addMultiSigAddress}}

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
  d: "A public key against which signatures will be checked.  Alternatively, this may be a P2PKH address belonging to the wallet---the corresponding public key will be substituted.  There must be at least as many keys as specified by the Required parameter, and there may be more keys"

{% enditemplate %}

*Parameter #3---the account name*

{% itemplate ntpd1 %}
- n: "Account"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The account name in which the address should be stored.  Default is the default account, \"\" (an empty string)"

{% enditemplate %}

*Result---a P2SH address printed and stored in the wallet*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The P2SH multisig address.  The address will also be added to the wallet, and outputs paying that address will be tracked by the wallet"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Adding a 2-of-3 P2SH multisig address to the "test account" by mixing
two P2PKH addresses and one full public key:

{% highlight bash %}
bitcoin-cli -testnet addmultisigaddress \
  2 \
  '''
    [
      "mjbLRSidW1MY8oubvs4SMEnHNFXxCcoehQ",
      "02ecd2d250a76d204011de6bc365a56033b9b3a149f679bc17205555d3c2b2854f",
      "mt17cV37fBqZsnMmrHnGCm9pM28R1kQdMG"
    ]
  ''' \
  'test account'
{% endhighlight %}

Result:

{% highlight text %}
2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq
{% endhighlight %}

(New P2SH multisig address also stored in wallet.)

*See also*

* [CreateMultiSig][rpc createmultisig]: {{summary_createMultiSig}}
* [DecodeScript][rpc decodescript]: {{summary_decodeScript}}
* [Pay-To-Script-Hash (P2SH)][/en/glossary/p2sh-address]

{% endautocrossref %}
