#### ping

~~~
ping
~~~

{% autocrossref %}

Requests that a ping be sent to all other nodes, to measure ping time.
Results provided in `getpeerinfo` pingtime and pingwait fields as
decimal seconds. Ping command is handled in queue with all other
commands, so it measures processing backlog, not just network ping.

{% endautocrossref %}

**Example**

~~~
bitcoin-cli -testnet ping
~~~

(Success: no result printed.)


#### sendfrom

~~~
sendfrom <account> <address> <amount> [confirmations] [comment] [label]
~~~

{% autocrossref %}

Spend an amount from an account to a bitcoin address.

{% endautocrossref %}

**Argument #1: From Account**

{% autocrossref %}

*String, required:* the name of the account from which to spend the
funds.  Use "" for the default account.

{% endautocrossref %}

**Argument #2: To Address**

{% autocrossref %}

*String, required:* the address to which the funds should be
spent.  Use "" for the default account.

{% endautocrossref %}

**Argument #3: Amount To Spend**

{% autocrossref %}

*Number; required:* the amount to spend in decimal bitcoins.

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

**Argument #6: A Label**

{% autocrossref %}

*String; optional:* the label (name) to give the recipient.

{% endautocrossref %}

**Result: TXID**

{% autocrossref %}

A txid for the transaction created.

{% endautocrossref %}

**Example**

{% autocrossref %}

Spend 0.1 bitcoins from the account "doc test" to the address indicated below
using only UTXOs with at least six confirmations, giving the
transaction the comment "Example spend" and labeling the spender
"Example.com":

{% endautocrossref %}

~~~
bitcoin-cli -testnet sendfrom "doc test" \
            mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe \
            0.1 \
            6 \
            "Example spend" \
            "Example.com"
~~~

Result:

~~~
ca7cb6a5ffcc2f21036879493db4530c0ce9b5bff9648f9a3be46e2dfc8e0166
~~~





#### sendmany

~~~
sendmany <account> <addresses & amounts> [confirmations] [memo]
~~~

{% autocrossref %}

Create and broadcast a transaction which spends outputs to multiple addresses.

{% endautocrossref %}

**Argument #1: Account From Which The Satoshis Should Be Sent**

{% autocrossref %}

*String; required:* the wallet account from which the funds should be
withdrawn.  Can be "" for the default account.

{% endautocrossref %}

**Argument #2: The Output Address/Amount Pairs**

{% autocrossref %}

*String; required:* a JSON object with addresses as keys and amounts as values.

{% endautocrossref %}

~~~
{
  "<address>":<amount in decimal bitcoins>
  ,[...]
}
~~~

**Argument #3: The Minimum Number Of Confirmations For Inputs**

{% autocrossref %}

*Number; optional:* the minimum number of confirmations an previously-received
output must have before it will be spent.  The default is 1
confirmation.

{% endautocrossref %}

**Argument #4: A Memo**

{% autocrossref %}

*String, optional:* a memo to be recorded with this transaction for
record-keeping purposes.  The memo is not included in the transaction.

{% endautocrossref %}

**Result: A Transaction Identifier**

{% autocrossref %}

*String:* a transaction identifier (txid) for the transaction created
and broadcast to the peer-to-peer network.  

{% endautocrossref %}

**Example**

{% autocrossref %}

From the account *test1*, send 0.1 bitcoins to the first address and 0.2
bitcoins to the second address, with a memo of "Example Transaction".

{% endautocrossref %}

~~~
> bitcoin-cli -testnet sendmany \
  "test1" \
  '''
    { 
      "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN": 0.1,
      "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe": 0.2
    } ''' \
  6       \
  "Example Transaction"
~~~

Result:

~~~
ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb01c2cb8e8de481e
~~~


#### sendrawtransaction

~~~
sendrawtransaction <hex> [true|false]
~~~

{% autocrossref %}

Broadcasts transaction in rawtransaction format to the peer-to-peer network.

See also: `createrawtransaction` and `signrawtransaction`

{% endautocrossref %}

**Argument #1: Raw Transaction**

{% autocrossref %}

*String; required:* a fully-signed transaction in rawtransaction format
(hex).

{% endautocrossref %}

**Argument #2: Whether To Allow High Fees**

{% autocrossref %}

*Boolean; optional:* whether or not to allow the transaction to have a
high transaction fee.  Transaction fees are the difference between the
sum of the inputs and the sum of the outputs, so a raw transaction which
accidentally leaves off a change output, for example, can have a
transaction fee dozens or hundreds of times larger than the network
norm.  If *true* is specified, that will be allowed.  If *false* (the
default), the transaction will be rejected with an informative error
message.

