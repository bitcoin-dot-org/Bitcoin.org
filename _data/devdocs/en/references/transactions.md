{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/references/transactions.md" %}

## Transactions
{% include helpers/subhead-links.md %}

The following subsections briefly document core transaction details.

#### OpCodes
{% include helpers/subhead-links.md %}

{% autocrossref %}

The opcodes used in the pubkey scripts of standard transactions are:

* Various data pushing opcodes from 0x00 to 0x4e (1--78). These aren't
  typically shown in examples, but they must be used to push
  signatures and public keys onto the stack. See the link below this list
  for a description.

* `OP_TRUE`/`OP_1` (0x51) and `OP_2` through `OP_16` (0x52--0x60), which
  push the values 1 through 16 to the stack.

* [`OP_CHECKSIG`][op_checksig]{:#term-op-checksig}{:.term} consumes a signature and a full public key, and pushes
  true onto the stack if the transaction data specified by the SIGHASH flag was
  converted into the signature using the same ECDSA private key that
  generated the public key.  Otherwise, it pushes false onto the stack.

* [`OP_DUP`][op_dup]{:#term-op-dup}{:.term} pushes a copy of the topmost stack item on to the stack.

* [`OP_HASH160`][op_hash160]{:#term-op-hash160}{:.term} consumes the topmost item on the stack,
  computes the RIPEMD160(SHA256()) hash of that item, and pushes that hash onto the stack.

* [`OP_EQUAL`][op_equal]{:#term-op-equal}{:.term} consumes the top two items on the stack, compares them, and
  pushes true onto the stack if they are the same, false if not.

* [`OP_VERIFY`][op_verify]{:#term-op-verify}{:.term} consumes the topmost item on the stack.
  If that item is zero (false) it terminates the script in failure.

* [`OP_EQUALVERIFY`][op_equalverify]{:#term-op-equalverify}{:.term} runs `OP_EQUAL` and then `OP_VERIFY` in sequence.

* [`OP_CHECKMULTISIG`][op_checkmultisig]{:#term-op-checkmultisig}{:.term} consumes the value (n) at the top of the stack,
  consumes that many of the next stack levels (public keys), consumes
  the value (m) now at the top of the stack, and consumes that many of
  the next values (signatures) plus one extra value.

    The "one extra value" it consumes is the result of an off-by-one
    error in the Bitcoin Core implementation. This value is not used, so
    signature scripts prefix the list of secp256k1 signatures with a
    single OP_0 (0x00).

    `OP_CHECKMULTISIG` compares the first signature against each public
    key until it finds an ECDSA match. Starting with the subsequent
    public key, it compares the second signature against each remaining
    public key until it finds an ECDSA match. The process is repeated
    until all signatures have been checked or not enough public keys
    remain to produce a successful result.

    Because public keys are not checked again if they fail any signature
    comparison, signatures must be placed in the signature script using
    the same order as their corresponding public keys were placed in
    the pubkey script or redeem script. See the `OP_CHECKMULTISIG` warning
    below for more details.

* [`OP_RETURN`][op_return]{:#term-op-return}{:.term} terminates the script in failure when executed.

A complete list of opcodes can be found on the Bitcoin Wiki [Script
Page][wiki script], with an authoritative list in the `opcodetype` enum
of the Bitcoin Core [script header file][core script.h]

![Warning icon](/img/icons/icon_warning.svg)
**<span id="signature_script_modification_warning">Signature script modification warning</span>:**
Signature scripts are not signed, so anyone can modify them. This
means signature scripts should only contain data and data-pushing opcodes
which can't be modified without causing the pubkey script to fail.
Placing non-data-pushing opcodes in the signature script currently
makes a transaction non-standard, and future consensus rules may forbid
such transactions altogether. (Non-data-pushing opcodes are already
forbidden in signature scripts when spending a P2SH pubkey script.)

![Warning icon](/img/icons/icon_warning.svg)
**`OP_CHECKMULTISIG` warning:** The multisig verification process
described above requires that signatures in the signature script be
provided in the same order as their corresponding public keys in
the pubkey script or redeem script. For example, the following
combined signature and pubkey script will produce the stack and
comparisons shown:

{% highlight text %}
OP_0 <A sig> <B sig> OP_2 <A pubkey> <B pubkey> <C pubkey> OP_3

Sig Stack       Pubkey Stack  (Actually a single stack)
---------       ------------
B sig           C pubkey
A sig           B pubkey
OP_0            A pubkey

1. B sig compared to C pubkey (no match)
2. B sig compared to B pubkey (match #1)
3. A sig compared to A pubkey (match #2)

Success: two matches found
{% endhighlight %}

But reversing the order of the signatures with everything else the same
will fail, as shown below:

{% highlight text %}
OP_0 <B sig> <A sig> OP_2 <A pubkey> <B pubkey> <C pubkey> OP_3

Sig Stack       Pubkey Stack  (Actually a single stack)
---------       ------------
A sig           C pubkey
B sig           B pubkey
OP_0            A pubkey

1. A sig compared to C pubkey (no match)
2. A sig compared to B pubkey (no match)

Failure, aborted: two signature matches required but none found so
                  far, and there's only one pubkey remaining
{% endhighlight %}

{% endautocrossref %}

#### Address Conversion
{% include helpers/subhead-links.md %}

{% autocrossref %}

The hashes used in P2PKH and P2SH outputs are commonly encoded as Bitcoin
addresses.  This is the procedure to encode those hashes and decode the
addresses.

First, get your hash.  For P2PKH, you RIPEMD-160(SHA256()) hash a ECDSA
public key derived from your 256-bit ECDSA private key (random data).
For P2SH, you RIPEMD-160(SHA256()) hash a redeem script serialized in the
format used in raw transactions (described in a [following
sub-section][raw transaction format]).  Taking the resulting hash:

1. Add an address version byte in front of the hash.  The version
bytes commonly used by Bitcoin are:

    * 0x00 for P2PKH addresses on the main Bitcoin network (mainnet)

    * 0x6f for P2PKH addresses on the Bitcoin testing network (testnet)

    * 0x05 for P2SH addresses on mainnet

    * 0xc4 for P2SH addresses on testnet

2. Create a copy of the version and hash; then hash that twice with SHA256: `SHA256(SHA256(version . hash))`

3. Extract the first four bytes from the double-hashed copy.
   These are used as a checksum to ensure the base hash gets transmitted
   correctly.

4. Append the checksum to the version and hash, and encode it as a base58
   string: <!--[-->`BASE58(version . hash . checksum)`<!--]-->
 
Bitcoin's base58 encoding, called [Base58Check][/en/glossary/base58check]{:#term-base58check}{:.term} may not match other implementations. Tier
Nolan provided the following example encoding algorithm to the Bitcoin
Wiki [Base58Check
encoding](https://en.bitcoin.it/wiki/Base58Check_encoding) page under
the [Creative Commons Attribution 3.0 license][]:

{% highlight c %}
code_string = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
x = convert_bytes_to_big_integer(hash_result)

output_string = ""

while(x > 0) 
   {
       (x, remainder) = divide(x, 58)
       output_string.append(code_string[remainder])
   }

repeat(number_of_leading_zero_bytes_in_hash)
   {
   output_string.append(code_string[0]);
   }

output_string.reverse();
{% endhighlight %}

Bitcoin's own code can be traced using the [base58 header
file][core base58.h].

To convert addresses back into hashes, reverse the base58 encoding, extract
the checksum, repeat the steps to create the checksum and compare it
against the extracted checksum, and then remove the version byte.

{% endautocrossref %}

#### Raw Transaction Format
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin transactions are broadcast between peers
in a serialized byte format, called [raw format][/en/glossary/serialized-transaction]{:#term-raw-format}{:.term}.
It is this form of a transaction which is SHA256(SHA256()) hashed to create
the TXID and, ultimately, the merkle root of a block containing the
transaction---making the transaction format part of the consensus rules.

Bitcoin Core and many other tools print and accept raw transactions
encoded as hex.

As of Bitcoin Core 0.9.3 (October 2014), all transactions use the
version 1 format described below. (Note: transactions in the block chain
are allowed to list a higher version number to permit soft forks, but
they are treated as version 1 transactions by current software.)

A raw transaction has the following top-level format:

| Bytes    | Name         | Data Type           | Description
|----------|--------------|---------------------|-------------
| 4        | version      | uint32_t            | Transaction version number; currently version 1.  Programs creating transactions using newer consensus rules may use higher version numbers.
| *Varies* | tx_in count  | compactSize uint    | Number of inputs in this transaction.
| *Varies* | tx_in        | txIn                | Transaction inputs.  See description of txIn below.
| *Varies* | tx_out count | compactSize uint    | Number of outputs in this transaction.
| *Varies* | tx_out       | txOut               | Transaction outputs.  See description of txOut below.
| 4        | lock_time    | uint32_t            | A time (Unix epoch time) or block number.  See the [locktime parsing rules][]. 

A transaction may have multiple inputs and outputs, so the txIn and
txOut structures may recur within a transaction. CompactSize unsigned
integers are a form of variable-length integers; they are described in
the [CompactSize section][section CompactSize unsigned integer].

{% endautocrossref %}

##### TxIn: A Transaction Input (Non-Coinbase) {#txin}
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

Each non-coinbase input spends an outpoint from a previous transaction.
(Coinbase inputs are described separately after the example section below.)

| Bytes    | Name             | Data Type            | Description
|----------|------------------|----------------------|--------------
| 36       | previous_output  | outpoint             | The previous outpoint being spent.  See description of outpoint below.
| *Varies* | script bytes     | compactSize uint     | The number of bytes in the signature script.  Maximum is 10,000 bytes.
| *Varies* | signature script | char[]               | A script-language script which satisfies the conditions placed in the outpoint's pubkey script.  Should only contain data pushes; see the [signature script modification warning][].
| 4        | sequence         | uint32_t             | Sequence number.  Default for Bitcoin Core and almost all other programs is 0xffffffff.

{% endautocrossref %}

##### Outpoint: The Specific Part Of A Specific Output {#outpoint}
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

Because a single transaction can include multiple outputs, the outpoint
structure includes both a TXID and an output index number to refer to
specific output.

| Bytes | Name  | Data Type | Description
|-------|-------|-----------|--------------
| 32    | hash  | char[32]  | The TXID of the transaction holding the output to spend.  The TXID is a hash provided here in internal byte order.
| 4     | index | uint32_t  | The output index number of the specific output to spend from the transaction. The first output is 0x00000000.

{% endautocrossref %}

##### TxOut: A Transaction Output {#txout}
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

Each output spends a certain number of satoshis, placing them under
control of anyone who can satisfy the provided pubkey script.

| Bytes    | Name            | Data Type        | Description
|----------|-----------------|------------------|--------------
| 8        | value           | int64_t          | Number of satoshis to spend.  May be zero; the sum of all outputs may not exceed the sum of satoshis previously spent to the outpoints provided in the input section.  (Exception: coinbase transactions spend the block subsidy and collected transaction fees.)
| 1+       | pk_script bytes | compactSize uint | Number of bytes in the pubkey script.  Maximum is 10,000 bytes.
| *Varies* | pk_script       | char[]           | Defines the conditions which must be satisfied to spend this output.

**Example**

The sample raw transaction itemized below is the one created in the
[Simple Raw Transaction section][section simple raw transaction] of the
Developer Examples. It spends a previous pay-to-pubkey output by paying
to a new pay-to-pubkey-hash (P2PKH) output.

{% highlight text %}
01000000 ................................... Version

01 ......................................... Number of inputs
|
| 7b1eabe0209b1fe794124575ef807057
| c77ada2138ae4fa8d6c4de0398a14f3f ......... Outpoint TXID
| 00000000 ................................. Outpoint index number
|
| 49 ....................................... Bytes in sig. script: 73
| | 48 ..................................... Push 72 bytes as data
| | | 30450221008949f0cb400094ad2b5eb3
| | | 99d59d01c14d73d8fe6e96df1a7150de
| | | b388ab8935022079656090d7f6bac4c9
| | | a94e0aad311a4268e082a725f8aeae05
| | | 73fb12ff866a5f01 ..................... Secp256k1 signature
|
| ffffffff ................................. Sequence number: UINT32_MAX

01 ......................................... Number of outputs
| f0ca052a01000000 ......................... Satoshis (49.99990000 BTC)
|
| 19 ....................................... Bytes in pubkey script: 25
| | 76 ..................................... OP_DUP
| | a9 ..................................... OP_HASH160
| | 14 ..................................... Push 20 bytes as data
| | | cbc20a7664f2f69e5355aa427045bc15
| | | e7c6c772 ............................. PubKey hash
| | 88 ..................................... OP_EQUALVERIFY
| | ac ..................................... OP_CHECKSIG

00000000 ................................... locktime: 0 (a block height)
{% endhighlight %}

{% endautocrossref %}

##### Coinbase Input: The Input Of The First Transaction In A Block {#coinbase}
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

The first transaction in a block, called the coinbase transaction, must
have exactly one input, called a coinbase. The coinbase input currently
has the following format.

| Bytes    | Name               | Data Type            | Description
|----------|--------------------|----------------------|--------------
| 32       | hash (null)        | char[32]             | A 32-byte null, as a coinbase has no previous outpoint.
| 4        | index (UINT32_MAX) | uint32_t             | 0xffffffff, as a coinbase has no previous outpoint.
| *Varies* | script bytes       | compactSize uint     | The number of bytes in the coinbase script, up to a maximum of 100 bytes.
| *Varies* (4) | height         | script               | The [block height][/en/glossary/coinbase]{:#term-coinbase-block-height}{:.term} of this block as required by BIP34.  Uses script language: starts with a data-pushing opcode that indicates how many bytes to push to the stack followed by the block height as a little-endian unsigned integer.  This script must be as short as possible, otherwise it may be rejected.<br/><br/>  The data-pushing opcode will be 0x03 and the total size four bytes until block 16,777,216 about 300 years from now.
| *Varies* | coinbase script    | *None*               | The [coinbase field][/en/glossary/coinbase]{:#term-coinbase-field}{:.term}: Arbitrary data not exceeding 100 bytes minus the (4) height bytes.  Miners commonly place an extra nonce in this field to update the block header merkle root during hashing.
| 4        | sequence           | uint32_t             | Sequence number.

Most (but not all) blocks prior to block height 227,836 used block
version 1 which did not require the height parameter to be prefixed to
the coinbase script.  The block height parameter is now required.

Although the coinbase script is arbitrary data, if it includes the
bytes used by any signature-checking operations such as `OP_CHECKSIG`,
those signature checks will be counted as signature operations (sigops)
towards the block's sigop limit.  To avoid this, you can prefix all data
with the appropriate push operation.

An itemized coinbase transaction:

{% highlight text %}
01000000 .............................. Version

01 .................................... Number of inputs
| 00000000000000000000000000000000
| 00000000000000000000000000000000 ...  Previous outpoint TXID
| ffffffff ............................ Previous outpoint index
|
| 29 .................................. Bytes in coinbase
| |
| | 03 ................................ Bytes in height
| | | 4e0105 .......................... Height: 328014
| |
| | 062f503253482f0472d35454085fffed
| | f2400000f90f54696d65202620486561
| | 6c74682021 ........................ Arbitrary data
| 00000000 ............................ Sequence

01 .................................... Output count
| 2c37449500000000 .................... Satoshis (25.04275756 BTC)
| 1976a914a09be8040cbf399926aeb1f4
| 70c37d1341f3b46588ac ................ P2PKH script
| 00000000 ............................ Locktime
{% endhighlight %}

{% endautocrossref %}

### CompactSize Unsigned Integers
{% include helpers/subhead-links.md %}

{% autocrossref %}

The raw transaction format and several peer-to-peer network messages use
a type of variable-length integer to indicate the number of bytes in a
following piece of data.

Bitcoin Core code and this document refers to these variable length
integers as compactSize. Many other documents refer to them as var_int
or varInt, but this risks conflation with other variable-length integer
encodings---such as the CVarInt class used in Bitcoin Core for
serializing data to disk.  Because it's used in the transaction format,
the format of compactSize unsigned integers is part of the consensus
rules.

For numbers from 0 to 252, compactSize unsigned integers look like
regular unsigned integers. For other numbers up to 0xffffffffffffffff, a
byte is prefixed to the number to indicate its length---but otherwise
the numbers look like regular unsigned integers in little-endian order.

| Value                                   | Bytes Used | Format
|-----------------------------------------|------------|-----------------------------------------
| >= 0 && <= 252                          | 1          | uint8_t
| >= 253 && <= 0xffff                     | 3          | 0xfd followed by the number as uint16_t
| >= 0x10000 && <= 0xffffffff             | 5          | 0xfe followed by the number as uint32_t
| >= 0x100000000 && <= 0xffffffffffffffff | 9          | 0xff followed by the number as uint64_t

For example, the number 515 is encoded as 0xfd0302.

{% endautocrossref %}
