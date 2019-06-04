---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: hodler
title: "HODLER Open Source Multi-Asset Wallet"
titleshort: "HODLER"
compat: "desktop windows mobile android linux"
level: 3
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "wallethodler"
      link: "https://hodler.tech"
      source: "https://github.com/HODLERTECH/HODLER-Open-Source-Multi-Asset-Wallet"
      screenshot: "desktophdl.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkgoodtransparencydeterministic"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkpassprivacyaddressrotation"
        fees: "checkpassfeecontroloverride"
      privacycheck:
        privacyaddressreuse: "checkfailprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: windows
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
  - mobile:
    name: mobile
    default: &DEFAULT
      text: "wallethodler"
      link: "https://hodler.tech"
      source: "https://github.com/HODLERTECH/HODLER-Open-Source-Multi-Asset-Wallet"
      screenshot: "mobilehdl.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkgoodtransparencydeterministic"
        environment: "checkpassenvironmentmobile"
        privacy: "checkpassprivacyaddressrotation"
        fees: "checkpassfeecontroloverride"
      privacycheck:
        privacyaddressreuse: "checkfailprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: android
        <<: *DEFAULT
      
---
