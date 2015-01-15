---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: full-node
title: "Running A Full Node - Bitcoin"
---

{% assign moreHelp="If you need more help, please ask in one of Bitcoin's many [communities](/en/community), such as [Bitcoin StackExchange](https://bitcoin.stackexchange.com/), [BitcoinTalk technical support](https://bitcointalk.org/index.php?board=4.0), or the [#bitcoin](https://webchat.freenode.net/?channels=bitcoin&uio=d4) IRC chatroom on Freenode." %}

# Running A Full Node

<p class="summary">Learn how run a full node</p>

<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="reportissue"><li><a href="https://github.com/bitcoin/bitcoin.org/issues/new">Report An Issue</a></li></ul>
<ul class="editsource"><li><a href="https://github.com/bitcoin/bitcoin.org/tree/master/en/full-node.md">Edit On GitHub</a></li></ul>

</div></div>
<div markdown="1" class="toccontent">

## What Is A Full Node?

A full node is a program that fully validates transactions and blocks.
Almost all full nodes also help the network by accepting transactions
and blocks from other full nodes, validating those transactions and
blocks, and then relaying them to further full nodes.

Most full nodes also serve lightweight clients by allowing them to
transmit their transactions to the network and by notifying them when a
transaction affects their wallet. If not enough nodes perform this
function, clients won't be able to connect through the peer-to-peer
network---they'll have to use centralized services instead.

Many people and organizations volunteer to run full nodes using spare
computing and bandwidth resources---but more volunteers are needed to
allow Bitcoin to continue to grow.  This document describes how you can
help and what helping will cost you.

## Costs And Warnings

Running a Bitcoin full node comes with certain costs and can expose you
to certain risks. This section will explain those costs and risks so you
can decide whether you're able to help the network.

### Special Cases

Miners, businesses, and privacy-conscious users rely on particular
behavior from the full nodes they use, so they will often run their own
full nodes and take special safety precautions. This document does not
cover those precautions---it only describes running a full node to help
support the Bitcoin network in general.

Please [consult an expert](/en/community) if you need help setting up
your full node correctly to handle high-value and privacy-sensitive
tasks.

### Secure Your Wallet

It's possible and safe to run a full node to support the network and use
its wallet to store your bitcoins, but you must take the same
precautions you would when using any Bitcoin wallet.  Please see the
[securing your wallet page](/en/secure-your-wallet) for more
information.

### Minimum Requirements

Bitcoin Core full nodes have certain requirements. If you try running a
node on weak hardware, it may work---but you'll likely spend more time
dealing with issues. If you can meet the following requirements, you'll
have an easy-to-use node.

* Desktop or laptop hardware running recent versions of Windows, Mac OS
  X, or Linux.

* 50 gigabytes of free disk space

* 2 gigabytes of memory (RAM)

* Broadband Internet connection

* 6 hours a day that your full node can be left running. (You can do
  other things with your computer while running a full node)

### Possible Problems

