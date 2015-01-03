{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/move.md" %}

##### Move
{% include helpers/subhead-links.md %}

{% assign summary_move="moves a specified amount from one account in your wallet to another using an off-block-chain transaction." %}

{% autocrossref %}

*Requires wallet support.*

The `move` RPC {{summary_move}}

{{WARNING}} it's allowed to move more funds than are in an account,
giving the sending account a negative balance and giving the receiving
account a balance that may exceed the number of bitcoins in the wallet
(or the number of bitcoins in existence).

*Parameter #1---from account*

| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| From Account         | string          | Required<br>(exactly 1)     | The name of the account to move the funds from
{:.ntpd}

*Parameter #2---to account*

| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| To Account           | string          | Required<br>(exactly 1)     | The name of the account to move the funds to
{:.ntpd}

*Parameter #3---amount to move*

| Name                 | Type              | Presence                    | Description
|----------------------|-------------------|-----------------------------|----------------
| Amount               | number (bitcoins) | Required<br>(exactly 1)     | The amount of bitcoins to move
{:.ntpd}

*Parameter #4---an unused parameter*

| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| *Unused*             | number (int)    | Optional<br>(0 or 1)        | This parameter is no longer used. If parameter #5 needs to be specified, this can be any integer
{:.ntpd}

*Parameter #5---a comment*

| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| Comment              | string          | Optional<br>(0 or 1)        | A comment to assign to this move payment
{:.ntpd}

*Result---`true` on success*

| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| `result`             | bool            | Required<br>(exactly 1)     | Set to `true` if the move was successful
{:.ntpd}

*Example from Bitcoin Core 0.10.0*

Move 0.1 bitcoins from "doc test" to "test1", giving the transaction the
comment "Example move":

{% highlight bash %}
bitcoin-cli -testnet move "doc test" "test1" 0.1 0 "Example move"
{% endhighlight %}

Result:

{% highlight json %}
true
{% endhighlight %}

*See also*

* [ListAccounts][rpc listaccounts]: {{summary_listAccounts}}
* [SendFrom][rpc sendfrom]: {{summary_sendFrom}}
* [SendToAddress][rpc sendtoaddress]: {{summary_sendToAddress}}

{% endautocrossref %}
