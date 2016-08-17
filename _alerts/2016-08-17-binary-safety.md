---
## This file is licensed under the MIT License (MIT) available on
## http://opensource.org/licenses/MIT.

title: "0.13.0 Binary Safety Warning"
shorturl: "binary-safety"
active: true
banner: "Be extra vigilant when downloading binaries from our website for the upcoming 0.13.0 release"
bannerclass: "alert"
---

## Summary

Bitcoin.org has reason to suspect that the binaries for the upcoming Bitcoin Core release will likely be targeted by
state sponsored attackers. As a website, Bitcoin.org does not have the necessary technical resources to guarantee
that we can defend ourselves from attackers of this calibre. We ask the Bitcoin community,
and in particular the Chinese Bitcoin community to be extra vigilant when downloading binaries from our website.

In such a situation, not being careful before you download binaries could cause you to lose all your coins. This malicious software
might also cause your computer to participate in attacks against the Bitcoin network. We believe Chinese services such as pools and exchanges
are most at risk here due to the origin of the attackers.

## Mitigation

The hashes of Bitcoin Core binaries are cryptographically signed with [this key](https://bitcoin.org/laanwj-releases.asc).

We strongly recommend that you download that key, which should have a fingerprint of 01EA5486DE18A882D4C2684590C8019E36C2E964.
You should securely verify the signature and hashes before running any Bitcoin Core binaries. This is the safest and most secure way of
being confident that the binaries you're running are the same ones created by the Core Developers. 
