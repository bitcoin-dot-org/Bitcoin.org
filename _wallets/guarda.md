---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: guarda
title: "Guarda Wallet"
titleshort: "Guarda"
compat: "web desktop windows mac linux mobile android ios chrome"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletguarda"
        link: "https://github.com/guardaco/guarda-android-wallets/blob/master/APKs/btc-release.apk"
        source: "https://github.com/guardaco/guarda-android-wallets"
        screenshot: "GuardaScreen.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkgoodvalidationfullnoderequired"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
