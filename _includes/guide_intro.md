{% autocrossref %}

The Developer Guide aims to provide the information you need to start
building Bitcoin-based applications. To make the best use of this guide,
you may want to install the current version of Bitcoin Core, either from
[source][core git] or from a [pre-compiled executable][core executable].

Once installed, you'll have access to three programs: `bitcoind`,
`bitcoin-qt`, and `bitcoin-cli`.  When run with no arguments, all three
programs default to Bitcoin's main network ([mainnet][mainnet]{:#term-mainnet}{:.term}) which will require
you purchase satoshis in order to generate transactions.

However, for development, it's safer and cheaper to use Bitcoin's test
network ([testnet][testnet]{:#term-testnet}{:.term}) where the satoshis spent have no real-world value.
Testnet also relaxes some restrictions (such as standard transaction
checks) so you can test functions which might currently be disabled by
default on mainnet.  

To use testnet, use the argument `-testnet`<!--noref--> with each program or add
`testnet=1`<!--noref--> to your `bitcoin.conf` file.  To get
free satoshis for testing, use [Piotr Piasecki's testnet faucet][].
Testnet is a public resource provided for free by members of the
community, so please don't abuse it.  

You can speed up development further using the [regression test mode][]
which creates a new testnet local to your computer. This regtest mode
will let you generate blocks almost instantly with a RPC command so you
can generate your own satoshis and add transactions to the block chain
immediately.

* `bitcoin-qt` provides a combination full Bitcoin peer and wallet
  frontend. From the Help menu, you can access a console where you can
  enter the RPC commands used throughout this document.

* `bitcoind` is more useful for programming: it provides a full peer
  which you can interact with through RPCs to port 8332 (or 18332
  for testnet).

* `bitcoin-cli` allows you to send RPC commands to `bitcoind` from the
  command line.  For example, `bitcoin-cli help`

All three programs get settings from `bitcoin.conf` in the `Bitcoin`
application directiory:

* Windows: `%APPDATA%\Bitcoin\`

* OSX: `$HOME/Library/Application Support/Bitcoin/`

* Linux: `$HOME/.bitcoin/`

Questions about Bitcoin development are best sent to the Bitcoin [Forum][forum
tech support] and [IRC channels][]. Errors or suggestions related to
documentation on Bitcoin.org can be [submitted as an issue][docs issue]
or posted to the [bitcoin-documentation mailing list][].

In the following guide, 
some strings have been shortened or wrapped: "[...]" indicates extra data was removed, and lines ending in a single backslash "\\" are continued below.
If you hover your mouse over a paragraph, cross-reference links will be
shown in blue.  If you hover over a cross-reference link, a brief
definition of the term will be displayed in a tooltip.

{% endautocrossref %}
