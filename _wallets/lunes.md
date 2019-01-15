---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: lunes
title: "LUNES Decentralized Multi-Service Wallet"
titleshort: "LUNES"
compat: "mobile web android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletlunes"
        link: "https://itunes.apple.com/us/app/lunes-wallet/id1447150748"
        source: "https://github.com/Lunes-platform/Lunes_Wallet"
        screenshot: "lunes.png"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletlunes"
        link: "https://play.google.com/store/apps/details?id=com.luneswallet"
        source: "https://github.com/Lunes-platform/Lunes_Wallet"
        screenshot: "lunes.png"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
  - web:
    name: web
    os:
      - name: web
        text: "walletlunes"
        link: "https://luneswallet.app"
        source: "https://github.com/Lunes-platform/Lunes_Wallet"
        screenshot: "lunes.png"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkfailvalidationcentralized"
          transparency: "checkfailtransparencyremote"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---