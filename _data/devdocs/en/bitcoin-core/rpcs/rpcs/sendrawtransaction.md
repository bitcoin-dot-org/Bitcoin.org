{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/sendrawtransaction.md" %}

##### SendRawTransaction
{% include helpers/subhead-links.md %}

{% assign summary_sendRawTransaction="submits raw transaction (serialized, hex-encoded) to local node and network." %}

{% autocrossref %}

The `sendrawtransaction` RPC {{summary_sendRawTransaction}}

Also see createrawtransaction and signrawtransactionwithkey calls.

*Parameter #1---hexstring*

{% itemplate ntpd1 %}
- n: "hexstring"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The hex string of the raw transaction"

{% enditemplate %}

*Parameter #2---allowhighfees*

{% itemplate ntpd1 %}
- n: "allowhighfees"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Allow high fees"

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The transaction hash in hex"

{% enditemplate %}

*Example*

Create a transaction

{% highlight bash %}
bitcoin-cli createrawtransaction "[{\"txid\" : \"mytxid\",\"vout\":0}]" "{\"myaddress\":0.01}"
{% endhighlight %}
Sign the transaction, and get back the hex

{% highlight bash %}
bitcoin-cli signrawtransactionwithwallet "myhex"
{% endhighlight %}
Send the transaction (signed hex)

{% highlight bash %}
bitcoin-cli sendrawtransaction "signedhex"
{% endhighlight %}

*See also*

* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [DecodeRawTransaction][rpc decoderawtransaction]: {{summary_decodeRawTransaction}}

{% endautocrossref %}
