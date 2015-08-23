{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

{% comment %}<!-- Terms; must have tooltip description in "quotes"; alphabetical order -->{% endcomment %}
[bitcoin URI]: /en/developer-guide#term-bitcoin-uri "A URI which allows receivers to encode payment details so spenders don't have to manually enter addresses and other details"
[certificate chain]: /en/developer-examples#term-certificate-chain "A chain of certificates connecting a individual's leaf certificate to the certificate authority's root certificate"
[coinbase block height]: /en/developer-reference#term-coinbase-block-height "The current block's height encoded into the first bytes of the coinbase field"
[data-pushing op code]: https://en.bitcoin.it/wiki/Script#Constants "Any op code from 0x01 to 0x4e which pushes data on to the script evaluation stack"
[fiat]: /en/developer-guide#term-fiat "National currencies such as the dollar or euro"
[intermediate certificate]: /en/developer-examples#term-intermediate-certificate "A intermediate certificate authority certificate which helps connect a leaf (receiver) certificate to a root certificate authority"
[key index]: /en/developer-guide#term-key-index "An index number used in the HD wallet formula to generate child keys from a parent key"
[key pair]: /en/developer-guide#term-key-pair "A private key and its derived public key"
[label]: /en/developer-guide#term-label "The label parameter of a bitcoin: URI which provides the spender with the receiver's name (unauthenticated)"
[leaf certificate]: /en/developer-examples#term-leaf-certificate "The end-node in a certificate chain; in the payment protocol, it is the certificate belonging to the receiver of satoshis"
[merge]: /en/developer-guide#term-merge "Spending, in the same transaction, multiple outputs which can be traced back to different previous spenders, leaking information about how many satoshis you control"
[merge avoidance]: /en/developer-guide#term-merge-avoidance "A strategy for selecting which outputs to spend that avoids merging outputs with different histories that could leak private information"
[message]: /en/developer-guide#term-message "A parameter of bitcoin: URIs which allows the receiver to optionally specify a message to the spender"
[msg_tx]: /en/developer-reference#term-msg_tx "The TXID data type identifier of an inventory on the P2P network"
[msg_block]: /en/developer-reference#term-msg_block "The block header hash data type identifier of an inventory on the P2P network"
[msg_filtered_block]: /en/developer-reference#term-msg_block "An alternative to the block header hash data type identifier of an inventory on the P2P network used to request a merkle block"
[network]: /en/developer-guide#term-network "The Bitcoin P2P network which broadcasts transactions and blocks"
[op_checkmultisig]: /en/developer-reference#term-op-checkmultisig "Op code which returns true if one or more provided signatures (m) sign the correct parts of a transaction and match one or more provided public keys (n)"
[op_checksig]: /en/developer-reference#term-op-checksig "Op code which returns true if a signature signs the correct parts of a transaction and matches a provided public key"
[op_dup]: /en/developer-reference#term-op-dup "Operation which duplicates the entry below it on the stack"
[op_equal]: /en/developer-reference#term-op-equal "Operation which returns true if the two entries below it on the stack are equivalent"
[op_equalverify]: /en/developer-reference#term-op-equalverify "Operation which terminates the script in failure unless the two entries below it on the stack are equivalent"
[op_hash160]: /en/developer-reference#term-op-hash160 "Operation which converts the entry below it on the stack into a RIPEMD(SHA256()) hashed version of itself"
[op_return]: /en/developer-reference#term-op-return "Operation which terminates the script in failure"
[op_verify]: /en/developer-reference#term-op-verify "Operation which terminates the script if the entry below it on the stack is non-true (zero)"
[output index]: /en/developer-guide#term-output-index "The sequentially-numbered index of outputs in a single transaction starting from 0"
[PaymentDetails]: /en/developer-examples#term-paymentdetails "The PaymentDetails of the payment protocol which allows the receiver to specify the payment details to the spender"
[PaymentRequest]: /en/developer-examples#term-paymentrequest "The PaymentRequest of the payment protocol which contains and allows signing of the PaymentDetails"
[PaymentRequests]: /en/developer-examples#term-paymentrequest "The PaymentRequest of the payment protocol which contains and allows signing of the PaymentDetails"
[peer]: /en/developer-guide#term-peer "Peer on the P2P network who receives and broadcasts transactions and blocks"
[peers]: /en/developer-guide#term-peer "Peers on the P2P network who receive and broadcast transactions and blocks"
[PKI]: /en/developer-examples#term-pki "Public Key Infrastructure; usually meant to indicate the X.509 certificate system used for HTTP Secure (https)."
[point function]: /en/developer-guide#term-point-function "The ECDSA function used to create a public key from a private key"
[pp amount]: /en/developer-examples#term-pp-amount "Part of the Output part of the PaymentDetails part of a payment protocol where receivers can specify the amount of satoshis they want paid to a particular pubkey script"
[pp expires]: /en/developer-examples#term-pp-expires "The expires field of a PaymentDetails where the receiver tells the spender when the PaymentDetails expires"
[pp memo]: /en/developer-examples#term-pp-memo "The memo fields of PaymentDetails, Payment, and PaymentACK which allow spenders and receivers to send each other memos"
[pp merchant data]: /en/developer-examples#term-pp-merchant-data "The merchant_data part of PaymentDetails and Payment which allows the receiver to send arbitrary data to the spender in PaymentDetails and receive it back in Payments"
[pp PKI data]: /en/developer-examples#term-pp-pki-data "The pki_data field of a PaymentRequest which provides details such as certificates necessary to validate the request"
[pp pki type]: /en/developer-examples#term-pp-pki-type "The PKI field of a PaymentRequest which tells spenders how to validate this request as being from a specific recipient"
[pp script]: /en/developer-examples#term-pp-script "The script field of a PaymentDetails where the receiver tells the spender what pubkey scripts to pay"
[previous block header hash]: /en/developer-reference#term-previous-block-header-hash "A field in the block header which contains the SHA256(SHA256()) hash of the previous block's header"
[proper money handling]: /en/developer-reference#term-proper-money-handling "Bitcoin amounts need to be correctly processed without introducing rounding errors that could cause monetary loss"
[r]: /en/developer-guide#term-r-parameter "The payment request parameter in a bitcoin: URI"
[receipt]: /en/developer-guide#term-receipt "A cryptographically-verifiable receipt created using parts of a payment request and a confirmed transaction"
[recurrent rebilling]: /en/developer-guide#rebilling-recurring-payments "Billing a spender on a regular schedule"
[refund]: /en/developer-guide#issuing-refunds "A transaction which refunds some or all satoshis received in a previous transaction"
[root certificate]: /en/developer-examples#term-root-certificate "A certificate belonging to a certificate authority (CA)"
[ssl signature]: /en/developer-examples#term-ssl-signature "Signatures created and recognized by major SSL implementations such as OpenSSL"
[standard block relay]: /en/developer-guide#term-standard-block-relay "The regular block relay method: announcing a block with an inv message and waiting for a response"
[transaction]: /en/developer-guide#transactions "A transaction spending satoshis"
[transaction version number]: /en/developer-guide#term-transaction-version-number "A version number prefixed to transactions to allow upgrading""
[transactions]: /en/developer-guide#transactions "A transaction spending satoshis"
[unencrypted wallet]: /en/developer-reference#encryptwallet "A wallet that has not been encrypted with the encryptwallet RPC"
[unique addresses]: /en/developer-guide#term-unique-address "Address which are only used once to protect privacy and increase security"
[unlocked wallet]: /en/developer-reference#walletpassphrase "An encrypted wallet that has been unlocked with the walletpassphrase RPC"
[unsolicited block push]: /en/developer-guide#term-unsolicited-block-push "When a miner sends a block message without sending an inv message first"
[URI QR Code]: /en/developer-guide#term-uri-qr-code "A QR code containing a bitcoin: URI"
[v2 block]: /en/developer-reference#term-v2-block "The current version of Bitcoin blocks"
[verified payments]: /en/developer-guide#verifying-payment "Payments which the receiver believes won't be double spent"
[wallet support]: /en/developer-reference#term-wallet-support "A Bitcoin Core ./configure option that enables (default) or disables the wallet"

{% comment %}<!-- RPCs; alphabetical order -->{% endcomment %}
[rpc addmultisigaddress]: /en/developer-reference#addmultisigaddress
[rpc addnode]: /en/developer-reference#addnode
[rpc backupwallet]: /en/developer-reference#backupwallet
[rpc createmultisig]: /en/developer-reference#createmultisig
[rpc createrawtransaction]: /en/developer-reference#createrawtransaction
[rpc decoderawtransaction]: /en/developer-reference#decoderawtransaction
[rpc decodescript]: /en/developer-reference#decodescript
[rpc dumpprivkey]: /en/developer-reference#dumpprivkey
[rpc dumpwallet]: /en/developer-reference#dumpwallet
[rpc encryptwallet]: /en/developer-reference#encryptwallet
[rpc estimatefee]: /en/developer-reference#estimatefee
[rpc estimatepriority]: /en/developer-reference#estimatepriority
[rpc generate]: /en/developer-reference#generate
[rpc getaccount]: /en/developer-reference#getaccount
[rpc getaccountaddress]: /en/developer-reference#getaccountaddress
[rpc getaddednodeinfo]: /en/developer-reference#getaddednodeinfo
[rpc getaddressesbyaccount]: /en/developer-reference#getaddressesbyaccount
[rpc getbalance]: /en/developer-reference#getbalance
[rpc getbestblockhash]: /en/developer-reference#getbestblockhash
[rpc getblock]: /en/developer-reference#getblock
[rpc getblockchaininfo]: /en/developer-reference#getblockchaininfo
[rpc getblockcount]: /en/developer-reference#getblockcount
[rpc getblockhash]: /en/developer-reference#getblockhash
[rpc getblocktemplate]: /en/developer-reference#getblocktemplate
[rpc getchaintips]: /en/developer-reference#getchaintips
[rpc getconnectioncount]: /en/developer-reference#getconnectioncount
[rpc getdifficulty]: /en/developer-reference#getdifficulty
[rpc getgenerate]: /en/developer-reference#getgenerate
[rpc gethashespersec]: /en/developer-reference#gethashespersec
[rpc getinfo]: /en/developer-reference#getinfo
[rpc getmempoolinfo]: /en/developer-reference#getmempoolinfo
[rpc getmininginfo]: /en/developer-reference#getmininginfo
[rpc getnettotals]: /en/developer-reference#getnettotals
[rpc getnetworkhashps]: /en/developer-reference#getnetworkhashps
[rpc getnetworkinfo]: /en/developer-reference#getnetworkinfo
[rpc getnewaddress]: /en/developer-reference#getnewaddress
[rpc getpeerinfo]: /en/developer-reference#getpeerinfo
[rpc getrawchangeaddress]: /en/developer-reference#getrawchangeaddress
[rpc getrawmempool]: /en/developer-reference#getrawmempool
[rpc getrawtransaction]: /en/developer-reference#getrawtransaction
[rpc getreceivedbyaccount]: /en/developer-reference#getreceivedbyaccount
[rpc getreceivedbyaddress]: /en/developer-reference#getreceivedbyaddress
[rpc gettransaction]: /en/developer-reference#gettransaction
[rpc gettxout]: /en/developer-reference#gettxout
[rpc gettxoutproof]: /en/developer-reference#gettxoutproof
[rpc gettxoutsetinfo]: /en/developer-reference#gettxoutsetinfo
[rpc getunconfirmedbalance]: /en/developer-reference#getunconfirmedbalance
[rpc getwalletinfo]: /en/developer-reference#getwalletinfo
[rpc getwork]: /en/developer-reference#getwork
[rpc help]: /en/developer-reference#help
[rpc importaddress]: /en/developer-reference#importaddress
[rpc importprivkey]: /en/developer-reference#importprivkey
[rpc importwallet]: /en/developer-reference#importwallet
[rpc keypoolrefill]: /en/developer-reference#keypoolrefill
[rpc listaccounts]: /en/developer-reference#listaccounts
[rpc listaddressgroupings]: /en/developer-reference#listaddressgroupings
[rpc listlockunspent]: /en/developer-reference#listlockunspent
[rpc listreceivedbyaccount]: /en/developer-reference#listreceivedbyaccount
[rpc listreceivedbyaddress]: /en/developer-reference#listreceivedbyaddress
[rpc listsinceblock]: /en/developer-reference#listsinceblock
[rpc listtransactions]: /en/developer-reference#listtransactions
[rpc listunspent]: /en/developer-reference#listunspent
[rpc lockunspent]: /en/developer-reference#lockunspent
[rpc move]: /en/developer-reference#move
[rpc ping]: /en/developer-reference#ping-rpc
[rpc prioritisetransaction]: /en/developer-reference#prioritisetransaction
[rpc sendfrom]: /en/developer-reference#sendfrom
[rpc sendmany]: /en/developer-reference#sendmany
[rpc sendrawtransaction]: /en/developer-reference#sendrawtransaction
[rpc sendtoaddress]: /en/developer-reference#sendtoaddress
[rpc setaccount]: /en/developer-reference#setaccount
[rpc setgenerate]: /en/developer-reference#setgenerate
[rpc settxfee]: /en/developer-reference#settxfee
[rpc signmessage]: /en/developer-reference#signmessage
[rpc signrawtransaction]: /en/developer-reference#signrawtransaction
[rpc stop]: /en/developer-reference#stop
[rpc submitblock]: /en/developer-reference#submitblock
[rpc validateaddress]: /en/developer-reference#validateaddress
[rpc verifychain]: /en/developer-reference#verifychain
[rpc verifymessage]: /en/developer-reference#verifymessage
[rpc verifytxoutproof]: /en/developer-reference#verifytxoutproof
[rpc walletlock]: /en/developer-reference#walletlock
[rpc walletpassphrase]: /en/developer-reference#walletpassphrase
[rpc walletpassphrasechange]: /en/developer-reference#walletpassphrasechange

{% comment %}<!-- REST requests; alphabetical order -->{% endcomment %}
[rest get block]: /en/developer-reference#get-block
[rest get block-notxdetails]: /en/developer-reference#get-blocknotxdetails
[rest get tx]: /en/developer-reference#get-tx

{% comment %}<!-- P2P protocol messages; alphabetical order -->{% endcomment %}
[addr message]: /en/developer-reference#addr "The P2P network message which relays IP addresses and port numbers of active nodes to other nodes and clients, allowing decentralized peer discovery."
[alert message]: /en/developer-reference#alert "The P2P network message which sends alerts in case of major software problems."
[block message]: /en/developer-reference#block "The P2P network message which sends a serialized block"
[filteradd message]: /en/developer-reference#filteradd "A P2P protocol message used to add a data element to an existing bloom filter."
[filterclear message]: /en/developer-reference#filterclear "A P2P protocol message used to remove an existing bloom filter."
[filterload message]: /en/developer-reference#filterclear "A P2P protocol message used to send a filter to a remote peer, requesting that they only send transactions which match the filter."
[getaddr message]: /en/developer-reference#getaddr "A P2P protool message used to request an addr message containing connection information for other nodes"
[getblocks message]: /en/developer-reference#getblocks "A P2P protocol message used to request an inv message containing a range of block header hashes"
[getdata message]: /en/developer-reference#getdata "A P2P protocol message used to request one or more transactions, blocks, or merkle blocks"
[getheaders message]: /en/developer-reference#getheaders "A P2P protocol message used to request a range of block headers"
[headers message]: /en/developer-reference#headers "A P2P protocol message containing one or more block headers"
[inv message]: /en/developer-reference#inv "A P2P protocol message used to send inventories of transactions and blocks known to the transmitting peer"
[mempool message]: /en/developer-reference#mempool "A P2P protocol message used to request one or more inv messages with currently-unconfirmed transactions"
[merkleblock message]: /en/developer-reference#merkleblock "A P2P protocol message used to request a filtered block useful for SPV proofs"
[notfound message]: /en/developer-reference#notfound "A P2P protocol message sent to indicate that the requested data was not available"
[ping message]: /en/developer-reference#ping "A P2P network message used to see if the remote host is still connected"
[pong message]: /en/developer-reference#pong "A P2P network message used to reply to a P2P network ping message"
[reject message]: /en/developer-reference#reject "A P2P network message used to indicate a previously-received message was rejected for some reason"
[tx message]: /en/developer-reference#tx "A P2P protocol message which sends a single serialized transaction"
[verack message]: /en/developer-reference#verack "A P2P network message sent in reply to a version message to confirm a connection has been established"
[version message]: /en/developer-reference#version "A P2P network message sent at the begining of a connection to allow protocol version negotiation"
{% comment %}<!-- Other internal site links; alphabetical order -->{% endcomment %}
[Bitcoin Core 0.6.0]: /en/release/v0.6.0
[Bitcoin Core 0.6.1]: /en/release/v0.6.1
[Bitcoin Core 0.7.0]: /en/release/v0.7.0
[Bitcoin Core 0.8.0]: /en/release/v0.8.0
[Bitcoin Core 0.9.0]: /en/release/v0.9.0
[Bitcoin Core 0.9.1]: /en/release/v0.9.1
[Bitcoin Core 0.9.2]: /en/release/v0.9.2
[Bitcoin Core 0.9.3]: /en/release/v0.9.3
{% comment %}<!-- TODOv0.10 update this to point to 0.10 release notes when released -->{% endcomment %}
[Bitcoin Core 0.10.0]: https://github.com/bitcoin/bitcoin/tree/0.10
[bitcoin URI subsection]: /en/developer-guide#bitcoin-uri
[bitcoind initial setup]: /en/developer-examples
[bitcoinpdf]: https://bitcoin.org/en/bitcoin-paper
[core executable]: /en/download
[dev communities]: /en/development#devcommunities
[devex complex raw transaction]: /en/developer-examples#complex-raw-transaction
[devex payment protocol]: /en/developer-examples#payment-protocol
[devexamples]: /en/developer-examples
[devguide]: /en/developer-guide
[devguide avoiding key reuse]: /en/developer-guide#avoiding-key-reuse
[devguide hardened keys]: /en/developer-guide#hardened-keys
[devguide payment processing]: /en/developer-guide#payment-processing
[devguide wallets]: /en/developer-guide#wallets
[devref wallets]: /en/developer-reference#wallets
[locktime parsing rules]: /en/developer-guide#locktime_parsing_rules
[Merge Avoidance subsection]: /en/developer-guide#merge-avoidance
[micropayment channel]: /en/developer-guide#term-micropayment-channel
[not a specification]: /en/developer-reference#not-a-specification
[raw transaction format]: /en/developer-reference#raw-transaction-format
[RPC]: /en/developer-reference#remote-procedure-calls-rpcs
[RPCs]: /en/developer-reference#remote-procedure-calls-rpcs
[section block chain]: /en/developer-guide#block-chain
[section block header]: /en/developer-reference#block-headers
[section block versions]: /en/developer-reference#block-versions
[section creating a bloom filter]: /en/developer-examples#creating-a-bloom-filter
[section compactSize unsigned integer]: /en/developer-reference#compactsize-unsigned-integers
[section detecting forks]: /en/developer-guide#detecting-forks
[section getblocktemplate]: /en/developer-guide#getblocktemplate-rpc
[section hash byte order]: /en/developer-reference#hash-byte-order
[section merkle trees]: /en/developer-reference#merkle-trees
[section merkleblock example]: /en/developer-examples#parsing-a-merkleblock
[section message header]: /en/developer-reference#message-headers
[section p2p reference]: /en/developer-reference#p2p-network
[section protocol versions]: /en/developer-reference#protocol-versions
[section rpc quick reference]: /en/developer-reference#rpc-quick-reference
[section serialized blocks]: /en/developer-reference#serialized-blocks
[section simple raw transaction]: /en/developer-examples#simple-raw-transaction
[section verifying payment]: /en/developer-guide#verifying-payment
[signature script modification warning]: /en/developer-reference#signature_script_modification_warning
[v0.8 chain fork]: /en/alert/2013-03-11-chain-fork
[Verification subsection]: /en/developer-guide#verifying-payment
[X509Certificates]: /en/developer-examples#term-x509certificates

{% comment %}<!-- Official reference documents (BIPs should not use zero padding:
     BIP32 not BIP0032); alphabetical order -->{% endcomment %}
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
[BIP61]: https://github.com/bitcoin/bips/blob/master/bip-0061.mediawiki
[BIP62]: https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki
[BIP66]: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
[BIP70]: https://github.com/bitcoin/bips/blob/master/bip-0070.mediawiki
[BIP71]: https://github.com/bitcoin/bips/blob/master/bip-0071.mediawiki
[BIP72]: https://github.com/bitcoin/bips/blob/master/bip-0072.mediawiki
[CVE-2012-2459]: https://en.bitcoin.it/wiki/CVEs#CVE-2012-2459
[RFC5737]: http://tools.ietf.org/html/rfc5737
[secp256k1]: http://www.secg.org/sec2-v2.pdf

{% comment %}<!-- Other external site links; alphabetical order -->{% endcomment %}
[BFGMiner]: https://github.com/luke-jr/bfgminer
[Bitcoin Core]: https://bitcoin.org/en/download
[Bitcoin Core 0.1.6]: https://github.com/bitcoin/bitcoin/commit/cc0b4c3b62367a2aebe5fc1f4d0ed4b97e9c2ac9
[Bitcoin Core 0.2.9]: https://github.com/bitcoin/bitcoin/commit/42605ce8bcc9bd01b86491c74fee14de77960868
[Bitcoin Core 0.3.11]: https://github.com/bitcoin/bitcoin/commit/343328c6b8db85e58a1feea85f0d10e62967fa19
[Bitcoin Core 0.3.15]: https://github.com/bitcoin/bitcoin/commit/c891967b6fcab2e8dc4ce0c787312b36c07efa4d
[Bitcoin Core 0.3.18]: https://github.com/bitcoin/bitcoin/commit/82201801336f64ee77851b9eaab9383ee4e442f0
[bitcoin core fee drop commit]: https://github.com/bitcoin/bitcoin/commit/6a4c196dd64da2fd33dc7ae77a8cdd3e4cf0eff1
[Bitcoin Core issue #2381]: https://github.com/bitcoin/bitcoin/issues/2381
[Bitcoin Core master]: https://github.com/bitcoin/bitcoin
[Bitcoin Core pull #4468]: https://github.com/bitcoin/bitcoin/pull/4468
[Bitcoin Seeder]: https://github.com/sipa/bitcoin-seeder
[bitcoin-documentation mailing list]: https://groups.google.com/forum/#!forum/bitcoin-documentation
[BitcoinJ]: http://bitcoinj.github.io
[bitcoinj micropayment tutorial]: https://bitcoinj.github.io/working-with-micropayments
[block170]: https://www.biteasy.com/block/00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee
[casascius address utility]: https://github.com/casascius/Bitcoin-Address-Utility
[core alert.cpp]: https://github.com/bitcoin/bitcoin/blob/master/src/alert.cpp
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
[Electrum server]: https://github.com/spesmilo/electrum-server
[Eloipool]: https://github.com/luke-jr/eloipool
[errors in docs]: https://github.com/bitcoin-dot-org/bitcoin.org/issues?q=is%3Aissue+label%3A%22Dev+Docs%22
[forum tech support]: https://bitcointalk.org/index.php?board=4.0
[high-speed block relay network]: https://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg03189.html
[HMAC-SHA512]: https://en.wikipedia.org/wiki/HMAC
[HTTP JSON-RPC version 1.0]: https://en.wikipedia.org/wiki/JSON-RPC
[HTTP longpoll]: https://en.wikipedia.org/wiki/Push_technology#Long_polling
[IP-to-IP payment protocol]: https://en.bitcoin.it/wiki/IP_Transactions
[IPv4-mapped IPv6 addresses]: http://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses
[irc channels]: https://en.bitcoin.it/wiki/IRC_channels
[libblkmaker]: https://github.com/bitcoin/libblkmaker
[makeseeds script]: https://github.com/bitcoin/bitcoin/tree/master/contrib/seeds
[murmur3]: https://en.wikipedia.org/wiki/MurmurHash
[man-in-the-middle]: https://en.wikipedia.org/wiki/Man-in-the-middle_attack
[MIME]: https://en.wikipedia.org/wiki/Internet_media_type
[mozrootstore]: https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/
[netcat]: https://en.wikipedia.org/wiki/Netcat
[Payment Request Generator]: http://bitcoincore.org/~gavin/createpaymentrequest.php
[Piotr Piasecki's testnet faucet]: https://tpfaucet.appspot.com/
[prime symbol]: https://en.wikipedia.org/wiki/Prime_%28symbol%29
[protobuf]: https://developers.google.com/protocol-buffers/
[python-bitcoinlib]: https://github.com/petertodd/python-bitcoinlib
[python-blkmaker]: https://gitorious.org/bitcoin/python-blkmaker
[SHA256]: https://en.wikipedia.org/wiki/SHA-2
[Stratum mining protocol]: http://mining.bitcoin.cz/stratum-mining
[Tor]: https://en.wikipedia.org/wiki/Tor_%28anonymity_network%29
[unix epoch time]: https://en.wikipedia.org/wiki/Unix_time
[URI encoded]: https://tools.ietf.org/html/rfc3986
[wiki getblocktemplate]: https://en.bitcoin.it/wiki/Getblocktemplate
[wiki proper money handling]: https://en.bitcoin.it/wiki/Proper_Money_Handling_%28JSON-RPC%29
[wiki script]: https://en.bitcoin.it/wiki/Script
[x509]: https://en.wikipedia.org/wiki/X.509

{% comment %}<!-- Direct links to code; link to a specific commit to prevent code
changes from moving the referenced object, but also update links
periodically to point to recent code. Last update: 2014-11-12 --> {% endcomment %}
[core bloom.cpp hash]: https://github.com/bitcoin/bitcoin/blob/cbf28c6619fe348a258dfd7d08bdbd2392d07511/src/bloom.cpp#L46
[MAX_SIZE]: https://github.com/bitcoin/bitcoin/blob/60abd463ac2eaa8bc1d616d8c07880dc53d97211/src/serialize.h#L23
[rpcprotocol.h]: https://github.com/bitcoin/bitcoin/blob/f914f1a746d7f91951c1da262a4a749dd3ebfa71/src/rpcprotocol.h
