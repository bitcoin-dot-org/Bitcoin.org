---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: simplebitcoinwallet
title: "Simple Bitcoin Wallet"
titleshort: "Simple<br>Bitcoin"
compat: "mobile android"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletsimplebitcoinwallet"
        link: "https://play.google.com/store/apps/details?id=com.btcontract.wallet"
        source: "https://github.com/btcontract/wallet"
        screenshot: "simplebitcoinwalletandroid.png"
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
---
