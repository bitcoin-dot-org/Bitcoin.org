---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: trezormodelt
title: "Trezor Model T"
titleshort: "Trezor Model T"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "wallettrezormodelt"
        link: "https://trezor.io/"
        source: "https://github.com/trezor/trezor-firmware"
        screenshot: "trezormodelt.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
