---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: blw
title: "BLW"
titleshort: "BLW"
compat: "mobile android"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletblw"
        link: "https://play.google.com/store/apps/details?id=com.lightning.walletapp"
        source: "https://github.com/btcontract/lnwallet"
        screenshot: "blwandroid.png?1528322191"
        features: "bech32 lightning segwit"
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
