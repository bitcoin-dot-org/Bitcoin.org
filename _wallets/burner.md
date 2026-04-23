---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: burner
title: "Burner"
titleshort: "Burner"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "burner"
        link: "https://burner.pro/bitcoin"
        source: "https://github.com/arx-research/libhalo"
        screenshot: "burnerbtc.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---