---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: brd
title: "BRD"
titleshort: "BRD"
compat: "mobile android ios"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletbrd"
        link: "https://itunes.apple.com/app/brd-bitcoin-wallet/id885251393"
        source: "https://github.com/breadwallet/breadwallet-ios"
        screenshot: "brd.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletbrd"
        link: "https://play.google.com/store/apps/details?id=com.breadwallet"
        source: "https://github.com/breadwallet/breadwallet-android"
        screenshot: "brd.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
