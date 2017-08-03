{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rest/quick-reference.md" %}

#### Quick Reference {#rest-quick-reference}
{% include helpers/subhead-links.md %}

{% autocrossref %}

* [GET Block][rest get block] {{summary_restGetBlock}} {{UPDATED0_13_0}}
* [GET Block/NoTxDetails][rest get block-notxdetails] {{summary_restGetBlock-noTxDetails}} {{UPDATED0_13_0}}
* [GET ChainInfo][rest get chaininfo] {{summary_restGetChainInfo}} {{NEW0_11_0}}, {{UPDATED0_12_0}}
* [GET GetUtxos][rest get getutxos] {{summary_restGetGetUtxos}} {{NEW0_11_0}}
* [GET Headers][rest get headers] {{summary_restGetHeaders}} {{NEW0_11_0}}, {{UPDATED0_13_0}}
* [GET MemPool/Contents][rest get mempool-contents] {{summary_restGetMemPool-contents}} {{NEW0_12_0}}
* [GET MemPool/Info][rest get mempool-info] {{summary_restGetMemPool-info}} {{NEW0_12_0}}
* [GET Tx][rest get tx] {{summary_restGetTx}} {{UPDATED0_13_0}}

{% endautocrossref %}
