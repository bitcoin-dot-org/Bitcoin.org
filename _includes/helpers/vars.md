{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

{% capture INCLUDE_F_LIST_TRANSACTIONS %}
- n: "{{DEPTH}}<br>`involvesWatchonly`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` if the payment involves a watch-only address.  Otherwise not returned"

- n: "{{DEPTH}}<br>`account`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "*Deprecated: will be removed in a later version of Bitcoin Core*<br><br>The account which the payment was credited to or debited from.  May be an empty string (\"\") for the default account"

- n: "{{DEPTH}}<br>`address`"
  t: "string (base58)"
  p: "Optional<br>(0 or 1)"
  d: "The address paid in this payment, which may be someone else's address not belonging to this wallet.  May be empty if the address is unknown, such as when paying to a non-standard pubkey script"

- n: "{{DEPTH}}<br>`category`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "Set to one of the following values:<br>• `send` if sending payment<br>• `receive` if this wallet received payment in a regular transaction<br>• `generate` if a matured and spendable coinbase<br>• `immature` if a coinbase that is not spendable yet<br>• `orphan` if a coinbase from a block that's not in the local best block chain"

- n: "{{DEPTH}}<br>`amount`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "A negative bitcoin amount if sending payment; a positive bitcoin amount if receiving payment (including coinbases)"

- n: "{{DEPTH}}<br>`vout`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "For an output, the output index (vout) for this output in this transaction.  For an input, the output index for the output being spent in its transaction.  Because inputs list the output indexes from previous transactions, more than one entry in the details array may have the same output index"

- n: "{{DEPTH}}<br>`fee`"
  t: "number (bitcoins)"
  p: "Optional<br>(0 or 1)"
  d: "If sending payment, the fee paid as a negative bitcoins value.  May be `0`. Not returned if receiving payment"

{% endcapture %}


{% capture INCLUDE_F_LIST_TRANSACTIONS_F_FULL %}
- n: "{{DEPTH}}<br>`confirmations`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of confirmations the transaction has received.  Will be `0` for unconfirmed and `-1` for conflicted"

- n: "{{DEPTH}}<br>`generated`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` if the transaction is a coinbase.  Not returned for regular transactions"

- n: "{{DEPTH}}<br>`blockhash`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The hash of the block on the local best block chain which includes this transaction, encoded as hex in RPC byte order.  Only returned for confirmed transactions"

- n: "{{DEPTH}}<br>`blockindex`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The index of the transaction in the block that includes it.  Only returned for confirmed transactions"

- n: "{{DEPTH}}<br>`blocktime`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The block header time (Unix epoch time) of the block on the local best block chain which includes this transaction.  Only returned for confirmed transactions"

- n: "{{DEPTH}}<br>`txid`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the transaction, encoded as hex in RPC byte order"

- n: "{{DEPTH}}<br>`walletconflicts`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array containing the TXIDs of other transactions that spend the same inputs (UTXOs) as this transaction.  Array may be empty"

- n: "{{DEPTH}}→<br>TXID"
  t: "string (hex)"
  p: "Optional<br>(0 or more)"
  d: "The TXID of a conflicting transaction, encoded as hex in RPC byte order"

- n: "{{DEPTH}}<br>`time`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "A Unix epoch time when the transaction was added to the wallet"

- n: "{{DEPTH}}<br>`timereceived`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "A Unix epoch time when the transaction was detected by the local node, or the time of the block on the local best block chain that included the transaction"

- n: "{{DEPTH}}<br>`bip125-replaceable`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>Indicates if a transaction is replaceable under BIP 125:<br>• `yes` is replaceable<br>• `no` not replaceable<br>• `unknown` for unconfirmed transactions not in the mempool"
  
- n: "{{DEPTH}}<br>`comment`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "For transaction originating with this wallet, a locally-stored comment added to the transaction.  Only returned if a comment was added"

- n: "{{DEPTH}}<br>`to`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "For transaction originating with this wallet, a locally-stored comment added to the transaction identifying who the transaction was sent to.  Only returned if a comment-to was added"

{% endcapture %}

{% capture INCLUDE_SPEND_CONFIRMATIONS %}
{% itemplate ntpd1 %}
- n: "Confirmations"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The minimum number of confirmations an incoming transaction must have for its outputs to be credited to this account's balance. Outgoing transactions are always counted, as are move transactions made with the `move` RPC. If an account doesn't have a balance high enough to pay for this transaction, the payment will be rejected.  Use `0` to spend unconfirmed incoming payments. Default is `1`"

{% enditemplate %}

![Warning icon](/img/icons/icon_warning.svg)
**Warning:** if account1 receives an unconfirmed payment and transfers
it to account2 with the `move` RPC, account2 will be able to spend those
bitcoins even if this parameter is set to `1` or higher.{% endcapture %}


{% capture INCLUDE_DECODE_RAW_TRANSACTION %}
- n: "{{DEPTH}} →<br>`txid`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The transaction's TXID encoded as hex in RPC byte order"

- n: "{{DEPTH}} →<br>`hash`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>The transaction hash.  Differs from txid for witness transactions"
  
- n: "{{DEPTH}} →<br>`size`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.12.0*<br><br>The serialized transaction size"

- n: "{{DEPTH}} →<br>`vsize`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>The virtual transaction size.  Differs from size for witness transactions"
  
- n: "{{DEPTH}} →<br>`version`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The transaction format version number"

- n: "{{DEPTH}} →<br>`locktime`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The transaction's locktime: either a Unix epoch date or block height; see the [Locktime parsing rules][]"

- n: "{{DEPTH}} →<br>`vin`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of objects with each object being an input vector (vin) for this transaction.  Input objects will have the same order within the array as they have in the transaction, so the first input listed will be input 0"

- n: "{{DEPTH}} → →<br>Input"
  t: "object"
  p: "Required<br>(1 or more)"
  d: "An object describing one of this transaction's inputs.  May be a regular input or a coinbase"

- n: "{{DEPTH}} → → →<br>`txid`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The TXID of the outpoint being spent, encoded as hex in RPC byte order.  Not present if this is a coinbase transaction"

- n: "{{DEPTH}} → → →<br>`vout`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The output index number (vout) of the outpoint being spent.  The first output in a transaction has an index of `0`.  Not present if this is a coinbase transaction"

- n: "{{DEPTH}} → → →<br>`scriptSig`"
  t: "object"
  p: "Optional<br>(0 or 1)"
  d: "An object describing the signature script of this input.  Not present if this is a coinbase transaction"

- n: "{{DEPTH}} → → → →<br>`asm`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The signature script in decoded form with non-data-pushing opcodes listed"

- n: "{{DEPTH}} → → → →<br>`hex`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The signature script encoded as hex"

- n: "{{DEPTH}} → → →<br>`coinbase`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The coinbase (similar to the hex field of a scriptSig) encoded as hex.  Only present if this is a coinbase transaction"

- n: "{{DEPTH}} → → →<br>`sequence`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The input sequence number"

- n: "{{DEPTH}} → → →<br>`txinwitness`"
  t: "string : array"
  p: "Optional<br>(0 or 1)"
  d: "*Added in Bitcoin Core 0.13.0*<br><br>Hex-encoded witness data. Only for segregated witness transactions"  
  
- n: "{{DEPTH}} →<br>`vout`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of objects each describing an output vector (vout) for this transaction.  Output objects will have the same order within the array as they have in the transaction, so the first output listed will be output 0"

- n: "{{DEPTH}} → →<br>Output"
  t: "object"
  p: "Required<br>(1 or more)"
  d: "An object describing one of this transaction's outputs"

- n: "{{DEPTH}} → → →<br>`value`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The number of bitcoins paid to this output.  May be `0`"

- n: "{{DEPTH}} → → →<br>`n`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The output index number of this output within this transaction"

- n: "{{DEPTH}} → → →<br>`scriptPubKey`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object describing the pubkey script"

- n: "{{DEPTH}} → → → →<br>`asm`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The pubkey script in decoded form with non-data-pushing opcodes listed"

- n: "{{DEPTH}} → → → →<br>`hex`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The pubkey script encoded as hex"

- n: "{{DEPTH}} → → → →<br>`reqSigs`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The number of signatures required; this is always `1` for P2PK, P2PKH, and P2SH (including P2SH multisig because the redeem script is not available in the pubkey script).  It may be greater than 1 for bare multisig.  This value will not be returned for `nulldata` or `nonstandard` script types (see the `type` key below)"

- n: "{{DEPTH}} → → → →<br>`type`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The type of script.  This will be one of the following:<br>• `pubkey` for a P2PK script<br>• `pubkeyhash` for a P2PKH script<br>• `scripthash` for a P2SH script<br>• `multisig` for a bare multisig script<br>• `nulldata` for nulldata scripts<br>• `nonstandard` for unknown scripts"

- n: "{{DEPTH}} → → → →<br>`addresses`"
  t: "string : array"
  p: "Optional<br>(0 or 1)"
  d: "The P2PKH or P2SH addresses used in this transaction, or the computed P2PKH address of any pubkeys in this transaction.  This array will not be returned for `nulldata` or `nonstandard` script types"

- n: "{{DEPTH}} → → → → →<br>Address"
  t: "string"
  p: "Required<br>(1 or more)"
  d: "A P2PKH or P2SH address"

{% endcapture %}

{% assign INCLUDE_WALLET_UNLOCKED="If the wallet has been encrypted either through the GUI or with the `encryptwallet` RPC, it must first be unlocked with the `walletpassphrase` RPC" %}

{% capture INCLUDE_CONFIRMATIONS_PARAMETER %}
{% itemplate ntpd1 %}
- n: "Confirmations"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The minimum number of confirmations an externally-generated transaction must have before it is counted towards the balance.  Transactions generated by this node are counted immediately.  Typically, externally-generated transactions are payments to this wallet and transactions generated by this node are payments to other wallets.  Use `0` to count unconfirmed transactions.  Default is `1`"

{% enditemplate %}
{% endcapture %}

{% capture INCLUDE_INCLUDE_WATCH_ONLY_PARAMETER %}
{% itemplate ntpd1 %}
- n: "Include Watch-Only"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "If set to `true`, include watch-only addresses in details and calculations as if they were regular addresses belonging to the wallet.  If set to `false` (the default), treat watch-only addresses as if they didn't belong to this wallet"

{% enditemplate %}
{% endcapture %}

{% assign WARNING="![Warning icon](/img/icons/icon_warning.svg) **Warning:**" %}

{% assign reindexNote="Note: if you begin using `txindex=1` after downloading the block chain, you must rebuild your indexes by starting Bitcoin Core with the option  `-reindex`.  This may take several hours to complete, during which time your node will not process new blocks or transactions. This reindex only needs to be done once." %}
