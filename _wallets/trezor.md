---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: trezor
title: "Trezor"
titleshort: "Trezor"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "wallettrezor"
        link: "https://trezor.io/"
        source: "https://github.com/trezor/"
        screenshot: "trezor.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
