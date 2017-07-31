---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: copay
title: "Copay"
titleshort: "Copay"
compat: "mobile desktop android ios windowsphone windows mac linux"
level: 3
platform:
  - mobile:
    name: mobile
    default: &DEFAULT
      text: "walletcopay"
      link: "https://copay.io"
      source: "https://github.com/bitpay/copay"
      screenshot: "copay.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmentmobile"
        privacy: "checkpassprivacybasic"
        fees: "checkpassfeecontroldynamic"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: android
        <<: *DEFAULT
      - name: ios
        <<: *DEFAULT
      - name: windowsphone
        <<: *DEFAULT
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletcopay"
      link: "https://copay.io/"
      source: "https://github.com/bitpay/copay"
      screenshot: "copay.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkpassprivacybasic"
        fees: "checkpassfeecontroldynamic"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
---
