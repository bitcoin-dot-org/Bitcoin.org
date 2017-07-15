---
id: bitcoinknots
title: "Bitcoin Knots"
titleshort: "Bitcoin<br>Knots"
compat: "desktop windows mac linux"
level: 1
platform:
  desktop:
    text: "walletbitcoinknots"
    link: "https://bitcoinknots.org/"
    source: "https://github.com/bitcoinknots/bitcoin/"
    screenshot: "bitcoinknots.png"
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
