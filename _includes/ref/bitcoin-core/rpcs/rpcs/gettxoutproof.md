{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/gettxoutproof.md" %}

##### GetTxOutProof
{% include helpers/subhead-links.md %}

{% assign summary_getTxOutProof="returns a hex-encoded proof that one or more specified transactions were included in a block." %}

{% autocrossref %}

The `gettxoutproof` RPC {{summary_getTxOutProof}}

NOTE: By default this function only works when there is an
unspent output in the UTXO set for this transaction. To make it always work,
you need to maintain a transaction index, using the `-txindex` command line option, or
specify the block in which the transaction is included in manually (by block header hash).

*Parameter #1---the transaction hashes to prove*

{% itemplate ntpd1 %}
- n: "TXIDs"
  t: "array"
  p: "Required<br>(exactly 1)"
  d: "A JSON array of txids to filter"

- n: "→<br>`txid`"
  t: "string"
  p: "Required<br>(1 or more)"
  d: "TXIDs of the transactions to generate proof for.  All transactions must be in the same block"

{% enditemplate %}

*Parameter #2---the block to look for txids in*

{% itemplate ntpd1 %}
- n: "Header hash"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "If specified, looks for txid in the block with this hash"

{% enditemplate %}

*Result---serialized, hex-encoded data for the proof*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "A string that is a serialized, hex-encoded data for the proof"

{% enditemplate %}

*Example from Bitcoin Core 0.11.0*

Get the hex-encoded proof that "txid" was included in block 0000000000000000140e84bf183d8d5207d65fbfae596bdf48f684d13d951847:

{% highlight bash %}
bitcoin-cli gettxoutproof \
  '''
    [
      "f20e44c818ec332d95119507fbe36f1b8b735e2c387db62adbe28e50f7904683"
    ]
  ''' \
  '0000000000000000140e84bf183d8d5207d65fbfae596bdf48f684d13d951847'
{% endhighlight %}

Result (wrapped):

{% highlight text %}
03000000394ab3f08f712aa0f1d26c5daa4040b50e96d31d4e8e3c130000000000000000\
ca89aaa0bbbfcd5d1210c7888501431256135736817100d8c2cf7e4ab9c02b168115d455\
04dd1418836b20a6cb0800000d3a61beb3859abf1b773d54796c83b0b937968cc4ce3c0f\
71f981b2407a3241cb8908f2a88ac90a2844596e6019450f507e7efb8542cbe54ea55634\
c87bee474ee48aced68179564290d476e16cff01b483edcd2004d555c617dfc08200c083\
08ba511250e459b49d6a465e1ab1d5d8005e0778359c2993236c85ec66bac4bfd974131a\
dc1ee0ad8b645f459164eb38325ac88f98c9607752bc1b637e16814f0d9d8c2775ac3f20\
f85260947929ceef16ead56fcbfd77d9dc6126cce1b5aacd9f834690f7508ee2db2ab67d\
382c5e738b1b6fe3fb079511952d33ec18c8440ef291eb8d3546a971ee4aa5e574b7be7f\
5aff0b1c989b2059ae5a611c8ce5c58e8e8476246c5e7c6b70e0065f2a6654e2e6cf4efb\
6ae19bf2548a7d9febf5b0aceaff28610922e1b9e23e52f650a4a11d2986c9c2b09bb168\
a70a7d4ac16e4d389bc2868ee91da1837d2cd79288bdc680e9c35ebb3ddfd045d69d767b\
164ec69d5db9f995c045d10af5bd90cd9d1116c3732e14796ef9d1a57fa7bb718c07989e\
d06ff359bf2009eaf1b9e000c054b87230567991b447757bc6ca8e1bb6e9816ad604dbd6\
0600
{% endhighlight %}

*See also*

* [VerifyTxOutProof][rpc verifytxoutproof]: {{summary_verifyTxOutProof}}
* [`merkleblock` message][merkleblock message]: A description of the
  format used for the proof.

{% endautocrossref %}
