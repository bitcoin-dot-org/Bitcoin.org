---
id: msigna
title: "mSIGNA"
titleshort: "mSIGNA"
compat: "desktop windows mac linux"
level: 2
platform:
  desktop:
    text: "walletmsigna"
    link: "https://ciphrex.com/redirect/?referer=bitcoin.org"
    source: "https://ciphrex.com/redirect/?url=https://github.com/ciphrex/CoinVault?referer=bitcoin.org"
    screenshot: "msigna.png"
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
      fees: "checkfailfeecontrolstatic"
    privacycheck:
      privacyaddressreuse: "checkpassprivacyaddressrotation"
      privacydisclosure: "checkpassprivacydisclosurefullnode"
      privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
