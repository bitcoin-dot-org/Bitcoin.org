{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/listlockunspent.md" %}

##### ListLockUnspent
{% include helpers/subhead-links.md %}

{% assign summary_listLockUnspent="returns a list of temporarily unspendable (locked) outputs." %}

{% autocrossref %}

*Requires wallet support.*

The `listlockunspent` RPC {{summary_listLockUnspent}}

*Parameters: none*

*Result---an array of locked outputs*

{{json_table}}

* `result`
* array
* Required (exactly 1)
* An array containing all locked outputs.  May be empty

* →<br>Output
* object
* Optional (1 or more)
* An object describing a particular locked output

* → →<br>`txid`
* string (hex)
* Required (exactly 1)
* The TXID of the transaction containing the locked output, encoded as hex in RPC byte order

* → →<br>`vout`
* number (int)
* Required (exactly 1)
* The output index number (vout) of the locked output within the transaction.  Output index `0` is the first output within the transaction

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
