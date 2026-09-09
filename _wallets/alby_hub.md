---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: alby_hub
title: "Alby Hub"
titleshort: "Alby Hub"
compat: "desktop windows mac linux"
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletalbyhub"
      link: "https://albyhub.com"
      source: "https://github.com/getAlby/hub"
      screenshot: "alby_hub.png"
      features: "bech32 lightning segwit"
      check: &DEFAULT-CHECK
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurespv"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
---
