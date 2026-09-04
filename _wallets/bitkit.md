---
# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

id: bitkit
title: "Bitkit"
titleshort: "Bitkit"
compat: "mobile android ios"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    default: &DEFAULT
      text: "walletbitkit"
      features: "bech32 legacy_addresses lightning segwit taproot"
      check: &DEFAULT-CHECK
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationspvservers"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmentmobile"
        privacy: "checkpassprivacybasic"
        fees: "checkpassfeecontroloverride"
      privacycheck: &DEFAULT-PRIVACYCHECK
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: android
        link: "https://play.google.com/store/apps/details?id=to.bitkit"
        source: "https://github.com/synonymdev/bitkit-android"
        <<: *DEFAULT
        screenshot: "bitkitandroid.png"
      - name: ios
        link: "https://apps.apple.com/app/bitkit-bitcoin-wallet/id6502440655"
        source: "https://github.com/synonymdev/bitkit-ios"
        <<: *DEFAULT
        screenshot: "bitkitios.png"
---
