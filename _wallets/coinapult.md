---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: coinapult
title: "Coinapult"
titleshort: "Coinapult"
compat: "web"
level: 4
platform:
  - web:
    name: web
    os:
      - name: web
        text: "walletcoinapult"
        link: "https://coinapult.com/"
        screenshot: "coinapult.png"
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
