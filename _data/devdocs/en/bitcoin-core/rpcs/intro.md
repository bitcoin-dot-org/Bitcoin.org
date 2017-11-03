{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/intro.md" %}

### Remote Procedure Calls (RPCs)
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin Core provides a remote procedure call (RPC) interface for various
administrative tasks, wallet operations, and queries about network and block
chain data.

If you start Bitcoin Core using `bitcoin-qt`, the RPC interface is disabled by
default. To enable it, set `server=1` in `bitcoin.conf` or supply the `-server`
argument when invoking the program. If you start Bitcoin Core using `bitcoind`,
the RPC interface is enabled by default.

The interface requires the user to provide a password for authenticating RPC
requests. This password can be set either using the `rpcpassword` property in
`bitcoin.conf` or by supplying the `-rpcpassword` program argument. Optionally a
username can be set using the `rpcuser` configuration value. See the [Examples
Page][devexamples] for more information about setting Bitcoin Core configuration
values.

Open-source client libraries for the RPC interface are readily available in most
modern programming languages, so you probably don't need to write your own from
scratch. Bitcoin Core also ships with its own compiled C++ RPC client,
`bitcoin-cli`, located in the `bin` directory alongside `bitcoind` and
`bitcoin-qt`. The `bitcoin-cli` program can be used as a command-line interface
(CLI) to Bitcoin Core or for making RPC calls from applications written in
languages lacking a suitable native client. The remainder of this section
describes the Bitcoin Core RPC protocol in detail.

The Bitcoin Core RPC service listens for HTTP `POST` requests on port 8332 in
mainnet mode or 18332 in testnet or regtest mode. The port number can be changed
by setting `rpcport` in `bitcoin.conf`. By default the RPC service binds to your
server's [localhost][Localhost] loopback
network<!--noref--> interface so it's not accessible from other servers.
Authentication is implemented using [HTTP basic
authentication][HTTP basic authentication]. RPC
HTTP requests must include a `Content-Type` header set to `text/plain` and a
`Content-Length` header set to the size of the request body.

The format of the request body and response data is based on [version 1.0 of the
JSON-RPC specification][JSON-RPC version 1.0]. Specifically,
the HTTP `POST` data of a request must be a JSON object with the following
format:


| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| Request              | object          | Required<br>(exactly 1)     | The JSON-RPC<!--noref--> request object
| → <br>`jsonrpc`      | number (real)   | Optional<br>(0 or 1)        | Version indicator for the JSON-RPC<!--noref--> request. Currently ignored by Bitcoin Core.
| → <br>`id`           | string          | Optional<br>(0 or 1)        | An arbitrary string that will be returned with the response.  May be omitted or set to an empty string ("")
| → <br>`method`       | string          | Required<br>(exactly 1)     | The RPC method name (e.g. `getblock`).  See the RPC section for a list of available methods.
| → <br>`params`       | array           | Optional<br>(0 or 1)        | An array containing positional parameter values for the RPC.  May be an empty array or omitted for RPC calls that don't have any required parameters.
| → <br>`params`       | object          | Optional<br>(0 or 1)        | Starting from Bitcoin Core 0.14.0 (replaces the `params` array above) An object containing named parameter values for the RPC.  May be an empty object or omitted for RPC calls that don't have any required parameters.
| → → <br>Parameter    | *any*           | Optional<br>(0 or more)       | A parameter.  May be any JSON type allowed by the particular RPC method
{:.ntpd}

In the table above and in other tables describing RPC input<!--noref--> and
output<!--noref-->, we use the following conventions

* "→" indicates an argument that is the child of a JSON array or JSON object.
  For example, "→ → Parameter" above means Parameter is the child of the
  `params` array which itself is a child of the Request object.

* Plain-text names like "Request" are unnamed in the actual JSON object

* Code-style names like `params` are literal strings that appear in the JSON
  object.

* "Type" is the JSON data type and the specific Bitcoin Core type.

* "Presence" indicates whether or not a field must be present within its
   containing array or object. Note that an optional object may still have
   required children.


The HTTP response data for a RPC request is a JSON object with the following
format:

| Name                 | Type            | Presence                    | Description
|----------------------|-----------------|-----------------------------|----------------
| Response             | object          | Required<br>(exactly 1)     | The JSON-RPC<!--noref--> response object.
| → <br>`result`       | *any*           | Required<br>(exactly 1)     | The RPC output<!--noref--> whose type varies by call.  Has value `null` if an error occurred.
| → <br>`error`        | null/object     | Required<br>(exactly 1)     | An object describing the error if one occurred, otherwise `null`.
| → → <br>`code`        | number (int)    | Required<br>(exactly 1)     | The error code returned by the RPC function call. See [rpcprotocol.h][] for a full list of error codes and their meanings.
| → → <br>`message`     | string          | Required<br>(exactly 1)     | A text description of the error.  May be an empty string ("").
| → <br>`id`           | string          | Required<br>(exactly 1)     | The value of `id` provided with the request. Has value `null` if the `id` field was omitted in the request.
{:.ntpd}

As an example, here is the JSON-RPC<!--noref--> request object for the hash of
the genesis block:

{% highlight json %}
{
    "method": "getblockhash",
    "params": [0],
    "id": "foo"
}
{% endhighlight %}

The command to send this request using `bitcoin-cli` is:

{% highlight bash %}
bitcoin-cli getblockhash 0
{% endhighlight %}

Alternatively, we could `POST` this request using the cURL command-line program
as follows:

{% highlight bash %}
curl --user ':my_secret_password' --data-binary '''
  {
      "method": "getblockhash",
      "params": [0],
      "id": "foo"
  }''' \
  --header 'Content-Type: text/plain;' localhost:8332
{% endhighlight %}

The HTTP response data for this request would be:

{% highlight json %}
{
    "result": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "error": null,
    "id": "foo"
}
{% endhighlight %}

Note: In order to minimize its size, the raw JSON response from Bitcoin Core
doesn't include any extraneous whitespace characters. Here we've added
whitespace to make the object more readable. Speaking of which, `bitcoin-cli`
also transforms the raw response to make it more human-readable. It:

- Adds whitespace indentation to JSON objects
- Expands escaped newline characters ("\n") into actual newlines
- Returns only the value of the `result` field if there's no error
- Strips the outer double-quotes around `result`s of type string
- Returns only the `error` field if there's an error

Continuing with the example above, the output<!--noref--> from the `bitcoin-cli`
command would be simply:

{% highlight text %}
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
{% endhighlight %}

If there's an error processing a request, Bitcoin Core sets the `result` field
to `null` and provides information about the error in the  `error` field. For
example, a request for the block hash at block height -1 would be met with the
following response (again, whitespace added for clarity):

{% highlight json %}
{
    "result": null,
    "error": {
        "code": -8,
        "message": "Block height out of range"
    },
    "id": "foo"
}
{% endhighlight %}

If `bitcoin-cli` encounters an error, it exits with a non-zero status code and
outputs<!--noref--> the `error` field as text to the process's standard error
stream:

{% highlight text %}
error: {"code": -8, "message": "Block height out of range"}
{% endhighlight %}

Starting in Bitcoin Core version 0.7.0, the RPC interface supports request
batching as described in [version 2.0 of the JSON-RPC
specification][JSON-RPC request batching]. To initiate multiple
RPC requests within a single HTTP request, a client can `POST` a JSON array
filled with Request objects. The HTTP response data is then a JSON array filled
with the corresponding Response objects. Depending on your usage pattern,
request batching may provide significant performance gains. The `bitcoin-cli`
RPC client does not support batch requests.

To keep this documentation compact and readable, the examples for each of the
available RPC calls will be given as `bitcoin-cli` commands:

{% highlight text %}
bitcoin-cli [options] <method name> <param1> <param2> ...
{% endhighlight %}

This translates into an JSON-RPC<!--noref--> Request object of the form:

{% highlight json %}
{
    "method": "<method name>",
    "params": [ "<param1>", "<param2>", "..." ],
    "id": "foo"
}
{% endhighlight %}

[{{WARNING}}][proper money handling]{:#term-proper-money-handling}{:.term} if you write
programs using the JSON-RPC interface, you must ensure they handle high-precision
real numbers correctly.  See the [Proper Money Handling][wiki proper money handling]
Bitcoin Wiki article for details and example code.

{% endautocrossref %}
