---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: trustwallet
title: "Trust Wallet"
titleshort: "Trust"
compat: "mobile android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "wallettrust"
        link: "https://itunes.apple.com/us/app/trust-ethereum-wallet/id1288339409"
        source: "https://github.com/TrustWallet"
        screenshot: "trustwalletios.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkfailtransparencyclosedsource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "wallettrust"
        link: "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp"
        source: "https://github.com/TrustWallet"
        screenshot: "trustwalletandroid.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkfailtransparencyclosedsource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
