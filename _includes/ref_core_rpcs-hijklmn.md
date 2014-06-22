#### help

~~~
help [RPC]
~~~

{% autocrossref %}

List all commands, or get help for the specified RPC.

{% endautocrossref %}

**Argument: An RPC**

{% autocrossref %}

*String, optional:* get detailed help for the specified RPC.

{% endautocrossref %}

**Result: A List Of RPCs Or Detailed Help**

{% autocrossref %}

If an RPC was specified, detailed help for that RPC.  If nothing
specified, a list of available RPCs.

{% endautocrossref %}

**Example**

{% autocrossref %}

Command to get a description similar to this subsection:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet help help
~~~

#### importprivkey

~~~
importprivkey <private key> [label] [rescan]
~~~

{% autocrossref %}

Adds a private key (in the format created by `dumpprivkey` to your wallet.

{% endautocrossref %}

**Argument #1: Private Key**

{% autocrossref %}

*String; required:* a private key in the hexadecimal format created by
`dumpprivkey`.

{% endautocrossref %}

**Argument #2: Label**

{% autocrossref %}

*String; optional:* the name to associate with the address corresponding
to the private key.  Defaults to no label.

{% endautocrossref %}

**Argument #3: Whether To Rescan The Block Chain**

{% autocrossref %}

*Boolean; optional:* whether or not to rescan the saved block chain data
for transactions related to this private key.  If true, scans the block
chain (which may take a while); if false, only show transactions related
to this key from the UTXO set.  The default is true.

{% endautocrossref %}

**Result: None On Success**

{% autocrossref %}

No result generated if key imported successfully.

{% endautocrossref %}

**Example**

{% autocrossref %}

Import the private key for the address
mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe, giving it a label and scanning the
entire block chain:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet importprivkey \
              cU8Q2jGeX3GNKNa5etiC8mgEgFSeVUTRQfWE2ZCzszyqYNK4Mepy \
              "test label" \
              true
~~~

(Success: no result generated.)

#### importwallet

~~~
importwallet <filename>
~~~

{% autocrossref %}

Imports private keys from a file in wallet dump file format (see
`dumpwallet`). These keys will be added to the keys currently in
the wallet.

{% endautocrossref %}

**Argument: The Filename**

{% autocrossref %}

*String; required:* the filename of the wallet file relative to the
working directory of `bitcoind`.

{% endautocrossref %}

**Result: None On Success**

{% autocrossref %}

No result generate on successful import.

{% endautocrossref %}

**Example**

{% autocrossref %}

Import the file shown in the example subsection of `dumpwallet`.

{% endautocrossref %}

~~~
> bitcoin-cli -testnet importwallet /tmp/dump.txt
~~~

(Success: no result generated.)





#### keypoolrefill

~~~
keypoolrefill [size]
~~~

{% autocrossref %}

Fills the cache of unused pre-generated keys, the keypool.   Requires
the wallet be unlocked if encryption is used.

{% endautocrossref %}

**Argument: New Keypool Size**

{% autocrossref %}

*Number; optional:* the number of keys which should be in the keypool
after generating new cache keys.  Defaults to 100.

{% endautocrossref %}

**Result: None On Success**

{% autocrossref %}

No result generated on success.

{% endautocrossref %}

**Example**

{% autocrossref %}

Generate one extra key than the default:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet keypoolrefill 101
~~~


#### listaccounts

~~~
listaccounts [minconf]
~~~

{% autocrossref %}

Provides a JSON object which lists accounts and their balances.

{% endautocrossref %}

**Argument: Minimum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations an incoming
transaction must have before it is counted towards the balance. Outgoing
transactions are counted regardless of the number of confirmations.
Default is 1; use 0 to count unconfirmed transactions.

{% endautocrossref %}

**Result: A JSON Object With Paired Account/Balance Values**

{% autocrossref %}

A JSON object is produced which lists every account name and its
corresponding value in decimal bitcoins.  "" is the default account.
Balance can be negative if transaction fees paid by this account exceed
satoshis received.

{% endautocrossref %}

    ~~~
    {
      "<account>": <balance in decimal bitcoins>,
      [...]
    }
    ~~~

**Example**

~~~
> bitcoin-cli -testnet listaccounts
~~~

Result:

~~~
{
    "" : -1.40010000,
    "Refund from example.com" : 0.00000000,
    "doc test" : 0.30000000,
    "test" : 0.00000000,
    "test account" : 0.00000000,
    "test label" : 0.29960000,
    "test1" : 1.69900000
}
~~~



#### listaddressgroupings

~~~
listaddressgroupings
~~~

{% autocrossref %}

Lists groups of addresses which have had their common ownership
made public by common use as inputs or as the resulting change
in past transactions.

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON array of JSON arrays of JSON arrays, with the inner array
listing *address*, *amount*, and *account* tuples.  The middle array
shows which of the tuples are associated with each other.  The outer 
array simply stores the results.

{% endautocrossref %}

~~~
[
  [
    [
      "<address>",
      <amount in decimal bitcoins>,
      "<account>"
    ]
    ,...
  ]
  ,...
]
~~~

**Example**

~~~
> bitcoin-cli -testnet listaddressgroupings
~~~

Result (truncated):

~~~
[
    [
        [
            "mgKgzJ7HR64CrB3zm1B4FUUCLtaSqUKfDb",
            0.00000000
        ],
        [
            "mnUbTmdAFD5EAg3348Ejmonub7JcWtrMck",
            0.00000000,
            "test1"
        ],
        [
            "myNrzM1Dda4t1q4UEqwuRosapCbBA8z61o",
            0.00000000
        ],
        [
            "moQR7i8XM4rSGoNwEsw3h4YEuduuP6mxw7",
            0.00000000
        ],
        [
            "mpHeUC7RGRaypfcLNGNrGgfkT872WnKasb",
            0.00000000
        ]
    ],
~~~



#### listlockunspent

~~~
listlockunspent
~~~

{% autocrossref %}

Returns list of temporarily unspendable outputs.

See also: `lockunspent`

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON array of JSON objects, with each object listing a locked *txid*
and output index number (*vout*).

{% endautocrossref %}

~~~
[
  {
    "txid" : "<txid>",
    "vout" : <output index number>
  }
  ,[...]
]
~~~

**Example**

~~~
> bitcoin-cli -testnet listlockunspent
~~~

Result:

~~~
[
    {
        "txid" : "ca7cb6a5ffcc2f21036879493db4530c0ce9b5bff9648f9a3be46e2dfc8e0166",
        "vout" : 0
    }
]
~~~




#### listreceivedbyaccount

~~~
listreceivedbyaccount [confirmations] [true|false]
~~~

{% autocrossref %}

List the total number of bitcoins received by each account.

{% endautocrossref %}

**Argument #1: Minimum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations an incoming
transaction must have before it is counted towards the balance. Outgoing
transactions are counted regardless of the number of confirmations.
Default is 1; use 0 to count unconfirmed transactions.

{% endautocrossref %}

**Argument #2: Whether To Include Empty Accounts**

{% autocrossref %}

*Boolean; optional:* whether or not accounts which have not received a
payment should be included in the results.  Defaults to *true* to
display all accounts.

{% endautocrossref %}

**Result: Account Names, Balances, And Minimum Confirmations**

{% autocrossref %}

A JSON array of JSON objects, with each object containing an *account*
name, an *amount* in decimal bitcoins, and the *confirmation* score of the
transaction most recently received by that account.

{% endautocrossref %}

~~~
[
  {
    "account" : "<account>",
    "amount" : <decimal bitcoins>,
    "confirmations" : <number of confirmations>
  }
  ,[...]
]
~~~

**Example**

{% autocrossref %}

Get the balances for all non-empty accounts, including only transactions
which have been confirmed at least six times:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet listreceivedbyaccount 6 false
~~~

Result:

~~~
[
    {
        "account" : "",
        "amount" : 0.19960000,
        "confirmations" : 53601
    },
    {
        "account" : "doc test",
        "amount" : 0.30000000,
        "confirmations" : 8991
    }
]
~~~

#### listreceivedbyaddress

~~~
listreceivedbyaddress [confirmations] [true|false]
~~~

{% autocrossref %}

List the total number of bitcoins received by each account.

{% endautocrossref %}

**Argument #1: Minimum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations an incoming
transaction must have before it is counted towards the balance. Outgoing
transactions are counted regardless of the number of confirmations.
Default is 1; use 0 to count unconfirmed transactions.

{% endautocrossref %}

**Argument #2: Whether To Include Empty Accounts**

{% autocrossref %}

*Boolean; optional:* whether or not addresses which have not received a
payment should be included in the results. Defaults to *false* to display
only addresses which have received payment.

{% endautocrossref %}

**Result: Addresses, Account Names, Balances, And Minimum Confirmations**

{% autocrossref %}

A JSON array of JSON objects, with each object containing an *address*,
the *account* that address belongs to, an *amount* in decimal bitcoins,
and the *confirmation* score of the transaction most recently received
by that address. Also provided is a *txids* JSON array of txids
affecting that address.

{% endautocrossref %}

~~~
[
  {
    "address" : "<address>",
    "account" : "<account>",
    "amount" : <amount in decimal bitcoins>,
    "confirmations" : <number of confirmations>
    [
        "txids" : [
            "<txid>",
            [...]
    ]
  }
  ,[...]
]
~~~

**Example**

List addresses with balances confirmed by at least six blocks:

~~~
> bitcoin-cli -testnet listreceivedbyaddress 6
~~~

Result (truncated after first entry):

~~~
[
    {
        "address" : "mnUbTmdAFD5EAg3348Ejmonub7JcWtrMck",
        "account" : "test1",
        "amount" : 1.99900000,
        "confirmations" : 55680,
        "txids" : [
            "4d71a6127796766c39270881c779b6e05183f2bf35589261e9572436356f287f",
            "997115d0cf7b83ed332e6c1f2e8c44f803c95ea43490c84ce3e9ede4b2e1605f"
        ]
    },
[...]
~~~

#### listsinceblock

~~~
listsinceblock [block hash] [confirmations]
~~~

{% autocrossref %}

Get all transactions affecting addresses in the wallet 
which have occurred since a particular block.

{% endautocrossref %}

**Argument #1: Block Hash** 

{% autocrossref %}

*String; optional:* the hash of a block header from which all
subsequent transactions should be listed.  If omitted, all transactions
affecting addresses in this wallet which have occurred since the genesis
block will be listed.

{% endautocrossref %}

**Argument #2: Minimum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations an incoming
transaction must have before it is displayed.  Default is 1.

{% endautocrossref %}

**Result**

{% autocrossref %}

A JSON object containing a *transactions* JSON array, with each JSON
object in the array describing a single transaction: the name of the
*account* the transaction affects (with "" for the default account), the
Bitcoin *address* (not present for transactions between address in this
wallet), the *category* of transaction (either send or receive), the
*amount* of the transaction in decimal bitcoins (negative for sends),
the *fee*, the number of *confirmations*, the *blockhash* and
*blocktime* of the block the transaction appears in, the *blockindex*
number indicating what number it was in the block (counting from one),
the *txid*, the *time* and *timereceived* of the transaction, plus a
*comment* and *to* (label) for the transaction, if set.

Outside of the array, a *lastblock* value stores the last block hash
used in the data set.

{% endautocrossref %}

~~~
{
  "transactions": [
    "account":"<account>",
    "address":"<address>",
    "category":"<send|receive>",
    "amount": <amount in decimal bitcoins>,
    "fee": <amount in decimal bitcoins>,
    "confirmations": <confirmations>,
    "blockhash": "<hash>",
    "blockindex": <block index number>,
    "blocktime": <epoch time>,
    "txid": "<txid>",
    "time": <epoch time>,
    "timereceived": <epoch time>,
    "comment": "<comment>",
    "to": "<label>",
  ],
  "lastblock": "<hash>"
}
~~~

**Example**

{% autocrossref %}

Get all transactions with at least six confirmations since a
particular block:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet listsinceblock \
              00000000688633a503f69818a70eac281302e9189b1bb57a76a05c329fcda718 \
              6
~~~

Result (some array objects removed):

~~~
{
    "transactions" : [
        {
            "account" : "test1",
            "address" : "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN",
            "category" : "send",
            "amount" : -0.10000000,
            "fee" : 0.00000000,
            "confirmations" : 9213,
            "blockhash" : "00000000103e0091b7d27e5dc744a305108f0c752be249893c749e19c1c82317",
            "blockindex" : 2,
            "blocktime" : 1398734825,
            "txid" : "ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb01c2cb8e8de481e",
            "walletconflicts" : [
            ],
            "time" : 1398730842,
            "timereceived" : 1398730842,
            "comment" : "Example Transaction"
        }
    ],
    "lastblock" : "00000000008e6ace6bf932022929da3dcdcdfcdad23503cb3007a041c7c89eb6"
}
~~~

#### listtransactions

~~~
listtransactions [account] [count] [from]
~~~

{% autocrossref %}

Returns the most recent transactions.

{% endautocrossref %}

**Argument #1: An Account**

{% autocrossref %}

*String; optional:* get transactions only for this account.  Use "" for
the default account.  By default, gets all transactions for all
accounts.

{% endautocrossref %}

**Argument #2: The Number Of Transactions To Get**

{% autocrossref %}

*Number; optional:* get only this number of the most recent
transactions.  Defaults to 10.

{% endautocrossref %}

**Argument #3: The Number Of Transactions To Skip**

{% autocrossref %}

*Number; optional:* skip the earliest *number* of transactions.
Defaults to zero (don't skip any transactions).

{% endautocrossref %}

**Result: Transaction Details**

{% autocrossref %}

Returns a JSON array with JSON objects in the same format as `listsinceblock`.

{% endautocrossref %}

**Example**

{% autocrossref %}

List the most recent nine transactions for the default account, skipping
the first eight:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet listtransactions "" 9 8
~~~

Result:

~~~
[
    {
        "account" : "",
        "address" : "mnUbTmdAFD5EAg3348Ejmonub7JcWtrMck",
        "category" : "send",
        "amount" : -0.99900000,
        "fee" : -0.00100000,
        "confirmations" : 55935,
        "blockhash" : "000000000036f608beb8e7c8250098f18c66e2a8dbe14e1232d36452430ad97f",
        "blockindex" : 1,
        "blocktime" : 1391826572,
        "txid" : "997115d0cf7b83ed332e6c1f2e8c44f803c95ea43490c84ce3e9ede4b2e1605f",
        "walletconflicts" : [
        ],
        "time" : 1391740136,
        "timereceived" : 1391740136
    }
]
~~~




#### listunspent

~~~
listunspent [minconf] [maxconf] [addresses]
~~~

{% autocrossref %}

Returns an array of unspent transaction outputs.

{% endautocrossref %}

**Argument #1: Minimum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations an incoming
transaction must have before it is counted towards the balance. Spent
UTXOs are not included regardless of the number of confirmations.
Default is 1; use 0 to count unconfirmed transactions.

{% endautocrossref %}

**Argument #2: Maximum Number Of Confirmations**

{% autocrossref %}

*Number; optional:* the maximum number of confirmations an incoming
transaction may have to be included in the results. Default is
9,999,999; use 0 to count unconfirmed transactions.

{% endautocrossref %}

**Argument #3: An Array Of Addresses To Check**

{% autocrossref %}

*String; optional:* A JSON array of addresses to check.  Only UTXOs
affecting these addresses will returned.

{% endautocrossref %}

~~~
[
  "<address>"
  ,[...]
]
~~~

**Result: An Array Describing Each UTXO**

{% autocrossref %}

A JSON array with a list of JSON objects, each object describing a
single transaction: its *txid*, output index number (*vout*), *address*,
the *account* that address belongs to, the unsigned scriptSig
(*scriptPubKey*) to spend it, the *amount* in decimal bitcoins, and the
number of *confirmations* the transactions has.

{% endautocrossref %}

~~~
[
  {
    "txid" : "<txid>",
    "vout" : <output index number>,
    "address" : "<address>",
    "account" : "<account>",
    "scriptPubKey" : "<key>",
    "amount" : <amount in decimal bitcoins>,
    "confirmations" : <number>
  }
  ,[...]
]
~~~

**Example**

{% autocrossref %}

Get all transactions confirmed at least 6 times for a particular
address:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet listunspent 6 99999999 '''
  [
    "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe"
  ]
'''
~~~

Result:

~~~
[
    {
        "txid" : "6c5edd41a33f9839257358ba6ddece67df9db7f09c0db6bbea00d0372e8fe5cd",
        "vout" : 0,
        "address" : "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe",
        "account" : "test label",
        "scriptPubKey" : "76a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac",
        "amount" : 0.09960000,
        "confirmations" : 28332
    },
    {
        "txid" : "ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb01c2cb8e8de481e",
        "vout" : 2,
        "address" : "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe",
        "account" : "test label",
        "scriptPubKey" : "76a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac",
        "amount" : 0.20000000,
        "confirmations" : 9524
    }
]
~~~




#### lockunspent

~~~
lockunspent <true|false> <outputs>
~~~

{% autocrossref %}

Updates list of temporarily unspendable outputs.

Temporarily lock or unlock specified transaction outputs. A locked
transaction output will not be chosen by automatic coin selection when
spending bitcoins. Locks are stored in memory only, so nodes start with
zero locked outputs and the locked output list is always cleared when a
node stops or fails.

{% endautocrossref %}

**Argument #1: Lock (True) Or Unlock (False)**

{% autocrossref %}

*Boolean; required:* whether to lock (*true*) or unlock (*false*) the
outputs.

{% endautocrossref %}

**Argument #2: The Outputs To Lock Or Unlock**

{% autocrossref %}

*String; required:* A JSON array of JSON objects.  Each object has a
transaction identifier (*txid*) and output index number (*vout*) for the
output to lock or unlock.

{% endautocrossref %}

~~~
[
  {
    "txid":"<transaction identifier (hash)>",
    "vout": <output index number>
  }
  ,...
]
~~~

**Result**

{% autocrossref %}

*Boolean:* true if the command was successful; false if it was not.

{% endautocrossref %}

**Example**

{% autocrossref %}

Lock two outputs:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet lockunspent true '''
  [ 
    { 
      "txid": "5a7d24cd665108c66b2d56146f244932edae4e2376b561b3d396d5ae017b9589",
      "vout": 0 
    }, 
    { 
      "txid": "6c5edd41a33f9839257358ba6ddece67df9db7f09c0db6bbea00d0372e8fe5cd", 
      "vout": 0 
    } 
  ]
'''
~~~

Result: 

~~~
true
~~~

{% autocrossref %}

Unlock one of the above outputs:

{% endautocrossref %}


~~~
> bitcoin-cli -testnet lockunspent false '''
[ 
  { 
    "txid": "5a7d24cd665108c66b2d56146f244932edae4e2376b561b3d396d5ae017b9589",
    "vout": 0
  } 
]
'''
~~~

Result:

~~~
true
~~~




#### move

~~~
move <account> <account> <amount> [minconf] [comment]
~~~

{% autocrossref %}

Move a specified amount from one account in your wallet to another.

{% endautocrossref %}

**Argument #1: From Account**

{% autocrossref %}

*String, required:* the name of the account from which to move the
funds.  Use "" for the default account.

{% endautocrossref %}

**Argument #2: To Account**

{% autocrossref %}

*String, required:* the name of the account to which the funds should be
moved.  Use "" for the default account.

{% endautocrossref %}

**Argument #3: Amount To Move**

{% autocrossref %}

*Number; required:* the amount to move in decimal bitcoins.

{% endautocrossref %}

**Argument #4: Minimum Confirmations**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations an incoming
transaction must have before it will be spent. Previously spent UTXOs
are not included regardless of the number of confirmations. Default is
1; use 0 to spend unconfirmed transactions.

{% endautocrossref %}


**Argument #5: A Comment**

{% autocrossref %}

*String; optional:* a comment to associate with this transaction.

{% endautocrossref %}

**Result: True Or False**

{% autocrossref %}

True if the transaction is successfully broadcast.

{% endautocrossref %}

**Example**

{% autocrossref %}

Move 0.1 bitcoins from "doc test" to "test1" using only transactions
with a confirmation of 6 or higher, and giving the transaction the
comment "Example move":

{% endautocrossref %}

~~~
> bitcoin-cli -testnet move "doc test" "test1" 0.1 6 "Example move"
~~~

Result:

~~~
true
~~~


