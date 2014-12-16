{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref_core_rpcs-abcdefg.md" %}

#### addmultisigaddress
{% include helpers/subhead-links.md %}

~~~
addmultisigaddress <num required> <addresses|pubkeys> [account]
~~~

{% autocrossref %}

Add a P2SH multisig address to the wallet. 

Related RPCs: `createmultisig`

{% endautocrossref %}

**Argument #1: Number Of Signatures Required**

{% autocrossref %}

*Number; required:* the *minimum* (*m*) number of signatures required to
spend satoshis sent to this m-of-n P2SH multisig pubkey script.

{% endautocrossref %}

~~~
<m>
~~~

**Argument #2: Full Public Keys, Or Addresses For Known Public Keys**

{% autocrossref %}

*String; required:* A JSON array of hex-encoded public *keys* or *addresses*
for public keys known to this Bitcoin Core instance.  The multisig
pubkey script can only use full (unhashed) public keys, so you generally must
provide public keys for any address not known to this wallet.

{% endautocrossref %}

~~~
[
  "<address|pubkey>"
  ,[...]
]
~~~

**Argument #3: Account Name**


{% autocrossref %}
*String; optional:* The name of an *account* in the wallet which will
store the address.

{% endautocrossref %}

~~~
"<account>"
~~~


**Result: A P2SH Address Printed And Stored In The Wallet**

{% autocrossref %}

*String:* a hash of the P2SH multisig redeem script, which is also stored
in the wallet so Bitcoin Core can monitor the network and block chain
for transactions sent to that address (which will be displayed in the
wallet as spendable balances).

{% endautocrossref %}


**Example**

{% autocrossref %}

Adding a 2-of-3 P2SH multisig address to the "test account" by mixing
two P2PKH addresses and one full public key:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet addmultisigaddress \
  2 \
  '''
    [ 
      "mjbLRSidW1MY8oubvs4SMEnHNFXxCcoehQ", 
      "02ecd2d250a76d204011de6bc365a56033b9b3a149f679bc17205555d3c2b2854f", 
      "mt17cV37fBqZsnMmrHnGCm9pM28R1kQdMG" 
    ]
  ''' \
  'test account'
~~~

Result:

~~~
2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq
~~~

{% autocrossref %}

(New P2SH multisig address also stored in wallet.)

{% endautocrossref %}





#### addnode
{% include helpers/subhead-links.md %}

~~~
addnode <ip address>:<port> <add|remove|onetry>
~~~

{% autocrossref %}

Attempts add or remove a node from the addnode list,
or try a connection to a node once.

{% endautocrossref %}

**Argument #1: IP Address And Port Of Node**

{% autocrossref %}

*String, required:* the colon-delimited IP address<!--noref--> and port of the node to add, remove, or
connect to.

{% endautocrossref %}

**Argument #2: Add Or Remove The Node, Or Try Once To Connect**

{% autocrossref %}

*String, required:* whether to *add* or *remove* the node to the list of
known nodes. This does not necessarily mean that a connection to the
node will be established. To attempt to establish a connection
immediately, use *onetry*.

{% endautocrossref %}

**Return: Empty Or Error**

{% autocrossref %}

Will not return any data if the node is added or if *onetry* is used
(even if the connection attempt fails).  Will return an error if you try
removing an unknown node.

{% endautocrossref %}

**Example**

{% autocrossref %}

Try connecting to the following node.

{% endautocrossref %}

~~~
> bitcoin-cli -testnet addnode 68.39.150.9:18333 onetry
~~~


#### backupwallet
{% include helpers/subhead-links.md %}

~~~
backupwallet <filename|directory>
~~~

{% autocrossref %}

Safely copies `wallet.dat`<!--noref--> to destination, which can be a directory or a
path with filename.

{% endautocrossref %}

**Argument #1: Destination Directory Or Filename**

{% autocrossref %}

*String, required:* a directory or filename. If a directory, a file
named `wallet.dat`<!--noref--> will be created or overwritten. If a filename, a file
of that name will be created or overwritten.

{% endautocrossref %}

**Return: Empty Or Error**

{% autocrossref %}

Nothing will be returned on success. If the file couldn't be created or
written, an error will be returned.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet backupwallet /tmp/backup.dat
~~~


#### createmultisig
{% include helpers/subhead-links.md %}

~~~
createmultisig <num required> <addresses|pubkeys>
~~~

{% autocrossref %}

Creates a multi-signature address.

Related RPCs: `addmultisigaddress`

{% endautocrossref %}

**Argument #1: Number Of Signatures Required**

{% autocrossref %}

*Number; required:* the *minimum* (*m*) number of signatures required to
spend satoshis sent to this m-of-n multisig pubkey script.

{% endautocrossref %}

~~~
<m>
~~~

**Argument #2: Full Public Keys, Or Addresses For Known Public Keys**

{% autocrossref %}

*String; required:* A JSON array of hex-encoded public *keys* or *addresses*
for public keys known to this Bitcoin Core instance.  The multisig
pubkey script can only use full (unhashed) public keys, so you generally must
provide public keys for any address not known to this wallet.

{% endautocrossref %}

~~~
[
  "<address|pubkey>"
  ,[...]
]
~~~

**Result: Address And Hex-Encoded Redeem Script**

{% autocrossref %}

*String:* JSON object with the P2SH *address* and hex-encoded *redeemScript*.

{% endautocrossref %}

~~~
{
  "address":"<P2SH address>",
  "redeemScript":"<hex redeemScript>"
}
~~~

**Example**

{% autocrossref %}

Creating a 2-of-3 P2SH multisig address by mixing two P2PKH addresses and
one full public key:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet createmultisig 2 '''
  [ 
    "mjbLRSidW1MY8oubvs4SMEnHNFXxCcoehQ", 
    "02ecd2d250a76d204011de6bc365a56033b9b3a149f679bc17205555d3c2b2854f", 
    "mt17cV37fBqZsnMmrHnGCm9pM28R1kQdMG" 
  ]
  '''
~~~

{% autocrossref %}

Result (redeemScript wrapped):

{% endautocrossref %}

~~~
{
  "address" : "2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq",
  "redeemScript" : "522103ede722780d27b05f0b1169efc90fa15a601a32\
                    fc6c3295114500c586831b6aaf2102ecd2d250a76d20\
                    4011de6bc365a56033b9b3a149f679bc17205555d3c2\
                    b2854f21022d609d2f0d359e5bc0e5d0ea20ff9f5d33\
                    96cb5b1906aa9c56a0e7b5edc0c5d553ae"
}
~~~




#### createrawtransaction
{% include helpers/subhead-links.md %}

~~~
createrawtransaction <previous output(s)> <new output(s)>
~~~

{% autocrossref %}

Create an unsigned transaction in hex rawtransaction format that spends a
previous output to an new output with a P2PKH or P2SH address. The
transaction is not stored in the wallet or transmitted to the network.


**Argument #1: References To Previous Outputs**

*String; required:* A JSON array of JSON objects. Each object in the
array references a previous output by its *txid* (string; required) and
output index number, called *vout* (number; required).

{% endautocrossref %}

~~~
[
  {
    "txid":"<previous output txid>",
    "vout":<previous output index number>
  }
  ,[...]
]
~~~

**Argument #2: P2PKH Or P2SH Addresses For New Outputs**

{% autocrossref %}

*String; required:* A JSON object with P2PKH or P2SH addresses to pay as
keys and the amount to pay each address as its value (number; required)
in decimal bitcoins.

{% endautocrossref %}

~~~
{
  "<address>": <bitcoins>.<decimal bitcoins>
  ,[...]
}
~~~

**Result: Unsigned Raw Transaction (In Hex)**

{% autocrossref %}

*String:* The resulting unsigned transaction in hex-encoded
rawtransaction format, or a JSON error if any value provided was invalid.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet createrawtransaction '''
  [
    { 
      "txid":"5a7d24cd665108c66b2d56146f244932edae4e2376b561b3d396d5ae017b9589", 
      "vout":0 
    } 
  ]
  ''' '''
  { 
    "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe": 0.1 
  }
''''
~~~

Result:

~~~
010000000189957b01aed596d3b361b576234eaeed3249246f14562d6bc60851\
66cd247d5a0000000000ffffffff0180969800000000001976a9140dfc8bafc8\
419853b34d5e072ad37d1a5159f58488ac00000000
~~~



#### decoderawtransaction
{% include helpers/subhead-links.md %}

~~~
decoderawtransaction <hexstring>
~~~

{% autocrossref %}

Decode a rawtransaction format hex string into a JSON object
representing the transaction.

{% endautocrossref %}

**Argument: RawTransaction Hex**

{% autocrossref %}

*String; required:* a complete transaction in rawtransaction format hex.

{% endautocrossref %}

**Result: JSON Object**

{% autocrossref %}

A JSON object describing the the transaction is returned.  The object is
described in parts below.

{% endautocrossref %}

~~~
{
  "txid" : "<hash>",
  "version" : <number>,
  "locktime" : <epoch time|block height>,
~~~

{% autocrossref %}

The transaction identifier (*txid*), the transaction *version* number,
and the *locktime*.

{% endautocrossref %}

~~~
  "vin" : [
     {
       "txid": "<txid>",
       "vout": <output index number>,
       "scriptSig": {
         "asm": "<script psuedo-code>",
         "hex": "<script hex>"
       },
       "sequence": <sequence number>
     }
     ,...
  ],
~~~

{% autocrossref %}

A JSON array of inputs, with each inputs prevout *txid*, prevout output
index number (*vout*), *scriptSig* in script-language psuedocode (*asm*)
and *hex*, and the input sequence number.

{% endautocrossref %}


~~~
  "vout" : [
     {
       "value" : <decimal bitcoins>,
       "n" : <index number>,
       "scriptPubKey" : {
         "asm" : "<script psuedo-code>",
         "hex" : "<script hex>",
         "reqSigs" : <number of required signatures>,
         "type" : "<type>",
         "addresses" : [
           "<address>"
           ,[...]
         ]
       }
     }
     ,[...]
  ],
}
~~~

{% autocrossref %}

A JSON array of outputs, with each output containing a *value* in decimal
bitcoins, an output index number (*n*), a pubkey script (*scriptPubKey*) in
script-language psuedocode (*asm*) and *hex*, the number of signatures
required (*reqSigs*), the *type* of pubkey script (if it's a standard
transaction), and an array of *addresses* used in the output.  (More
than one address means it's a multisig output.)

{% endautocrossref %}

**Example**

{% autocrossref %}

Decode a signed one-input, two-output transaction:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet decoderawtransaction 0100000001268a9ad7bf\
              b21d3c086f0ff28f73a064964aa069ebb69a9e437da85c7e55\
              c7d7000000006b483045022100ee69171016b7dd218491faf6\
              e13f53d40d64f4b40123a2de52560feb95de63b902206f23a0\
              919471eaa1e45a0982ed288d374397d30dff541b2dd45a4c3d\
              0041acc0012103a7c1fd1fdec50e1cf3f0cc8cb4378cd8e9a2\
              cee8ca9b3118f3db16cbbcf8f326ffffffff0350ac60020000\
              00001976a91456847befbd2360df0e35b4e3b77bae48585ae0\
              6888ac80969800000000001976a9142b14950b8d31620c6cc9\
              23c5408a701b1ec0a02088ac002d3101000000001976a9140d\
              fc8bafc8419853b34d5e072ad37d1a5159f58488ac00000000
~~~

Result:

~~~
{
    "txid" : "ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb0\
              1c2cb8e8de481e",
    "version" : 1,
    "locktime" : 0,
    "vin" : [
        {
            "txid" : "d7c7557e5ca87d439e9ab6eb69a04a9664a0738ff2\
                      0f6f083c1db2bfd79a8a26",
            "vout" : 0,
            "scriptSig" : {
                "asm" : "3045022100ee69171016b7dd218491faf6e13f5\
                         3d40d64f4b40123a2de52560feb95de63b90220\
                         6f23a0919471eaa1e45a0982ed288d374397d30\
                         dff541b2dd45a4c3d0041acc001 03a7c1fd1fd\
                         ec50e1cf3f0cc8cb4378cd8e9a2cee8ca9b3118\
                         f3db16cbbcf8f326",
                "hex" : "483045022100ee69171016b7dd218491faf6e13\
                         f53d40d64f4b40123a2de52560feb95de63b902\
                         206f23a0919471eaa1e45a0982ed288d374397d\
                         30dff541b2dd45a4c3d0041acc0012103a7c1fd\
                         1fdec50e1cf3f0cc8cb4378cd8e9a2cee8ca9b3\
                         118f3db16cbbcf8f326"
            },
            "sequence" : 4294967295
        }
    ],
    "vout" : [
        {
            "value" : 0.39890000,
            "n" : 0,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 
	         56847befbd2360df0e35b4e3b77bae48585ae068 
	         OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a91456847befbd2360df0e35b4e3b77bae48585ae06888ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "moQR7i8XM4rSGoNwEsw3h4YEuduuP6mxw7"
                ]
            }
        },
        {
            "value" : 0.10000000,
            "n" : 1,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 
	         2b14950b8d31620c6cc923c5408a701b1ec0a020 
	         OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a9142b14950b8d31620c6cc923c5408a701b1ec0a02088ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN"
                ]
            }
        },
        {
            "value" : 0.20000000,
            "n" : 2,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 
	         0dfc8bafc8419853b34d5e072ad37d1a5159f584 
	         OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe"
                ]
            }
        }
    ]
}
~~~

