---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: Cobo
title: "Cobo Wallet"
titleshort: "Cobo Wallet"
compat: "mobile android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "Cobo Wallet"
        link: "https://play.google.com/store/apps/details?id=cobo.wallet"
        source: "https://github.com/cobowallet"
        screenshot: "##"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: ios
        text: "Cobo Wallet"
        link: "https://itunes.apple.com/us/app/cobo-cryptocurrency-wallet/id1406282615"
        source: "https://github.com/cobowallet"
        screenshot: "##"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
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
        text: "Cobo Wallet"
        link: "https://cobo.com/"
        source: "https://github.com/cobowallet"
        screenshot: "##"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkfailtransparencyremote"
          environment: "checkfailenvironmentdesktop"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
