---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: devdoc-category
id: developer-reference
title: "Developer Reference - Bitcoin"
breadcrumbs:
  - bitcoin
  - dev docs
  - Reference
header_title: "Bitcoin Developer Reference"
header_description: "Find technical details and API documentation."
---

{% include_absolute _devdocs/en/devdoc/fragment_reviews_needed.html %}

{% comment %}
<input id="glossary_term" class="glossary_term" placeholder="Search the glossary, RPCs, and more">

{% include_relative devdoc/ref_intro.md %}

{% include_relative devdoc/ref_block_chain.md %}

{% include_relative devdoc/ref_transactions.md %}

{% include_relative devdoc/ref_wallets.md %}

{% include_relative devdoc/ref_p2p_networking.md %}

{% include_relative devdoc/bitcoin-core/api-intro.md %}

{% include_relative devdoc/bitcoin-core/rpcs/intro.md %}

{% include_relative devdoc/bitcoin-core/rpcs/quick-reference.md %}

#### RPCs
<!-- no subhead-links here -->

{{WARNING}} the block chain and memory pool can include arbitrary data
which several of the commands below will return in hex format. If you
convert this data to another format in an executable context, it could
be used in an exploit. For example, displaying a pubkey script as
ASCII text in a webpage could add arbitrary Javascript to that page and
create a cross-site scripting (XSS) exploit. To avoid problems, please
treat block chain and memory pool data as an arbitrary input from an
untrusted source.

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/abandontransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/addmultisigaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/addnode.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/addwitnessaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/backupwallet.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/bumpfee.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/clearbanned.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/createmultisig.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/createrawtransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/decoderawtransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/decodescript.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/disconnectnode.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/dumpprivkey.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/dumpwallet.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/encryptwallet.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/estimatefee.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/estimatepriority.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/fundrawtransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/generate.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/generatetoaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getaccountaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getaccount.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getaddednodeinfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getaddressesbyaccount.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getbalance.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getbestblockhash.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getblock.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getblockchaininfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getblockcount.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getblockhash.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getblockheader.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getblocktemplate.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getchaintips.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getconnectioncount.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getdifficulty.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getgenerate.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/gethashespersec.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getinfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getmemoryinfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getmempoolancestors.md %} 

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getmempooldescendants.md %} 

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getmempoolentry.md %} 

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getmempoolinfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getmininginfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getnettotals.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getnetworkhashps.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getnetworkinfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getnewaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getpeerinfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getrawchangeaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getrawmempool.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getrawtransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getreceivedbyaccount.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getreceivedbyaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/gettransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/gettxout.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/gettxoutproof.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/gettxoutsetinfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getunconfirmedbalance.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getwalletinfo.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/getwork.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/help.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/importaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/importmulti.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/importprivkey.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/importprunedfunds.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/importwallet.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/keypoolrefill.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listaccounts.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listaddressgroupings.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listbanned.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listlockunspent.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listreceivedbyaccount.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listreceivedbyaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listsinceblock.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listtransactions.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/listunspent.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/lockunspent.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/move.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/ping.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/preciousblock.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/prioritisetransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/pruneblockchain.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/removeprunedfunds.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/sendfrom.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/sendmany.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/sendrawtransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/sendtoaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/setaccount.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/setban.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/setgenerate.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/setnetworkactive.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/settxfee.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/signmessage.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/signmessagewithprivkey.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/signrawtransaction.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/stop.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/submitblock.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/validateaddress.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/verifychain.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/verifymessage.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/verifytxoutproof.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/walletlock.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/walletpassphrase.md %}

{% include_relative devdoc/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md %}

{% include_relative devdoc/bitcoin-core/rest/intro.md %}

{% include_relative devdoc/bitcoin-core/rest/quick-reference.md %}

#### Requests
<!-- no subhead-links here -->

{{WARNING}} the block chain and memory pool can include arbitrary data
which several of the commands below will return in hex format. If you
convert this data to another format in an executable context, it could
be used in an exploit. For example, displaying a pubkey script as
ASCII text in a webpage could add arbitrary Javascript to that page and
create a cross-site scripting (XSS) exploit. To avoid problems, please
treat block chain and memory pool data as an arbitrary input from an
untrusted source.

{% include_relative devdoc/bitcoin-core/rest/requests/get_block.md %}

{% include_relative devdoc/bitcoin-core/rest/requests/get_block-notxdetails.md %}

{% include_relative devdoc/bitcoin-core/rest/requests/get_chaininfo.md %}

{% include_relative devdoc/bitcoin-core/rest/requests/get_getutxos.md %}

{% include_relative devdoc/bitcoin-core/rest/requests/get_headers.md %}

{% include_relative devdoc/bitcoin-core/rest/requests/get_mempool-contents.md %}

{% include_relative devdoc/bitcoin-core/rest/requests/get_mempool-info.md %}

{% include_relative devdoc/bitcoin-core/rest/requests/get_tx.md %}

</div>
{% endcomment %}
