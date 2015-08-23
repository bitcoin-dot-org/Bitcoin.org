{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/quick-ref.md" %}

#### Quick Reference {#rpc-quick-reference}
{% include helpers/subhead-links.md %}

{% comment %}
Styling notes: use highly-visible style for upcoming changes (not yet
released) and changes made in the last 6 months.  Use less-visible
style for changes made up to two years ago.  Don't point out
changes made more than two years ago.

Use v0.n.n in abbreviation title to prevent autocrossrefing.
{% endcomment %}

<!-- master -->
{% assign NEW_MASTER='**<abbr title="New in Bitcoin Core’s master branch (unreleased)">New in master</abbr>**' %}
{% assign UPDATED_MASTER='**<abbr title="Updated in Bitcoin Core’s master branch (unreleased)">Updated in master</abbr>**' %}

<!-- Bitcoin Core 0.10.0 expected January 2015 -->
{% assign DEPRECATED='**<abbr title="Deprecated; will be removed in a future version of Bitcoin Core">Deprecated</abbr>**' %}
{% assign NEW0_10_0='**<abbr title="New in Bitcoin Core v0.10.0">New in 0.10.0</abbr>**' %}
{% assign NEW0_11_0='**<abbr title="New in Bitcoin Core v0.11.0">New in 0.11.0</abbr>**' %}
{% assign UPDATED0_10_0='**<abbr title="Updated in Bitcoin Core v0.10.0">Updated in 0.10.0</abbr>**' %}

<!-- Bitcoin Core 0.9.2 June 2014 -->
{% assign NEW0_9_2='*<abbr title="New in Bitcoin Core v0.9.2">New in 0.9.2</abbr>*' %}

<!-- Bitcoin Core 0.9.0 March 2014 -->
{% assign NEW0_9_0='*<abbr title="New in Bitcoin Core v0.9.0">New in 0.9.0</abbr>*' %}

<!-- the summaries used below are defined in the files for the
     particular RPC and aggregated into this helper file by the makefile
     function manual-update-summaries-file. For example, to edit the
     summary for GetBestBlockHash, edit
     _includes/rpc/getbestblockhash.md and run `make manual-update-summaries`. -->
{% include helpers/summaries.md %}

#### Block Chain RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [GetBestBlockHash][rpc getbestblockhash]: {{summary_getBestBlockHash}} {{NEW0_9_0}}
* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}} {{NEW0_9_2}}, {{UPDATED0_10_0}}
* [GetBlockCount][rpc getblockcount]: {{summary_getBlockCount}}
* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}
* [GetChainTips][rpc getchaintips]: {{summary_getChainTips}} {{NEW0_10_0}}
* [GetDifficulty][rpc getdifficulty]: {{summary_getDifficultly}}
* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}} {{NEW0_10_0}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetTxOut][rpc gettxout]: {{summary_getTxOut}}
* [GetTxOutProof][rpc gettxoutproof]: {{summary_getTxOutProof}} {{NEW0_11_0}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}
* [VerifyChain][rpc verifychain]: {{summary_verifyChain}}
* [VerifyTxOutProof][rpc verifytxoutproof]: {{summary_verifyTxOutProof}} {{NEW0_11_0}}

{% endautocrossref %}

#### Control RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [GetInfo][rpc getinfo]: {{summary_getInfo}} {{UPDATED0_10_0}}, {{DEPRECATED}}
* [Help][rpc help]: {{summary_help}}
* [Stop][rpc stop]: {{summary_stop}}

{% endautocrossref %}

#### Generating RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [Generate][rpc generate]: {{summary_generate}} {{NEW_MASTER}}
* [GetGenerate][rpc getgenerate]: {{summary_getGenerate}}
* [SetGenerate][rpc setgenerate]: {{summary_setGenerate}} {{UPDATED_MASTER}}

{% endautocrossref %}

#### Mining RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}} {{UPDATED_MASTER}}
* [GetNetworkHashPS][rpc getnetworkhashps]: {{summary_getNetworkHashPS}}
* [PrioritiseTransaction][rpc prioritisetransaction]: {{summary_prioritiseTransaction}} {{NEW0_10_0}}
* [SubmitBlock][rpc submitblock]: {{summary_submitBlock}}

{% endautocrossref %}

#### Network RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [AddNode][rpc addnode]: {{summary_addNode}}
* [GetAddedNodeInfo][rpc getaddednodeinfo]: {{summary_getAddedNodeInfo}}
* [GetConnectionCount][rpc getconnectioncount]: {{summary_getConnectionCount}}
* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}} {{NEW0_9_2}}, {{UPDATED0_10_0}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}} {{UPDATED0_10_0}}
* [Ping][rpc ping]: {{summary_ping-rpc}}

{% endautocrossref %}

