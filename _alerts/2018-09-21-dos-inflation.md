---
title: "Critical Inflation and DoS Vulnerability"
shorturl: "dos-inflation"
active: true
show_toc: true
banner: "UPGRADE IMMEDIATELY - Critical Inflation and DoS Vulnerability"
bannerclass: "alert"
date: 2018-09-21
---

<div class="post-content" markdown="1">

## Summary
A critical vulnerability (CVE-2018-17144) has been found in versions of the Bitcoin Core software between 0.14 through
to 0.16.2. Due to an optimization added in 0.14, the software fails to properly handle the case of duplicate inputs within a transaction,
leading to a crash. Furthermore, it's possible for miners to exploit this vulnerability to maliciously inflate the supply of Bitcoin.
An upgrade has already been released, though Bitcoin Core developers did not initially disclose the full extent of the vulnerability.
This is a major and critical flaw requiring users to upgrade immediately. We also urge users to monitor Bitcoin communication channels during
the next few weeks as further important information is likely to be shared.

</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

## Upgrade
Users must upgrade by [downloading the latest version of Bitcoin Core](https://bitcoin.org/en/download). We encourage users
to verify the software as appropriate, as we can not formally guarantee the integrity of the binaries. Additionally, users should require
more confirmations on transactions (recommended 200), until the network is sufficiently upgraded.

</div>
