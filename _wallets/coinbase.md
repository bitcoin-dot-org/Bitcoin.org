---
id: coinbase
title: "Coinbase"
titleshort: "Coinbase"
compat: "web"
level: 4
platform:
  - web:
    name: web
    os:
      - name: web
        text: "walletcoinbase"
        link: "https://coinbase.com"
        screenshot: "coinbase.png"
        check:
          control: "checkfailcontrolthirdparty"
          validation: "checkfailvalidationcentralized"
          transparency: "checkfailtransparencyremote"
          environment: "checkfailenvironmentdesktop"
          privacy: "checkpassprivacybasic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
