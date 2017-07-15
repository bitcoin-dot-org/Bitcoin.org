---
id: armory
title: "Armory"
titleshort: "Armory"
compat: "desktop windows mac linux"
level: 2
platform:
  desktop:
    text: "walletarmory"
    link: "https://btcarmory.com/"
    source: "https://github.com/goatpig/BitcoinArmory"
    screenshot: "armory.png"
    os:
    - windows
    - mac
    - linux
    check:
      control: "checkgoodcontrolfull"
      validation: "checkgoodvalidationfullnoderequired"
      transparency: "checkpasstransparencyopensource"
      environment: "checkfailenvironmentdesktop"
      privacy: "checkgoodprivacyimproved"
      fees: "checkgoodfeecontrolfull"
    privacycheck:
      privacyaddressreuse: "checkpassprivacyaddressrotation"
      privacydisclosure: "checkpassprivacydisclosurefullnode"
      privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
