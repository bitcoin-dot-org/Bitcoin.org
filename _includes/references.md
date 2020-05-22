{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

{% comment %}<!-- Terms; must have tooltip description in "quotes"; alphabetical order -->{% endcomment %}
{% comment %}<!-- TODO: Add each of these to the 'Terms' page on developer.bitcoin.org -->{% endcomment %}
[bitcoin URI]: # "A URI which allows receivers to encode payment details so spenders don't have to manually enter addresses and other details"
[certificate chain]: # "A chain of certificates connecting a individual's leaf certificate to the certificate authority's root certificate"
[coinbase block height]: # "The current block's height encoded into the first bytes of the coinbase field"
[data-pushing opcode]: # "Any opcode from 0x01 to 0x4e which pushes data on to the script evaluation stack"
[fiat]: # "National currencies such as the dollar or euro"
[intermediate certificate]: # "A intermediate certificate authority certificate which helps connect a leaf (receiver) certificate to a root certificate authority"
[key index]: # "An index number used in the HD wallet formula to generate child keys from a parent key"
[key pair]: # "A private key and its derived public key"
[label]: # "The label parameter of a bitcoin: URI which provides the spender with the receiver's name (unauthenticated)"
[leaf certificate]: # "The end-node in a certificate chain; in the payment protocol, it is the certificate belonging to the receiver of satoshis"
[merge]: # "Spending, in the same transaction, multiple outputs which can be traced back to different previous spenders, leaking information about how many satoshis you control"
[merge avoidance]: # "A strategy for selecting which outputs to spend that avoids merging outputs with different histories that could leak private information"
[message]: # "A parameter of bitcoin: URIs which allows the receiver to optionally specify a message to the spender"
[msg_tx]: # "The TXID data type identifier of an inventory on the P2P network"
[msg_block]: # "The block header hash data type identifier of an inventory on the P2P network"
[msg_filtered_block]: # "An alternative to the block header hash data type identifier of an inventory on the P2P network used to request a merkle block"
[msg_cmpct_block]: # "An alternative to the block header hash data type identifier of an inventory on the P2P network used to request a compact block"
[msg_witness_block]: # "An alternative to the block header hash data type identifier of an inventory on the P2P network used to request a block with witness serialization for SegWit"
[msg_witness_tx]: # "An alternative of the transaction data type identifier of an inventory on the P2P network used to request a transaction with witness serialization for SegWit"
[msg_filtered_witness_block]: # "An alternative to the block header hash data type identifier of an inventory on the P2P network that is reserved for future use and unused."
[network]: # "The Bitcoin P2P network which broadcasts transactions and blocks"
[op_checkmultisig]: # "Opcode which returns true if one or more provided signatures (m) sign the correct parts of a transaction and match one or more provided public keys (n)"
[op_checksig]: # "Opcode which returns true if a signature signs the correct parts of a transaction and matches a provided public key"
[op_dup]: # "Operation which duplicates the entry below it on the stack"
[op_equal]: # "Operation which returns true if the two entries below it on the stack are equivalent"
[op_equalverify]: # "Operation which terminates the script in failure unless the two entries below it on the stack are equivalent"
[op_hash160]: # "Operation which converts the entry below it on the stack into a RIPEMD(SHA256()) hashed version of itself"
[op_return]: # "Operation which terminates the script in failure"
[op_verify]: # "Operation which terminates the script if the entry below it on the stack is non-true (zero)"
[output index]: # "The sequentially-numbered index of outputs in a single transaction starting from 0"
[PaymentDetails]: # "The PaymentDetails of the payment protocol which allows the receiver to specify the payment details to the spender"
[PaymentRequest]: # "The PaymentRequest of the payment protocol which contains and allows signing of the PaymentDetails"
[PaymentRequests]: # "The PaymentRequest of the payment protocol which contains and allows signing of the PaymentDetails"
[PKI]: # "Public Key Infrastructure; usually meant to indicate the X.509 certificate system used for HTTP Secure (https)."
[point function]: # "The ECDSA function used to create a public key from a private key"
[pp amount]: # "Part of the Output part of the PaymentDetails part of a payment protocol where receivers can specify the amount of satoshis they want paid to a particular pubkey script"
[pp expires]: # "The expires field of a PaymentDetails where the receiver tells the spender when the PaymentDetails expires"
[pp memo]: # "The memo fields of PaymentDetails, Payment, and PaymentACK which allow spenders and receivers to send each other memos"
[pp merchant data]: # "The merchant_data part of PaymentDetails and Payment which allows the receiver to send arbitrary data to the spender in PaymentDetails and receive it back in Payments"
[pp PKI data]: # "The pki_data field of a PaymentRequest which provides details such as certificates necessary to validate the request"
[pp pki type]: # "The PKI field of a PaymentRequest which tells spenders how to validate this request as being from a specific recipient"
[pp script]: # "The script field of a PaymentDetails where the receiver tells the spender what pubkey scripts to pay"
[previous block header hash]: # "A field in the block header which contains the SHA256(SHA256()) hash of the previous block's header"
[proper money handling]: # "Bitcoin amounts need to be correctly processed without introducing rounding errors that could cause monetary loss"
[r]: # "The payment request parameter in a bitcoin: URI"
[receipt]: # "A cryptographically-verifiable receipt created using parts of a payment request and a confirmed transaction"
[recurrent rebilling]: # "Billing a spender on a regular schedule"
[refund]: # "A transaction which refunds some or all satoshis received in a previous transaction"
[root certificate]: # "A certificate belonging to a certificate authority (CA)"
[ssl signature]: # "Signatures created and recognized by major SSL implementations such as OpenSSL"
[standard block relay]: # "The regular block relay method: announcing a block with an inv message and waiting for a response"
[transaction]: # "A transaction spending satoshis"
[transaction version number]: # "A version number prefixed to transactions to allow upgrading"
[transactions]: # "A transaction spending satoshis"
[unencrypted wallet]: # "A wallet that has not been encrypted with the encryptwallet RPC"
[unique addresses]: # "Address which are only used once to protect privacy and increase security"
[unlocked wallet]: # "An encrypted wallet that has been unlocked with the walletpassphrase RPC"
[unsolicited block push]: # "When a miner sends a block message without sending an inv message first"
[URI QR Code]: # "A QR code containing a bitcoin: URI"
[v2 block]: # "The current version of Bitcoin blocks"
[verified payments]: # "Payments which the receiver believes won't be double spent"
[wallet support]: # "A Bitcoin Core ./configure option that enables (default) or disables the wallet"
[prefilledtransaction]: # "A P2P Networking data structure used to represent a vector of a few transactions"
[headerandshortids]: # "A P2P Networking data structure used to relay a block header, the short transactions IDs used for matching already-available transactions, and a select few transactions which a peer may be missing"
[blocktransactionsrequest]: # "A P2P Networking data structure used to list transaction indexes in a block being requested by a peer"
[blocktransactions]: # "A P2P Networking data structure used to provide some of the transactions in a block as requested"

{% comment %}<!-- RPCs; alphabetical order -->{% endcomment %}
[rpc abandontransaction]: https://developer.bitcoin.org/reference/rpc/abandontransaction
[rpc abortrescan]: https://developer.bitcoin.org/reference/rpc/abortrescan
[rpc addmultisigaddress]: https://developer.bitcoin.org/reference/rpc/addmultisigaddress
[rpc addnode]: https://developer.bitcoin.org/reference/rpc/addnode
[rpc analyzepsbt]: https://developer.bitcoin.org/reference/rpc/analyzepsbt
[rpc backupwallet]: https://developer.bitcoin.org/reference/rpc/backupwallet
[rpc bumpfee]: https://developer.bitcoin.org/reference/rpc/bumpfee
[rpc clearbanned]: https://developer.bitcoin.org/reference/rpc/clearbanned
[rpc combinepsbt]: https://developer.bitcoin.org/reference/rpc/combinepsbt
[rpc combinerawtransaction]: https://developer.bitcoin.org/reference/rpc/combinerawtransaction
[rpc converttopsbt]: https://developer.bitcoin.org/reference/rpc/converttopsbt
[rpc createmultisig]: https://developer.bitcoin.org/reference/rpc/createmultisig
[rpc createpsbt]: https://developer.bitcoin.org/reference/rpc/createpsbt
[rpc createrawtransaction]: https://developer.bitcoin.org/reference/rpc/createrawtransaction
[rpc createwallet]: https://developer.bitcoin.org/reference/rpc/createwallet
[rpc decodepsbt]: https://developer.bitcoin.org/reference/rpc/decodepsbt
[rpc decoderawtransaction]: https://developer.bitcoin.org/reference/rpc/decoderawtransaction
[rpc decodescript]: https://developer.bitcoin.org/reference/rpc/decodescript
[rpc deriveaddresses]: https://developer.bitcoin.org/reference/rpc/deriveaddresses
[rpc disconnectnode]: https://developer.bitcoin.org/reference/rpc/disconnectnode
[rpc dumpprivkey]: https://developer.bitcoin.org/reference/rpc/dumpprivkey
[rpc dumpwallet]: https://developer.bitcoin.org/reference/rpc/dumpwallet
[rpc encryptwallet]: https://developer.bitcoin.org/reference/rpc/encryptwallet
[rpc estimatesmartfee]: https://developer.bitcoin.org/reference/rpc/estimatesmartfee
[rpc finalizepsbt]: https://developer.bitcoin.org/reference/rpc/finalizepsbt
[rpc fundrawtransaction]: https://developer.bitcoin.org/reference/rpc/fundrawtransaction
[rpc generate]: https://developer.bitcoin.org/reference/rpc/generate
[rpc generatetoaddress]: https://developer.bitcoin.org/reference/rpc/generatetoaddress
[rpc getaddednodeinfo]: https://developer.bitcoin.org/reference/rpc/getaddednodeinfo
[rpc getaddressesbylabel]: https://developer.bitcoin.org/reference/rpc/getaddressesbylabel
[rpc getaddressinfo]: https://developer.bitcoin.org/reference/rpc/getaddressinfo
[rpc getbalance]: https://developer.bitcoin.org/reference/rpc/getbalance
[rpc getbestblockhash]: https://developer.bitcoin.org/reference/rpc/getbestblockhash
[rpc getblock]: https://developer.bitcoin.org/reference/rpc/getblock
[rpc getblockchaininfo]: https://developer.bitcoin.org/reference/rpc/getblockchaininfo
[rpc getblockcount]: https://developer.bitcoin.org/reference/rpc/getblockcount
[rpc getblockhash]: https://developer.bitcoin.org/reference/rpc/getblockhash
[rpc getblockheader]: https://developer.bitcoin.org/reference/rpc/getblockheader
[rpc getblockstats]: https://developer.bitcoin.org/reference/rpc/getblockstats
[rpc getblocktemplate]: https://developer.bitcoin.org/reference/rpc/getblocktemplate
[rpc getchaintips]: https://developer.bitcoin.org/reference/rpc/getchaintips
[rpc getchaintxstats]: https://developer.bitcoin.org/reference/rpc/getchaintxstats
[rpc getconnectioncount]: https://developer.bitcoin.org/reference/rpc/getconnectioncount
[rpc getdescriptorinfo]: https://developer.bitcoin.org/reference/rpc/getdescriptorinfo
[rpc getdifficulty]: https://developer.bitcoin.org/reference/rpc/getdifficulty
[rpc getmemoryinfo]: https://developer.bitcoin.org/reference/rpc/getmemoryinfo
[rpc getmempoolancestors]: https://developer.bitcoin.org/reference/rpc/getmempoolancestors
[rpc getmempooldescendants]: https://developer.bitcoin.org/reference/rpc/getmempooldescendants
[rpc getmempoolentry]: https://developer.bitcoin.org/reference/rpc/getmempoolentry
[rpc getmempoolinfo]: https://developer.bitcoin.org/reference/rpc/getmempoolinfo
[rpc getmininginfo]: https://developer.bitcoin.org/reference/rpc/getmininginfo
[rpc getnettotals]: https://developer.bitcoin.org/reference/rpc/getnettotals
[rpc getnetworkhashps]: https://developer.bitcoin.org/reference/rpc/getnetworkhashps
[rpc getnetworkinfo]: https://developer.bitcoin.org/reference/rpc/getnetworkinfo
[rpc getnewaddress]: https://developer.bitcoin.org/reference/rpc/getnewaddress
[rpc getnodeaddresses]: https://developer.bitcoin.org/reference/rpc/getnodeaddresses
[rpc getpeerinfo]: https://developer.bitcoin.org/reference/rpc/getpeerinfo
[rpc getrawchangeaddress]: https://developer.bitcoin.org/reference/rpc/getrawchangeaddress
[rpc getrawmempool]: https://developer.bitcoin.org/reference/rpc/getrawmempool
[rpc getrawtransaction]: https://developer.bitcoin.org/reference/rpc/getrawtransaction
[rpc getreceivedbyaddress]: https://developer.bitcoin.org/reference/rpc/getreceivedbyaddress
[rpc getreceivedbylabel]: https://developer.bitcoin.org/reference/rpc/getreceivedbylabel
[rpc getrpcinfo]: https://developer.bitcoin.org/reference/rpc/getrpcinfo
[rpc gettransaction]: https://developer.bitcoin.org/reference/rpc/gettransaction
[rpc gettxout]: https://developer.bitcoin.org/reference/rpc/gettxout
[rpc gettxoutproof]: https://developer.bitcoin.org/reference/rpc/gettxoutproof
[rpc gettxoutsetinfo]: https://developer.bitcoin.org/reference/rpc/gettxoutsetinfo
[rpc getunconfirmedbalance]: https://developer.bitcoin.org/reference/rpc/getunconfirmedbalance
[rpc getwalletinfo]: https://developer.bitcoin.org/reference/rpc/getwalletinfo
[rpc help]: https://developer.bitcoin.org/reference/rpc/help
[rpc importaddress]: https://developer.bitcoin.org/reference/rpc/importaddress
[rpc importmulti]: https://developer.bitcoin.org/reference/rpc/importmulti
[rpc importprivkey]: https://developer.bitcoin.org/reference/rpc/importprivkey
[rpc importprunedfunds]: https://developer.bitcoin.org/reference/rpc/importprunedfunds
[rpc importpubkey]: https://developer.bitcoin.org/reference/rpc/importpubkey
[rpc importwallet]: https://developer.bitcoin.org/reference/rpc/importwallet
[rpc joinpsbts]: https://developer.bitcoin.org/reference/rpc/joinpsbts
[rpc keypoolrefill]: https://developer.bitcoin.org/reference/rpc/keypoolrefill
[rpc listaddressgroupings]: https://developer.bitcoin.org/reference/rpc/listaddressgroupings
[rpc listbanned]: https://developer.bitcoin.org/reference/rpc/listbanned
[rpc listlabels]: https://developer.bitcoin.org/reference/rpc/listlabels
[rpc listlockunspent]: https://developer.bitcoin.org/reference/rpc/listlockunspent
[rpc listreceivedbyaddress]: https://developer.bitcoin.org/reference/rpc/listreceivedbyaddress
[rpc listreceivedbylabel]: https://developer.bitcoin.org/reference/rpc/listreceivedbylabel
[rpc listsinceblock]: https://developer.bitcoin.org/reference/rpc/listsinceblock
[rpc listtransactions]: https://developer.bitcoin.org/reference/rpc/listtransactions
[rpc listunspent]: https://developer.bitcoin.org/reference/rpc/listunspent
[rpc listwalletdir]: https://developer.bitcoin.org/reference/rpc/listwalletdir
[rpc listwallets]: https://developer.bitcoin.org/reference/rpc/listwallets
[rpc loadwallet]: https://developer.bitcoin.org/reference/rpc/loadwallet
[rpc lockunspent]: https://developer.bitcoin.org/reference/rpc/lockunspent
[rpc logging]: https://developer.bitcoin.org/reference/rpc/logging
[rpc ping]: https://developer.bitcoin.org/reference/rpc/ping-rpc
[rpc preciousblock]: https://developer.bitcoin.org/reference/rpc/preciousblock
[rpc prioritisetransaction]: https://developer.bitcoin.org/reference/rpc/prioritisetransaction
[rpc pruneblockchain]: https://developer.bitcoin.org/reference/rpc/pruneblockchain
[rpc removeprunedfunds]: https://developer.bitcoin.org/reference/rpc/removeprunedfunds
[rpc rescanblockchain]: https://developer.bitcoin.org/reference/rpc/rescanblockchain
[rpc savemempool]: https://developer.bitcoin.org/reference/rpc/savemempool
[rpc scantxoutset]: https://developer.bitcoin.org/reference/rpc/scantxoutset
[rpc sendmany]: https://developer.bitcoin.org/reference/rpc/sendmany
[rpc sendrawtransaction]: https://developer.bitcoin.org/reference/rpc/sendrawtransaction
[rpc sendtoaddress]: https://developer.bitcoin.org/reference/rpc/sendtoaddress
[rpc setban]: https://developer.bitcoin.org/reference/rpc/setban
[rpc sethdseed]: https://developer.bitcoin.org/reference/rpc/sethdseed
[rpc setlabel]: https://developer.bitcoin.org/reference/rpc/setlabel
[rpc setnetworkactive]: https://developer.bitcoin.org/reference/rpc/setnetworkactive
[rpc settxfee]: https://developer.bitcoin.org/reference/rpc/settxfee
[rpc signmessage]: https://developer.bitcoin.org/reference/rpc/signmessage
[rpc signmessagewithprivkey]: https://developer.bitcoin.org/reference/rpc/signmessagewithprivkey
[rpc signrawtransactionwithkey]: https://developer.bitcoin.org/reference/rpc/signrawtransactionwithkey
[rpc signrawtransactionwithwallet]: https://developer.bitcoin.org/reference/rpc/signrawtransactionwithwallet
[rpc stop]: https://developer.bitcoin.org/reference/rpc/stop
[rpc submitblock]: https://developer.bitcoin.org/reference/rpc/submitblock
[rpc submitheader]: https://developer.bitcoin.org/reference/rpc/submitheader
[rpc testmempoolaccept]: https://developer.bitcoin.org/reference/rpc/testmempoolaccept
[rpc unloadwallet]: https://developer.bitcoin.org/reference/rpc/unloadwallet
[rpc uptime]: https://developer.bitcoin.org/reference/rpc/uptime
[rpc utxoupdatepsbt]: https://developer.bitcoin.org/reference/rpc/utxoupdatepsbt
[rpc validateaddress]: https://developer.bitcoin.org/reference/rpc/validateaddress
[rpc verifychain]: https://developer.bitcoin.org/reference/rpc/verifychain
[rpc verifymessage]: https://developer.bitcoin.org/reference/rpc/verifymessage
[rpc verifytxoutproof]: https://developer.bitcoin.org/reference/rpc/verifytxoutproof
[rpc walletcreatefundedpsbt]: https://developer.bitcoin.org/reference/rpc/walletcreatefundedpsbt
[rpc walletlock]: https://developer.bitcoin.org/reference/rpc/walletlock
[rpc walletpassphrase]: https://developer.bitcoin.org/reference/rpc/walletpassphrase
[rpc walletpassphrasechange]: https://developer.bitcoin.org/reference/rpc/walletpassphrasechange
[rpc walletprocesspsbt]: https://developer.bitcoin.org/reference/rpc/walletprocesspsbt

{% comment %}<!-- REST requests; alphabetical order -->{% endcomment %}
[rest get block]: https://developer.bitcoin.org/reference/rpc/get-block
[rest get block-notxdetails]: https://developer.bitcoin.org/reference/rpc/get-blocknotxdetails
[rest get blockhashbyheight]: https://developer.bitcoin.org/reference/rpc/get-blockhashbyheight
[rest get chaininfo]: https://developer.bitcoin.org/reference/rpc/get-chaininfo
[rest get getutxos]: https://developer.bitcoin.org/reference/rpc/get-getutxos
[rest get headers]: https://developer.bitcoin.org/reference/rpc/get-headers
[rest get mempool-contents]: https://developer.bitcoin.org/reference/rpc/get-mempoolcontents
[rest get mempool-info]: https://developer.bitcoin.org/reference/rpc/get-mempoolinfo
[rest get tx]: https://developer.bitcoin.org/reference/rpc/get-tx

{% comment %}<!-- P2P protocol messages; alphabetical order -->{% endcomment %}
[addr message]: https://developer.bitcoin.org/reference/p2p_networking.html##addr "The P2P network message which relays IP addresses and port numbers of active nodes to other nodes and clients, allowing decentralized peer discovery."
[alert message]: https://developer.bitcoin.org/reference/p2p_networking.html##alert "The P2P network message which sends alerts in case of major software problems."
[block message]: https://developer.bitcoin.org/reference/p2p_networking.html#block "The P2P network message which sends a serialized block"
[feefilter message]: https://developer.bitcoin.org/reference/p2p_networking.html#feefilter "The P2P network message which requests the receiving peer not relay any transactions below the specified fee rate"
[filteradd message]: https://developer.bitcoin.org/reference/p2p_networking.html#filteradd "A P2P protocol message used to add a data element to an existing bloom filter."
[filterclear message]: https://developer.bitcoin.org/reference/p2p_networking.html#filterclear "A P2P protocol message used to remove an existing bloom filter."
[filterload message]: https://developer.bitcoin.org/reference/p2p_networking.html#filterclear "A P2P protocol message used to send a filter to a remote peer, requesting that they only send transactions which match the filter."
[getaddr message]: https://developer.bitcoin.org/reference/p2p_networking.html#getaddr "A P2P protool message used to request an addr message containing connection information for other nodes"
[getblocks message]: https://developer.bitcoin.org/reference/p2p_networking.html#getblocks "A P2P protocol message used to request an inv message containing a range of block header hashes"
[getdata message]: https://developer.bitcoin.org/reference/p2p_networking.html#getdata "A P2P protocol message used to request one or more transactions, blocks, or merkle blocks"
[getheaders message]: https://developer.bitcoin.org/reference/p2p_networking.html#getheaders "A P2P protocol message used to request a range of block headers"
[headers message]: https://developer.bitcoin.org/reference/p2p_networking.html#headers "A P2P protocol message containing one or more block headers"
[inv message]: https://developer.bitcoin.org/reference/p2p_networking.html#inv "A P2P protocol message used to send inventories of transactions and blocks known to the transmitting peer"
[mempool message]: https://developer.bitcoin.org/reference/p2p_networking.html#mempool "A P2P protocol message used to request one or more inv messages with currently-unconfirmed transactions"
[merkleblock message]: https://developer.bitcoin.org/reference/p2p_networking.html#merkleblock "A P2P protocol message used to request a filtered block useful for SPV proofs"
[cmpctblock message]: https://developer.bitcoin.org/reference/p2p_networking.html#cmpctblock "A P2P protocol message used to request a compact block"
[sendcmpct message]: https://developer.bitcoin.org/reference/p2p_networking.html#sendcmpct "A P2P protocol message used to begin the receipt of a compact block between a peer and node"
[getblocktxn message]: https://developer.bitcoin.org/reference/p2p_networking.html#getblocktxn "A P2P protocol message used to request block transactions for the given block hash"
[blocktxn message]: https://developer.bitcoin.org/reference/p2p_networking.html#blocktxn "A P2P protocol message used to send available transaction data to requesting peers for a given block hash"
[notfound message]: https://developer.bitcoin.org/reference/p2p_networking.html#notfound "A P2P protocol message sent to indicate that the requested data was not available"
[ping message]: https://developer.bitcoin.org/reference/p2p_networking.html#ping "A P2P network message used to see if the remote host is still connected"
[pong message]: https://developer.bitcoin.org/reference/p2p_networking.html#pong "A P2P network message used to reply to a P2P network ping message"
[reject message]: https://developer.bitcoin.org/reference/p2p_networking.html#reject "A P2P network message used to indicate a previously-received message was rejected for some reason"
[sendheaders message]: https://developer.bitcoin.org/reference/p2p_networking.html#sendheaders "A P2P network message used to request new blocks be announced through headers messages rather than inv messages"
[tx message]: https://developer.bitcoin.org/reference/p2p_networking.html#tx "A P2P protocol message which sends a single serialized transaction"
[verack message]: https://developer.bitcoin.org/reference/p2p_networking.html#verack "A P2P network message sent in reply to a version message to confirm a connection has been established"
[version message]: https://developer.bitcoin.org/reference/p2p_networking.html#version "A P2P network message sent at the begining of a connection to allow protocol version negotiation"

{% comment %}<!-- Other internal site links; alphabetical order -->{% endcomment %}
[bandwidth sharing guide]: /en/full-node
[bcc contribute]: /en/bitcoin-core/contribute/
[bcc contribute code]: /{{page.lang}}/{% translate development url %}
[bcc contribute documentation]: /en/bitcoin-core/contribute/documentation
[bcc contribute issues]: /en/bitcoin-core/contribute/issues
[bcc contribute support]: /en/bitcoin-core/contribute/support
[bcc contribute translations]: /en/bitcoin-core/contribute/translations
[bcc decentralized peer discovery]: /en/bitcoin-core/features/privacy#decentralized-peer-discovery
[bcc documentation]: /en/bitcoin-core/help#documentation
[bcc download]: /en/download
[bcc features]: /en/bitcoin-core/features/
[bcc forums]: /en/bitcoin-core/help#forums
[bcc help]: /en/bitcoin-core/help
[bcc live help]: /en/bitcoin-core/help#live
[bcc main]: /en/bitcoin-core/
[bcc network support]: /en/bitcoin-core/features/network-support
[bcc privacy]: /en/bitcoin-core/features/privacy
[bcc privacy data leaking]: /en/bitcoin-core/features/privacy#perfect-privacy-for-received-transactions
[bcc requirements]: /en/bitcoin-core/features/requirements
[bcc user interface]: /en/bitcoin-core/features/user-interface
[bcc user interface lightweight]: /en/bitcoin-core/features/user-interface#lightweight
[bcc validation]: /en/bitcoin-core/features/validation
[bcc validation decentralization]: /en/bitcoin-core/features/validation#help-protect-decentralization
[bcc validation do you validate]: /en/bitcoin-core/features/validation#do-you-validate
[bcc validation protection]: /en/bitcoin-core/features/validation#how-validation-protects-your-bitcoins
[bcc version history]: /en/version-history

[Bitcoin Core 0.6.0]: /en/release/v0.6.0
[Bitcoin Core 0.6.1]: /en/release/v0.6.1
[Bitcoin Core 0.7.0]: /en/release/v0.7.0
[Bitcoin Core 0.8.0]: /en/release/v0.8.0
[Bitcoin Core 0.9.0]: /en/release/v0.9.0
[Bitcoin Core 0.9.1]: /en/release/v0.9.1
[Bitcoin Core 0.9.2]: /en/release/v0.9.2
[Bitcoin Core 0.9.3]: /en/release/v0.9.3
[Bitcoin Core 0.10.0]: /en/release/v0.10.0
[Bitcoin Core 0.10.1]: /en/release/v0.10.1
[Bitcoin Core 0.10.2]: /en/release/v0.10.2
[Bitcoin Core 0.10.3]: /en/release/v0.10.3
[Bitcoin Core 0.11.0]: /en/release/v0.11.0
[Bitcoin Core 0.11.1]: /en/release/v0.11.1
[Bitcoin Core 0.11.2]: /en/release/v0.11.2
[Bitcoin Core 0.12.0]: /en/release/v0.12.0
[Bitcoin Core 0.12.1]: /en/release/v0.12.1
[Bitcoin Core 0.13.0]: /en/release/v0.13.0
[Bitcoin Core 0.13.1]: /en/release/v0.13.1
[Bitcoin Core 0.13.2]: /en/release/v0.13.2
[Bitcoin Core 0.14.0]: /en/release/v0.14.0
[Bitcoin Core 0.14.1]: /en/release/v0.14.1
[Bitcoin Core 0.14.2]: /en/release/v0.14.2
[Bitcoin Core 0.18.0]: /en/release/v0.18.0
[bitcoin URI subsection]: https://developer.bitcoin.org/examples/payment_processing.html
[bitcoind initial setup]: https://developer.bitcoin.org/examples/index.html
[bitcoinpdf]: https://bitcoin.org/en/bitcoin-paper
[choose your wallet]: /en/choose-your-wallet
[communities]: /en/community
[core executable]: /en/download
[dev communities]: /en/development#devcommunities
[developer documentation]: https://developer.bitcoin.org/
[devex complex raw transaction]: https://developer.bitcoin.org/examples/transactions#complex-raw-transaction
[devex payment protocol]: https://developer.bitcoin.org/examples/payment_processing.html#payment-protocol
[devexamples]: https://developer.bitcoin.org/examples/index.html
[devguide]: https://developer.bitcoin.org/devguide/index.html
[devguide avoiding key reuse]: https://developer.bitcoin.org/devguide/transactions.html#avoiding-key-reuse
[devguide hardened keys]: https://developer.bitcoin.org/devguide/wallets.html#hardened-keys
[devguide payment processing]: https://developer.bitcoin.org/devguide/payment_processing.html
[devguide wallets]: https://developer.bitcoin.org/devguide/wallets.html
[devref]: https://developer.bitcoin.org/reference/index.html
[devref wallets]: https://developer.bitcoin.org/reference/wallets.html
[locktime parsing rules]: https://developer.bitcoin.org/devguide/transactions.html#locktime-and-sequence-number
[Merge Avoidance subsection]: https://developer.bitcoin.org/devguide/payment_processing.html#merge-avoidance
[micropayment channel]: https://developer.bitcoin.org/devguide/contracts#micropayment-channel
[not a specification]: https://developer.bitcoin.org/reference/intro.html#not-a-specification
[REST]: https://developer.bitcoin.org/reference/rpc/index.html
[RPC]: https://developer.bitcoin.org/reference/rpc/index.html
[RPCs]: https://developer.bitcoin.org/reference/rpc/index.html
[section block chain]: https://developer.bitcoin.org/reference/block_chain.html
[section block header]: https://developer.bitcoin.org/reference/block_chain.html#block-headers
[section block versions]: https://developer.bitcoin.org/reference/block_chain.html#block-versions
[section creating a bloom filter]: https://developer.bitcoin.org/examples/p2p_networking#creating-a-bloom-filter
[section compactSize unsigned integer]: https://developer.bitcoin.org/reference/transactions.html#compactsize-unsigned-integers
[section detecting forks]: https://developer.bitcoin.org/devguide/block_chain#detecting-forks
[section getblocktemplate]: https://developer.bitcoin.org/devguide/mining.html#getblocktemplate-rpc
[section merkle trees]: https://developer.bitcoin.org/reference/block_chain.html#merkle-trees
[section merkleblock example]: https://developer.bitcoin.org/examples/p2p_networking#parsing-a-merkleblock
[section message header]: https://developer.bitcoin.org/reference/p2p_networking.html#message-headers
[section p2p reference]: https://developer.bitcoin.org/reference/p2p_networking.html#p2p-network
[section protocol versions]: https://developer.bitcoin.org/reference/p2p_networking.html#protocol-versions
[section rpc quick reference]: https://developer.bitcoin.org/reference/rpc/index.html
[section serialized blocks]: https://developer.bitcoin.org/reference/block_chain.html#serialized-blocks
[section simple raw transaction]: https://developer.bitcoin.org/examples/transactions.html#simple-raw-transaction
[section verifying payment]: https://developer.bitcoin.org/devguide/payment_processing.html#verifying-payment
[secure your wallet]: /en/secure-your-wallet
[v0.8 chain fork]: /en/alert/2013-03-11-chain-fork
[Verification subsection]: https://developer.bitcoin.org/devguide/payment_processing.html#verifying-payment

{% comment %}<!-- Official reference documents (BIPs should not use zero padding:
     BIP32 not BIP0032); alphabetical order -->{% endcomment %}
[BIP9]: https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki
[BIP9 assignments]: https://github.com/bitcoin/bips/blob/master/bip-0009/assignments.mediawiki
[BIP14]: https://github.com/bitcoin/bips/blob/master/bip-0014.mediawiki
[BIP16]: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
[BIP21]: https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
[BIP22]: https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki
[BIP23]: https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki
[BIP30]: https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
[BIP31]: https://github.com/bitcoin/bips/blob/master/bip-0031.mediawiki
[BIP32]: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
[BIP34]: https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki
[BIP35]: https://github.com/bitcoin/bips/blob/master/bip-0035.mediawiki
[BIP37]: https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki
[BIP39]: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
[BIP50]: https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki
[BIP60]: https://github.com/bitcoin/bips/blob/master/bip-0060.mediawiki
[BIP61]: https://github.com/bitcoin/bips/blob/master/bip-0061.mediawiki
[BIP62]: https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki
[BIP64]: https://github.com/bitcoin/bips/blob/master/bip-0064.mediawiki
[BIP66]: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
[BIP70]: https://github.com/bitcoin/bips/blob/master/bip-0070.mediawiki
[BIP71]: https://github.com/bitcoin/bips/blob/master/bip-0071.mediawiki
[BIP72]: https://github.com/bitcoin/bips/blob/master/bip-0072.mediawiki
[BIP111]: https://github.com/bitcoin/bips/blob/master/bip-0111.mediawiki
[BIP112]: https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki
[BIP113]: https://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki
[BIP125]: https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki
[BIP130]: https://github.com/bitcoin/bips/blob/master/bip-0130.mediawiki
[BIP133]: https://github.com/bitcoin/bips/blob/master/bip-0133.mediawiki
[BIP141]: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
[BIP144]: https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki
[BIP151]: https://github.com/bitcoin/bips/blob/master/bip-0151.mediawiki
[BIP152]: https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki
[BIP159]: https://github.com/bitcoin/bips/blob/master/bip-0159.mediawiki
[CVE-2012-2459]: https://en.bitcoin.it/wiki/CVEs#CVE-2012-2459
[RFC5737]: http://tools.ietf.org/html/rfc5737
[secp256k1]: http://www.secg.org/sec2-v2.pdf

{% comment %}<!-- Other external site links; alphabetical order -->{% endcomment %}
[#bitcoin]: https://webchat.freenode.net/?channels=bitcoin&uio=d4
[#bitcoin-dev]: https://webchat.freenode.net/?channels=bitcoin-dev&uio=d4
[#bitcoin-mining]: https://webchat.freenode.net/?channels=bitcoin-mining&uio=d4
[#bitcoin-wiki]: https://webchat.freenode.net/?channels=bitcoin-wiki&uio=d4
[0bin]: http://0bin.net/
[bcc automated testing]: https://github.com/bitcoin/bitcoin/blob/master/README.md#automated-testing
[bcc configuration]: https://en.bitcoin.it/wiki/Running_Bitcoin
[bcc data directory]: https://en.bitcoin.it/wiki/Data_directory
[bcc issues]: https://github.com/bitcoin/bitcoin/issues
[bcc new issue]: https://github.com/bitcoin/bitcoin/issues/new
[bcc pulls]: https://github.com/bitcoin/bitcoin/pulls
[bcc tor]: https://en.bitcoin.it/wiki/Tor
[bcc tor hs]: https://en.bitcoin.it/wiki/Tor#Hidden_services
[core github tag]: https://github.com/bitcoin-dot-org/bitcoin.org/labels/Core
[BFGMiner]: https://github.com/luke-jr/bfgminer
[Bitcoin beginners]: http://www.reddit.com/r/bitcoinbeginners
[Bitcoin Core]: https://bitcoin.org/en/download
[Bitcoin Core 0.1.6]: https://github.com/bitcoin/bitcoin/commit/cc0b4c3b62367a2aebe5fc1f4d0ed4b97e9c2ac9
[Bitcoin Core 0.2.9]: https://github.com/bitcoin/bitcoin/commit/42605ce8bcc9bd01b86491c74fee14de77960868
[Bitcoin Core 0.3.11]: https://github.com/bitcoin/bitcoin/commit/343328c6b8db85e58a1feea85f0d10e62967fa19
[Bitcoin Core 0.3.15]: https://github.com/bitcoin/bitcoin/commit/c891967b6fcab2e8dc4ce0c787312b36c07efa4d
[Bitcoin Core 0.3.18]: https://github.com/bitcoin/bitcoin/commit/82201801336f64ee77851b9eaab9383ee4e442f0
[Bitcoin Core build unix]: https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md
[Bitcoin Core docs directory]: https://github.com/bitcoin/bitcoin/tree/master/doc
[bitcoin core fee drop commit]: https://github.com/bitcoin/bitcoin/commit/6a4c196dd64da2fd33dc7ae77a8cdd3e4cf0eff1
[Bitcoin Core issue #2381]: https://github.com/bitcoin/bitcoin/issues/2381
[Bitcoin Core master]: https://github.com/bitcoin/bitcoin
[Bitcoin Core pull #4468]: https://github.com/bitcoin/bitcoin/pull/4468
[Bitcoin core transifex]: https://www.transifex.com/projects/p/bitcoin/
[Bitcoin reddit]: http://www.reddit.com/r/Bitcoin
[Bitcoin reddit new]: http://www.reddit.com/r/Bitcoin/new
[Bitcoin Seeder]: https://github.com/sipa/bitcoin-seeder
[Bitcoin stackexchange]: http://bitcoin.stackexchange.com
[Bitcoin stackexchange tag bitcoin-qt]: http://bitcoin.stackexchange.com/questions/tagged/bitcoin-qt
[bitcoin-documentation mailing list]: https://groups.google.com/forum/#!forum/bitcoin-documentation
[BitcoinJ]: http://bitcoinj.github.io
[BitcoinJ documentation about pending transaction safety]: https://bitcoinj.github.io/security-model#pending-transactions
[bitcoinj micropayment tutorial]: https://bitcoinj.github.io/working-with-micropayments
[block170]: https://live.blockcypher.com/btc/block/00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee/
[casascius address utility]: https://github.com/casascius/Bitcoin-Address-Utility
[core base58.h]: https://github.com/bitcoin/bitcoin/blob/master/src/base58.h
[core chainparams.cpp]: https://github.com/bitcoin/bitcoin/blob/master/src/chainparams.cpp
[core git]: https://github.com/bitcoin/bitcoin
[core paymentrequest.proto]: https://github.com/bitcoin/bitcoin/blob/master/src/qt/paymentrequest.proto
[core script.h]: https://github.com/bitcoin/bitcoin/blob/master/src/script/script.h
[creative commons attribution 3.0 license]: https://creativecommons.org/licenses/by/3.0/
[DER]: https://en.wikipedia.org/wiki/X.690#DER_encoding
[dig command]: https://en.wikipedia.org/wiki/Dig_%28Unix_command%29
[DNS A records]: http://tools.ietf.org/html/rfc1035#section-3.2.2
[DNS Seed Policy]: https://github.com/bitcoin/bitcoin/blob/master/doc/dnsseed-policy.md
[docs issue]: https://github.com/bitcoin-dot-org/bitcoin.org/issues
[ECDSA]: https://en.wikipedia.org/wiki/Elliptic_Curve_DSA
[edit bandwidth sharing guide]: https://github.com/bitcoin-dot-org/bitcoin.org/edit/master/en/full-node.md
[Electrum server]: https://github.com/spesmilo/electrum-server
[Eloipool]: https://github.com/luke-jr/eloipool
[errors in docs]: https://github.com/bitcoin-dot-org/bitcoin.org/issues?q=is%3Aissue+label%3A%22Dev+Docs%22
[fake satoshi transaction]: https://www.reddit.com/r/Bitcoin/comments/3fv42j/blockchaininfo_spoofed_transactions_problem_aug_4/
[forum tech support]: https://bitcointalk.org/index.php?board=4.0
[ghash betcoin double spend]: https://bitcointalk.org/index.php?topic=321630.msg3445371
[gitian sigs]: https://github.com/bitcoin/gitian.sigs
[high-speed block relay network]: https://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg03189.html
[HMAC-SHA512]: https://en.wikipedia.org/wiki/HMAC
[HTTP basic authentication]: https://en.wikipedia.org/wiki/Basic_access_authentication
[HTTP longpoll]: https://en.wikipedia.org/wiki/Push_technology#Long_polling
[information theoretic security]: https://en.wikipedia.org/wiki/Information_theoretic_security
[inherit bitcoins]: http://bitcoin.stackexchange.com/q/38692/21052
[IP-to-IP payment protocol]: https://en.bitcoin.it/wiki/IP_Transactions
[IPv4-mapped IPv6 addresses]: http://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses
[irc channels]: https://en.bitcoin.it/wiki/IRC_channels
[JSON-RPC version 1.0]: http://json-rpc.org/wiki/specification
[JSON-RPC request batching]: http://www.jsonrpc.org/specification#batch
[july 2015 chain forks]: https://en.bitcoin.it/wiki/July_2015_chain_forks
[libblkmaker]: https://github.com/bitcoin/libblkmaker
[localhost]: https://en.wikipedia.org/wiki/Localhost
[lying consistently is hard]: https://groups.google.com/forum/#!msg/bitcoinj/Ys13qkTwcNg/9qxnhwnkeoIJ
[makeseeds script]: https://github.com/bitcoin/bitcoin/tree/master/contrib/seeds
[mozilla's bug reporting documentation]: https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines#Writing_precise_steps_to_reproduce
[murmur3]: https://en.wikipedia.org/wiki/MurmurHash
[man-in-the-middle]: https://en.wikipedia.org/wiki/Man-in-the-middle_attack
[MIME]: https://en.wikipedia.org/wiki/Internet_media_type
[MIT license]: http://opensource.org/licenses/MIT
[mozrootstore]: https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/
[native irc client]: https://en.wikipedia.org/wiki/List_of_IRC_clients
[netcat]: https://en.wikipedia.org/wiki/Netcat
[nop opcodes]: https://en.bitcoin.it/wiki/Script#Reserved_words
[offline transactions]: http://bitcoin.stackexchange.com/a/34122/21052
[open a pull request]: https://github.com/bitcoin-dot-org/bitcoin.org#working-with-github
[open an issue]: https://github.com/bitcoin-dot-org/bitcoin.org/issues/new
[open assets protocol]: https://github.com/OpenAssets/open-assets-protocol/blob/master/specification.mediawiki
[Payment Request Generator]: https://github.com/gavinandresen/paymentrequest/blob/master/php/demo_website/createpaymentrequest.php
[peter todd p2sh example]: https://github.com/petertodd/checklocktimeverify-demos/blob/master/lib/python-bitcoinlib/examples/publish-text.py
[Piotr Piasecki's testnet faucet]: https://tpfaucet.appspot.com/
[prime symbol]: https://en.wikipedia.org/wiki/Prime_%28symbol%29
[protobuf]: https://developers.google.com/protocol-buffers/
[python-bitcoinlib]: https://github.com/petertodd/python-bitcoinlib
[python-blkmaker]: https://gitorious.org/bitcoin/python-blkmaker
[Satoshi Nakamoto]: https://en.bitcoin.it/wiki/Satoshi_Nakamoto
[setup tor]: https://www.torproject.org/
[SHA256]: https://en.wikipedia.org/wiki/SHA-2
[Stratum mining protocol]: http://mining.bitcoin.cz/stratum-mining
[study of SPV privacy over tor]: http://arxiv.org/abs/1410.6079
[Tor]: https://en.wikipedia.org/wiki/Tor_%28anonymity_network%29
[transifex]: https://www.transifex.com/projects/p/bitcoinorg/
[unix epoch time]: https://en.wikipedia.org/wiki/Unix_time
[URI encoded]: https://tools.ietf.org/html/rfc3986
[wiki bitcoin core compatible devices arm]: https://en.bitcoin.it/wiki/Bitcoin_Core_compatible_devices#ARM-based_Chipsets
[wiki bitcoin core documentation]: https://en.bitcoin.it/wiki/Category:Bitcoin_Core_documentation
[wiki create account]: https://en.bitcoin.it/w/index.php?title=Special:UserLogin&type=signup
[wiki enable editing]: https://en.bitcoin.it/wiki/Bitcoin_Wiki:Editing_privileges
[wiki getblocktemplate]: https://en.bitcoin.it/wiki/Getblocktemplate
[wiki proper money handling]: https://en.bitcoin.it/wiki/Proper_Money_Handling_%28JSON-RPC%29
[wiki template bitcoin core documentation]: https://en.bitcoin.it/wiki/Template:Bitcoin_Core_documentation
[wiki script]: https://en.bitcoin.it/wiki/Script
[x509]: https://en.wikipedia.org/wiki/X.509

{% comment %}<!-- Direct links to code; link to a specific commit to prevent code
changes from moving the referenced object, but also update links
periodically to point to recent code. Last update: 2014-11-12 --> {% endcomment %}
[core bloom.cpp hash]: https://github.com/bitcoin/bitcoin/blob/cbf28c6619fe348a258dfd7d08bdbd2392d07511/src/bloom.cpp#L46
[MAX_SIZE]: https://github.com/bitcoin/bitcoin/blob/60abd463ac2eaa8bc1d616d8c07880dc53d97211/src/serialize.h#L23
[rpcprotocol.h]: https://github.com/bitcoin/bitcoin/blob/f914f1a746d7f91951c1da262a4a749dd3ebfa71/src/rpcprotocol.h
