---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: digitalbitbox
title: "DigitalBitbox"
titleshort: "Digital<br />Bitbox"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletdbb"
        link: "https://digitalbitbox.com/"
        source: "https://github.com/digitalbitbox/"
        screenshot: "digitalbitbox.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