#### Raw Transaction RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [DecodeRawTransaction][rpc decoderawtransaction]: {{summary_decodeRawTransaction}}
* [DecodeScript][rpc decodescript]: {{summary_decodeScript}}
* [GetRawTransaction][rpc getrawtransaction]: {{summary_getRawTransaction}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}
* [SignRawTransaction][rpc signrawtransaction]: {{summary_signRawTransaction}}

{% endautocrossref %}

#### Utility RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [CreateMultiSig][rpc createmultisig]: {{summary_createMultiSig}}
* [EstimateFee][rpc estimatefee]: {{summary_estimateFee}} {{NEW0_10_0}}
* [EstimatePriority][rpc estimatepriority]: {{summary_estimatePriority}} {{NEW0_10_0}}
* [ValidateAddress][rpc validateaddress]: {{summary_validateAddress}}
* [VerifyMessage][rpc verifymessage]: {{summary_verifyMessage}}

{% endautocrossref %}

#### Wallet RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

**Note:** the wallet RPCs are only available if Bitcoin Core was built
with [wallet support][]{:#term-wallet-support}{:.term}, which is the
default.

* [AddMultiSigAddress][rpc addmultisigaddress]: {{summary_addMultiSigAddress}}
* [BackupWallet][rpc backupwallet]: {{summary_backupWallet}}
* [DumpPrivKey][rpc dumpprivkey]: {{summary_dumpPrivKey}}
* [DumpWallet][rpc dumpwallet]: {{summary_dumpWallet}}
* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [GetAccountAddress][rpc getaccountaddress]: {{summary_getAccountAddress}}
* [GetAccount][rpc getaccount]: {{summary_getAccount}}
* [GetAddressesByAccount][rpc getaddressesbyaccount]: {{summary_getAddressesByAccount}}
* [GetBalance][rpc getbalance]: {{summary_getBalance}}
* [GetNewAddress][rpc getnewaddress]: {{summary_getNewAddress}}
* [GetRawChangeAddress][rpc getrawchangeaddress]: {{summary_getRawChangeAddress}}
* [GetReceivedByAccount][rpc getreceivedbyaccount]: {{summary_getReceivedByAccount}}
* [GetReceivedByAddress][rpc getreceivedbyaddress]: {{summary_getReceivedByAddress}}
* [GetTransaction][rpc gettransaction]: {{summary_getTransaction}} {{UPDATED0_10_0}}
* [GetUnconfirmedBalance][rpc getunconfirmedbalance]: {{summary_getUnconfirmedBalance}}
* [GetWalletInfo][rpc getwalletinfo]: {{summary_getWalletInfo}} {{NEW0_9_2}}
* [ImportAddress][rpc importaddress]: {{summary_importAddress}} {{NEW0_10_0}}
* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}
* [KeyPoolRefill][rpc keypoolrefill]: {{summary_keyPoolRefill}}
* [ListAccounts][rpc listaccounts]: {{summary_listAccounts}} {{UPDATED0_10_0}}
* [ListAddressGroupings][rpc listaddressgroupings]: {{summary_listAddressGroupings}}
* [ListLockUnspent][rpc listlockunspent]: {{summary_listLockUnspent}}
* [ListReceivedByAccount][rpc listreceivedbyaccount]: {{summary_listReceivedByAccount}} {{UPDATED0_10_0}}
* [ListReceivedByAddress][rpc listreceivedbyaddress]: {{summary_listReceivedByAddress}} {{UPDATED0_10_0}}
* [ListSinceBlock][rpc listsinceblock]: {{summary_listSinceBlock}} {{UPDATED0_10_0}}
* [ListTransactions][rpc listtransactions]: {{summary_listTransactions}} {{UPDATED0_10_0}}
* [ListUnspent][rpc listunspent]: {{summary_listUnspent}} {{UPDATED0_10_0}}
* [LockUnspent][rpc lockunspent]: {{summary_lockUnspent}}
* [Move][rpc move]: {{summary_move}}
* [SendFrom][rpc sendfrom]: {{summary_sendFrom}}
* [SendMany][rpc sendmany]: {{summary_sendMany}}
* [SendToAddress][rpc sendtoaddress]: {{summary_sendToAddress}}
* [SetAccount][rpc setaccount]: {{summary_setAccount}}
* [SetTxFee][rpc settxfee]: {{summary_setTxFee}}
* [SignMessage][rpc signmessage]: {{summary_signMessage}}
* [WalletLock][rpc walletlock]: {{summary_walletLock}}
* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}

{% endautocrossref %}

#### Removed RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [GetHashesPerSec][rpc gethashespersec]: {{summary_getHashesPerSec}}
* [GetWork][rpc getwork]: {{summary_getWork}}

{% endautocrossref %}
