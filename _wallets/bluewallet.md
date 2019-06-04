---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bluewallet
title: "BlueWallet"
titleshort: "BlueWallet"
compat: "mobile android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletbluewallet"
        link: "https://itunes.apple.com/app/bluewallet-bitcoin-wallet/id1376878040"
        source: "https://github.com/bluewallet/bluewallet"
        screenshot: "bluewallet.png?1528322191"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletbluewallet"
        link: "https://play.google.com/store/apps/details?id=io.bluewallet.bluewallet"
        source: "https://github.com/bluewallet/bluewalletd"
        screenshot: "bluewallet.png?1528322191"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
