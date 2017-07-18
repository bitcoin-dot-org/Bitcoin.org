---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: breadwallet
title: "breadwallet"
titleshort: "breadwallet"
compat: "mobile android ios"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletbreadwallet"
        link: "https://itunes.apple.com/app/breadwallet/id885251393"
        source: "https://github.com/voisine/breadwallet"
        screenshot: "breadwallet.png"
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
        text: "walletbreadwallet"
        link: "https://play.google.com/store/apps/details?id=com.breadwallet"
        source: "https://github.com/breadwallet/breadwallet-android"
        screenshot: "breadwallet.png"
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
