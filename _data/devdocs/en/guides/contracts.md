{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/guides/contracts.md" %}

## Contracts
{% include helpers/subhead-links.md %}

{% autocrossref %}

Contracts are
transactions which use the decentralized Bitcoin system to enforce financial
agreements.
Bitcoin contracts can often be crafted to minimize dependency on outside
agents, such as the court system, which significantly decreases the risk
of dealing with unknown entities in financial transactions. 

The following subsections will describe a variety of Bitcoin contracts
already in use. Because contracts deal with real people, not just
transactions, they are framed below in story format.

Besides the contract types described below, many other contract types
have been proposed. Several of them are collected on the [Contracts
page](https://en.bitcoin.it/wiki/Contracts) of the Bitcoin Wiki.

{% endautocrossref %}

### Escrow And Arbitration
{% include helpers/subhead-links.md %}

{% autocrossref %}

Charlie-the-customer wants to buy a product from Bob-the-businessman,
but neither of them trusts the other person, so they use a contract to
help ensure Charlie gets his merchandise and Bob gets his payment.

A simple contract could say that Charlie will spend satoshis to an
output which can only be spent if Charlie and Bob both sign the input
spending it. That means Bob won't get paid unless Charlie gets his
merchandise, but Charlie can't get the merchandise and keep his payment.

This simple contract isn't much help if there's a dispute, so Bob and
Charlie enlist the help of Alice-the-arbitrator to create an [escrow
contract][/en/glossary/escrow-contract]{:#term-escrow-contract}{:.term}. Charlie spends his satoshis
to an output which can only be spent if two of the three people sign the
input. Now Charlie can pay Bob if everything is ok, Bob can refund
Charlie's money if there's a problem, or Alice can arbitrate and decide
who should get the satoshis if there's a dispute.

To create a multiple-signature ([multisig][/en/glossary/multisig]{:#term-multisig}{:.term})
output, they each give the others a public key. Then Bob creates the
following [P2SH multisig][/en/glossary/p2sh-multisig]{:#term-p2sh-multisig}{:.term} redeem script:

{% endautocrossref %}

~~~
OP_2 [A's pubkey] [B's pubkey] [C's pubkey] OP_3 OP_CHECKMULTISIG
~~~

{% autocrossref %}

(Opcodes to push the public keys onto the stack are not shown.)

`OP_2` and `OP_3` push the actual numbers 2 and 3 onto the
stack. `OP_2`
specifies that 2 signatures are required to sign; `OP_3` specifies that
3 public keys (unhashed) are being provided. This is a 2-of-3 multisig
pubkey script, more generically called a m-of-n pubkey script (where *m* is the
*minimum* matching signatures required and *n* in the *number* of public
keys provided).

Bob gives the redeem script to Charlie, who checks to make sure his
public key and Alice's public key are included. Then he hashes the
redeem script to create a P2SH redeem script and pays the satoshis to it. Bob
sees the payment get added to the block chain and ships the merchandise.

Unfortunately, the merchandise gets slightly damaged in transit. Charlie
wants a full refund, but Bob thinks a 10% refund is sufficient. They
turn to Alice to resolve the issue. Alice asks for photo evidence from
Charlie along with a copy of the redeem script Bob created and
Charlie checked. 

After looking at the evidence, Alice thinks a 40% refund is sufficient,
so she creates and signs a transaction with two outputs, one that spends 60%
of the satoshis to Bob's public key and one that spends the remaining
40% to Charlie's public key.

In the signature script Alice puts her signature
and a copy of the unhashed serialized redeem script
that Bob created.  She gives a copy of the incomplete transaction to
both Bob and Charlie.  Either one of them can complete it by adding
his signature to create the following signature script:

{% endautocrossref %}

~~~
OP_0 [A's signature] [B's or C's signature] [serialized redeem script]
~~~

{% autocrossref %}

(Opcodes to push the signatures and redeem script onto the stack are
not shown. `OP_0` is a workaround for an off-by-one error in the original
implementation which must be preserved for compatibility.  Note that
the signature script must provide signatures in the same order as the
corresponding public keys appear in the redeem script.  See the description in
[`OP_CHECKMULTISIG`][op_checkmultisig] for details.)

When the transaction is broadcast to the network, each peer checks the
signature script against the P2SH output Charlie previously paid,
ensuring that the redeem script matches the redeem script hash previously
provided. Then the redeem script is evaluated, with the two signatures
being used as input<!--noref--> data. Assuming the redeem script
validates, the two transaction outputs show up in Bob's and Charlie's
wallets as spendable balances.

However, if Alice created and signed a transaction neither of them would
agree to, such as spending all the satoshis to herself, Bob and Charlie
can find a new arbitrator and sign a transaction spending the satoshis
to another 2-of-3 multisig redeem script hash, this one including a public
key from that second arbitrator. This means that Bob and Charlie never
need to worry about their arbitrator stealing their money.

**Resource:** [BitRated](https://www.bitrated.com/) provides a multisig arbitration
service interface using HTML/JavaScript on a GNU AGPL-licensed website.

{% endautocrossref %}

### Micropayment Channel
{% include helpers/subhead-links.md %}

{% autocrossref %}

<!-- SOMEDAY: try to rewrite using a more likely real-world example without
making the text or illustration more complicated --> 

Alice also works part-time moderating forum posts for Bob. Every time
someone posts to Bob's busy forum, Alice skims the post to make sure it
isn't offensive or spam. Alas, Bob often forgets to pay her, so Alice
demands to be paid immediately after each post she approves or rejects.
Bob says he can't do that because hundreds of small payments will cost
him thousands of satoshis in transaction fees, so Alice suggests they use a
[micropayment channel][]{:#term-micropayment-channel}{:.term}.

Bob asks Alice for her public key and then creates two transactions.
The first transaction pays 100 millibitcoins to a P2SH output whose
2-of-2 multisig redeem script requires signatures from both Alice and Bob.
This is the bond transaction.
Broadcasting this transaction would let Alice hold the millibitcoins
hostage, so Bob keeps this transaction private for now and creates a
second transaction.

The second transaction spends all of the first transaction's millibitcoins
(minus a transaction fee) back to Bob after a 24 hour delay enforced
by locktime. This is the refund transaction. Bob can't sign the refund transaction by himself, so he gives
it to Alice to sign, as shown in the
illustration below.

![Micropayment Channel Example](/img/dev/en-micropayment-channel.svg)

Alice checks that the refund transaction's locktime is 24 hours in the
future, signs it, and gives a copy of it back to Bob. She then asks Bob
for the bond transaction and checks that the refund transaction spends
the output of the bond transaction. She can now broadcast the bond
transaction to the network to ensure Bob has to wait for the time lock
to expire before further spending his millibitcoins. Bob hasn't actually
spent anything so far, except possibly a small transaction fee, and
he'll be able to broadcast the refund transaction in 24 hours for a
full refund.

Now, when Alice does some work worth 1 millibitcoin, she asks Bob to create
and sign a new version of the refund transaction.  Version two of the
transaction spends 1 millibitcoin to Alice and the other 99 back to Bob; it does
not have a locktime, so Alice can sign it and spend it whenever she
wants.  (But she doesn't do that immediately.)

Alice and Bob repeat these work-and-pay steps until Alice finishes for
the day, or until the time lock is about to expire.  Alice signs the
final version of the refund transaction and broadcasts it, paying
herself and refunding any remaining balance to Bob.  The next day, when
Alice starts work, they create a new micropayment channel.

If Alice fails to broadcast a version of the refund transaction before
its time lock expires, Bob can broadcast the first version and receive a
full refund. This is one reason micropayment channels are best suited to
small payments---if Alice's Internet service goes out for a few hours
near the time lock expiry, she could be cheated out of her payment.

Transaction malleability, discussed above in the Transactions section,
is another reason to limit the value of micropayment channels.
If someone uses transaction malleability to break the link between the
two transactions, Alice could hold Bob's 100 millibitcoins hostage even if she
hadn't done any work.

For larger payments, Bitcoin transaction fees are very low as a
percentage of the total transaction value, so it makes more sense to
protect payments with immediately-broadcast separate transactions.

**Resource:** The [bitcoinj][] Java library
provides a complete set of micropayment functions, an example
implementation, and [a
tutorial][bitcoinj micropayment tutorial]
all under an Apache license.

{% endautocrossref %}

### CoinJoin
{% include helpers/subhead-links.md %}

{% autocrossref %}

Alice is concerned about her privacy.  She knows every transaction gets
added to the public block chain, so when Bob and Charlie pay her, they
can each easily track those satoshis to learn what Bitcoin
addresses she pays, how much she pays them, and possibly how many
satoshis she has left.

Alice isn't a criminal, she just wants plausible deniability about
where she has spent her satoshis and how many she has left, so she
starts up the Tor anonymity service on her computer and logs into an
IRC chatroom as "AnonGirl."

Also in the chatroom are "Nemo" and "Neminem."  They collectively
agree to transfer satoshis between each other so no one besides them
can reliably determine who controls which satoshis.  But they're faced
with a dilemma: who transfers their satoshis to one of the other two
pseudonymous persons first? The CoinJoin-style contract, shown in the
illustration below, makes this decision easy: they create a single
transaction which does all of the spending simultaneously, ensuring none
of them can steal the others' satoshis.

![Example CoinJoin Transaction](/img/dev/en-coinjoin.svg)

Each contributor looks through their collection of Unspent Transaction
Outputs (UTXOs) for 100 millibitcoins they can spend. They then each generate
a brand new public key and give UTXO details and pubkey hashes to the
facilitator.  In this case, the facilitator is AnonGirl; she creates
a transaction spending each of the UTXOs to three equally-sized outputs.
One output goes to each of the contributors' pubkey hashes.

AnonGirl then signs her inputs using `SIGHASH_ALL` to ensure nobody can
change the input or output details.  She gives the partially-signed
transaction to Nemo who signs his inputs the same way and passes it
to Neminem, who also signs it the same way.  Neminem then broadcasts
the transaction to the peer-to-peer network, mixing all of the millibitcoins in
a single transaction.

As you can see in the illustration, there's no way for anyone besides
AnonGirl, Nemo, and Neminem to confidently determine who received
which output, so they can each spend their output with plausible
deniability.

Now when Bob or Charlie try to track Alice's transactions through the
block chain, they'll also see transactions made by Nemo and
Neminem.  If Alice does a few more CoinJoins, Bob and Charlie might
have to guess which transactions made by dozens or hundreds of people
were actually made by Alice.

The complete history of Alice's satoshis is still in the block chain,
so a determined investigator could talk to the people AnonGirl
CoinJoined with to find out the ultimate origin of her satoshis and
possibly reveal AnonGirl as Alice. But against anyone casually browsing
block chain history, Alice gains plausible deniability.

The CoinJoin technique described above costs the participants a small
amount of satoshis to pay the transaction fee.  An alternative
technique, purchaser CoinJoin, can actually save them satoshis and
improve their privacy at the same time.

AnonGirl waits in the IRC chatroom until she wants to make a purchase.
She announces her intention to spend satoshis and waits until someone
else wants to make a purchase, likely from a different merchant. Then
they combine their inputs the same way as before but set the outputs
to the separate merchant addresses so nobody will be able to figure
out solely from block chain history which one of them bought what from
the merchants.

Since they would've had to pay a transaction fee to make their purchases
anyway, AnonGirl and her co-spenders don't pay anything extra---but
because they reduced overhead by combining multiple transactions, saving
bytes, they may be able to pay a smaller aggregate transaction fee,
saving each one of them a tiny amount of satoshis.

**Resource:** An alpha-quality (as of this writing) implementation of decentralized
CoinJoin is [CoinMux](http://coinmux.com/), available under the Apache
license.

{% endautocrossref %}
