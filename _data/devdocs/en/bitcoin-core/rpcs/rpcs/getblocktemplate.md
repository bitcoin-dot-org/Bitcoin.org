{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/getblocktemplate.md" %}

##### GetBlockTemplate
{% include helpers/subhead-links.md %}

{% assign summary_getBlockTemplate="gets a block template or proposal for use with mining software." %}

{% autocrossref %}

The `getblocktemplate` RPC {{summary_getBlockTemplate}} For more
information, please see the following resources:

* [Bitcoin Wiki GetBlockTemplate][wiki getblocktemplate]
* [BIP22][]
* [BIP23][]

*See also*

* [SetGenerate][rpc setgenerate]: {{summary_setGenerate}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [SubmitBlock][rpc submitblock]: {{summary_submitBlock}}
* [PrioritiseTransaction][rpc prioritisetransaction]: {{summary_prioritiseTransaction}}

{% endautocrossref %}
