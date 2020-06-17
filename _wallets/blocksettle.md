---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: blocksettle
title: "BlockSettle terminal"
titleshort: "BlockSettle"
compat: "desktop windows mac linux"
user: beginner
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletblocksettle"
      link: "https://www.blocksettle.com/downloads/terminal"
      source: "https://github.com/BlockSettle/terminal"
      screenshot: "blocksettle.png"
      features: "bech32 full_node hardware_wallet mixing_shuffling legacy_addresses segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkgoodvalidationfullnoderequired"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkgoodprivacyimproved"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkpassprivacydisclosurefullnode"
        privacynetwork: "checkpassprivacynetworksupporttorproxy"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
---
