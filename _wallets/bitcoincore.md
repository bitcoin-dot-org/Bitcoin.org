---
id: bitcoincore
title: "Bitcoin Core"
titleshort: "Bitcoin<br>Core"
compat: "desktop windows mac linux"
level: 1
platform:
  desktop:
    text: "walletbitcoinqt"
    link: "bitcoincore"
    source: "https://github.com/bitcoin/bitcoin"
    screenshot: "bitcoincore.png"
    os:
    - windows
    - mac
    - linux
    check:
      control: "checkgoodcontrolfull"
      validation: "checkgoodvalidationfullnode"
      transparency: "checkgoodtransparencydeterministic"
      environment: "checkfailenvironmentdesktop"
      privacy: "checkgoodprivacyimproved"
      fees: "checkgoodfeecontrolfull"
    privacycheck:
      privacyaddressreuse: "checkpassprivacyaddressrotation"
      privacydisclosure: "checkpassprivacydisclosurefullnode"
      privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
