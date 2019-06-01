{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/sendmany.md" %}

##### SendMany
{% include helpers/subhead-links.md %}

{% assign summary_sendMany="send multiple times." %}

{% autocrossref %}

The `sendmany` RPC {{summary_sendMany}}

Amounts are double-precision floating point numbers.

*Parameter #1---dummy*

{% itemplate ntpd1 %}
- n: "dummy"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "Must be set to \"\" for backwards compatibility."

{% enditemplate %}

*Parameter #2---amounts*

{% itemplate ntpd1 %}
- n: "amounts"
  t: "json object"
  p: "Required<br>(exactly 1)"
  d: "A json object with addresses and amounts"

{% enditemplate %}

{% endautocrossref %}

    {
      "address": amount,    (numeric or string, required) The bitcoin address is the key, the numeric amount (can be string) in BTC is the value
    }

{% autocrossref %}

*Parameter #3---minconf*

{% itemplate ntpd1 %}
- n: "minconf"
  t: "number (int)"
  p: "Optional<br>Default=1"
  d: "Only use the balance confirmed at least this many times."

{% enditemplate %}

*Parameter #4---comment*

{% itemplate ntpd1 %}
- n: "comment"
  t: "string"
  p: "Optional"
  d: "A comment"

{% enditemplate %}

*Parameter #5---subtractfeefrom*

{% itemplate ntpd1 %}
- n: "subtractfeefrom"
  t: "json array"
  p: "Optional"
  d: "A json array with addresses.
       The fee will be equally deducted from the amount of each selected address.
       Those recipients will receive less bitcoins than you enter in their corresponding amount field.
       If no addresses are specified here, the sender pays the fee."

{% enditemplate %}

{% endautocrossref %}

    [
      "address",            (string) Subtract fee from this address
      ...
    ]

{% autocrossref %}

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
  d: "The transaction id for the send. Only 1 transaction is created regardless of "

{% enditemplate %}

*Example*

Send two amounts to two different addresses:

{% highlight bash %}
bitcoin-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}"
{% endhighlight %}
Send two amounts to two different addresses setting the confirmation and comment:

{% highlight bash %}
bitcoin-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}" 6 "testing"
{% endhighlight %}
Send two amounts to two different addresses, subtract fee from amount:

{% highlight bash %}
bitcoin-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}" 1 "" "[\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\",\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\"]"
{% endhighlight %}

*See also*

* [SendToAddress][rpc sendtoaddress]: {{summary_sendToAddress}}

{% endautocrossref %}
