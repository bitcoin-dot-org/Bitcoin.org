---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: wasabi
title: "Wasabi Wallet"
titleshort: "Wasabi"
compat: "desktop windows mac linux"
user: beginner
level: 3
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletwasabi"
      link: "https://wasabiwallet.io/"
      source: "https://github.com/zkSNACKs/WalletWasabi/"
      screenshot: "wasabi.png"
      features: "bech32 hardware_wallet segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkgoodtransparencydeterministic"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkgoodprivacyimproved"
        fees: "checkpassfeecontroloverride"
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
