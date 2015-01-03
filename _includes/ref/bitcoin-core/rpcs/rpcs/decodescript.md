{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/decodescript.md" %}

##### DecodeScript
{% include helpers/subhead-links.md %}

{% assign summary_decodeScript="decodes a hex-encoded P2SH redeem script." %}

{% autocrossref %}

The `decodescript` RPC {{summary_decodeScript}}

*Parameter #1---a hex-encoded redeem script*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Redeem Script      | string (hex)    | Required<br>(exactly 1)     | The redeem script to decode as a hex-encoded serialized script
{:.ntpd}

*Result---the decoded script*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| `result`           | object          | Required<br>(exactly 1)     | An object describing the decoded script, or JSON `null` if the script could not be decoded
| →<br>`asm`         | string          | Required<br>(exactly 1)     | The redeem script in decoded form with non-data-pushing op codes listed.  May be empty
| →<br>`type`        | string          | Optional<br>(0 or 1)        | The type of script.  This will be one of the following:<br>• `pubkey` for a P2PK script inside P2SH<br>• `pubkeyhash` for a P2PKH script inside P2SH<br>• `multisig` for a multisig script inside P2SH<br>• `nonstandard` for unknown scripts
| →<br>`reqSigs`     | number (int)    | Optional<br>(0 or 1)        | The number of signatures required; this is always `1` for P2PK or P2PKH within P2SH.  It may be greater than 1 for P2SH multisig.  This value will not be returned for `nonstandard` script types (see the `type` key above)
| →<br>`addresses`   | array           | Optional<br>(0 or 1)        | A P2PKH addresses used in this script, or the computed P2PKH addresses of any pubkeys in this script.  This array will not be returned for `nonstandard` script types
| → →<br>Address     | string          | Required<br>(1 or more)     | A P2PKH address
| →<br>`p2sh`        | string (hex)    | Required<br>(exactly 1)     | The P2SH address of this redeem script
{:.ntpd}

*Example from Bitcoin Core 0.10.0*

A 2-of-3 P2SH multisig pubkey script:

{% highlight bash %}
bitcoin-cli -testnet decodescript 522103ede722780d27b05f0b1169ef\
c90fa15a601a32fc6c3295114500c586831b6aaf2102ecd2d250a76d204011de\
6bc365a56033b9b3a149f679bc17205555d3c2b2854f21022d609d2f0d359e5b\
c0e5d0ea20ff9f5d3396cb5b1906aa9c56a0e7b5edc0c5d553ae
{% endhighlight %}

Result:

{% highlight json %}
{
    "asm" : "2 03ede722780d27b05f0b1169efc90fa15a601a32fc6c3295114500c586831b6aaf 02ecd2d250a76d204011de6bc365a56033b9b3a149f679bc17205555d3c2b2854f 022d609d2f0d359e5bc0e5d0ea20ff9f5d3396cb5b1906aa9c56a0e7b5edc0c5d5 3 OP_CHECKMULTISIG",
    "reqSigs" : 2,
    "type" : "multisig",
    "addresses" : [
        "mjbLRSidW1MY8oubvs4SMEnHNFXxCcoehQ",
        "mo1vzGwCzWqteip29vGWWW6MsEBREuzW94",
        "mt17cV37fBqZsnMmrHnGCm9pM28R1kQdMG"
    ],
    "p2sh" : "2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq"
}
{% endhighlight %}

*See also*

* [CreateMultiSig][rpc createmultisig]: {{summary_createMultiSig}}
* [Pay-To-Script-Hash (P2SH)][P2SH]

{% endautocrossref %}
