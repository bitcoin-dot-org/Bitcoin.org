{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/loadwallet.md" %}

##### LoadWallet
{% include helpers/subhead-links.md %}

{% assign summary_loadWallet="loads a wallet from a wallet file or directory." %}

{% autocrossref %}

The `loadwallet` RPC {{summary_loadWallet}}

Note that all wallet command-line options used when starting bitcoind will be
applied to the new wallet (eg -zapwallettxes, upgradewallet, rescan, etc).

*Parameter #1---filename*

{% itemplate ntpd1 %}
- n: "filename"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The wallet directory or .dat file."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "name" :    <wallet_name>,        (string) The wallet name if loaded successfully.
      "warning" : <warning>,            (string) Warning message if wallet was not loaded cleanly.
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli loadwallet "test.dat"
{% endhighlight %}

{% endautocrossref %}
