---
title: "Notice of Required Upgrade to 0.16.3"
shorturl: "required-upgrade"
active: false
show_toc: false
# banner: "Notice of Required Upgrade to 0.16.3"
# bannerclass: "alert"
date: 2018-09-21
---

## Summary

[0.16.3](https://bitcoin.org/en/download) was recently released, and if you're
running a node and haven't already updated, we recommend you do so as soon as
possible. A bug fixed in 0.16.3 [is more severe](https://bitcoincore.org/en/2018/09/20/notice/)
than was previously made public. You can download 0.16.3 from [bitcoin.org](https://bitcoin.org/en/download)
or [bitcoincore.org](https://bitcoincore.org/en/download/) or via
[BitTorrent](https://www.reddit.com/r/Bitcoin/wiki/bitcoin_core_bittorrent),
and as always, make sure that you
[verify the download](https://www.reddit.com/r/Bitcoin/wiki/verifying_bitcoin_core).

Stored funds are not at risk, and never were at risk. Even if the bug had been
exploited to its full extent, the theoretical damage to stored funds would have
been rolled back, exactly as it was in the value overflow incident. However,
there is currently a small risk of a chainsplit. In a chainsplit, transactions
could be reversed long after they are fully confirmed. Therefore, for the next
week or so you should consider there to be a small possibility of any
transaction with less than 200 confirmations being reversed.

Summary of action items:

+ You should not run any version of Bitcoin Core other than 0.16.3. Older versions
should not exist on the network. If you know anyone who is running an older
version, tell them to upgrade it ASAP.

+ It's not necessary to immediately upgrade older versions if they are
currently shut down. Cold-storage wallets are safe.

+ For the approximately the next week, consider transactions with fewer than 200
confirmations to have a low probability of being reversed (whereas usually
there would be essentially zero probability of transactions having six or more
confirmations being reversed).

Please watch for further news. If a chainsplit happens, action may be required.

Read more: [CVE-2018-17144 Full Disclosure](https://bitcoincore.org/en/2018/09/20/notice/)
