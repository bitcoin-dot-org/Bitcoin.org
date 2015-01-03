{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}

{% capture INCLUDE_F_LIST_TRANSACTIONS %}| {{DEPTH}}<br>`involvesWatchonly` | bool           | Optional<br>(0 or 1)        | *Added in Bitcoin Core 0.10.0*<br><br>Set to `true` if the payment involves a watch-only address.  Otherwise not returned
| {{DEPTH}}<br>`account`        | string            | Required<br>(exactly 1)     | The account which the payment was credited to or debited from.  May be an empty string ("") for the default account
| {{DEPTH}}<br>`address`        | string (base58)   | Optional<br>(0 or 1)        | The address paid in this payment, which may be someone else's address not belonging to this wallet.  May be empty if the address is unknown, such as when paying to a non-standard pubkey script
| {{DEPTH}}<br>`category`       | string            | Required<br>(exactly 1)     | Set to one of the following values:<br>• `send` if sending payment<br>• `receive` if this wallet received payment in a regular transaction<br>• `generate` if a matured and spendable coinbase<br>• `immature` if a coinbase that is not spendable yet<br>• `orphan` if a coinbase from a block that's not in the local best block chain
| {{DEPTH}}<br>`amount`         | number (bitcoins) | Required<br>(exactly 1)     | A negative bitcoin amount if sending payment; a positive bitcoin amount if receiving payment (including coinbases)
| {{DEPTH}}<br>`vout`           | number (int)      | Required<br>(exactly 1)     | *Added in Bitcoin Core 0.10.0*<br><br>For an output, the output index (vout) for this output in this transaction.  For an input, the output index for the output being spent in its transaction.  Because inputs list the output indexes from previous transactions, more than one entry in the details array may have the same output index
| {{DEPTH}}<br>`fee`            | number (bitcoins) | Optional<br>(0 or 1)        | If sending payment, the fee paid as a negative bitcoins value.  May be `0`. Not returned if receiving payment{% endcapture %}


{% capture INCLUDE_F_LIST_TRANSACTIONS_F_FULL %}| {{DEPTH}}<br>`confirmations`   | number (int)    | Required<br>(exactly 1)     | The number of confirmations the transaction has received.  Will be `0` for unconfirmed and `-1` for conflicted
| {{DEPTH}}<br>`generated`       | bool            | Optional<br>(0 or 1)        | Set to `true` if the transaction is a coinbase.  Not returned for regular transactions
| {{DEPTH}}<br>`blockhash`       | string (hex)    | Optional<br>(0 or 1)        | Only returned for confirmed transactions.  The hash of the block on the local best block chain which includes this transaction, encoded as hex in RPC byte order
| {{DEPTH}}<br>`blockindex`      | number (int)    | Optional<br>(0 or 1)        | Only returned for confirmed transactions.  The block height of the block on the local best block chain which includes this transaction
| {{DEPTH}}<br>`blocktime`       | number (int)    | Optional<br>(0 or 1)        | Only returned for confirmed transactions.  The block header time (Unix epoch time) of the block on the local best block chain which includes this transaction
| {{DEPTH}}<br>`txid`            | string (hex)    | Required<br>(exactly 1)     | The TXID of the transaction, encoded as hex in RPC byte order
| {{DEPTH}}<br>`walletconflicts` | array           | Required<br>(exactly 1)     | An array containing the TXIDs of other transactions that spend the same inputs (UTXOs) as this transaction.  Array may be empty
| {{DEPTH}}→<br>TXID             | string (hex)    | Optional<br>(0 or more)     | The TXID of a conflicting transaction, encoded as hex in RPC byte order
| {{DEPTH}}<br>`time`            | number (int)    | Required<br>(exactly 1)     | A Unix epoch time when the transaction was added to the wallet
| {{DEPTH}}<br>`timerecived`     | number (int)    | Required<br>(exactly 1)     | A Unix epoch time when the transaction was detected by the local node, or the time of the block on the local best block chain that included the transaction
| {{DEPTH}}<br>`comment`         | string          | Optional<br>(0 or 1)        | For transaction originating with this wallet, a locally-stored comment added to the transaction.  Only returned if a comment was added
| {{DEPTH}}<br>`to`              | string          | Optional<br>(0 or 1)        | For transaction originating with this wallet, a locally-stored comment added to the transaction identifying who the transaction was sent to.  Only returned if a comment-to was added{% endcapture %}

{% capture INCLUDE_SPEND_CONFIRMATIONS %}| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| Confirmations      | number (int)    | Optional<br>(0 or 1)        | The minimum number of confirmations an incoming transaction must have for its outputs to be credited to this account's balance. Outgoing transactions are always counted, as are move transactions made with the `move` RPC. If an account doesn't have a balance high enough to pay for this transaction, the payment will be rejected.  Use `0` to spend unconfirmed incoming payments. Default is `1`
{:.ntpd}

![Warning icon](/img/icons/icon_warning.svg)
**Warning:** if account1 receives an unconfirmed payment and transfers
it to account2 with the `move` RPC, account2 will be able to spend those
bitcoins even if this parameter is set to `1` or higher.{% endcapture %}


