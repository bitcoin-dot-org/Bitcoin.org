{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/getwork.md" %}

##### GetWork
{% include helpers/subhead-links.md %}

{% assign summary_getWork="was removed in Bitcoin Core 0.10.0." %}

{% autocrossref %}

The `getwork` RPC {{summary_getWork}}. If you have an older
version of Bitcoin Core, use the `help` RPC to get help. For example:
`help getwork`

*See also*

* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}
* [SubmitBlock][rpc submitblock]: {{summary_submitBlock}}
* [SetGenerate][rpc setgenerate]: {{summary_setGenerate}}

{% endautocrossref %}
