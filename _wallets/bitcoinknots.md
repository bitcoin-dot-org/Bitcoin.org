---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitcoinknots
title: "Bitcoin Knots"
titleshort: "Bitcoin<br>Knots"
compat: "desktop windows mac linux"
level: 1
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletbitcoinknots"
      link: "https://bitcoinknots.org/"
      source: "https://github.com/bitcoinknots/bitcoin/"
      screenshot: "bitcoinknots.png"
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
