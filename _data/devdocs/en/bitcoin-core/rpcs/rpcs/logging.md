{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/logging.md" %}

##### Logging
{% include helpers/subhead-links.md %}

{% assign summary_logging="gets and sets the logging configuration." %}

{% autocrossref %}

The `logging` RPC {{summary_logging}}

When called without an argument, returns the list of categories with status that are currently being debug logged or not.

When called with arguments, adds or removes categories from debug logging and return the lists above.

The arguments are evaluated in order "include", "exclude".

If an item is both included and excluded, it will thus end up being excluded.

The valid logging categories are: net, tor, mempool, http, bench, zmq, db, rpc, estimatefee, addrman, selectcoins, reindex, cmpctblock, rand, prune, proxy, mempoolrej, libevent, coindb, qt, leveldb
In addition, the following are available as category names with special meanings:

  - "all",  "1" : represent all logging categories.

  - "none", "0" : even if other logging categories are specified, ignore all of them.

*Parameter #1---include*

{% itemplate ntpd1 %}
- n: "include"
  t: "json array"
  p: "Optional"
  d: "A json array of categories to add debug logging"

{% enditemplate %}

{% endautocrossref %}

    [
      "include_category",    (string) the valid logging category
      ...
    ]

{% autocrossref %}

*Parameter #2---exclude*

{% itemplate ntpd1 %}
- n: "exclude"
  t: "json array"
  p: "Optional"
  d: "A json array of categories to remove debug logging"

{% enditemplate %}

{% endautocrossref %}

    [
      "exclude_category",    (string) the valid logging category
      ...
    ]

{% autocrossref %}

*Result*

{% endautocrossref %}

    {                   (json object where keys are the logging categories, and values indicates its status
      "category": true|false,  (bool) if being debug logged or not. false:inactive, true:active
      ...
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli logging "[\"all\"]" "[\"http\"]"
{% endhighlight %}

{% endautocrossref %}
