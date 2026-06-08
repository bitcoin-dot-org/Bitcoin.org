---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitboxnova
title: "BitBox02 Nova"
titleshort: "BitBox02 Nova"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletbitboxnova"
        link: "https://bitbox.swiss/bitbox02/nova/"
        source: "https://github.com/BitBoxSwiss/bitbox02-firmware"
        screenshot: "bitboxnova.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
