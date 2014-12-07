{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/estimatepriority.md" %}

##### EstimatePriority
{% include helpers/subhead-links.md %}

{% autocrossref %}

{% assign summary_estimatePriority="estimates the priority that a transaction needs in order to be included within a certain number of blocks as a free high-priority transaction." %}

*Added in Bitcoin Core 0.10.0.*

The `estimatepriority` RPC {{summary_estimatePriority}}

Transaction priority is relative to a transaction's byte size.

*Parameter #1---how many blocks the transaction may wait before being included as a free high-priority transaction*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Blocks             | number (int)    | Required<br>(exactly 1)     | The maximum number of blocks a transaction should have to wait before it is predicted to be included in a block based purely on its priority

*Result---the priority a transaction needs*

| Name               | Type              | Presence                    | Description
|--------------------|-------------------|-----------------------------|----------------
| `result`           | number (real)     | Required<br>(exactly 1)     | The estimated priority the transaction should have in order to be included within the specified number of blocks.  If the node doesn't have enough information to make an estimate, the value `-1` will be returned

*Examples from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli estimatepriority 6
{% endhighlight %}

Result:

{% highlight json %}
718158904.10958910
{% endhighlight %}

Requesting data the node can't calculate yet:

{% highlight bash %}
bitcoin-cli estimatepriority 100
{% endhighlight %}

Result:

{% highlight json %}
-1.00000000
{% endhighlight %}

*See also*

* [EstimateFee][rpc estimatefee]: {{summary_estimateFee}}

{% endautocrossref %}
