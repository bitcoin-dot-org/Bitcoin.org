--
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
--

## {% translate examples.transactions.header %}
{% include helpers/subhead-links.md %}

### {% translate examples.transactions.tutorial.header %}
{% include helpers/subhead-links.md %}

{% autocrossref %}
{% translate examples.transactions.tutorial.content %}
{% endautocrossref %}






#### {% translate examples.transactions.simple_spending.header %}
{% include helpers/subhead-links.md %}

{% autocrossref %}

{% translate examples.transactions.simple_spending.content.part_1 %}

{% highlight bash %}
> bitcoin-cli -regtest getnewaddress
mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou

> NEW_ADDRESS=mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou
{% endhighlight %}

{% translate examples.transactions.simple_spending.content.part_2 %}

{% highlight bash %}
> bitcoin-cli -regtest sendtoaddress $NEW_ADDRESS 10.00
263c018582731ff54dc72c7d67e858c002ae298835501d80200f05753de0edf0
{% endhighlight %}

{% translate examples.transactions.simple_spending.content.part_3 %}

{% highlight bash %}
> bitcoin-cli -regtest listunspent
[
]
{% endhighlight %}

{% translate examples.transactions.simple_spending.content.part_4 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest listunspent 0
{% endhighlight %}
{% highlight json %}
[
    {
        "txid" : "263c018582731ff54dc72c7d67e858c002ae298835501d\
                  80200f05753de0edf0",
        "vout" : 0,
        "address" : "muhtvdmsnbQEPFuEmxcChX58fGvXaaUoVt",
        "scriptPubKey" : "76a9149ba386253ea698158b6d34802bb9b550\
                          f5ce36dd88ac",
        "amount" : 40.00000000,
        "confirmations" : 0,
        "spendable" : true,
        "solvable" : true
    },
    {
        "txid" : "263c018582731ff54dc72c7d67e858c002ae298835501d\
                  80200f05753de0edf0",
        "vout" : 1,
        "address" : "mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou",
        "account" : "",
        "scriptPubKey" : "76a914a57414e5ffae9ef5074bacbe10a320bb\
                          2614e1f388ac",
        "amount" : 10.00000000,
        "confirmations" : 0,
        "spendable" : true,
        "solvable" : true
    }
]
{% endhighlight %}
</div>

{% translate examples.transactions.simple_spending.content.part_5 %}

{% highlight bash %}
## Bitcoin Core 0.10.1 and earlier
> bitcoin-cli -regtest setgenerate true 1

## Later versions of Bitcoin Core
> bitcoin-cli -regtest generate 1

> unset NEW_ADDRESS
{% endhighlight %}

{% translate examples.transactions.simple_spending.content.part_6 %}

{% endautocrossref %}






#### {% translate examples.transactions.simple_raw_transaction.header %}
{% include helpers/subhead-links.md %}

{% autocrossref %}

{% translate examples.transactions.simple_raw_transaction.content.part_1 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest listunspent
{% endhighlight %}
{% highlight json %}
[
    {
        "txid" : "263c018582731ff54dc72c7d67e858c002ae298835501d\
                  80200f05753de0edf0",
        "vout" : 0,
        "address" : "muhtvdmsnbQEPFuEmxcChX58fGvXaaUoVt",
        "scriptPubKey" : "76a9149ba386253ea698158b6d34802bb9b550\
                          f5ce36dd88ac",
        "amount" : 40.00000000,
        "confirmations" : 1,
        "spendable" : true,
        "solvable" : true
    },
    {
        "txid" : "263c018582731ff54dc72c7d67e858c002ae298835501d\
                  80200f05753de0edf0",
        "vout" : 1,
        "address" : "mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou",
        "account" : "",
        "scriptPubKey" : "76a914a57414e5ffae9ef5074bacbe10a320bb\
                          2614e1f388ac",
        "amount" : 10.00000000,
        "confirmations" : 1,
        "spendable" : true,
        "solvable" : true
    },
    {
        "txid" : "3f4fa19803dec4d6a84fae3821da7ac7577080ef754512\
                  94e71f9b20e0ab1e7b",
        "vout" : 0,
        "address" : "mwJTL1dZG8BAP6X7Be3CNNcuVKi7Qqt7Gk",
        "scriptPubKey" : "210260a275cccf0f4b106220725be516adba27\
                          52db1bec8c5b7174c89c4c07891f88ac",
        "amount" : 50.00000000,
        "confirmations" : 101,
        "spendable" : true,
        "solvable" : true
    }
]
{% endhighlight %}
{% highlight bash %}
 
> UTXO_TXID=3f4fa19803dec4d6a84fae3821da7ac7577080ef75451294e71f[...]
> UTXO_VOUT=0
{% endhighlight %}
</div>

{% translate examples.transactions.simple_raw_transaction.content.part_2 %}

{% highlight bash %}
> bitcoin-cli -regtest getnewaddress
mz6KvC4aoUeo6wSxtiVQTo7FDwPnkp6URG

> NEW_ADDRESS=mz6KvC4aoUeo6wSxtiVQTo7FDwPnkp6URG
{% endhighlight %}

{% translate examples.transactions.simple_raw_transaction.content.part_3 %}

{% highlight bash %}
## Outputs - inputs = transaction fee, so always double-check your math!
> bitcoin-cli -regtest createrawtransaction '''
    [
      {
        "txid": "'$UTXO_TXID'",
        "vout": '$UTXO_VOUT'
      }
    ]
    ''' '''
    {
      "'$NEW_ADDRESS'": 49.9999
    }'''
01000000017b1eabe0209b1fe794124575ef807057c77ada2138ae4fa8d6c4de\
0398a14f3f0000000000ffffffff01f0ca052a010000001976a914cbc20a7664\
f2f69e5355aa427045bc15e7c6c77288ac00000000

> RAW_TX=01000000017b1eabe0209b1fe794124575ef807057c77ada2138ae4[...]
{% endhighlight %}

{% translate examples.transactions.simple_raw_transaction.content.part_4 %}

![Warning icon](/img/icons/icon_warning.svg)
{% translate examples.transactions.simple_raw_transaction.content.part_5 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest decoderawtransaction $RAW_TX
{% endhighlight %}
{% highlight json %}
{
    "txid" : "c80b343d2ce2b5d829c2de9854c7c8d423c0e33bda264c4013\
              8d834aab4c0638",
    "hash" : "c80b343d2ce2b5d829c2de9854c7c8d423c0e33bda264c40138d834aab4c0638",
    "size" : 85,
    "vsize" : 85,		
    "version" : 1,
    "locktime" : 0,
    "vin" : [
        {
            "txid" : "3f4fa19803dec4d6a84fae3821da7ac7577080ef75\
                      451294e71f9b20e0ab1e7b",
            "vout" : 0,
            "scriptSig" : {
                "asm" : "",
                "hex" : ""
            },
            "sequence" : 4294967295
        }
    ],
    "vout" : [
        {
            "value" : 49.99990000,
            "n" : 0,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 cbc20a7664f2f69e5355a\
                         a427045bc15e7c6c772 OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a914cbc20a7664f2f69e5355aa427045bc15e\
                         7c6c77288ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "mz6KvC4aoUeo6wSxtiVQTo7FDwPnkp6URG"
                ]
            }
        }
    ]
}
{% endhighlight %}
</div>

{% translate examples.transactions.simple_raw_transaction.content.part_6 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest signrawtransaction $RAW_TX
{% endhighlight %}
{% highlight json %}
{
    "hex" : "01000000017b1eabe0209b1fe794124575ef807057c77ada213\
             8ae4fa8d6c4de0398a14f3f00000000494830450221008949f0\
             cb400094ad2b5eb399d59d01c14d73d8fe6e96df1a7150deb38\
             8ab8935022079656090d7f6bac4c9a94e0aad311a4268e082a7\
             25f8aeae0573fb12ff866a5f01ffffffff01f0ca052a0100000\
             01976a914cbc20a7664f2f69e5355aa427045bc15e7c6c77288\
             ac00000000",
    "complete" : true
}
{% endhighlight %}
{% highlight bash %}
 
> SIGNED_RAW_TX=01000000017b1eabe0209b1fe794124575ef807057c77ada[...]
{% endhighlight %}
</div>

{% translate examples.transactions.simple_raw_transaction.content.part_7 %}

{% highlight bash %}
> bitcoin-cli -regtest sendrawtransaction $SIGNED_RAW_TX
c7736a0a0046d5a8cc61c8c3c2821d4d7517f5de2bc66a966011aaa79965ffba
{% endhighlight %}

{% translate examples.transactions.simple_raw_transaction.content.part_8 %}

{% highlight bash %}
## Bitcoin Core 0.10.1 and earlier
> bitcoin-cli -regtest setgenerate true 1

## Later versions of Bitcoin Core
> bitcoin-cli -regtest generate 1

> unset UTXO_TXID UTXO_VOUT NEW_ADDRESS RAW_TX SIGNED_RAW_TX
{% endhighlight %}

{% translate examples.transactions.simple_raw_transaction.content.part_9 %}

{% endautocrossref %}





#### {% translate examples.transactions.complex_raw_transaction.header %}
{% include helpers/subhead-links.md %}

{% autocrossref %}

{% translate examples.transactions.complex_raw_transaction.content.part_1 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest listunspent
{% endhighlight %}
{% highlight json %}
[
    {
        "txid" : "263c018582731ff54dc72c7d67e858c002ae298835501d\
                  80200f05753de0edf0",
        "vout" : 0,
        "address" : "muhtvdmsnbQEPFuEmxcChX58fGvXaaUoVt",
        "scriptPubKey" : "76a9149ba386253ea698158b6d34802bb9b550\
                          f5ce36dd88ac",
        "amount" : 40.00000000,
        "confirmations" : 2,
        "spendable" : true,
        "solvable" : true
    },
    {
        "txid" : "263c018582731ff54dc72c7d67e858c002ae298835501d\
                  80200f05753de0edf0",
        "vout" : 1,
        "address" : "mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou",
        "account" : "",
        "scriptPubKey" : "76a914a57414e5ffae9ef5074bacbe10a320bb\
                          2614e1f388ac",
        "amount" : 10.00000000,
        "confirmations" : 2,
        "spendable" : true,
        "solvable" : true
    },
    {
        "txid" : "78203a8f6b529693759e1917a1b9f05670d036fbb12911\
                  0ed26be6a36de827f3",
        "vout" : 0,
        "address" : "n2KprMQm4z2vmZnPMENfbp2P1LLdAEFRjS",
        "scriptPubKey" : "210229688a74abd0d5ad3b06ddff36fa9cd8ed\
                          d181d97b9489a6adc40431fb56e1d8ac",
        "amount" : 50.00000000,
        "confirmations" : 101,
        "spendable" : true,
        "solvable" : true
    },
    {
        "txid" : "c7736a0a0046d5a8cc61c8c3c2821d4d7517f5de2bc66a\
                  966011aaa79965ffba",
        "vout" : 0,
        "address" : "mz6KvC4aoUeo6wSxtiVQTo7FDwPnkp6URG",
        "account" : "",
        "scriptPubKey" : "76a914cbc20a7664f2f69e5355aa427045bc15\
                          e7c6c77288ac",
        "amount" : 49.99990000,
        "confirmations" : 1,
        "spendable" : true,
        "solvable" : true
    }
]
{% endhighlight %}
{% highlight bash %}
 
> UTXO1_TXID=78203a8f6b529693759e1917a1b9f05670d036fbb129110ed26[...]
> UTXO1_VOUT=0
> UTXO1_ADDRESS=n2KprMQm4z2vmZnPMENfbp2P1LLdAEFRjS
 
> UTXO2_TXID=263c018582731ff54dc72c7d67e858c002ae298835501d80200[...]
> UTXO2_VOUT=0
> UTXO2_ADDRESS=muhtvdmsnbQEPFuEmxcChX58fGvXaaUoVt
{% endhighlight %}
</div>

{% translate examples.transactions.complex_raw_transaction.content.part_2 %}

{% highlight bash %}
> bitcoin-cli -regtest dumpprivkey $UTXO1_ADDRESS
cSp57iWuu5APuzrPGyGc4PGUeCg23PjenZPBPoUs24HtJawccHPm

> bitcoin-cli -regtest dumpprivkey $UTXO2_ADDRESS
cT26DX6Ctco7pxaUptJujRfbMS2PJvdqiSMaGaoSktHyon8kQUSg

> UTXO1_PRIVATE_KEY=cSp57iWuu5APuzrPGyGc4PGUeCg23PjenZPBPoUs24Ht[...]

> UTXO2_PRIVATE_KEY=cT26DX6Ctco7pxaUptJujRfbMS2PJvdqiSMaGaoSktHy[...]
{% endhighlight %}

{% translate examples.transactions.complex_raw_transaction.content.part_3 %}

![Warning icon](/img/icons/icon_warning.svg)
{% translate examples.transactions.complex_raw_transaction.content.part_4 %}

{% highlight bash %}
> bitcoin-cli -regtest getnewaddress
n4puhBEeEWD2VvjdRC9kQuX2abKxSCMNqN
> bitcoin-cli -regtest getnewaddress
n4LWXU59yM5MzQev7Jx7VNeq1BqZ85ZbLj

> NEW_ADDRESS1=n4puhBEeEWD2VvjdRC9kQuX2abKxSCMNqN
> NEW_ADDRESS2=n4LWXU59yM5MzQev7Jx7VNeq1BqZ85ZbLj
{% endhighlight %}

{% translate examples.transactions.complex_raw_transaction.content.part_5 %}

{% highlight bash %}
## Outputs - inputs = transaction fee, so always double-check your math!
> bitcoin-cli -regtest createrawtransaction '''
    [
      {
        "txid": "'$UTXO1_TXID'", 
        "vout": '$UTXO1_VOUT'
      }, 
      {
        "txid": "'$UTXO2_TXID'",
        "vout": '$UTXO2_VOUT'
      }
    ]
    ''' '''
    {
      "'$NEW_ADDRESS1'": 79.9999, 
      "'$NEW_ADDRESS2'": 10 
    }'''
0100000002f327e86da3e66bd20e1129b1fb36d07056f0b9a117199e75939652\
6b8f3a20780000000000fffffffff0ede03d75050f20801d50358829ae02c058\
e8677d2cc74df51f738285013c260000000000ffffffff02f028d6dc01000000\
1976a914ffb035781c3c69e076d48b60c3d38592e7ce06a788ac00ca9a3b0000\
00001976a914fa5139067622fd7e1e722a05c17c2bb7d5fd6df088ac00000000

> RAW_TX=0100000002f327e86da3e66bd20e1129b1fb36d07056f0b9a117199[...]
{% endhighlight %}

{% translate examples.transactions.complex_raw_transaction.content.part_6 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest signrawtransaction $RAW_TX '[]' '''
    [
      "'$UTXO1_PRIVATE_KEY'"
    ]'''
{% endhighlight %}
{% highlight json %}
{
    "hex" : "0100000002f327e86da3e66bd20e1129b1fb36d07056f0b9a11\
             7199e759396526b8f3a20780000000049483045022100fce442\
             ec52aa2792efc27fd3ad0eaf7fa69f097fdcefab017ea56d179\
             9b10b2102207a6ae3eb61e11ffaba0453f173d1792f1b7bb8e7\
             422ea945101d68535c4b474801fffffffff0ede03d75050f208\
             01d50358829ae02c058e8677d2cc74df51f738285013c260000\
             000000ffffffff02f028d6dc010000001976a914ffb035781c3\
             c69e076d48b60c3d38592e7ce06a788ac00ca9a3b0000000019\
             76a914fa5139067622fd7e1e722a05c17c2bb7d5fd6df088ac0\
             0000000",
    "complete" : false
    "errors": [
    {
      "txid": "c53f8f5ac0b6b10cdc77f543718eb3880fee6cf9b5e0cbf4edb2a59c0fae09a4",
      "vout": 0,
      "scriptSig": "",
      "sequence": 4294967295,
      "error": "Operation not valid with the current stack size"
    }
  ]
}
{% endhighlight %}
{% highlight bash %}
 
> PARTLY_SIGNED_RAW_TX=0100000002f327e86da3e66bd20e1129b1fb36d07[...]
{% endhighlight %}
</div>

{% translate examples.transactions.complex_raw_transaction.content.part_7 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest signrawtransaction $PARTLY_SIGNED_RAW_TX '[]' '''
    [
      "'$UTXO2_PRIVATE_KEY'"
    ]'''
{% endhighlight %}
{% highlight json %}
{
    "hex" : "0100000002f327e86da3e66bd20e1129b1fb36d07056f0b9a11\
             7199e759396526b8f3a20780000000049483045022100fce442\
             ec52aa2792efc27fd3ad0eaf7fa69f097fdcefab017ea56d179\
             9b10b2102207a6ae3eb61e11ffaba0453f173d1792f1b7bb8e7\
             422ea945101d68535c4b474801fffffffff0ede03d75050f208\
             01d50358829ae02c058e8677d2cc74df51f738285013c260000\
             00006b483045022100b77f935ff366a6f3c2fdeb83589c79026\
             5d43b3d2cf5e5f0047da56c36de75f40220707ceda75d8dcf2c\
             caebc506f7293c3dcb910554560763d7659fb202f8ec324b012\
             102240d7d3c7aad57b68aa0178f4c56f997d1bfab2ded3c2f94\
             27686017c603a6d6ffffffff02f028d6dc010000001976a914f\
             fb035781c3c69e076d48b60c3d38592e7ce06a788ac00ca9a3b\
             000000001976a914fa5139067622fd7e1e722a05c17c2bb7d5f\
             d6df088ac00000000",
    "complete" : true
}
{% endhighlight %}
</div>

{% translate examples.transactions.complex_raw_transaction.content.part_8 %}

{% highlight bash %}
> unset PARTLY_SIGNED_RAW_TX RAW_TX NEW_ADDRESS1 [...]
{% endhighlight %}

{% translate examples.transactions.complex_raw_transaction.content.part_9 %}

{% endautocrossref %}





#### {% translate examples.transactions.offline_signing.header %}
{% include helpers/subhead-links.md %}

{% autocrossref %}

{% translate examples.transactions.offline_signing.content.part_1 %}

![Warning icon](/img/icons/icon_warning.svg)
{% translate examples.transactions.offline_signing.content.part_2 %}

{% highlight bash %}
> OLD_SIGNED_RAW_TX=0100000002f327e86da3e66bd20e1129b1fb36d07056\
      f0b9a117199e759396526b8f3a20780000000049483045022100fce442\
      ec52aa2792efc27fd3ad0eaf7fa69f097fdcefab017ea56d1799b10b21\
      02207a6ae3eb61e11ffaba0453f173d1792f1b7bb8e7422ea945101d68\
      535c4b474801fffffffff0ede03d75050f20801d50358829ae02c058e8\
      677d2cc74df51f738285013c26000000006b483045022100b77f935ff3\
      66a6f3c2fdeb83589c790265d43b3d2cf5e5f0047da56c36de75f40220\
      707ceda75d8dcf2ccaebc506f7293c3dcb910554560763d7659fb202f8\
      ec324b012102240d7d3c7aad57b68aa0178f4c56f997d1bfab2ded3c2f\
      9427686017c603a6d6ffffffff02f028d6dc010000001976a914ffb035\
      781c3c69e076d48b60c3d38592e7ce06a788ac00ca9a3b000000001976\
      a914fa5139067622fd7e1e722a05c17c2bb7d5fd6df088ac00000000
{% endhighlight %}

{% translate examples.transactions.offline_signing.content.part_3 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest decoderawtransaction $OLD_SIGNED_RAW_TX
{% endhighlight %}
{% highlight json %}
{
    "txid" : "682cad881df69cb9df8f0c996ce96ecad758357ded2da03bad\
              40cf18ffbb8e09",
    "hash" : "682cad881df69cb9df8f0c996ce96ecad758357ded2da03bad40cf18ffbb8e09",
    "size" : 340,
    "vsize" : 340,
    "version" : 1,
    "locktime" : 0,
    "vin" : [
        {
            "txid" : "78203a8f6b529693759e1917a1b9f05670d036fbb1\
                      29110ed26be6a36de827f3",
            "vout" : 0,
            "scriptSig" : {
                "asm" : "3045022100fce442ec52aa2792efc27fd3ad0ea\
                         f7fa69f097fdcefab017ea56d1799b10b210220\
                         7a6ae3eb61e11ffaba0453f173d1792f1b7bb8e\
                         7422ea945101d68535c4b474801",
                "hex" : "483045022100FCE442ec52aa2792efc27fd3ad0\
                         eaf7fa69f097fdcefab017ea56d1799b10b2102\
                         207a6ae3eb61e11ffaba0453f173d1792f1b7bb\
                         8e7422ea945101d68535c4b474801"
            },
            "sequence" : 4294967295
        },
        {
            "txid" : "263c018582731ff54dc72c7d67e858c002ae298835\
                      501d80200f05753de0edf0",
            "vout" : 0,
            "scriptSig" : {
                "asm" : "3045022100b77f935ff366a6f3c2fdeb83589c7\
                         90265d43b3d2cf5e5f0047da56c36de75f40220\
                         707ceda75d8dcf2ccaebc506f7293c3dcb91055\
                         4560763d7659fb202f8ec324b01
                         02240d7d3c7aad57b68aa0178f4c56f997d1bfa\
                         b2ded3c2f9427686017c603a6d6",
                "hex" : "483045022100b77f935ff366a6f3c2fdeb83589\
                         c790265d43b3d2cf5e5f0047da56c36de75f402\
                         20707ceda75d8dcf2ccaebc506f7293c3dcb910\
                         554560763d7659fb202f8ec324b012102240d7d\
                         3c7aad57b68aa0178f4c56f997d1bfab2ded3c2\
                         f9427686017c603a6d6"
            },
            "sequence" : 4294967295
        }
    ],
    "vout" : [
        {
            "value" : 79.99990000,
            "n" : 0,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 ffb035781c3c69e076d48\
                         b60c3d38592e7ce06a7 OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a914ffb035781c3c69e076d48b60c3d38592e\
                         7ce06a788ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "n4puhBEeEWD2VvjdRC9kQuX2abKxSCMNqN"
                ]
            }
        },
        {
            "value" : 10.00000000,
            "n" : 1,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 fa5139067622fd7e1e722\
                         a05c17c2bb7d5fd6df0 OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a914fa5139067622fd7e1e722a05c17c2bb7d\
                         5fd6df088ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "n4LWXU59yM5MzQev7Jx7VNeq1BqZ85ZbLj"
                ]
            }
        }
    ]
}
{% endhighlight %}
{% highlight bash %}
 
> UTXO_TXID=682cad881df69cb9df8f0c996ce96ecad758357ded2da03bad40[...]
> UTXO_VOUT=1
> UTXO_OUTPUT_SCRIPT=76a914fa5139067622fd7e1e722a05c17c2bb7d5fd6[...]
{% endhighlight %}
</div>


{% translate examples.transactions.offline_signing.content.part_4 %}


{% highlight bash %}
> bitcoin-cli -regtest getnewaddress
mfdCHEFL2tW9eEUpizk7XLZJcnFM4hrp78

> NEW_ADDRESS=mfdCHEFL2tW9eEUpizk7XLZJcnFM4hrp78
{% endhighlight %}

{% translate examples.transactions.offline_signing.content.part_5 %}


{% highlight bash %}
## Outputs - inputs = transaction fee, so always double-check your math!
> bitcoin-cli -regtest createrawtransaction '''
    [
      {
        "txid": "'$UTXO_TXID'",
        "vout": '$UTXO_VOUT'
      }
    ]
    ''' '''
    {
      "'$NEW_ADDRESS'": 9.9999
    }'''
0100000001098ebbff18cf40ad3ba02ded7d3558d7ca6ee96c990c8fdfb99cf6\
1d88ad2c680100000000ffffffff01f0a29a3b000000001976a914012e2ba6a0\
51c033b03d712ca2ea00a35eac1e7988ac00000000

> RAW_TX=0100000001098ebbff18cf40ad3ba02ded7d3558d7ca6ee96c990c8[...]
{% endhighlight %}

{% translate examples.transactions.offline_signing.content.part_6 %}

<div markdown="1" class="multicode">
{% highlight bash %}
    > bitcoin-cli -regtest signrawtransaction $RAW_TX
{% endhighlight %}
{% highlight json %}
    {
        "hex" : "0100000001098ebbff18cf40ad3ba02ded7d3558d7ca6ee\
                 96c990c8fdfb99cf61d88ad2c680100000000ffffffff01\
                 f0a29a3b000000001976a914012e2ba6a051c033b03d712\
                 ca2ea00a35eac1e7988ac00000000",
        "complete" : false
    }
{% endhighlight %}
</div>

{% translate examples.transactions.offline_signing.content.part_7 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest signrawtransaction $RAW_TX '''
    [
      {
        "txid": "'$UTXO_TXID'", 
        "vout": '$UTXO_VOUT', 
        "scriptPubKey": "'$UTXO_OUTPUT_SCRIPT'"
      }
    ]'''
{% endhighlight %}
{% highlight json %}
{
    "hex" : "0100000001098ebbff18cf40ad3ba02ded7d3558d7ca6ee96c9\
             90c8fdfb99cf61d88ad2c68010000006b483045022100c3f92f\
             b74bfa687d76ebe75a654510bb291b8aab6f89ded4fe26777c2\
             eb233ad02207f779ce2a181cc4055cb0362aba7fd7a6f72d5db\
             b9bd863f4faaf47d8d6c4b500121028e4e62d25760709806131\
             b014e2572f7590e70be01f0ef16bfbd51ea5f389d4dffffffff\
             01f0a29a3b000000001976a914012e2ba6a051c033b03d712ca\
             2ea00a35eac1e7988ac00000000",
    "complete" : true
}
{% endhighlight %}
{% highlight bash %}
 
> SIGNED_RAW_TX=0100000001098ebbff18cf40ad3ba02ded7d3558d7ca6ee9[...]
{% endhighlight %}
</div>

{% translate examples.transactions.offline_signing.content.part_8 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest sendrawtransaction $SIGNED_RAW_TX
{% endhighlight %}
{% highlight json %}
error: {"code":-22,"message":"TX rejected"}
{% endhighlight %}
</div>

{% translate examples.transactions.offline_signing.content.part_9 %}


{% highlight bash %}
> bitcoin-cli -regtest sendrawtransaction $OLD_SIGNED_RAW_TX
682cad881df69cb9df8f0c996ce96ecad758357ded2da03bad40cf18ffbb8e09
> bitcoin-cli -regtest sendrawtransaction $SIGNED_RAW_TX
67d53afa1a8167ca093d30be7fb9dcb8a64a5fdecacec9d93396330c47052c57
{% endhighlight %}

{% translate examples.transactions.offline_signing.content.part_10 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest getrawmempool
{% endhighlight %}
{% highlight json %}
[
    "67d53afa1a8167ca093d30be7fb9dcb8a64a5fdecacec9d93396330c47052c57",
    "682cad881df69cb9df8f0c996ce96ecad758357ded2da03bad40cf18ffbb8e09"
]
{% endhighlight %}
</div>

{% translate examples.transactions.offline_signing.content.part_11 %}


{% highlight bash %}
> unset OLD_SIGNED_RAW_TX SIGNED_RAW_TX RAW_TX [...]
{% endhighlight %}

Remove old shell variables. 

{% endautocrossref %}






#### {% translate examples.transactions.p2sh_multisig.header %}
{% include helpers/subhead-links.md %}

{% autocrossref %}

{% translate examples.transactions.p2sh_multisig.content.part_1 %}


{% highlight bash %}
    > bitcoin-cli -regtest getnewaddress
    mhAXF4Eq7iRyvbYk1mpDVBiGdLP3YbY6Dm
    > bitcoin-cli -regtest getnewaddress
    moaCrnRfP5zzyhW8k65f6Rf2z5QpvJzSKe
    > bitcoin-cli -regtest getnewaddress
    mk2QpYatsKicvFVuTAQLBryyccRXMUaGHP

    > NEW_ADDRESS1=mhAXF4Eq7iRyvbYk1mpDVBiGdLP3YbY6Dm
    > NEW_ADDRESS2=moaCrnRfP5zzyhW8k65f6Rf2z5QpvJzSKe
    > NEW_ADDRESS3=mk2QpYatsKicvFVuTAQLBryyccRXMUaGHP
{% endhighlight %}

{% translate examples.transactions.p2sh_multisig.content.part_2 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest validateaddress $NEW_ADDRESS3
{% endhighlight %}
{% highlight json %}
{
    "isvalid" : true,
    "address" : "mk2QpYatsKicvFVuTAQLBryyccRXMUaGHP",
    "scriptPubKey" : "76a9143172b5654f6683c8fb146959d347ce303cae4ca788ac",
    "ismine" : true,
    "iswatchonly" : false,
    "isscript" : false,
    "pubkey" : "029e03a901b85534ff1e92c43c74431f7ce72046060fcf7a\
                95c37e148f78c77255",
    "iscompressed" : true,
    "account" : ""
}
{% endhighlight %}
{% highlight bash %}
 
> NEW_ADDRESS3_PUBLIC_KEY=029e03a901b85534ff1e92c43c74431f7ce720[...]
{% endhighlight %}
</div>

{% translate examples.transactions.p2sh_multisig.content.part_3 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest createmultisig 2 '''
    [
      "'$NEW_ADDRESS1'",
      "'$NEW_ADDRESS2'", 
      "'$NEW_ADDRESS3_PUBLIC_KEY'"
    ]'''
{% endhighlight %}
{% highlight json %}
{
    "address" : "2N7NaqSKYQUeM8VNgBy8D9xQQbiA8yiJayk",
    "redeemScript" : "522103310188e911026cf18c3ce274e0ebb5f95b00\
    7f230d8cb7d09879d96dbeab1aff210243930746e6ed6552e03359db521b\
    088134652905bd2d1541fa9124303a41e95621029e03a901b85534ff1e92\
    c43c74431f7ce72046060fcf7a95c37e148f78c7725553ae"
}
{% endhighlight %}
{% highlight bash %}
 
> P2SH_ADDRESS=2N7NaqSKYQUeM8VNgBy8D9xQQbiA8yiJayk
> P2SH_REDEEM_SCRIPT=522103310188e911026cf18c3ce274e0ebb5f95b007[...]
{% endhighlight %}
</div>

{% translate examples.transactions.p2sh_multisig.content.part_4 %}


{% highlight bash %}
> bitcoin-cli -regtest sendtoaddress $P2SH_ADDRESS 10.00
7278d7d030f042ebe633732b512bcb31fff14a697675a1fe1884db139876e175

> UTXO_TXID=7278d7d030f042ebe633732b512bcb31fff14a697675a1fe1884[...]
{% endhighlight %}

{% translate examples.transactions.p2sh_multisig.content.part_5 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest getrawtransaction $UTXO_TXID 1
{% endhighlight %}
{% highlight json %}
{
    "hex" : "0100000001f0ede03d75050f20801d50358829ae02c058e8677\
             d2cc74df51f738285013c26010000006a47304402203c375959\
             2bf608ab79c01596c4a417f3110dd6eb776270337e575cdafc6\
             99af20220317ef140d596cc255a4067df8125db7f349ad94521\
             2e9264a87fa8d777151937012102a92913b70f9fb15a7ea5c42\
             df44637f0de26e2dad97d6d54957690b94cf2cd05ffffffff01\
             00ca9a3b0000000017a9149af61346ce0aa2dffcf697352b4b7\
             04c84dcbaff8700000000",
    "txid" : "7278d7d030f042ebe633732b512bcb31fff14a697675a1fe18\
              84db139876e175",
    "hash" : "7278d7d030f042ebe633732b512bcb31fff14a697675a1fe1884db139876e175",
    "size" : 189,
    "vsize" : 189,
    "version" : 1,
    "locktime" : 0,
    "vin" : [
        {
            "txid" : "263c018582731ff54dc72c7d67e858c002ae298835\
                      501d80200f05753de0edf0",
            "vout" : 1,
            "scriptSig" : {
                "asm" : "304402203c3759592bf608ab79c01596c4a417f\
                         3110dd6eb776270337e575cdafc699af2022031\
                         7ef140d596cc255a4067df8125db7f349ad9452\
                         12e9264a87fa8d77715193701
                         02a92913b70f9fb15a7ea5c42df44637f0de26e\
                         2dad97d6d54957690b94cf2cd05",
                "hex" : "47304402203c3759592bf608ab79c01596c4a41\
                         7f3110dd6eb776270337e575cdafc699af20220\
                         317ef140d596cc255a4067df8125db7f349ad94\
                         5212e9264a87fa8d777151937012102a92913b7\
                         0f9fb15a7ea5c42df44637f0de26e2dad97d6d5\
                         4957690b94cf2cd05"
            },
            "sequence" : 4294967295
        }
    ],
    "vout" : [
        {
            "value" : 10.00000000,
            "n" : 0,
            "scriptPubKey" : {
                "asm" : "OP_HASH160 9af61346ce0aa2dffcf697352b4b\
                704c84dcbaff OP_EQUAL",
                "hex" : "a9149af61346ce0aa2dffcf697352b4b704c84d\
                         cbaff87",
                "reqSigs" : 1,
                "type" : "scripthash",
                "addresses" : [
                    "2N7NaqSKYQUeM8VNgBy8D9xQQbiA8yiJayk"
                ]
            }
        }
    ]
}
{% endhighlight %}
{% highlight bash %}
 
> UTXO_VOUT=0
> UTXO_OUTPUT_SCRIPT=a9149af61346ce0aa2dffcf697352b4b704c84dcbaff87
{% endhighlight %}
</div>

{% translate examples.transactions.p2sh_multisig.content.part_6 %}


{% highlight bash %}
> bitcoin-cli -regtest getnewaddress
mxCNLtKxzgjg8yyNHeuFSXvxCvagkWdfGU

> NEW_ADDRESS4=mxCNLtKxzgjg8yyNHeuFSXvxCvagkWdfGU
{% endhighlight %}

{% translate examples.transactions.p2sh_multisig.content.part_7 %}


{% highlight bash %}
## Outputs - inputs = transaction fee, so always double-check your math!
> bitcoin-cli -regtest createrawtransaction '''
    [
      {
        "txid": "'$UTXO_TXID'",
        "vout": '$UTXO_VOUT'
      }
   ]
   ''' '''
   {
     "'$NEW_ADDRESS4'": 9.998
   }'''

010000000175e1769813db8418fea17576694af1ff31cb2b512b7333e6eb42f0\
30d0d778720000000000ffffffff01c0bc973b000000001976a914b6f64f5bf3\
e38f25ead28817df7929c06fe847ee88ac00000000

> RAW_TX=010000000175e1769813db8418fea17576694af1ff31cb2b512b733[...]
{% endhighlight %}

{% translate examples.transactions.p2sh_multisig.content.part_8 %}


{% highlight bash %}
> bitcoin-cli -regtest dumpprivkey $NEW_ADDRESS1
cVinshabsALz5Wg4tGDiBuqEGq4i6WCKWXRQdM8RFxLbALvNSHw7
> bitcoin-cli -regtest dumpprivkey $NEW_ADDRESS3
cNmbnwwGzEghMMe1vBwH34DFHShEj5bcXD1QpFRPHgG9Mj1xc5hq

> NEW_ADDRESS1_PRIVATE_KEY=cVinshabsALz5Wg4tGDiBuqEGq4i6WCKWXRQd[...]
> NEW_ADDRESS3_PRIVATE_KEY=cNmbnwwGzEghMMe1vBwH34DFHShEj5bcXD1Qp[...]
{% endhighlight %}

{% translate examples.transactions.p2sh_multisig.content.part_9 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest signrawtransaction $RAW_TX '''
    [
      {
        "txid": "'$UTXO_TXID'", 
        "vout": '$UTXO_VOUT', 
        "scriptPubKey": "'$UTXO_OUTPUT_SCRIPT'", 
        "redeemScript": "'$P2SH_REDEEM_SCRIPT'"
      }
    ]
    ''' '''
    [
      "'$NEW_ADDRESS1_PRIVATE_KEY'"
    ]'''
{% endhighlight %}
{% highlight json %}
{
    "hex" : "010000000175e1769813db8418fea17576694af1ff31cb2b512\
             b7333e6eb42f030d0d7787200000000b5004830450221008d5e\
             c57d362ff6ef6602e4e756ef1bdeee12bd5c5c72697ef1455b3\
             79c90531002202ef3ea04dfbeda043395e5bc701e4878c15baa\
             b9c6ba5808eb3d04c91f641a0c014c69522103310188e911026\
             cf18c3ce274e0ebb5f95b007f230d8cb7d09879d96dbeab1aff\
             210243930746e6ed6552e03359db521b088134652905bd2d154\
             1fa9124303a41e95621029e03a901b85534ff1e92c43c74431f\
             7ce72046060fcf7a95c37e148f78c7725553aeffffffff01c0b\
             c973b000000001976a914b6f64f5bf3e38f25ead28817df7929\
             c06fe847ee88ac00000000",
    "complete" : false
}
{% endhighlight %}
{% highlight bash %}
 
> PARTLY_SIGNED_RAW_TX=010000000175e1769813db8418fea17576694af1f[...]
{% endhighlight %}
</div>

{% translate examples.transactions.p2sh_multisig.content.part_10 %}

<div markdown="1" class="multicode">
{% highlight bash %}
> bitcoin-cli -regtest signrawtransaction $PARTLY_SIGNED_RAW_TX '''
    [
      {
        "txid": "'$UTXO_TXID'",
        "vout": '$UTXO_VOUT',
        "scriptPubKey": "'$UTXO_OUTPUT_SCRIPT'", 
        "redeemScript": "'$P2SH_REDEEM_SCRIPT'"
      }
    ]
    ''' '''
    [
      "'$NEW_ADDRESS3_PRIVATE_KEY'"
    ]'''
{% endhighlight %}
{% highlight json %}
{
    "hex" : "010000000175e1769813db8418fea17576694af1ff31cb2b512\
             b7333e6eb42f030d0d7787200000000fdfd0000483045022100\
             8d5ec57d362ff6ef6602e4e756ef1bdeee12bd5c5c72697ef14\
             55b379c90531002202ef3ea04dfbeda043395e5bc701e4878c1\
             5baab9c6ba5808eb3d04c91f641a0c0147304402200bd8c62b9\
             38e02094021e481b149fd5e366a212cb823187149799a68cfa7\
             652002203b52120c5cf25ceab5f0a6b5cdb8eca0fd2f386316c\
             9721177b75ddca82a4ae8014c69522103310188e911026cf18c\
             3ce274e0ebb5f95b007f230d8cb7d09879d96dbeab1aff21024\
             3930746e6ed6552e03359db521b088134652905bd2d1541fa91\
             24303a41e95621029e03a901b85534ff1e92c43c74431f7ce72\
             046060fcf7a95c37e148f78c7725553aeffffffff01c0bc973b\
             000000001976a914b6f64f5bf3e38f25ead28817df7929c06fe\
             847ee88ac00000000",
    "complete" : true
}
{% endhighlight %}
{% highlight bash %}
 
> SIGNED_RAW_TX=010000000175e1769813db8418fea17576694af1ff31cb2b[...]
{% endhighlight %}
</div>

{% translate examples.transactions.p2sh_multisig.content.part_11 %}


{% highlight bash %}
> bitcoin-cli -regtest sendrawtransaction $SIGNED_RAW_TX
430a4cee3a55efb04cbb8718713cab18dea7f2521039aa660ffb5aae14ff3f50
{% endhighlight %}

{% translate examples.transactions.p2sh_multisig.content.part_12 %}


{% endautocrossref %}
