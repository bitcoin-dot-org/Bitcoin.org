{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/submitblock.md" %}

##### SubmitBlock
{% include helpers/subhead-links.md %}

{% assign summary_submitBlock="attempts to submit new block to network." %}

{% autocrossref %}

The `submitblock` RPC {{summary_submitBlock}}

See https://en.bitcoin.it/wiki/BIP_0022 for full specification.

*Parameter #1---hexdata*

{% itemplate ntpd1 %}
- n: "hexdata"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "the hex-encoded block data to submit"

{% enditemplate %}

*Parameter #2---dummy*

{% itemplate ntpd1 %}
- n: "dummy"
  t: "string"
  p: "Optional<br>Default=ignored"
  d: "dummy value, for compatibility with BIP22. This value is ignored."

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli submitblock "mydata"
{% endhighlight %}

*See also*

* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
