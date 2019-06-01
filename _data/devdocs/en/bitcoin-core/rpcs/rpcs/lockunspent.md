{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/lockunspent.md" %}

##### LockUnspent
{% include helpers/subhead-links.md %}

{% assign summary_lockUnspent="updates list of temporarily unspendable outputs." %}

{% autocrossref %}

The `lockunspent` RPC {{summary_lockUnspent}}

Temporarily lock (unlock=false) or unlock (unlock=true) specified transaction outputs.

If no transaction outputs are specified when unlocking then all current locked transaction outputs are unlocked.

A locked transaction output will not be chosen by automatic coin selection, when spending bitcoins.

Locks are stored in memory only. Nodes start with zero locked outputs, and the locked output list
is always cleared (by virtue of process exit) when a node stops or fails.

Also see the listunspent call

*Parameter #1---unlock*

{% itemplate ntpd1 %}
- n: "unlock"
  t: "boolean"
  p: "Required<br>(exactly 1)"
  d: "Whether to unlock (true) or lock (false) the specified transactions"

{% enditemplate %}

*Parameter #2---transactions*

{% itemplate ntpd1 %}
- n: "transactions"
  t: "json array"
  p: "Optional<br>Default=empty array"
  d: "A json array of objects. Each object the txid (string) vout (numeric)."

{% enditemplate %}

{% endautocrossref %}

    [
      {                   (json object)
        "txid": "hex",    (string, required) The transaction id
        "vout": n,        (numeric, required) The output number
      },
      ...
    ]

{% autocrossref %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "boolean"
  p: "Required<br>(exactly 1)"
  d: "Whether the command was successful or not"

{% enditemplate %}

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

* [ListLockUnspent][rpc listlockunspent]: {{summary_listLockUnspent}}
* [ListUnspent][rpc listunspent]: {{summary_listUnspent}}

{% endautocrossref %}
