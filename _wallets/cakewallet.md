---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: cakewallet
title: "CakeWallet for iOS and Android"
titleshort: "CakeWallet"
compat: "mobile android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletcakewallet"
        link: "https://play.google.com/store/apps/details?id=com.cakewallet.cake_wallet"
        source: "https://github.com/cake-tech/cake_wallet"
        screenshot: "screenshot-android.jpg"
        features: "2fa"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkgoodvalidationfullnode"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkfailprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurefullnode"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: ios
        text: "walletcakewallet"
        link: "https://apps.apple.com/us/app/cake-wallet/id1334702542"
        source: "https://github.com/cake-tech/cake_wallet"
        screenshot: "screenshot-ios.jpg"
        features: "2fa"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkgoodvalidationfullnode"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkfailprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurefullnode"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---

