{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/addmultisigaddress.md" %}

##### AddMultiSigAddress
{% include helpers/subhead-links.md %}

{% assign summary_addMultiSigAddress="adds a P2SH multisig address to the wallet." %}

{% autocrossref %}

*Requires wallet support.*

The `addmultisigaddress` RPC {{summary_addMultiSigAddress}}

Add a nrequired-to-sign multisignature address to the wallet. Requires a new wallet backup.

Each key is a Bitcoin address or hex-encoded public key.

This functionality is only intended for use with non-watchonly addresses.

See `importaddress` for watchonly p2sh address support.

If 'label' is specified, assign address to that label.

*Parameter #1---nrequired*

{% itemplate ntpd1 %}
- n: "nrequired"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of required signatures out of the n keys or addresses."

{% enditemplate %}

*Parameter #2---keys*

{% itemplate ntpd1 %}
- n: "keys"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "A json array of bitcoin addresses or hex-encoded public keys"

{% enditemplate %}

{% endautocrossref %}

    [
      "key",      (string) bitcoin address or hex-encoded public key
      ...
    ]

{% autocrossref %}

*Parameter #3---label*

{% itemplate ntpd1 %}
- n: "label"
  t: "string"
  p: "Optional"
  d: "A label to assign the addresses to."

{% enditemplate %}

*Parameter #4---address_type*

{% itemplate ntpd1 %}
- n: "address_type"
  t: "string"
  p: "Optional<br>Default=set by -addresstype"
  d: "The address type to use. Options are \"legacy\", \"p2sh-segwit\", and \"bech32\"."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "address":"multisigaddress",    (string) The value of the new multisig address.
      "redeemScript":"script"         (string) The string value of the hex-encoded redemption script.
    }

{% autocrossref %}

*Example*

Add a multisig address from 2 addresses

{% highlight bash %}
bitcoin-cli addmultisigaddress 2 "[\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\",\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\"]"
{% endhighlight %}

*See also*

* [CreateMultiSig][rpc createmultisig]: {{summary_createMultiSig}}
* [DecodeScript][rpc decodescript]: {{summary_decodeScript}}
* [Pay-To-Script-Hash (P2SH)][/en/glossary/p2sh-address]

{% endautocrossref %}
