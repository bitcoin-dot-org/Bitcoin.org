{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/api-intro.md" %}


## Bitcoin Core APIs
<!-- no subhead-links here -->

{% include helpers/subhead-links.md %}

### Hash Byte Order
{% include helpers/subhead-links.md %}

{% autocrossref %}

Bitcoin Core RPCs accept and return the byte-wise reverse of computed
SHA-256 hash values. For example, the Unix `sha256sum` command displays the
SHA256(SHA256()) hash of mainnet block 300,000's header as:

    > /bin/echo -n '020000007ef055e1674d2e6551dba41cd214debbee34aeb544c7ec670000000000000000d3998963f80c5bab43fe8c26228e98d030edf4dcbe48a666f5c39e2d7a885c9102c86d536c890019593a470d' | xxd -r -p | sha256sum -b | xxd -r -p | sha256sum -b
    5472ac8b1187bfcf91d6d218bbda1eb2405d7c55f1f8cc820000000000000000

The result above is also how the hash appears in the
previous-header-hash part of block 300,001's header:

<pre>02000000<b>5472ac8b1187bfcf91d6d218bbda1eb2405d7c55f1f8cc82000\
0000000000000</b>ab0aaa377ca3f49b1545e2ae6b0667a08f42e72d8c24ae\
237140e28f14f3bb7c6bcc6d536c890019edd83ccf</pre>

However, Bitcoin Core's RPCs use the byte-wise reverse for hashes, so if you
want to get information about block 300,000 using the `getblock` RPC,
you need to reverse the requested hash:

    > bitcoin-cli getblock \
      000000000000000082ccf8f1557c5d40b21edabb18d2d691cfbf87118bac7254

(Note: hex representation uses two characters to display each byte of
data, which is why the reversed string looks somewhat mangled.)

The rationale for the reversal is unknown, but it likely stems from
Bitcoin Core's use of hashes (which are byte arrays in C++) as integers
for the purpose of determining whether the hash is below the network
target. Whatever the reason for reversing header hashes, the reversal
also extends to other hashes used in RPCs, such as TXIDs and merkle
roots.

As header hashes and TXIDs are widely used as global identifiers in
other Bitcoin software, this reversal of hashes has become the standard
way to refer to certain objects. The table below should make clear where
each byte order is used.

| Data | Internal Byte Order | RPC Byte Order |
|---------------|---------------------|-----------------|
| Example: SHA256(SHA256(0x00))  | Hash: 1406...539a         | Hash: 9a53...0614     |
| Header Hashes: SHA256(SHA256(block header))  | Used when constructing block headers  | Used by RPCs such as `getblock`; widely used in block explorers |
| Merkle Roots: SHA256(SHA256(TXIDs and merkle rows))  | Used when constructing block headers  | Returned by RPCs such as `getblock` |
| TXIDs: SHA256(SHA256(transaction))  | Used in transaction inputs | Used by RPCs such as `gettransaction` and transaction data parts of `getblock`; widely used in wallet programs |
| P2PKH Hashes: RIPEMD160(SHA256(pubkey))  | Used in both addresses and pubkey scripts  | **N/A:** RPCs use addresses which use internal byte order |
| P2SH Hashes: RIPEMD160(SHA256(redeem script))  | Used in both addresses and pubkey scripts | **N/A:** RPCs use addresses which use internal byte order |

Note: RPCs which return raw results, such as `getrawtransaction` or the
raw mode of `getblock`, always display hashes as they appear in blocks
(internal byte order).

The code below may help you check byte order by generating hashes
from raw hex.
{% endautocrossref %}

{% highlight python %}
#!/usr/bin/env python

from sys import byteorder
from hashlib import sha256

## You can put in $data an 80-byte block header to get its header hash,
## or a raw transaction to get its txid
data = "00".decode("hex")
hash = sha256(sha256(data).digest()).digest()

print "Warning: this code only tested on a little-endian x86_64 arch"
print
print "System byte order:", byteorder
print "Internal-Byte-Order Hash: ", hash.encode('hex_codec')
print "RPC-Byte-Order Hash:      ", hash[::-1].encode('hex_codec')
{% endhighlight %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/intro.md _data/devdocs/en/bitcoin-core/rpcs/intro.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/quick-reference.md _data/devdocs/en/bitcoin-core/rpcs/quick-reference.md %}

#### RPCs
<!-- no subhead-links here -->

{{WARNING}} the block chain and memory pool can include arbitrary data
which several of the commands below will return in hex format. If you
convert this data to another format in an executable context, it could
be used in an exploit. For example, displaying a pubkey script as
ASCII text in a webpage could add arbitrary Javascript to that page and
create a cross-site scripting (XSS) exploit. To avoid problems, please
treat block chain and memory pool data as an arbitrary input from an
untrusted source.

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/abandontransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/abandontransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/abortrescan.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/abortrescan.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/addmultisigaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/addmultisigaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/addnode.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/addnode.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/analyzepsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/analyzepsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/backupwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/backupwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/bumpfee.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/bumpfee.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/clearbanned.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/clearbanned.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/combinepsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/combinepsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/combinerawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/combinerawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/converttopsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/converttopsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/createmultisig.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/createmultisig.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/createpsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/createpsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/createrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/createrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/createwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/createwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/decodepsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/decodepsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/decoderawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/decoderawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/decodescript.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/decodescript.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/deriveaddresses.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/deriveaddresses.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/disconnectnode.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/disconnectnode.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/dumpprivkey.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/dumpprivkey.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/dumpwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/dumpwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/encryptwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/encryptwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/estimatesmartfee.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/estimatesmartfee.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/finalizepsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/finalizepsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/fundrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/fundrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/generate.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/generate.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/generatetoaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/generatetoaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getaddednodeinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getaddednodeinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getaddressesbylabel.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getaddressesbylabel.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getaddressinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getaddressinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getbalance.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getbalance.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getbestblockhash.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getbestblockhash.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockchaininfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockchaininfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockcount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockcount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockhash.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockhash.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockheader.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockheader.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblockstats.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblockstats.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getblocktemplate.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getblocktemplate.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getchaintips.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getchaintips.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getchaintxstats.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getchaintxstats.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getconnectioncount.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getconnectioncount.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getdescriptorinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getdescriptorinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getdifficulty.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getdifficulty.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmemoryinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmemoryinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmempoolancestors.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempoolancestors.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmempooldescendants.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempooldescendants.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmempoolentry.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempoolentry.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmempoolinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmempoolinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getmininginfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getmininginfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnettotals.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnettotals.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnetworkhashps.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnetworkhashps.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnetworkinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnetworkinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnewaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnewaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getnodeaddresses.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getnodeaddresses.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getpeerinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getpeerinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getrawchangeaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getrawchangeaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getrawmempool.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getrawmempool.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getreceivedbyaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getreceivedbyaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getreceivedbylabel.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getreceivedbylabel.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getrpcinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getrpcinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gettransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gettransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gettxout.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxout.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gettxoutproof.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxoutproof.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/gettxoutsetinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/gettxoutsetinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getunconfirmedbalance.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getunconfirmedbalance.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/getwalletinfo.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/getwalletinfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/help.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/help.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importmulti.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importmulti.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importprivkey.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importprivkey.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importprunedfunds.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importprunedfunds.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importpubkey.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importpubkey.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/importwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/importwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/joinpsbts.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/joinpsbts.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/keypoolrefill.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/keypoolrefill.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listaddressgroupings.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listaddressgroupings.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listbanned.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listbanned.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listlabels.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listlabels.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listlockunspent.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listlockunspent.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listreceivedbyaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listreceivedbyaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listreceivedbylabel.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listreceivedbylabel.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listsinceblock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listsinceblock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listtransactions.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listtransactions.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listunspent.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listunspent.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listwalletdir.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listwalletdir.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/listwallets.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/listwallets.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/loadwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/loadwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/lockunspent.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/lockunspent.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/logging.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/logging.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/ping.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/ping.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/preciousblock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/preciousblock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/prioritisetransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/prioritisetransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/pruneblockchain.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/pruneblockchain.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/removeprunedfunds.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/removeprunedfunds.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/rescanblockchain.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/rescanblockchain.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/savemempool.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/savemempool.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/scantxoutset.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/scantxoutset.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/sendmany.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/sendmany.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/sendrawtransaction.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/sendrawtransaction.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/sendtoaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/sendtoaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/setban.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/setban.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/sethdseed.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/sethdseed.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/setlabel.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/setlabel.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/setnetworkactive.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/setnetworkactive.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/settxfee.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/settxfee.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/signmessage.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/signmessage.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/signmessagewithprivkey.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/signmessagewithprivkey.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/signrawtransactionwithkey.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/signrawtransactionwithkey.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/signrawtransactionwithwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/signrawtransactionwithwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/stop.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/stop.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/submitblock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/submitblock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/submitheader.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/submitheader.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/testmempoolaccept.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/testmempoolaccept.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/unloadwallet.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/unloadwallet.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/uptime.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/uptime.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/utxoupdatepsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/utxoupdatepsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/validateaddress.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/validateaddress.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/verifychain.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/verifychain.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/verifymessage.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/verifymessage.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/verifytxoutproof.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/verifytxoutproof.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/walletcreatefundedpsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/walletcreatefundedpsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/walletlock.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/walletlock.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/walletpassphrase.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/walletpassphrase.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/walletpassphrasechange.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rpcs/rpcs/walletprocesspsbt.md _data/devdocs/en/bitcoin-core/rpcs/rpcs/walletprocesspsbt.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/intro.md _data/devdocs/en/bitcoin-core/rest/intro.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/quick-reference.md _data/devdocs/en/bitcoin-core/rest/quick-reference.md %}

