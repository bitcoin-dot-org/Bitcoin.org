---
id: trezor
title: "Trezor"
titleshort: "Trezor"
compat: "hardware"
level: 2
platform:
  hardware:
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
