 ```diff
--- a/en/full-node.md
+++ b/en/full-node.md
@@ -1,6 +1,7 @@
 ---
 layout: base-en
 title: Running a Full Node
+id: full-node
 ---
 
 # Running a Full Node
@@ -14,6 +15,7 @@
 - [Network Configuration](#network-configuration)
 - [Configuring Bitcoin Core](#configuring-bitcoin-core)
 - [Reducing Storage](#reducing-storage)
+- [Tor Hidden Service](#tor-hidden-service)
 - [Troubleshooting](#troubleshooting)
 - [Further Reading](#further-reading)
 
@@ -21,7 +23,7 @@
 
 *Bitcoin Core full nodes contain something that is called a "full node" in the Bitcoin network. Full nodes download every block and transaction and check them against Bitcoin's consensus rules. Here are examples of consensus rules, though there are many more:*
 
-* Blocks may only create a certain number of bitcoins. (Currently 6.25 BTC per block.)
+* Blocks may only create a certain number of bitcoins. (Currently 6.25 BTC per block.)
 * Transactions must have correct signatures for the bitcoins being spent.
 * Transactions/blocks must be in the correct data format.
 * Within a single block chain, a transaction output cannot be double-spent.
@@ -29,7 +31,7 @@
 *If a transaction or block violates the consensus rules, then it is absolutely rejected, even if every other node on the network thinks that it is valid. This is one of the most important characteristics of full nodes: they do what's right no matter what, and this ensures that no individual, company, or government can change the rules of Bitcoin for everyone.*
 
 *For this reason, it's important that Bitcoin users run a full node if they possibly can. Full nodes provide the security of the network, and they allow you to be sure that the rules of Bitcoin are being followed.*
-
+
 *Some examples:*
 
 * If you are an individual user, running a full node ensures that your transactions are validated according to the consensus rules. You won't be tricked into accepting invalid bitcoins, and you can have full confidence in the Bitcoin software you are running.
@@ -37,7 +39,7 @@
 * If you are a merchant, running a full node ensures that you can validate payments yourself, rather than trusting a third party. This can reduce fraud and increase security.
 * If you are a developer, running a full node allows you to test your applications against the real Bitcoin network, and to contribute to the development of Bitcoin.
 
-*In summary, running a full node is one of the most important things you can do to support Bitcoin and to protect your own interests.*
+*In summary, running a full node is one of the most important things you can do to support Bitcoin and to protect your own interests.*
 
 ## Costs And Warnings
 
@@ -45,7 +47,7 @@
 
 *A complete installation of Bitcoin Core downloads the entire blockchain, which is over 400GB of data as of 2021. This can take a long time and a lot of bandwidth, so be prepared. You can reduce this by using the `-prune` option (see [Reducing Storage](#reducing-storage) below).*
 
-*Running a full node requires a computer that is on and connected to the internet 24/7. This uses electricity and bandwidth, which cost money. However, the costs are usually quite low for modern computers and internet connections.*
+*Running a full node requires a computer that is on and connected to the internet 24/7. This uses electricity and bandwidth, which cost money. However, the costs are usually quite low for modern computers and internet connections.*
 
 ## Linux Instructions
 
@@ -53,7 +55,7 @@
 
 *The following instructions describe installing Bitcoin Core on Ubuntu 20.04 and Ubuntu 21.04.*
 
-*These instructions assume you have a clean installation of Ubuntu. If you have other versions of Bitcoin installed, you may need to remove them first.*
+*These instructions assume you have a clean installation of Ubuntu. If you have other versions of Bitcoin installed, you may need to remove them first.*
 
 #### Installing the Kinetic Version (22.10) of Bitcoin Core
 
@@ -61,7 +63,7 @@
 
 *Open a terminal and run the following command to install Bitcoin Core:*
 
-    sudo apt-get install bitcoin-qt bitcoind
+    sudo apt-get install bitcoin-qt bitcoind
 
 *After installation, you can start Bitcoin Core by running `bitcoin-qt` from the terminal or by finding it in your applications menu.*
 
@@ -69,7 +71,7 @@
 
 *If you want to build Bitcoin Core from source, you can follow the instructions in the [Bitcoin Core documentation](https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md).*
 
-*Building from source is more complex and requires more technical knowledge, but it gives you more control over the build process and allows you to make custom modifications.*
+*Building from source is more complex and requires more technical knowledge, but it gives you more control over the build process and allows you to make custom modifications.*
 
 ### Other Linux Distributions
 
@@ -81,7 +83,7 @@
 
 *The following instructions describe installing Bitcoin Core on macOS.*
 
-*These instructions assume you have a clean installation of macOS. If you have other versions of Bitcoin installed, you may need to remove them first.*
+*These instructions assume you have a clean installation of macOS. If you have other versions of Bitcoin installed, you may need to remove them first.*
 
 #### Installing Bitcoin Core
 
@@ -89,7 +91,7 @@
 
 *Open the downloaded file and drag Bitcoin Core to your Applications folder.*
 
-*After installation, you can start Bitcoin Core by double-clicking it in your Applications folder.*
+*After installation, you can start Bitcoin Core by double-clicking it in your Applications folder.*
 
 ### Building from Source
 
@@ -101,7 +103,7 @@
 
 *The following instructions describe installing Bitcoin Core on Windows 10.*
 
-*These instructions assume you have a clean installation of Windows. If you have other versions of Bitcoin installed, you may need to remove them first.*
+*These instructions assume you have a clean installation of Windows. If you have other versions of Bitcoin installed, you may need to remove them first.*
 
 #### Installing Bitcoin Core
 
@@ -109,7 +111,7 @@
 
 *Open the downloaded file and follow the installation wizard.*
 
-*After installation, you can start Bitcoin Core from the Start menu.*
+*After installation, you can start Bitcoin Core from the Start menu.*
 
 ### Building from Source
 
@@ -121,7 +123,7 @@
 
 *Before you start Bitcoin Core, you may need to configure your network to allow incoming connections.*
 
-*Bitcoin Core uses port 8333 for incoming connections. You need to configure your router and/or firewall to allow connections on this port.*
+*Bitcoin Core uses port 8333 for incoming connections. You need to configure your router and/or firewall to allow connections on this port.*
 
 ### Router Configuration
 
@@ -129,7 +131,