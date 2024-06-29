---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: tangemwallet
title: "Tangem Wallet"
titleshort: "Tangem Wallet"
compat: "hardware"
user: beginner
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "wallettangemwallet"
        link: "https://tangem.com/en/?promocode=BITCOINORG&utm_source=BitcoinOrg&utm_medium=article&utm_campaign=hardware"
        source: "https://github.com/tangem/tangem-app-ios"
        screenshot: "tangemwallet.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkgoodvalidationfullnode"
          transparency: "checkpasstransparencyopensource"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkgoodprivacyimproved"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurefullnode"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
