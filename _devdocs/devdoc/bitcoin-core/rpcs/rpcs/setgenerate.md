{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/setgenerate.md" %}

##### SetGenerate
{% include helpers/subhead-links.md %}

{% assign summary_setGenerate="was removed in Bitcoin Core 0.13.0." %}

{% autocrossref %}

*Requires wallet support.*

The `setgenerate` RPC {{summary_setGenerate}} If you have an older
version of Bitcoin Core, use `help setgenerate` RPC to get help. For testing, 
the generate call can still be used to mine a block, and the `generatetoaddress` RPC 
call has been added to mine to a specific address. This works with wallet disabled.

*See also*

* [Generate][rpc generate]: {{summary_generate}}
* [GenerateToAddress][rpc generatetoaddress]: {{summary_generateToAddress}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}

{% endautocrossref %}
