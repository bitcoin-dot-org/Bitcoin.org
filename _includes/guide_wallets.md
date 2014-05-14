## Wallets

{% autocrossref %}

Bitcoin wallets at their core are a collection of private keys. These collections are stored digitally in a file, or can even be physically stored on pieces of paper. 

{% endautocrossref %}

### Private Key Formats

{% autocrossref %}

Private keys are what are used to unlock satoshis from a particular address. In Bitcoin, a private key in standard format is simply a 256-bit number, between the values:

0x1 and 0xFFFF FFFF FFFF FFFF FFFF FFFF FFFF FFFE BAAE DCE6 AF48 A03B BFD2 5E8C D036 4141, representing nearly the entire range of 2<sup>256</sup>-1 values. The range is governed by the secp256k1 ECDSA encryption standard used by Bitcoin. 

{% endautocrossref %}

#### Wallet Import Format (WIF)

{% autocrossref %}

In order to make copying of private keys less prone to error, [Wallet Import Format][]{:#term-wallet-import-format}{:.term} may be utilized. WIF uses base58Check encoding on an private key, greatly decreasing the chance of copying error, much like standard Bitcoin addresses.

1. Take a private key.

2. Add a 0x80 byte in front of it for mainnet addresses or 0xef for testnet addresses.

3. Perform a SHA-256 hash on the extended key.<!--noref-->

4. Perform a SHA-256 hash on result of SHA-256 hash.

5. Take the first four bytes of the second SHA-256 hash; this is the checksum.

6. Add the four checksum bytes from point 5 at the end of the extended key<!--noref--> from point 2.

7. Convert the result from a byte string into a Base58 string using Base58Check encoding.

The process is easily reversible, using the Base58 decoding function, and removing the padding.

{% endautocrossref %}

#### Mini Private Key Format

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


### Hierarchical Deterministic Key Creation

<!-- 
For consistent word ordering:
[normal|hardened|] [master|parent|child|grandchild] [extended|non-extended|] [private|public|chain] [key|code]
-->

{% autocrossref %}

The hierarchical deterministic key creation and transfer protocol ([HD
protocol][]{:#term-hd-protocol}{:.term}) greatly simplifies wallet
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

Because of the way `point()` functions, it's possible to create a [child
public key][]{:#term-child-public-key}{:.term} by combining an
existing [(parent) public key][parent public
key]{:#term-parent-public-key}{:.term} with another public key created from any
integer (*i*) value. This child public key is the same public key which
would be created by the `point()` function if you added the *i* value to
the original (parent) private key and then found the remainder of that
sum divided by a global constant used by all Bitcoin software (*G*):

{% endautocrossref %}

    point( (parent_private_key + i) % G ) == parent_public_key + point(i)

{% autocrossref %}

This means that two or more independent programs which agree on a
sequence of integers can create a series of unique [child key][]{:#term-child-key}{:.term} pairs from
a single parent key pair without any further communication.
Moreover, the program which distributes new public keys for receiving
payment can do so without any access to the private keys, allowing the
public key distribution program to run on a possibly-insecure platform such as
a public web server.

Child public keys can also create their own child public keys
(grandchild public keys) by repeating the child key derivation
operations:

{% endautocrossref %}

    point( (child_private_key + i) % G ) == child_public_key + point(i)

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
code][]{:#term-chain-code}{:.term}, so the compromising of one chain
code doesn't necessary compromise the integer sequence for the whole
hierarchy, allowing the [master chain
code][]{:#term-master-chain-code}{:.term} to continue being useful
even if, for example, a web-based public key distribution program
gets hacked.

![Overview Of Hierarchical Deterministic Key Derivation](/img/dev/en-hd-overview.svg)

As illustrated above, HD key derivation takes four inputs<!--noref-->:

* The *[parent private key][]{:#term-parent-private-key}{:.term}* and
  *parent public key* are regular uncompressed 256-bit ECDSA keys.

* The [parent chain code][]{:#term-parent-chain-code}{:.term} is 256
  bits of seemingly-random data.

* The [index][key index]{:#term-key-index}{:.term} number is a 32-bit integer specified by the program.

In the normal form shown in the above illustration, the parent chain
code and the index number are fed into a one-way cryptographic hash
([HMAC-SHA512][]) to produce 512 bits of
deterministically-generated-but-seemingly-random data. The
seemingly-random 256 bits on the righthand side of the hash output are
used as a new child chain code. The seemingly-random 256 bits on the
lefthand side of the hash output are used as the integer value to be combined
with either the parent private key or parent public key to,
respectively, create either a child private key or child public key:

{% endautocrossref %}

    point( (parent_private_key + lefthand_hash_output) % G ) == child_public_key
    point(child_private_key) == parent_public_key + point(lefthand_hash_output)

{% autocrossref %}

Specifying different index numbers will create different unlinkable
child keys from the same parent keys.  Repeating the procedure for the
child keys using the child chain code will create unlinkable grandchild keys.

Because creating child keys requires both a key and a chain code, the
key and chain code together are called the [extended
key][]{:#term-extended-key}{:.term}. An [extended private
key][]{:#term-extended-private-key}{:.term} and its corresponding
[extended public key][]{:#term-extended-public-key}{:.term} have the
same chain code. The (top-level parent) [master private
key][]{:#term-master-private-key}{:.term} and master chain
code are derived from random data,
as illustrated below.

![Creating A Root Extended Key Pair](/img/dev/en-hd-root-keys.svg)

A [root seed][]{:#term-root-seed}{:.term} is created from either 128
bits, 256 bits, or 512 bits of random data. This root seed of as little
as 128 bits is the the only data the user needs to backup in order to
derive every key created by a particular wallet program using
particular settings.

(**Warning:** as of this writing, HD wallet programs are not expected to
be fully compatible, so users must only use the same HD wallet program
with the same HD-related settings for a particular root seed.)

The root seed is hashed to create 512 bits of seemingly-random data,
from which the master private key and master chain code are created
(together, the master extended private key). The master public key is
derived from the master private key using `point()`, which, together
with the master chain code, is the master extended public
key. The master extended keys are functionally equivalent to other
extended keys; it is only their location at the top of the hierarchy
which makes them special.

{% endautocrossref %}

#### Hardened Keys

{% autocrossref %}

Deriving [child extended keys][child extended key]{:#term-child-extended-key}{:.term} from parent extended keys is more nuanced
than described earlier due to the presence of two extended private key
derivation formulas. The normal formula, described above, combines
together only the index number and the parent chain code to create the
child chain code and the integer value which is combined with the parent
private key to create the child private key.

![Creating Child Public Keys From An Extended Private Key](/img/dev/en-hd-private-parent-to-private-child.svg)

The hardened formula, illustrated above, combines together the index
number, the parent chain code, and also the parent private key to create
the data used to generate the child chain code and child private key.
This formula makes it impossible to create child public keys without
knowing the parent private key. In other words, parent extended public
keys can't create hardened child public keys.

Because of that, a [hardened extended private
key][]{:#term-hardened-extended-private-key}{:.term} is much less
useful than a normal extended private key---however, it's more secure
against multi-level key compromise. If an attacker gets a normal parent
chain code, he can brute-force find all 2<sup>31</sup> normal chain
codes deriving from it. If the attacker also obtains a child, grandchild, or
further-descended private key, he can use the chain code to generate all
of the extended private keys descending from that private key.

![Cross-Generational Key Compromise](/img/dev/en-hd-cross-generational-key-compromise.svg)

For this reason, the chain code part of an extended public key should be
better secured than standard public keys and users should be advised
against exporting even non-extended private keys to
possibly-untrustworthy environments.

Hardened extended private keys create a firewall through which
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

The HD protocol also describes a serialization format for extended
public keys and extended private keys.  For details, please see the
[wallet section in the developer reference][devref wallets] or BIP32
for the full HD protocol specification.

{% endautocrossref %}

#### Storing Root Seeds

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



### Loose-Key Wallets

{% autocrossref %}

Loose-Key wallets, also called "Just a Bunch Of Keys (JBOK)", are a deprecated form of wallet that originated from the Bitcoin Core client wallet. The Bitcoin Core client wallet would create 100 private key/public key pairs automatically via a Pseudo-Random-Number Generator (PRNG) for later use. Once all these keys are consumed or the RPC call `keypoolrefill` is run, another 100 key pairs would be created. This created considerable difficulty<!--noref--> in backing up one’s keys, considering backups have to be run manually to save the newly-generated private keys. If a new key pair set is generated, used, and then lost prior to a backup, the stored satoshis are likely lost forever. Many older-style mobile wallets followed a similar format, but only generated a new private key upon user demand.

This wallet type is being actively phased out and discouraged from being used due to the backup hassle.

{% endautocrossref %}
