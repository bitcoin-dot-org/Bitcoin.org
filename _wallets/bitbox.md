---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitbox
title: "BitBox"
titleshort: "BitBox"
compat: "hardware"
user: experienced
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletbitbox"
        link: "https://shiftcrypto.ch/"
        source: "https://github.com/digitalbitbox/"
        screenshot: "bitbox.png?1528322191"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
