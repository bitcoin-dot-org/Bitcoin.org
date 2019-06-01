{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/testmempoolaccept.md" %}

##### TestmemPoolAccept
{% include helpers/subhead-links.md %}

{% assign summary_testmemPoolAccept="returns result of mempool acceptance tests indicating if raw transaction (serialized, hex-encoded) would be accepted by mempool." %}

{% autocrossref %}

The `testmempoolaccept` RPC {{summary_testmemPoolAccept}}

This checks if the transaction violates the consensus or policy rules.

See sendrawtransaction call.

*Parameter #1---rawtxs*

{% itemplate ntpd1 %}
- n: "rawtxs"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "An array of hex strings of raw transactions.
       Length must be one for now."

{% enditemplate %}

{% endautocrossref %}

    [
      "rawtx",     (string)
      ...
    ]

{% autocrossref %}

*Parameter #2---allowhighfees*

{% itemplate ntpd1 %}
- n: "allowhighfees"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Allow high fees"

{% enditemplate %}

*Result*

{% endautocrossref %}

    [                   (array) The result of the mempool acceptance test for each raw transaction in the input array.
                                Length is exactly one for now.
     {
      "txid"           (string) The transaction hash in hex
      "allowed"        (boolean) If the mempool allows this tx to be inserted
      "reject-reason"  (string) Rejection string (only present when 'allowed' is false)
     }
    ]

{% autocrossref %}

*Example*

Create a transaction

{% highlight bash %}
bitcoin-cli createrawtransaction "[{\"txid\" : \"mytxid\",\"vout\":0}]" "{\"myaddress\":0.01}"
{% endhighlight %}
Sign the transaction, and get back the hex

{% highlight bash %}
bitcoin-cli signrawtransactionwithwallet "myhex"
{% endhighlight %}
Test acceptance of the transaction (signed hex)

{% highlight bash %}
bitcoin-cli testmempoolaccept ["signedhex"]
{% endhighlight %}

{% endautocrossref %}
