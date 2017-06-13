{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/sendtoaddress.md" %}

##### SendToAddress
{% include helpers/subhead-links.md %}

{% assign summary_sendToAddress="spends an amount to a given address." %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet or an
unencrypted wallet.*

The `sendtoaddress` RPC {{summary_sendToAddress}}

*Parameter #1---to address*

{% itemplate ntpd1 %}
- n: "To Address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "A P2PKH or P2SH address to which the bitcoins should be sent"

{% enditemplate %}

*Parameter #2---amount to spend*

{% itemplate ntpd1 %}
- n: "Amount"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The amount to spent in bitcoins"

{% enditemplate %}

*Parameter #3---a comment*

{% itemplate ntpd1 %}
- n: "Comment"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "A locally-stored (not broadcast) comment assigned to this transaction.  Default is no comment"

{% enditemplate %}

*Parameter #4---a comment about who the payment was sent to*

{% itemplate ntpd1 %}
- n: "Comment To"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "A locally-stored (not broadcast) comment assigned to this transaction.  Meant to be used for describing who the payment was sent to. Default is no comment"

{% enditemplate %}

*Parameter #5---automatic fee subtraction*

{% itemplate ntpd1 %}
- n: "Subtract Fee From Amount"
  t: "boolean"
  p: "Optional<br>(0 or 1)"
  d: "The fee will be deducted from the amount being sent. The recipient will receive less bitcoins than you enter in the amount field. Default is `false`"
  
{% enditemplate %}

*Result---a TXID of the sent transaction*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the sent transaction, encoded as hex in RPC byte order"
  
{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Spend 0.1 bitcoins to the address below with the comment "sendtoadress
example" and the comment-to "Nemo From Example.com":

{% highlight bash %}
bitcoin-cli -testnet sendtoaddress mmXgiR6KAhZCyQ8ndr2BCfEq1wNG2UnyG6 \
  0.1 "sendtoaddress example" "Nemo From Example.com"
{% endhighlight %}

Result:

{% highlight text %}
a2a2eb18cb051b5fe896a32b1cb20b179d981554b6bd7c5a956e56a0eecb04f0
{% endhighlight %}

*See also*

* [SendFrom][rpc sendfrom]: {{summary_sendFrom}}
* [SendMany][rpc sendmany]: {{summary_sendMany}}
* [Move][rpc move]: {{summary_move}}


{% endautocrossref %}
