{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockstats.md" %}

##### GetBlockStats
{% include helpers/subhead-links.md %}

{% assign summary_getBlockStats="compute per block statistics for a given window." %}

{% autocrossref %}

The `getblockstats` RPC {{summary_getBlockStats}}

All amounts are in satoshis.

It won't work for some heights with pruning.

It won't work without -txindex for utxo_size_inc, *fee or *feerate stats.

*Parameter #1---hash_or_height*

{% itemplate ntpd1 %}
- n: "hash_or_height"
  t: "string or numeric"
  p: "Required<br>(exactly 1)"
  d: "The block hash or height of the target block"

{% enditemplate %}

*Parameter #2---stats*

{% itemplate ntpd1 %}
- n: "stats"
  t: "json array"
  p: "Optional<br>Default=all values"
  d: "Values to plot (see result below)"

{% enditemplate %}

{% endautocrossref %}

    [
      "height",     (string) Selected statistic
      "time",       (string) Selected statistic
      ...
    ]

{% autocrossref %}

*Result*

{% endautocrossref %}

    {                           (json object)
      "avgfee": xxxxx,          (numeric) Average fee in the block
      "avgfeerate": xxxxx,      (numeric) Average feerate (in satoshis per virtual byte)
      "avgtxsize": xxxxx,       (numeric) Average transaction size
      "blockhash": xxxxx,       (string) The block hash (to check for potential reorgs)
      "feerate_percentiles": [  (array of numeric) Feerates at the 10th, 25th, 50th, 75th, and 90th percentile weight unit (in satoshis per virtual byte)
          "10th_percentile_feerate",      (numeric) The 10th percentile feerate
          "25th_percentile_feerate",      (numeric) The 25th percentile feerate
          "50th_percentile_feerate",      (numeric) The 50th percentile feerate
          "75th_percentile_feerate",      (numeric) The 75th percentile feerate
          "90th_percentile_feerate",      (numeric) The 90th percentile feerate
      ],
      "height": xxxxx,          (numeric) The height of the block
      "ins": xxxxx,             (numeric) The number of inputs (excluding coinbase)
      "maxfee": xxxxx,          (numeric) Maximum fee in the block
      "maxfeerate": xxxxx,      (numeric) Maximum feerate (in satoshis per virtual byte)
      "maxtxsize": xxxxx,       (numeric) Maximum transaction size
      "medianfee": xxxxx,       (numeric) Truncated median fee in the block
      "mediantime": xxxxx,      (numeric) The block median time past
      "mediantxsize": xxxxx,    (numeric) Truncated median transaction size
      "minfee": xxxxx,          (numeric) Minimum fee in the block
      "minfeerate": xxxxx,      (numeric) Minimum feerate (in satoshis per virtual byte)
      "mintxsize": xxxxx,       (numeric) Minimum transaction size
      "outs": xxxxx,            (numeric) The number of outputs
      "subsidy": xxxxx,         (numeric) The block subsidy
      "swtotal_size": xxxxx,    (numeric) Total size of all segwit transactions
      "swtotal_weight": xxxxx,  (numeric) Total weight of all segwit transactions divided by segwit scale factor (4)
      "swtxs": xxxxx,           (numeric) The number of segwit transactions
      "time": xxxxx,            (numeric) The block time
      "total_out": xxxxx,       (numeric) Total amount in all outputs (excluding coinbase and thus reward [ie subsidy + totalfee])
      "total_size": xxxxx,      (numeric) Total size of all non-coinbase transactions
      "total_weight": xxxxx,    (numeric) Total weight of all non-coinbase transactions divided by segwit scale factor (4)
      "totalfee": xxxxx,        (numeric) The fee total
      "txs": xxxxx,             (numeric) The number of transactions (excluding coinbase)
      "utxo_increase": xxxxx,   (numeric) The increase/decrease in the number of unspent outputs
      "utxo_size_inc": xxxxx,   (numeric) The increase/decrease in size for the utxo index (not discounting op_return and similar)
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getblockstats 1000 '["minfeerate","avgfeerate"]'
{% endhighlight %}

{% endautocrossref %}