{% endautocrossref %}

**Result: A TXID Or Error Message**

{% autocrossref %}

If successful, the transaction's txid (hash) will be returned.  If
unsuccessful, an error message will be returned.

{% endautocrossref %}

**Examples**

{% autocrossref %}

Create and sign a transaction spending over 0.2 bitcoins as fees:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet signrawtransaction $( 
    bitcoin-cli -testnet createrawtransaction '''
      [ 
        { 
          "txid": "ef7c0cbf6ba5af68d2ea239bba709b26ff7b0b669839a63bb01c2cb8e8de481e",
          "vout": 0 
        } 
      ]''' '''
      { 
        "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe": 0.1 
      }''' 
  )
~~~

Result:

~~~
{
    "hex" : "01000000011e48dee8b82c1cb03ba63998660b7bff269b70ba9\
             b23ead268afa56bbf0c7cef000000006b4830450221009c711c\
             e4df4cd8e22a10016ff6098e799f081e3a1706a9c0df14eeeb8\
             6c31bb302206323d29ab4f3138371df7b7bb794bb7c6a5e7e40\
             161e98b5c873f892d319d5230121027ce4f9db9f237fc75e420\
             742320c7df3b4ca95c44b6bc715400930f24870b2b1ffffffff\
             0180969800000000001976a9140dfc8bafc8419853b34d5e072\
             ad37d1a5159f58488ac00000000",
    "complete" : true
}
~~~

{% autocrossref %}

Now attempt to broadcast it:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet sendrawtransaction 01000000011e48dee8b82c\
    1cb03ba63998660b7bff269b70ba9b23ead268afa56bbf0c7cef00000000\
    6b4830450221009c711ce4df4cd8e22a10016ff6098e799f081e3a1706a9\
    c0df14eeeb86c31bb302206323d29ab4f3138371df7b7bb794bb7c6a5e7e\
    40161e98b5c873f892d319d5230121027ce4f9db9f237fc75e420742320c\
    7df3b4ca95c44b6bc715400930f24870b2b1ffffffff0180969800000000\
    001976a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac00000000
~~~

Result:

~~~
error: {"code":-22,"message":"TX rejected"}
~~~

{% autocrossref %}

Allow high fees to force it to spend:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet sendrawtransaction 01000000[...]00000000 true
~~~

Result (success):

~~~
6d62d3f74be5ca614e32a2fb662deabe87ff95c7d90228cd8615da39cc824e34
~~~


#### sendtoaddress

~~~
sendtoaddress <address> <amount> <memo> <label>
~~~

{% autocrossref %}

Spend an amount to a given address.  Encrypted wallets must be unlocked first.

{% endautocrossref %}

**Argument #1: Address**

{% autocrossref %}

*String; required:* A bitcoin address which will received payment.

{% endautocrossref %}

**Argument #2: Amount**

{% autocrossref %}

*Number; required:* the amount in decimal bitcoins.

{% endautocrossref %}

**Argument #3: Memo**

{% autocrossref %}

*String; optional:* the memo to give the transaction.  This is not
broadcast to the peer-to-peer network; it is stored in your wallet only.

{% endautocrossref %}

**Argument #4: Label**

{% autocrossref %}

*String; optional:* the label to give the transaction.  This is not
broadcast to the peer-to-peer network; it is stored in your wallet only.

{% endautocrossref %}

**Result: TXID**

{% autocrossref %}

If the spend is successful, the txid is returned.

{% endautocrossref %}


**Example**

{% autocrossref %}

Spend 0.1 bitcoins to the address below with the memo "sendtoadress
example" and the label "Nemo From Example.com":

{% endautocrossref %}

~~~
> bitcoin-cli -testnet sendtoaddress mmXgiR6KAhZCyQ8ndr2BCfEq1wNG2UnyG6 \
    0.1 "sendtoaddress example" "Nemo From Example.com"
~~~

~~~
85a98fdf1529f7d5156483ad020a51b7f3340e47448cf932f470b72ff01a6821
~~~


#### setaccount

~~~
setaccount <address> <account>
~~~

{% autocrossref %}

Puts the given address in the given account.

{% endautocrossref %}

**Argument #1: A Bitcoin Address**

{% autocrossref %}

*String; required:* the address to put in the account.

