{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/quick-reference.md" %}

#### Quick Reference {#rpc-quick-reference}
{% include helpers/subhead-links.md %}

<!-- the summaries used below are defined in the files for the
     particular RPC and aggregated into this helper file by the makefile
     function manual-update-summaries-file. For example, to edit the
     summary for GetBestBlockHash, edit
     _includes/rpc/getbestblockhash.md and run `make manual-update-summaries`. -->
{% include helpers/summaries.md %}

#### Blockchain RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [GetBestBlockHash][rpc getbestblockhash]: {{summary_getBestBlockHash}}
* [GetBlock][rpc getblock]: {{summary_getBlock}}
* [GetBlockChainInfo][rpc getblockchaininfo]: {{summary_getBlockChainInfo}}
* [GetBlockCount][rpc getblockcount]: {{summary_getBlockCount}}
* [GetBlockHash][rpc getblockhash]: {{summary_getBlockHash}}
* [GetBlockHeader][rpc getblockheader]: {{summary_getBlockHeader}}
* [GetBlockStats][rpc getblockstats]: {{summary_getBlockStats}}
* [GetChainTips][rpc getchaintips]: {{summary_getChainTips}}
* [GetChainTxStats][rpc getchaintxstats]: {{summary_getChainTxStats}}
* [GetDifficulty][rpc getdifficulty]: {{summary_getDifficulty}}
* [GetMemPoolAncestors][rpc getmempoolancestors]: {{summary_getMemPoolAncestors}}
* [GetMemPoolDescendants][rpc getmempooldescendants]: {{summary_getMemPoolDescendants}}
* [GetMemPoolEntry][rpc getmempoolentry]: {{summary_getMemPoolEntry}}
* [GetMemPoolInfo][rpc getmempoolinfo]: {{summary_getMemPoolInfo}}
* [GetRawMemPool][rpc getrawmempool]: {{summary_getRawMemPool}}
* [GetTxOut][rpc gettxout]: {{summary_getTxOut}}
* [GetTxOutProof][rpc gettxoutproof]: {{summary_getTxOutProof}}
* [GetTxOutSetInfo][rpc gettxoutsetinfo]: {{summary_getTxOutSetInfo}}
* [PreciousBlock][rpc preciousblock]: {{summary_preciousBlock}}
* [PruneBlockChain][rpc pruneblockchain]: {{summary_pruneBlockChain}}
* [SaveMemPool][rpc savemempool]: {{summary_saveMemPool}}
* [ScanTxOutSet][rpc scantxoutset]: {{summary_scanTxOutSet}}
* [VerifyChain][rpc verifychain]: {{summary_verifyChain}}
* [VerifyTxOutProof][rpc verifytxoutproof]: {{summary_verifyTxOutProof}}

{% endautocrossref %}

#### Control RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [GetMemoryInfo][rpc getmemoryinfo]: {{summary_getMemoryInfo}}
* [GetRpcInfo][rpc getrpcinfo]: {{summary_getRpcInfo}}
* [Help][rpc help]: {{summary_help}}
* [Logging][rpc logging]: {{summary_logging}}
* [Stop][rpc stop]: {{summary_stop}}
* [Uptime][rpc uptime]: {{summary_uptime}}

{% endautocrossref %}

#### Generating RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [Generate][rpc generate]: {{summary_generate}}
* [GenerateToAddress][rpc generatetoaddress]: {{summary_generateToAddress}}

{% endautocrossref %}

#### Mining RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [GetBlockTemplate][rpc getblocktemplate]: {{summary_getBlockTemplate}}
* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [GetNetworkHashPs][rpc getnetworkhashps]: {{summary_getNetworkHashPs}}
* [PrioritiseTransaction][rpc prioritisetransaction]: {{summary_prioritiseTransaction}}
* [SubmitBlock][rpc submitblock]: {{summary_submitBlock}}
* [SubmitHeader][rpc submitheader]: {{summary_submitHeader}}

{% endautocrossref %}

#### Network RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [AddNode][rpc addnode]: {{summary_addNode}}
* [ClearBanned][rpc clearbanned]: {{summary_clearBanned}}
* [DisconnectNode][rpc disconnectnode]: {{summary_disconnectNode}}
* [GetAddedNodeInfo][rpc getaddednodeinfo]: {{summary_getAddedNodeInfo}}
* [GetConnectionCount][rpc getconnectioncount]: {{summary_getConnectionCount}}
* [GetNetTotals][rpc getnettotals]: {{summary_getNetTotals}}
* [GetNetworkInfo][rpc getnetworkinfo]: {{summary_getNetworkInfo}}
* [GetNodeAddresses][rpc getnodeaddresses]: {{summary_getNodeAddresses}}
* [GetPeerInfo][rpc getpeerinfo]: {{summary_getPeerInfo}}
* [ListBanned][rpc listbanned]: {{summary_listBanned}}
* [Ping][rpc ping]: {{summary_ping-rpc}}
* [SetBan][rpc setban]: {{summary_setBan}}
* [SetNetworkActive][rpc setnetworkactive]: {{summary_setNetworkActive}}

{% endautocrossref %}

#### Rawtransactions RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [AnalyzePsbt][rpc analyzepsbt]: {{summary_analyzePsbt}}
* [CombinePsbt][rpc combinepsbt]: {{summary_combinePsbt}}
* [CombineRawTransaction][rpc combinerawtransaction]: {{summary_combineRawTransaction}}
* [ConvertToPsbt][rpc converttopsbt]: {{summary_convertToPsbt}}
* [CreatePsbt][rpc createpsbt]: {{summary_createPsbt}}
* [CreateRawTransaction][rpc createrawtransaction]: {{summary_createRawTransaction}}
* [DecodePsbt][rpc decodepsbt]: {{summary_decodePsbt}}
* [DecodeRawTransaction][rpc decoderawtransaction]: {{summary_decodeRawTransaction}}
* [DecodeScript][rpc decodescript]: {{summary_decodeScript}}
* [FinalizePsbt][rpc finalizepsbt]: {{summary_finalizePsbt}}
* [FundRawTransaction][rpc fundrawtransaction]: {{summary_fundRawTransaction}}
* [GetRawTransaction][rpc getrawtransaction]: {{summary_getRawTransaction}}
* [JoinPsbts][rpc joinpsbts]: {{summary_joinPsbts}}
* [SendRawTransaction][rpc sendrawtransaction]: {{summary_sendRawTransaction}}
* [SignRawTransactionWithKey][rpc signrawtransactionwithkey]: {{summary_signRawTransactionWithKey}}
* [TestmemPoolAccept][rpc testmempoolaccept]: {{summary_testmemPoolAccept}}
* [UtxoUpdatePsbt][rpc utxoupdatepsbt]: {{summary_utxoUpdatePsbt}}

{% endautocrossref %}

#### Util RPCs
{:.no_toc}
<!-- no subhead-links here -->

{% autocrossref %}

* [CreateMultiSig][rpc createmultisig]: {{summary_createMultiSig}}
* [DeriveAddresses][rpc deriveaddresses]: {{summary_deriveAddresses}}
* [EstimateSmartFee][rpc estimatesmartfee]: {{summary_estimateSmartFee}}
* [GetDescriptorInfo][rpc getdescriptorinfo]: {{summary_getDescriptorInfo}}
* [SignMessageWithPrivKey][rpc signmessagewithprivkey]: {{summary_signMessageWithPrivKey}}
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

* [AbandonTransaction][rpc abandontransaction]: {{summary_abandonTransaction}}
* [AbortRescan][rpc abortrescan]: {{summary_abortRescan}}
* [AddMultiSigAddress][rpc addmultisigaddress]: {{summary_addMultiSigAddress}}
* [BackupWallet][rpc backupwallet]: {{summary_backupWallet}}
* [BumpFee][rpc bumpfee]: {{summary_bumpFee}}
* [CreateWallet][rpc createwallet]: {{summary_createWallet}}
* [DumpPrivKey][rpc dumpprivkey]: {{summary_dumpPrivKey}}
* [DumpWallet][rpc dumpwallet]: {{summary_dumpWallet}}
* [EncryptWallet][rpc encryptwallet]: {{summary_encryptWallet}}
* [GetAddressesByLabel][rpc getaddressesbylabel]: {{summary_getAddressesByLabel}}
* [GetAddressInfo][rpc getaddressinfo]: {{summary_getAddressInfo}}
* [GetBalance][rpc getbalance]: {{summary_getBalance}}
* [GetNewAddress][rpc getnewaddress]: {{summary_getNewAddress}}
* [GetRawChangeAddress][rpc getrawchangeaddress]: {{summary_getRawChangeAddress}}
* [GetReceivedByAddress][rpc getreceivedbyaddress]: {{summary_getReceivedByAddress}}
* [GetReceivedByLabel][rpc getreceivedbylabel]: {{summary_getReceivedByLabel}}
* [GetTransaction][rpc gettransaction]: {{summary_getTransaction}}
* [GetUnconfirmedBalance][rpc getunconfirmedbalance]: {{summary_getUnconfirmedBalance}}
* [GetWalletInfo][rpc getwalletinfo]: {{summary_getWalletInfo}}
* [ImportAddress][rpc importaddress]: {{summary_importAddress}}
* [ImportMulti][rpc importmulti]: {{summary_importMulti}}
* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [ImportPrunedFunds][rpc importprunedfunds]: {{summary_importPrunedFunds}}
* [ImportPubKey][rpc importpubkey]: {{summary_importPubKey}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}
* [KeyPoolRefill][rpc keypoolrefill]: {{summary_keyPoolRefill}}
* [ListAddressGroupings][rpc listaddressgroupings]: {{summary_listAddressGroupings}}
* [ListLabels][rpc listlabels]: {{summary_listLabels}}
* [ListLockUnspent][rpc listlockunspent]: {{summary_listLockUnspent}}
* [ListReceivedByAddress][rpc listreceivedbyaddress]: {{summary_listReceivedByAddress}}
* [ListReceivedByLabel][rpc listreceivedbylabel]: {{summary_listReceivedByLabel}}
* [ListSinceBlock][rpc listsinceblock]: {{summary_listSinceBlock}}
* [ListTransactions][rpc listtransactions]: {{summary_listTransactions}}
* [ListUnspent][rpc listunspent]: {{summary_listUnspent}}
* [ListWalletDir][rpc listwalletdir]: {{summary_listWalletDir}}
* [ListWallets][rpc listwallets]: {{summary_listWallets}}
* [LoadWallet][rpc loadwallet]: {{summary_loadWallet}}
* [LockUnspent][rpc lockunspent]: {{summary_lockUnspent}}
* [RemovePrunedFunds][rpc removeprunedfunds]: {{summary_removePrunedFunds}}
* [RescanBlockChain][rpc rescanblockchain]: {{summary_rescanBlockChain}}
* [SendMany][rpc sendmany]: {{summary_sendMany}}
* [SendToAddress][rpc sendtoaddress]: {{summary_sendToAddress}}
* [SetHdSeed][rpc sethdseed]: {{summary_setHdSeed}}
* [SetLabel][rpc setlabel]: {{summary_setLabel}}
* [SetTxFee][rpc settxfee]: {{summary_setTxFee}}
* [SignMessage][rpc signmessage]: {{summary_signMessage}}
* [SignRawTransactionWithWallet][rpc signrawtransactionwithwallet]: {{summary_signRawTransactionWithWallet}}
* [UnloadWallet][rpc unloadwallet]: {{summary_unloadWallet}}
* [WalletCreatefundedPsbt][rpc walletcreatefundedpsbt]: {{summary_walletCreatefundedPsbt}}
* [WalletLock][rpc walletlock]: {{summary_walletLock}}
* [WalletPassphrase][rpc walletpassphrase]: {{summary_walletPassphrase}}
* [WalletPassphraseChange][rpc walletpassphrasechange]: {{summary_walletPassphraseChange}}
* [WalletProcessPsbt][rpc walletprocesspsbt]: {{summary_walletProcessPsbt}}

{% endautocrossref %}