#### decodescript
{% include helpers/subhead-links.md %}

~~~
decodescript <redeemScript>
~~~

{% autocrossref %}

Decode a hex-encoded P2SH redeem script.

{% endautocrossref %}

**Argument: A Hex-Encoded Redeem Script**

{% autocrossref %}

*String; required:* an complete (not hashed) redeem script in hex.

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON object describing the redeem script, with *asm* being the script
in script-language psuedocode, *hex* being the a P2PKH public key (if
applicable), *type* being the output type (typically public key,
multisig, or nonstandard), *reqSigs* being the required signatures,
and the *addresses* array listing the addresses belonging to the
public keys.

{% endautocrossref %}

~~~
{
  "asm":"<script psuedo-code>",
  "hex":"<script hex>",
  "type":"<type>",
  "reqSigs": <number of required signatures>,
  "addresses": [
     "<address>"
     ,[...]
  ],
  "p2sh","<address>"
}
~~~

**Example**

{% autocrossref %}

A 2-of-3 P2SH multisig pubkey script:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet decodescript 483045022100ee69171016b7dd21\
              8491faf6e13f53d40d64f4b40123a2de52560feb95de63b902\
              206f23a0919471eaa1e45a0982ed288d374397d30dff541b2d\
              d45a4c3d0041acc0012103a7c1fd1fdec50e1cf3f0cc8cb437\
              8cd8e9a2cee8ca9b3118f3db16cbbcf8f326
~~~

Result:

~~~
{
    "asm" : "2 03ede722780d27b05f0b1169efc90fa15a601a32fc6c32951\
               14500c586831b6aaf 02ecd2d250a76d204011de6bc365a56\
               033b9b3a149f679bc17205555d3c2b2854f 022d609d2f0d3\
               59e5bc0e5d0ea20ff9f5d3396cb5b1906aa9c56a0e7b5edc0\
               c5d5 3 OP_CHECKMULTISIG",
    "reqSigs" : 2,
    "type" : "multisig",
    "addresses" : [
        "mjbLRSidW1MY8oubvs4SMEnHNFXxCcoehQ",
        "mo1vzGwCzWqteip29vGWWW6MsEBREuzW94",
        "mt17cV37fBqZsnMmrHnGCm9pM28R1kQdMG"
    ],
    "p2sh" : "2MyVxxgNBk5zHRPRY2iVjGRJHYZEp1pMCSq"
}
~~~

#### dumpprivkey
{% include helpers/subhead-links.md %}

~~~
dumpprivkey <address>
~~~

{% autocrossref %}

Returns the hex-encoded private key corresponding to the address.
(But does not remove it from the wallet.)

See also: `importprivkey`

{% endautocrossref %}

**Argument: Address Corresponding To The Private Key**

{% autocrossref %}

*String; required:* the Bitcoin address of the private key you want.

{% endautocrossref %}

**Return:**

{% autocrossref %}

A hex-encoded private key.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet dumpprivkey moQR7i8XM4rSGoNwEsw3h4YEuduuP6mxw7
~~~

Result:

~~~
cTVNtBK7mBi2yc9syEnwbiUpnpGJKohDWzXMeF4tGKAQ7wvomr95
~~~



#### dumpwallet
{% include helpers/subhead-links.md %}

~~~
dumpwallet <filename>
~~~

{% autocrossref %}

Creates or overwrites a file with all wallet keys in a
human-readable format.

{% endautocrossref %}

**Argument: Filename**

A filename.

**Result**

{% autocrossref %}

The files is created (if necessary) and written.  No output is returned
to the RPC.

{% endautocrossref %}

**Example**

{% autocrossref %}

Create a wallet dump and then print its first 10 lines.

{% endautocrossref %}

~~~
> bitcoin-cli -testnet dumpwallet /tmp/dump.txt

> head /tmp/dump.txt
~~~

{% autocrossref %}

Space-delimited output (lines not wrapped).

{% endautocrossref %}

~~~
# Wallet dump created by Bitcoin v0.9.1.0-g026a939-beta (Tue, 8 Apr 2014 12:04:06 +0200)
# * Created on 2014-04-29T20:46:09Z
# * Best block at time of backup was 227221 (0000000026ede4c10594af8087748507fb06dcd30b8f4f48b9cc463cabc9d767),
#   mined on 2014-04-29T21:15:07Z

cTtefiUaLfXuyBXJBBywSdg8soTEkBNh9yTi1KgoHxUYxt1xZ2aA 2014-02-05T15:44:03Z label=test1 # addr=mnUbTmdAFD5EAg3348Ejmonub7JcWtrMck
cQNY9v93Gyt8KmwygFR59bDhVs3aRDkuT8pKaCBpop82TZ8ND1tH 2014-02-05T16:58:41Z reserve=1 # addr=mp4MmhTp3au21HPRz5waf6YohGumuNnsqT
cNTEPzZH9mjquFFADXe5S3BweNiHLUKD6PvEKEsHApqjX4ZddeU6 2014-02-05T16:58:41Z reserve=1 # addr=n3pdvsxveMBkktjsGJixfSbxacRUwJ9jQW
cTVNtBK7mBi2yc9syEnwbiUpnpGJKohDWzXMeF4tGKAQ7wvomr95 2014-02-05T16:58:41Z change=1 # addr=moQR7i8XM4rSGoNwEsw3h4YEuduuP6mxw7
cNCD679B4xi17jb4XeLpbRbZCbYUugptD7dCtUTfSU4KPuK2DyKT 2014-02-05T16:58:41Z reserve=1 # addr=mq8fzjxxVbAKxUGPwaSSo3C4WaUxdzfw3C
~~~



