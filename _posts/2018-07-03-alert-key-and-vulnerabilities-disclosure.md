---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

type: posts
layout: post
category: blog

title: "Alert Key and Alert System Vulnerabilities Disclosure"
permalink: /en/posts/alert-key-and-vulnerabilities-disclosure.html
date: 2018-07-03
author: |
  <a href="https://github.com/kanzure">Bryan Bishop</a> and <a href="https://github.com/achow101">Andrew Chow</a>
---

The bitcoin alert keys are disclosed in this blog post, followed by a description of the purpose of this information and its history. The bitcoin alert system has been completely retired. The network is not at risk and this warning may be safely ignored if you do not have an ancient node (running v0.12.x or older) using the deprecated bitcoin alert system or its public keys.

mainnet public key:

    04fc9702847840aaf195de8442ebecedf5b095cdbb9bc716bda9110971b28a49e0ead8564ff0db22209e0374782c093bb899692d524e9d6a6956e7c5ecbcd68284

mainnet private key:

    30820113020101042053cdc1e0cfac07f7e1c312768886f4635f6bceebec0887f63a9d37a26a92e6b6a081a53081a2020101302c06072a8648ce3d0101022100fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f300604010004010704410479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8022100fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141020101a14403420004fc9702847840aaf195de8442ebecedf5b095cdbb9bc716bda9110971b28a49e0ead8564ff0db22209e0374782c093bb899692d524e9d6a6956e7c5ecbcd68284

testnet public key:

    04302390343f91cc401d56d68b123028bf52e5fca1939df127f63c6467cdf9c8e2c14b61104cf817d0b780da337893ecc4aaff1309e536162dabbdb45200ca2b0a

testnet private key:

    308201130201010420474d447aa6f46b4f45f67f21180a5de2722fc807401c4c4d95fdae64b3d6c294a081a53081a2020101302c06072a8648ce3d0101022100fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f300604010004010704410479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8022100fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141020101a14403420004302390343f91cc401d56d68b123028bf52e5fca1939df127f63c6467cdf9c8e2c14b61104cf817d0b780da337893ecc4aaff1309e536162dabbdb45200ca2b0a

These are openssl-serialized private keys.

In 2016, a plan was [proposed][1] for the completion of the retirement of the bitcoin alert system which included the idea of revealing the alert system private keys. The proposal still contains good information regarding the purpose and intention of alert system retirement and motivation for the disclosure of the private keys. Additionally, an overview of the alert system retirement and its timeline is available [on the web][2]. This disclosure was recently discussed in an [IRC meeting logs][3]. A media site also recently discussed this [topic][4].

One of the reasons for disclosure of the keys is to mitigate the effects of unknown dissemination and proliferation of the keys. By broadcasting the values to make them available to everyone, the value of the keys is intended to be to be eliminated, since now everyone could feasibly sign messages, the value of the signed messages becomes zero.

## Vulnerabilities in the Bitcoin Alert system

The following text discloses a number of known vulnerabilities in the alert system.

The Alert System previously utilized by Bitcoin has several issues (some of which may be classified as vulnerabilities). These issues no longer exist in Bitcoin as of network protocol version 700013 which was released with Bitcoin Core 0.13.0. Many altcoins and Bitcoin client implementations were notified of the Alert System's removal and have since removed the alert system themselves or transitioned to using an Alert system that does not share an Alert Key with Bitcoin.

All of the issues described below allow an attacker in possession of the Alert Key to perform a Denial of Service attack on nodes that still support the Alert system. These issues involve the exhaustion of memory which causes node software to crash or be killed due to excessive memory usage.

Many of these issues were not known until the Alert System was removed as developers inspected the code for vulnerabilities prior to releasing the Alert Key. Due to these issues, the publication of the Alert Key was delayed and affected altcoins and software were notified.

As of this writing, less than 4% of Bitcoin nodes are vulnerable. Furthermore, the Bitcoin Core developers have created a "final alert" which is a maximum ID number alert which overrides all previous alerts and displays a fixed "URGENT: Alert key compromised, upgrade required" message on all vulnerable software. The Bitcoin Core developers believe that so few vulnerable nodes are present on the network, and risks to those nodes so minor, that it is safe to publish the Alert Key.

An Alert contains these fields:

    int32_t nVersion;
    int64_t nRelayUntil;      // when newer nodes stop relaying to newer nodes
    int64_t nExpiration;
    int32_t nID;
    int32_t nCancel;
    std::set<int32_t> setCancel;
    int32_t nMinVer;            // lowest version inclusive
    int32_t nMaxVer;            // highest version inclusive
    std::set<std::string> setSubVer;  // empty matches all
    int32_t nPriority;

Alerts are also identified by their SHA256 hash. The above fields can be freely modified to generate alerts with differing hashes.

### Infinitely Sized Map (CVE-2016-10724)

The Alert System was designed to support multiple Alerts simultaneously. As such, Alerts were stored in memory in a map. However, there is no limit on how large this map can be, thus an attacker with the Alert Key can send a large number of Alerts to a node. Eventually, the map containing all of the Alerts will be so large that the node runs out of memory and crashes, thus causing a Denial of Service attack.

