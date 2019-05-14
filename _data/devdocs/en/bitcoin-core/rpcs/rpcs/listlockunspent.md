{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/listlockunspent.md" %}

##### ListLockUnspent
{% include helpers/subhead-links.md %}

{% assign summary_listLockUnspent="returns list of temporarily unspendable outputs." %}

{% autocrossref %}

The `listlockunspent` RPC {{summary_listLockUnspent}}

See the lockunspent call to lock and unlock transactions for spending.

*Parameters: none*

*Result*

{% endautocrossref %}

    [
      {
        "txid" : "transactionid",     (string) The transaction id locked
        "vout" : n                      (numeric) The vout value
      }
      ,...
    ]

{% autocrossref %}

*Example*

List the unspent transactions

{% highlight bash %}
bitcoin-cli listunspent
{% endhighlight %}
Lock an unspent transaction

{% highlight bash %}
bitcoin-cli lockunspent false "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"
{% endhighlight %}
List the locked transactions

{% highlight bash %}
bitcoin-cli listlockunspent
{% endhighlight %}
Unlock the transaction again

{% highlight bash %}
bitcoin-cli lockunspent true "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"
{% endhighlight %}

*See also*

* [LockUnspent][rpc lockunspent]: {{summary_lockUnspent}}

{% endautocrossref %}
