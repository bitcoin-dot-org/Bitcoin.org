{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/sendmany.md" %}

##### SendMany
{% include helpers/subhead-links.md %}

{% assign summary_sendMany="creates and broadcasts a transaction which sends outputs to multiple addresses." %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet or an
unencrypted wallet.*

The `sendmany` RPC {{summary_sendMany}}

*Parameter #1---from account*

{% itemplate ntpd1 %}
- n: "From Account"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "*Deprecated: will be removed in a later version of Bitcoin Core*<br><br>The name of the account from which the bitcoins should be spent.  Use an empty string (\"\") for the default account. Bitcoin Core will ensure the account has sufficient bitcoins to pay the total amount in the *outputs* field described below (but the transaction fee paid is not included in the calculation, so an account can spend a total of its balance plus the transaction fee)"

{% enditemplate %}

*Parameter #2---the addresses and amounts to pay*

{% itemplate ntpd1 %}
- n: "Outputs"
  t: "object"
  p: "Required<br>(exactly 1)"
  d: "An object containing key/value pairs corresponding to the addresses and amounts to pay"

- n: "→<br>Address/Amount"
  t: "string (base58) : number (bitcoins)"
  p: "Required<br>(1 or more)"
  d: "A key/value pair with a base58check-encoded string containing the P2PKH or P2SH address to pay as the key, and an amount of bitcoins to pay as the value"

{% enditemplate %}

*Parameter #3---minimum confirmations*

{{INCLUDE_SPEND_CONFIRMATIONS}}

*Parameter #4---a comment*

{% itemplate ntpd1 %}
- n: "Comment"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "A locally-stored (not broadcast) comment assigned to this transaction.  Default is no comment"

{% enditemplate %}

*Parameter #5---automatic fee subtraction*

{% itemplate ntpd1 %}
- n: "Subtract Fee From Amount"
  t: "array"
  p: "Optional<br>(0 or 1)"
  d: "An array of addresses.  The fee will be equally divided by as many addresses as are entries in this array and subtracted from each address.  If this array is empty or not provided, the fee will be paid by the sender"
  
- n: "→<br>Address"
  t: "string (base58)"
  p: "Optional (0 or more)"
  d: "An address previously listed as one of the recipients."
{% enditemplate %}

*Result---a TXID of the sent transaction*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The TXID of the sent transaction, encoded as hex in RPC byte order"

{% enditemplate %}

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
