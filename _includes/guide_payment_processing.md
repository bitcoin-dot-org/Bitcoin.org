## Payment Processing

{% autocrossref %}

Payment processing encompasses the steps spenders and receivers perform
to make and accept payments in exchange for products or services. The
basic steps have not changed since the dawn of commerce, but the
technology has. This section will explain how how receivers and spenders
can, respectively, request and make payments using Bitcoin---and how
they can deal with complications such as refunds and recurrent
rebilling.

Bitcoin payment processing is being actively developed at the moment, so
each subsection below attempts to describe what's widely deployed now,
what's new, and what might be coming before the end of 2014.

![Bitcoin Payment Processing](/img/dev/en-payment-processing.svg)

The figure above illustrates payment processing using Bitcoin from a
receiver's perspective, starting with a new order. The following
subsections will each address<!--noref--> the three common steps and the three
occasional or optional steps.

It is worth mentioning that each of these steps can be outsourced by
using third party APIs and services.

{% endautocrossref %}

### Pricing Orders

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

**Warning:** special care must be taken to avoid the theft of incoming
payments. In particular, private keys should not be stored on web servers,
and payment requests should be sent over HTTPS or other secure methods
to prevent man-in-the-middle attacks from replacing your Bitcoin address
with the attacker's address.

{% endautocrossref %}

#### Plain Text

{% autocrossref %}

To specify an amount directly for copying and pasting, you must provide
the address, the amount, and the denomination. An expiration time for
the offer may also be specified.  For example:

(Note: all examples in this section use Testnet addresses.)

{% endautocrossref %}

~~~
Pay: mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN
Amount: 100 BTC
You must pay by: 2014-04-01 at 23:00 UTC
~~~

{% autocrossref %}

