---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: cypherockx1
title: "Cypherock X1"
titleshort: "Cypherock X1"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletcypherockx1"
        link: "https://www.cypherock.com/"
        source: "https://github.com/Cypherock/x1_wallet_firmware"
        screenshot: "cypherockx1.png"
        features: "2fa bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkpasstransparencyopensourcehardware"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
