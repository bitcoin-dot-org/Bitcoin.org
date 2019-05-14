{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/listwallets.md" %}

##### ListWallets
{% include helpers/subhead-links.md %}

{% assign summary_listWallets="returns a list of currently loaded wallets." %}

{% autocrossref %}

The `listwallets` RPC {{summary_listWallets}}

For full information on the wallet, use "getwalletinfo"

*Parameters: none*

*Result*

{% endautocrossref %}

    [                         (json array of strings)
      "walletname"            (string) the wallet name
       ...
    ]

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli listwallets
{% endhighlight %}

{% endautocrossref %}
