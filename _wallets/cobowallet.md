---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: Cobo
title: "Cobo Wallet"
titleshort: "Cobo"
compat: "mobile android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletcobo"
        link: "https://play.google.com/store/apps/details?id=cobo.wallet"
        source: "https://github.com/cobowallet"
        screenshot: "cobowallet.png"
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
        text: "walletcobo"
        link: "https://itunes.apple.com/us/app/cobo-cryptocurrency-wallet/id1406282615"
        source: "https://github.com/cobowallet"
        screenshot: "cobowallet.png"
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
 
---
