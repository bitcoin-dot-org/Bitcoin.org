---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: greenbits
title: "GreenBits"
titleshort: "GreenBits"
compat: "mobile android"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletgreenbits"
        link: "https://play.google.com/store/apps/details?id=com.greenaddress.greenbits_android_wallet"
        source: "https://github.com/greenaddress/GreenBits"
        screenshot: "greenbits.png"
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