#### encryptwallet
{% include helpers/subhead-links.md %}

~~~
encryptwallet <passphrase>
~~~

{% autocrossref %}

Encrypts the wallet with 'passphrase'. This is only to enable encryption
for the first time.  After encryption is enabled, you will need to
enter the passphrase to use private keys (which includes generating
additional new addresses once the keypool is exhausted---see
`keypoolrefill`).

*Warning:* there is no RPC to completely disable encryption.  If you
want to return to an unencrypted wallet, you must create a new wallet
and restore your data from a `dumpwallet` backup.

See also: `walletpassphrase` and `walletlock`

{% endautocrossref %}

**Argument: A Passphrase**

{% autocrossref %}

*String; required:* a passphrase of at least one character.  Longer
passphrases will, in general, be more secure.

{% endautocrossref %}

**Result: A Notice (With Program Shutdown)**

{% autocrossref %}

The wallet will be encrypted by the passphrase and *the node will
shutdown*.  A notice may be printed.

{% endautocrossref %}


**Example**

~~~
> bitcoin-cli -testnet encryptwallet "test"
~~~

Result:

~~~
wallet encrypted; Bitcoin server stopping, restart to run with encrypted
wallet. The keypool has been flushed, you need to make a new backup.
~~~


#### getaccount
{% include helpers/subhead-links.md %}

~~~
getaccount <address>
~~~

{% autocrossref %}

Returns the name of the account associated with the given address.

{% endautocrossref %}

**Argument: A Bitcoin Address**

{% autocrossref %}

*String; required:* a bitcoin address.

{% endautocrossref %}

**Result: An Account Name**

{% autocrossref %}

*String:* the name of the account the address belongs to.  The default
account is "".

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet getaccount mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN
~~~

Result:

~~~
doc test
~~~




#### getaccountaddress
{% include helpers/subhead-links.md %}

~~~
getaccountaddress "account"
~~~

{% autocrossref %}

Returns the current Bitcoin address for receiving payments to this account.
If the account doesn't exist, it creates both the account and a new
address for receiving payment.

{% endautocrossref %}

**Argument: An Account Name**

{% autocrossref %}

*String; required:* the name of the account from which to get the
current receiving address.  The same address will be returned for each
call until the node marks it as used (because, for example, it received
a payment).

If the account doesn't exist, it is created.  For the default account,
use an empty string ("").

{% endautocrossref %}

**Result: A Bitcoin Address**

{% autocrossref %}

An address which has not yet received any known payments.

{% endautocrossref %}

**Example**

{% autocrossref %}

Get an address for the default account:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getaccountaddress ""
~~~

Result:

~~~
msQyFNYHkFUo4PG3puJBbpesvRCyRQax7r
~~~

#### getaddednodeinfo
{% include helpers/subhead-links.md %}

~~~
getaddednodeinfo <true|false> [node]
~~~

{% autocrossref %}

Returns information about the given added node, or all added nodes
(except onetry nodes).  Only nodes which have been manually added using
`addnode <node> add` will have their information displayed.

{% endautocrossref %}

**Argument #1: Whether To Display Connection Information**

{% autocrossref %}

*Boolean; required:* to display detailed information about each node,
use *true.*  To display a simple list, use *false.*

{% endautocrossref %}

**Argument #2: What Node To Display Information About**

{% autocrossref %}

*String; optional:* the IP address<!--noref--> of a particular node
to display information about.

{% endautocrossref %}

**Result: A Detailed Or Simple List Of Nodes**

{% autocrossref %}

The detailed list contains the *addednode's* IP address<!--noref-->, whether it's
currently *connected*, an array of its full *addresses*<!--noref--> using IP address<!--noref-->
and port, and whether it is *connected* inbound or outbound.

{% endautocrossref %}

~~~
[
  {
    "addednode" : "<ip address>",
    "connected" : <true|false>,
    "addresses" : [
       {
         "address" : "<ip address>:<port>",
         "connected" : "<inbound|outbound>"
       }
       ,[...]
     ]
  }
  ,[...]
]
~~~

**Example**

~~~
> bitcoin-cli -testnet getaddednodeinfo true
~~~

Result:

~~~
[
    {
        "addednode" : "46.4.99.45:44549",
        "connected" : true,
        "addresses" : [
            {
                "address" : "46.4.99.45:44549",
                "connected" : "inbound"
            }
        ]
    }
]
~~~

#### getaddressesbyaccount
{% include helpers/subhead-links.md %}

~~~
getaddressesbyaccount <account>
~~~

{% autocrossref %}

Returns a list of every address assigned to a particular account.

{% endautocrossref %}

**Argument: Account Name**

{% autocrossref %}

*String; required:* the name of the account.

{% endautocrossref %}

**Result: A List Of Addresses**

{% autocrossref %}

*String:* A JSON array of strings, with each string being a single Bitcoin address.

{% endautocrossref %}

~~~
[
  "<address>"
  ,[...]
]
~~~

**Example**

{% autocrossref %}

Get the addresses assigned to the account "doc test":

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getaddressesbyaccount "doc test"
~~~

Result:

~~~
[
    "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN"
]
~~~


#### getbalance
{% include helpers/subhead-links.md %}

~~~
getbalance [account] [confirmations]
~~~

{% autocrossref %}

Get the balance in decimal bitcoins across all accounts or for a
particular account.  Specify the number of confirmations to only show
satoshis which have been confirmed at least that many times.

{% endautocrossref %}

**Argument #1: Account Name**

{% autocrossref %}

*String; optional:* the name of the account to get a balance for or "\*"
to get the balance for all accounts (the default).  The default (primary)
account can be specified using "", which is not the same as specifying
"\*" for all accounts.

{% endautocrossref %}

**Argument #2: Minimum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations an incoming
transaction must have before it is counted towards the balance.
(Outgoing transactions are subtracted from the balance immediately.)

The default is one confirmation, so transactions are not counted towards
the balance until they confirm.

{% endautocrossref %}

**Result: The Balance In Decimal Bitcoins**

{% autocrossref %}

The balance for the account indicated (or all accounts) in decimal
satoshis.  May be negative if the account has spent more satoshis than
it received.

{% endautocrossref %}

**Examples**

{% autocrossref %}

Four balances: one for the current balance of the "doc test" account and
one for that account with more than 1,000 confirmations.  Then a balance
for the default account and a balance for all accounts.

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getbalance "doc test"
0.30000000
~~~

~~~
> bitcoin-cli -testnet getbalance "doc test" 1000
0.20000000
~~~

~~~
> bitcoin-cli -testnet getbalance ""
-1.30050000
~~~

~~~
> bitcoin-cli -testnet getbalance "*"
0.89850000
~~~



#### getbestblockhash
{% include helpers/subhead-links.md %}

~~~
getbestblockhash
~~~

{% autocrossref %}

Returns the header hash of the most recent block on the longest block chain.

{% endautocrossref %}

**Result**

The block hash in hex.

**Example**

~~~
> bitcoin-cli -testnet getbestblockhash
~~~

Result:

~~~
0000000000075c58ed39c3e50f99b32183d090aefa0cf8c324a82eea9b01a887
~~~






#### getblock
{% include helpers/subhead-links.md %}

~~~
getblock <hash> [true|false]
~~~

{% autocrossref %}

Get a block with a particular header hash from the block chain either as
a JSON object (if *true*) or a raw hex string (if *false*)

{% endautocrossref %}

**Argument: Header Hash**

{% autocrossref %}

*String; required:* the SHA256(SHA256()) hash of the block header to get.

{% endautocrossref %}

**Argument: JSON Or Hex Output**

{% autocrossref %}

*Boolean; optional:* by default, *true* to return a JSON object
describing the block.  *False* for just the hex-encoded block.

{% endautocrossref %}

**Result**

{% autocrossref %}

A hex-encoded block or the following JSON object described in segments.

{% endautocrossref %}

~~~
{
  "hash" : "<hash>",
  "confirmations" : <number>,
  "size" : <bytes>,
  "height" : <number>,
  "version" : <number>,
  "merkleroot" : "<hash>",
~~~

{% autocrossref %}

The block header *hash* (same as you provided); the number of
*confirmations* (subsequent blocks), the *size* of the block in bytes,
the block *height*, the block *version*, and the *merkle root* hash.

{% endautocrossref %}

~~~
  "tx" : [
     "<txid>"
     ,[...]
  ],
~~~

{% autocrossref %}

A JSON array of transaction identifiers (txids).

{% endautocrossref %}

~~~
  "time" : <epoch time>,
  "nonce" : <number>,
  "bits" : "<hex>",
  "difficulty" : <number>,
  "previousblockhash" : "<hash>",
  "nextblockhash" : "<hash>"
}
~~~

{% autocrossref %}

The block *time* in Unix epoch time, the block *nonce*, the target
threshold in compressed *bits* format, the target threshold in
*difficulty* format, the *previous block (header) hash*, and the *next
block (header) hash*.

