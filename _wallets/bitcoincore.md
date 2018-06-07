---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitcoincore
title: "Bitcoin Core"
titleshort: "Bitcoin<br>Core"
compat: "desktop windows mac linux"
level: 1
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletbitcoincore"
      link: "bitcoincore"
      source: "https://github.com/bitcoin/bitcoin"
      screenshot: "bitcoincore.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkgoodvalidationfullnode"
        transparency: "checkgoodtransparencydeterministic"
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
