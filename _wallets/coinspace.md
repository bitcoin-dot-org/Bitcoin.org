---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: coinspace
title: "Coin.Space"
titleshort: "Coin.Space"
compat: "mobile web android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletcoinspace"
        link: "https://play.google.com/store/apps/details?id=com.coinspace.app"
        source: "https://github.com/CoinSpace/CoinSpace"
        screenshot: "coinspacemobile.png?1528322191"
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
        text: "walletcoinspace"
        link: "https://itunes.apple.com/us/app/coinspace-bitcoin-wallet/id980719434?mt=8"
        source: "https://github.com/CoinSpace/CoinSpace"
        screenshot: "coinspacemobile.png?1528322191"
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
        text: "walletcoinspace"
        link: "https://coin.space"
        source: "https://github.com/CoinSpace/CoinSpace"
        screenshot: "coinspaceweb.png?1528322191"
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
