---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: dcentbiometric
title: "D'CENT Biometric Wallet"
titleshort: "D'CENT Wallet"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletdcentbiometric"
        link: "https://dcentwallet.com/"
        source: "https://github.com/DcentWallet/biometric-firmware/releases"
        screenshot: "dcentbiometric.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkpasstransparencyopenspechardware"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