Indicating the [denomination][]{:#term-denomination}{:.term} is critical. As of this writing, all popular
Bitcoin wallet software defaults to denominating amounts in either [bitcoins][]{:#term-bitcoins}{:.term} (BTC)
or [millibits][]{:#term-millibits}{:.term} (mBTC). Choosing between BTC and mBTC is widely supported,
but other software also lets its users select denomination amounts from
some or all of the following options:

{% endautocrossref %}

| Bitcoins    | Unit (Abbreviation) |
|-------------|---------------------|
| 1.0         | bitcoin (BTC)       |
| 0.01        | bitcent (cBTC)      |
| 0.001       | millibit (mBTC)     |
| 0.000001    | microbit (uBTC)     |
| 0.00000001  | [satoshi][]{:#term-satoshi}{:.term}             |

{% autocrossref %}

Because of the widespread popularity of BTC and mBTC, it may be more
useful to specify the amount in both denominations when the text is
meant to be copied and pasted. For example:

{% endautocrossref %}

~~~
Pay: mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN
Amount: 100 BTC  (100000 mBTC)
You must pay by: 2014-04-01 at 23:00 UTC
~~~

#### bitcoin: URI

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

Only the address is required, and if it is the only thing specified,
wallets will pre-fill a payment request with it and let the spender enter
an amount.

The amount specified is always in decimal bitcoins (BTC), although requests
only for whole bitcoins (as in the example above), may omit the decimal
point. The amount field must not contain any commas. Fractional bitcoins
may be specified with or without a leading zero; for example, either of
the URIs below requesting one millibit are valid:

{% endautocrossref %}

~~~
bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN?amount=.001
bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN?amount=0.001
~~~

{% autocrossref %}

Two other parameters are widely supported. The [`label`][label]{:#term-label}{:.term} parameter is
generally used to provide wallet software with the recipient's name. The
[`message`][message]{:#term-message}{:.term} parameter is generally used to describe the payment request to
the spender. Both the label and the message are commonly stored by the
spender's wallet software---but they are never added to the actual
transaction, so other Bitcoin users cannot see them. Both the label and
the message must be [URI encoded][].

All four parameters used together, with appropriate URI encoding, can be
seen in the line-wrapped example below.

{% endautocrossref %}

~~~
bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN\
?amount=0.10\
&label=Example+Merchant\
&message=Order+of+flowers+%26+chocolates
~~~

{% autocrossref %}

The URI above could be encoded in HTML as follows, providing compatibility
with wallet software which can't accept URI links and allowing you to
specify an expiration date to the spender.

{% endautocrossref %}

~~~
<a href="bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN\
?amount=0.10\
&label=Example+Merchant\
&message=Order+of+flowers+%26+chocolates"
>Order flowers & chocolate using Bitcoin</a>
(Pay 0.10 BTC [100 mBTC] to mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN by 2014-04-01 at 23:00 UTC)
~~~

Which produces:

> <a href="bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN?amount=0.10&label=Example+Merchant&message=Order+of+flowers+%26+chocolates">Order flowers & chocolates using Bitcoin</a> (Pay 0.10 BTC [100 mBTC] to mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN by 2014-04-01 at 23:00 UTC)

{% autocrossref %}

Some payment processors use Javascript to display countdown timers
indicating the number of minutes and seconds until the offer expires.

The URI scheme can be extended, as will be seen in the payment protocol
section below, with both new optional and required parameters. As of this
writing, the only widely-used parameter besides the four described above
is the payment protocol's `r` parameter.

Programs accepting URIs in any form must ask the user for permission
before paying unless the user has explicitly disabled prompting (as
might be the case for micropayments).

{% endautocrossref %}

#### QR Codes

{% autocrossref %}

QR codes are a popular way to exchange `bitcoin:` URIs in person, in
images, or in videos. Most mobile Bitcoin wallet apps, and some desktop
wallets, support scanning QR codes to pre-fill their payment screens.

The figure below shows the same `bitcoin:` URI code encoded as four
different [Bitcoin QR codes][URI QR code]{:#term-uri-qr-code}{:.term} at different error correction levels (described
below the image). The QR code can include the `label` and `message`
parameters---and any other optional parameters---but they were
omitted here to keep the QR code small and easy to scan with unsteady
or low-resolution mobile cameras.

![Bitcoin QR Codes](/img/dev/en-qr-code.svg)

QR encoders offer four possible levels of error correction: 

1. Low: corrects up to 7% damage

2. Medium: corrects up to 15% damage but results in approximately 8%
   larger images over low-level damage correction.

3. Quartile: corrects corrects up to 25% damage but results in
   approximately 20% larger images over low-level damage correction.

4. High: corrects up to 30% damage but results in approximately 26%
   larger images over low-level damage correction.

The error correction is combined with a checksum to ensure the Bitcoin QR code
cannot be successfully decoded with data missing or accidentally altered,
so your applications should choose the appropriate level of error
correction based on the space you have available to display the code.
Low-level damage correction works well when space is limited, and
quartile-level damage correction helps ensure fast scanning when
displayed on high-resolution screens.

{% endautocrossref %}

#### Payment Protocol

{% autocrossref %}

Bitcoin Core 0.9 supports the new [payment protocol][]{:#term-payment-protocol}{:.term}. The payment protocol
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

{% endautocrossref %}

~~~
bitcoin:mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN\
?amount=0.10\
&label=Example+Merchant\
&message=Order+of+flowers+%26+chocolates\
&r=http://example.com/pay.php/invoice%3Dda39a3ee
~~~

{% autocrossref %}

None of the parameters provided above, except `r`, are required for the
payment protocol---but your applications may include them for backwards
compatibility with wallet programs which don't yet handle the payment
protocol. 

The [`r`][r]{:#term-r-parameter}{:.term} parameter tells payment-protocol-aware wallet programs to ignore
the other parameters and fetch a PaymentRequest from the URL provided.  If the
request will be signed, which is recommended but not required, it can be
fetched from an HTTP server---although fetching it from an HTTPS server
would still be preferable.

The browser, QR code reader, or other program processing the URI opens
the spender's Bitcoin wallet program on the URI. If the wallet program is
aware of the payment protocol, it accesses the URL specified in the `r`
parameter, which should provide it with a serialized PaymentRequest
served with the [MIME][] type `application/bitcoin-paymentrequest`<!--noref-->.

{% endautocrossref %}

##### PaymentRequest & PaymentDetails

{% autocrossref %}

The [PaymentRequest][]{:#term-paymentrequest}{:.term} is created with data structures built using
Google's Protocol Buffers. BIP70 describes these data
structures in the non-sequential way they're defined in the payment
request protocol buffer code, but the text below will describe them in
a more linear order using a simple (but functional) Python CGI
program. (For brevity and clarity, many normal CGI best practices are
not used in this program.)

The full sequence of events is illustrated below, starting with the
spender clicking a `bitcoin:` URI or scanning a `bitcoin:` QR code.

![BIP70 Payment Protocol](/img/dev/en-payment-protocol.svg)

For the script to use the protocol buffer, you will need a copy of
Google's Protocol Buffer compiler (`protoc`), which is available in most
modern Linux package managers and [directly from Google.][protobuf] Non-Google
protocol buffer compilers are available for a variety of
programming languages. You will also need a copy of the PaymentRequest
[Protocol Buffer description][core paymentrequest.proto] from the Bitcoin Core source code.

###### Initialization Code

With the Python code generated by `protoc`, we can start our simple
CGI program.

{% endautocrossref %}

{% highlight python %}
#!/usr/bin/env python

## This is the code generated by protoc --python_out=./ paymentrequest.proto
from paymentrequest_pb2 import *

## Load some functions
from time import time
from sys import stdout
from OpenSSL.crypto import FILETYPE_PEM, load_privatekey, sign

## Copy three of the classes created by protoc into objects we can use
details = PaymentDetails()
request = PaymentRequest()
x509 = X509Certificates()
{% endhighlight %}

{% autocrossref %}

The startup code above is quite simple, requiring nothing but the epoch
(Unix date) time function, the standard out file descriptor, a few
functions from the OpenSSL library, and the data structures and
functions created by `protoc`.

{% endautocrossref %}

###### Configuration Code

{% autocrossref %}

Next, we'll set configuration settings which will typically only change
when the receiver wants to do something differently. The code pushes a
few settings into the `request` (PaymentRequest) and `details`
(PaymentDetails) objects. When we serialize them,
[PaymentDetails][]{:#term-paymentdetails}{:.term} will be contained
within the PaymentRequest.

{% endautocrossref %}

{% highlight python %}
## SSL Signature method
request.pki_type = "x509+sha256"  ## Default: none

## Mainnet or Testnet?
details.network = "test"  ## Default: main

## Postback URL
details.payment_url = "https://example.com/pay.py"

## PaymentDetails version number
request.payment_details_version = 1  ## Default: 1

## Certificate chain
x509.certificate.append(file("/etc/apache2/example.com-cert.der", "r").read())
#x509.certificate.append(file("/some/intermediate/cert.der", "r").read())

## Load private SSL key into memory for signing later
priv_key = "/etc/apache2/example.com-key.pem"
pw = "test"  ## Key password
private_key = load_privatekey(FILETYPE_PEM, file(priv_key, "r").read(), pw)
{% endhighlight %}

Each line is described below.

{% highlight python %}
request.pki_type = "x509+sha256"  ## Default: none
{% endhighlight %}

{% autocrossref %}

`pki_type`: (optional) tell the receiving wallet program what [Public-Key
Infrastructure][PKI]{:#term-pki}{:.term} (PKI) type you're using to
cryptographically sign your PaymentRequest so that it can't be modified
by a man-in-the-middle attack. 

If you don't want to sign the PaymentRequest, you can choose a
[`pki_type`][pp pki type]{:#term-pp-pki-type}{:.term} of `none`
(the default).

If you do choose the sign the PaymentRequest, you currently have two
options defined by BIP70: `x509+sha1` and `x509+sha256`.  Both options
use the X.509 certificate system, the same system used for HTTP Secure
(HTTPS).  To use either option, you will need a certificate signed by a
certificate authority or one of their intermediaries. (A self-signed
certificate will not work.)

Each wallet program may choose which certificate authorities to trust,
but it's likely that they'll trust whatever certificate authorities their
operating system trusts.  If the wallet program doesn't have a full
operating system, as might be the case for small hardware wallets, BIP70
suggests they use the [Mozilla Root Certificate Store][mozrootstore]. In
general, if a certificate works in your web browser when you connect to
your webserver, it will work for your PaymentRequests.

{% endautocrossref %}

{% highlight python %}
details.network = "test"  ## Default: main
{% endhighlight %}

{% autocrossref %}

`network`:<!--noref--> (optional) tell the spender's wallet program what Bitcoin network you're
using; BIP70 defines "main" for mainnet (actual payments) and "test" for
testnet (like mainnet, but fake satoshis are used). If the wallet
program doesn't run on the network you indicate, it will reject the
PaymentRequest.

{% endautocrossref %}

{% highlight python %}
details.payment_url = "https://example.com/pay.py"
{% endhighlight %}

{% autocrossref %}

`payment_url`: (required) tell the spender's wallet program where to send the Payment
message (described later). This can be a static URL, as in this example,
or a variable URL such as `https://example.com/pay.py?invoice=123.`
It should usually be an HTTPS address to prevent man-in-the-middle
attacks from modifying the message.

{% endautocrossref %}

{% highlight python %}
request.payment_details_version = 1  ## Default: 1
{% endhighlight %}

{% autocrossref %}

`payment_details_version`: (optional) tell the spender's wallet program what version of the
PaymentDetails you're using. As of this writing, the only version is
version 1.

{% endautocrossref %}

{% highlight python %}
## This is the pubkey/certificate corresponding to the private SSL key
## that we'll use to sign:
x509.certificate.append(file("/etc/apache2/example.com-cert.der", "r").read())
{% endhighlight %}

{% autocrossref %}

`x509certificates`:<!--noref--> (required for signed PaymentRequests) you must
provide the public SSL key/certificate corresponding to the private SSL
key you'll use to sign the PaymentRequest. The certificate must be in
ASN.1/DER format.

{% endautocrossref %}

{% highlight python %}
## If the pubkey/cert above didn't have the signature of a root
## certificate authority, we'd then append the intermediate certificate
## which signed it:
#x509.certificate.append(file("/some/intermediate/cert.der", "r").read())
{% endhighlight %}

{% autocrossref %}

You must also provide any intermediate certificates necessary to link
your certificate to the root certificate of a certificate authority
trusted by the spender's software, such as a certificate from the
Mozilla root store.

The certificates must be provided in a specific order---the same order
used by Apache's `SSLCertificateFile` directive and other server
software.   The figure below shows the [certificate chain][]{:#term-certificate-chain}{:.term} of the
www.bitcoin.org X.509 certificate and how each certificate (except the
root certificate) would be loaded into the [X509Certificates][]{:#term-x509certificates}{:.term} protocol
buffer message.

![X509Certificates Loading Order](/img/dev/en-cert-order.svg)

To be specific, the first certificate provided must be the
X.509 certificate corresponding to the private SSL key which will make the
signature<!--noref-->, called the [leaf certificate][]{:#term-leaf-certificate}{:.term}. Any [intermediate
certificates][intermediate certificate]{:#term-intermediate-certificate}{:.term} necessary to link that signed public SSL
key to the [root
certificate][]{:#term-root-certificate}{:.term} (the certificate authority) are attached separately, with each
certificate in DER format bearing the signature<!--noref--> of the certificate that
follows it all the way to (but not including) the root certificate.

{% endautocrossref %}

{% highlight python %}
priv_key = "/etc/apache2/example.com-key.pem"
pw = "test"  ## Key password
private_key = load_privatekey(FILETYPE_PEM, file(priv_key, "r").read(), pw)
{% endhighlight %}

{% autocrossref %}

(Required for signed PaymentRequests) you will need a private SSL key in
a format your SSL library supports (DER format is not required). In this
program, we'll load it from a PEM file. (Embedding your passphrase in
your CGI code, as done here, is obviously a bad idea in real life.)

The private SSL key will not be transmitted with your request. We're
only loading it into memory here so we can use it to sign the request
later.

{% endautocrossref %}

###### Code Variables

{% autocrossref %}

Now let's look at the variables your CGI program will likely set for
each payment.

{% endautocrossref %}

{% highlight python %}
## Amount of the request
amount = 10000000  ## In satoshis

## P2PH pubkey hash
pubkey_hash = "2b14950b8d31620c6cc923c5408a701b1ec0a020"
## P2PH output script entered as hex and converted to binary
# OP_DUP OP_HASH160 <push 20 bytes> <pubKey hash> OP_EQUALVERIFY OP_CHECKSIG
#   76       a9            14       <pubKey hash>        88          ac
hex_script = "76" + "a9" + "14" + pubkey_hash + "88" + "ac"
serialized_script = hex_script.decode("hex")

## Load amount and script into PaymentDetails
details.outputs.add(amount = amount, script = serialized_script)

## Memo to display to the spender
details.memo = "Flowers & chocolates"

## Data which should be returned to you with the payment
details.merchant_data = "Invoice #123"
{% endhighlight python %}

Each line is described below.

{% highlight python %}
amount = 10000000  ## In satoshis (=100 mBTC)
{% endhighlight %}

{% autocrossref %}

`amount`: (optional) the [amount][pp amount]{:#term-pp-amount}{:.term} you want the spender to pay. You'll probably get
  this value from your shopping cart application or fiat-to-BTC exchange
  rate conversion tool. If you leave the amount blank, the wallet
  program will prompt the spender how much to pay (which can be useful
  for donations).

{% endautocrossref %}

{% highlight python %}
pubkey_hash = "2b14950b8d31620c6cc923c5408a701b1ec0a020"
# OP_DUP OP_HASH160 <push 20 bytes> <pubKey hash> OP_EQUALVERIFY OP_CHECKSIG
#   76       a9            14       <pubKey hash>        88          ac
hex_script = "76" + "a9" + "14" + pubkey_hash + "88" + "ac"
serialized_script = hex_script.decode("hex")
{% endhighlight %}

{% autocrossref %}

`script`: (required) You must specify the output script you want the spender to
pay---any valid script is acceptable. In this example, we'll request
payment to a P2PH output script.  

First we get a pubkey hash. The hash above is the hash form of the
address used in the URI examples throughout this section,
mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN.

Next, we plug that hash into the standard P2PH output script using hex,
as illustrated by the code comments.

Finally, we convert the output script from hex into its serialized form.

{% endautocrossref %}

{% highlight python %}
details.outputs.add(amount = amount, script = serialized_script)
{% endhighlight %}

{% autocrossref %}

`outputs`:<!--noref--> (required) add the output script and (optional) amount to the
PaymentDetails outputs<!--noref--> array. 

It's possible to specify multiple [`scripts`][pp
script]{:#term-pp-script}{:.term} and `amounts` as part of a merge
avoidance strategy, described later in the [Merge Avoidance
subsection][]. However, effective merge avoidance is not possible under
the base BIP70 rules in which the spender pays each `script` the exact
amount specified by its paired `amount`. If the amounts are omitted from
all `amount`/`script` pairs, the spender will be prompted to choose an
amount to pay.

{% endautocrossref %}

{% highlight python %}
details.memo = "Flowers & chocolates"
{% endhighlight %}

{% autocrossref %}

`memo`: (optional) add a memo which will be displayed to the spender as
plain UTF-8 text. Embedded HTML or other markup will not be processed.

{% endautocrossref %}

{% highlight python %}
details.merchant_data = "Invoice #123"
{% endhighlight %}

{% autocrossref %}

`merchant_data`: (optional) add arbitrary data which should be sent back to the
receiver when the invoice is paid. You can use this to track your
invoices, although you can more reliably track payments by generating a
unique address for each payment and then tracking when it gets paid. 

The [`memo`][pp memo]{:#term-pp-memo}{:.term} field and the [`merchant_data`][pp merchant data]{:#term-pp-merchant-data}{:.term} field can be arbitrarily long,
but if you make them too long, you'll run into the 50,000 byte limit on
the entire PaymentRequest, which includes the often several kilobytes
given over to storing the certificate chain. As will be described in a
later subsection, the `memo` field can be used by the spender after
payment as part of a cryptographically-proven receipt.

{% endautocrossref %}

###### Derivable Data

{% autocrossref %}

Next, let's look at some information your CGI program can
automatically derive.

{% endautocrossref %}

{% highlight python %}
## Request creation time
details.time = int(time()) ## Current epoch (Unix) time

## Request expiration time
details.expires = int(time()) + 60 * 10  ## 10 minutes from now

## PaymentDetails is complete; serialize it and store it in PaymentRequest
request.serialized_payment_details = details.SerializeToString()

## Serialized certificate chain
request.pki_data = x509.SerializeToString()

## Initialize signature field so we can sign the full PaymentRequest
request.signature = ""

## Sign PaymentRequest
request.signature = sign(private_key, request.SerializeToString(), "sha256")
{% endhighlight %}

Each line is described below.

{% highlight python %}
details.time = int(time()) ## Current epoch (Unix) time
{% endhighlight %}

{% autocrossref %}

`time`: (required) PaymentRequests must indicate when they were created
in number of seconds elapsed since 1970-01-01T00:00 UTC (Unix
epoch time format).

{% endautocrossref %}

{% highlight python %}
details.expires = int(time()) + 60 * 10  ## 10 minutes from now
{% endhighlight %}

{% autocrossref %}

`expires`: (optional) the PaymentRequest may also set an [`expires`][pp
expires]{:#term-pp-expires}{:.term} time after
which they're no longer valid. You probably want to give receivers
the ability to configure the expiration time delta; here we used the
reasonable choice of 10 minutes. If this request is tied to an order
total based on a fiat-to-satoshis exchange rate, you probably want to
base this on a delta from the time you got the exchange rate. 

{% endautocrossref %}

{% highlight python %}
request.serialized_payment_details = details.SerializeToString()
{% endhighlight %}

{% autocrossref %}

`serialized_payment_details`: (required) we've now set everything we need to create the
PaymentDetails, so we'll use the SerializeToString function from the
protocol buffer code to store the PaymentDetails in the appropriate
field of the PaymentRequest.

{% endautocrossref %}

{% highlight python %}
request.pki_data = x509.SerializeToString()
{% endhighlight %}

{% autocrossref %}

`pki_data`: (required for signed PaymentRequests) serialize the certificate chain
[PKI data][pp PKI data]{:#term-pp-pki-data}{:.term} and store it in the
PaymentRequest

{% endautocrossref %}

{% highlight python %}
request.signature = ""
{% endhighlight %}

{% autocrossref %}

We've filled out everything in the PaymentRequest except the signature,
but before we sign it, we have to initialize the signature field by
setting it to a zero-byte placeholder.

{% endautocrossref %}

{% highlight python %}
request.signature = sign(private_key, request.SerializeToString(), "sha256")
{% endhighlight %}

{% autocrossref %}

`signature`:<!--noref--> (required for signed PaymentRequests) now we
make the [signature][ssl signature]{:#term-ssl-signature}{:.term} by
signing the completed and serialized PaymentRequest. We'll use the
private key we stored in memory in the configuration section and the
same hashing formula we specified in `pki_type` (sha256 in this case) 

{% endautocrossref %}

###### Output Code

{% autocrossref %}

Now that we have PaymentRequest all filled out, we can serialize it and
send it along with the HTTP headers, as shown in the code below.

{% endautocrossref %}

{% highlight python %}
print "Content-Type: application/bitcoin-paymentrequest"
print "Content-Transfer-Encoding: binary"
print ""
{% endhighlight %}

{% autocrossref %}

(Required) BIP71 defines the content types for PaymentRequests,
Payments, and PaymentACKs.

{% endautocrossref %}

{% highlight python %}
file.write(stdout, request.SerializeToString())
{% endhighlight %}

{% autocrossref %}

`request`: (required) now, to finish, we just dump out the serialized
PaymentRequest (which contains the serialized PaymentDetails). The
serialized data is in binary, so we can't use Python's print()
because it would add an extraneous newline.

The following screenshot shows how the authenticated PaymentDetails
created by the program above appears in the GUI from Bitcoin Core 0.9.

![Bitcoin Core Showing Validated Payment Request](/img/dev/en-btcc-payment-request.png)

{% endautocrossref %}

##### Payment

{% autocrossref %}

If the spender declines to pay, the wallet program will not send any
further messages to the receiver's server unless the spender clicks
another URI pointing to that server.  If the spender does decide to pay,
the wallet program will create at least one transaction paying each of
the outputs in the PaymentDetails section. The wallet may broadcast
the transaction or transactions, as Bitcoin Core 0.9 does, but it
doesn't need to.

Whether or not it broadcasts the transaction or transactions, the wallet
program composes a reply to the PaymentRequest; the reply is called the
Payment. [Payment][pp payment]{:#term-pp-payment}{:.term} contains four fields:

* `merchant_data`: (optional) an exact copy of the
  `merchant_data` from the PaymentDetails. This is
  optional in the case that the PaymentDetails doesn't provide
  `merchant_data`. Receivers should be aware that malicious spenders can
  modify the merchant data before sending it back, so receivers may wish to
  cryptographically sign it before giving it to the spender and then
  validate it before relying on it.

* [`transactions`][pp transactions]{:#term-pp-transactions}{:.term}: (required) one or more signed transactions which pay the outputs
  specified in the PaymentDetails.

<!-- BIP70 implies that refund_to is required (i.e. "one or more..."),
but Mike Hearn implied on bitcoin-devel that it's optional (i.e. "wallets have
to either never submit refund data, or always submit it"). 
I'll use the BIP70 version here until I hear differently. -harding -->

* [`refund_to`][pp refund to]{:#term-pp-refund-to}{:.term}: (required) one or more output scripts to which the
  receiver can send a partial or complete refund. As of this writing, a
  proposal is gaining traction to expire refund output scripts after a
  certain amount of time (not defined yet) so spenders don't need to
  worry about receiving refunds to addresses they no longer monitor.

* `memo`: (optional) a plain UTF-8 text memo sent to the receiver. It
  should not contain HTML or any other markup. Spenders should not depend
  on receivers reading their memos.

The Payment is sent to the [`payment_url`][pp payment
url]{:#term-pp-payment-url}{:.term} provided in the PaymentDetails.
The URL should be a HTTPS address to prevent a man-in-the-middle attack
from modifying the spender's `refund_to` output scripts. When sending the
Payment, the wallet program must set the following HTTP client headers:

{% endautocrossref %}

~~~
Content-Type: application/bitcoin-payment
Accept: application/bitcoin-paymentack
~~~

##### PaymentACK
{% autocrossref %}

The receiver's CGI program at the `payment_url` receives the Payment message and
decodes it using its Protocol Buffers code. The `transactions` are
checked to see if they pay the output scripts the receiver requested in
PaymentDetails and are then broadcast to the network (unless the network
already has them).

The CGI program checks the `merchant_data` parameter if necessary and issues
a [PaymentACK][]{:#term-paymentack}{:.term} (acknowledgment) with the following HTTP headers:

{% endautocrossref %}

~~~
Content-Type: application/bitcoin-paymentack
Content-Transfer-Encoding: binary
~~~

{% autocrossref %}

Then it sends another Protocol-Buffers-encoded message with one or two
fields:

* `payment`: (required) A copy of the the entire Payment message (in
  serialized form) which is being acknowledged.

* `memo`: (optional) A plain UTF-8 text memo displayed to the spender
  informing them about the status of their payment.  It should not
  contain HTML or any other markup.  Receivers should not depend on
  spenders reading their memos.

The PaymentACK does not mean that the payment is final; it just means
that everything seems to be correct. The payment is final once the
payment transactions are block-chain confirmed to the receiver's
satisfaction.

However, the spender's wallet program should indicate to the spender that
the payment was accepted for processing so the spender can direct his or
her attention elsewhere.

{% endautocrossref %}

##### Receipts

{% autocrossref %}

Unlike PaymentRequest, PaymentDetails, [Payment][pp payment]{:.auto-link}, and PaymentACK, there is
no specific [receipt][]{:#term-receipt}{:.term} object.  However, a cryptographically-verifiable
receipt can be derived from a signed PaymentDetails and one or more confirmed
transactions.

A signed PaymentDetails indicates what output scripts should be paid
(`script`), how much they should be paid (`amount`), and by when
(`expires`). The Bitcoin block chain indicates whether those outputs
were paid the requested amount and can provide a rough idea of when the
transactions were generated.  Together, this information provides
verifiable proof that the spender paid somebody with the
receiver's private SSL key.

{% endautocrossref %}

### Verifying Payment

{% autocrossref %}

As explained in the [Transactions][] and [Block Chain][] sections, broadcasting
a transaction to the network doesn't ensure that the receiver gets
paid. A malicious spender can create one transaction that pays the
receiver and a second one that pays the same input back to himself. Only
one of these transactions will be added to the block chain, and nobody
can say for sure which one it will be.

Two or more transactions spending the same input are commonly referred
to as a [double spend][]{:#term-double-spend}{:.term}.

Once the transaction is included in a block, double spends are
impossible without modifying block chain history to replace the
transaction, which is quite difficult. Using this system,
the Bitcoin protocol can give each of your transactions an updating confidence 
score based on the number of blocks which would need to be modified to replace 
a transaction. For each block, the transaction gains one [confirmation][]{:#term-confirmation}{:.term}. Since 
modifying blocks is quite difficult, higher confirmation scores indicate 
greater protection.

**0 confirmations**: The transaction has been broadcast but is still not 
included in any block. Zero confirmation transactions ([unconfirmed
transactions][]{:#term-unconfirmed-transactions}{:.term}) should generally not be 
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
block chain.

Another good source of double-spend protection can be human intelligence. For 
example, fraudsters may act differently from legitimate customers, letting 
savvy merchants manually flag them as high risk. Your program can provide a 
safe mode which stops automatic payment acceptance on a global or per-customer 
basis.

{% endautocrossref %}

### Issuing Refunds

{% autocrossref %}

Occasionally receivers using your applications will need to issue
refunds. The obvious way to do that, which is very unsafe, is simply
to return the satoshis to the output script from which they came.
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

As discussed in the Payment section, `refund_to` addresses may come with
implicit expiration dates, so you may need to revert to contacting the
spender directly if the refund is being issued a long time after the
original payment was made.

{% endautocrossref %}

### Disbursing Income (Limiting Forex Risk)

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
