{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxout.md" %}

##### GetTxOut
{% include helpers/subhead-links.md %}

{% assign summary_getTxOut="returns details about an unspent transaction output." %}

{% autocrossref %}

The `gettxout` RPC {{summary_getTxOut}}

*Parameter #1---txid*

{% itemplate ntpd1 %}
- n: "txid"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The transaction id"

{% enditemplate %}

*Parameter #2---n*

{% itemplate ntpd1 %}
- n: "n"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "vout number"

{% enditemplate %}

*Parameter #3---include_mempool*

{% itemplate ntpd1 %}
- n: "include_mempool"
  t: "boolean"
  p: "Optional<br>Default=true"
  d: "Whether to include the mempool. Note that an unspent output that is spent in the mempool won't appear."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "bestblock":  "hash",    (string) The hash of the block at the tip of the chain
      "confirmations" : n,       (numeric) The number of confirmations
      "value" : x.xxx,           (numeric) The transaction value in BTC
      "scriptPubKey" : {         (json object)
         "asm" : "code",       (string)
         "hex" : "hex",        (string)
         "reqSigs" : n,          (numeric) Number of required signatures
         "type" : "pubkeyhash", (string) The type, eg pubkeyhash
         "addresses" : [          (array of string) array of bitcoin addresses
            "address"     (string) bitcoin address
            ,...
         ]
      },
      "coinbase" : true|false   (boolean) Coinbase or not
    }

{% autocrossref %}

*Example*

Get unspent transactions

{% highlight bash %}
bitcoin-cli listunspent
{% endhighlight %}
View the details

{% highlight bash %}
bitcoin-cli gettxout "txid" 1
{% endhighlight %}

*See also*

* [GetRawTransaction][rpc getrawtransaction]: {{summary_getRawTransaction}}
* [GetTransaction][rpc gettransaction]: {{summary_getTransaction}}

{% endautocrossref %}
