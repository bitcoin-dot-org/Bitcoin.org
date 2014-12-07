{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/keypoolrefill.md" %}

##### KeyPoolRefill
{% include helpers/subhead-links.md %}

{% assign summary_keyPoolRefill="fills the cache of unused pre-generated keys (the keypool)." %}

{% autocrossref %}

*Requires wallet support.  Requires an unlocked wallet or an unencrypted
wallet.*

The `keypoolrefill` RPC {{summary_keyPoolRefill}}

*Parameter #1---the new keypool size*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Key Pool Size      | number (int)    | Optional<br>(0 or 1)        | The new size of the keypool; if the number of keys in the keypool is less than this number, new keys will be generated.  Default is `100`.  The value `0` also equals the default.  The value specified is for this call only---the default keypool size is not changed

*Result---`null` on success*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| `result`           | null            | Required<br>(exactly 1)     | If the keypool is successfully filled, JSON `null` will be returned

*Example from Bitcoin Core 0.10.0*

Generate one extra key than the default:

{% highlight bash %}
bitcoin-cli -testnet keypoolrefill 101
{% endhighlight %}

(No result shown: success.)

*See also*

* [GetNewAddress][rpc getnewaddress]: {{summary_getNewAddress}}
* [GetAccountAddress][rpc getaccountaddress]: {{summary_getAccountAddress}}
* [GetWalletInfo][rpc getwalletinfo]: {{summary_getWalletInfo}}

{% endautocrossref %}
