{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/estimatefee.md" %}

##### EstimateFee
{% include helpers/subhead-links.md %}

{% assign summary_estimateFee="estimates the transaction fee per kilobyte that needs to be paid for a transaction to be included within a certain number of blocks." %}

{% autocrossref %}

The `estimatefee` RPC {{summary_estimateFee}}

*Parameter #1---how many blocks the transaction may wait before being included*

{% itemplate ntpd1 %}
- n: "Blocks"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The maximum number of blocks a transaction should have to wait before it is predicted to be included in a block. Has to be between 2 and 25 blocks"

{% enditemplate %}

*Result---the fee the transaction needs to pay per kilobyte*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The estimated fee the transaction should pay in order to be included within the specified number of blocks.  If the node doesn't have enough information to make an estimate, the value `-1` will be returned"

{% enditemplate %}

*Examples from Bitcoin Core 0.14.1*

{% highlight bash %}
bitcoin-cli estimatefee 6
{% endhighlight %}

Result:

{% highlight json %}
0.00162556
{% endhighlight %}

Requesting data the node can't calculate (out of range):

{% highlight bash %}
bitcoin-cli estimatefee 100
{% endhighlight %}

Result:

{% highlight json %}
-1
{% endhighlight %}

*See also*

* [SetTxFee][rpc settxfee]: {{summary_setTxFee}}

{% endautocrossref %}
