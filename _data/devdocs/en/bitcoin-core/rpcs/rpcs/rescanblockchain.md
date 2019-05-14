{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/rescanblockchain.md" %}

##### RescanBlockChain
{% include helpers/subhead-links.md %}

{% assign summary_rescanBlockChain="rescan the local blockchain for wallet related transactions." %}

{% autocrossref %}

*Added in Bitcoin Core 0.16.0*

The `rescanblockchain` RPC {{summary_rescanBlockChain}}

*Parameter #1---start_height*

{% itemplate ntpd1 %}
- n: "start_height"
  t: "number (int)"
  p: "Optional<br>Default=0"
  d: "block height where the rescan should start"

{% enditemplate %}

*Parameter #2---stop_height*

{% itemplate ntpd1 %}
- n: "stop_height"
  t: "number (int)"
  p: "Optional"
  d: "the last block height that should be scanned. If none is provided it will rescan up to the tip at return time of this call."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "start_height"     (numeric) The block height where the rescan started (the requested height or 0)
      "stop_height"      (numeric) The height of the last rescanned block. May be null in rare cases if there was a reorg and the call didn't scan any blocks because they were already scanned in the background.
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli rescanblockchain 100000 120000
{% endhighlight %}

{% endautocrossref %}
