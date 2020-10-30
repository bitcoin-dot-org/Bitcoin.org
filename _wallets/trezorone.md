---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: trezorone
title: "Trezor One"
titleshort: "Trezor One"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "wallettrezorone"
        link: "https://trezor.io/"
        source: "https://github.com/trezor/trezor-firmware"
        screenshot: "trezorone.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
