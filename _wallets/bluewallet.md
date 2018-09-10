---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bluewallet
title: "BlueWallet"
titleshort: "BlueWallet"
compat: "mobile ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletbluewallet"
        link: "https://itunes.apple.com/us/app/bluewallet-bitcoin-wallet/id1376878040"
        source: "https://github.com/Overtorment/BlueWallet"
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
