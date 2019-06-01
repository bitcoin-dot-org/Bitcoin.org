{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/sendtoaddress.md" %}

##### SendToAddress
{% include helpers/subhead-links.md %}

{% assign summary_sendToAddress="send an amount to a given address." %}

{% autocrossref %}

The `sendtoaddress` RPC {{summary_sendToAddress}}

*Parameter #1---address*

{% itemplate ntpd1 %}
- n: "address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The bitcoin address to send to."

{% enditemplate %}

*Parameter #2---amount*

{% itemplate ntpd1 %}
- n: "amount"
  t: "numeric or string"
  p: "Required<br>(exactly 1)"
  d: "The amount in BTC to send. eg 0.1"

{% enditemplate %}

*Parameter #3---comment*

{% itemplate ntpd1 %}
- n: "comment"
  t: "string"
  p: "Optional"
  d: "A comment used to store what the transaction is for.
       This is not part of the transaction, just kept in your wallet."

{% enditemplate %}

*Parameter #4---comment_to*

{% itemplate ntpd1 %}
- n: "comment_to"
  t: "string"
  p: "Optional"
  d: "A comment to store the name of the person or organization
       to which you're sending the transaction. This is not part of the 
       transaction, just kept in your wallet."

{% enditemplate %}

*Parameter #5---subtractfeefromamount*

{% itemplate ntpd1 %}
- n: "subtractfeefromamount"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "The fee will be deducted from the amount being sent.
       The recipient will receive less bitcoins than you enter in the amount field."

{% enditemplate %}

*Parameter #6---replaceable*

{% itemplate ntpd1 %}
- n: "replaceable"
  t: "boolean"
  p: "Optional<br>Default=fallback to wallet's default"
  d: "Allow this transaction to be replaced by a transaction with higher fees via BIP 125"

{% enditemplate %}

*Parameter #7---conf_target*

{% itemplate ntpd1 %}
- n: "conf_target"
  t: "number (int)"
  p: "Optional<br>Default=fallback to wallet's default"
  d: "Confirmation target (in blocks)"

{% enditemplate %}

*Parameter #8---estimate_mode*

{% itemplate ntpd1 %}
- n: "estimate_mode"
  t: "string"
  p: "Optional<br>Default=UNSET"
  d: "The fee estimate mode, must be one of:
       \"UNSET\"
       \"ECONOMICAL\"
       \"CONSERVATIVE\""

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The transaction id."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1
{% endhighlight %}
{% highlight bash %}
bitcoin-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "donation" "seans outpost"
{% endhighlight %}
{% highlight bash %}
bitcoin-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "" "" true
{% endhighlight %}

*See also*

* [SendMany][rpc sendmany]: {{summary_sendMany}}

{% endautocrossref %}
