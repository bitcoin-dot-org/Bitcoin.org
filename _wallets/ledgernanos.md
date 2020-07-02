---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: ledgernanos
title: "Ledger Nano S"
titleshort: "Ledger Nano S"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletledgernanos"
        link: "https://www.ledgerwallet.com/"
        source: "https://github.com/LedgerHQ/nanos-nonsecure-firmware-releases"
        screenshot: "ledgernanos.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkpasstransparencyopenspechardware"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