{% endautocrossref %}

**Argument #2: An Account**

{% autocrossref %}

*String; required:* the account in which to put the address.

{% endautocrossref %}

**Result: None On Success**

{% autocrossref %}

No result generated on success.

{% endautocrossref %}

**Example**

{% autocrossref %}

Put the address indicated below in the "doc test" account.

{% endautocrossref %}

~~~
> bitcoin-cli -testnet setaccount \
    mmXgiR6KAhZCyQ8ndr2BCfEq1wNG2UnyG6 "doc test"
~~~

(Success: no result displayed.)




#### setgenerate

~~~
setgenerate <true|false> [processors]
~~~

{% autocrossref %}

Enable or disable hashing to attempt to find the next block.

See also: `getgenerate`

{% endautocrossref %}

**Argument #1: Whether To Enable Or Disable Generation**

{% autocrossref %}

*Boolean; required:* to enable generation, *true*; to disable, *false*.

{% endautocrossref %}

**Argument #2: The Number Of Processors To Use**

{% autocrossref %}

*Number; optional:* the number of logical processors to use.  Defaults
to 1; use -1 to use all available processors.

*Note:* in regtest mode, this argument will automatically create that
number of blocks.  See example below.

{% endautocrossref %}

**Result: None On Success**

No result on success.

**Examples**

{% autocrossref %}

Enable generation using two logical processors (on this machine, two
cores of one physical processor):

{% endautocrossref %}

~~~
> bitcoin-cli -testnet setgenerate true 2
~~~

{% autocrossref %}

(Success: no result displayed.  Process manager shows 200% CPU usage.)

Using regtest mode, generate 101 blocks (enough to be able to spend the
coinbase transaction of the first block generated): 

{% endautocrossref %}

~~~
> bitcoin-cli -regtest setgenerate true 101
~~~

{% autocrossref %}

(Success: no result displayed.  Wallet balance shows 50 bitcoins available.)

{% endautocrossref %}




#### settxfee

~~~
settxfee amount
~~~

{% autocrossref %}

Set the transaction fee per kilobyte.

{% endautocrossref %}

**Argument: Amount**

{% autocrossref %}

*Number; required:* the transaction fee in decimal bitcoins per kilobyte.
Will be rounded up to the nearest satoshi (0.00000001).

{% endautocrossref %}

**Result: True Or False**

{% autocrossref %}

*True* if successful.  

{% endautocrossref %}

**Example**

{% autocrossref %}

Set the transaction fee per kilobyte to 100,000 satoshis (1 millibit).

{% endautocrossref %}

~~~
> bitcoin-cli -testnet settxfee 0.00100000
~~~

Result:

~~~
true
~~~



#### signmessage

~~~
signmessage <address> <message>
~~~

{% autocrossref %}

Sign a message with the private key of an address.  Encrypted wallets
must be unlocked first.

{% endautocrossref %}

**Argument #1: Address**

{% autocrossref %}

*String; required:* the Bitcoin address corresponding to the private key
which should be used to sign the message.

{% endautocrossref %}

**Argument #2: Message**

{% autocrossref %}

*String; required:* The message to sign.

{% endautocrossref %}

**Result: Message Signature**

{% autocrossref %}

The signature of the message encoded in base64.

{% endautocrossref %}

**Example**

{% autocrossref %}

Sign a the message "Hello, World!" using the following address:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet signmessage mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe \
    'Hello, World!'
~~~

Result:

~~~
IOGreqb/7UgD1ifcojESd32ZJgH5RGzUXitmbl6ZbdenSmitipWoLSi73TskmLY7zhcD662bTw3RHoYQl/dOAhE=
~~~



#### signrawtransaction

~~~
signrawtransaction <raw transaction hex> [previous transactions] [private keys] [sighashtype]
~~~

{% autocrossref %}

Sign inputs of a transaction in rawtransaction format using private keys
stored in the wallet or provided in the call.

{% endautocrossref %}

**Argument #1: The Transaction To Sign**

{% autocrossref %}

*String; required:* the transaction to sign in rawtransaction format
(hex).

{% endautocrossref %}

**Argument #2: P2SH Transaction Dependencies**

{% autocrossref %}

*String; optional:* A JSON array of JSON objects. Each object contains
details about an unknown-to-this-node P2SH transaction that this transaction
depends upon.

Each previous P2SH transaction must include its *txid* in hex, output
index number (*vout*), pubkey script (*scriptPubKey*) in hex, and
*redeemScript* in hex.

