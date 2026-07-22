---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: jadeplus
title: "Blockstream Jade Plus"
titleshort: "Jade Plus"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletjadeplus"
        link: "https://blockstream.com/jade/"
        source: "https://github.com/Blockstream/Jade"
        screenshot: "jadeplus.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit taproot"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
