---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: corazon
title: "Corazon"
titleshort: "Corazon"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletcorazon"
        link: "https://gray.sg/collections/corazon-wallet"
        source: "https://github.com/trezor/"
        screenshot: "corazon.jpg?1528322191"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
