## Transactions

The following subsections briefly document core transaction details.

#### OP Codes

{% autocrossref %}

The op codes used in the pubkey scripts of standard transactions are:

* Various data pushing op codes from 0x00 to 0x4e (1--78). These aren't
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
  the next values (signatures) plus one extra value. Then it compares
  each of public keys against each of the signatures looking for ECDSA
  matches; if n of the public keys match signatures, it pushes true onto the stack.
  Otherwise, it pushes false.

    The "one extra value" it consumes is the result of an off-by-one
    error in the Bitcoin Core implementation. This value is not used, so
    signature scripts prefix the secp256k1 signatures with a single OP_0 (0x00).

* [`OP_RETURN`][op_return]{:#term-op-return}{:.term} terminates the script in failure when executed.

A complete list of OP codes can be found on the Bitcoin Wiki [Script
Page][wiki script], with an authoritative list in the `opcodetype` enum
of the Bitcoin Core [script header file][core script.h]

Note: Signature scripts are not signed, so anyone can modify them. This
means signature scripts should only contain data and data-pushing op
codes which can't be modified without causing the pubkey script to fail.
Placing non-data-pushing op codes in the signature script currently
makes a transaction non-standard, and future consensus rules may forbid
such transactions altogether. (Non-data-pushing op codes are already
forbidden in signature scripts when spending a P2SH pubkey script.)

{% endautocrossref %}

#### Address Conversion

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
 
Bitcoin's base58 encoding, called [Base58Check][]{:#term-base58check}{:.term} may not match other implementations. Tier
Nolan provided the following example encoding algorithm to the Bitcoin
Wiki [Base58Check
encoding](https://en.bitcoin.it/wiki/Base58Check_encoding) page:

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

{% autocrossref %}

Bitcoin transactions are broadcast between peers and stored in the
block chain in a serialized byte format, called [raw format][]{:#term-raw-format}{:.term}. Bitcoin Core
and many other tools print and accept raw transactions encoded as hex.

The binary form of a raw transaction is SHA256(SHA256()) hashed to create
its TXID.  Bitcoin Core RPCs use a reversed byte order for hashes; see the [subsection about hash byte
order][section hash byte order] for details.

A sample raw transaction is the first non-coinbase transaction, made in
[block 170][block170].  To get the transaction, use the `getrawtransaction` RPC with
that transaction's txid (provided below):

{% endautocrossref %}

~~~
> bitcoin-cli getrawtransaction \
  f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16

0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423e\
dce25857fcd3704000000004847304402204e45e16932b8af514961a1d3\
a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07d\
e4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff\
0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f71\
59b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7\
303b8a0626f1baded5c72a704f7e6cd84cac00286bee000000004341041\
1db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a690\
9a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f\
656b412a3ac00000000
~~~

A byte-by-byte analysis by Amir Taaki (Genjix) of this transaction is
provided below.  (Originally from the Bitcoin Wiki
[OP_CHECKSIG page](https://en.bitcoin.it/wiki/OP_CHECKSIG); Genjix's
text has been updated to use the terms used in this document.)

~~~
01 00 00 00              version number
01                       number of inputs (var_uint)

input 0:
c9 97 a5 e5 6e 10 41 02  previous tx hash (txid)
fa 20 9c 6a 85 2d d9 06 
60 a2 0b 2d 9c 35 24 23 
ed ce 25 85 7f cd 37 04
00 00 00 00              previous output index

48                       size of signature script (var_uint)

Signature script for input 0:
47                       push 71 bytes to stack
30 44 02 20 4e 45 e1 69
32 b8 af 51 49 61 a1 d3
a1 a2 5f df 3f 4f 77 32
e9 d6 24 c6 c6 15 48 ab
5f b8 cd 41 02 20 18 15
22 ec 8e ca 07 de 48 60
a4 ac dd 12 90 9d 83 1c
c5 6c bb ac 46 22 08 22
21 a8 76 8d 1d 09 01
ff ff ff ff              sequence number

02                       number of outputs (var_uint)

output 0:
00 ca 9a 3b 00 00 00 00  amount = 10.00000000 BTC
43                       size of pubkey script (var_uint)

Pubkey script for output 0:
41                       push 65 bytes to stack
04 ae 1a 62 fe 09 c5 f5 
1b 13 90 5f 07 f0 6b 99 
a2 f7 15 9b 22 25 f3 74 
cd 37 8d 71 30 2f a2 84 
14 e7 aa b3 73 97 f5 54 
a7 df 5f 14 2c 21 c1 b7 
30 3b 8a 06 26 f1 ba de 
d5 c7 2a 70 4f 7e 6c d8 
4c 
ac                       OP_CHECKSIG

output 1:
00 28 6b ee 00 00 00 00  amount = 40.00000000 BTC
43                       size of pubkey script (var_uint)

Pubkey script for output 1:
41                       push 65 bytes to stack
04 11 db 93 e1 dc db 8a  
01 6b 49 84 0f 8c 53 bc 
1e b6 8a 38 2e 97 b1 48 
2e ca d7 b1 48 a6 90 9a
5c b2 e0 ea dd fb 84 cc 
f9 74 44 64 f8 2e 16 0b 
fa 9b 8b 64 f9 d4 c0 3f 
99 9b 86 43 f6 56 b4 12 
a3                       
ac                       OP_CHECKSIG

00 00 00 00              locktime
~~~

