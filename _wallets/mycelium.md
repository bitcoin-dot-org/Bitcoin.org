---
id: mycelium
title: "Mycelium"
titleshort: "Mycelium"
compat: "mobile android"
level: 3
platform:
  mobile:
    text: "walletmyceliumwallet"
    link: "https://play.google.com/store/apps/details?id=com.mycelium.wallet"
    source: "https://github.com/mycelium-com/wallet"
    screenshot: "mycelium.png"
    os:
    - android
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
      privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