{% endautocrossref %}

**Example**

{% autocrossref %}

A block in raw hex:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getblock \
            000000000fe549a89848c76070d4132872cfb6efe5315d01d7ef77e4900f2d39 \
            false
~~~

Result:

~~~
02000000df11c014a8d798395b5059c722ebdf3171a4217ead71bf6e0e99f4c7\
000000004a6f6a2db225c81e77773f6f0457bcb05865a94900ed11356d0b7522\
8efb38c7785d6053ffff001d005d437001010000000100000000000000000000\
00000000000000000000000000000000000000000000ffffffff0d03b4770301\
64062f503253482fffffffff0100f9029500000000232103adb7d8ef6b63de74\
313e0cd4e07670d09a169b13e4eda2d650f529332c47646dac00000000
~~~

{% autocrossref %}

Get the same block in JSON:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getblock \
            000000000fe549a89848c76070d4132872cfb6efe5315d01d7ef77e4900f2d39 \
            true
~~~

Result:

~~~
{
    "hash" : "000000000fe549a89848c76070d4132872cfb6efe5315d01d7ef77e4900f2d39",
    "confirmations" : 2,
    "size" : 189,
    "height" : 227252,
    "version" : 2,
    "merkleroot" : "c738fb8e22750b6d3511ed0049a96558b0bc57046f3f77771ec825b22d6a6f4a",
    "tx" : [
        "c738fb8e22750b6d3511ed0049a96558b0bc57046f3f77771ec825b22d6a6f4a"
    ],
    "time" : 1398824312,
    "nonce" : 1883462912,
    "bits" : "1d00ffff",
    "difficulty" : 1.00000000,
    "chainwork" : "000000000000000000000000000000000000000000000000083ada4a4009841a",
    "previousblockhash" : "00000000c7f4990e6ebf71ad7e21a47131dfeb22c759505b3998d7a814c011df",
    "nextblockhash" : "00000000afe1928529ac766f1237657819a11cfcc8ca6d67f119e868ed5b6188"
}
~~~



#### getblockchaininfo
{% include helpers/subhead-links.md %}

~~~
getblockchaininfo
~~~

{% autocrossref %}

Provides information about the current state of the block chain.  *This
RPC was added in Bitcoin Core 0.9.2.*

**Result**

A JSON object containing several key/value pairs: *chain* telling you
whether you're working on the main block chain or a testnet or regtest
block chain, the number of *blocks* processed by the node, the *best
block hash* (tip of the chain), the current network *difficulty*, an
estimate of the *verification progress* (1 for 100% verified), and the
total amount of *chain work* seen in the current chain (displayed in
hexadecimal). *Note: verificationprogress may exceed 1 (100%) because it's
just an estimate.*

<!-- TODOv0.10: reword when 0.10 is released -->

Bitcoin Core 0.10 will add a *headers* field indicating the number of
headers downloaded on what is believed to be the best block chain.

<!-- TODOv0.10: add this to sample below when 0.10 is released
  "headers" : <integer>,
-->

{% endautocrossref %}

~~~
{
  "chain": "<name>",
  "blocks": <integer>,
  "bestblockhash": "<SHA256 hash>",
  "difficulty": <decimal difficulty>,
  "verificationprogress": <decimal>,
  "chainwork": "<hexadecimal>"
}
~~~

<!-- TODOv0.10: update example to 0.10 when released -->

**Example From Bitcoin Core 0.9.2**

~~~
bitcoin-cli -testnet getblockchaininfo
~~~

Result:

~~~
{
    "chain" : "testnet3",
    "blocks" : 272899,
    "bestblockhash" : "00000000000047021429fb03107900637205c38b6\
                       4ebd2400bfe5be18f78da5e",
    "difficulty" : 110221.77693374,
    "verificationprogress" : 0.99999913,
    "chainwork" : "000000000000000000000000000000000000000000000\
                   0001dc6696de16ca6c8"
}
~~~





#### getblockcount
{% include helpers/subhead-links.md %}

~~~
getblockcount
~~~

{% autocrossref %}

Returns the number of blocks in the longest block chain.

{% endautocrossref %}

**Result**

The current block count.

**Example**

~~~
> bitcoin-cli -testnet getblockcount 
~~~

Result:

~~~
239402
~~~


#### getblockhash
{% include helpers/subhead-links.md %}

~~~
getblockhash <height>
~~~

{% autocrossref %}

Returns hash of block in best-block-chain at block height provided.

{% endautocrossref %}

**Argument: Block Height**

{% autocrossref %}

*Number; required:* the block height of the block hash to get.

{% endautocrossref %}

**Result: A Hash**

{% autocrossref %}

The hash of a block header.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet getblockhash 240886
~~~

Return:

~~~
00000000a0faf83ab5799354ae9c11da2a2bd6db44058e03c528851dee0a3fff
~~~






#### getblocktemplate
{% include helpers/subhead-links.md %}

~~~
getblocktemplate [client capabilities]
~~~

{% autocrossref %}

Get a block template or proposal which mining software can use to
construct a block and hash its header, as defined by BIP22.

{% endautocrossref %}

**Argument: Client Capabilities**

{% autocrossref %}

*String; optional:* a JSON object containing an optional *mode* (of which *template*
is both the default and only currently-allowed option) and an optional
*capabilities* JSON array of elements describing capabilities supported
by the client.  Known capabilities include (but are not limited to):
longpoll, coinbasetxn, coinbasevalue, proposal, serverlist, and workid. 

{% endautocrossref %}

~~~
{
  "mode":"template"
  "capabilities":[
      "<supported capability>"
      ,[...]
    ]
}
~~~

**Result: Information Necessary To Construct The Next Block**

{% autocrossref %}

A JSON object containing all the information necessary to construct a
block which can be added to the block chain.  This is a considerable
amount of information, so the JSON object is described below in parts.

{% endautocrossref %}

