---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitgo
title: "BitGo"
titleshort: "BitGo"
compat: "web"
level: 3
platform:
  - web:
    name: web
    os:
      - name: web
        text: "walletbitgo"
        link: "https://www.bitgo.com/"
        screenshot: "bitgo.png"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkfailvalidationcentralized"
          transparency: "checkfailtransparencyremote"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
