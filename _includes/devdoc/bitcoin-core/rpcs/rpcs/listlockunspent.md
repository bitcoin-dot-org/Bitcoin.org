{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/listlockunspent.md" %}

##### ListLockUnspent
{% include helpers/subhead-links.md %}

{% assign summary_listLockUnspent="returns a list of temporarily unspendable (locked) outputs." %}

{% autocrossref %}

*Requires wallet support.*

The `listlockunspent` RPC {{summary_listLockUnspent}}

*Parameters: none*

*Result---an array of locked outputs*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array containing all locked outputs.  May be empty"

- n: "→<br>Output"
  t: "object"
  p: "Optional<br>(1 or more)"
  d: "An object describing a particular locked output"

- n: "→ →<br>`txid`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the transaction containing the locked output, encoded as hex in RPC byte order"

- n: "→ →<br>`vout`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The output index number (vout) of the locked output within the transaction.  Output index `0` is the first output within the transaction"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet listlockunspent
{% endhighlight %}

Result:

{% highlight json %}
[
    {
        "txid" : "ca7cb6a5ffcc2f21036879493db4530c0ce9b5bff9648f9a3be46e2dfc8e0166",
        "vout" : 0
    }
]
{% endhighlight %}

*See also*

* [LockUnspent][rpc lockunspent]: {{summary_lockUnspent}}

{% endautocrossref %}
