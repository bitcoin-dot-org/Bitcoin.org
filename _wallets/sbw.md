---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: sbw
title: "SBW"
titleshort: "SBW"
compat: "mobile android"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletsbw"
        link: "https://play.google.com/store/apps/details?id=com.btcontract.wallet"
        source: "https://github.com/btcontract/wallet"
        screenshot: "sbw.png"
        features: "legacy_addresses bech32 segwit hardware_wallet lightning"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
