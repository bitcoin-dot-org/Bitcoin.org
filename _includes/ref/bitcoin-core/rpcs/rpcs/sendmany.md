{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/sendmany.md" %}

##### SendMany
{% include helpers/subhead-links.md %}

{% assign summary_sendMany="creates and broadcasts a transaction which sends outputs to multiple addresses." %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet or an
unencrypted wallet.*

The `sendmany` RPC {{summary_sendMany}}

*Parameter #1---from account*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| From Account       | string          | Required<br>(exactly 1)     | The name of the account from which the bitcoins should be spent.  Use an empty string ("") for the default account. Bitcoin Core will ensure the account has sufficient bitcoins to pay the total amount in the *outputs* field described below (but the transaction fee paid is not included in the calculation, so an account can spend a total of its balance plus the transaction fee)

*Parameter #2---the addresses and amounts to pay*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| Outputs            | object          | Required<br>(exactly 1)     | An object containing key/value pairs corresponding to the addresses and amounts to pay
| →<br>Address/Amount | string (base58) : number (bitcoins) | Required<br>(1 or more) | A key/value pair with a base58check-encoded string containing the P2PKH or P2SH address to pay as the key, and an amount of bitcoins to pay as the value

*Parameter #3---minimum confirmations*

{{INCLUDE_SPEND_CONFIRMATIONS}}

*Parameter #4---a comment*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| Comment            | string          | Optional<br>(0 or 1)        | A locally-stored (not broadcast) comment assigned to this transaction.  Default is no comment

*Result---a TXID of the sent transaction*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| `result`           | string          | Required<br>(exactly 1)     | The TXID of the sent transaction, encoded as hex in RPC byte order

*Example from Bitcoin Core 0.10.0*

From the account *test1*, send 0.1 bitcoins to the first address and 0.2
bitcoins to the second address, with a comment of "Example Transaction".

{% highlight bash %}
bitcoin-cli -testnet sendmany \
  "test1" \
  '''
    {
      "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN": 0.1,
      "mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe": 0.2
    } ''' \
  6       \
  "Example Transaction"
{% endhighlight %}

Result:

{% highlight text %}
ec259ab74ddff199e61caa67a26e29b13b5688dc60f509ce0df4d044e8f4d63d
{% endhighlight %}

*See also*

* [SendFrom][rpc sendfrom]: {{summary_sendFrom}}
* [SendToAddress][rpc sendtoaddress]: {{summary_sendToAddress}}
* [Move][rpc move]: {{summary_move}}

{% endautocrossref %}
