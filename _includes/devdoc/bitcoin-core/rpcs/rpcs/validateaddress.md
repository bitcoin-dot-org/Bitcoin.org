{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/validateaddress.md" %}

##### ValidateAddress
{% include helpers/subhead-links.md %}

{% assign summary_validateAddress="returns information about the given Bitcoin address." %}

{% autocrossref %}

The `validateaddress` RPC {{summary_validateAddress}}

*Parameter #1---a P2PKH or P2SH address*

{% itemplate ntpd1 %}
- n: "Address"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The P2PKH or P2SH address to validate encoded in base58check format"

{% enditemplate %}

*Result---information about the address*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "Information about the address"

- n: "→<br>`isvalid`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Set to `true` if the address is a valid P2PKH or P2SH address; set to `false` otherwise"

- n: "→<br>`address`"
  t: "string (base58)"
  p: "Optional<br>(0 or 1)"
  d: "If the address is valid, this is the address <!--TODO: figure out in what cases this might be different from the address provided in the parameter -->"

- n: "→<br>`ismine`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` if the address belongs to the wallet; set to false if it does not.  Only returned if wallet support enabled"

- n: "→<br>`iswatchonly`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` if the address is watch-only.  Otherwise set to `false`.  Only returned if address is in the wallet"

- n: "→<br>`isscript`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` if a P2SH address; otherwise set to `false`.  Only returned if the address is in the wallet"

- n: "→<br>`script`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "Only returned for P2SH addresses belonging to this wallet. This is the type of script:<br>• `pubkey` for a P2PK script inside P2SH<br>• `pubkeyhash` for a P2PKH script inside P2SH<br>• `multisig` for a multisig script inside P2SH<br>• `nonstandard` for unknown scripts"

- n: "→<br>`hex`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "Only returned for P2SH addresses belonging to this wallet.  This is the redeem script encoded as hex"

- n: "→<br>`addresses`"
  t: "array"
  p: "Optional<br>(0 or 1)"
  d: "Only returned for P2SH addresses belonging to the wallet.  A P2PKH addresses used in this script, or the computed P2PKH addresses of any pubkeys in this script.  This array will be empty for `nonstandard` script types"

- n: "→ →<br>Address"
  t: "string"
  p: "Optional<br>(0 or more)"
  d: "A P2PKH address"

- n: "→<br>`sigrequired`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "Only returned for multisig P2SH addresses belonging to the wallet.  The number of signatures required by this script"

- n: "→<br>`pubkey`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The public key corresponding to this address.  Only returned if the address is a P2PKH address in the wallet"

- n: "→<br>`iscompressed`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` if a compressed public key or set to `false` if an uncompressed public key.  Only returned if the address is a P2PKH address in the wallet"

- n: "→<br>`account`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The account this address belong to.  May be an empty string for the default account.  Only returned if the address belongs to the wallet"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Validate the following P2PKH address from the wallet:

{% highlight bash %}
bitcoin-cli -testnet validateaddress mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe
{% endhighlight %}

Result:

{% highlight json %}
{
    "isvalid" : true,
    "address" : "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe",
    "ismine" : true,
    "iswatchonly" : false,
    "isscript" : false,
    "pubkey" : "03bacb84c6464a58b3e0a53cc0ba4cb3b82848cd7bed25a7724b3cc75d76c9c1ba",
    "iscompressed" : true,
    "account" : "test label"
}
{% endhighlight %}

Validate the following P2SH multisig address from the wallet:

{% highlight bash %}
bitcoin-cli -testnet validateaddress 2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq
{% endhighlight %}

Result:

{% highlight json %}
{
    "isvalid" : true,
    "address" : "2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq",
    "ismine" : true,
    "iswatchonly" : false,
    "isscript" : true,
    "script" : "multisig",
    "hex" : "522103ede722780d27b05f0b1169efc90fa15a601a32fc6c3295114500c586831b6aaf2102ecd2d250a76d204011de6bc365a56033b9b3a149f679bc17205555d3c2b2854f21022d609d2f0d359e5bc0e5d0ea20ff9f5d3396cb5b1906aa9c56a0e7b5edc0c5d553ae",
    "addresses" : [
        "mjbLRSidW1MY8oubvs4SMEnHNFXxCcoehQ",
        "mo1vzGwCzWqteip29vGWWW6MsEBREuzW94",
        "mt17cV37fBqZsnMmrHnGCm9pM28R1kQdMG"
    ],
    "sigsrequired" : 2,
    "account" : "test account"
}
{% endhighlight %}

*See also*

* [ImportAddress][rpc importaddress]: {{summary_importAddress}}
* [GetNewAddress][rpc getnewaddress]: {{summary_getNewAddress}}

{% endautocrossref %}
