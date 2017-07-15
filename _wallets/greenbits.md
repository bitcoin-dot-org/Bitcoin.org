---
id: greenbits
title: "GreenBits"
titleshort: "GreenBits"
compat: "mobile android"
level: 2
platform:
  mobile:
    text: "walletgreenbits"
    link: "https://play.google.com/store/apps/details?id=com.greenaddress.greenbits_android_wallet"
    source: "https://github.com/greenaddress/GreenBits"
    screenshot: "greenbits.png"
    os:
    - android
    check:
      control: "checkpasscontrolmulti"
      validation: "checkpassvalidationspvp2p"
      transparency: "checkpasstransparencyopensource"
      environment: "checkpassenvironmenttwofactor"
      privacy: "checkpassprivacybasic"
      fees: "checkgoodfeecontrolfull"
    privacycheck:
      privacyaddressreuse: "checkpassprivacyaddressrotation"
      privacydisclosure: "checkfailprivacydisclosureaccount"
      privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
