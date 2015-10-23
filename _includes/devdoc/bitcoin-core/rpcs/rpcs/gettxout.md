{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/gettxout.md" %}

##### GetTxOut
{% include helpers/subhead-links.md %}

{% assign summary_getTxOut="returns details about a transaction output.  Only unspent transaction outputs (UTXOs) are guaranteed to be available." %}

{% autocrossref %}

The `gettxout` RPC {{summary_getTxOut}}

*Parameter #1---the TXID of the output to get*

{% itemplate ntpd1 %}
- n: "TXID"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the transaction containing the output to get, encoded as hex in RPC byte order"

{% enditemplate %}


*Parameter #2---the output index number (vout) of the output to get*

{% itemplate ntpd1 %}
- n: "Vout"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The output index number (vout) of the output within the transaction; the first output in a transaction is vout 0"

{% enditemplate %}

*Parameter #3---whether to display unconfirmed outputs from the memory pool*

{% itemplate ntpd1 %}
- n: "Unconfirmed"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` to display unconfirmed outputs from the memory pool; set to `false` (the default) to only display outputs from confirmed transactions"

{% enditemplate %}

*Result---a description of the output*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object/null"
  p: "Required<br>(exactly 1)"
  d: "Information about the output.  If output wasn't found or if an error occurred, this will be JSON `null`"

- n: "→<br>`bestblock`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The hash of the header of the block on the local best block chain which includes this transaction.  The hash will encoded as hex in RPC byte order.  If the transaction is not part of a block, the string will be empty"

- n: "→<br>`confirmations`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The number of confirmations received for the transaction containing this output or `0` if the transaction hasn't been confirmed yet"

- n: "→<br>`value`"
  t: "number (bitcoins)"
  p: "Required<br>(exactly 1)"
  d: "The amount of bitcoins spent to this output.  May be `0`"

- n: "→<br>`scriptPubKey`"
  t: "string : object"
  p: "Optional<br>(0 or 1)"
  d: "An object with information about the pubkey script.  This may be `null` if there was no pubkey script"

- n: "→ →<br>`asm`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The pubkey script in decoded form with non-data-pushing opcodes listed"

- n: "→ →<br>`hex`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The pubkey script encoded as hex"

- n: "→ →<br>`reqSigs`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The number of signatures required; this is always `1` for P2PK, P2PKH, and P2SH (including P2SH multisig because the redeem script is not available in the pubkey script).  It may be greater than 1 for bare multisig.  This value will not be returned for `nulldata` or `nonstandard` script types (see the `type` key below)"

- n: "→ →<br>`type`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The type of script.  This will be one of the following:<br>• `pubkey` for a P2PK script<br>• `pubkeyhash` for a P2PKH script<br>• `scripthash` for a P2SH script<br>• `multisig` for a bare multisig script<br>• `nulldata` for nulldata scripts<br>• `nonstandard` for unknown scripts"

- n: "→ →<br>`addresses`"
  t: "string : array"
  p: "Optional<br>(0 or 1)"
  d: "The P2PKH or P2SH addresses used in this transaction, or the computed P2PKH address of any pubkeys in this transaction.  This array will not be returned for `nulldata` or `nonstandard` script types"

- n: "→ → →<br>Address"
  t: "string"
  p: "Required<br>(1 or more)"
  d: "A P2PKH or P2SH address"

- n: "→<br>`version`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The transaction version number of the transaction containing the pubkey script"

- n: "→<br>`coinbase`"
  t: "bool"
  p: "Required<br>(exactly 1)"
  d: "Set to `true` if the transaction output belonged to a coinbase transaction; set to `false` for all other transactions.  Coinbase transactions need to have 101 confirmations before their outputs can be spent"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Get the UTXO from the following transaction from the first output index ("0"),
searching the memory pool if necessary.


{% highlight bash %}
bitcoin-cli -testnet gettxout \
  d77aee99e8bdc11f40b8a9354956f0346fec5535b82c77c8b5c06047e3bca86a \
  0 true
{% endhighlight %}

Result:

{% highlight json %}
{
    "bestblock" : "00000000c92356f7030b1deeab54b3b02885711320b4c48523be9daa3e0ace5d",
    "confirmations" : 0,
    "value" : 0.00100000,
    "scriptPubKey" : {
        "asm" : "OP_DUP OP_HASH160 a11418d3c144876258ba02909514d90e71ad8443 OP_EQUALVERIFY OP_CHECKSIG",
        "hex" : "76a914a11418d3c144876258ba02909514d90e71ad844388ac",
        "reqSigs" : 1,
        "type" : "pubkeyhash",
        "addresses" : [
            "mvCfAJSKaoFXoJEvv8ssW7wxaqRPphQuSv"
        ]
    },
    "version" : 1,
    "coinbase" : false
}
{% endhighlight %}

*See also*

* [GetRawTransaction][rpc getrawtransaction]: {{summary_getRawTransaction}}
* [GetTransaction][rpc gettransaction]: {{summary_getTransaction}}

{% endautocrossref %}
