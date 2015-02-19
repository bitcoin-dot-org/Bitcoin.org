{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/listunspent.md" %}

##### ListUnspent
{% include helpers/subhead-links.md %}

{% assign summary_listUnspent="returns an array of unspent transaction outputs belonging to this wallet." %}

{% autocrossref %}

*Requires wallet support.*

The `listunspent` RPC {{summary_listUnspent}} **Note:** as of Bitcoin
Core 0.10.0, outputs affecting watch-only addresses will be returned; see
the *spendable* field in the results described below.

*Parameter #1---the minimum number of confirmations an output must have*

{{json_table}}

* Minimum Confirmations
* number (int)
* Optional (0 or 1)
* The minimum number of confirmations the transaction containing an output must have in order to be returned.  Use `0` to return outputs from unconfirmed transactions. Default is `1`

*Parameter #2---the maximum number of confirmations an output may have*

{{json_table}}

* Maximum Confirmations
* number (int)
* Optional (0 or 1)
* The maximum number of confirmations the transaction containing an output may have in order to be returned.  Default is `9999999` (~10 million)

*Parameter #3---the addresses an output must pay*

{{json_table}}

* Addresses
* array
* Optional (0 or 1)
* If present, only outputs which pay an address in this array will be returned

* →<br>Address
* string (base58)
* Required (1 or more)
* A P2PKH or P2SH address

*Result---the list of unspent outputs*

{{json_table}}

* `result`
* array
* Required (exactly 1)
* An array of objects each describing an unspent output.  May be empty

* →<br>Unspent Output
* object
* Optional (0 or more)
* An object describing a particular unspent output belonging to this wallet

* → →<br>`txid`
* string (hex)
* Required (exactly 1)
* The TXID of the transaction containing the output, encoded as hex in RPC byte order

* → →<br>`vout`
* number (int)
* Required (exactly 1)
* The output index number (vout) of the output within its containing transaction

* → →<br>`address`
* string (base58)
* Optional (0 or 1)
* The P2PKH or P2SH address the output paid.  Only returned for P2PKH or P2SH output scripts

* → →<br>`account`
* string
* Optional (0 or 1)
* If the address returned belongs to an account, this is the account.  Otherwise not returned

* → →<br>`scriptPubKey`
* string (hex)
* Required (exactly 1)
* The output script paid, encoded as hex

* → →<br>`redeemScript`
* string (hex)
* Optional (0 or 1)
* If the output is a P2SH whose script belongs to this wallet, this is the redeem script

* → →<br>`amount`
* number (int)
* Required (exactly 1)
* The amount paid to the output in bitcoins

* → →<br>`confirmations`
* number (int)
* Required (exactly 1)
* The number of confirmations received for the transaction containing this output

* → →<br>`spendable`
* bool
* Required (exactly 1)
* *Added in Bitcoin Core 0.10.0*<br><br>Set to `true` if the private key or keys needed to spend this output are part of the wallet.  Set to `false` if not (such as for watch-only addresses)

*Example from Bitcoin Core 0.10.0*

Get all outputs confirmed at least 6 times for a particular
address:

{% highlight bash %}
bitcoin-cli -testnet listunspent 6 99999999 '''
  [
    "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe"
  ]
'''
{% endhighlight %}

Result:

{% highlight json %}
[
    {
        "txid" : "d54994ece1d11b19785c7248868696250ab195605b469632b7bd68130e880c9a",
        "vout" : 1,
        "address" : "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe",
        "account" : "test label",
        "scriptPubKey" : "76a9140dfc8bafc8419853b34d5e072ad37d1a5159f58488ac",
        "amount" : 0.00010000,
        "confirmations" : 6210,
        "spendable" : true
    }
]
{% endhighlight %}

*See also*

* [ListTransactions][rpc listtransactions]: {{summary_listTransactions}}
* [LockUnspent][rpc lockunspent]: {{summary_lockUnspent}}

{% endautocrossref %}
