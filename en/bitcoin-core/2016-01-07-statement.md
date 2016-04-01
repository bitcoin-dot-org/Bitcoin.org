---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
lang: en
id: bitcoin-core-2016-01-07-statement
columns: 1
title: Statement from Bitcoin Core -- 2016-01-07
breadcrumbs:
  - bitcoin
  - bcc
  - 2016-01-07 Statement
moved_url: https://bitcoincore.org/en/2016/01/07/statement
---
# Statement from Bitcoin Core 2016-01-07

Bitcoin is a "peer-to-peer version of electronic cash that allows online payments to be sent directly from one party to another without going through a financial institution". Our vision for Bitcoin is to expand the flexibility of the system to work efficiently at extremely high scale, while at the same time maintaining security and the core properties of decentralization that make Bitcoin unique.

We believe Bitcoin can accomplish this by providing the foundation for additional layers on top of the protocol and interfaces with other systems. Furthermore, our long term goals include protecting and improving the privacy of Bitcoin users.

"Bitcoin Core" refers to an open source software project that is a direct descendant of the original Bitcoin implementation. As project contributors, we maintain and release software for the Bitcoin community for users' consideration. We strive to make improvements to the consensus protocol by proposing upgrades that we believe make technical sense according to our understanding of the goals of Bitcoin, and that we believe stand a reasonable chance of widespread support and adoption.

Changes to the Bitcoin consensus rules can be made through either soft forks or hard forks (see Appendix A). Soft forks allow compatible changes. With soft forks, old and new software can co-exist on the network. Soft forks can introduce new features without disruption because users who want to use the new features can upgrade, while those who do not are free to continue as normal.

Hard forks break compatibility of all previous Bitcoin software and require every participant to upgrade to the same rules by a deadline or risk losing money. Such events can also harm network effects by pushing participants off the network if they take no action, and by potentially breaking downstream software and applications.

For these reasons, Bitcoin Core strongly favours compatibility and believes it should be each user’s choice not to upgrade the rules of their current Bitcoin software. It turns out it is possible to add almost any new feature with a soft fork. Occasionally, hard forks may have some benefits, and if there is near-universal agreement, these benefits may outweigh the downsides. Except for these rare cases, soft forks are to be preferred. We believe this is in the best interests of current and future users of the system.

We also expect that as the Bitcoin ecosystem grows, the number of alternative Bitcoin protocol implementations may increase, and it is inevitable that other software projects may release radically different software proposals for the ecosystem to consider. At the end of the day, the Bitcoin Core development team does not decide the Bitcoin consensus rules. Instead, users participate in Bitcoin by making their own choice of which Bitcoin software to run. This is why Bitcoin Core software deliberately does not have an auto-update feature. Its omission ensures voluntary user participation in every upgrade, so users always retain the choice over which software they run.

### Appendix A

A hard fork is a change to consensus rules, in which blocks that would have been invalid under the old rules may become valid under the new rules.

A soft fork is a change to consensus rules, in which blocks that would have been valid under the old rules may become invalid under the new rules, but all blocks that would have been invalid under the old rules remain invalid under the new rules.

Translations:
[{{site.langs.de}}](/de/bitcoin-core/2016-01-07-statement)
| [{{site.langs.es}}](/es/bitcoin-core/2016-01-07-statement)
| [{{site.langs.ru}}](/ru/bitcoin-core/2016-01-07-statement)
| [{{site.langs.zh_CN}}](/zh_CN/bitcoin-core/2016-01-07-statement)
| [{{site.langs.zh_TW}}](/zh_TW/bitcoin-core/2016-01-07-statement)

