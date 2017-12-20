{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getwalletinfo.md" %}

##### GetWalletInfo
{% include helpers/subhead-links.md %}

{% assign summary_getWalletInfo="provides information about the wallet." %}

{% autocrossref %}

*Requires wallet support.*

The `getwalletinfo` RPC {{summary_getWalletInfo}}

*Parameters: none*

*Result---information about the wallet*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object describing the wallet"

- n: "→<br>`walletname`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The filename of the wallet"
  
- n: "→<br>`walletversion`
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The version number of the wallet"

- n: "→<br>`balance`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The balance of the wallet.  The same as returned by the `getbalance` RPC with default parameters"
  
  - n: "→<br>`unconfirmed_balance`
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The unconfirmed balance of the wallet"

- n: "→<br>`txcount`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The total number of transactions in the wallet (both spends and receives)"

- n: "→<br>`keypoololdest`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The date as Unix epoch time when the oldest key in the wallet key pool was created; useful for only scanning blocks created since this date for transactions"

- n: "→<br>`keypoolsize`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of keys in the wallet keypool"
  
- n: "→<br>`paytxfee`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The user set tx-fee. Can be set with settxfee"



{% enditemplate %}

*Example from Bitcoin Core 0.15.99.0*

{% highlight bash %}
bitcoin-cli -testnet getwalletinfo
{% endhighlight %}

Result:

{% highlight json %}
{
  "walletname": "wallet.dat",
  "walletversion": 159900,
  "balance": 5.23425902,
  "unconfirmed_balance": 0.00000000,
  "immature_balance": 0.00000000,
  "txcount": 4,
  "keypoololdest": 1513339537,
  "keypoolsize": 1000,
  "keypoolsize_hd_internal": 999,
  "paytxfee": 0.00000000,
  "hdmasterkeyid": "af8cdd6080b31bea9c04399c6ff4f62d7f003f47"
}
{% endhighlight %}

*See also*

* [ListTransactions][rpc listtransactions]: {{summary_listTransactions}}

{% endautocrossref %}