~~~
{
  "version" : <version number>,
  "previousblockhash" : "<hex block header hash>",
~~~

{% autocrossref %}

The block *version* number and the *hash of the previous block* header, both of
which must be added to this block's header.

{% endautocrossref %}


~~~
  "transactions" : [
~~~

{% autocrossref %}

An array of *transactions* in [transaction object format][]{:#term-transaction-object-format}{:.term}.  

{% endautocrossref %}

~~~
      {
         "data" : "<hex transaction data> ",
         "hash" : "<hex txid>",
~~~

{% autocrossref %}

Each object in the array contains the
rawtransaction *data* in hex and the *hash* of the data in RPC byte order.

{% endautocrossref %}

~~~
         "depends" : [
             <index number>
             ,[...]
         ],
~~~

{% autocrossref %}

If the transaction depends on one or more transaction in the array,
the dependent transactions are listed in the *depends* array by their
index number in the transactions array (starting from 1).

{% endautocrossref %}


~~~
         "fee": <number in satoshis>,
         "sigops" : <sigops number>
         "required" : <true|false>
      }
~~~

{% autocrossref %}

The *fee* paid by the transaction and the number of signature operations
(*sigops*) it uses which count towards the 20,000 maximum in blocks.
Also whether or not the transaction is *required* to be in the block
produced in order for that block to be accepted by Bitcoin Core (this is
mainly used by mining pools).  Note: if *required* is omitted, it is
false.

{% endautocrossref %}

~~~
      ,[...]
  ],
~~~

(More transactions.)

~~~
  "coinbaseaux" : {
      "<flag>" : "<data>"
  },
~~~

{% autocrossref %}

Hex-encoded *data* identified by *flag* which should be included in the
coinbase field of the coinbase transaction.  The flag is for the
benefit of mining software---only the data is included.

{% endautocrossref %}

~~~
  "coinbasevalue" : <number in satoshis>
~~~

{% autocrossref %}

The *coinbasevalue*, the maximum number of satoshis which the coinbase
transaction can spend (including the block reward) if all the transactions provided in
the transaction array are included in the block. 

{% endautocrossref %}

~~~
  "coinbasetxn" : { <coinbase transaction> },
~~~

{% autocrossref %}

The *coinbasetxn* is a JSON object in transaction object format
which describes the coinbase transaction.

{% endautocrossref %}

~~~
  "target" : "<target hash>",
~~~

{% autocrossref %}

The *target* threshold for the block.  In solo mining, this may be the
network target (difficulty).  In pooled mining, this is the target to
generate a share.

{% endautocrossref %}

~~~
  "mintime" : <epoch time>,
~~~

{% autocrossref %}

The minimum *time* the for the block header time in Unix epoch time
format (number of seconds elapsed since 1970-01-01T00:00 UTC.

{% endautocrossref %}

~~~
  "mutable" : [
     "<value>"
     ,[...]
  ],
~~~

{% autocrossref %}

An array of values which describe how the client can modify the block
template.  For example, "time" to change the block header time or
"transactions" to add or remove transactions.

{% endautocrossref %}

~~~
  "noncerange" : "<min nonce hex><max nonce hex>",
~~~

{% autocrossref %}

Two 32-bit integers, concatenated in big-endian hexadecimal, which
represent the valid ranges of block header nonces the miner may scan.

{% endautocrossref %}

~~~
  "sigoplimit" : <number of sigops>,
  "sizelimit" : <number of bytes>,
~~~

{% autocrossref %}

The limitations of block signature operations (*sigoplimit*) in number
and block size (*sizelimit*) in bytes.

{% endautocrossref %}

~~~
  "curtime" : <epoch time>,
  "bits" : "<compressed target>",
  "height" : <number of previous blocks>
}
~~~

{% autocrossref %}

The current time in Unix epoch format (*curtime*), the compressed network
target (difficulty) of the block being worked on (*bits*), and the *height* of the
block being worked on.

{% endautocrossref %}

**Example**

{% autocrossref %}

Getting the block template from a default Bitcoin Core 0.9.1 with the
optional parameters "longpoll" and "workid" (which have no effect on
default Bitcoin Core).

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getblocktemplate '{"capabilities":["longpoll", "workid"]}'
~~~

Result (long lines have been wrapped (\\) and some data has been omitted
([...]):


~~~
{
    "version" : 2,
    "previousblockhash" : "000000005767babc38ebd1807def40cb47dfe\
                           f29ef712de9d85c77ad8e039b9d",
    "transactions" : [
        {
            "data" : "0100000001438a4d7a2333c3579b81d59f562d2af8\
                      69c142f697546465339c67028f44aa65000000006b\
                      483045022100eb31779b1e162e27825c5f52a1378f\
                      8d90994999df58706cf29bd78c80f6920a022063c0\
                      4eb627166eab60d36caacaa68a0fd805923442a3cd\
                      db6babacb6b4706cc90121031a2761284af7f291e8\
                      0f061f6eace13e3ea9b2aa3b0ac5407b7a21a5d43f\
                      3174ffffffff0200e1f505000000001976a914a11b\
                      66a67b3ff69671c8f82254099faf374b800e88ace0\
                      5c9041000000001976a91406e1c288b96002df7442\
                      bb1ec6c43419a1f1e74988ac00000000",
            "hash" : "d471fda51e1d7284add729e44b5d8d8a462e5d4151\
                      6f0a1efda712cfa76e310e",
            "depends" : [
            ],
            "fee" : 20000,
            "sigops" : 2
        },
        {
            "data" : "[...]",
            "hash" : "5c1e046ec13bd1fad71153aa28811ecad241233960\
                      efca32f5554d233ff29f7f",
            "depends" : [
            ],
            "fee" : 0,
            "sigops" : 2
        },
        [...]
    ],
    "coinbaseaux" : {
        "flags" : "062f503253482f"
    },
    "coinbasevalue" : 2500320000,
    "target" : "000000000001968c00000000000000000000000000000000\
                0000000000000000",
    "mintime" : 1398693714,
    "mutable" : [
        "time",
        "transactions",
        "prevblock"
    ],
    "noncerange" : "00000000ffffffff",
    "sigoplimit" : 20000,
    "sizelimit" : 1000000,
    "curtime" : 1398698437,
    "bits" : "1b01968c",
    "height" : 227051
}
~~~




#### getconnectioncount
{% include helpers/subhead-links.md %}

~~~
getconnectioncount
~~~

{% autocrossref %}

Returns the number of connections to other nodes.

{% endautocrossref %}

**Result**

{% autocrossref %}

The number of connections.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet getconnectioncount
~~~

Result:

~~~
14
~~~




#### getdifficulty
{% include helpers/subhead-links.md %}

~~~
getdifficulty
~~~

{% autocrossref %}

Returns the proof-of-work difficulty as a decimal multiple of the minimum difficulty.

{% endautocrossref %}

**Result**

The difficulty number.

**Example**

~~~
> bitcoin-cli -testnet getdifficulty 
~~~

Result:

~~~
1.00000000
~~~



#### getgenerate
{% include helpers/subhead-links.md %}

~~~
getgenerate
~~~

{% autocrossref %}

Return true if the server is set to generate blocks.

{% endautocrossref %}

**Result**

{% autocrossref %}

*True* if the server is set to generate blocks; *false* if not.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet getgenerate
~~~

Result:

~~~
false
~~~




#### gethashespersec
{% include helpers/subhead-links.md %}

~~~
gethashespersec
~~~

{% autocrossref %}

Returns a recent hashes per second performance measurement while generating
blocks.

{% endautocrossref %}

**Result**

{% autocrossref %}

A number of hashes per second.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet gethashespersec                               
~~~

Result:

~~~
1995356
~~~





#### getinfo
{% include helpers/subhead-links.md %}

~~~
getinfo
~~~

{% autocrossref %}

Prints various information about the node and the network.

![Warning icon](/img/icons/icon_warning.svg)
**Warning:** `getinfo` will be removed in a later version of Bitcoin
Core.  Use `getblockchaininfo`, `getnetworkinfo`, or `getwalletinfo`
instead.

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON object containing several key/value pairs, most of them
self-explanatory.  Exceptions are *version* for the node's version, *keypoololdest*
for the oldest pre-generated key in the key pool, and *unlocked_until*
for the epoch time until the wallet becomes locked again (0 for locked
now).

{% endautocrossref %}

~~~
{
  "version": <number>,
  "protocolversion": <number>,
  "walletversion": <number>,
  "balance": <decimal bitcoins>,
  "blocks": <block height>,
  "timeoffset": <seconds>,
  "connections": <number of connections>,
  "proxy": "<host>:<port>",
  "difficulty": <difficulty number>,
  "testnet": <true|false>,
  "keypoololdest": <epoch time>,
  "keypoolsize": <number of unused pre-generated keys>,
  "paytxfee": <decimal bitcoins>,
  "unlocked_until": <epoch time>,
  "errors": [error list, if any]
}
~~~

**Example**

~~~
> bitcoin-cli -testnet getinfo
~~~

Result:

~~~
{
    "version" : 90100,
    "protocolversion" : 70002,
    "walletversion" : 60000,
    "balance" : 0.59960000,
    "blocks" : 240465,
    "timeoffset" : 0,
    "connections" : 22,
    "proxy" : "",
    "difficulty" : 1.00000000,
    "testnet" : true,
    "keypoololdest" : 1398809500,
    "keypoolsize" : 201,
    "paytxfee" : 0.00100000,
    "unlocked_until" : 2399308877,
    "errors" : ""
}
~~~




#### getmininginfo
{% include helpers/subhead-links.md %}

~~~
getmininginfo
~~~

{% autocrossref %}

Get mining-related information.

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON object with key/value pairs describing the current *block's*
height, *currentblocksize* in bytes, *currentblocktx* count, network
*difficulty*, any *errors*, whether or not the node is attempting to
*generate* blocks, the number of processors being used for generation
(*genproclimit*), the number of *hashespersec*, the size of the memory
pool (*pooledtx*), and whether or not the node is on testnet.

{% endautocrossref %}


~~~
{
  "blocks": <block height>,
  "currentblocksize": <number of bytes>,
  "currentblocktx": <number of transactions>,
  "difficulty": <difficulty number>,
  "errors": [error descriptions],
  "generate": <true|false>,
  "genproclimit": <number of processors used>,
  "hashespersec": <hash rate number>,
  "pooledtx": <number of transactions>,
  "testnet": <true|false>
}
~~~

**Example**

~~~
> bitcoin-cli -testnet getmininginfo
~~~

Result:

~~~
{
    "blocks" : 240470,
    "currentblocksize" : 4447,
    "currentblocktx" : 14,
    "difficulty" : 1.00000000,
    "errors" : "",
    "genproclimit" : -1,
    "networkhashps" : 79921644298,
    "pooledtx" : 19,
    "testnet" : true,
    "generate" : false,
    "hashespersec" : 0
}
~~~


#### getnettotals
{% include helpers/subhead-links.md %}

~~~
getnettotals
~~~

{% autocrossref %}

Returns information about network traffic, including bytes in, bytes out,
and current time.

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON object describing the *totalbytesrecv*, *totalbytessent*, and
total number of milliseconds elapsed since 1970-01-01T00:00 UTC.

{% endautocrossref %}

~~~
{
  "totalbytesrecv": <number of bytes>,
  "totalbytessent": <number of bytes>,
  "timemillis": <number of milliseconds since the Unix epoch>
}
~~~

**Example**

~~~
> bitcoin-cli -testnet getnettotals
~~~

Result:

~~~
{
    "totalbytesrecv" : 15445246,
    "totalbytessent" : 59104882,
    "timemillis" : 1399419870758
}
~~~




#### getnetworkhashps
{% include helpers/subhead-links.md %}

~~~
getnetworkhashps [blocks] [height]
~~~

{% autocrossref %}

Returns the estimated current or historical network hashes per second
based on the last n blocks

{% endautocrossref %}

**Argument #1: Number Of Blocks To Average**

{% autocrossref %}

*Number; optional:* the number of blocks to average together for
calculating the estimated hashes per second.  Defaults to 120.  Use -1
to average all blocks produced since the last difficulty change.

{% endautocrossref %}

**Argument #2: Block Height**

{% autocrossref %}

*Number; optional:* the block height of the last block to use for calculating the average.
Defaults to -1 (the most recent block).

{% endautocrossref %}

**Result: Estimated Hashes Per Second**

{% autocrossref %}

*Number:* the estimated hashes per second.

{% endautocrossref %}

**Example**

{% autocrossref %}

Get the average hashes per second for all the blocks since the last
difficult change before block 227255.

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getnetworkhashps -1 227255
~~~

Result:

~~~
79510076167
~~~


#### getnetworkinfo
{% include helpers/subhead-links.md %}

~~~
getnetworkinfo
~~~

{% autocrossref %}

Provides information about the node's connection to the network. *This
RPC was added in Bitcoin Core 0.9.2.*

**Result**

A JSON object containing several key/value pairs: the server *version*,
the *protocol version*, the server's *time offset* from the averaged network time,
how many *connections* it has to other nodes, information about any
*proxy* being used, the smallest *relay fee* per kilobyte this node will accept
in order to relay transactions, and a JSON array of IP *addresses* and
*port* numbers which the node is listening to along with a *score* for
each (with the array with the highest score being the one returned to
peers).

{% endautocrossref %}

~~~
{
  "version": <integer>,
  "protocolversion": <integer>,
  "timeoffset": <integer seconds>,
  "connections": <integer>,
  "proxy": "<host>:<port>",
  "relayfee": <decimal bitcoins>,
  "localaddresses": [
    "address": "<address>",
    "port": <port>,
    "score": <integer>
  ]
}
~~~

**Example**


~~~
bitcoin-cli -testnet getnetworkinfo
~~~

Result:

~~~
{
    "version" : 90200,
    "protocolversion" : 70002,
    "timeoffset" : 0,
    "connections" : 12,
    "proxy" : "",
    "relayfee" : 0.00001000,
    "localaddresses" : [
        {
            "address" : "68.39.150.9",
            "port" : 18333,
            "score" : 65
        }
    ]
}
~~~



#### getnewaddress
{% include helpers/subhead-links.md %}

~~~
getnewaddress [account]
~~~

{% autocrossref %}

Returns a new Bitcoin address for receiving payments. If account is
specified, payments received with the address will be credited to
that account.

{% endautocrossref %}

**Argument: An Account Name**

{% autocrossref %}

*String; optional:* the name of an account with which to associate the
new account.  If the account doesn't exist, it will be created.  If
account isn't specified, the default account ("") will be used.

{% endautocrossref %}

**Result: A New Bitcoin Address**

{% autocrossref %}

A new Bitcoin address is returned.  

{% endautocrossref %}

**Example**

{% autocrossref %}

Create a new address in the "doc test" account:

{% endautocrossref %}

~~~
> /bitcoin-cli -testnet getnewaddress "doc test"
~~~

Result:

~~~
mft61jjkmiEJwJ7Zw3r1h344D6aL1xwhma
~~~




#### getpeerinfo
{% include helpers/subhead-links.md %}

~~~
getpeerinfo
~~~

{% autocrossref %}

Returns data about each connected network node.

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON array of JSON objects, with each object describing a connected
network node.  *Addr* is the node's address and port; *addrlocal* is
your IP address and port as seen by the node; *services* is the services
provided by the node.

*Lastsend* and *lastrecv* describe when you last communicated with the
node; *bytessent* and *bytesrecv* describe the bandwidth used;
*conntime* is when you connected to the node in epoch time; *pingwait*
and *pingtime* describe the ping settings.

*Version* is the node's numeric client version; *subver* is its text
version; *inbound* is whether or not the node connected to you first;
*startingheight* is the node's earliest block.

*Banscore* is the misbehavior number for the node.

<!-- TODOv0.10 reword text when 0.10 is released -->

Bitcoin Core 0.10 will remove the *syncnode* field and replace it with
three new fields: *synced_headers* to indicate the block height of the
highest-height header the local node has in common with the remote
peer; *synced_blocks* to indicate the block height of the highest-height
block the local node has in common with the remote peer; and *inflight*
to indicate the number of blocks the local node has requested from the
remote peer.

<!-- TODOv0.10: update description below when 0.10 is released
REMOVE: syncnode field;  add following fields where syncnode is
    "synced_headers": <block height>,
    "synced_blocks": <block height>,
    "inflight": [
        <block height>,
        [...]
    ]
-->

{% endautocrossref %}

~~~
[
  {
    "addr":"<host>:<port>",
    "addrlocal":"<ip>:<port>",
    "services":"<services>",
    "lastsend": <epoch time>,
    "lastrecv": <epoch time>,
    "bytessent": <number of bytes>,
    "bytesrecv": <number of bytes>,
    "conntime": <epoch time>,
    "pingtime": <seconds>,
    "pingwait": <seconds>,
    "version": <version number>,
    "subver": "/<string>/",
    "inbound": <true|false>,
    "startingheight": <block height>,
    "banscore": <decimal ban score>,
    "syncnode" : <true|false>
  }
  ,[...]
]
~~~

<!-- TODOv0.10 update example to 0.10 when released -->

**Example From Bitcoin Core 0.9.1**

~~~
> bitcoin-cli -testnet getpeerinfo | head -n20
~~~

Result (only first object shown):

~~~
[
    {
        "addr" : "162.216.6.146:18333",
        "addrlocal" : "68.39.150.9:18333",
        "services" : "00000001",
        "lastsend" : 1399423346,
        "lastrecv" : 1399423329,
        "bytessent" : 210597,
        "bytesrecv" : 300962,
        "conntime" : 1399383781,
        "pingtime" : 0.00000000,
        "version" : 70001,
        "subver" : "/Satoshi:0.8.5/",
        "inbound" : false,
        "startingheight" : 240213,
        "banscore" : 0
    },
~~~




#### getrawchangeaddress
{% include helpers/subhead-links.md %}

~~~
getrawchangeaddress
~~~

{% autocrossref %}

Returns a new Bitcoin address, for receiving change. This is for use
with raw transactions, not normal use.

{% endautocrossref %}

**Result**

{% autocrossref %}

The address.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet getrawchangeaddress
~~~

Result:

~~~
mnycUc8FRjJodfKhaj9QBZs2PwxxYoWqaK
~~~






#### getrawmempool
{% include helpers/subhead-links.md %}

~~~
getrawmempool [true|false]
~~~

{% autocrossref %}

Returns all transaction identifiers (txids) in the memory pool as a JSON
array or detailed information each transaction in the memory pool as a
JSON object.

{% endautocrossref %}

**Argument: Detailed JSON Object Or JSON Array Of Txids**

{% autocrossref %}

*Boolean; optional:* for a detailed JSON object describing each
transaction in the memory pool, *true*.  For a JSON array with each txid
as a string, *false* (the default).

{% endautocrossref %}

**Result For *False*: An Array Of Txids**

{% autocrossref %}

A JSON array of txids:

{% endautocrossref %}

~~~
[
  "<txid>"
  ,[...]
]
~~~

**Result For *True*: A JSON Object Describing Each Transaction**

{% autocrossref %}

A JSON object containing a list of JSON objects, with each object's key
being a *txid* and its value being a JSON object containing the
following information: the transaction *size* in bytes, the *fee* paid,
the *time* the transaction entered the pool (in Unix epoch time), the
block *height* when the transaction entered the pool, the *starting
priority* when the transaction entered the pool and its *current
priority*, plus an array of unconfirmed txid's this transaction
*depends* on.

{% endautocrossref %}

~~~
{
  "transactionid" : {
    "size" : <size in bytes>
    "fee" : <fee in decimal bitcoins>
    "time" : <epoch time>
    "height" : <block height>
    "startingpriority" : <priority number when first seen>
    "currentpriority" : <current priority number>
    "depends" : [
        "<txid>",
       [...] ]
  }, [...]
]
~~~

**Examples**

The default (*false*):

~~~
> bitcoin-cli -testnet getrawmempool
~~~

~~~
[
    "2b1f41d6f1837e164d6d6811d3d8dad2e66effbd1058cd9ed7bdbe1cab20ae03",
    "2baa1f49ac9b951fa781c4c95814333a2f3eda71ed3d0245cd76c2829b3ce354"
]
~~~

Verbose output (*true*):

~~~
> bitcoin-cli -testnet getrawmempool
~~~

~~~
{
    "2b1f41d6f1837e164d6d6811d3d8dad2e66effbd1058cd9ed7bdbe1cab20ae03" : {
        "size" : 3176,
        "fee" : 0.00040000,
        "time" : 1398867801,
        "height" : 227310,
        "startingpriority" : 97456429.70512821,
        "currentpriority" : 97456429.70512821,
        "depends" : [
        ]
    },
    "2baa1f49ac9b951fa781c4c95814333a2f3eda71ed3d0245cd76c2829b3ce354" : {
        "size" : 191,
        "fee" : 0.00020000,
        "time" : 1398867772,
        "height" : 227310,
        "startingpriority" : 54545454.54545455,
        "currentpriority" : 54545454.54545455,
        "depends" : [
        ]
    }
}
~~~

#### getrawtransaction
{% include helpers/subhead-links.md %}

~~~
getrawtransaction <txid> [true|false]
~~~

{% autocrossref %}

Get the rawtransaction-format data for a transaction or a JSON object
describing the transaction. By default, `bitcoind` only stores complete
transaction data for UTXOs and your own transactions, so the RPC may
fail on historic transactions unless you use the non-default `txindex=1`
in your `bitcoind` startup settings.

See also: `decoderawtransaction`

{% endautocrossref %}

**Argument #1: The Transaction Txid**

{% autocrossref %}

*String; required:* the txid (hash) of the transaction to get.

{% endautocrossref %}

**Argument #2: Get Hex Or JSON Object**

{% autocrossref %}

*Number; optional:* either *0* (the default) to get the transaction in
rawtransaction format (hex), or *1* to get a JSON object describing the
transaction.

{% endautocrossref %}

**Result: Rawtransaction Hex Or Description In JSON**

{% autocrossref %}

If *0*, a hex string with the complete (signed) transaction as it
appears in the block chain or memory pool.

If *1*, a JSON object describing the transaction.  See
`decoderawtransaction` for a format description.

{% endautocrossref %}

**Examples:**

{% autocrossref %}

A transaction in rawtransaction format:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getrawtransaction \
              ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb01c2cb8e8de481e
~~~

Result: 

~~~
0100000001268a9ad7bfb21d3c086f0ff28f73a064964aa069ebb69a9e437da8\
5c7e55c7d7000000006b483045022100ee69171016b7dd218491faf6e13f53d4\
0d64f4b40123a2de52560feb95de63b902206f23a0919471eaa1e45a0982ed28\
8d374397d30dff541b2dd45a4c3d0041acc0012103a7c1fd1fdec50e1cf3f0cc\
8cb4378cd8e9a2cee8ca9b3118f3db16cbbcf8f326ffffffff0350ac60020000\
00001976a91456847befbd2360df0e35b4e3b77bae48585ae06888ac80969800\
000000001976a9142b14950b8d31620c6cc923c5408a701b1ec0a02088ac002d\
3101000000001976a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac\
00000000
~~~

{% autocrossref %}

Get the same transaction in JSON:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getrawtransaction
            ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb01c2cb8e8de481e \
            1
~~~

Result:

~~~

{
    "hex" : "0100000001268a9ad7bfb21d3c086f0ff28f73a064964aa069e\
             bb69a9e437da85c7e55c7d7000000006b483045022100ee6917\
             1016b7dd218491faf6e13f53d40d64f4b40123a2de52560feb9\
             5de63b902206f23a0919471eaa1e45a0982ed288d374397d30d\
             ff541b2dd45a4c3d0041acc0012103a7c1fd1fdec50e1cf3f0c\
             c8cb4378cd8e9a2cee8ca9b3118f3db16cbbcf8f326ffffffff\
             0350ac6002000000001976a91456847befbd2360df0e35b4e3b\
             77bae48585ae06888ac80969800000000001976a9142b14950b\
             8d31620c6cc923c5408a701b1ec0a02088ac002d31010000000\
             01976a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488\
             ac00000000",
    "txid" : "ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb01c2cb8e8de481e",
    "version" : 1,
    "locktime" : 0,
    "vin" : [
        {
            "txid" : "d7c7557e5ca87d439e9ab6eb69a04a9664a0738ff20f6f083c1db2bfd79a8a26",
            "vout" : 0,
            "scriptSig" : {
                "asm" : "3045022100ee69171016b7dd218491faf6e13f5\
                3d40d64f4b40123a2de52560feb95de63b902206f23a0919\
                471eaa1e45a0982ed288d374397d30dff541b2dd45a4c3d0\
                041acc001 03a7c1fd1fdec50e1cf3f0cc8cb4378cd8e9a2\
                cee8ca9b3118f3db16cbbcf8f326",
                "hex" : "483045022100ee69171016b7dd218491faf6e13\
                f53d40d64f4b40123a2de52560feb95de63b902206f23a09\
                19471eaa1e45a0982ed288d374397d30dff541b2dd45a4c3\
                d0041acc0012103a7c1fd1fdec50e1cf3f0cc8cb4378cd8e\
                9a2cee8ca9b3118f3db16cbbcf8f326"
            },
            "sequence" : 4294967295
        }
    ],
    "vout" : [
        {
            "value" : 0.39890000,
            "n" : 0,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 56847befbd2360df0e35b\
                4e3b77bae48585ae068 OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a91456847befbd2360df0e35b4e3b77bae48585ae06888ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "moQR7i8XM4rSGoNwEsw3h4YEuduuP6mxw7"
                ]
            }
        },
        {
            "value" : 0.10000000,
            "n" : 1,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 2b14950b8d31620c6cc92\
                3c5408a701b1ec0a020 OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a9142b14950b8d31620c6cc923c5408a701b1ec0a02088ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN"
                ]
            }
        },
        {
            "value" : 0.20000000,
            "n" : 2,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 0dfc8bafc8419853b34d5\
                e072ad37d1a5159f584 OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe"
                ]
            }
        }
    ],
    "blockhash" : "00000000103e0091b7d27e5dc744a305108f0c752be249893c749e19c1c82317",
    "confirmations" : 216,
    "time" : 1398734825,
    "blocktime" : 1398734825
}
~~~




