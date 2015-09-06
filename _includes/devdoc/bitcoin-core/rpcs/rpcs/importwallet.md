{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/importwallet.md" %}

##### ImportWallet
{% include helpers/subhead-links.md %}

{% assign summary_importWallet="imports private keys from a file in wallet dump file format (see the `dumpwallet` RPC). These keys will be added to the keys currently in the wallet.  This call may need to rescan all or parts of the block chain for transactions affecting the newly-added keys, which may take several minutes." %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet or an
unencrypted wallet.*

The `importwallet` RPC {{summary_importWallet}}

*Parameter #1---the file to import*

{% itemplate ntpd1 %}
- n: "Filename"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The file to import.  The path is relative to Bitcoin Core's working directory"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "If all the keys in the file are added to the wallet (or are already part of the wallet), JSON `null` will be returned"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Import the file shown in the example subsection of the `dumpwallet` RPC.

{% highlight bash %}
bitcoin-cli -testnet importwallet /tmp/dump.txt
{% endhighlight %}

(Success: no result displayed.)

*See also*

* [DumpWallet][rpc dumpwallet]: {{summary_dumpWallet}}
* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}

{% endautocrossref %}
