{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/createwallet.md" %}

##### CreateWallet
{% include helpers/subhead-links.md %}

{% assign summary_createWallet="creates and loads a new wallet." %}

{% autocrossref %}

The `createwallet` RPC {{summary_createWallet}}

*Parameter #1---wallet_name*

{% itemplate ntpd1 %}
- n: "wallet_name"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The name for the new wallet. If this is a path, the wallet will be created at the path location."

{% enditemplate %}

*Parameter #2---disable_private_keys*

{% itemplate ntpd1 %}
- n: "disable_private_keys"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Disable the possibility of private keys (only watchonlys are possible in this mode)."

{% enditemplate %}

*Parameter #3---blank*

{% itemplate ntpd1 %}
- n: "blank"
  t: "boolean"
  p: "Optional<br>Default=false"
  d: "Create a blank wallet. A blank wallet has no keys or HD seed. One can be set using sethdseed."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "name" :    <wallet_name>,        (string) The wallet name if created successfully. If the wallet was created using a full path, the wallet_name will be the full path.
      "warning" : <warning>,            (string) Warning message if wallet was not loaded cleanly.
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli createwallet "testwallet"
{% endhighlight %}

{% endautocrossref %}