* **Legal:** Bitcoin use is [prohibited or restricted in some
  areas](http://bitlegal.io/)

* **Anti-virus:** Several people have placed parts of known computer
  viruses in the Bitcoin block chain. This block chain data can't infect
  your computer, but some anti-virus programs quarantine the data any
  way, making it more difficult to run a full node. This problem mostly
  affects computers running Windows

* **Attack target:** People who want to disrupt the Bitcoin network may
  attack full nodes in ways that will affect other things you do with
  your computer, such as an attack that limits your available download
  bandwidth or an attack that prevents you from using your full node's
  wallet for sending transactions

## Linux Instructions

The following instructions describe installing Bitcoin Core on Linux
systems.

### Ubuntu 14.10 Desktop

*Instructions for Bitcoin Core 0.10.0.*

Click the Ubuntu swirl icon to start the Dash and type "term" into the
input box. Choose any one of the terminals listed:

![Dash term](/img/full-node/en-dash-term.png)

Type the following line to add the Bitcoin Personal Package Archive
(PPA) to your system:

    sudo apt-add-repository ppa:bitcoin/bitcoin

You will be prompted for your user password.  Provide it to continue.
Afterwards, the following text will be displayed:

     Stable Channel of bitcoin-qt and bitcoind for Ubuntu, and their dependencies
     More info: https://launchpad.net/~bitcoin/+archive/ubuntu/bitcoin
    Press [ENTER] to continue or ctrl-c to cancel adding it

Press enter to continue. The following text (with some variations) will
be displayed and you will be returned to the command line prompt:

    gpg: keyring `/tmp/tmpixuqu73x/secring.gpg' created
    gpg: keyring `/tmp/tmpixuqu73x/pubring.gpg' created
    gpg: requesting key 8842CE5E from hkp server keyserver.ubuntu.com
    gpg: /tmp/tmpixuqu73x/trustdb.gpg: trustdb created
    gpg: key 8842CE5E: public key "Launchpad PPA for Bitcoin" imported
    gpg: no ultimately trusted keys found
    gpg: Total number processed: 1
    gpg:               imported: 1  (RSA: 1)
    OK

Type the following line to get the most recent list of packages:

    sudo apt-get update

A large number of lines will be displayed as different update files are
downloaded.  This step may take several minutes on a slow Internet
connection.

<div class="box" markdown="1">
*Choose one of the following options*

1. To install the Bitcoin Core Graphical User Interface (GUI), type the
   following line and proceed to the [Bitcoin Core GUI](#ubuntu-gui)
   section below:

        sudo apt-get install bitcoin-qt

2. To install the Bitcoin Core daemon (bitcoind), which is useful for
   programmers and advanced users, type the following line and proceed
   to the [Bitcoin Core Daemon](#ubuntu-daemon) section below:

        sudo apt-get install bitcoind

3. To install both the GUI and the daemon, type the following line and
   read both the [GUI instructions](#ubuntu-gui) and the [daemon
   instructions](#ubuntu-daemon). Note that you can't run both the GUI
   and the daemon at the same time using the same configuration
   directory.

        sudo apt-get install bitcoin-qt bitcoind

After choosing what packages to install, you will be asked whether you
want to proceed.  Press enter to continue.
</div>

#### Bicoin Core GUI {#ubuntu-gui}

To start Bitcoin Core GUI, click the Ubuntu swirl icon to open the Dash,
type `bitcoin`, and click the Bitcoin icon.

![Dash Bitcoin-Qt](/img/full-node/en-dash-bitcoin-qt.png)

You will be prompted to choose a directory to store the Bitcoin block
chain and your wallet.  Unless you have a separate partition or drive
you want to use, click Ok to use the default.

![Bitcoin-Qt Welcome](/img/full-node/en-bitcoin-qt-welcome.png)

Bitcoin Core GUI will begin to download the block chain.  This
step will take at least several hours, and it may take a day or more on
a slow Internet connection or with a slow computer.  During the
download, Bitcoin Core will use a significant part of your connection
bandwidth.  You can stop Bitcoin Core at any time by closing it; it will
resume from the point where it stopped the next time you start it.

![Bitcoin-Qt Initial Block Download](/img/full-node/en-bitcoin-qt-ibd.png)

After download is complete, you may use Bitcoin Core as your wallet or
you can just let it run to help support the Bitcoin network.

<div class="box" markdown="1">
*Optional: Start Your Node At Login*

Starting your node automatically each time you login to your computer
makes it easy for you to contribute to the network. The easiest way
to do this is to add Bitcoin Core GUI to the list of startup
applications.

Click the Ubuntu swirl icon to start the Dash, type `startup app`,
and click the Startup Applications icon.

![Dash Startup App](/img/full-node/en-dash-startup-app.png)

In the screen that appears, click the Add button, and enter the
following information.  The `-min` tells Bitcoin Core GUI to start
minimized (in the tray):

       Name: Bitcoin
    Command: bitcoin-qt -min

The form should look like this:

![Startup Applications Bitcoin-Qt](/img/full-node/en-startup-applications-bitcoin-qt-min.png)

Click Save and then Close to save your changes. The next time you login
to your desktop, Bitcoin Core GUI will be automatically started in as an
icon in the tray.

![Bitcoin-Qt Tray Icon](/img/full-node/en-bitcoin-qt-tray-icon.png)
</div>

{{moreHelp}}

#### Bicoin Core Daemon {#ubuntu-daemon}

Before using the Bitcoin Core daemon, `bitcoind`, you need to create its
configuration file with a user name and password. First create the
`.bitcoin` directory, create (touch) the file, and set the file's
permissions so that only your user account can read it.  From the
terminal, type:

    mkdir .bitcoin
    touch .bitcoin/bitcoin.conf
    chmod 600 .bitcoin/bitcoin.conf

Then you can run the command `bitcoind`.  It will print output similar
to this:

    bitcoind
    Error: To use the "-server" option, you must set a rpcpassword in the configuration file:
    /home/bitcoinorg/.bitcoin/bitcoin.conf
    It is recommended you use the following random password:
    rpcuser=bitcoinrpc
    rpcpassword=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    (you do not need to remember this password)
    The username and password MUST NOT be the same.
    If the file does not exist, create it with owner-readable-only file permissions.
    It is also recommended to set alertnotify so you are notified of problems;
    for example: alertnotify=echo %s | mail -s "Bitcoin Alert" admin@foo.com

The "rpcpassword" displayed will be unique for your system.  You can
copy the the rpcuser and rpcpassword lines into your configuration file
using the following commands.  Note that in most Ubuntu terminals, you need
to press Ctrl-Shift-C to copy and Ctrl-Shift-V to paste because Ctrl-C
and Ctrl-V have different meanings in a Unix-style terminal.

    echo rpcuser=bitcoinrpc >> .bitcoin/bitcoin.conf
    echo rpcpassword=XXXXXX >> .bitcoin/bitcoin.conf

(**Warning:** Don't use XXXXXX as your RPC password. Copy the
rpcpassword displayed by bitcoind for your system.)

Now you can start Bitcoin Core daemon for real.  Type the following
command:

    bitcoind -daemon

It will print a message that Bitcoin Core is starting.  To interact with
Bitcoin Core daemon, you will use the command `bitcoin-cli` (Bitcoin
command line interface).  Note: it may take up to several minutes for
Bitcoin Core to start, during which it will display the following
message whenever you use `bitcoin-cli`:

    error: {"code":-28,"message":"Verifying blocks..."}

After it starts, you may find the following commands useful for basic
interaction with your node:
[`getblockchaininfo`](/en/developer-reference#getblockchaininfo),
[`getnetworkinfo`](/en/developer-reference#getnetworkinfo),
[`getnettotals`](/en/developer-reference#getnettotals),
[`getwalletinfo`](/en/developer-reference#getwalletinfo),
[`stop`](/en/developer-reference#stop), and [`help`](/en/developer-reference#help).
For example, to safely stop your node, run the following command:

    bitcoin-cli stop

A complete list of commands is available in the [Bitcoin.org developer
reference](/en/developer-reference#rpc-quick-reference).

When Bitcoin Core daemon first starts, it will begin to download the
block chain. This step will take at least several hours, and it may
take a day or more on a slow Internet connection or with a slow
computer. During the download, Bitcoin Core will use a significant part
of your connection bandwidth. You can stop Bitcoin Core at any time using
the `stop` command; it will resume from the point where it stopped the next
time you start it.

<div class="box" markdown="1">
*Optional: Start Your Node At Boot*

Starting your node automatically each time your computer boots makes it
easy for you to contribute to the network.  The easiest way to do this
is to start Bitcoin Core daemon from your crontab.  To edit your
crontab, run the following command:

    crontab -e

Scroll to the bottom of the file displayed and add the following line:

    @reboot bitcoind -daemon

Save the file and exit; the updated crontab file will be installed for
you. Now Bitcoin Core daemon will be automatically started each time
your reboot your computer.

If you're an Ubuntu expert and want to use an init script instead, see
[this Upstart
script](https://github.com/bitcoin/bitcoin/blob/2d782ab2ce30bf106e34cd3288c9082ac04022f9/contrib/init/bitcoind.conf).
</div>

{{moreHelp}}


## Windows Instructions

If you can provide instructions and screenshots for running the latest
version of Bitcoin Core on Mac OS X, please [open an
issue](https://github.com/bitcoin/bitcoin.org/issues/new) and we'll tell
you what we need.

## Mac OS X Instructions

If you can provide instructions and screenshots for running the latest
version of Bitcoin Core on Mac OS X, please [open an
issue](https://github.com/bitcoin/bitcoin.org/issues/new) and we'll tell
you what we need.






</div>

<script>updateToc();</script>
<script>addAnchorLinks();</script>
