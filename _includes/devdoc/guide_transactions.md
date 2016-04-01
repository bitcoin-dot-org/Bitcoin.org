{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/guide_transactions.md" %}

## Transactions
{% include helpers/subhead-links.md %}

{% autocrossref %}

<!-- reference tx (made by Satoshi in block 170): 
    bitcoind decoderawtransaction $( bitcoind getrawtransaction f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16 )
-->

<!-- SOMEDAY: we need more terms than just output/input to denote the
various ways the outputs/inputs are used, such as "prevout", "nextout",
"curout", "curin", "nextin".  (Is there any use for "previn"?)  Someday,
when I'm terribly bored, I should rewrite this whole transaction section
to use those terms and then get feedback to see if it actually helps. -harding -->

Transactions let users spend satoshis. Each transaction is constructed
out of several parts which enable both simple direct payments and complex
transactions. This section will describe each part and
demonstrate how to use them together to build complete transactions.

To keep things simple, this section pretends coinbase transactions do
not exist. Coinbase transactions can only be created by Bitcoin miners
and they're an exception to many of the rules listed below. Instead of
pointing out the coinbase exception to each rule, we invite you to read
about coinbase transactions in the block chain section of this guide.

![The Parts Of A Transaction](/img/dev/en-tx-overview.svg)

The figure above shows the main parts of a Bitcoin transaction. Each
transaction has at least one input and one output. Each [input][/en/glossary/input]{:#term-input}{:.term} spends the
satoshis paid to a previous output. Each [output][/en/glossary/output]{:#term-output}{:.term} then waits as an Unspent
Transaction Output (UTXO) until a later input spends it. When your
Bitcoin wallet tells you that you have a 10,000 satoshi balance, it really
means that you have 10,000 satoshis waiting in one or more UTXOs.

Each transaction is prefixed by a four-byte [transaction version number][]{:#term-transaction-version-number}{:.term} which tells
Bitcoin peers and miners which set of rules to use to validate it.  This
lets developers create new rules for future transactions without
invalidating previous transactions.

![Spending An Output](/img/dev/en-tx-overview-spending.svg)

An output has an implied index number based on its location in the
transaction---the first output is output zero. The output also has an
amount in satoshis which it pays to a conditional pubkey script. Anyone
who can satisfy the conditions of that pubkey script can spend up to the
amount of satoshis paid to it.

An input uses a transaction identifier (txid) and an output index number
(often called "vout" for output vector) to identify a particular output to
be spent. It also has a signature script which allows it to provide data
parameters that satisfy the conditionals in the pubkey script. (The sequence
number and locktime are related and will be covered together in
a later subsection.)

The figures below help illustrate how these features are used by
showing the workflow Alice uses to send Bob a transaction and which Bob
later uses to spend that transaction. Both Alice and Bob will use the
most common form of the standard Pay-To-Public-Key-Hash (P2PKH) transaction
type. [P2PKH][/en/glossary/p2pkh-address]{:#term-p2pkh}{:.term} lets Alice spend satoshis to a typical Bitcoin address,
and then lets Bob further spend those satoshis using a simple
cryptographic key pair.

![Creating A P2PKH Public Key Hash To Receive Payment](/img/dev/en-creating-p2pkh-output.svg)

Bob must first generate a private/public [key pair][]{:#term-key-pair}{:.term} before Alice can create the
first transaction. Bitcoin uses the Elliptic Curve Digital Signature Algorithm (ECDSA) with
the secp256k1 curve; secp256k1 [private keys][/en/glossary/private-key]{:#term-private-key}{:.term} are 256 bits of random
data. A copy of that data is deterministically transformed into an secp256k1 [public
key][/en/glossary/public-key]{:#term-public-key}{:.term}. Because the transformation can be reliably repeated later, the
public key does not need to be stored.

The public key (pubkey) is then cryptographically hashed. This pubkey hash can
also be reliably repeated later, so it also does not need to be stored.
The hash shortens and obfuscates the public key, making manual
transcription easier and providing security against
unanticipated problems which might allow reconstruction of private keys
from public key data at some later point.

<!-- Editors: from here on I will typically use the terms "pubkey hash"
and "full public key" to provide quick differentiation between the
different states of a public key and to help the text better match the
space-constrained diagrams where "public-key hash" wouldn't fit. -harding -->

Bob provides the pubkey hash to Alice. Pubkey hashes are almost always
sent encoded as Bitcoin [addresses][/en/glossary/address]{:#term-address}{:.term}, which are base58-encoded strings
containing an address version number, the hash, and an error-detection
checksum to catch typos. The address can be transmitted
through any medium, including one-way mediums which prevent the spender
from communicating with the receiver, and it can be further encoded
into another format, such as a QR code containing a `bitcoin:`
URI.

Once Alice has the address and decodes it back into a standard hash, she
can create the first transaction. She creates a standard P2PKH
transaction output containing instructions which allow anyone to spend that
output if they can prove they control the private key corresponding to
Bob's hashed public key. These instructions are called the [pubkey script][/en/glossary/pubkey-script]{:#term-pubkey-script}{:.term}
or scriptPubKey.

Alice broadcasts the transaction and it is added to the block chain.
The network categorizes it as an Unspent Transaction Output (UTXO), and Bob's
wallet software displays it as a spendable balance.

When, some time later, Bob decides to spend the UTXO, he must create an
input which references the transaction Alice created by its hash, called
a Transaction Identifier (txid), and the specific output she used by its
index number ([output index][]{:#term-output-index}{:.term}). He must then create a [signature
script][/en/glossary/signature-script]{:#term-signature-script}{:.term}---a
collection of data parameters which satisfy the conditions Alice placed
in the previous output's pubkey script.  Signature scripts are also
called scriptSigs.

Pubkey scripts and signature scripts combine secp256k1 pubkeys
and signatures with conditional logic, creating a programmable
authorization mechanism.

![Unlocking A P2PKH Output For Spending](/img/dev/en-unlocking-p2pkh-output.svg)

For a P2PKH-style output, Bob's signature script will contain the following two
pieces of data:

1. His full (unhashed) public key, so the pubkey script can check that it
   hashes to the same value as the pubkey hash provided by Alice.

2. An secp256k1 [signature][/en/glossary/signature]{:#term-signature}{:.term} made by using the ECDSA cryptographic formula to combine
   certain transaction data (described below) with Bob's private key.
   This lets the pubkey script verify that Bob owns the private key which
   created the public key.

Bob's secp256k1 signature doesn't just prove Bob controls his private key; it also
makes the non-signature-script parts of his transaction tamper-proof so Bob can safely
broadcast them over the peer-to-peer network.

![Some Things Signed When Spending An Output](/img/dev/en-signing-output-to-spend.svg)

As illustrated in the figure above, the data Bob signs includes the
txid and output index of the previous transaction, the previous
output's pubkey script, the pubkey script Bob creates which will let the next
recipient spend this transaction's output, and the amount of satoshis to
spend to the next recipient. In essence, the entire transaction is
signed except for any signature scripts, which hold the full public keys and
secp256k1 signatures.

After putting his signature and public key in the signature script, Bob
broadcasts the transaction to Bitcoin miners through the peer-to-peer
network. Each peer and miner independently validates the transaction
before broadcasting it further or attempting to include it in a new block of
transactions.

{% endautocrossref %}

### P2PKH Script Validation
{% include helpers/subhead-links.md %}

{% autocrossref %}

The validation procedure requires evaluation of the signature script and pubkey script.
In a P2PKH output, the pubkey script is:

{% endautocrossref %}

~~~
OP_DUP OP_HASH160 <PubkeyHash> OP_EQUALVERIFY OP_CHECKSIG
~~~

{% autocrossref %}

The spender's signature script is evaluated and prefixed to the beginning of the
script. In a P2PKH transaction, the signature script contains an secp256k1 signature (sig)
and full public key (pubkey), creating the following concatenation:

{% endautocrossref %}

~~~
<Sig> <PubKey> OP_DUP OP_HASH160 <PubkeyHash> OP_EQUALVERIFY OP_CHECKSIG
~~~

{% autocrossref %}

The script language is a
[Forth-like](https://en.wikipedia.org/wiki/Forth_%28programming_language%29)
stack-based language deliberately designed to be stateless and not
Turing complete. Statelessness ensures that once a transaction is added
to the block chain, there is no condition which renders it permanently
unspendable. Turing-incompleteness (specifically, a lack of loops or
gotos) makes the script language less flexible and more predictable,
greatly simplifying the security model.

<!-- Editors: please do not substitute for the words push or pop in
sections about stacks. These are programming terms. Also "above",
"below", "top", and "bottom" are commonly used relative directions or
locations in stack descriptions. -harding -->

To test whether the transaction is valid, signature script and pubkey script operations
are executed one item at a time, starting with Bob's signature script
and continuing to the end of Alice's pubkey script. The figure below shows the
evaluation of a standard P2PKH pubkey script; below the figure is a description
of the process.

![P2PKH Stack Evaluation](/img/dev/en-p2pkh-stack.svg)

* The signature (from Bob's signature script) is added (pushed) to an empty stack.
  Because it's just data, nothing is done except adding it to the stack.
  The public key (also from the signature script) is pushed on top of the signature.

* From Alice's pubkey script, the `OP_DUP` operation is executed. `OP_DUP` pushes onto the stack
  a copy of the data currently at the top of it---in this
  case creating a copy of the public key Bob provided.

* The operation executed next, `OP_HASH160`, pushes onto the stack a hash
  of the data currently on top of it---in this case, Bob's public key.
  This creates a hash of Bob's public key.

* Alice's pubkey script then pushes the pubkey hash that Bob gave her for the
  first transaction.  At this point, there should be two copies of Bob's
  pubkey hash at the top of the stack.

* Now it gets interesting: Alice's pubkey script executes `OP_EQUALVERIFY`.
  `OP_EQUALVERIFY` is equivalent to executing `OP_EQUAL` followed by `OP_VERIFY` (not shown).

    `OP_EQUAL` (not shown) checks the two values at the top of the stack; in this
    case, it checks whether the pubkey hash generated from the full
    public key Bob provided equals the pubkey hash Alice provided when
    she created transaction #1. `OP_EQUAL` pops (removes from the top of the stack)
    the two values it compared, and replaces them with the result of that comparison:
    zero (*false*) or one (*true*).

    `OP_VERIFY` (not shown) checks the value at the top of the stack. If
    the value is *false* it immediately terminates evaluation and
    the transaction validation fails. Otherwise it pops the *true* value off the stack.

* Finally, Alice's pubkey script executes `OP_CHECKSIG`, which checks the
  signature Bob provided against the now-authenticated public key he
  also provided. If the signature matches the public key and was
  generated using all of the data required to be signed, `OP_CHECKSIG`
  pushes the value *true* onto the top of the stack.

If *false* is not at the top of the stack after the pubkey script has been
evaluated, the transaction is valid (provided there are no other
problems with it).

{% endautocrossref %}

### P2SH Scripts
{% include helpers/subhead-links.md %}

{% autocrossref %}

Pubkey scripts are created by spenders who have little interest what
that script does. Receivers do care about the script conditions and, if
they want, they can ask spenders to use a particular pubkey script.
Unfortunately, custom pubkey scripts are less convenient than short
Bitcoin addresses and there was no standard way to communicate them
between programs prior to widespread implementation of the BIP70 Payment
Protocol discussed later.

To solve these problems, pay-to-script-hash
([P2SH][/en/glossary/p2sh-address]{:#term-p2sh}{:.term}) transactions were created in 2012 to let
a spender create a pubkey script containing a hash of a second
script, the
[redeem script][/en/glossary/redeem-script]{:#term-redeem-script}{:.term}.

The basic P2SH workflow, illustrated below, looks almost identical to
the P2PKH workflow. Bob creates a redeem script with whatever script he
wants, hashes the redeem script, and provides the redeem script
hash to Alice. Alice creates a P2SH-style output containing
Bob's redeem script hash.

![Creating A P2SH Redeem Script And Hash](/img/dev/en-creating-p2sh-output.svg)

When Bob wants to spend the output, he provides his signature along with
the full (serialized) redeem script in the signature script. The
peer-to-peer network ensures the full redeem script hashes to the same
value as the script hash Alice put in her output; it then processes the
redeem script exactly as it would if it were the primary pubkey script, letting
Bob spend the output if the redeem script does not return false.

![Unlocking A P2SH Output For Spending](/img/dev/en-unlocking-p2sh-output.svg)

The hash of the redeem script has the same properties as a pubkey
hash---so it can be transformed into the standard Bitcoin address format
with only one small change to differentiate it from a standard address.
This makes collecting a P2SH-style address as simple as collecting a
P2PKH-style address. The hash also obfuscates any public keys in the
redeem script, so P2SH scripts are as secure as P2PKH pubkey hashes.

{% endautocrossref %}

### Standard Transactions
{% include helpers/subhead-links.md %}

{% autocrossref %}

After the discovery of several dangerous bugs in early versions of
Bitcoin, a test was added which only accepted transactions from the
network if their pubkey scripts and signature scripts matched a small set of
believed-to-be-safe templates, and if the rest of the transaction didn't
violate another small set of rules enforcing good network behavior. This
is the `IsStandard()` test, and transactions which pass it are called
standard transactions.

Non-standard transactions---those that fail the test---may be accepted
by nodes not using the default Bitcoin Core settings. If they are
included in blocks, they will also avoid the IsStandard test and be
processed.

Besides making it more difficult for someone to attack Bitcoin for
free by broadcasting harmful transactions, the standard transaction
test also helps prevent users from creating transactions today that
would make adding new transaction features in the future more
difficult. For example, as described above, each transaction includes
a version number---if users started arbitrarily changing the version
number, it would become useless as a tool for introducing
backwards-incompatible features.


As of Bitcoin Core 0.9, the standard pubkey script types are:

{% endautocrossref %}

#### Pay To Public Key Hash (P2PKH)
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

P2PKH is the most common form of pubkey script used to send a transaction to one
or multiple Bitcoin addresses.

{% endautocrossref %}

~~~
Pubkey script: OP_DUP OP_HASH160 <PubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
Signature script: <sig> <pubkey> 
~~~

#### Pay To Script Hash (P2SH)
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

P2SH is used to send a transaction to a script hash. Each of the standard
pubkey scripts can be used as a P2SH redeem script, but in practice only the
multisig pubkey script makes sense until more transaction types are made standard.

{% endautocrossref %}

~~~
Pubkey script: OP_HASH160 <Hash160(redeemScript)> OP_EQUAL
Signature script: <sig> [sig] [sig...] <redeemScript>
~~~

#### Multisig
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

Although P2SH multisig is now generally used for multisig transactions, this base script
can be used to require multiple signatures before a UTXO can be spent.

In multisig pubkey scripts, called m-of-n, *m* is the *minimum* number of signatures
which must match a public key; *n* is the *number* of public keys being
provided. Both *m* and *n* should be opcodes `OP_1` through `OP_16`,
corresponding to the number desired.

Because of an off-by-one error in the original Bitcoin implementation
which must be preserved for compatibility, `OP_CHECKMULTISIG`
consumes one more value from the stack than indicated by *m*, so the
list of secp256k1 signatures in the signature script must be prefaced with an extra value
(`OP_0`) which will be consumed but not used.

The signature script must provide signatures in the same order as the
corresponding public keys appear in the pubkey script or redeem
script. See the description in [`OP_CHECKMULTISIG`][op_checkmultisig]
for details.

{% endautocrossref %}

~~~
Pubkey script: <m> <A pubkey> [B pubkey] [C pubkey...] <n> OP_CHECKMULTISIG
Signature script: OP_0 <A sig> [B sig] [C sig...]
~~~

{% autocrossref %}

Although it’s not a separate transaction type, this is a P2SH multisig with 2-of-3:

{% endautocrossref %}

~~~
Pubkey script: OP_HASH160 <Hash160(redeemScript)> OP_EQUAL
Redeem script: <OP_2> <A pubkey> <B pubkey> <C pubkey> <OP_3> OP_CHECKMULTISIG
Signature script: OP_0 <A sig> <C sig> <redeemScript>
~~~

#### Pubkey
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

Pubkey outputs are a simplified form of the P2PKH pubkey script,
but they aren’t as
secure as P2PKH, so they generally
aren’t used in new transactions anymore.

{% endautocrossref %}

~~~
Pubkey script: <pubkey> OP_CHECKSIG
Signature script: <sig>
~~~

#### Null Data
{:.no_toc}
{% include helpers/subhead-links.md %}

{% autocrossref %}

[Null data][/en/glossary/null-data-transaction]{:#term-null-data}{:.term}
transaction type relayed and mined by default in Bitcoin Core 0.9.0 and
later that adds arbitrary data to a provably unspendable pubkey script
that full nodes don't have to store in their UTXO database. It is
preferable to use null data transactions over transactions that bloat
the UTXO database because they cannot be automatically pruned; however,
it is usually even more preferable to store data outside transactions
if possible.

Consensus rules allow null data outputs up to the maximum allowed pubkey
script size of 10,000 bytes provided they follow all other consensus
rules, such as not having any data pushes larger than 520 bytes.

Bitcoin Core 0.9.x to 0.10.x will, by default, relay and mine null data
transactions with up to 40 bytes in a single data push and only one null
data output that pays exactly 0 satoshis:

{% endautocrossref %}

~~~
Pubkey Script: OP_RETURN <0 to 40 bytes of data>
(Null data scripts cannot be spent, so there's no signature script.)
~~~

Bitcoin Core 0.11.x increases this default to 80 bytes, with the other
rules remaining the same.

It is expected that Bitcoin Core 0.12.0 (not released yet) will default
to relaying and mining null data outputs with up to 83 bytes with any
number of data pushes, provided the total byte limit is not exceeded.
There must still only be a single null data output and it must still pay
exactly 0 satoshis.

The `-datacarriersize` Bitcoin Core configuration option allows you to
set the maximum number of bytes in null data outputs that you will relay
or mine.

#### Non-Standard Transactions
{% include helpers/subhead-links.md %}

{% autocrossref %}

If you use anything besides a standard pubkey script in an output, peers
and miners using the default Bitcoin Core settings will neither
accept, broadcast, nor mine your transaction. When you try to broadcast
your transaction to a peer running the default settings, you will
receive an error.

If you create a redeem script, hash it, and use the hash
in a P2SH output, the network sees only the hash, so it will accept the
output as valid no matter what the redeem script says.
This allows payment to non-standard scripts, and as of Bitcoin Core
0.11, almost all valid redeem scripts can be spent. The exception is
scripts that use unassigned [NOP opcodes][]; these opcodes are
reserved for future soft forks and can only be relayed or mined by nodes
that don't follow the standard mempool policy.

Note: standard transactions are designed to protect and help the
network, not prevent you from making mistakes. It's easy to create
standard transactions which make the satoshis sent to them unspendable.

As of Bitcoin Core 0.9.3, standard transactions must also meet the following
conditions:

* The transaction must be finalized: either its locktime must be in the
  past (or less than or equal to the current block height), or all of its sequence
  numbers must be 0xffffffff.

* The transaction must be smaller than 100,000 bytes. That's around 200
  times larger than a typical single-input, single-output P2PKH
  transaction.

* Each of the transaction's signature scripts must be smaller than 1,650 bytes.
  That's large enough to allow 15-of-15 multisig transactions in P2SH
  using compressed public keys.

* Bare (non-P2SH) multisig transactions which require more than 3 public keys are
  currently non-standard.

* The transaction's signature script must only push data to the script
  evaluation stack. It cannot push new opcodes, with the exception of
  opcodes which solely push data to the stack.

* The transaction must not include any outputs which receive fewer than
  1/3 as many satoshis as it would take to spend it in a typical input.
  That's [currently 546 satoshis][bitcoin core fee drop commit] for a
  P2PKH or P2SH output on a Bitcoin Core node with the default relay fee.
  Exception: standard null data outputs must receive zero satoshis.

{% endautocrossref %}

### Signature Hash Types
{% include helpers/subhead-links.md %}

{% autocrossref %}

`OP_CHECKSIG` extracts a non-stack argument from each signature it
evaluates, allowing the signer to decide which parts of the transaction
to sign. Since the signature protects those parts of the transaction
from modification, this lets signers selectively choose to let other
people modify their transactions.

The various options for what to sign are
called [signature hash][/en/glossary/signature-hash]{:#term-signature-hash}{:.term} types. There are three base SIGHASH types
currently available:

* [`SIGHASH_ALL`][/en/glossary/sighash-all]{:#term-sighash-all}{:.term}, the default, signs all the inputs and outputs,
  protecting everything except the signature scripts against modification.

* [`SIGHASH_NONE`][/en/glossary/sighash-none]{:#term-sighash-none}{:.term} signs all of the inputs but none of the outputs,
  allowing anyone to change where the satoshis are going unless other
  signatures using other signature hash flags protect the outputs.

* [`SIGHASH_SINGLE`][/en/glossary/sighash-single]{:#term-sighash-single}{:.term}
  the only output signed is the one corresponding to this input (the output
  with the same output index number as this input), ensuring nobody can change
  your part of the transaction but allowing other signers to change their part
  of the transaction. The corresponding output must exist or the value "1" will
  be signed, breaking the security scheme. This input, as well as other inputs,
  are included in the signature. The sequence numbers of other inputs are not
  included in the signature, and can be updated.

The base types can be modified with the [`SIGHASH_ANYONECANPAY`][/en/glossary/sighash-anyonecanpay]{:#term-sighash-anyonecanpay}{:.term} (anyone can
pay) flag, creating three new combined types:

* `SIGHASH_ALL|SIGHASH_ANYONECANPAY` signs all of the outputs but only
  this one input, and it also allows anyone to add or remove other
  inputs, so anyone can contribute additional satoshis but they cannot
  change how many satoshis are sent nor where they go.

* `SIGHASH_NONE|SIGHASH_ANYONECANPAY` signs only this one input and
  allows anyone to add or remove other inputs or outputs, so anyone who
  gets a copy of this input can spend it however they'd like.

* `SIGHASH_SINGLE|SIGHASH_ANYONECANPAY` signs this one input and its
  corresponding output. Allows anyone to add or remove other inputs.

Because each input is signed, a transaction with multiple inputs can
have multiple signature hash types signing different parts of the transaction. For
example, a single-input transaction signed with `NONE` could have its
output changed by the miner who adds it to the block chain. On the other
hand, if a two-input transaction has one input signed with `NONE` and
one input signed with `ALL`, the `ALL` signer can choose where to spend
the satoshis without consulting the `NONE` signer---but nobody else can
modify the transaction.

<!-- TODO: describe useful combinations maybe using a 3x3 grid;
do something similar for the multisig section with different hashtypes
between different sigs -->

<!-- TODO: add to the technical section details about what the different
hash types sign, including the procedure for inserting the subscript -->

{% endautocrossref %}

### Locktime And Sequence Number
{% include helpers/subhead-links.md %}

{% autocrossref %}

One thing all signature hash types sign is the transaction's [locktime][/en/glossary/locktime]{:#term-locktime}{:.term}.
(Called nLockTime in the Bitcoin Core source code.)
The locktime indicates the earliest time a transaction can be added to
the block chain.  

Locktime allows signers to create time-locked transactions which will
only become valid in the future, giving the signers a chance to change
their minds.

If any of the signers change their mind, they can create a new
non-locktime transaction. The new transaction will use, as one of
its inputs, one of the same outputs which was used as an input to
the locktime transaction. This makes the locktime transaction
invalid if the new transaction is added to the block chain before
the time lock expires.

Care must be taken near the expiry time of a time lock. The peer-to-peer
network allows block time to be up to two hours ahead of
real time, so a locktime transaction can be added to the block chain up
to two hours before its time lock officially expires. Also, blocks are
not created at guaranteed intervals, so any attempt to cancel a valuable
transaction should be made a few hours before the time lock expires.

Previous versions of Bitcoin Core provided a feature which prevented
transaction signers from using the method described above to cancel a
time-locked transaction, but a necessary part of this feature was
disabled to prevent denial of service attacks. A legacy of this system are four-byte
[sequence numbers][/en/glossary/sequence-number]{:#term-sequence-number}{:.term} in every input. Sequence numbers were meant to allow
multiple signers to agree to update a transaction; when they finished
updating the transaction, they could agree to set every input's
sequence number to the four-byte unsigned maximum (0xffffffff),
allowing the transaction to be added to a block even if its time lock
had not expired.

Even today, setting all sequence numbers to 0xffffffff (the default in
Bitcoin Core) can still disable the time lock, so if you want to use
locktime, at least one input must have a sequence number below the
maximum. Since sequence numbers are not used by the network for any
other purpose, setting any sequence number to zero is sufficient to
enable locktime.

<span id="locktime_parsing_rules">Locktime itself is an unsigned 4-byte integer which can be parsed two ways:</span>

* If less than 500 million, locktime is parsed as a block height. The
  transaction can be added to any block which has this height or higher.

* If greater than or equal to 500 million, locktime is parsed using the
  Unix epoch time format (the number of seconds elapsed since
  1970-01-01T00:00 UTC---currently over 1.395 billion). The transaction
  can be added to any block whose block time is greater
  than the locktime.

{% endautocrossref %}

### Transaction Fees And Change
{% include helpers/subhead-links.md %}

{% autocrossref %}

Transactions typically pay transaction fees based on the total byte size
of the signed transaction.  The transaction fee is given to the
Bitcoin miner, as explained in the [block chain section][section block chain], and so it is
ultimately up to each miner to choose the minimum transaction fee they
will accept.

<!-- TODO: check: 50 KB or 50 KiB?  Not that transactors care... -->

By default, miners reserve 50 KB of each block for [high-priority
transactions][/en/glossary/high-priority-transaction]{:#term-high-priority-transactions}{:.term} which spend satoshis that haven't been spent for a long
time.  The remaining space in each block is typically allocated to transactions
based on their fee per byte, with higher-paying transactions being added
in sequence until all of the available space is filled.

As of Bitcoin Core 0.9, transactions which do not count as high-priority transactions
need to pay a [minimum fee][/en/glossary/minimum-relay-fee]{:#term-minimum-fee}{:.term} (currently 1,000 satoshis) to be
broadcast across the network. Any transaction paying only the minimum fee
should be prepared to wait a long time before there's enough spare space
in a block to include it. Please see the [verifying payment section][section verifying payment]
for why this could be important.

Since each transaction spends Unspent Transaction Outputs (UTXOs) and
because a UTXO can only be spent once, the full value of the included
UTXOs must be spent or given to a miner as a transaction fee.  Few
people will have UTXOs that exactly match the amount they want to pay,
so most transactions include a change output.

[Change outputs][/en/glossary/change-address]{:#term-change-output}{:.term} are regular outputs which spend the surplus satoshis
from the UTXOs back to the spender.  They can reuse the same P2PKH pubkey hash
or P2SH script hash as was used in the UTXO, but for the reasons
described in the [next subsection](#avoiding-key-reuse), it is highly recommended that change
outputs be sent to a new P2PKH or P2SH address.

{% endautocrossref %}

### Avoiding Key Reuse
{% include helpers/subhead-links.md %}

{% autocrossref %}

In a transaction, the spender and receiver each reveal to each other all
public keys or addresses used in the transaction. This allows either
person to use the public block chain to track past and future
transactions involving the other person's same public keys or addresses.

If the same public key is reused often, as happens when people use
Bitcoin addresses (hashed public keys) as static payment addresses,
other people can easily track the receiving and spending habits of that
person, including how many satoshis they control in known addresses.

It doesn't have to be that way. If each public key is used exactly
twice---once to receive a payment and once to spend that payment---the
user can gain a significant amount of financial privacy.

Even better, using new public keys or [unique
addresses][]{:#term-unique-address}{:.term} when accepting payments or creating
change outputs can be combined with other techniques discussed later,
such as CoinJoin or merge avoidance, to make it extremely difficult to
use the block chain by itself to reliably track how users receive and
spend their satoshis.

Avoiding key reuse can also provide security against attacks which might
allow reconstruction of private keys from public keys (hypothesized) or
from signature comparisons (possible today under certain circumstances
described below, with more general attacks hypothesized).

1. Unique (non-reused) P2PKH and P2SH addresses protect against the first
   type of attack by keeping ECDSA public keys hidden (hashed) until the
   first time satoshis sent to those addresses are spent, so attacks
   are effectively useless unless they can reconstruct private keys in
   less than the hour or two it takes for a transaction to be well
   protected by the block chain.

2. Unique (non-reused) private keys protect against the second type of
   attack by only generating one signature per private key, so attackers
   never get a subsequent signature to use in comparison-based attacks.
   Existing comparison-based attacks are only practical today when 
   insufficient entropy is used in signing or when the entropy used
   is exposed by some means, such as a
   [side-channel attack](https://en.wikipedia.org/wiki/Side_channel_attack).

So, for both privacy and security, we encourage you to build your
applications to avoid public key reuse and, when possible, to discourage
users from reusing addresses. If your application needs to provide a
fixed URI to which payments should be sent, please see the
[`bitcoin:` URI section][bitcoin URI subsection] below.

{% endautocrossref %}

### Transaction Malleability
{% include helpers/subhead-links.md %}

{% autocrossref %}

None of Bitcoin's signature hash types protect the signature script, leaving
the door open for a limited denial of service attack called [transaction
malleability][/en/glossary/malleability]{:.term}{:#term-transaction-malleability}. The signature script
contains the secp256k1 signature, which can't sign itself, allowing attackers to
make non-functional modifications to a transaction without rendering it
invalid. For example, an attacker can add some data to the signature script
which will be dropped before the previous pubkey script is processed.

Although the modifications are non-functional---so they do not change
what inputs the transaction uses nor what outputs it pays---they do
change the computed hash of the transaction. Since each transaction
links to previous transactions using hashes as a transaction
identifier (txid), a modified transaction will not have the txid its
creator expected.

This isn't a problem for most Bitcoin transactions which are designed to
be added to the block chain immediately. But it does become a problem
when the output from a transaction is spent before that transaction is
added to the block chain.

Bitcoin developers have been working to reduce transaction malleability
among standard transaction types, but a complete fix is still only in
the planning stages. At present, new transactions should not depend on
previous transactions which have not been added to the block chain yet,
especially if large amounts of satoshis are at stake.

Transaction malleability also affects payment tracking.  Bitcoin Core's
RPC interface lets you track transactions by their txid---but if that
txid changes because the transaction was modified, it may appear that
the transaction has disappeared from the network.

Current best practices for transaction tracking dictate that a
transaction should be tracked by the transaction outputs (UTXOs) it
spends as inputs, as they cannot be changed without invalidating the
transaction.

<!-- TODO/harding: The paragraph above needs practical advice about how
to do that. I'll need to find some time to look at somebody's wallet
code. -harding -->

Best practices further dictate that if a transaction does seem to
disappear from the network and needs to be reissued, that it be reissued
in a way that invalidates the lost transaction. One method which will
always work is to ensure the reissued payment spends all of the same
outputs that the lost transaction used as inputs.

{% endautocrossref %}

