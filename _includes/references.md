{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

<!-- Terms; must have tooltip description in "quotes"; alphabetical order -->
[51 percent attack]: /en/developer-guide#term-51-attack "The ability of someone controlling a majority of hashing power to revise transactions history and prevent new transactions from confirming"
[addr message]: /en/developer-reference#alert "The P2P network message which relays IP addresses and port numbers of active nodes to other nodes and clients, allowing decentralized peer discovery."
[addresses]: /en/developer-guide#term-address "A 20-byte hash formatted as a P2PKH or P2SH Bitcoin Address"
[address]: /en/developer-guide#term-address "A 20-byte hash formatted as a P2PKH or P2SH Bitcoin Address"
[alert message]: /en/developer-reference#alert "The P2P network message which sends alerts in case of major software problems."
[base58Check]: /en/developer-reference#term-base58check "The method used in Bitcoin for converting 160-bit hashes into Bitcoin addresses"
[bitcoin URI]: /en/developer-guide#term-bitcoin-uri "A URI which allows receivers to encode payment details so spenders don't have to manually enter addresses and other details"
[bitcoins]: /en/developer-guide#term-bitcoins "A primary accounting unit used in Bitcoin; 100 million satoshis"
[bits]: /en/developer-guide#term-bits "0.000001 bitcoins (100 satoshis)"
[block]: /en/developer-guide#term-block "A block of transactions protected by proof of work"
[blocks]: /en/developer-guide#term-block "Blocks of transactions protected by proof of work"
[block chain]: /en/developer-guide#block-chain "A chain of blocks with each block linking to the block that preceded; the most-difficult-to-recreate chain is The Block Chain"
[block header]: /en/developer-reference#block-headers "An 80-byte header belonging to a single block which is hashed repeatedly to create proof of work"
[block height]: /en/developer-guide#term-block-height "The number of chained blocks preceding this block"
[block message]: /en/developer-reference#block "The P2P network message which sends a serialized block"
[block reward]: /en/developer-reference#term-block-reward "New satoshis given to a miner for creating one of the first 6,929,999 blocks"
[block time]: /en/developer-reference#term-block-time "The time field in the block header"
[block version]: /en/developer-reference#term-block-version "The version field in the block header"
[broadcast]: /en/developer-guide#transaction-broadcasting "Sending transactions or blocks to all other peers on the Bitcoin network (compare to privately transmitting to a single peer or partner"
[broadcasts]: /en/developer-guide#transaction-broadcasting "Sending transactions or blocks to all other peers on the Bitcoin network (compare to privately transmitting to a single peer or partner"
[broadcasting]: /en/developer-guide#transaction-broadcasting "Sending transactions or blocks to all other peers on the Bitcoin network (compare to privately transmitting to a single peer or partner)"
[certificate chain]: /en/developer-examples#term-certificate-chain "A chain of certificates connecting a individual's leaf certificate to the certificate authority's root certificate"
[chain code]: /en/developer-guide#term-chain-code "In HD wallets, 256 bits of entropy added to the master public and private keys to help them generate secure child keys; the chain code is usually derived from a seed along with the master private key"
[change address]: /en/developer-guide#term-change-output "An output used by a spender to send back to himself some of the satoshis from the inputs"
[change output]: /en/developer-guide#term-change-output "An output used by a spender to send back to himself some of the satoshis from the inputs"
[child key]: /en/developer-guide#term-child-key "In HD wallets, a key derived from a parent key"
[child public key]: /en/developer-guide#term-child-public-key "In HD wallets, a public key derived from a parent public key or a corresponding child private key"
[coinbase block height]: /en/developer-reference#term-coinbase-block-height "The current block's height encoded into the first bytes of the coinbase field"
[coinbase field]: /en/developer-reference#term-coinbase-field "A special input-like field for coinbase transactions"
[coinbase transaction]: /en/developer-reference#term-coinbase-tx "A special transaction which miners must create when they generate a block"
[compactsize unsigned integer]: /en/developer-reference#compactsize-unsigned-integers "A type of variable-length integer"
[confirm]: /en/developer-guide#term-confirmation "A transaction included in a block currently on the block chain"
[confirmed]: /en/developer-guide#term-confirmation "A transaction included in a block currently on the block chain"
[confirmed transactions]: /en/developer-guide#term-confirmation "Transactions included in a block currently on the block chain"
[confirmation]: /en/developer-guide#term-confirmation "The number of blocks which would need to be modified to remove or modify a transaction"
[confirmations]: /en/developer-guide#term-confirmation "The number of blocks which would need to be modified to remove or modify a transaction"
[consensus]: /en/developer-guide#term-consensus "When several nodes (usually most nodes on the network) all have the same blocks in their locally-validated block chain."
[consensus rules]: /en/developer-guide#term-consensus-rules "The block validation rules that full nodes follow to stay in consensus with other nodes."
[data-pushing op code]: https://en.bitcoin.it/wiki/Script#Constants "Any op code from 0x01 to 0x4e which pushes data on to the script evaluation stack"
[denomination]: /en/developer-guide#term-denomination "bitcoins (BTC), bitcents (cBTC), millibitcoins (mBTC), bits (uBTC, microbitcoins), or satoshis"
[difficulty]: /en/developer-guide#term-difficulty "A number corresponding to the target threshold which indicates how difficult it will be to find the next block"
[dns seed]: /en/developer-guide#term-dns-seed "A DNS server which returns IP addresses of full nodes on the Bitcoin network to assist in peer discovery."
[double spend]: /en/developer-guide#term-double-spend "Attempting to spend the same satoshis which were spent in a previous transaction"
[extended key]: /en/developer-guide#term-extended-key "A public or private key extended with the chain code to allow them to derive child keys"
[extended private key]: /en/developer-guide#term-extended-private-key "A private key extended with the chain code so that it can derive child private keys"
[extended public key]: /en/developer-guide#term-extended-public-key "A public key extended with the chain code so that it can derive child public keys"
[escrow contract]: /en/developer-guide#term-escrow-contract "A contract in which the spender and receiver store satoshis in a multisig output until both parties agree to release the satoshis"
[fiat]: /en/developer-guide#term-fiat "National currencies such as the dollar or euro"
[filteradd message]: /en/developer-reference#filteradd "A P2P protocol message used to add a data element to an existing bloom filter."
[filterclear message]: /en/developer-reference#filterclear "A P2P protocol message used to remove an existing bloom filter."
[filterload message]: /en/developer-reference#filterclear "A P2P protocol message used to send a filter to a remote peer, requesting that they only send transactions which match the filter."
[fork]: /en/developer-guide#term-fork "When two or more blocks have the same block height, forking the block chain."
[genesis block]: /en/developer-guide#term-genesis-block "The first block created; also called block 0"
[getaddr message]: /en/developer-reference#getaddr "A P2P protool message used to request an addr message containing connection information for other nodes"
[getblocks message]: /en/developer-reference#getblocks "A P2P protocol message used to request an inv message containing a range of block header hashes"
[getdata message]: /en/developer-reference#getdata "A P2P protocol message used to request one or more transactions, blocks, or merkle blocks"
[getheaders message]: /en/developer-reference#getheaders "A P2P protocol message used to request a range of block headers"
[hard fork]: /en/developer-guide#term-hard-fork "A permanent divergence in the the block chain, commonly occurs when non-upgraded nodes can't validate blocks created by upgraded nodes following newer consensus rules."
[hardened extended private key]: /en/developer-guide#term-hardened-extended-private-key "A private key whose corresponding public key cannot derive child keys"
[HD protocol]: /en/developer-guide#term-hd-protocol "The Hierarchical Deterministic (HD) key creation and transfer protocol"
[headers message]: /en/developer-reference#headers "A P2P protocol message containing one or more block headers"
[high-priority transactions]: /en/developer-guide#term-high-priority-transactions "Transactions which don't pay a transaction fee; only transactions spending long-idle outputs are eligible"
[input]: /en/developer-guide#term-input "The input to a transaction linking to the output of a previous transaction which permits spending of satoshis"
[inputs]: /en/developer-guide#term-input "The input to a transaction linking to the output of a previous transaction which permits spending of satoshis"
[intermediate certificate]: /en/developer-examples#term-intermediate-certificate "A intermediate certificate authority certificate which helps connect a leaf (receiver) certificate to a root certificate authority"
[internal byte order]: /en/developer-reference#hash-byte-order "The standard order in which hash digests are displayed as strings---the same format used in blocks"
[inv message]: /en/developer-reference#inv "A P2P protocol message used to send inventories of transactions and blocks known to the transmitting peer"
[inventory]: /en/developer-reference#term-inventory "A data type identifier and a hash; used to identify transactions and blocks available for download through the P2P network."
[key index]: /en/developer-guide#term-key-index "An index number used in the HD wallet formula to generate child keys from a parent key"
[key pair]: /en/developer-guide#term-key-pair "A private key and its derived public key"
[label]: /en/developer-guide#term-label "The label parameter of a bitcoin: URI which provides the spender with the receiver's name (unauthenticated)"
[leaf certificate]: /en/developer-examples#term-leaf-certificate "The end-node in a certificate chain; in the payment protocol, it is the certificate belonging to the receiver of satoshis"
[locktime]: /en/developer-guide#term-locktime "Part of a transaction which indicates the earliest time or earliest block when that transaction can be added to the block chain"
[long-term fork]: /en/developer-guide#term-long-term-fork "When a series of blocks have corresponding block heights, indicating a possibly serious problem"
[mainnet]: /en/developer-examples#term-mainnet "The Bitcoin main network used to transfer satoshis (compare to testnet, the test network)"
[master chain code]: /en/developer-guide#term-master-chain-code "The chain code derived from the root seed"
[master private key]: /en/developer-guide#term-master-private-key "A private key derived from the root seed"
[mempool message]: /en/developer-reference#mempool "A P2P protocol message used to request one or more inv messages with currently-unconfirmed transactions"
[merge]: /en/developer-guide#term-merge "Spending, in the same transaction, multiple outputs which can be traced back to different previous spenders, leaking information about how many satoshis you control"
[merge avoidance]: /en/developer-guide#term-merge-avoidance "A strategy for selecting which outputs to spend that avoids merging outputs with different histories that could leak private information"
[merkle block]: /en/developer-reference#merkleblock "A partial merkle tree connecting transactions matching a bloom filter to the merkle root of a block"
[merkle root]: /en/developer-guide#term-merkle-root "The root node of a merkle tree descended from all the hashed pairs in the tree"
[merkle tree]: /en/developer-guide#term-merkle-tree "A tree constructed by hashing paired data, then pairing and hashing the results until a single hash remains, the merkle root"
[merkleblock message]: /en/developer-reference#merkleblock "A P2P protocol message used to request a filtered block useful for SPV proofs"
[message]: /en/developer-guide#term-message "A parameter of bitcoin: URIs which allows the receiver to optionally specify a message to the spender"
[message header]: /en/developer-reference#message-headers "The four header fields prefixed to all messages on the P2P network"
[millibitcoins]: /en/developer-guide#term-millibitcoins "0.001 bitcoins (100,000 satoshis)"
[mine]: /en/developer-guide#term-miner "Creating Bitcoin blocks which solve proof-of-work puzzles in exchange for block rewards and transaction fees"
[miner]: /en/developer-guide#term-miner "Creators of Bitcoin blocks who solve proof-of-work puzzles in exchange for block rewards and transaction fees"
[miners]: /en/developer-guide#term-miner "Creators of Bitcoin blocks who solve proof-of-work puzzles in exchange for block rewards and transaction fees"
[minimum fee]: /en/developer-guide#term-minimum-fee "The minimum fee a transaction must pay in most circumstances to be mined or broadcast by peers across the network"
[msg_tx]: /en/developer-reference#term-msg_tx "The TXID data type identifier of an inventory on the P2P network"
[msg_block]: /en/developer-reference#term-msg_block "The block header hash data type identifier of an inventory on the P2P network"
[msg_filtered_block]: /en/developer-reference#term-msg_block "An alternative to the block header hash data type identifier of an inventory on the P2P network used to request a merkle block"
[multisig]: /en/developer-guide#term-multisig "An pubkey script using OP_CHECKMULTISIG to check for multiple signatures"
[nbits]: /en/developer-reference#target-nbits "The encoded form of the target threshold as it appears in the block header"
[network]: /en/developer-guide#term-network "The Bitcoin P2P network which broadcasts transactions and blocks"
[notfound message]: /en/developer-reference#notfound "A P2P protocol message sent to indicate that the requested data was not available"
[Null data]: /en/developer-guide#term-null-data "A standard transaction type which allows adding 40 bytes of arbitrary data to the block chain up to once per transaction"
[op_checkmultisig]: /en/developer-reference#term-op-checkmultisig "Op code which returns true if one or more provided signatures (m) sign the correct parts of a transaction and match one or more provided public keys (n)"
[op_checksig]: /en/developer-reference#term-op-checksig "Op code which returns true if a signature signs the correct parts of a transaction and matches a provided public key"
[op code]: /en/developer-reference#op-codes "Operation codes which push data or run functions within a pubkey script or signature script"
[op_dup]: /en/developer-reference#term-op-dup "Operation which duplicates the entry below it on the stack"
[op_equal]: /en/developer-reference#term-op-equal "Operation which returns true if the two entries below it on the stack are equivalent"
[op_equalverify]: /en/developer-reference#term-op-equalverify "Operation which terminates the script in failure unless the two entries below it on the stack are equivalent"
[op_hash160]: /en/developer-reference#term-op-hash160 "Operation which converts the entry below it on the stack into a RIPEMD(SHA256()) hashed version of itself"
[op_return]: /en/developer-reference#term-op-return "Operation which terminates the script in failure"
[op_verify]: /en/developer-reference#term-op-verify "Operation which terminates the script if the entry below it on the stack is non-true (zero)"
[outpoint]: /en/developer-reference#outpoint "The structure used to refer to a particular transaction output, consisting of a 32-byte TXID and a 4-byte output index number (vout)."
[output]: /en/developer-guide#term-output "The output of a transaction which transfers value to a pubkey script"
[output index]: /en/developer-guide#term-output-index "The sequentially-numbered index of outputs in a single transaction starting from 0"
[P2PKH]: /en/developer-guide#term-p2pkh "A pubkey script which Pays To PubKey Hashes (P2PKH), allowing spending of satoshis to anyone with a Bitcoin address"
[P2SH]: /en/developer-guide#term-p2sh "A pubkey script which Pays To Script Hashes (P2SH), allowing convenient spending of satoshis to an address referencing a redeem script"
[P2SH multisig]: /en/developer-guide#term-p2sh-multisig "A multisig script embedded in the redeem script of a pay-to-script-hash (P2SH) transaction"
[parent chain code]: /en/developer-guide#term-parent-chain-code "A chain code which has helped create child public or private keys"
[parent key]: /en/developer-guide#term-parent-key "In HD wallets, a key capable of deriving child keys"
[parent private key]: /en/developer-guide#term-parent-private-key "A private key which has created child private keys"
[parent public key]: /en/developer-guide#term-parent-public-key "A public key corresponding to a parent private key which has child private keys"
[payment protocol]: /en/developer-guide#term-payment-protocol "The protocol defined in BIP70 which lets spenders get signed payment details from receivers"
[PaymentDetails]: /en/developer-examples#term-paymentdetails "The PaymentDetails of the payment protocol which allows the receiver to specify the payment details to the spender"
[PaymentRequest]: /en/developer-examples#term-paymentrequest "The PaymentRequest of the payment protocol which contains and allows signing of the PaymentDetails"
[PaymentRequests]: /en/developer-examples#term-paymentrequest "The PaymentRequest of the payment protocol which contains and allows signing of the PaymentDetails"
[peer]: /en/developer-guide#term-peer "Peer on the P2P network who receives and broadcasts transactions and blocks"
[peers]: /en/developer-guide#term-peer "Peers on the P2P network who receive and broadcast transactions and blocks"
[ping message]: /en/developer-reference#ping "A P2P network message used to see if the remote host is still connected"
[PKI]: /en/developer-examples#term-pki "Public Key Infrastructure; usually meant to indicate the X.509 certificate system used for HTTP Secure (https)."
[point function]: /en/developer-guide#term-point-function "The ECDSA function used to create a public key from a private key"
[pong message]: /en/developer-reference#pong "A P2P network message used to reply to a P2P network ping message"
[private key]: /en/developer-guide#term-private-key "The private portion of a keypair which can create signatures which other people can verify using the public key"
[private keys]: /en/developer-guide#term-private-key "The private portion of a keypair which can create signatures which other people can verify using the public key"
[pubkey hash]: /en/developer-guide#term-pubkey-hash "The hash of a public key which can be included in a P2PKH output"
[public key]: /en/developer-guide#term-public-key "The public portion of a keypair which can be safely distributed to other people so they can verify a signature created with the corresponding private key"
[pp amount]: /en/developer-examples#term-pp-amount "Part of the Output part of the PaymentDetails part of a payment protocol where receivers can specify the amount of satoshis they want paid to a particular pubkey script"
[pp expires]: /en/developer-examples#term-pp-expires "The expires field of a PaymentDetails where the receiver tells the spender when the PaymentDetails expires"
[pp memo]: /en/developer-examples#term-pp-memo "The memo fields of PaymentDetails, Payment, and PaymentACK which allow spenders and receivers to send each other memos"
[pp merchant data]: /en/developer-examples#term-pp-merchant-data "The merchant_data part of PaymentDetails and Payment which allows the receiver to send arbitrary data to the spender in PaymentDetails and receive it back in Payments"
[pp PKI data]: /en/developer-examples#term-pp-pki-data "The pki_data field of a PaymentRequest which provides details such as certificates necessary to validate the request"
[pp pki type]: /en/developer-examples#term-pp-pki-type "The PKI field of a PaymentRequest which tells spenders how to validate this request as being from a specific recipient"
[pp script]: /en/developer-examples#term-pp-script "The script field of a PaymentDetails where the receiver tells the spender what pubkey scripts to pay"
[proof of work]: /en/developer-guide#term-proof-of-work "Proof that computationally-difficult work was performed which helps secure blocks against modification, protecting transaction history"
[Pubkey]: /en/developer-guide#term-pubkey "A cryptographic public key derived from a private key and which can match a signature made by that same private key"
[pubkey script]: /en/developer-guide#term-pubkey-script "The part of an output which sets the conditions for spending of the satoshis in that output"
[r]: /en/developer-guide#term-r-parameter "The payment request parameter in a bitcoin: URI"
[raw format]: /en/developer-reference#term-raw-format "Complete transactions in their binary format; often represented using hexidecimal"
[receipt]: /en/developer-guide#term-receipt "A cryptographically-verifiable receipt created using parts of a payment request and a confirmed transaction"
[recurrent rebilling]: /en/developer-guide#rebilling-recurring-payments "Billing a spender on a regular schedule"
[redeem script]: /en/developer-guide#term-redeem-script "A pubkey script created by the recipient, hashed, and given to the spender for use in a P2SH output"
[refund]: /en/developer-guide#issuing-refunds "A transaction which refunds some or all satoshis received in a previous transaction"
[regression test mode]: /en/developer-examples#regtest-mode "A local testing environment in which developers can control blocks"
[reject message]: /en/developer-reference#reject "A P2P network message used to indicate a previously-received message was rejected for some reason"
[root certificate]: /en/developer-examples#term-root-certificate "A certificate belonging to a certificate authority (CA)"
[root seed]: /en/developer-guide#term-root-seed "A potentially-short value used as a seed to generate a master private key and master chain code for an HD wallet"
[RPC byte order]: /en/developer-reference#hash-byte-order "A hash digest displayed with the byte order reversed; used in Bitcoin Core RPCs and other software."
[satoshi]: /en/developer-guide#term-satoshi "The smallest unit of Bitcoin value; 0.00000001 bitcoins.  Also used generically for any value of bitcoins"
[satoshis]: /en/developer-guide#term-satoshi "The smallest unit of Bitcoin value; 0.00000001 bitcoins.  Also used generically for any value of bitcoins"
[sequence number]: /en/developer-guide#term-sequence-number "A number intended to allow time locked transactions to be updated before being finalized; not currently used except to disable locktime in a transaction"
[script hash]: /en/developer-guide#term-script-hash "The hash of a redeem script used to create a P2SH output"
[sha_shacp]: /en/developer-guide#term-sighash-all-sighash-anyonecanpay "Signature hash type which allows other people to contribute satoshis without changing the number of satoshis sent nor where they go"
[shacp]: /en/developer-guide#term-sighash-anyonecanpay "A signature hash type which modifies the behavior of other signature hash types"
[shn_shacp]: /en/developer-guide#term-sighash-none-sighash-anyonecanpay "Signature hash type which allows unfettered modification of a transaction"
[shs_shacp]: /en/developer-guide#term-sighash-single-sighash-anyonecanpay "Signature hash type which allows modification of the entire transaction except the signed input and the output with the same index number"
[sighash_all]: /en/developer-guide#term-sighash-all "Default signature hash type which signs the entire transaction except any signature scripts, preventing modification of the signed parts"
[sighash_none]: /en/developer-guide#term-sighash-none "Signature hash type which only signs the inputs, allowing anyone to change the outputs however they'd like"
[sighash_single]: /en/developer-guide#term-sighash-single "Signature hash type which only signs its input and the output with the same index value, allowing modification of other inputs and outputs"
[signature]: /en/developer-guide#term-signature "The result of combining a private key and some data in an ECDSA signature operation which allows anyone with the corresponding public key to verify the signature"
[signature hash]: /en/developer-guide#term-signature-hash "A byte appended onto signatures generated in Bitcoin which allows the signer to specify what data was signed, allowing modification of the unsigned data"
[signature script]: /en/developer-guide#term-signature-script "Data generated by a spender which is almost always used as variables to satisfy a pubkey script"
[soft fork]: /en/developer-guide#term-soft-fork "A temporary fork in the block chain which commonly occurs when miners using non-upgraded nodes violate a new consensus rule their nodes don't know about."
[spv]: /en/developer-guide#simplified-payment-verification-spv "A method for verifying particular transactions were included in blocks without downloading the entire contents of the block chain"
[ssl signature]: /en/developer-examples#term-ssl-signature "Signatures created and recognized by major SSL implementations such as OpenSSL"
[stack]: /en/developer-guide#term-stack "An evaluation stack used in Bitcoin's script language"
[stale block]: /en/developer-guide#term-stale-block "Blocks which were successfully mined but which aren't included on the current valid block chain"
[standard script]: /en/developer-guide#standard-transactions "A pubkey script which matches the IsStandard() patterns specified in Bitcoin Core---or a transaction containing only standard outputs. Only standard transactions are mined or broadcast by peers running the default Bitcoin Core software"
[start string]: /en/developer-reference#term-start-string "Four defined bytes which start every message in the P2P protocol to allow seeking to the next message"
[target]: /en/developer-guide#term-target "The threshold below which a block header hash must be in order for the block to be added to the block chain"
[testnet]: /en/developer-examples#testnet "A Bitcoin-like network where the satoshis have no real-world value to allow risk-free testing"
[transaction fee]: /en/developer-guide#term-transaction-fee "The amount remaining when all outputs are subtracted from all inputs in a transaction; the fee is paid to the miner who includes that transaction in a block"
[transaction fees]: /en/developer-guide#term-transaction-fee "The amount remaining when all outputs are subtracted from all inputs in a transaction; the fee is paid to the miner who includes that transaction in a block"
[transaction malleability]: /en/developer-guide#transaction-malleability "The ability of an attacker to change the transaction identifier (txid) of unconfirmed transactions, making dependent transactions invalid"
[transaction]: /en/developer-guide#transactions "A transaction spending satoshis"
[transaction version number]: /en/developer-guide#term-transaction-version-number "A version number prefixed to transactions to allow upgrading""
[transactions]: /en/developer-guide#transactions "A transaction spending satoshis"
[tx message]: /en/developer-reference#tx "A P2P protocol message which sends a single serialized transaction"
[txid]: /en/developer-guide#term-txid "A hash of a completed transaction which allows other transactions to spend its outputs"
[unconfirmed]: /en/developer-guide#term-unconfirmed-transactions "A transaction which has not yet been added to the block chain"
[unconfirmed transactions]: /en/developer-guide#term-unconfirmed-transactions "A transaction which has not yet been added to the block chain"
[unique addresses]: /en/developer-guide#term-unique-address "Address which are only used once to protect privacy and increase security"
[URI QR Code]: /en/developer-guide#term-uri-qr-code "A QR code containing a bitcoin: URI"
[utxo]: /en/developer-guide#term-utxo "Unspent Transaction Output (UTXO) holding satoshis which have not yet been spent"
[verack message]: /en/developer-reference#verack "A P2P network message sent in reply to a version message to confirm a connection has been established"
[verified payments]: /en/developer-guide#verifying-payment "Payments which the receiver believes won't be double spent"
[version message]: /en/developer-reference#version "A P2P network message sent at the begining of a connection to allow protocol version negotiation"
[v2 block]: /en/developer-reference#term-v2-block "The current version of Bitcoin blocks"
[wallet]: /en/developer-guide#wallets "Software which stores private keys to allow users to spend and receive satoshis"
[Wallet Import Format]: /en/developer-guide#term-wallet-import-format "A private key specially formatted to allow easy import into a wallet"
[wallets]: /en/developer-guide#wallets "Software which stores private keys to allow users to spend and receive satoshis"

<!-- RPCs; alphabetical order -->
[rpc addmultisigaddress]: /en/developer-reference#addmultisigaddress
[rpc addnode]: /en/developer-reference#addnode
[rpc backupwallet]: /en/developer-reference#backupwallet
[rpc createmultisig]: /en/developer-reference#createmultisig
[rpc createrawtransaction]: /en/developer-reference#createrawtransaction
[rpc decoderawtransaction]: /en/developer-reference#decoderawtransaction
[rpc decodescript]: /en/developer-reference#decodescript
[rpc dumpprivkey]: /en/developer-reference#dumpprivkey
[rpc dumpwallet]: /en/developer-reference#dumpwallet
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
[rpc getconnectioncount]: /en/developer-reference#getconnectioncount
[rpc getdifficulty]: /en/developer-reference#getdifficulty
[rpc getgenerate]: /en/developer-reference#getgenerate
[rpc gethashespersec]: /en/developer-reference#gethashespersec
[rpc getinfo]: /en/developer-reference#getinfo
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
[rpc gettxoutsetinfo]: /en/developer-reference#gettxoutsetinfo
[rpc getunconfirmedbalance]: /en/developer-reference#getunconfirmedbalance
[rpc getwalletinfo]: /en/developer-reference#getwalletinfo
[rpc getwork]: /en/developer-reference#getwork
[rpc help]: /en/developer-reference#help
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
[rpc walletlock]: /en/developer-reference#walletlock
[rpc walletpassphrase]: /en/developer-reference#walletpassphrase
[rpc walletpassphrasechange]: /en/developer-reference#walletpassphrasechange

<!-- Other internal site links; alphabetical order -->
[Bitcoin Core 0.6.0]: /en/release/v0.6.0
[Bitcoin Core 0.6.1]: /en/release/v0.6.1
[Bitcoin Core 0.7.0]: /en/release/v0.7.0
[Bitcoin Core 0.8.0]: /en/release/v0.8.0
[Bitcoin Core 0.9.0]: /en/release/v0.9.0
[Bitcoin Core 0.9.3]: /en/release/v0.9.3
[bitcoin URI subsection]: /en/developer-guide#bitcoin-uri
[bitcoinpdf]: https://bitcoin.org/bitcoin.pdf
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
[raw transaction format]: /en/developer-reference#raw-transaction-format
[RPC]: /en/developer-reference#remote-procedure-calls-rpcs
[RPCs]: /en/developer-reference#remote-procedure-calls-rpcs
[section creating a bloom filter]: /en/developer-examples#creating-a-bloom-filter
[section detecting forks]: /en/developer-guide#detecting-forks
[section getblocktemplate]: /en/developer-guide#getblocktemplate-rpc
[section hash byte order]: /en/developer-reference#hash-byte-order
[section merkle trees]: /en/developer-reference#merkle-trees
[section merkleblock example]: /en/developer-examples#parsing-a-merkleblock
[section protocol versions]: /en/developer-reference#protocol-versions
[section serialized blocks]: /en/developer-reference#serialized-blocks
[section simple raw transaction]: /en/developer-examples#simple-raw-transaction
[section verifying payment]: /en/developer-guide#verifying-payment
[signature script modification warning]: /en/developer-reference#signature_script_modification_warning
[transaction object format]: /en/developer-reference#term-transaction-object-format
[Verification subsection]: /en/developer-guide#verifying-payment
[X509Certificates]: /en/developer-examples#term-x509certificates

<!-- Official reference documents (BIPs should not use zero padding:
     BIP32 not BIP0032; alphabetical order -->
[BIP14]: https://github.com/bitcoin/bips/blob/master/bip-0014.mediawiki
[BIP16]: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
[BIP21]: https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
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
[BIP70]: https://github.com/bitcoin/bips/blob/master/bip-0070.mediawiki
[BIP71]: https://github.com/bitcoin/bips/blob/master/bip-0071.mediawiki
[BIP72]: https://github.com/bitcoin/bips/blob/master/bip-0072.mediawiki
[CVE-2012-2459]: https://en.bitcoin.it/wiki/CVEs#CVE-2012-2459
[RFC5737]: http://tools.ietf.org/html/rfc5737
<!-- [secp256k1]: http://www.secg.org/index.php?action=secg,docs_secg -->
[secp256k1]: http://perso.univ-rennes1.fr/sylvain.duquesne/master/standards/sec2_final.pdf

<!-- Other external site links; alphabetical order -->
[BFGMiner]: https://github.com/luke-jr/bfgminer
[Bitcoin Core]: https://bitcoin.org/en/download
[Bitcoin Core 0.1.6]: https://github.com/bitcoin/bitcoin/commit/cc0b4c3b62367a2aebe5fc1f4d0ed4b97e9c2ac9
[Bitcoin Core 0.2.9]: https://github.com/bitcoin/bitcoin/commit/42605ce8bcc9bd01b86491c74fee14de77960868
[Bitcoin Core 0.3.11]: https://github.com/bitcoin/bitcoin/commit/343328c6b8db85e58a1feea85f0d10e62967fa19
[Bitcoin Core 0.3.15]: https://github.com/bitcoin/bitcoin/commit/c891967b6fcab2e8dc4ce0c787312b36c07efa4d
[bitcoin core fee drop commit]: https://github.com/bitcoin/bitcoin/commit/6a4c196dd64da2fd33dc7ae77a8cdd3e4cf0eff1
[Bitcoin Core issue #2381]: https://github.com/bitcoin/bitcoin/issues/2381
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
[core script.h]: https://github.com/bitcoin/bitcoin/blob/master/src/script.h
[creative commons attribution 3.0 license]: https://creativecommons.org/licenses/by/3.0/
[DER]: https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One
[dig command]: https://en.wikipedia.org/wiki/Dig_%28Unix_command%29
[DNS A records]: http://tools.ietf.org/html/rfc1035#section-3.2.2
[DNS Seed Policy]: https://github.com/bitcoin/bitcoin/blob/master/doc/dnsseed-policy.md
[docs issue]: https://github.com/bitcoin/bitcoin.org/issues
[ECDSA]: https://en.wikipedia.org/wiki/Elliptic_Curve_DSA
[Electrum server]: https://github.com/spesmilo/electrum-server
[Eloipool]: https://gitorious.org/bitcoin/eloipool
[forum tech support]: https://bitcointalk.org/index.php?board=4.0
[high-speed block relay network]: https://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg03189.html
[HMAC-SHA512]: https://en.wikipedia.org/wiki/HMAC
[HTTP longpoll]: https://en.wikipedia.org/wiki/Push_technology#Long_polling
[IP-to-IP payment protocol]: https://en.bitcoin.it/wiki/IP_Transactions
[IPv4-mapped IPv6 addresses]: http://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses
[irc channels]: https://en.bitcoin.it/wiki/IRC_channels
[libblkmaker]: https://gitorious.org/bitcoin/libblkmaker
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
[wiki script]: https://en.bitcoin.it/wiki/Script
[x509]: https://en.wikipedia.org/wiki/X.509

<!-- Direct links to code; link to a specific commit to prevent code
changes from moving the referenced object, but also update links
periodically to point to recent code. Last update: 2014-11-12 --> 
[core bloom.cpp hash]: https://github.com/bitcoin/bitcoin/blob/cbf28c6619fe348a258dfd7d08bdbd2392d07511/src/bloom.cpp#L46
[MAX_SIZE]: https://github.com/bitcoin/bitcoin/blob/60abd463ac2eaa8bc1d616d8c07880dc53d97211/src/serialize.h#L23
