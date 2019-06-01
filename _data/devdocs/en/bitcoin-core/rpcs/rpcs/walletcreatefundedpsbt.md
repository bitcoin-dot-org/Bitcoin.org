{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/walletcreatefundedpsbt.md" %}

##### WalletCreatefundedPsbt
{% include helpers/subhead-links.md %}

{% assign summary_walletCreatefundedPsbt="creates and funds a transaction in the Partially Signed Transaction format." %}

{% autocrossref %}

The `walletcreatefundedpsbt` RPC {{summary_walletCreatefundedPsbt}}

Inputs will be added if supplied inputs are not enough
Implements the Creator and Updater roles.

*Parameter #1---inputs*

{% itemplate ntpd1 %}
- n: "inputs"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "A json array of json objects"

{% enditemplate %}

{% endautocrossref %}

    [
      {                              (json object)
        "txid": "hex",               (string, required) The transaction id
        "vout": n,                   (numeric, required) The output number
        "sequence": n,               (numeric, required) The sequence number
      },
      ...
    ]

{% autocrossref %}

*Parameter #2---outputs*

{% itemplate ntpd1 %}
- n: "outputs"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "a json array with outputs (key-value pairs), where none of the keys are duplicated.
       That is, each address can only appear once and there can only be one 'data' object.
       For compatibility reasons, a dictionary, which holds the key-value pairs directly, is also
       accepted as second parameter."

{% enditemplate %}

{% endautocrossref %}

    [
      {                              (json object)
        "address": amount,           (numeric or string, required) A key-value pair. The key (string) is the bitcoin address, the value (float or string) is the amount in BTC
      },
      {                              (json object)
        "data": "hex",               (string, required) A key-value pair. The key must be "data", the value is hex-encoded data
      },
      ...
    ]

{% autocrossref %}

*Parameter #3---locktime*

{% itemplate ntpd1 %}
- n: "locktime"
  t: "number (int)"
  p: "Optional<br>Default=0"
  d: "Raw locktime. Non-0 value also locktime-activates inputs"

{% enditemplate %}

*Parameter #4---options*

{% itemplate ntpd1 %}
- n: "options"
  t: "json object"
  p: "Optional"
  d: "\"replaceable\": bool,           (boolean, optional, default=false) Marks this transaction as BIP125 replaceable.
       Allows this transaction to be replaced by a transaction with higher fees
       \"conf_target\": n,              (numeric, optional, default=Fallback to wallet's confirmation target) Confirmation target (in blocks)
       \"estimate_mode\": \"str\",        (string, optional, default=UNSET) The fee estimate mode, must be one of:
       \"UNSET\"
       \"ECONOMICAL\"
       \"CONSERVATIVE\"
       }"

{% enditemplate %}

{% endautocrossref %}

    {
      "changeAddress": "hex",        (string, optional, default=pool address) The bitcoin address to receive the change
      "changePosition": n,           (numeric, optional, default=random) The index of the change output
      "change_type": "str",          (string, optional, default=set by -changetype) The output type to use. Only valid if changeAddress is not specified. Options are "legacy", "p2sh-segwit", and "bech32".
      "includeWatching": bool,       (boolean, optional, default=false) Also select inputs which are watch only
      "lockUnspents": bool,          (boolean, optional, default=false) Lock selected unspent outputs
      "feeRate": amount,             (numeric or string, optional, default=not set: makes wallet determine the fee) Set a specific fee rate in BTC/kB
      "subtractFeeFromOutputs": [    (json array, optional, default=empty array) A json array of integers.
                                     The fee will be equally deducted from the amount of each specified output.
                                     Those recipients will receive less bitcoins than you enter in their corresponding amount field.
                                     If no outputs are specified here, the sender pays the fee.
        vout_index,                  (numeric) The zero-based output index, before a change output is added.
        ...
      ],

{% autocrossref %}

*Parameter #5---bip32derivs*

{% itemplate ntpd1 %}
- n: "bip32derivs"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "If true, includes the BIP 32 derivation paths for public keys if we know them"

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "psbt": "value",        (string)  The resulting raw transaction (base64-encoded string)
      "fee":       n,         (numeric) Fee in BTC the resulting transaction pays
      "changepos": n          (numeric) The position of the added change output, or -1
    }

{% autocrossref %}

*Example*

Create a transaction with no inputs

{% highlight bash %}
bitcoin-cli walletcreatefundedpsbt "[{\"txid\":\"myid\",\"vout\":0}]" "[{\"data\":\"00010203\"}]"
{% endhighlight %}

{% endautocrossref %}
