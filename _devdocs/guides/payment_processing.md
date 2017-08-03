{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/guide_payment_processing.md" %}

## Payment Processing
{% include helpers/subhead-links.md %}

{% autocrossref %}

Payment processing encompasses the steps spenders and receivers perform
to make and accept payments in exchange for products or services. The
basic steps have not changed since the dawn of commerce, but the
technology has. This section will explain how receivers and spenders
can, respectively, request and make payments using Bitcoin---and how
they can deal with complications such as refunds and recurrent
rebilling.

![Bitcoin Payment Processing](/img/dev/en-payment-processing.svg)

The figure above illustrates payment processing using Bitcoin from a
receiver's perspective, starting with a new order. The following
subsections will each address<!--noref--> the three common steps and the three
occasional or optional steps.

It is worth mentioning that each of these steps can be outsourced by
using third party APIs and services.

{% endautocrossref %}

### Pricing Orders
{% include helpers/subhead-links.md %}

{% autocrossref %}

Because of exchange rate variability between satoshis and national
currencies ([fiat][]{:#term-fiat}{:.term}), many Bitcoin orders are priced in fiat but paid
in satoshis, necessitating a price conversion.

Exchange rate data is widely available through HTTP-based APIs provided
by currency exchanges. Several organizations also aggregate data from
multiple exchanges to create index prices, which are also available using
HTTP-based APIs.

Any applications which automatically calculate order totals using exchange
rate data must take steps to ensure the price quoted reflects the
current general market value of satoshis, or the applications could
accept too few satoshis for the product or service being sold.
Alternatively, they could ask for too many satoshis, driving away potential
spenders.

To minimize problems, your applications may want to collect data from at
least two separate sources and compare them to see how much they differ.
If the difference is substantial, your applications can enter a safe mode
until a human is able to evaluate the situation.

You may also want to program your applications to enter a safe mode if
exchange rates are rapidly increasing or decreasing, indicating a
possible problem in the Bitcoin market which could make it difficult to
spend any satoshis received today.

Exchange rates lie outside the control of Bitcoin and related
technologies, so there are no new or planned technologies which
will make it significantly easier for your program to correctly convert
order totals from fiat into satoshis.

Because the exchange rate fluctuates over time, order totals pegged to
fiat must expire to prevent spenders from delaying payment in the hope
that satoshis will drop in price. Most widely-used payment processing
systems currently expire their invoices after 10 to 20 minutes.

Shorter expiration periods increase the chance the invoice will expire
before payment is received, possibly necessitating manual intervention
to request an additional payment or to issue a refund.   Longer
expiration periods increase the chance that the exchange rate will
fluctuate a significant amount before payment is received.

{% endautocrossref %}

### Requesting Payments
{% include helpers/subhead-links.md %}

{% autocrossref %}

Before requesting payment, your application must create a Bitcoin
address, or acquire an address from another program such as
Bitcoin Core.  Bitcoin addresses are described in detail in the
[Transactions](#transactions) section. Also described in that section
are two important reasons to [avoid using an address more than
once](#avoiding-key-reuse)---but a third reason applies especially to
payment requests:

Using a separate address for each incoming payment makes it trivial to
determine which customers have paid their payment requests.  Your
applications need only track the association between a particular payment
request and the address used in it, and then scan the block chain for
transactions matching that address.

The next subsections will describe in detail the following four
compatible ways to give the spender the address and amount to be paid.
For increased convenience and compatibility, providing all of these options in your
payment requests is recommended.

1. All wallet software lets its users paste in or manually enter an
   address and amount into a payment screen. This is, of course,
   inconvenient---but it makes an effective fallback option.

2. Almost all desktop wallets can associate with `bitcoin:` URIs, so
   spenders can click a link to pre-fill the payment screen. This also
   works with many mobile wallets, but it generally does not work with
   web-based wallets unless the spender installs a browser extension or
   manually configures a URI handler.

3. Most mobile wallets support scanning `bitcoin:` URIs encoded in a
   QR code, and almost all wallets can display them for
   accepting payment. While also handy for online orders, QR Codes are
   especially useful for in-person purchases.

4. Recent wallet updates add support for the new payment protocol providing
   increased security, authentication of a receiver's identity using X.509 certificates,
   and other important features such as refunds.

![Warning icon](/img/icons/icon_warning.svg)
 **Warning:** Special care must be taken to avoid the theft of incoming
payments. In particular, private keys should not be stored on web servers,
and payment requests should be sent over HTTPS or other secure methods
to prevent man-in-the-middle attacks from replacing your Bitcoin address
with the attacker's address.

{% endautocrossref %}

#### Plain Text
{% include helpers/subhead-links.md %}

{% autocrossref %}

To specify an amount directly for copying and pasting, you must provide
the address, the amount, and the denomination. An expiration time for
the offer may also be specified.  For example:

(Note: all examples in this section use testnet addresses.)

{% endautocrossref %}

~~~
Pay: mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN
Amount: 100 BTC
You must pay by: 2014-04-01 at 23:00 UTC
~~~

{% autocrossref %}

Indicating the denomination is critical. As of this writing, popular
Bitcoin wallet software defaults to denominating amounts in either bitcoins (BTC)
, millibitcoins (mBTC) or microbitcoins (uBTC, "bits"). Choosing between each unit is widely supported,
but other software also lets its users select denomination amounts from
some or all of the following options:

| Bitcoins    | Unit (Abbreviation) |
|-------------|---------------------|
| 1.0         | bitcoin (BTC)       |
| 0.01        | bitcent (cBTC)      |
| 0.001       | millibitcoin (mBTC) |
| 0.000001    | microbitcoin (uBTC, "bits") |
| 0.00000001  | satoshi             |

{% endautocrossref %}

#### bitcoin: URI
{% include helpers/subhead-links.md %}

{% autocrossref %}

The [`bitcoin:` URI][bitcoin URI]{:#term-bitcoin-uri}{:.term} scheme defined in BIP21 eliminates denomination
confusion and saves the spender from copying and pasting two separate
values. It also lets the payment request provide some additional
information to the spender. An example:

{% endautocrossref %}

~~~
bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN?amount=100
~~~

{% autocrossref %}

Only the address is required, and if it is the only thing
specified, wallets will pre-fill a payment request with it and let
the spender enter an amount. The amount specified is always in
decimal bitcoins (BTC).

Two other parameters are widely supported. The
[`label`][label]{:#term-label}{:.term} parameter is generally used to
provide wallet software with the recipient's name. The
[`message`][message]{:#term-message}{:.term} parameter is generally used
to describe the payment request to the spender. Both the label and the
message are commonly stored by the spender's wallet software---but they
are never added to the actual transaction, so other Bitcoin users cannot
see them. Both the label and the message must be [URI encoded][].

All four parameters used together, with appropriate URI encoding, can be
seen in the line-wrapped example below.

~~~
bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN\
?amount=0.10\
&label=Example+Merchant\
&message=Order+of+flowers+%26+chocolates
~~~

The URI scheme can be extended, as will be seen in the payment protocol
section below, with both new optional and required parameters. As of this
writing, the only widely-used parameter besides the four described above
is the payment protocol's `r` parameter.

Programs accepting URIs in any form must ask the user for permission
before paying unless the user has explicitly disabled prompting (as
might be the case for micropayments).

{% endautocrossref %}

#### QR Codes
{% include helpers/subhead-links.md %}

{% autocrossref %}

QR codes are a popular way to exchange `bitcoin:` URIs in person, in
images, or in videos. Most mobile Bitcoin wallet apps, and some desktop
wallets, support scanning QR codes to pre-fill their payment screens.

The figure below shows the same `bitcoin:` URI code encoded as four
different [Bitcoin QR codes][URI QR code]{:#term-uri-qr-code}{:.term} at four
different error correction levels. The QR code can include the `label` and `message`
parameters---and any other optional parameters---but they were
omitted here to keep the QR code small and easy to scan with unsteady
or low-resolution mobile cameras.

![Bitcoin QR Codes](/img/dev/en-qr-code.svg)

The error correction is combined with a checksum to ensure the Bitcoin QR code
cannot be successfully decoded with data missing or accidentally altered,
so your applications should choose the appropriate level of error
correction based on the space you have available to display the code.
Low-level damage correction works well when space is limited, and
quartile-level damage correction helps ensure fast scanning when
displayed on high-resolution screens.

{% endautocrossref %}

#### Payment Protocol
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin Core 0.9 supports the new [payment protocol][/en/glossary/payment-protocol]{:#term-payment-protocol}{:.term}. The payment protocol
adds many important features to payment requests:

- Supports X.509 certificates and SSL encryption to verify receivers' identity
  and help prevent man-in-the-middle attacks.

- Provides more detail about the requested payment to spenders.

- Allows spenders to submit transactions directly to receivers without going
  through the peer-to-peer network. This can speed up payment processing and
  work with planned features such as child-pays-for-parent transaction fees
  and offline NFC or Bluetooth-based payments.

Instead of being asked to pay a meaningless address, such as
"mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN", spenders are asked to pay the
Common Name (CN) description from the receiver's X.509 certificate, such
as "www.bitcoin.org".

To request payment using the payment protocol, you use an extended (but
backwards-compatible) `bitcoin:` URI.  For example:

~~~
bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN\
?amount=0.10\
&label=Example+Merchant\
&message=Order+of+flowers+%26+chocolates\
&r=https://example.com/pay/mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN
~~~

None of the parameters provided above, except `r`, are required for the
payment protocol---but your applications may include them for backwards
compatibility with wallet programs which don't yet handle the payment
protocol. 

The [`r`][r]{:#term-r-parameter}{:.term} parameter tells payment-protocol-aware wallet programs to ignore
the other parameters and fetch a PaymentRequest from the URL provided.
The browser, QR code reader, or other program processing the URI opens
the spender's Bitcoin wallet program on the URI. 

![BIP70 Payment Protocol](/img/dev/en-payment-protocol.svg)

The Payment Protocol is described in depth in BIP70, BIP71, and BIP72.
An example CGI program and description of all the parameters which can
be used in the Payment Protocol is provided in the Developer Examples
[Payment Protocol][devex payment protocol] subsection. In this
subsection, we will briefly describe in story format how the Payment
Protocol is typically used.

Charlie, the client, is shopping on a website run by Bob, the
businessman. Charlie adds a few items to his shopping cart and clicks
the "Checkout With Bitcoin" button.

Bob's server automatically adds the following information to its
invoice database:

* The details of Charlie's order, including items ordered and
  shipping address.

* An order total in satoshis, perhaps created by converting prices in
  fiat to prices in satoshis.

* An expiration time when that total will no longer be acceptable.

* A pubkey script to which Charlie should send payment. Typically this
  will be a P2PKH or P2SH pubkey script containing a unique (never
  before used) secp256k1 public key.

After adding all that information to the database, Bob's server displays
a `bitcoin:` URI for Charlie to click to pay. 

Charlie clicks on the `bitcoin:` URI in his browser. His browser's URI
handler sends the URI to his wallet program. The wallet is aware of the
Payment Protocol, so it parses the `r` parameter and sends an HTTP GET
to that URL looking for a PaymentRequest message.

The PaymentRequest message returned may include private information, such as Charlie's
mailing address, but the wallet must be able to access it without using prior
authentication, such as HTTP cookies, so a publicly-accessible HTTPS URL
with a guess-resistant part is typically used. The
unique public key created for the payment request can be used to create
a unique identifier. This is why, in the example URI above, the PaymentRequest
URL contains the P2PKH address:
`https://example.com/pay/mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN`

After receiving the HTTP GET to the URL above, the
PaymentRequest-generating CGI program on Bob's webserver takes the
unique identifier from the URL and looks up the corresponding details in
the database. It then creates a PaymentDetails message with the
following information:

* The amount of the order in satoshis and the pubkey script to be paid.

* A memo containing the list of items ordered, so Charlie knows what
  he's paying for.  It may also include Charlie's mailing address so he can
  double-check it.

* The time the PaymentDetails message was created plus the time
  it expires.

* A URL to which Charlie's wallet should send its completed transaction.

That PaymentDetails message is put inside a PaymentRequest message.
The payment request lets Bob's server sign the entire Request with the
server's X.509 SSL certificate.  (The Payment Protocol has been designed
to allow other signing methods in the future.)  Bob's server sends the
payment request to Charlie's wallet in the reply to the HTTP GET.

![Bitcoin Core Showing Validated Payment Request](/img/dev/en-btcc-payment-request.png)

Charlie's wallet receives the PaymentRequest message, checks its signature, and
then displays the details from the PaymentDetails message to Charlie. Charlie
agrees to pay, so the wallet constructs a payment to the pubkey script
Bob's server provided. Unlike a traditional Bitcoin payment, Charlie's
wallet doesn't necessarily automatically broadcast this payment to the
network. Instead, the wallet constructs a Payment message and sends it to
the URL provided in the PaymentDetails message as an HTTP POST. Among
other things, the Payment message contains:

* The signed transaction in which Charlie pays Bob.

* An optional memo Charlie can send to Bob. (There's no guarantee that
  Bob will read it.)

* A refund address (pubkey script) which Bob can pay if he needs to
  return some or all of Charlie's satoshis.

Bob's server receives the Payment message, verifies the transaction pays
the requested amount to the address provided, and then broadcasts the
transaction to the network. It also replies to the HTTP POSTed Payment
message with a PaymentACK message, which includes an optional memo
from Bob's server thanking Charlie for his patronage and providing other
information about the order, such as the expected arrival date.

Charlie's wallet sees the PaymentACK and tells Charlie that the payment
has been sent. The PaymentACK doesn't mean that Bob has verified
Charlie's payment---see the Verifying Payment subsection below---but it does mean
that Charlie can go do something else while the transaction gets confirmed.
After Bob's server verifies from the block chain that Charlie's
transaction has been suitably confirmed, it authorizes shipping
Charlie's order.

In the case of a dispute, Charlie can generate a cryptographically-proven
[receipt][]{:#term-receipt}{:.term} out of the various signed or
otherwise-proven information.

* The PaymentDetails message signed by Bob's webserver proves Charlie
  received an invoice to pay a specified pubkey script for a specified
  number of satoshis for goods specified in the memo field.

* The Bitcoin block chain can prove that the pubkey script specified by
  Bob was paid the specified number of satoshis.

If a refund needs to be issued, Bob's server can safely pay the
refund-to pubkey script provided by Charlie.  See the Refunds section below
for more details.

{% endautocrossref %}

### Verifying Payment
{% include helpers/subhead-links.md %}

{% autocrossref %}

As explained in the [Transactions][] and [Block Chain][section block chain] sections, broadcasting
a transaction to the network doesn't ensure that the receiver gets
paid. A malicious spender can create one transaction that pays the
receiver and a second one that pays the same input back to himself. Only
one of these transactions will be added to the block chain, and nobody
can say for sure which one it will be.

Two or more transactions spending the same input are commonly referred
to as a [double spend][/en/glossary/double-spend]{:#term-double-spend}{:.term}.

Once the transaction is included in a block, double spends are
impossible without modifying block chain history to replace the
transaction, which is quite difficult. Using this system,
the Bitcoin protocol can give each of your transactions an updating confidence 
score based on the number of blocks which would need to be modified to replace 
a transaction. For each block, the transaction gains one [confirmation][/en/glossary/confirmation-score]{:#term-confirmation}{:.term}. Since
modifying blocks is quite difficult, higher confirmation scores indicate 
greater protection.

**0 confirmations**: The transaction has been broadcast but is still not 
included in any block. Zero confirmation transactions (unconfirmed
transactions) should generally not be
trusted without risk analysis. Although miners usually confirm the first 
transaction they receive, fraudsters may be able to manipulate the
network into including their version of a transaction.

**1 confirmation**: The transaction is included in the latest block and 
double-spend risk decreases dramatically. Transactions which pay
sufficient transaction fees need 10 minutes on average to receive one
confirmation. However, the most recent block gets replaced fairly often by
accident, so a double spend is still a real possibility.

**2 confirmations**: The most recent block was chained to the block which 
includes the transaction. As of March 2014, two block replacements were 
exceedingly rare, and a two block replacement attack was impractical without 
expensive mining equipment.

**6 confirmations**: The network has spent about an hour working to protect 
the transaction against double spends and the transaction is buried under six 
blocks. Even a reasonably lucky attacker would require a large percentage of 
the total network hashing power to replace six blocks. Although this number is 
somewhat arbitrary, software handling high-value transactions, or otherwise at 
risk for fraud, should wait for at least six confirmations before treating a 
payment as accepted.

Bitcoin Core provides several RPCs which can provide your program with the 
confirmation score for transactions in your wallet or arbitrary transactions. 
For example, the `listunspent` RPC provides an array of every satoshi you can 
spend along with its confirmation score.

Although confirmations provide excellent double-spend protection most of the 
time, there are at least three cases where double-spend risk analysis can be 
required:

1. In the case when the program or its user cannot wait for a confirmation and 
wants to accept unconfirmed payments.

2. In the case when the program or its user is accepting high value 
transactions and cannot wait for at least six confirmations or more.

3. In the case of an implementation bug or prolonged attack against Bitcoin 
which makes the system less reliable than expected.

An interesting source of double-spend risk analysis can be acquired by 
connecting to large numbers of Bitcoin peers to track how transactions and 
blocks differ from each other. Some third-party APIs can provide you with this 
type of service.

<!-- TODO Example of double spend risk analysis using bitcoinj, eventually? -->

For example, unconfirmed transactions can be compared among all connected peers 
to see if any UTXO is used in multiple unconfirmed transactions, indicating a 
double-spend attempt, in which case the payment can be refused until it is 
confirmed. Transactions can also be ranked by their transaction fee to
estimate the amount of time until they're added to a block.

Another example could be to detect a fork when multiple peers report differing 
block header hashes at the same block height. Your program can go into a safe mode if the 
fork extends for more than two blocks, indicating a possible problem with the 
block chain. For more details, see the [Detecting Forks
subsection][section detecting forks].

Another good source of double-spend protection can be human intelligence. For 
example, fraudsters may act differently from legitimate customers, letting 
savvy merchants manually flag them as high risk. Your program can provide a 
safe mode which stops automatic payment acceptance on a global or per-customer 
basis.

{% endautocrossref %}

### Issuing Refunds
{% include helpers/subhead-links.md %}

{% autocrossref %}

Occasionally receivers using your applications will need to issue
refunds. The obvious way to do that, which is very unsafe, is simply
to return the satoshis to the pubkey script from which they came.
For example:

* Alice wants to buy a widget from Bob, so Bob gives Alice a price and
  Bitcoin address. 

* Alice opens her wallet program and sends some satoshis to that
  address. Her wallet program automatically chooses to spend those
  satoshis from one of its unspent outputs, an output corresponding to
  the Bitcoin address mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN.

* Bob discovers Alice paid too many satoshis. Being an honest fellow,
  Bob refunds the extra satoshis to the mjSk... address.

This seems like it should work, but Alice is using a centralized
multi-user web wallet which doesn't give unique addresses to each user,
so it has no way to know that Bob's refund is meant for Alice.  Now the
refund is a unintentional donation to the company behind the centralized
wallet, unless Alice opens a support ticket and proves those satoshis
were meant for her.

This leaves receivers only two correct ways to issue refunds:

* If an address was copy-and-pasted or a basic `bitcoin:` URI was used,
  contact the spender directly and ask them to provide a refund address.

* If the payment protocol was used, send the refund to the output
  listed in the `refund_to` field of the Payment message.

Note: it would be wise to contact the
spender directly if the refund is being issued a long time after the
original payment was made.
This allows you to ensure the user still has access to the key or keys
for the `refund_to` address.

{% endautocrossref %}

### Disbursing Income (Limiting Forex Risk)
{% include helpers/subhead-links.md %}

{% autocrossref %}

Many receivers worry that their satoshis will be less valuable in the
future than they are now, called foreign exchange (forex) risk. To limit
forex risk, many receivers choose to disburse newly-acquired payments
soon after they're received.

If your application provides this business logic, it will need to choose
which outputs to spend first.  There are a few different algorithms
which can lead to different results.

* A merge avoidance algorithm makes it harder for outsiders looking
  at block chain data to figure out how many satoshis the receiver has
  earned, spent, and saved.

* A last-in-first-out (LIFO) algorithm spends newly acquired satoshis
  while there's still double spend risk, possibly pushing that risk on
  to others. This can be good for the receiver's balance sheet but
  possibly bad for their reputation.

* A first-in-first-out (FIFO) algorithm spends the oldest satoshis
  first, which can help ensure that the receiver's payments always
  confirm, although this has utility only in a few edge cases.

{% endautocrossref %}

#### Merge Avoidance
{% include helpers/subhead-links.md %}

{% autocrossref %}

When a receiver receives satoshis in an output, the spender can track
(in a crude way) how the receiver spends those satoshis. But the spender
can't automatically see other satoshis paid to the receiver by other
spenders as long as the receiver uses unique addresses for each
transaction.

However, if the receiver spends satoshis from two different spenders in
the same transaction, each of those spenders can see the other spender's
payment.  This is called a [merge][]{:#term-merge}{:.term}, and the more a receiver merges
outputs, the easier it is for an outsider to track how many satoshis the
receiver has earned, spent, and saved.

[Merge avoidance][]{:#term-merge-avoidance}{:.term} means trying to avoid spending unrelated outputs in the
same transaction. For persons and businesses which want to keep their
transaction data secret from other people, it can be an important strategy.

A crude merge avoidance strategy is to try to always pay with the
smallest output you have which is larger than the amount being
requested. For example, if you have four outputs holding, respectively,
100, 200, 500, and 900 satoshis, you would pay a bill for 300 satoshis
with the 500-satoshi output. This way, as long as you have outputs
larger than your bills, you avoid merging.

More advanced merge avoidance strategies largely depend on enhancements
to the payment protocol which will allow payers to avoid merging by
intelligently distributing their payments among multiple outputs
provided by the receiver.

{% endautocrossref %}

#### Last In, First Out (LIFO)
{% include helpers/subhead-links.md %}

{% autocrossref %}

Outputs can be spent as soon as they're received---even before they're
confirmed. Since recent outputs are at the greatest risk of being
double-spent, spending them before older outputs allows the spender to
hold on to older confirmed outputs which are much less likely to be
double-spent.

There are two closely-related downsides to LIFO:

* If you spend an output from one unconfirmed transaction in a second
  transaction, the second transaction becomes invalid if transaction
  malleability changes the first transaction. 

* If you spend an output from one unconfirmed transaction in a second
  transaction and the first transaction's output is successfully double
  spent to another output, the second transaction becomes invalid.

In either of the above cases, the receiver of the second transaction
will see the incoming transaction notification disappear or turn into an
error message.

Because LIFO puts the recipient of secondary transactions in as much
double-spend risk as the recipient of the primary transaction, they're
best used when the secondary recipient doesn't care about the
risk---such as an exchange or other service which is going to wait for
six confirmations whether you spend old outputs or new outputs.

LIFO should not be used when the primary transaction recipient's
reputation might be at stake, such as when paying employees. In these
cases, it's better to wait for transactions to be fully verified (see
the [Verification subsection][] above) before using them to make payments.

{% endautocrossref %}

#### First In, First Out (FIFO)
{% include helpers/subhead-links.md %}

{% autocrossref %}

The oldest outputs are the most reliable, as the longer it's been since
they were received, the more blocks would need to be modified to double
spend them. However, after just a few blocks, a point of rapidly
diminishing returns is reached. The [original Bitcoin paper][bitcoinpdf]
predicts the chance of an attacker being able to modify old blocks,
assuming the attacker has 30% of the total network hashing power:

| Blocks | Chance of successful modification |
|--------|----------------------------------|
| 5      | 17.73523%                        |
| 10     | 4.16605%                         |
| 15     | 1.01008%                         |
| 20     | 0.24804%                         |
| 25     | 0.06132%                         |
| 30     | 0.01522%                         |
| 35     | 0.00379%                         |
| 40     | 0.00095%                         |
| 45     | 0.00024%                         |
| 50     | 0.00006%                         |

FIFO does have a small advantage when it comes to transaction fees, as
older outputs may be eligible for inclusion in the 50,000 bytes set
aside for no-fee-required high-priority transactions by miners running the default Bitcoin Core
codebase.  However, with transaction fees being so low, this is not a
significant advantage.

The only practical use of FIFO is by receivers who spend all or most
of their income within a few blocks, and who want to reduce the
chance of their payments becoming accidentally invalid. For example,
a receiver who holds each payment for six confirmations, and then
spends 100% of verified payments to vendors and a savings account on
a bi-hourly schedule.

{% endautocrossref %}

### Rebilling Recurring Payments
{% include helpers/subhead-links.md %}

{% autocrossref %}

Automated recurring payments are not possible with decentralized Bitcoin
wallets. Even if a wallet supported automatically sending non-reversible
payments on a regular schedule, the user would still need to start the
program at the appointed time, or leave it running all the time
unprotected by encryption.

This means automated recurring Bitcoin payments can only be made from a
centralized server which handles satoshis on behalf of its spenders. In
practice, receivers who want to set prices in fiat terms must also let
the same centralized server choose the appropriate exchange rate.

Non-automated rebilling can be managed by the same mechanism used before
credit-card recurring payments became common: contact the spender and
ask them to pay again---for example, by sending them a PaymentRequest
`bitcoin:` URI in an HTML email.

In the future, extensions to the payment protocol and new wallet
features may allow some wallet programs to manage a list of recurring
transactions. The spender will still need to start the program on a
regular basis and authorize payment---but it should be easier and more
secure for the spender than clicking an emailed invoice, increasing the
chance receivers get paid on time.

{% endautocrossref %}
