---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: trezorsafe3
title: "Trezor Safe 3"
titleshort: "Trezor Safe 3"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "wallettrezorsafe3"
        link: "https://trezor.io/trezor-safe-3"
        source: "https://github.com/trezor/trezor-firmware"
        screenshot: "trezorsafe3.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
