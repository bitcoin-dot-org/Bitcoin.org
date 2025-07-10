---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: onekeyclassic1s
title: "OneKey Classic 1S"
titleshort: "OneKey Classic 1S"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletonekeyclassic1s"
        link: "https://onekey.so/products/onekey-classic-1s-hardware-wallet/"
        source: "https://github.com/OneKeyHQ/firmware-classic1s"
        screenshot: "onekeyclassic1s.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
