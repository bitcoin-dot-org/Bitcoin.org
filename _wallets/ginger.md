---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: ginger
title: "Ginger Wallet"
titleshort: "Ginger"
compat: "desktop windows mac linux"
level: 3
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletginger"
      link: "https://gingerwallet.io/"
      source: "https://github.com/GingerPrivacy/GingerWallet"
      screenshot: "ginger.png"
      features: "2fa bech32 hardware_wallet segwit"
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
