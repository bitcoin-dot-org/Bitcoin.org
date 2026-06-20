---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bither
title: "Bither"
titleshort: "Bither"
compat: "mobile ios android"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletbither"
        link: "https://apps.apple.com/us/app/bither-bitcoin-wallet/id899478936"
        source: "https://github.com/bither/bither-ios"
        screenshot: "bithermobile.png"
        features: "legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkfailfeecontrolstatic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletbither"
        link: "https://bither.net/android/"
        source: "https://github.com/bither/bither-android"
        screenshot: "bithermobile.png"
        features: "legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkfailfeecontrolstatic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
