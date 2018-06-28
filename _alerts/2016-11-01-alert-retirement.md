---
## This file is licensed under the MIT License (MIT) available on
## http://opensource.org/licenses/MIT.

title: "Alert System Retirement"
shorturl: "alert-retirement"
active: false
show_toc: true

## banner: "Alert system is being retired (click here to read)"
## bannerclass: "info"
---

<div class="post-content" markdown="1">

## Updates

* **January 19, 2017**: The Final alert has been broadcast. This final alert essentially disables the alert system by overriding all
alerts, preventing other alerts from being broadcast, and displays the static message "Alert Key Compromised". The Alert Key
will be published in the coming months.
* **March 8, 2017**: Bitcoin Core 0.14 released with hard-coded [final alert](https://bitcoin.org/en/release/v0.14.0#final-alert).
* **May 1, 2017**: Postpone release date of Alert key. Older clients may contain Alert handling code which is exploitable using the alert key, therefore the public release of the key has been temporarily postponed until considered safe.
* **July 3, 2018**: The Alert key and Alert System vulnerabilities [have been disclosed](/en/posts/alert-key-and-vulnerabilities-disclosure).
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

## Summary

The network wide Alert system is being retired. **_No Bitcoins are at risk and this warning may be safely ignored._**
Upgrade to the newest version of your wallet software to no longer see the alert.
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

## Reasons for Retirement

The network wide Alert system was created by Satoshi Nakamoto as a means of informing Bitcoin users of any important
information regarding Bitcoin. It has been used in the past to inform users about important network events such as
accidental blockchain forks. However, the Alert system also represents a large source of centralization in Bitcoin.
The holders of the singular Alert Key can at any time send an alert which could affect the entire network. As more
developers join, the Alert Key is given to others, but cannot be taken away from those who have left. This has led
to the Alert Key potentially falling into the hands of malicious actors who could use it to disrupt the network. Because
there is only one Alert key, it is not possible to prevent former developers from sending an alert nor is it possible
to identify who sent an Alert.

In addition, the Alert system is primarily Bitcoin Core specific. Many other wallets have their own systems in place but
still must have handling for the Alert system because it is network wide. Something specific for one software should
not be imposed on the entire network.

The Alert system has also lost its usefulness. It is no longer necessary to use it to inform users about problematic network
events as users can easily get their information from any major Bitcoin news outlet.
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

## The Retirement Plan

Retirement of the Alert system consists of a pre-final alert (this alert) which will warn about the impending retirement, a
final maximum sequence alert which cannot be overridden and displays a static "Alert Key Compromised" message, and the
publishing of the Alert key itself. The final alert will be hard coded into Bitcoin Core 0.14 to ensure that all old nodes
receive the final alert.

|Action|Description|Date|
|---|---|---|
|Pre-final Alert Posts|Posts on Bitcoin.org, various forums, and various mailing lists that the Alert system will be retired|2016-11-01|
|Pre-final Alert|The alert itself warning that the Alert system will be retired|2016-11-02|
|Final Alert|Max sequence Alert to disable the Alert system|2017-01-19|
|Alert key release|The Alert key will be made publicly available|Postponed until further notice.|

</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

## Software without the Alert system

Most major Bitcoin wallets have already removed the alert system in the most recent releases. The software listed below
are guaranteed to have removed/disabled the Alert system or allow you to disable it.

* Bitcoin Core 0.12.1+
* Bitcoin Core 0.10.3, 0.11.x, and 0.12.x can disable alerts with `-alerts=0`
* Armory 0.94.1+
</div>

<div class="toccontent-block boxexpand expanded" markdown="1">

## See also

* [Original email proposing retirement](https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2016-September/013104.html)
* [Pull request removing Alert system](https://github.com/bitcoin/bitcoin/pull/7692)
* [Removal discussion on github](https://github.com/bitcoin/bitcoin/pull/6260)
* [Pull request disabling alerts](https://github.com/bitcoin/bitcoin/pull/6274)
* [IRC Discussion](https://botbot.me/freenode/bitcoin-core-dev/2016-09-22/?msg=73446303&page=6)
</div>