{% capture INCLUDE_DECODE_RAW_TRANSACTION %}| →<br>`txid`           | string (hex)    | Required<br>(exactly 1)     | The transaction's TXID encoded as hex in RPC byte order
| →<br>`version`          | number (int)      | Required<br>(exactly 1)     | The transaction format version number
| →<br>`locktime`         | number (int)      | Required<br>(exactly 1)     | The transaction's locktime: either a Unix epoch date or block height; see the [Locktime parsing rules][]
| →<br>`vin`              | array             | Required<br>(exactly 1)     | An array of objects with each object being an input vector (vin) for this transaction.  Input objects will have the same order within the array as they have in the transaction, so the first input listed will be input 0
| → →<br>Input            | object            | Required<br>(1 or more)     | An object describing one of this transaction's inputs.  May be a regular input or a coinbase
| → → →<br>`txid`         | string            | Optional<br>(0 or 1)        | The TXID of the outpoint being spent, encoded as hex in RPC byte order.  Not present if this is a coinbase transaction
| → → →<br>`vout`         | number (int)      | Optional<br>(0 or 1)        | The output index number (vout) of the outpoint being spent.  The first output in a transaction has an index of `0`.  Not present if this is a coinbase transaction
| → → →<br>`scriptSig`    | object            | Optional<br>(0 or 1)        | An object describing the signature script of this input.  Not present if this is a coinbase transaction
| → → → →<br>`asm`        | string            | Required<br>(exactly 1)     | The signature script in decoded form with non-data-pushing op codes listed
| → → → →<br>`hex`        | string (hex)      | Required<br>(exactly 1)     | The signature script encoded as hex
| → → →<br>`coinbase`     | string (hex)      | Optional<br>(0 or 1)        | The coinbase (similar to the hex field of a scriptSig) encoded as hex.  Only present if this is a coinbase transaction
| → → →<br>`sequence`     | number (int)      | Required<br>(exactly 1)     | The input sequence number
| →<br>`vout`             | array             | Required<br>(exactly 1)     | An array of objects each describing an output vector (vout) for this transaction.  Output objects will have the same order within the array as they have in the transaction, so the first output listed will be output 0
| → →<br>Output           | object            | Required<br>(1 or more)     | An object describing one of this transaction's outputs
| → → →<br>`value`        | number (bitcoins) | Required<br>(exactly 1)     | The number of bitcoins paid to this output.  May be `0`
| → → →<br>`n`            | number (int)      | Required<br>(exactly 1)     | The output index number of this output within this transaction
| → → →<br>`scriptPubKey` | object            | Required<br>(exactly 1)     | An object describing the pubkey script
| → → → →<br>`asm`        | string            | Required<br>(exactly 1)     | The pubkey script in decoded form with non-data-pushing op codes listed
| → → → →<br>`hex`        | string (hex)      | Required<br>(exactly 1)     | The pubkey script encoded as hex
| → → → →<br>`reqSigs`    | number (int)      | Optional<br>(0 or 1)        | The number of signatures required; this is always `1` for P2PK, P2PKH, and P2SH (including P2SH multisig because the redeem script is not available in the pubkey script).  It may be greater than 1 for bare multisig.  This value will not be returned for `nulldata` or `nonstandard` script types (see the `type` key below)
| → → → →<br>`type`       | string            | Optional<br>(0 or 1)        | The type of script.  This will be one of the following:<br>• `pubkey` for a P2PK script<br>• `pubkeyhash` for a P2PKH script<br>• `scripthash` for a P2SH script<br>• `multisig` for a bare multisig script<br>• `nulldata` for nulldata scripts<br>• `nonstandard` for unknown scripts
| → → → →<br>`addresses`  | string : array    | Optional<br>(0 or 1)        | The P2PKH or P2SH addresses used in this transaction, or the computed P2PKH address of any pubkeys in this transaction.  This array will not be returned for `nulldata` or `nonstandard` script types
| → → → → →<br>Address     | string           | Required<br>(1 or more)     | A P2PKH or P2SH address{% endcapture %}

{% assign INCLUDE_WALLET_UNLOCKED="If the wallet has been encrypted either through the GUI or with the `encryptwallet` RPC, it must first be unlocked with the `walletpassphrase` RPC" %}

{% capture INCLUDE_CONFIRMATIONS_PARAMETER %}| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Confirmations      | number (int)    | Optional<br>(0 or 1)        | The minimum number of confirmations an externally-generated transaction must have before it is counted towards the balance.  Transactions generated by this node are counted immediately.  Typically, externally-generated transactions are payments to this wallet and transactions generated by this node are payments to other wallets.  Use `0` to count unconfirmed transactions.  Default is `1`
{:.ntpd}{% endcapture %}

{% capture INCLUDE_INCLUDE_WATCH_ONLY_PARAMETER %}| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|----------------
| Include Watch-Only | bool            | Optional<br>(0 or 1)        | *Added in Bitcoin Core 0.10.0*<br><br>If set to `true`, include watch-only addresses in details and calculations as if they were regular addresses belonging to the wallet.  If set to `false` (the default), treat watch-only addresses as if they didn't belong to this wallet
{:.ntpd}{% endcapture %}

{% assign WARNING="![Warning icon](/img/icons/icon_warning.svg) **Warning:**" %}
