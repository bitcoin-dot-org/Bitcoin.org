---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: keepkey
title: "KeepKey"
titleshort: "KeepKey"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletkeepkey"
        link: "https://www.keepkey.com/"
        source: "https://github.com/keepkey/"
        screenshot: "keepkey.png?1528322191"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
