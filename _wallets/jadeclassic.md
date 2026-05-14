---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: jadeclassic
title: "Blockstream Jade Classic"
titleshort: "Jade Classic"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletjadeclassic"
        link: "https://blockstream.com/jade/"
        source: "https://github.com/Blockstream/Jade"
        screenshot: "jadeclassic.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