#### Requests
<!-- no subhead-links here -->

{{WARNING}} the block chain and memory pool can include arbitrary data
which several of the commands below will return in hex format. If you
convert this data to another format in an executable context, it could
be used in an exploit. For example, displaying a pubkey script as
ASCII text in a webpage could add arbitrary Javascript to that page and
create a cross-site scripting (XSS) exploit. To avoid problems, please
treat block chain and memory pool data as an arbitrary input from an
untrusted source.

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_block.md _data/devdocs/en/bitcoin-core/rest/requests/get_block.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_block-notxdetails.md _data/devdocs/en/bitcoin-core/rest/requests/get_block-notxdetails.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_chaininfo.md _data/devdocs/en/bitcoin-core/rest/requests/get_chaininfo.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_getutxos.md _data/devdocs/en/bitcoin-core/rest/requests/get_getutxos.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_headers.md _data/devdocs/en/bitcoin-core/rest/requests/get_headers.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_mempool-contents.md _data/devdocs/en/bitcoin-core/rest/requests/get_mempool-contents.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_mempool-info.md _data/devdocs/en/bitcoin-core/rest/requests/get_mempool-info.md %}

{% include_absolute _data/devdocs/{{page.lang}}/bitcoin-core/rest/requests/get_tx.md _data/devdocs/en/bitcoin-core/rest/requests/get_tx.md %}
