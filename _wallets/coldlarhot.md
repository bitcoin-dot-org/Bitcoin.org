---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: coldlerhot
title: "Coldlarhot"
titleshort: "Coldlarhot"
compat: "android ios"
level: 2
platform:
  - mobile:
    name: mobile
    os:
          - name: android
            text: "walletcoldlarhot"
            link: "http://www.coldlar.com/"
            source: "https://github.com/cnzkh/coldlar"
            screenshot: "coldlarhot.png"
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
          - name: ios
            text: "walletcoldlarhot"
            link: "http://www.coldlar.com/"
            source: "https://github.com/cnzkh/coldlar"
            screenshot: "coldlarhot.png"
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


---