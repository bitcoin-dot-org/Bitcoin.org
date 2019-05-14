{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getrpcinfo.md" %}

##### GetRpcInfo
{% include helpers/subhead-links.md %}

{% assign summary_getRpcInfo="returns details of the RPC server." %}

{% autocrossref %}

*Added in Bitcoin Core 0.18.0*

The `getrpcinfo` RPC {{summary_getRpcInfo}}

*Parameters: none*

*Result*

{% endautocrossref %}

    {
     "active_commands" (array) All active commands
      [
       {               (object) Information about an active command
        "method"       (string)  The name of the RPC command
        "duration"     (numeric)  The running time in microseconds
       },...
      ]
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getrpcinfo
{% endhighlight %}

{% endautocrossref %}
