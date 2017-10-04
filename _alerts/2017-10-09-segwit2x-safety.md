---
title: "Beware of Bitcoin's incompatibility with Coinbase & others"
shorturl: "segwit2x-safety"
active: true
banner: "Beware of Bitcoin's incompatibility with Coinbase & others"
bannerclass: "alert"
date: 2017-10-09
---

## Summary

A subsection of the Bitcoin economy including Coinbase have signed an agreement to adopt
and implement a contentious hard fork of Bitcoin [sometime](http://bashco.github.io/2x_Countdown/) in November. A hard fork is a
backwards incompatible change to the Bitcoin network. This hard fork is not supported by
the majority of the Bitcoin users and developers and is therefore a contentious hard fork.
By adopting this hard fork, we believe the supporters of this agreement of which the most
prominent are Coinbase, Bitpay and Xapo are effectively exiting the Bitcoin system and are
shifting their users to an alternative currency (an altcoin) which is incompatible with Bitcoin.

The signatories of this agreement wrongly believe that the currency created by adopting
this contentious hard fork will become Bitcoin. Therefore storing any BTC on services such
as Coinbase, Bitpay and Xapo is strongly not recommended. By storing BTC on these services, you could
find that after the hard fork, your BTC has been replaced with something other than Bitcoin.
The best way to ensure that your BTC is protected is to [download the latest version of Bitcoin Core](https://bitcoin.org/en/download)
and transfer out any BTC stored on services that are a signatory to this agreement. We have
listed the businesses supporting this contentious hard fork at the bottom of this document.

## SPV Wallets

There is considerable mining power supporting the contentious hard fork. Miners in Bitcoin
are responsible for transaction ordering through putting transactions into blocks, and collectively
creating a chain of these blocks. A supermajority of miners have pledged to support the contentious
hard fork, therefore the longest chain as seen by an SPV wallet such as Electrum and Breadwallet (which perform
no validation of the content of these blocks) may not be the true block chain. As a result of this, storing and
using an SPV wallet during a hard fork is not recommended. You will be vulnerable to many attacks as your
wallet is not aware that the miners are breaking the consensus rules.

If you are a user of an SPV wallet, the best way to safely spend your Bitcoin after the hard fork
is to transfer them to a [Bitcoin Core](https://bitcoin.org/en/download) wallet and then spend from
there. If the contentious hard fork has failed and the supermajority of miners have broken their pledge
to support the hard fork, it is safe to continue using SPV wallets, however you should check multiple
sources of Bitcoin news such as this website, [/r/bitcoin](https://www.reddit.com/r/Bitcoin/), and the [Bitcoin Forum](https://bitcointalk.org)
to make sure that it's safe to continue using your particular wallet. As a general rule, we recommend that you
avoid making transactions **during** the hard fork, but if you really need to transact, you must use Bitcoin Core.

## After the fork

Blocks may be slower shortly after the hard fork and your transactions will take longer to confirm. You
will have to pay a higher transaction fee if your transaction is high priority and you want it confirmed
in the next block. You should try to get any important transactions done a few days before the hard fork [date](http://bashco.github.io/2x_Countdown/).
A lot of websites and programs will likely pop up around the time of the hard fork offering to split your Bitcoin
so you can have access to both your BTC and to the new currency created by this contentious hard fork, you should
exercise caution as many of these services are likely to be scams trying to steal your bitcoin. As the
hard fork has very little replay protection, most transactions you perform on the Bitcoin network will also
be valid on the hard fork network. You should keep this in mind when transacting.

Some services may continue to present and name the altcoin created by this contentious hard
fork as Bitcoin. Users should be aware that this new currency is not Bitcoin. Bitcoin can only
be changed with the overwhelming consensus of the entire Bitcoin community of individuals,
miners, developers and economy. Even when there is overwhelming consensus, unless in an
emergency, a hard fork should have at least a year notice period to give enough time for users to upgrade. This
hard fork being adopted by the signatories of this agreement achieves none of these things. It is a rushed
and hasty upgrade which only has minority community support and has been thoroughly rejected by users and the technical community.
As this new altcoin is not Bitcoin, Bitcoin.org will not list wallets and services that present
this altcoin as "Bitcoin" or "BTC" to their users after the hard fork. These services have exited
the Bitcoin system in a contentious manner and therefore are no longer useful to our visitors.

## New York Agreement signatories

The following companies and services have pledged to adopt the contentious hard fork.

+ 1Hash (China)
+ Abra (United States)
+ ANX (Hong Kong)
+ Bitangel.com /Chandler Guo (China)
+ BitClub Network (Hong Kong)
+ Bitcoin.com (St. Kitts & Nevis)
+ Bitex (Argentina)
+ bitFlyer (Japan)
+ Bitfury (United States)
+ Bitmain (China)
+ BitPay (United States)
+ BitPesa (Kenya)
+ BitOasis (United Arab Emirates)
+ Bitso (Mexico)
+ Bixin.com (China)
+ Blockchain (UK)
+ Bloq (United States)
+ BTC.com (China)
+ BTCC (China)
+ BTC.TOP (China)
+ BTER.com (China)
+ Circle (United States)
+ Civic (United States)
+ Coinbase (United States)
+ Coins.ph (Phillipines)
+ CryptoFacilities (UK)
+ Decentral (Canada)
+ Digital Currency Group (United States)
+ Filament (United States)
+ Genesis Global Trading (United States)
+ Genesis Mining (Hong Kong)
+ GoCoin (Isle of Man)
+ Grayscale Investments (United States)
+ Jaxx (Canada)
+ Korbit (South Korea)
+ Luno (Singapore)
+ MONI (Finland)
+ Netki (United States)
+ OB1 (United States)
+ Purse (United States)
+ Ripio (Argentina)
+ Safello (Sweden)
+ SFOX (United States)
+ ShapeShift (Switzerland)
+ SurBTC (Chile)
+ Unocoin (India)
+ Veem (United States)
+ ViaBTC (China)
+ Xapo (United States)
+ Yours (United States)
