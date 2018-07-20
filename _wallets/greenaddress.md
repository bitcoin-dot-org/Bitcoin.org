---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: greenaddress
title: "GreenAddress"
titleshort: "Green Address"
compat: "mobile desktop android ios windows mac linux"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletgreenaddress"
        link: "https://itunes.apple.com/app/id1206035886"
        source: "https://github.com/greenaddress/WalletCordova"
        screenshot: "greenaddressandroid.png?1528322191"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletgreenaddress"
        link: "https://play.google.com/store/apps/details?id=it.greenaddress.cordova"
        source: "https://github.com/greenaddress/WalletCordova"
        screenshot: "greenaddressandroid.png?1528322191"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletgreenaddress"
      link: "https://github.com/greenaddress/WalletElectron/releases"
      source: "https://github.com/greenaddress/WalletElectron"
      screenshot: "greenaddressdesktop.png?1528322191"
      check:
        control: "checkpasscontrolmulti"
        validation: "checkfailvalidationcentralized"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmenttwofactor"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
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
---
