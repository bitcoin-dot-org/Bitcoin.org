---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: devdoc-category
id: developer-reference
breadcrumbs:
  - bitcoin
  - dev docs
  - dev docs reference
show_fragments: true
show_toc: true
---

{% include_absolute _data/devdocs/{{page.lang}}/references/intro.md _data/devdocs/en/references/intro.md %}

{% include_absolute _data/devdocs/{{page.lang}}/references/block_chain.md _data/devdocs/en/references/block_chain.md %}

{% include_absolute _data/devdocs/{{page.lang}}/references/transactions.md _data/devdocs/en/references/transactions.md %}

{% include_absolute _data/devdocs/{{page.lang}}/references/wallets.md _data/devdocs/en/references/wallets.md %}

{% include_absolute _data/devdocs/{{page.lang}}/references/p2p_networking.md _data/devdocs/en/references/p2p_networking.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/api-intro.md _data/devdocs/en/bitcoin-core/api-intro.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/intro.md _data/devdocs/en/bitcoin-core/rpcs/intro.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/quick-reference.md _data/devdocs/en/bitcoin-core/rpcs/quick-reference.md %}

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

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/abandontransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/abandontransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/addmultisigaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/addmultisigaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/addnode.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/addnode.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/addwitnessaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/addwitnessaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/backupwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/backupwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/bumpfee.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/bumpfee.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/clearbanned.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/clearbanned.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/createmultisig.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/createmultisig.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/createrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/createrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/decoderawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/decoderawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/decodescript.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/decodescript.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/disconnectnode.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/disconnectnode.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/dumpprivkey.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/dumpprivkey.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/dumpwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/dumpwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/encryptwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/encryptwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/estimatefee.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/estimatefee.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/estimatepriority.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/estimatepriority.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/fundrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/fundrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/generate.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/generate.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/generatetoaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/generatetoaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getaccountaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getaccountaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getaccount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getaccount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getaddednodeinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getaddednodeinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getaddressesbyaccount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getaddressesbyaccount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getbalance.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getbalance.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getbestblockhash.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getbestblockhash.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockchaininfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockchaininfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockcount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockcount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockhash.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockhash.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockheader.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockheader.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblocktemplate.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblocktemplate.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getchaintips.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getchaintips.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getconnectioncount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getconnectioncount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getdifficulty.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getdifficulty.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getgenerate.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getgenerate.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gethashespersec.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gethashespersec.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmemoryinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmemoryinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmempoolancestors.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempoolancestors.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmempooldescendants.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempooldescendants.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmempoolentry.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempoolentry.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmempoolinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempoolinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmininginfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmininginfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnettotals.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnettotals.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnetworkhashps.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnetworkhashps.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnetworkinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnetworkinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnewaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnewaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getpeerinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getpeerinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getrawchangeaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getrawchangeaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getrawmempool.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getrawmempool.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getreceivedbyaccount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getreceivedbyaccount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getreceivedbyaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getreceivedbyaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gettransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gettransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gettxout.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxout.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gettxoutproof.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxoutproof.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gettxoutsetinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxoutsetinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getunconfirmedbalance.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getunconfirmedbalance.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getwalletinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getwalletinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getwork.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getwork.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/help.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/help.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importmulti.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importmulti.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importprivkey.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importprivkey.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importprunedfunds.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importprunedfunds.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/keypoolrefill.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/keypoolrefill.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listaccounts.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listaccounts.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listaddressgroupings.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listaddressgroupings.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listbanned.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listbanned.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listlockunspent.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listlockunspent.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listreceivedbyaccount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listreceivedbyaccount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listreceivedbyaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listreceivedbyaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listsinceblock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listsinceblock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listtransactions.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listtransactions.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listunspent.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listunspent.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/lockunspent.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/lockunspent.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/move.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/move.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/ping.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/ping.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/preciousblock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/preciousblock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/prioritisetransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/prioritisetransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/pruneblockchain.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/pruneblockchain.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/removeprunedfunds.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/removeprunedfunds.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/sendfrom.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/sendfrom.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/sendmany.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/sendmany.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/sendrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/sendrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/sendtoaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/sendtoaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/setaccount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/setaccount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/setban.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/setban.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/setgenerate.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/setgenerate.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/setnetworkactive.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/setnetworkactive.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/settxfee.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/settxfee.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/signmessage.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/signmessage.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/signmessagewithprivkey.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/signmessagewithprivkey.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/signrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/signrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/stop.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/stop.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/submitblock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/submitblock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/validateaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/validateaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/verifychain.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/verifychain.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/verifymessage.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/verifymessage.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/verifytxoutproof.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/verifytxoutproof.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/walletlock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/walletlock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/walletpassphrase.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/walletpassphrase.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/intro.md _data/devdocs/en/bitcoin-core/rest/intro.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/quick-reference.md _data/devdocs/en/bitcoin-core/rest/quick-reference.md %}

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

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_block.md _data/devdocs/en/bitcoin-core/rest/requests/get_block.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_block-notxdetails.md _data/devdocs/en/bitcoin-core/rest/requests/get_block-notxdetails.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_chaininfo.md _data/devdocs/en/bitcoin-core/rest/requests/get_chaininfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_getutxos.md _data/devdocs/en/bitcoin-core/rest/requests/get_getutxos.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_headers.md _data/devdocs/en/bitcoin-core/rest/requests/get_headers.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_mempool-contents.md _data/devdocs/en/bitcoin-core/rest/requests/get_mempool-contents.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_mempool-info.md _data/devdocs/en/bitcoin-core/rest/requests/get_mempool-info.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_tx.md _data/devdocs/en/bitcoin-core/rest/requests/get_tx.md %}
