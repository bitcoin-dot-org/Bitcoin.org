---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: zeus
title: "ZEUS"
titleshort: "ZEUS"
compat: "mobile android ios"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletzeus"
        link: "https://play.google.com/store/apps/details?id=app.zeusln.zeus"
        source: "https://github.com/ZeusLN/zeus"
        screenshot: "zeusandroid.png"
        features: "bech32 lightning segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
      - name: ios
        text: "walletzeus"
        link: "https://apps.apple.com/app/zeus-wallet/id1456038895"
        source: "https://github.com/ZeusLN/zeus"
        screenshot: "zeusios.png"
        features: "bech32 lightning segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
