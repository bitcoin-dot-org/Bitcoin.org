{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getmemoryinfo.md" %}

##### GetMemoryInfo
{% include helpers/subhead-links.md %}

{% assign summary_getMemoryInfo="returns an object containing information about memory usage." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

The `getmemoryinfo` RPC {{summary_getMemoryInfo}}

*Parameter #1---mode*

{% itemplate ntpd1 %}
- n: "mode"
  t: "string"
  p: "Optional<br>Default=\"stats\""
  d: "determines what kind of information is returned.
       - \"stats\" returns general statistics about memory usage in the daemon.
       - \"mallocinfo\" returns an XML string describing low-level heap state (only available if compiled with glibc 2.10+)."

{% enditemplate %}

*Result---(mode "stats")*

{% endautocrossref %}

    {
      "locked": {               (json object) Information about locked memory manager
        "used": xxxxx,          (numeric) Number of bytes used
        "free": xxxxx,          (numeric) Number of bytes available in current arenas
        "total": xxxxxxx,       (numeric) Total number of bytes managed
        "locked": xxxxxx,       (numeric) Amount of bytes that succeeded locking. If this number is smaller than total, locking pages failed at some point and key data could be swapped to disk.
        "chunks_used": xxxxx,   (numeric) Number allocated chunks
        "chunks_free": xxxxx,   (numeric) Number unused chunks
      }
    }

{% autocrossref %}

*Result---(mode "mallocinfo")*

{% endautocrossref %}

    "<malloc version="1">..."

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getmemoryinfo
{% endhighlight %}

*See also*

* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}}

{% endautocrossref %}
