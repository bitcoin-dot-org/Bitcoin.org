{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/listwalletdir.md" %}

##### ListWalletDir
{% include helpers/subhead-links.md %}

{% assign summary_listWalletDir="returns a list of wallets in the wallet directory." %}

{% autocrossref %}

*Added in Bitcoin Core 0.18.0*

The `listwalletdir` RPC {{summary_listWalletDir}}

*Parameters: none*

*Result*

{% endautocrossref %}

    {
      "wallets" : [                (json array of objects)
        {
          "name" : "name"          (string) The wallet name
        }
        ,...
      ]
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli listwalletdir
{% endhighlight %}

{% endautocrossref %}
