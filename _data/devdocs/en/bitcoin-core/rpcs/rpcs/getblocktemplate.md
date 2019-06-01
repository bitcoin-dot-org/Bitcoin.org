{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/getblocktemplate.md" %}

##### GetBlockTemplate
{% include helpers/subhead-links.md %}

{% assign summary_getBlockTemplate="if the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'." %}

{% autocrossref %}

The `getblocktemplate` RPC {{summary_getBlockTemplate}}

It returns data needed to construct a block to work on.

For full specification, see BIPs 22, 23, 9, and 145:

{% endautocrossref %}

    https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki
    https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki
    https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes
    https://github.com/bitcoin/bips/blob/master/bip-0145.mediawiki

{% autocrossref %}

*Parameter #1---template_request*

{% itemplate ntpd1 %}
- n: "template_request"
  t: "json object"
  p: "Required<br>(exactly 1)"
  d: "A json object in the following spec
       \"rules\": [           (json array, required) A list of strings
       \"support\",         (string) client side supported softfork deployment
       ...
       ],
       }"

{% enditemplate %}

{% endautocrossref %}

    {
      "mode": "str",       (string, optional) This must be set to "template", "proposal" (see BIP 23), or omitted
      "capabilities": [    (json array, optional) A list of strings
        "support",         (string) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
        ...
      ],

{% autocrossref %}

*Result*

{% endautocrossref %}

    {
      "version" : n,                    (numeric) The preferred block version
      "rules" : [ "rulename", ... ],    (array of strings) specific block rules that are to be enforced
      "vbavailable" : {                 (json object) set of pending, supported versionbit (BIP 9) softfork deployments
          "rulename" : bitnumber          (numeric) identifies the bit number as indicating acceptance and readiness for the named softfork rule
          ,...
      },
      "vbrequired" : n,                 (numeric) bit mask of versionbits the server requires set in submissions
      "previousblockhash" : "xxxx",     (string) The hash of current highest block
      "transactions" : [                (array) contents of non-coinbase transactions that should be included in the next block
          {
             "data" : "xxxx",             (string) transaction data encoded in hexadecimal (byte-for-byte)
             "txid" : "xxxx",             (string) transaction id encoded in little-endian hexadecimal
             "hash" : "xxxx",             (string) hash encoded in little-endian hexadecimal (including witness data)
             "depends" : [                (array) array of numbers
                 n                          (numeric) transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
                 ,...
             ],
             "fee": n,                    (numeric) difference in value between transaction inputs and outputs (in satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
             "sigops" : n,                (numeric) total SigOps cost, as counted for purposes of block limits; if key is not present, sigop cost is unknown and clients MUST NOT assume it is zero
             "weight" : n,                (numeric) total transaction weight, as counted for purposes of block limits
          }
          ,...
      ],
      "coinbaseaux" : {                 (json object) data that should be included in the coinbase's scriptSig content
          "flags" : "xx"                  (string) key name is to be ignored, and value included in scriptSig
      },
      "coinbasevalue" : n,              (numeric) maximum allowable input to coinbase transaction, including the generation award and transaction fees (in satoshis)
      "coinbasetxn" : { ... },          (json object) information for coinbase transaction
      "target" : "xxxx",                (string) The hash target
      "mintime" : xxx,                  (numeric) The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
      "mutable" : [                     (array of string) list of ways the block template may be changed
         "value"                          (string) A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
         ,...
      ],
      "noncerange" : "00000000ffffffff",(string) A range of valid nonces
      "sigoplimit" : n,                 (numeric) limit of sigops in blocks
      "sizelimit" : n,                  (numeric) limit of block size
      "weightlimit" : n,                (numeric) limit of block weight
      "curtime" : ttt,                  (numeric) current timestamp in seconds since epoch (Jan 1 1970 GMT)
      "bits" : "xxxxxxxx",              (string) compressed target of next block
      "height" : n                      (numeric) The height of the next block
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli getblocktemplate {"rules": ["segwit"]}
{% endhighlight %}

*See also*

* [GetMiningInfo][rpc getmininginfo]: {{summary_getMiningInfo}}
* [SubmitBlock][rpc submitblock]: {{summary_submitBlock}}
* [PrioritiseTransaction][rpc prioritisetransaction]: {{summary_prioritiseTransaction}}

{% endautocrossref %}
