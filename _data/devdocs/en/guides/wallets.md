{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/guides/wallets.md" %}

## Wallets
{% include helpers/subhead-links.md %}

{% autocrossref %}

A Bitcoin wallet can refer to either a wallet program or a wallet file.
Wallet programs create public keys to receive satoshis and use the
corresponding private keys to spend those satoshis. Wallet files
store private keys and (optionally) other information related to
transactions for the wallet program.

Wallet programs and wallet files are addressed below in separate
subsections, and this document attempts to always make it clear whether
we're talking about wallet programs or wallet files.

{% endautocrossref %}

### Wallet Programs
{% include helpers/subhead-links.md %}

{% autocrossref %}

Permitting receiving and spending of satoshis is the only essential
feature of wallet software---but a particular wallet program doesn't
need to do both things.  Two wallet programs can work together, one
program distributing public keys in order to receive satoshis and
another program signing transactions spending those satoshis.

Wallet programs also need to interact with the peer-to-peer network to
get information from the block chain and to broadcast new transactions.
However, the programs which distribute public keys or sign transactions
don't need to interact with the peer-to-peer network themselves.

This leaves us with three necessary, but separable, parts of a wallet
system: a public key distribution program, a signing program, and a
networked program.  In the subsections below, we will describe common
combinations of these parts.

Note: we speak about distributing public keys generically. In many
cases, P2PKH or P2SH hashes will be distributed instead of public keys,
with the actual public keys only being distributed when the outputs
they control are spent.

{% endautocrossref %}

#### Full-Service Wallets
{% include helpers/subhead-links.md %}

{% autocrossref %}

The simplest wallet is a program which performs all three functions: it
generates private keys, derives the corresponding public keys, helps
distribute those public keys as necessary, monitors for outputs spent to
those public keys, creates and signs transactions spending those
outputs, and broadcasts the signed transactions.

![Full-Service Wallets](/img/dev/en-wallets-full-service.svg)

As of this writing, almost all popular wallets can be used as
full-service wallets.

The main advantage of full-service wallets is that they are easy to use.
A single program does everything the user needs to receive and spend
satoshis.

The main disadvantage of full-service wallets is that they store the
private keys on a device connected to the Internet.  The compromise of
such devices is a common occurrence, and an Internet connection makes it
easy to transmit private keys from a compromised device to an attacker.

To help protect against theft, many wallet programs offer users the
option of encrypting the wallet files which contain the private keys.
This protects the private keys when they aren't being used, but it
cannot protect against an attack designed to capture the encryption
key or to read the decrypted keys from memory.

{% endautocrossref %}


#### Signing-Only Wallets
{% include helpers/subhead-links.md %}

{% autocrossref %}

To increase security, private keys can be generated and stored by a
separate wallet program operating in a more secure environment. These
signing-only wallets work in conjunction with a networked wallet which
interacts with the peer-to-peer network. 

Signing-only wallets programs typically use deterministic key creation
(described in a later subsection) to create parent private and public
keys which can create child private and public keys.

![Signing-Only Wallets](/img/dev/en-wallets-signing-only.svg)

When first run, the signing-only wallet creates a parent private key and
transfers the corresponding parent public key to the networked wallet.

The networked wallet uses the parent public key to derive child public
keys, optionally helps distribute them, monitors for outputs spent to
those public keys, creates unsigned transactions spending those outputs,
and transfers the unsigned transactions to the signing-only wallet.

Often, users are given a chance to review the unsigned transactions' details
(particularly the output details) using the signing-only wallet.  

After the optional review step, the signing-only wallet uses the parent
private key to derive the appropriate child private keys and signs the
transactions, giving the signed transactions back to the networked wallet.

The networked wallet then broadcasts the signed transactions to the
peer-to-peer network.

The following subsections describe the two most common variants of
signing-only wallets: offline wallets and hardware wallets.

{% endautocrossref %}

##### Offline Wallets
{% include helpers/subhead-links.md %}

{% autocrossref %}

Several full-service wallets programs will also operate as two separate
wallets: one program instance acting as a signing-only wallet (often called an
"offline wallet") and the other program instance acting as the networked
wallet (often called an "online wallet" or "watching-only wallet").

The offline wallet is so named because it is intended to be run on a
device which does not connect to any network, greatly reducing the
number of attack vectors. If this is the case, it is usually up to the
user to handle all data transfer using removable media such as USB
drives.  The user's workflow is something like:

1. (Offline) Disable all network connections on a device and install the wallet
   software. Start the wallet software in offline mode to create the
   parent private and public keys.  Copy the parent public key to
   removable media.

2. (Online) Install the wallet software on another device, this one
   connected to the Internet, and import the parent public key from the
   removable media. As you would with a full-service wallet, distribute
   public keys to receive payment. When ready to spend satoshis, fill in
   the output details and save the unsigned transaction generated by the
   wallet to removable media.

3. (Offline) Open the unsigned transaction in the offline instance,
   review the output details to make sure they spend the correct
   amount to the correct address. This prevents malware on the online
   wallet from tricking the user into signing a transaction which pays
   an attacker. After review, sign the transaction and save it to
   removable media.

4. (Online) Open the signed transaction in the online instance so it can
   broadcast it to the peer-to-peer network.

The primary advantage of offline wallets is their possibility for
greatly improved security over full-service wallets.  As long as the
offline wallet is not compromised (or flawed) and the user reviews all outgoing
transactions before signing, the user's satoshis are safe even if the
online wallet is compromised.

The primary disadvantage of offline wallets is hassle. For maximum
security, they require the user dedicate a device to only offline tasks.
The offline device must be booted up whenever funds are to be spent, and
the user must physically copy data from the online device to the offline
device and back.

{% endautocrossref %}



##### Hardware Wallets
{% include helpers/subhead-links.md %}

{% autocrossref %}

Hardware wallets are devices dedicated to running a signing-only wallet.
Their dedication lets them eliminate many of the vulnerabilities
present in operating systems designed for general use, allowing them
to safely communicate directly with other devices so users don't need to
transfer data manually.  The user's workflow is something like:

1. (Hardware) Create parent private and public keys. Connect hardware
   wallet to a networked device so it can get the parent public key.

2. (Networked) As you would with a full-service wallet, distribute
   public keys to receive payment. When ready to spend satoshis, fill in
   the transaction details, connect the hardware wallet, and click
   Spend.  The networked wallet will automatically send the transaction
   details to the hardware wallet.

3. (Hardware) Review the transaction details on the hardware wallet's
   screen. Some hardware wallets may prompt for a passphrase or PIN
   number. The hardware wallet signs the transaction and uploads it to
   the networked wallet.

4. (Networked) The networked wallet receives the signed transaction from
   the hardware wallet and broadcasts it to the network.

The primary advantage of hardware wallets is their possibility for
greatly improved security over full-service wallets with much less
hassle than offline wallets.

The primary disadvantage of hardware wallets is their hassle. Even
though the hassle is less than that of offline wallets, the user must
still purchase a hardware wallet device and carry it with them whenever
they need to make a transaction using the signing-only wallet.

An additional (hopefully temporary) disadvantage is that, as of this
writing, very few popular wallet programs support hardware
wallets---although almost all popular wallet programs have announced
their intention to support at least one model of hardware wallet.

{% endautocrossref %}




#### Distributing-Only Wallets
{% include helpers/subhead-links.md %}

{% autocrossref %}

Wallet programs which run in difficult-to-secure environments, such as
webservers, can be designed to distribute public keys (including P2PKH
or P2SH addresses) and nothing more.  There are two common ways to
design these minimalist wallets:

![Distributing-Only Wallets](/img/dev/en-wallets-distributing-only.svg)

* Pre-populate a database with a number of public keys or addresses, and
  then distribute on request a pubkey script or address using one of
  the database entries. To [avoid key reuse][devguide avoiding key
  reuse], webservers should keep track
  of used keys and never run out of public keys. This can be made easier
  by using parent public keys as suggested in the next method.

* Use a parent public key to create child public keys. To avoid key
  reuse, a method must be used to ensure the same public key isn't
  distributed twice. This can be a database entry for each key
  distributed or an incrementing pointer to the key
  index number.

Neither method adds a significant amount of overhead, especially if a
database is used anyway to associate each incoming payment with a
separate public key for payment tracking. See the [Payment
Processing][devguide payment processing] section for details.

{% endautocrossref %}



### Wallet Files
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin wallets at their core are a collection of private keys. These
collections are stored digitally in a file, or can even be physically
stored on pieces of paper.

{% endautocrossref %}

#### Private Key Formats
{% include helpers/subhead-links.md %}

{% autocrossref %}

Private keys are what are used to unlock satoshis from a particular address. In Bitcoin, a private key in standard format is simply a 256-bit number, between the values:

0x01 and 0xFFFF FFFF FFFF FFFF FFFF FFFF FFFF FFFE BAAE DCE6 AF48 A03B BFD2 5E8C D036 4140, representing nearly the entire range of 2<sup>256</sup>-1 values. The range is governed by the secp256k1 ECDSA encryption standard used by Bitcoin. 

{% endautocrossref %}

##### Wallet Import Format (WIF)
{% include helpers/subhead-links.md %}

{% autocrossref %}

In order to make copying of private keys less prone to error, [Wallet Import Format][/en/glossary/wallet-import-format]{:#term-wallet-import-format}{:.term} may be utilized. WIF uses base58Check encoding on an private key, greatly decreasing the chance of copying error, much like standard Bitcoin addresses.

1. Take a private key.

2. Add a 0x80 byte in front of it for mainnet addresses or 0xef for testnet addresses.

3. Append a 0x01 byte after it if it should be used with compressed
   public keys (described in a later subsection). Nothing is appended if
   it is used with uncompressed public keys.

4. Perform a SHA-256 hash on the extended key.<!--noref-->

5. Perform a SHA-256 hash on result of SHA-256 hash.

6. Take the first four bytes of the second SHA-256 hash; this is the checksum.

7. Add the four checksum bytes from point 5 at the end of the extended key<!--noref--> from point 2.

8. Convert the result from a byte string into a Base58 string using Base58Check encoding.

The process is easily reversible, using the Base58 decoding function, and removing the padding.

{% endautocrossref %}

##### Mini Private Key Format
{% include helpers/subhead-links.md %}

{% autocrossref %}

Mini private key format is a method for encoding a private key in under 30 characters, enabling keys to be embedded in a small physical space, such as physical bitcoin tokens, and more damage-resistant QR codes. 

1. The first character of mini keys is 'S'. 

2. In order to determine if a mini private key is well-formatted, a question mark is added to the private key.

3. The SHA256 hash is calculated. If the first byte produced is a `00’, it is well-formatted. This key restriction acts as a typo-checking mechanism. A user brute forces the process using random numbers until a well-formatted mini private key is produced. 

4. In order to derive the full private key, the user simply takes a single SHA256 hash of the original mini private key. This process is one-way: it is intractable to compute the mini private key format from the derived key.

Many implementations disallow the character '1' in the mini private key due to its visual similarity to 'l'.

**Resource:** A common tool to create and redeem these keys is the [Casascius Bitcoin Address Utility][casascius
address utility].

{% endautocrossref %}




#### Public Key Formats
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin ECDSA public keys represent a point on a particular Elliptic
Curve (EC) defined in secp256k1. In their traditional uncompressed form,
public keys contain an identification byte, a 32-byte X coordinate, and
a 32-byte Y coordinate. The extremely simplified illustration below
shows such a point on the elliptic curve used by Bitcoin,
y<sup>2</sup>&nbsp;=&nbsp;x<sup>3</sup>&nbsp;+&nbsp;7, over a field of
contiguous numbers.

![Point On ECDSA Curve](/img/dev/en-ecdsa-compressed-public-key.svg)

(Secp256k1 actually modulos coordinates by a large prime, which produces a
field of non-contiguous integers and a significantly less clear plot,
although the principles are the same.)

An almost 50% reduction in public key size can be realized without
changing any fundamentals by dropping the Y coordinate. This is possible
because only two points along the curve share any particular X
coordinate, so the 32-byte Y coordinate can be replaced with a single
bit indicating whether the point is on what appears in the illustration
as the "top" side or the "bottom" side.

No data is lost by creating these compressed public keys---only a small
amount of CPU is necessary to reconstruct the Y coordinate and access
the uncompressed public key. Both uncompressed and compressed public
keys are described in official secp256k1 documentation and supported by
default in the widely-used OpenSSL library.

Because they're easy to use, and because they reduce almost by half
the block chain space used to store public keys for every spent output,
compressed public keys are the default in Bitcoin Core and are the
recommended default for all Bitcoin software.

However, Bitcoin Core prior to 0.6 used uncompressed keys.  This creates
a few complications, as the hashed form of an uncompressed key is
different than the hashed form of a compressed key, so the same key
works with two different P2PKH addresses.   This also means that the key
must be submitted in the correct format in the signature script so it
matches the hash in the previous output's pubkey script.

For this reason, Bitcoin Core uses several different identifier bytes to
help programs identify how keys should be used:

* Private keys meant to be used with compressed public keys have 0x01
  appended to them before being Base-58 encoded. (See the private key
  encoding section above.)

* Uncompressed public keys start with 0x04; compressed public keys begin
  with 0x03 or 0x02 depending on whether they're greater or less than
  the midpoint of the curve.  These prefix bytes are all used in
  official secp256k1 documentation.

{% endautocrossref %}


#### Hierarchical Deterministic Key Creation
{% include helpers/subhead-links.md %}

<!-- 
For consistent word ordering:
[normal|hardened|] [master|parent|child|grandchild] [extended|non-extended|] [private|public|chain] [key|code]
-->

{% autocrossref %}

The hierarchical deterministic key creation and transfer protocol ([HD
protocol][/en/glossary/hd-protocol]{:#term-hd-protocol}{:.term}) greatly simplifies wallet
backups, eliminates the need for repeated communication between multiple
programs using the same wallet, permits creation of child accounts which
can operate independently, gives each parent account the ability to
monitor or control its children even if the child account is
compromised, and divides each account into full-access and
restricted-access parts so untrusted users or programs can be allowed to
receive or monitor payments without being able to spend them.

The HD protocol takes advantage of the ECDSA public key creation
function, [`point()`][point function]{:#term-point-function}{:.term},
which takes a large integer (the private key) and turns it into a graph
point (the public key):

{% endautocrossref %}

    point(private_key) == public_key

{% autocrossref %}

Because of the way `point()` works, it's possible to create a [child
public key][/en/glossary/child-key]{:#term-child-public-key}{:.term} by combining an
existing [(parent) public key][/en/glossary/parent-key]{:#term-parent-public-key}{:.term} with another public key created from any
integer (*i*) value. This child public key is the same public key which
would be created by the `point()` function if you added the *i* value to
the original (parent) private key and then found the remainder of that
sum divided by a global constant used by all Bitcoin software (*p*):

{% endautocrossref %}

    point( (parent_private_key + i) % p ) == parent_public_key + point(i)

{% autocrossref %}

This means that two or more independent programs which agree on a
sequence of integers can create a series of unique [child key][/en/glossary/child-key]{:#term-child-key}{:.term} pairs from
a single [parent key][/en/glossary/parent-key]{:#term-parent-key}{:.term} pair without any further communication.
Moreover, the program which distributes new public keys for receiving
payment can do so without any access to the private keys, allowing the
public key distribution program to run on a possibly-insecure platform such as
a public web server.

Child public keys can also create their own child public keys
(grandchild public keys) by repeating the child key derivation
operations:

{% endautocrossref %}

    point( (child_private_key + i) % p ) == child_public_key + point(i)

{% autocrossref %}

Whether creating child public keys or further-descended public keys, a
predictable sequence of integer values would be no better than using a
single public key for all transactions, as anyone who knew one child
public key could find all of the other child public keys created from
the same parent public key. Instead, a random seed can be used to
deterministically generate the sequence of integer values so that the
relationship between the child public keys is invisible to anyone
without that seed.

The HD protocol uses a single root seed to create a hierarchy of
child, grandchild, and other descended keys with unlinkable
deterministically-generated integer values. Each child key also gets
a deterministically-generated seed from its parent, called a [chain
code][/en/glossary/chain-code]{:#term-chain-code}{:.term}, so the compromising of one chain
code doesn't necessarily compromise the integer sequence for the whole
hierarchy, allowing the [master chain
code][/en/glossary/master-chain-code-and-private-key]{:#term-master-chain-code}{:.term} to continue being useful
even if, for example, a web-based public key distribution program
gets hacked.

![Overview Of Hierarchical Deterministic Key Derivation](/img/dev/en-hd-overview.svg)

As illustrated above, HD key derivation takes four inputs<!--noref-->:

* The *[parent private key][/en/glossary/parent-key]{:#term-parent-private-key}{:.term}* and
  *parent public key* are regular uncompressed 256-bit ECDSA keys.

* The [parent chain code][/en/glossary/chain-code]{:#term-parent-chain-code}{:.term} is 256
  bits of seemingly-random data.

* The [index][key index]{:#term-key-index}{:.term} number is a 32-bit integer specified by the program.

In the normal form shown in the above illustration, the parent chain
code, the parent public key, and the index number are fed into a one-way cryptographic hash
([HMAC-SHA512][]) to produce 512 bits of
deterministically-generated-but-seemingly-random data. The
seemingly-random 256 bits on the righthand side of the hash output are
used as a new child chain code. The seemingly-random 256 bits on the
lefthand side of the hash output are used as the integer value to be combined
with either the parent private key or parent public key to,
respectively, create either a child private key or child public key:

{% endautocrossref %}

    child_private_key == (parent_private_key + lefthand_hash_output) % G
    child_public_key == point( (parent_private_key + lefthand_hash_output) % G )
    child_public_key == point(child_private_key) == parent_public_key + point(lefthand_hash_output)

{% autocrossref %}

Specifying different index numbers will create different unlinkable
child keys from the same parent keys.  Repeating the procedure for the
child keys using the child chain code will create unlinkable grandchild keys.

Because creating child keys requires both a key and a chain code, the
key and chain code together are called the [extended
key][/en/glossary/extended-key]{:#term-extended-key}{:.term}. An [extended private
key][/en/glossary/extended-key]{:#term-extended-private-key}{:.term} and its corresponding
[extended public key][/en/glossary/extended-key]{:#term-extended-public-key}{:.term} have the
same chain code. The (top-level parent) [master private
key][/en/glossary/master-chain-code-and-private-key]{:#term-master-private-key}{:.term} and master chain
code are derived from random data,
as illustrated below.

![Creating A Root Extended Key Pair](/img/dev/en-hd-root-keys.svg)

A [root seed][/en/glossary/hd-wallet-seed]{:#term-root-seed}{:.term} is created from either 128
bits, 256 bits, or 512 bits of random data. This root seed of as little
as 128 bits is the the only data the user needs to backup in order to
derive every key created by a particular wallet program using
particular settings.

![Warning icon](/img/icons/icon_warning.svg)
 **Warning:** As of this writing, HD wallet programs are not expected to
be fully compatible, so users must only use the same HD wallet program
with the same HD-related settings for a particular root seed.

The root seed is hashed to create 512 bits of seemingly-random data,
from which the master private key and master chain code are created
(together, the master extended private key). The master public key is
derived from the master private key using `point()`, which, together
with the master chain code, is the master extended public
key. The master extended keys are functionally equivalent to other
extended keys; it is only their location at the top of the hierarchy
which makes them special.

{% endautocrossref %}

##### Hardened Keys
{% include helpers/subhead-links.md %}

{% autocrossref %}

Hardened extended keys fix a potential problem with normal extended keys.
If an attacker gets a normal parent
chain code and parent public key, he can brute-force all chain
codes deriving from it. If the attacker also obtains a child, grandchild, or
further-descended private key, he can use the chain code to generate all
of the extended private keys descending from that private key, as
shown in the grandchild and great-grandchild generations of the illustration below.

![Cross-Generational Key Compromise](/img/dev/en-hd-cross-generational-key-compromise.svg)

Perhaps worse, the attacker can reverse the normal child private key
derivation formula and subtract a parent chain code from a child private
key to recover the parent private key, as shown in the child and
parent generations of the illustration above.  This means an attacker
who acquires an extended public key and any private key descended from
it can recover that public key's private key and all keys descended from
it.

For this reason, the chain code part of an extended public key should be
better secured than standard public keys and users should be advised
against exporting even non-extended private keys to
possibly-untrustworthy environments.

This can be fixed, with some tradeoffs, by replacing the the normal
key derivation formula with a hardened key derivation formula.

The normal key derivation formula, described in the section above, combines
together the index number, the parent chain code, and the parent public key to create the
child chain code and the integer value which is combined with the parent
private key to create the child private key.

![Creating Child Public Keys From An Extended Private Key](/img/dev/en-hd-private-parent-to-private-child.svg)

The hardened formula, illustrated above, combines together the index
number, the parent chain code, and the parent private key to create
the data used to generate the child chain code and child private key.
This formula makes it impossible to create child public keys without
knowing the parent private key. In other words, parent extended public
keys can't create hardened child public keys.

Because of that, a [hardened extended private
key][/en/glossary/hardened-extended-key]{:#term-hardened-extended-private-key}{:.term} is much less
useful than a normal extended private key---however, 
hardened extended private keys create a firewall through which
multi-level key derivation compromises cannot happen. Because hardened
child extended public keys cannot generate grandchild chain codes on
their own, the compromise of a parent extended public key cannot be
combined with the compromise of a grandchild private key to create
great-grandchild extended private keys.

The HD protocol uses different index numbers to indicate
whether a normal or hardened key should be generated. Index numbers from
0x00 to 0x7fffffff (0 to 2<sup>31</sup>-1) will generate a normal key; index
numbers from 0x80000000 to 0xffffffff will generate a hardened key. To
make descriptions easy, many developers use the [prime symbol][] to indicate
hardened keys, so the first normal key (0x00) is 0 and the first hardened
key (0x80000000) is 0´.

(Bitcoin developers typically use the ASCII apostrophe rather than
the unicode prime symbol, a convention we will henceforth follow.)

This compact description is further combined with slashes prefixed by
*m* or *M* to indicate hierarchy and key type, with *m* being a private
key and *M* being a public key. For example, m/0'/0/122' refers to the
123rd hardened private child (by index number) of the first normal child
(by index) of the first hardened child (by index) of the master private
key. The following hierarchy illustrates prime notation and hardened key
firewalls.

![Example HD Wallet Tree Using Prime Notation](/img/dev/en-hd-tree.svg)

Wallets following the BIP32 HD protocol only create hardened children of
the master private key (*m*) to prevent a compromised child key from
compromising the master key. As there are no normal children for the
master keys, the master public key is not used in HD wallets. All other
keys can have normal children, so the corresponding extended public keys
may be used instead.

The HD protocol also describes a serialization format for extended
public keys and extended private keys.  For details, please see the
[wallet section in the developer reference][devref wallets] or BIP32
for the full HD protocol specification.

{% endautocrossref %}

##### Storing Root Seeds
{% include helpers/subhead-links.md %}

{% autocrossref %}

Root seeds in the HD protocol are 128, 256, or 512 bits of random data
which must be backed up precisely. To make it more convenient to use
non-digital backup methods, such as memorization or hand-copying, BIP39
defines a method for creating a 512-bit root seed from a pseudo-sentence
(mnemonic) of common natural-language words which was itself created
from 128 to 256 bits of entropy and optionally protected by a password.

The number of words generated correlates to the amount of entropy used:

| Entropy Bits |  Words |
|--------------|--------|
|  128         |    12  |
|  160         |    15  |
|  192         |    18  |
|  224         |    21  |
|  256         |    24  |

The passphrase can be of any length.  It is simply appended to the mnemonic
pseudo-sentence, and then both the mnemonic and password are hashed
2,048 times using HMAC-SHA512, resulting in a seemingly-random 512-bit seed.  Because any
input<!--noref--> to the hash function creates a seemingly-random 512-bit seed,
there is no fundamental way to prove the user entered the correct
password, possibly allowing the user to protect a seed even when under
duress.

For implementation details, please see BIP39.

{% endautocrossref %}



#### Loose-Key Wallets
{% include helpers/subhead-links.md %}

{% autocrossref %}

Loose-Key wallets, also called "Just a Bunch Of Keys (JBOK)", are a deprecated form of wallet that originated from the Bitcoin Core client wallet. The Bitcoin Core client wallet would create 100 private key/public key pairs automatically via a Pseudo-Random-Number Generator (PRNG) for later use.

These unused private keys are stored in a virtual "key pool", with new
keys being generated whenever a previously-generated key was used,
ensuring the pool maintained 100 unused keys. (If the wallet is
encrypted, new keys are only generated while the wallet is unlocked.)

This created considerable difficulty<!--noref--> in backing up one’s keys, considering backups have to be run manually to save the newly-generated private keys. If a new key pair set is generated, used, and then lost prior to a backup, the stored satoshis are likely lost forever. Many older-style mobile wallets followed a similar format, but only generated a new private key upon user demand.

This wallet type is being actively phased out and discouraged from being used due to the backup hassle.

{% endautocrossref %}
