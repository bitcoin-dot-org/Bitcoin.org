---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: burner
title: "Burner"
titleshort: "Burner"
compat: "hardware mobile desktop android ios windows mac linux"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "burner"
        link: "https://burner.pro/"
        source: "https://github.com/arx-research/libhalo"
        screenshot: "burner-btc.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
--- 