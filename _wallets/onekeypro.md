---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: onekeypro
title: "OneKey Pro"
titleshort: "OneKey Pro"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletonekeypro"
        link: "https://onekey.so/products/onekey-pro-hardware-wallet/"
        source: "https://github.com/OneKeyHQ/firmware-pro"
        screenshot: "onekeypro.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
