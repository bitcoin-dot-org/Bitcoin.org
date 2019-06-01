{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/importmulti.md" %}

##### ImportMulti
{% include helpers/subhead-links.md %}

{% assign summary_importMulti="import addresses/scripts (with private or public keys, redeem script (P2SH)), optionally rescanning the blockchain from the earliest creation time of the imported scripts." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

The `importmulti` RPC {{summary_importMulti}}

Requires a new wallet backup.

If an address/script is imported without all of the private keys required to spend from that address, it will be watchonly. The 'watchonly' option must be set to true in this case or a warning will be returned.

Conversely, if all the private keys are provided and the address/script is spendable, the watchonly option must be set to false, or a warning will be returned.

Note: This call can take over an hour to complete if rescan is true, during that time, other rpc calls
may report that the imported keys, addresses or scripts exists but related transactions are still missing.

*Parameter #1---requests*

{% itemplate ntpd1 %}
- n: "requests"
  t: "json array"
  p: "Required<br>(exactly 1)"
  d: "Data to be imported
       \"range\": n or [n,n],                                       (numeric or array) If a ranged descriptor is used, this specifies the end or the range (in the form [begin,end]) to import
       \"internal\": bool,                                          (boolean, optional, default=false) Stating whether matching outputs should be treated as not incoming payments (also known as change)
       \"watchonly\": bool,                                         (boolean, optional, default=false) Stating whether matching outputs should be considered watchonly.
       \"label\": \"str\",                                            (string, optional, default='') Label to assign to the address, only allowed with internal=false
       \"keypool\": bool,                                           (boolean, optional, default=false) Stating whether imported public keys should be added to the keypool for when users request new addresses. Only allowed when wallet private keys are disabled
       },
       ...
       ]"

{% enditemplate %}

{% endautocrossref %}

    [
      {                                                            (json object)
        "desc": "str",                                             (string) Descriptor to import. If using descriptor, do not also provide address/scriptPubKey, scripts, or pubkeys
        "scriptPubKey": "<script>" | { "address":"<address>" },    (string / json, required) Type of scriptPubKey (string for script, json for address). Should not be provided if using a descriptor
        "timestamp": timestamp | "now",                            (integer / string, required) Creation time of the key in seconds since epoch (Jan 1 1970 GMT),
                                                                   or the string "now" to substitute the current synced blockchain time. The timestamp of the oldest
                                                                   key will determine how far back blockchain rescans need to begin for missing wallet transactions.
                                                                   "now" can be specified to bypass scanning, for keys which are known to never have been used, and
                                                                   0 can be specified to scan the entire blockchain. Blocks up to 2 hours before the earliest key
                                                                   creation time of all keys being imported by the importmulti call will be scanned.
        "redeemscript": "str",                                     (string) Allowed only if the scriptPubKey is a P2SH or P2SH-P2WSH address/scriptPubKey
        "witnessscript": "str",                                    (string) Allowed only if the scriptPubKey is a P2SH-P2WSH or P2WSH address/scriptPubKey
        "pubkeys": [                                               (json array, optional, default=empty array) Array of strings giving pubkeys to import. They must occur in P2PKH or P2WPKH scripts. They are not required when the private key is also provided (see the "keys" argument).
          "pubKey",                                                (string)
          ...
        ],
        "keys": [                                                  (json array, optional, default=empty array) Array of strings giving private keys to import. The corresponding public keys must occur in the output or redeemscript.
          "key",                                                   (string)
          ...
        ],

{% autocrossref %}

*Parameter #2---options*

{% itemplate ntpd1 %}
- n: "options"
  t: "json object"
  p: "Optional"
  d: ""

{% enditemplate %}

{% endautocrossref %}

    {
      "rescan": bool,                                              (boolean, optional, default=true) Stating if should rescan the blockchain after all imports
    }

{% autocrossref %}

*Result*

{% endautocrossref %}

    Response is an array with the same size as the input that has the execution result :

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli importmulti '[{ "scriptPubKey": { "address": "<my address>" }, "timestamp":1455191478 }, { "scriptPubKey": { "address": "<my 2nd address>" }, "label": "example 2", "timestamp": 1455191480 }]'
{% endhighlight %}
{% highlight bash %}
bitcoin-cli importmulti '[{ "scriptPubKey": { "address": "<my address>" }, "timestamp":1455191478 }]' '{ "rescan": false}'
{% endhighlight %}

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [ImportAddress][rpc importaddress]: {{summary_importAddress}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}

{% endautocrossref %}
