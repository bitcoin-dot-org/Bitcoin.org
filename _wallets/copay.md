---
id: copay
title: "Copay"
titleshort: "Copay"
compat: "mobile desktop web android ios windowsphone windows mac linux"
level: 3
platform:
  mobile:
    text: "walletcopay"
    link: "https://copay.io"
    source: "https://github.com/bitpay/copay"
    screenshot: "copay.png"
    os:
    - android
    - ios
    - windowsphone
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
  desktop:
    text: "walletcopay"
    link: "https://copay.io/"
    source: "https://github.com/bitpay/copay"
    screenshot: "copay.png"
    os:
    - windows
    - mac
    - linux
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
---
