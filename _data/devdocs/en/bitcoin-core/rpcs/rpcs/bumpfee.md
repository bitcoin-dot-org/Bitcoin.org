{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/bumpfee.md" %}

##### BumpFee
{% include helpers/subhead-links.md %}

{% assign summary_bumpFee="bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

The `bumpfee` RPC {{summary_bumpFee}}

An opt-in RBF transaction with the given txid must be in the wallet.

The command will pay the additional fee by decreasing (or perhaps removing) its change output.

If the change output is not big enough to cover the increased fee, the command will currently fail
instead of adding new inputs to compensate. (A future implementation could improve this.)
The command will fail if the wallet or mempool contains a transaction that spends one of T's outputs.

By default, the new fee will be calculated automatically using estimatesmartfee.

The user can specify a confirmation target for estimatesmartfee.

Alternatively, the user can specify totalFee, or use RPC settxfee to set a higher fee rate.

At a minimum, the new fee rate must be high enough to pay an additional new relay fee (incrementalfee
returned by getnetworkinfo) to enter the node's mempool.

*Parameter #1---txid*

{% itemplate ntpd1 %}
- n: "txid"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The txid to be bumped"

{% enditemplate %}

*Parameter #2---options*

{% itemplate ntpd1 %}
- n: "options"
  t: "json object"
  p: "Optional"
  d: ""

{% enditemplate %}

{% endautocrossref %}

    {
      "confTarget": n,           (numeric, optional, default=fallback to wallet's default) Confirmation target (in blocks)
      "totalFee": n,             (numeric, optional, default=fallback to 'confTarget') Total fee (NOT feerate) to pay, in satoshis.
                                 In rare cases, the actual fee paid might be slightly higher than the specified
                                 totalFee if the tx change output has to be removed because it is too close to
                                 the dust threshold.
      "replaceable": bool,       (boolean, optional, default=true) Whether the new transaction should still be
                                 marked bip-125 replaceable. If true, the sequence numbers in the transaction will
                                 be left unchanged from the original. If false, any input sequence numbers in the
                                 original transaction that were less than 0xfffffffe will be increased to 0xfffffffe
                                 so the new transaction will not be explicitly bip-125 replaceable (though it may
                                 still be replaceable in practice, for example if it has unconfirmed ancestors which
                                 are replaceable).
      "estimate_mode": "str",    (string, optional, default=UNSET) The fee estimate mode, must be one of:
                                 "UNSET"
                                 "ECONOMICAL"
                                 "CONSERVATIVE"
    }

{% autocrossref %}

*Result*

{% endautocrossref %}

    {
      "txid":    "value",   (string)  The id of the new transaction
      "origfee":  n,         (numeric) Fee of the replaced transaction
      "fee":      n,         (numeric) Fee of the new transaction
      "errors":  [ str... ] (json array of strings) Errors encountered during processing (may be empty)
    }

{% autocrossref %}

*Example*

Bump the fee, get the new transaction's txid

{% highlight bash %}
bitcoin-cli bumpfee <txid>
{% endhighlight %}

*See also*

* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [FundRawTransaction][rpc fundrawtransaction]: {{summary_fundRawTransaction}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}

{% endautocrossref %}
