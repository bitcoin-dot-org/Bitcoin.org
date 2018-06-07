---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: electrum
title: "Electrum"
titleshort: "Electrum"
compat: "desktop windows mac linux mobile android"
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletelectrum"
      link: "https://electrum.org"
      source: "https://github.com/spesmilo/electrum"
      screenshot: "electrum.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationspvservers"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmenttwofactor"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkpassprivacynetworksupporttorproxy"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletelectrum"
        link: "https://play.google.com/store/apps/details?id=org.electrum.electrum"
        source: "https://github.com/spesmilo/electrum"
        screenshot: "electrumandroid.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
