{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/listreceivedbyaddress.md" %}

##### ListReceivedByAddress
{% include helpers/subhead-links.md %}

{% assign summary_listReceivedByAddress="list balances by receiving address." %}

{% autocrossref %}

The `listreceivedbyaddress` RPC {{summary_listReceivedByAddress}}

*Parameter #1---minconf*

{% itemplate ntpd1 %}
- n: "minconf"
  t: "number (int)"
  p: "Optional<br>Default=1"
  d: "The minimum number of confirmations before payments are included."

{% enditemplate %}

*Parameter #2---include_empty*

{% itemplate ntpd1 %}
- n: "include_empty"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Whether to include addresses that haven't received any payments."

{% enditemplate %}

*Parameter #3---include_watchonly*

{% itemplate ntpd1 %}
- n: "include_watchonly"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Whether to include watch-only addresses (see 'importaddress')."

{% enditemplate %}

*Parameter #4---address_filter*

{% itemplate ntpd1 %}
- n: "address_filter"
  t: "string"
  p: "Optional"
  d: "If present, only return information on this address."

{% enditemplate %}

*Result*

{% endautocrossref %}

    [
      {
        "involvesWatchonly" : true,        (bool) Only returned if imported addresses were involved in transaction
        "address" : "receivingaddress",  (string) The receiving address
        "amount" : x.xxx,                  (numeric) The total amount in BTC received by the address
        "confirmations" : n,               (numeric) The number of confirmations of the most recent transaction included
        "label" : "label",               (string) The label of the receiving address. The default label is "".
        "txids": [
           "txid",                         (string) The ids of transactions received with the address
           ...
        ]
      }
      ,...
    ]

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli listreceivedbyaddress
{% endhighlight %}
{% highlight bash %}
bitcoin-cli listreceivedbyaddress 6 true
{% endhighlight %}

*See also*

* [GetReceivedByAddress][rpc getreceivedbyaddress]: {{summary_getReceivedByAddress}}

{% endautocrossref %}
