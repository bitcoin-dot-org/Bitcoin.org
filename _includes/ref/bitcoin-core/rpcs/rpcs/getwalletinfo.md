{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getwalletinfo.md" %}

##### GetWalletInfo
{% include helpers/subhead-links.md %}

{% assign summary_getWalletInfo="provides information about the wallet." %}

{% autocrossref %}

*Requires wallet support.  Added in Bitcoin Core 0.9.2.*

The `getwalletinfo` RPC {{summary_getWalletInfo}}

*Parameters: none*

*Result---information about the wallet*

| Name                  | Type              | Presence                    | Description
|-----------------------|-------------------|-----------------------------|----------------
| `result`              | object            | Required<br>(exactly 1)     | An object describing the wallet
| →<br>`walletversion`  | number (int)      | Required<br>(exactly 1)     | The version number of the wallet
| →<br>`balance`        | number (bitcoins) | Required<br>(exactly 1)     | The balance of the wallet.  The same as returned by the `getbalance` RPC with default parameters
| →<br>`txcount`        | number (int)      | Required<br>(exactly 1)     | The total number of transactions in the wallet (both spends and receives)
| →<br>`keypoololdest`  | number (int)      | Required<br>(exactly 1)     | The date as Unix epoch time when the oldest key in the wallet key pool was created; useful for only scanning blocks created since this date for transactions
| →<br>`keypoolsize`    | number (int)      | Required<br>(exactly 1)     | The number of keys in the wallet keypool
| →<br>`unlocked_until` | number (int)      | Optional<br>(0 or 1)        | Only returned if the wallet was encrypted with the `encryptwallet` RPC. A Unix epoch date when the wallet will be locked, or `0` if the wallet is currently locked
{:.ntpd}

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
