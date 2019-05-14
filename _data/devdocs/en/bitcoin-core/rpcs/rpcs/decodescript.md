{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/decodescript.md" %}

##### DecodeScript
{% include helpers/subhead-links.md %}

{% assign summary_decodeScript="decode a hex-encoded script." %}

{% autocrossref %}

The `decodescript` RPC {{summary_decodeScript}}

*Parameter #1---hexstring*

{% itemplate ntpd1 %}
- n: "hexstring"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "the hex-encoded script"

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "asm":"asm",   (string) Script public key
      "hex":"hex",   (string) hex-encoded public key
      "type":"type", (string) The output type
      "reqSigs": n,    (numeric) The required signatures
      "addresses": [   (json array of string)
         "address"     (string) bitcoin address
         ,...
      ],
      "p2sh","address" (string) address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH).
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli decodescript "hexstring"
{% endhighlight %}

*See also*

* [CreateMultiSig][rpc createmultisig]: {{summary_createMultiSig}}

{% endautocrossref %}
