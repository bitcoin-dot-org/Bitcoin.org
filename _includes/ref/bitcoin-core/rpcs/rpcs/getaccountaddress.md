{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getaccountaddress.md" %}

##### GetAccountAddress
{% include helpers/subhead-links.md %}

{% autocrossref %}

{% assign summary_getAccountAddress="returns the current Bitcoin address for receiving payments to this account. If the account doesn't exist, it creates both the account and a new address for receiving payment.  Once a payment has been received to an address, future calls to this RPC for the same account will return a different address." %}

*Requires wallet support.*

The `getaccountaddress` RPC {{summary_getAccountAddress}}

*Parameter #1---an account name*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Account            | string          | Required<br>(exactly 1)     | The name of an account.  Use an empty string ("") for the default account.  If the account doesn't exist, it will be created

*Result---a bitcoin address*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| `result`           | string (base58) | Required<br>(exactly 1)     | An address, belonging to the account specified, which has not yet received any payments

*Example from Bitcoin Core 0.10.0*

Get an address for the default account:

{% highlight bash %}
bitcoin-cli -testnet getaccountaddress ""
{% endhighlight %}

Result:

{% highlight text %}
msQyFNYHkFUo4PG3puJBbpesvRCyRQax7r
{% endhighlight %}

*See also*

* [GetNewAddress][rpc getnewaddress]: {{summary_getNewAddress}}
* [GetRawChangeAddress][rpc getrawchangeaddress]: {{summary_getRawChangeAddress}}
* [GetAddressesByAccount][rpc getaddressesbyaccount]: {{summary_getAddressesByAccount}}

{% endautocrossref %}
