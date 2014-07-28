{% autocrossref %}

The following guide aims to provide examples to help you start
building Bitcoin-based applications. To make the best use of this document,
you may want to install the current version of Bitcoin Core, either from
[source][core git] or from a [pre-compiled executable][core executable].

Once installed, you'll have access to three programs: `bitcoind`,
`bitcoin-qt`, and `bitcoin-cli`.

* `bitcoin-qt` provides a combination full Bitcoin peer and wallet
  frontend. From the Help menu, you can access a console where you can
  enter the RPC commands used throughout this document.

* `bitcoind` is more useful for programming: it provides a full peer
  which you can interact with through RPCs to port 8332 (or 18332
  for testnet).

* `bitcoin-cli` allows you to send RPC commands to `bitcoind` from the
  command line.  For example, `bitcoin-cli help`

All three programs get settings from `bitcoin.conf` in the `Bitcoin`
application directory:

* Windows: `%APPDATA%\Bitcoin\`

* OSX: `$HOME/Library/Application Support/Bitcoin/`

* Linux: `$HOME/.bitcoin/`

For development, it's safer and cheaper to use Bitcoin's test network (testnet)
or regression test mode (regtest) described below.

Questions about Bitcoin development are best sent to the Bitcoin [Forum][forum
tech support] and [IRC channels][]. Errors or suggestions related to
documentation on Bitcoin.org can be [submitted as an issue][docs issue]
or posted to the [bitcoin-documentation mailing list][].

In the following documentation, some strings have been shortened or wrapped: "[...]"
indicates extra data was removed, and lines ending in a single backslash "\\"
are continued below. If you hover your mouse over a paragraph, cross-reference
links will be shown in blue.  If you hover over a cross-reference link, a brief
definition of the term will be displayed in a tooltip.

{% endautocrossref %}
