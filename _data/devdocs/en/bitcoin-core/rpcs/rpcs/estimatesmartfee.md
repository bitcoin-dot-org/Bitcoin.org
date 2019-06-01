{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/estimatesmartfee.md" %}

##### EstimateSmartFee
{% include helpers/subhead-links.md %}

{% assign summary_estimateSmartFee="estimates the approximate fee per kilobyte needed for a transaction to begin confirmation within conf_target blocks if possible and return the number of blocks for which the estimate is valid." %}

{% autocrossref %}

The `estimatesmartfee` RPC {{summary_estimateSmartFee}}

Uses virtual transaction size as defined
in BIP 141 (witness data is discounted).

*Parameter #1---conf_target*

{% itemplate ntpd1 %}
- n: "conf_target"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "Confirmation target in blocks (1 - 1008)"

{% enditemplate %}

*Parameter #2---estimate_mode*

{% itemplate ntpd1 %}
- n: "estimate_mode"
  t: "string"
  p: "Optional<br>Default=CONSERVATIVE"
  d: "The fee estimate mode.
       Whether to return a more conservative estimate which also satisfies
       a longer history. A conservative estimate potentially returns a
       higher feerate and is more likely to be sufficient for the desired
       target, but is not as responsive to short term drops in the
       prevailing fee market.  Must be one of:
       \"UNSET\"
       \"ECONOMICAL\"
       \"CONSERVATIVE\""

{% enditemplate %}

*Result*

{% endautocrossref %}

    {
      "feerate" : x.x,     (numeric, optional) estimate fee rate in BTC/kB
      "errors": [ str... ] (json array of strings, optional) Errors encountered during processing
      "blocks" : n         (numeric) block number where estimate was found
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli estimatesmartfee 6
{% endhighlight %}

{% endautocrossref %}
