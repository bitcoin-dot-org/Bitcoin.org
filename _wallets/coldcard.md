---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: coldcard
title: "Coldcard"
titleshort: "Coldcard"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletcoldcard"
        link: "https://coldcardwallet.com/"
        source: "https://github.com/coldcard/"
        screenshot: "coldcard.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkpasstransparencyopensource"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
