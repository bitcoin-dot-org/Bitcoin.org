{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/importmulti.md" %}

##### ImportMulti
{% include helpers/subhead-links.md %}

{% assign summary_importMulti="imports addresses or scripts (with private keys, public keys, or P2SH redeem scripts) and optionally performs the minimum necessary rescan for all imports." %}

{% autocrossref %}

*Added in Bitcoin Core 0.14.0*

*Requires wallet support.  Wallet must be unlocked.*

The `importmulti` RPC {{summary_importMulti}}

*Parameter #1---the addresses/scripts to import*

{% itemplate ntpd1 %}
- n: "Imports"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of JSON objects, each one being an address or script to be imported"

- n: "→ Import"
  t: "object"
  p: "Required<br>(1 or more)"
  d: "A JSON object describing a particular import"

- n: "→ →<br>`scriptPubKey`"
  t: "string (hex)"
  p: "Optional<br>(0 or 1)"
  d: "The script (string) to be imported.  Must have either this field or `address` below"

- n: "→ →<br>`address`"
  t: "string (base58)"
  p: "Optional<br>(0 or 1)"
  d: "The P2PKH or P2SH address to be imported.  Must have either this field or `scriptPubKey` above"

- n: "→ →<br>`timestamp`"
  t: "number (int) / string"
  p: "Required<br>(exactly 1)"
  d: "The creation time of the key in Unix epoch time or the string “now” to substitute the current synced block chain time. The timestamp of the oldest key will determine how far back block chain rescans need to begin. Specify `now` to bypass scanning for keys which are known to never have been used.  Specify `0` to scan the entire block chain. Blocks up to 2 hours before the earliest key creation time will be scanned"

- n: "→ →<br>`redeemscript`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "A redeem script. Only allowed if either the `address` field is a P2SH address or the `scriptPubKey` field is a P2SH scriptPubKey"
  
- n: "→ →<br>`pubkeys`"
  t: "array"
  p: "Optional<br>(0 or 1)"
  d: "Array of strings giving pubkeys that must occur in the scriptPubKey or redeemscript"

- n: "→ →<br>`keys`"
  t: "array"
  p: "Optional<br>(0 or 1)"
  d: "Array of strings giving private keys whose corresponding public keys must occur in the scriptPubKey or redeemscript"
  
- n: "→ →<br>`internal`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Stating whether matching outputs should be treated as change rather than incoming payments. The default is `false`"

- n: "→ →<br>`watchonly`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Stating whether matching outputs should be considered watched even when they're not spendable. This is only allowed if keys are empty. The default is `false`"

- n: "→ →<br>`label`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "Label to assign to the address, only allowed with `internal` set to `false`. The default is an empty string (“”)"  

{% enditemplate %}

*Parameter #2---options regarding the import*

{% itemplate ntpd1 %}
- n: "Option"
  t: "object"
  p: "Optional<br>(0 or 1)"
  d: "JSON object with options regarding the import"

- n: "→ <br>`rescan`"
  t: "bool"
  p: "Optional<br>(0 or 1)"
  d: "Set to `true` (the default) to rescan the entire local block chain for transactions affecting any imported address or script. Set to `false` to not rescan after the import. Rescanning may take a considerable amount of time and may require re-downloading blocks if using block chain pruning"

{% enditemplate %}

*Result---execution result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "An array of JSON objects, with each object describing the execution result of each import"
  
- n: "→ Result"
  t: "object"
  p: "Required<br>(1 or more)"
  d: "A JSON object describing the execution result of an imported address or script" 

- n: "→ → <br>`success`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "Displays `true` if the import has been successful or `false` if it failed" 

- n: "→ → <br>`error`"
  t: "string : object"
  p: "Optional<br>(0 or 1)"
  d: "A JSON object containing details about the error. Only displayed if the import fails"
  
- n: "→ → → <br>`code`"
  t: "number (int)"
  p: "Optional<br>(0 or 1)"
  d: "The error code"  
  
- n: "→ → → <br>`message`"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The error message"    

{% enditemplate %}

*Example from Bitcoin Core 0.14.1*

Import the address 1NL9w5fP9kX2D9ToNZPxaiwFJCngNYEYJo (giving it a label and scanning the entire block chain) and the scriptPubKey 76a9149e857da0a5b397559c78c98c9d3f7f655d19c68688ac (giving a specific timestamp and label):

{% highlight bash %}
bitcoin-cli importmulti '
  [
    {
      "scriptPubKey" : { "address": "1NL9w5fP9kX2D9ToNZPxaiwFJCngNYEYJo" },
      "timestamp" : 0,
      "label" : "Personal"
    },
    {
      "scriptPubKey" : "76a9149e857da0a5b397559c78c98c9d3f7f655d19c68688ac",
      "timestamp" : 1493912405,
      "label" : "TestFailure"
    }
  ]' '{ "rescan": true }'
{% endhighlight %}

Result (scriptPubKey import failed because `internal` was not set to `true`):

{% highlight json %}
  [
    {
      "success": true
    }, 
    {
      "success": false,
      "error": {
      "code": -8,
      "message": "Internal must be set for hex scriptPubKey"
      }
    }
  ]
{% endhighlight %}

*See also*

* [ImportPrivKey][rpc importprivkey]: {{summary_importPrivKey}}
* [ImportAddress][rpc importaddress]: {{summary_importAddress}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}

{% endautocrossref %}