#### getreceivedbyaccount
{% include helpers/subhead-links.md %}

~~~
getreceivedbyaccount <account> <confirmations>
~~~

{% autocrossref %}

Returns the total amount received by addresses in a particular account
from transactions with the specified number of confirmations.

{% endautocrossref %}

**Argument #1: The Account Name**

{% autocrossref %}

*String; required:* the name of the account.  Use "" for the default
account.

{% endautocrossref %}

**Argument #2: The Minimum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the Minimum number of confirmations a transaction
must have before it is counted.

{% endautocrossref %}

**Result: Decimal Bitcoins**

{% autocrossref %}

*Number:* the number of satoshis received in decimal bitcoins.

{% endautocrossref %}

**Example**

{% autocrossref %}

Get the satoshis received by the "doc test" account with six or more
confirmations:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getreceivedbyaccount "doc test" 6
~~~

Result:

~~~
0.30000000
~~~


#### getreceivedbyaddress
{% include helpers/subhead-links.md %}

~~~
getreceivedbyaddress <address> [confirmations]
~~~

{% autocrossref %}

Returns the total amount received by the specified address in
transactions with at least the indicated number of confirmations.

{% endautocrossref %}

**Argument #1: A Bitcoin Address**

{% autocrossref %}

*String; required:* a Bitcoin address to check.  Must be an address 
belonging to the wallet.

