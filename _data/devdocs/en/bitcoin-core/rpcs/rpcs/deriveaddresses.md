{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/deriveaddresses.md" %}

##### DeriveAddresses
{% include helpers/subhead-links.md %}

{% assign summary_deriveAddresses="derives one or more addresses corresponding to an output descriptor." %}

{% autocrossref %}

*Added in Bitcoin Core 0.18.0*

The `deriveaddresses` RPC {{summary_deriveAddresses}}

Examples of output descriptors are:

{% endautocrossref %}

    pkh(<pubkey>)                        P2PKH outputs for the given pubkey
    wpkh(<pubkey>)                       Native segwit P2PKH outputs for the given pubkey
    sh(multi(<n>,<pubkey>,<pubkey>,...)) P2SH-multisig outputs for the given threshold and pubkeys
    raw(<hex script>)                    Outputs whose scriptPubKey equals the specified hex scripts

{% autocrossref %}

In the above, <pubkey> either refers to a fixed public key in hexadecimal notation, or to an xpub/xprv optionally followed by one
or more path elements separated by "/", where "h" represents a hardened child key.

For more information on output descriptors, see the documentation in the doc/descriptors.md file.

*Parameter #1---descriptor*

{% itemplate ntpd1 %}
- n: "descriptor"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The descriptor."

{% enditemplate %}

*Parameter #2---range*

{% itemplate ntpd1 %}
- n: "range"
  t: "numeric or array"
  p: "Optional"
  d: "If a ranged descriptor is used, this specifies the end or the range (in [begin,end] notation) to derive."

{% enditemplate %}

*Result*

{% endautocrossref %}

    [ address ] (array) the derived addresses

{% autocrossref %}

*Example*

First three native segwit receive addresses

{% highlight bash %}
bitcoin-cli deriveaddresses "wpkh([d34db33f/84h/0h/0h]xpub6DJ2dNUysrn5Vt36jH2KLBT2i1auw1tTSSomg8PhqNiUtx8QX2SvC9nrHu81fT41fvDUnhMjEzQgXnQjKEu3oaqMSzhSrHMxyyoEAmUHQbY/0/*)#trd0mf0l" "[0,2]"
{% endhighlight %}

{% endautocrossref %}
