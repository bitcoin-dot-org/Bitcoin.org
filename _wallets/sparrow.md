---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: sparrow
title: "Sparrow Wallet"
titleshort: "Sparrow"
compat: "desktop windows mac linux"
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletsparrow"
      link: "https://sparrowwallet.com/"
      source: "https://github.com/sparrowwallet/sparrow/"
      screenshot: "sparrow.png"
      features: "bech32 hardware_wallet legacy_addresses multisig segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationservers"
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