The infinitely sized map is the basis for which the Alert system can be used to cause Denial of Service attacks.

### Infinitely Sized Alerts

Although the infinitely sized map is what causes the crash itself, an attacker can also send very large Alerts. Alerts themselves are not limited in size explicitly, they are only limited by the maximum network message size. This maximum network message size has varied between versions. At times in the past, it has been 32 MB. For Bitcoin Core 0.12.0 (the most recent version of Bitcoin Core with the alert system enabled by default), the maximum message size is 2 MB.

Although large Alerts do not directly cause a Denial of Service by themselves, combined with the infinitely sized map, large Alerts can more quickly cause a node to run out of memory.

* The `setCancel` field has no length limit (besides the maximum message size) and is a std::set of 32-bit integers. Given that it has no size constraints, an attacker can use this field to create a very large Alert by filling the set with many integers.
* The `setSubVer` field, like `setCancel`, has no length limit and is a std::set. However instead of integers it has std::strings. These strings do not have a length limit themselves and can thus be arbitrarily long to produce an Alert that is arbitrarily large.
* Bitcoin Core versions prior to 0.10.0 did not have a limit on the length of the `strComment`, `strStatusBar`, and `strReserved` fields. These strings can have an arbitrary length.

### The Final Alert

To protect against attackers abusing the Alert key following its publication, the Bitcoin Core developers constructed a "final alert". This final alert is a maximum ID alert which overrides all previous alerts. All Bitcoin Core versions since and including Bitcoin Core 0.14.0 contain the final alert and will send it to any node which is vulnerable to issues including the following disclosures. However this protection is not enough to protect those nodes as a few issues were found with the final alert implementation itself.

Final alerts are those which meet the following conditions:

    nExpiration == maxInt &&
    nCancel == (maxInt-1) &&
    nMinVer == 0 &&
    nMaxVer == maxInt &&
    setSubVer.empty() &&
    nPriority == maxInt &&
    strStatusBar == "URGENT: Alert key compromised, upgrade required"

`maxInt` is the maximum signed integer as defined by `std::numeric_limits<int>::max()`.

### Multiple Final Alerts

The definition for a final alert does not include a few fields. Because alerts are identified by their hashes, changing the ommitted fields allows an Alert to be classified as a final alert but still be an alert that is added to the infinitely sized map.

- Since `setCancel` is not required to be empty for an alert to be a final alert, the `setCancel` field can contain different integers to produce alerts that have different hashes and are thus different alerts. Combined with the infinitely sized map and the infinitely sized `setCancel` issues, many final alerts can be created which are large, fill the map, and cause a node to run out of memory.
- The `strComment` field, while having a maximum length of 65536 bytes, is not required to be a particular string in order for an alert to be a final alert. Thus multiple final alerts can be crafted which have different hashes by using different values for `strComment`
- The`strReserved` field, while having a maximum length of 256 bytes, is not required to be a particular string in order for an alert to be a final alert. Thus multiple final alerts can be crafted which have different hashes by using different values for `strReserved`.
- The `nVersion` field is also not required to be a particular value. Thus this can be used to construct final alerts with different hashes by having different values for `nVersion`.
- `nRelayUntil` field is also not required to be a particular value. Thus this can be used to construct final alerts with different hashes by having different values for `nRelayUntil`.

### Final Alert Cancellation (CVE-2016-10725)

Although the final alert is supposed to be uncancellable, it unfortunately is cancellable due to the order of actions when processing an alert. Alerts are first processed by checking whether they cancel any existing alert. Then they are checked whether any of the remaining alerts cancels it. Because of this order, it is possible to create an alert which cancels a final alert before the node checks whether that alert is canceled by the final alert. Thus an attacker can cancel a final alert with another alert allowing a node to be vulnerable to all of the aforementioned attacks.

## Protecting Against DoS Attacks from the Alert System

Fixing these issues is relatively easy. The first and most obvious solution is to simply remove the Alert system entirely. As nodes upgrade to versions without the Alert system, fewer nodes will be vulnerable to attack should the Alert keys become public. This is the option that Bitcoin has taken. However, because Bitcoin has retired the Alert system entirely, the Alert key will also be published to reduce the risk that the Alert Key is mistakenly depended upon in the future.

Should altcoins wish to continue using the Alert system but with a different Alert Key, a few very simple fixes will safeguard nodes from the aforementioned issues. Limiting the number of alerts, the size of `setCancel` and `setSubVer`, and only allowing one final alert altogether fix the above issues. [This patch][5], on top of Bitcoin Core 0.11 (a vulnerable version), fixes the aforementioned issues. Altcoins that still use the Alert system are recommended to port this patch to their software. Outdated node software is still vulnerable.

[1]: https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2016-September/013104.html
[2]: https://bitcoin.org/en/alert/2016-11-01-alert-retirement
[3]: http://www.erisian.com.au/meetbot/bitcoin-core-dev/2018/bitcoin-core-dev.2018-06-21-19.00.log.html#l-30
[4]: https://www.coindesk.com/long-secret-bitcoin-key-finally-revealed/
[5]: https://gist.github.com/achow101/02d03238090691558a68010a9ccbbf9d
