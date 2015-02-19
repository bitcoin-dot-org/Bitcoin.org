{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

### Types

<!-- TK:TODO
  * Need test in Makefile to error on unset {{variables}}
  * Maybe move each type to a separate file and put in
    alphabetical order
  * Type variable assignments need to be in vars.md so we can also use
    them earlier in the docs
  * Need to update RPC introduction to describe changing "Presence"
    field name to "#"
  * Maybe give the type column a min-width so nearby tables with
    different width columns don't look so ugly
  * Maybe put "#" column before "Type" column
  * Add autocrossref

-->

{{WARNING}} This type reference is not normative. JSON only supports six
(TK:check) types, and any additional type-like restrictions Bitcoin Core
currently provides should not be relied upon.

#### M (Of-N In P2SH Multisig) {#t_m_p2sh_msig}

{% assign t_m_p2sh_msig="[m (P2SH multisig)][t_m_p2sh_msig]" %}

*JSON numeric:* An integer enumerating the *minimum* (m) number of
signatures required to spend a multisignature script. Minimum value 1
(TK:check, although 0 would be silly). Maximum value for a valid script
is 20 (TK:check), but only up to 15 compressed pubkeys (7 uncompressed)
will fit in a max-sized 520-byte P2SH multisig script.

#### JSON Array {#t_array}

{% assign t_array="[array][t_array]" %}

*JSON array:* A JSON array.  See JSON specification (TK:link).

#### Public Key {#t_pubkey}

{% assign t_pubkey="[pubkey][t_pubkey]" %}

*JSON string:* An ECDSA 33-byte compressed public key or 65-byte
uncompressed public key encoded as hexadecimal. Example
(compressed pubkey):

{% highlight text %}
02032ef18b83b9a0487452cc6ea288428c29c138cc76e48db6fe6034a981ed7051
{% endhighlight %}

#### P2PKH Address {#t_p2pkh_address}

{% assign t_p2pkh_address="[P2PKH address][t_p2pkh_address]" %}

*JSON string:* A base58check string encoding a version byte and the HASH160 of a
compressed or uncompressed public key in internal byte order. See
the address conversion section (TK:link) for details.  Example
(testnet):

{% highlight text %}
n1AR3hM31xh2rjmhRi1z5Qj2hy5oQMgRXR
{% endhighlight %}

Note: the version byte must be verified as appropriate for the network.
The version byte is 0x00 on mainnet, and is 0x6f on testnet and regtest.

#### Account {#t_account}

{% assign t_account="[account][t_account]" %}

{{WARNING}} The account system, which includes this type, is deprecated
and will be removed in a future Bitcoin Core release.

*JSON string:* A unicode (TK:check) string naming an account. An empty
string ("") has special meaning as the default account. An ASCII
asterisk ("*") has special meaning in some listing contexts as "display
values from all accounts". Maximum string length is TK:research.

#### P2SH Address {#t_p2sh_address}

{% assign t_p2sh_address="[P2SH address][t_p2sh_address]" %}

*JSON string:* A base58check string encoding a version byte and the
HASH160 of a serialized script (up to 520 bytes). See the address
conversion section (TK:link) for details. Example (testnet):

{% highlight text %}
2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq
{% endhighlight %}

Note: the version byte must be verified as appropriate for the network.
The version byte is 0x05 on mainnet, and is 0xc4 on testnet and regtest.
