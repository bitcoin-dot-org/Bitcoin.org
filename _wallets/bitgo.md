---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitgo
title: "BitGo"
titleshort: "BitGo"
compat: "web desktop windows mac linux"
level: 3
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletbitgo"
      link: "https://chrome.google.com/webstore/detail/bitgo/jlgeogaipkoajobchncghcojanffjfhl"
      source: "https://github.com/BitGo/bitgo-chrome"
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
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
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