{% endautocrossref %}


~~~
[
  {
    "txid":"<txid>",
    "vout":<output index number>,
    "scriptPubKey": "<scriptPubKey in hex>",
    "redeemScript": "<redeemScript in hex>"
  }
  ,[...]
]
~~~

**Argument #3: Private Keys For Signing**

{% autocrossref %}

*String; optional:* A JSON array of base58check-encoded private keys to use
for signing.  If this argument is used, only the keys provided will be
used to sign even if the wallet has other matching keys.  If this
argument is omitted, keys from the wallet will be used.

{% endautocrossref %}

~~~
[
  "<private key in base58check hex>"
  ,[...]
]
~~~

**Argument #4: Sighash Type**

{% autocrossref %}

*String, optional:* The type of signature hash to use for all of the
signatures performed.  (You must use separate calls to
`signrawtransaction` if you want to use different sighash types for
different signatures.)

The allowed values are *ALL*, *NONE*,
*SINGLE*, *ALL|ANYONECANPAY*, *NONE|ANYONECANPAY*,
and *SINGLE|ANYONECANPAY*.

{% endautocrossref %}


**Result: Signed Transaction**

{% autocrossref %}

*String:* a JSON object containing the transaction in *hex* with as many
signatures as could be applied and a *complete* key indicating whether
or not the the transaction is fully signed (0 indicates it is not
complete).

{% endautocrossref %}

~~~
{
  "hex": "<signed raw transaction hex>",
  "complete": <0|1>
}
~~~

**Example**

{% autocrossref %}

Sign the hex generated in the example section for the `rawtransaction`
RPC:

{% endautocrossref %}

~~~
> bitcoin-cli -testnet signrawtransaction 010000000189957b01aed5\
              96d3b361b576234eaeed3249246f14562d6bc6085166cd247d\
              5a0000000000ffffffff0180969800000000001976a9140dfc\
              8bafc8419853b34d5e072ad37d1a5159f58488ac00000000
~~~

Result:

~~~
{
  "hex" : "010000000189957b01aed596d3b361b576234eaeed3249246f145\
           62d6bc6085166cd247d5a000000006b483045022100c7a034fd7d\
           990b8a2bfba45fde44cae40b5ffbe42c5cf7d8143bfe317bdef3f\
           10220584e52f59b6a46d688322d65178efe83972a8517c9479630\
           6d40083af5b807c901210321eeeb46fd878ce8e62d5e0f408a0ea\
           b41d7c3a7872dc836ce360439536e423dffffffff018096980000\
           0000001976a9140dfc8bafc8419853b34d5e072ad37d1a5159f58\
           488ac00000000",
  "complete" : true
}
~~~





#### stop

~~~
stop
~~~

Stop the Bitcoin Core server.

**Example**

~~~
bitcoin-cli -testnet stop
~~~

(Success: no result printed but `bitcoind` shutdown.)





#### submitblock

~~~
submitblock <new block>  [extra parameters]
~~~

{% autocrossref %}

Attempts to broadcast a new block to network.  Extra parameters are ignored
by Bitcoin Core but may be used by mining pools or other programs.

{% endautocrossref %}

**Argument #1: The New Block In Hex**

{% autocrossref %}

*String; required:* the hex-encoded block data to broadcast to the
peer-to-peer network.

{% endautocrossref %}

**Argument #2: Extra Parameters**

{% autocrossref %}

*String; optional:*  A JSON object containing extra parameters for
mining pools and other software, such as a work identifier (workid).
The extra parameters will not be broadcast to the network.

{% endautocrossref %}

~~~
{
  "<key>" : "<value>"
}
~~~

**Result: None**

No result printed if successful.  An error message if failed.

**Example**

{% autocrossref %}

Submit the following block with the workid, "test".

{% endautocrossref %}

~~~
> bitcoin-cli -testnet submitblock 02000000df11c014a8d798395b505\
              9c722ebdf3171a4217ead71bf6e0e99f4c7000000004a6f6a2\
              db225c81e77773f6f0457bcb05865a94900ed11356d0b75228\
              efb38c7785d6053ffff001d005d43700101000000010000000\
              00000000000000000000000000000000000000000000000000\
              0000000ffffffff0d03b477030164062f503253482ffffffff\
              f0100f9029500000000232103adb7d8ef6b63de74313e0cd4e\
              07670d09a169b13e4eda2d650f529332c47646dac00000000\
              '{ "workid": "test" }'
~~~

