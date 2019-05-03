---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: dropbit
title: "DropBit"
titleshort: "DropBit"
compat: "mobile android ios"
level: 2
platform:
  - mobile:
    name: mobile
    default: &DEFAULT
        text: "walletdropbit"
        screenshot: "dropbit.png"
        check:
          control: "checkgoodcontrolfull"
          transparency: "checkpasstransparencyopensource"
          validation: "checkfailvalidationcentralized"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: ios
        <<: *DEFAULT
        link: "https://itunes.apple.com/us/app/coinkeeper-bitcoin-wallet/id1347304050"
        source: "https://github.com/coinninjadev/dropbit-ios"
      - name: android
        <<: *DEFAULT
        link: "https://play.google.com/store/apps/details?id=com.coinninja.coinkeeper"
        source: "https://github.com/coinninjadev/dropbit-android"
---
