---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: coin
title: "Coin Wallet"
titleshort: "Coin"
compat: "mobile web android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletcoin"
        link: "https://play.google.com/store/apps/details?id=com.coinspace.app"
        source: "https://github.com/CoinSpace/CoinSpace"
        screenshot: "coinmobile.png"
        features: "legacy_addresses"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: ios
        text: "walletcoin"
        link: "https://itunes.apple.com/us/app/coinspace-bitcoin-wallet/id980719434?mt=8"
        source: "https://github.com/CoinSpace/CoinSpace"
        screenshot: "coinmobile.png"
        features: "legacy_addresses"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
  - web:
    name: web
    os:
      - name: web
        text: "walletcoin"
        link: "https://coin.space"
        source: "https://github.com/CoinSpace/CoinSpace"
        screenshot: "coinweb.png"
        features: "legacy_addresses"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkfailtransparencyremote"
          environment: "checkfailenvironmentdesktop"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
