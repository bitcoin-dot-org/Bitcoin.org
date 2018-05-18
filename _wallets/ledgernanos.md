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
        source: "https://github.com/LedgerHQ/"
        screenshot: "ledgernanos.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkfailtransparencynew"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
