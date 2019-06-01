{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getchaintxstats.md" %}

##### GetChainTxStats
{% include helpers/subhead-links.md %}

{% assign summary_getChainTxStats="compute statistics about the total number and rate of transactions in the chain." %}

{% autocrossref %}

The `getchaintxstats` RPC {{summary_getChainTxStats}}

*Parameter #1---nblocks*

{% itemplate ntpd1 %}
- n: "nblocks"
  t: "number (int)"
  p: "Optional<br>Default=one month"
  d: "Size of the window in number of blocks"

{% enditemplate %}

*Parameter #2---blockhash*

{% itemplate ntpd1 %}
- n: "blockhash"
  t: "string"
  p: "Optional<br>Default=chain tip"
  d: "The hash of the block that ends the window."

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "time": xxxxx,                         (numeric) The timestamp for the final block in the window in UNIX format.
      "txcount": xxxxx,                      (numeric) The total number of transactions in the chain up to that point.
      "window_final_block_hash": "...",      (string) The hash of the final block in the window.
      "window_block_count": xxxxx,           (numeric) Size of the window in number of blocks.
      "window_tx_count": xxxxx,              (numeric) The number of transactions in the window. Only returned if "window_block_count" is > 0.
      "window_interval": xxxxx,              (numeric) The elapsed time in the window in seconds. Only returned if "window_block_count" is > 0.
      "txrate": x.xx,                        (numeric) The average rate of transactions per second in the window. Only returned if "window_interval" is > 0.
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getchaintxstats
{% endhighlight %}

{% endautocrossref %}
