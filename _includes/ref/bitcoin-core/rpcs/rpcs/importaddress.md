{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/importaddress.md" %}

##### ImportAddress
{% include helpers/subhead-links.md %}

{% assign summary_importAddress="adds an address or pubkey script to the wallet without the associated private key, allowing you to watch for transactions affecting that address or pubkey script without being able to spend any of its outputs." %}

{% autocrossref %}

*Requires wallet support.  Added in Bitcoin Core 0.10.0.*

The `importaddress` RPC {{summary_importAddress}}

*Parameter #1---the address or pubkey script to watch*

{{json_table}}

* Address or Script
* string (base58 or hex)
* Required (exactly 1)
* Either a P2PKH or P2SH address encoded in base58check, or a pubkey script encoded as hex

*Parameter #2---The account into which to place the address or pubkey script*

{{json_table}}

* Account
* string
* Optional (0 or 1)
* An account name into which the address should be placed.  Default is the default account, an empty string("")

*Parameter #3---whether to rescan the block chain*

{{json_table}}

* Rescan
* bool
* Optional (0 or 1)
* Set to `true` (the default) to rescan the entire local block database for transactions affecting any address or pubkey script in the wallet (including transaction affecting the newly-added address or pubkey script).  Set to `false` to not rescan the block database (rescanning can be performed at any time by restarting Bitcoin Core with the `-rescan` command-line argument).  Rescanning may take several minutes.  Notes: if the address or pubkey script is already in the wallet, the block database will not be rescanned even if this parameter is set

*Result---`null` on success*

{{json_table}}

* `result`
* null
* Required (exactly 1)
* If the address or pubkey script is added to the wallet (or is already part of the wallet), JSON `null` will be returned

*Example from Bitcoin Core 0.10.0*

Add an address, rescanning the local block database for any transactions
matching it.

{% highlight bash %}
bitcoin-cli -testnet importaddress \
  muhtvdmsnbQEPFuEmxcChX58fGvXaaUoVt "watch-only test" true
{% endhighlight %}

Result:

(No output<!--noref-->; success.)

Show that the address has been added:

{% highlight bash %}
bitcoin-cli -testnet getaccount muhtvdmsnbQEPFuEmxcChX58fGvXaaUoVt
{% endhighlight %}

Result:

{% highlight text %}
watch-only test
{% endhighlight %}

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [ListReceivedByAddress][rpc listreceivedbyaddress]: {{summary_listReceivedByAddress}}

{% endautocrossref %}
