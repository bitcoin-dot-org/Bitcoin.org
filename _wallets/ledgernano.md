---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: ledgernano
title: "Ledger Nano"
titleshort: "Ledger<br>Nano"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletnano"
        link: "https://www.ledgerwallet.com/"
        source: "https://github.com/LedgerHQ/"
        screenshot: "ledger.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkfailtransparencynew"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
