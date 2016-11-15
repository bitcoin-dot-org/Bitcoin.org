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

- n: "→<br>`walletversion`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The version number of the wallet"

- n: "→<br>`balance`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The balance of the wallet.  The same as returned by the `getbalance` RPC with default parameters"

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

- n: "→<br>`unlocked_until`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "Only returned if the wallet was encrypted with the `encryptwallet` RPC. A Unix epoch date when the wallet will be locked, or `0` if the wallet is currently locked"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet getwalletinfo
{% endhighlight %}

Result:

{% highlight json %}
{
    "walletversion" : 60000,
    "balance" : 1.45060000,
    "txcount" : 17,
    "keypoololdest" : 1398809500,
    "keypoolsize" : 196,
    "unlocked_until" : 0
}
{% endhighlight %}

*See also*

* [ListTransactions][rpc listtransactions]: {{summary_listTransactions}}

{% endautocrossref %}
