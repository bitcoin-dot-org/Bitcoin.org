{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/intro.md" %}

### Remote Procedure Calls (RPCs)
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin Core provides a large number of Remote Procedure Calls (RPCs)
using a [HTTP JSON-RPC version 1.0][] interface. Any program can access
the RPCs using JSON-RPC, but Bitcoin Core also provides the
`bitcoin-cli` command to wrap the JSON-RPC access for Command Line
Interface (CLI) users. Most of the RPC examples in this documentation
use `bitcoin-cli` for simplicity, so this subsection describes raw
JSON-RPC interface and how the command-line interface translates it.

In order to start `bitcoind`, you will need to set a password for
JSON-RPC in the `bitcoin.conf` file. See the [Examples
Page][devexamples] for details. JSON-RPC starts on port 8332 for mainnet
and 18332 for testnet and regtest. By default, `bitcoind` doesn't use a
JSON-RPC user, but you can set one (see `bitcoind --help`).

The interface is not intended for public access and is only accessible
from localhost by default.

RPCs are made using the standard JSON-RPC 1.0 syntax, which sends several
standard arguments:


| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| RPC                  | object          | Required<br>(exactly 1)     | An object containing the standard RPC arguments
| → <br>`jsonrpc`      | number (real)   | Optional<br>(0 or 1)        | The version of JSON-RPC used.  Bitcoin Core currently ignores this, as it only supports version 1.0.  Default is `1.0`
| → <br>`id`           | string          | Required<br>(exactly 1)     | An arbitrary string that will be returned when the response is sent.  May be set to an empty string ("")
| → <br>`method`       | string          | Required<br>(exactly 1)     | The RPC, such as `getbestblockhash`.  See the RPC section for a list of available commands
| → <br>`params`       | array           | Required<br>(exactly 1)     | An array containing parameters for the RPC.  May be an empty array if allowed by the particular RPC
| → → <br>Parameter  | *any*           | Optional<br>(0 or more)     | A parameter.  May be any JSON type allowed by the particular RPC
{:.ntpd}

In table above and in other tables describing JSON-RPC input<!--noref-->
and output<!--noref-->, we use the following formatting

* "→" to indicate an argument that is the child of a JSON array or
  JSON object. For example, "→ → Parameter" above means Parameter
  is the child of the `params` array which itself is a child of the
  RPC array.

* "Plain Text" names (like "RPC" above) are unnamed in the actual
  JSON-RPC

* `literal` names (like `id` above) are the strings that appear in the
  actual JSON-RPC

* Type (specifics) are the general JSON-RPC type and the specific
  Bitcoin Core type

* Required/Optional describe whether a field must be returned within its
  containing array or object. (So an optional object may still have
  required children.)

For example, here is the JSON-RPC requesting the hash of the latest
block on the local best block chain:

{% highlight json %}
{
    "jsonrpc": "1.0",
    "id": "bitcoin.org developer documentation",
    "method": "getbestblockhash",
    "params": []
}
{% endhighlight %}

We can send that to a local Bitcoin Core running on testnet using cURL
with the following command:

{% highlight bash %}
curl --user ':your_password' --data-binary '''
  {
      "jsonrpc": "1.0",
      "id":"bitcoin.org developer documentation",
      "method": "getbestblockhash",
      "params": []
  }''' \
  -H 'content-type: text/plain;' http://127.0.0.1:18332/
{% endhighlight %}

The output<!--noref--> will be sent using the standard JSON-RPC 1.0
format. For example (whitespace added):

{% highlight json %}
{
    "result": "00000000bd68bfdf381efd5fff17c723d2bb645bcbb215a6e333d4204888e951",
    "error": null,
    "id": "bitcoin.org developer documentation"
}
{% endhighlight %}

The standard JSON-RPC 1.0 result format is described below:

| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| Result               | object          | Required<br>(exactly 1)     | An object describing the results
| → <br>`result`       | *any*           | Required<br>(exactly 1)     | The results as any JSON data type.  If an error occured, set to `null`
| → <br>`error`        | null/object     | Required<br>(exactly 1)     | If no error occurred, set to `null`.  If an error occured, an object describing the error
| → → <br>`code`        | number (int)    | Required<br>(exactly 1)     | The error code as set by the returning function and defined in Bitcoin Core's [rpcprotocol.h][]
| → → <br>`message`     | string          | Required<br>(exactly 1)     | An attempt to describe the problem in human-readable text.  May be an empty string ("").  Bitcoin Core often returns help text with embedded newline strings ("\n"); `bitcoin-cli` can expand these to actual newlines
| → <br>`id`           | string          | Required<br>(exactly 1)     | The arbitrary string passed in when the RPC was called
{:.ntpd}

For an example of the error output<!--noref-->, here's the result
after passing an invalid address to the `sendtoaddress` RPC
(whitespace added):

{% highlight json %}
{
    "result": null,
    "error": {
        "code": -5,
        "message": "Invalid Bitcoin address"
    },
    "id": "bitcoin.org developer documentation"
}
{% endhighlight %}

The `bitcoin-cli` command can save command line users a lot of typing
compared to using cURL or another HTTP-sending command. For example, to
get the block hash we got before, we would use the following command:

{% highlight bash %}
bitcoin-cli getbestblockhash
{% endhighlight %}

For non-error output<!--noref-->, `bitcoin-cli` will only display the
value of the `result` field, and if it's a string, `bitcoin-cli` will
remove its JSON quotation marks. For example, the result for the
command above:

{% highlight text %}
00000000bd68bfdf381efd5fff17c723d2bb645bcbb215a6e333d4204888e951
{% endhighlight %}

For errors, `bitcoin-cli` will display only the `error` object.  For
example, the result of the invalid address command above as formatted by
`bitcoin-cli`:

{% highlight json %}
error: {"code":-5,"message":"Invalid Bitcoin address"}
{% endhighlight %}

Because `bitcoin-cli` abstracts away the parts of JSON-RPC we would need
to repeatedly describe in each RPC description below, we describe the
Bitcoin Core RPCs using `bitcoin-cli`. However, using an actual
programming interface to the full JSON-RPC will serve you much better
for automated tasks.

[{{WARNING}}][proper money handling]{:#term-proper-money-handling}{:.term} if you write
programs using the JSON-RPC interface, you must ensure they handle high-precision
real numbers correctly.  See the [Proper Money Handling][wiki proper money handling]
Bitcoin Wiki article for details and example code.

{% endautocrossref %}
