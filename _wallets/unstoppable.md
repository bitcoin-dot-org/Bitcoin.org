---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: unstoppable
title: "Unstoppable"
titleshort: "Unstoppable"
compat: "mobile android ios"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletunstoppable"
        link: "https://apps.apple.com/app/bank-bitcoin-wallet/id1447619907?ls=1"
        source: "https://github.com/horizontalsystems/unstoppable-wallet-ios"
        screenshot: "unstoppable_ios.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletunstoppable"
        link: "https://play.google.com/store/apps/details?id=io.horizontalsystems.bankwallet"
        source: "https://github.com/horizontalsystems/unstoppable-wallet-android"
        screenshot: "unstoppable_android.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
