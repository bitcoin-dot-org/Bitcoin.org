---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: safetmini
title: "ARCHOS Safe-T mini"
titleshort: "ARCHOS Safe-T mini"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletsafetmini"
        link: "https://safe-t.io/"
        source: "https://github.com/archos-safe-t/"
        screenshot: "safetmini.png?1528322191"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
