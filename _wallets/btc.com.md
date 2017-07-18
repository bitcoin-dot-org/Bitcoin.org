---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: btc.com
title: "BTC.com Bitcoin Wallet"
titleshort: "BTC.com"
compat: "mobile web android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletbtccom"
        link: "https://itunes.apple.com/us/app/blocktrail-bitcoin-wallet/id1019614423"
        source: "https://github.com/blocktrail/blocktrail-wallet"
        screenshot: "btccomwallet.png"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletbtccom"
        link: "https://play.google.com/store/apps/details?id=com.blocktrail.mywallet"
        source: "https://github.com/blocktrail/blocktrail-wallet"
        screenshot: "btccomwallet.png"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmenttwofactor"
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
        text: "walletbtccom"
        link: "https://wallet.btc.com"
        source: "https://github.com/blocktrail/blocktrail-webwallet"
        screenshot: "btccomwallet.png"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkfailvalidationcentralized"
          transparency: "checkfailtransparencyremote"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
