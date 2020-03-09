---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: eclairmobile
title: "Eclair Mobile"
titleshort: "Eclair Mobile"
compat: "mobile android"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name:  android
        text: "walleteclairmobile"
        link: "https://play.google.com/store/apps/details?id=fr.acinq.eclair.wallet.mainnet2"
        source: "https://github.com/ACINQ/eclair-mobile"
        screenshot: "eclairmobile.png"
        features: "legacy_addresses lightning segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