{% endautocrossref %}

**Argument #2: The Minimum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations a transaction
must have before it is counted towards the total.  1 is the default; use
0 to also count unconfirmed transactions.

{% endautocrossref %}

**Result: The Number Of Decimal Bitcoins Received**

{% autocrossref %}

The number of decimal bitcoins received by the address. 

{% endautocrossref %}

**Example**

{% autocrossref %}

Get the amount of satoshis received by the following address with at
least six confirmations.

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getreceivedbyaddress mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN 6
~~~

Result:

~~~
0.30000000
~~~



#### gettransaction
{% include helpers/subhead-links.md %}

~~~
gettransaction <txid>
~~~

{% autocrossref %}

Get detailed information about an in-wallet transaction.

{% endautocrossref %}

**Argument: A Transaction Identifier (txid)**

{% autocrossref %}

*String; required:* a transaction identifier (txid) for the transaction
to get information about.

{% endautocrossref %}

**Result: A Description Of The Transaction**

{% autocrossref %}

*String:* a JSON object describing the transaction: the *amount* of the
transaction in decimal bitcoins, the number of *confirmations* the
transaction has, the *blockhash* (if any) the transaction appeared in
and also that block's height (*blockindex*) and *blocktime*, the *txid*
(same as you provided), and an array of *details* about each input and
output in the transaction.

The *details* array includes the *account* the transaction belongs to
("" for the default account), the *address* used in the input or output,
the *category* (input or output), and the *amount* of the particular
input or output.

Last is the rawtransaction format *hex* of the transaction.

{% endautocrossref %}

~~~
{
  "amount" : <decimal bitcoins>,
  "confirmations" : <number>,
  "blockhash" : "<hash>",
  "blockindex" : <block height>,
  "blocktime" : <epoch time>,
  "txid" : "<txid>",
  "time" : <epoch time>,
  "timereceived" : <epoch time>,
  "details" : [
    {
      "account" : "<account>",
      "address" : "<address>",
      "category" : "<send|receive>",
      "amount" : <decimal bitcoins>
    }
    ,[...]
  ],
  "hex" : "<raw transaction hex>"
}
~~~

**Example**

~~~
> bitcoin-cli -testnet gettransaction \
            5a7d24cd665108c66b2d56146f244932edae4e2376b561b3d396d5ae017b9589
~~~

Result:

~~~
{
    "amount" : 0.00000000,
    "fee" : 0.00000000,
    "confirmations" : 18707,
    "blockhash" : "000000008b630b3aae99b6fe215548168bed92167c47a2f7ad4df41e571bcb51",
    "blockindex" : 1,
    "blocktime" : 1396321351,
    "txid" : "5a7d24cd665108c66b2d56146f244932edae4e2376b561b3d396d5ae017b9589",
    "walletconflicts" : [
    ],
    "time" : 1396318587,
    "timereceived" : 1396318587,
    "details" : [
        {
            "account" : "",
            "address" : "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN",
            "category" : "send",
            "amount" : -0.10000000,
            "fee" : 0.00000000
        },
        {
            "account" : "doc test",
            "address" : "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN",
            "category" : "receive",
            "amount" : 0.10000000
        }
    ],
    "hex" : "0100000001cde58f2e37d000eabbb60d9cf0b79ddf67cede6db\
             a58732539983fa341dd5e6c010000006a47304402201feaf129\
             08260f666ab369bb8753cdc12f78d0c8bdfdef997da17acff50\
             2d321022049ba0b80945a7192e631c03bafd5c6dc3c7cb35ac5\
             c1c0ffb9e22fec86dd311c01210321eeeb46fd878ce8e62d5e0\
             f408a0eab41d7c3a7872dc836ce360439536e423dffffffff01\
             80969800000000001976a9142b14950b8d31620c6cc923c5408\
             a701b1ec0a02088ac00000000"
}
~~~




