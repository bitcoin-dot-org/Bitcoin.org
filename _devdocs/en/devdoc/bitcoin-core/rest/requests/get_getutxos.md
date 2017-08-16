{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rest/requests/get_getutxos.md" %}

##### GET GetUtxos
{% include helpers/subhead-links.md %}

{% assign summary_restGetGetUtxos="returns an UTXO set given a set of outpoints." %}

{% autocrossref %}

The `GET getutxos` operation {{summary_restGetGetUtxos}} 

*Request*

{% highlight text %}
GET /getutxos/<checkmempool>/<txid>-<n>/<txid>-<n>/.../<txid>-<n>.<bin|hex|json>
{% endhighlight %}

*Parameter #1---Include memory pool transactions*

{% itemplate ntpd1 %}
- n: "Check mempool "
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "Set to `checkmempool` to include transactions that are currently in the memory pool to the calculation"

{% enditemplate %}

*Parameter #2---List of Outpoints*

{% itemplate ntpd1 %}
- n: "Outpoint"
  t: "vector"
  p: "Required<br>(1 or more)"
  d: "The list of outpoints to be queried. Each outpoint is the TXID of the transaction, encoded as hex in RPC byte order with an additional `-n` parameter for the output index (vout) number, with the index starting from 0"

{% enditemplate %}

*Parameter #3---the output format*

{% itemplate ntpd1 %}
- n: "Format"
  t: "suffix"
  p: "Required<br>(exactly 1)"
  d: "Set to `.json` for decoded block contents in JSON, or `.bin` or `hex` for a serialized block in binary or hex"

{% enditemplate %}

*Response as JSON*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "The requested UTXO set"

- n: "→→<br>`chainHeight`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The height of the chain at the moment the result was calculated"

- n: "→<br>`chaintipHash`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The block hash of the top of the chain at the moment the result was calculated"

- n: "→<br>`bitmap`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "Whether each requested output was found in the UTXO set or not.  A `1` is returned for those that were found and a `0` is returned for those that were not found.  Results are returned in the same order as outpoints were requested in the input parameters"

- n: "→<br>`utxos`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of objects each describing an outpoint that is unspent"

- n: "→→`Unspent Outpoint`"
  t: "object"
  p: "Optional<br>(0 or more)"
  d: "A UTXO match based on the query"

- n: "→→→<br>`txvers`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The version number of the transaction the UTXO was found in"
  
- n: "→<br>`height`"
  t: "number (int)"
  p: "Required (exactly 1)"
  d: "The height of the block containing the defining transaction, or 0x7FFFFFFF if the tx is in the mempool"
  
- n: "→ → →<br>`value`"
  t: "number (int)"
  p: "Required<br>(exactly 1)"
  d: "The value of the transaction"

- n: "→ → →<br>`scriptPubKey`"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object describing the pubkey script"

- n: "→ → → →<br>`asm`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The pubkey script in decoded form with non-data-pushing opcodes listed"

- n: "→ → → →<br>`hex`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The pubkey script encoded as hex"

- n: "→ → → →<br>`reqSigs`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The number of signatures required; this is always `1` for P2PK, P2PKH, and P2SH (including P2SH multisig because the redeem script is not available in the pubkey script).  It may be greater than 1 for bare multisig.  This value will not be returned for `nulldata` or `nonstandard` script types (see the `type` key below)"

- n: "→ → → →<br>`type`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The type of script.  This will be one of the following:<br>• `pubkey` for a P2PK script<br>• `pubkeyhash` for a P2PKH script<br>• `scripthash` for a P2SH script<br>• `multisig` for a bare multisig script<br>• `nulldata` for nulldata scripts<br>• `nonstandard` for unknown scripts"

- n: "→ → → →<br>`addresses`"
  t: "string : array"
  p: "Optional<br>(0 or 1)"
  d: "Array of P2PKH or P2SH addresses used in this transaction, or the computed P2PKH address of any pubkeys in this transaction.  This array will not be returned for `nulldata` or `nonstandard` script types"

- n: "→ → → → →<br>Address"
  t: "string"
  p: "Required<br>(1 or more)"
  d: "A P2PKH or P2SH address"
  
{% enditemplate %}

*Examples from Bitcoin Core 0.13.1*

Request the UTXO set:

{% highlight bash %}
curl http://localhost:8332/rest/getutxos/checkmempool/42f9df54a39026ccb54362141c41713968f19e1f14949ab6609b03ffa4b7f120-0.hex
{% endhighlight %}

Result (wrapped):

{% highlight bash %}
d0c306004f438cea9c68557da34e8e7823a963eb9350daa107ffd80100000000\
0000000001010101000000ffffff7fc8883303000000001976a9145f4865d186\
5127807f714b0ad1ddfae9870866d888ac
{% endhighlight %}

Same request in JSON:

{% highlight bash %}
curl http://localhost:8332/rest/getutxos/checkmempool/42f9df54a39026ccb54362141c41713968f19e1f14949ab6609b03ffa4b7f120-0.json
{% endhighlight %}

Result (whitespaced added):

{% highlight json %}
{
  "chainHeight": 443344,
  "chaintipHash": "000000000000000001d8ff07a1da5093eb63a923788e4ea37d55689cea8c434f",
  "bitmap": "1",
  "utxos": [
    {
      "txvers": 1,
      "height": 2147483647,
      "value": 0.53709,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 5f4865d1865127807f714b0ad1ddfae9870866d8 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a9145f4865d1865127807f714b0ad1ddfae9870866d888ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "19govWMzsRXqLUsUrHQKQ3DzekRxhsqwWH"
        ]
      }
    }
  ]
}
{% endhighlight %}

*See also*

* [GetTxOutSetInfo][rpc gettxoutsetinfo] RPC: {{summary_getTxOutSetInfo}}

{% endautocrossref %}
