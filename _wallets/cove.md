---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: cove
title: "Cove"
titleshort: "Cove"
compat: "mobile ios android"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletcove"
        link: "https://apps.apple.com/app/cove-simple-bitcoin-wallet/id6642680364"
        source: "https://github.com/bitcoinppl/cove"
        screenshot: "covemobile.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletcove"
        link: "https://play.google.com/store/apps/details?id=org.bitcoinppl.cove"
        source: "https://github.com/bitcoinppl/cove"
        screenshot: "covemobile.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