#### gettxout
{% include helpers/subhead-links.md %}

~~~
gettxout <txid> <output index number> [true|false]
~~~

{% autocrossref %}

Returns details about an unspent transaction output (UTXO).

{% endautocrossref %}

**Argument #1:** A Transaction Identifier (txid)

{% autocrossref %}

*String; required:* the txid of the transaction the UTXO belongs to.

{% endautocrossref %}

**Argument #2:** An Output Index Number

{% autocrossref %}

*Number; required:* the output index number (vout) of the UTXO.

{% endautocrossref %}

**Argument #3:** Whether To Display Outputs From The Memory Pool

{% autocrossref %}

*Boolean; optional:* display UTXOs from the memory pool with *true*, or
only to display UTXOs on the block chain with *false* (the default).

{% endautocrossref %}

**Result: A Description Of The Output**

{% autocrossref %}

*String:* A JSON object describing the output, with *bestblock*
providing the header hash of the block which includes the UTXO (if any),
the number of *confirmations* the UTXO has, the *value* of the output in
decimal bitcoins, and a JSON object describing the pubkey script,
including the script in script psuedocode (*asm*), the script in *hex*,
the number of *required signatures*, the *type* of pubkey script, and
the *addresses* it references (if known).  Also provided are the
UTXO's transaction *version* number and whether or not it's a *coinbase*
transaction.

{% endautocrossref %}

~~~
{
  "bestblock" : "<hash>",
  "confirmations" : <number>,
  "value" : <decimal bitcoins>,
  "scriptPubKey" : {
     "asm" : "<psuedo code>",
     "hex" : "<rawtransaction hex>",
     "reqSigs" : <number>,
     "type" : "<type>",
     "addresses" : [
        "<address>"
        ,[...]
     ]
  },
  "version" : <number>,
  "coinbase" : <true|false>
}
~~~

**Example**

{% autocrossref %}

Get the UTXO from the following transaction from the third output index ("2"),
searching the memory pool if necessary.

{% endautocrossref %}

~~~
> bitcoin-cli -testnet gettxout \
              ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb01c2cb8e8de481e \
              2 true
~~~

Result:

~~~
{
    "bestblock" : "0000000020183137a80225af8ee2a523220af75c96e06b63f9dcd7eb7b059688",
    "confirmations" : 240,
    "value" : 0.20000000,
    "scriptPubKey" : {
        "asm" : "OP_DUP OP_HASH160 \
        0dfc8bafc8419853b34d5e072ad37d1a5159f584 OP_EQUALVERIFY OP_CHECKSIG",
        "hex" : "76a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac",
        "reqSigs" : 1,
        "type" : "pubkeyhash",
        "addresses" : [
            "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe"
        ]
    },
    "version" : 1,
    "coinbase" : false
}
~~~




#### gettxoutsetinfo
{% include helpers/subhead-links.md %}

~~~
gettxoutsetinfo
~~~

{% autocrossref %}

Returns statistics about the unspent transaction output set.
Note this call may take some time.

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON object with key/value pairs describing the UTXO set: *height* is
the current block height; *bestblock* is the hash of the most recent
block; *transactions* is the number of transactions with *UTXOs*;
*txouts* is the number of UTXOs; *bytes_serialized* in the size of the
UTXO set in bytes;  *hash_serialized* is the hash of the complete UTXO set;
*total_amount* is the total amount of decimal bitcoins in the UTXO set.

{% endautocrossref %}

~~~
{
  "height":<block height>,
  "bestblock": <block header hash>,
  "transactions": <number>,
  "txouts": <number>,
  "bytes_serialized": <number of bytes>,
  "hash_serialized": <hash>,
  "total_amount": <decimal bitcoins>
}
~~~

**Example**

~~~
> bitcoin-cli -testnet gettxoutsetinfo
~~~

Result:

~~~
{
    "height" : 240479,
    "bestblock" : "0000000000e8801ce010028a8a614e8f593db9b156ac54369b478c74f8005ee4",
    "transactions" : 371826,
    "txouts" : 2273512,
    "bytes_serialized" : 75018402,
    "hash_serialized" : "9aa9969c8d87c9c25aff0ac3b09a2fcdba25408d87444adce7ed30497276014b",
    "total_amount" : 11261448.49446353
}
~~~




#### getunconfirmedbalance
{% include helpers/subhead-links.md %}

~~~
getunconfirmedbalance
~~~

{% autocrossref %}

Returns the wallet's total unconfirmed balance

{% endautocrossref %}

**Result**

{% autocrossref %}

The unconfirmed balance in decimal bitcoins.

{% endautocrossref %}

**Example**

~~~
> bitcoin-cli -testnet getunconfirmedbalance                         
~~~

Result (no satoshis unconfirmed):

~~~
0.00000000
~~~


#### getwalletinfo
{% include helpers/subhead-links.md %}

~~~
getwalletinfo
~~~

{% autocrossref %}

Provides information about the wallet. *This RPC was added in Bitcoin
Core 0.9.2.*

**Result**

A JSON object containing several key/value pairs: the *walletversion*
number, the current wallet's *balance* (the same as `getbalance`), the
number of transactions made by this wallet (*txcount*), the oldest
pre-generated key in the keypool (*keypoololdest*), the number of keys
in the keypool which have not received a transaction (*keypoolsize*),
the time in seconds since 1 January 1970 (epoch time) when an encrypted wallet
will become locked or 0 if the wallet is currently locked
(*unlocked_until*)---see `walletpassphrase`.

{% endautocrossref %}

~~~
{
    "walletversion" : <integer>,
    "balance" : <decimal bitcoins>,
    "txcount" : <integer>,
    "keypoololdest" : <epoch date>,
    "keypoolsize" : <integer>,
    "unlocked_until" : <epoch date>
}
~~~

**Example**

~~~
bitcoin-cli -testnet getwalletinfo
~~~

Result:

~~~
{
    "walletversion" : 60000,
    "balance" : 1.45060000,
    "txcount" : 17,
    "keypoololdest" : 1398809500,
    "keypoolsize" : 196,
    "unlocked_until" : 0
}
~~~


#### getwork
{% include helpers/subhead-links.md %}

~~~
getwork [data]
~~~

{% autocrossref %}

Provides a block header which can be hashed to attempt to find the next
block, and lets a miner return a successful header.

<!-- TODOv0.10: reword warning when 0.10 is released -->

![Warning icon](/img/icon_warning.svg)
**Warning:** `getwork` will be removed in Bitcoin Core 0.10. Use
the `getblocktemplate` RPC instead.

{% endautocrossref %}

**Argument: A Header Hash**

{% autocrossref %}

*String; optional:* if header data is provided, it will be checked to
see if it meets the target threshold (difficulty) and then affixed to a
block of transactions (which produces a matching merkle root).  Then the
complete block will be broadcast to the network.  Data is in the same
format as provided by the *data* output parameter (see below).

{% endautocrossref %}

**Result #1: Hashing Data**

{% autocrossref %}

*String:* A JSON object with four key/value pairs is returned.  *data*
is the block data used by mining software and *target* is the hash
target either for the network or for the mining pool.  The other two
parameters, *midstate* and *hash1*, are deprecated.

{% endautocrossref %}

~~~
{
  "midstate" : "<hash>",
  "data" : "<hex data>",
  "hash1" : "<hex data>",
  "target" : "<target hex>"
}
~~~

**Result #2: Whether The Block Was Accepted**

{% autocrossref %}

*Boolean:* either *true* or *false* depending on whether or not the data
was accepted.

{% endautocrossref %}

**Examples**

Get work:

~~~
> bitcoin-cli -testnet getwork
~~~

Result:

~~~
{
    "midstate" : "c9c4c5ce837b181be3c8f1de27657eeadba9d4860be9b8f82db0b6c061e2d9da",
    "data" : "000000026d49c668f433f5ed3e0c8357466f0416818f7aa29b\
              c8d8d8d158d63b000000007cf7260312d8d5bfc098d066d600\
              62c09776c9595521aeb6eb2c552f7174df0a536158061b0196\
              8c000000000000008000000000000000000000000000000000\
              00000000000000000000000000000000000000000000000080\
              020000",
    "hash1" : "0000000000000000000000000000000000000000000000000\
               0000000000000000000008000000000000000000000000000\
               000000000000000000000000010000",
    "target" : "000000000000000000000000000000000000000000000000\
                8c96010000000000"
}
~~~

{% autocrossref %}

Submit data:  (we'll submit the data we just received, which is highly
unlikely to hash to a value below the target threshold)

{% endautocrossref %}

~~~
> bitcoin-cli -testnet getwork 000000026d49c668f433f5ed3e0c8357466\
            f0416818f7aa29bc8d8d8d158d63b000000007cf7260312d8d5b\
            fc098d066d60062c09776c9595521aeb6eb2c552f7174df0a536\
            158061b01968c000000000000008000000000000000000000000\
            0000000000000000000000000000000000000000000000000000\
            0000080020000
~~~

Result:

~~~
false
~~~





