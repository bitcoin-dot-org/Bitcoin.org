{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/importprivkey.md" %}

##### ImportPrivKey
{% include helpers/subhead-links.md %}

{% assign summary_importPrivKey="adds a private key to your wallet. The key should be formatted in the wallet import format created by the `dumpprivkey` RPC." %}

{% autocrossref %}

*Requires wallet support.  Wallet must be unlocked.*

The `importprivkey` RPC {{summary_importPrivKey}}

*Parameter #1---the private key to import*

{% itemplate ntpd1 %}
- n: "Private Key"
  t: "string (base58)"
  p: "Required<br>(exactly 1)"
  d: "The private key to import into the wallet encoded in base58check using wallet import format (WIF)"

{% enditemplate %}

*Parameter #2---the account into which the key should be placed*

{% itemplate ntpd1 %}
- n: "Account"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The name of an account to which transactions involving the key should be assigned.  The default is the default account, an empty string (\"\")"

{% enditemplate %}

*Parameter #3---whether to rescan the block chain*

{% itemplate ntpd1 %}
- n: "Rescan"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` (the default) to rescan the entire local block database for transactions affecting any address or pubkey script in the wallet (including transaction affecting the newly-added address for this private key).  Set to `false` to not rescan the block database (rescanning can be performed at any time by restarting Bitcoin Core with the `-rescan` command-line argument).  Rescanning may take several minutes.  Notes: if the address for this key is already in the wallet, the block database will not be rescanned even if this parameter is set"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "If the private key is added to the wallet (or is already part of the wallet), JSON `null` will be returned"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Import the private key for the address
mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe, giving it a label and scanning the
entire block chain:

{% highlight bash %}
bitcoin-cli -testnet importprivkey \
              cU8Q2jGeX3GNKNa5etiC8mgEgFSeVUTRQfWE2ZCzszyqYNK4Mepy \
              "test label" \
              true
{% endhighlight %}

(Success: no result displayed.)

*See also*

* [DumpPrivKey][rpc dumpprivkey]: {{summary_dumpPrivKey}}
* [ImportAddress][rpc importaddress]: {{summary_importAddress}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}

{% endautocrossref %}
