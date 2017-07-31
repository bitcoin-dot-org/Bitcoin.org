---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: xapo
title: "Xapo"
titleshort: "Xapo"
compat: "web"
level: 4
platform:
  - web:
    name: web
    os:
      - name: web
        text: "walletxapo"
        link: "https://xapo.com/"
        screenshot: "xapo.png"
        check:
          control: "checkfailcontrolthirdpartyinsured"
          validation: "checkfailvalidationcentralized"
          transparency: "checkfailtransparencyremote"
          environment: "checkfailenvironmentdesktop"
          privacy: "checkpassprivacybasic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
