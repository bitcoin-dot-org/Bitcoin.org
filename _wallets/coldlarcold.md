---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: coldlarcold
title: "Coldlarcold"
titleshort: "Coldlarcold"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletcoldlarcold"
        link: "http://www.coldlar.com/"
        source: "https://github.com/cnzkh/coldlar"
        screenshot: "coldlarcold.png"
        check:
        control: "checkgoodcontrolfull"
        validation: "checkneutralvalidationvariable"
        transparency: "checkneutralvalidationvariable"
        environment: "checkgoodenvironmenthardware"
        privacy: "checkgoodenvironmenthardware"
        fees: "checkneutralfeecontrolvariable"
        privacycheck:
        privacyaddressreuse: "checkfailprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurespv"
        privacynetwork: "checkfailprivacynetworknosupporttor"
        control: "checkgoodcontrolfull"
---