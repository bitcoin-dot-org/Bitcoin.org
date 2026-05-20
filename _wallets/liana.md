---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
id: liana
title: "Liana"
titleshort: "Liana"
compat: "desktop windows mac linux"
level: 1
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletliana"
      link: "https://lianawallet.com/"
      source: "https://github.com/wizardsardine/liana/"
      screenshot: "liana.png"
      features: "bech32 full_node hardware_wallet multisig segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkgoodvalidationfullnode"
        transparency: "checkgoodtransparencydeterministic"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkpassprivacydisclosurefullnode"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
---
