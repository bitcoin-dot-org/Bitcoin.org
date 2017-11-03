{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/sendfrom.md" %}

##### SendFrom
{% include helpers/subhead-links.md %}

{% assign summary_sendFrom="spends an amount from a local account to a bitcoin address." %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet or an
unencrypted wallet.*

The `sendfrom` RPC {{summary_sendFrom}}

{{WARNING}} `sendfrom` will be removed in a later version of Bitcoin
Core.  Use the RPCs listed in the See Also subsection below instead.

*Parameter #1---from account*

{% itemplate ntpd1 %}
- n: "From Account"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The name of the account from which the bitcoins should be spent.  Use an empty string (\"\") for the default account"

{% enditemplate %}

*Parameter #2---to address*

{% itemplate ntpd1 %}
- n: "To Address"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "A P2PKH or P2SH address to which the bitcoins should be sent"

{% enditemplate %}

*Parameter #3---amount to spend*

{% itemplate ntpd1 %}
- n: "Amount"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The amount to spend in bitcoins.  Bitcoin Core will ensure the account has sufficient bitcoins to pay this amount (but the transaction fee paid is not included in the calculation, so an account can spend a total of its balance plus the transaction fee)"

{% enditemplate %}

*Parameter #4---minimum confirmations*

{{INCLUDE_SPEND_CONFIRMATIONS}}

*Parameter #5---a comment*

{% itemplate ntpd1 %}
- n: "Comment"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "A locally-stored (not broadcast) comment assigned to this transaction.  Default is no comment"

{% enditemplate %}

*Parameter #6---a comment about who the payment was sent to*

{% itemplate ntpd1 %}
- n: "Comment To"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "A locally-stored (not broadcast) comment assigned to this transaction.  Meant to be used for describing who the payment was sent to. Default is no comment"

{% enditemplate %}

*Result---a TXID of the sent transaction*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the sent transaction, encoded as hex in RPC byte order"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Spend 0.1 bitcoins from the account "test" to the address indicated below
using only UTXOs with at least six confirmations, giving the
transaction the comment "Example spend" and labeling the spender
"Example.com":


{% highlight bash %}
bitcoin-cli -testnet sendfrom "test" \
            mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe \
            0.1 \
            6 \
            "Example spend" \
            "Example.com"
{% endhighlight %}

Result:

{% highlight text %}
f14ee5368c339644d3037d929bbe1f1544a532f8826c7b7288cb994b0b0ff5d8
{% endhighlight %}

*See also*

* [SendToAddress][rpc sendtoaddress]: {{summary_sendToAddress}}
* [SendMany][rpc sendmany]: {{summary_sendMany}}


{% endautocrossref %}
