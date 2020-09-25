---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: infinitywallet
title: "Infinity Wallet"
titleshort: "Infinity Wallet"
compat: "desktop windows mac linux"
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletinfinitywallet"
      link: "https://infinitywallet.io/"
      source: "https://infinitywallet.io/download"
      screenshot: "infinitywallet.png"
      features: "2fa bech32 legacy_addresses segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationspvservers"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmenttwofactor"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurespv"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
---
