---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: greenaddress
title: "GreenAddress"
titleshort: "Green<br>Address"
compat: "mobile desktop web android ios windows mac linux"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletgreenaddress"
        link: "https://itunes.apple.com/app/id1206035886"
        source: "https://github.com/greenaddress/WalletCordova"
        screenshot: "greenaddressandroid.png"
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
        screenshot: "greenaddressandroid.png"
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
      link: "https://chrome.google.com/webstore/detail/greenaddressit/dgbimgjoijjemhdamicmljbncacfndmp"
      source: "https://github.com/greenaddress/WalletCrx"
      screenshot: "greenaddressdesktop.png"
      check:
        control: "checkpasscontrolmulti"
        validation: "checkfailvalidationcentralized"
        transparency: "checkfailtransparencyremote"
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
  - web:
    name: web
    os:
      - name: web
        text: "walletgreenaddress"
        link: "https://chrome.google.com/webstore/detail/greenaddressit/dgbimgjoijjemhdamicmljbncacfndmp"
        source: "https://github.com/greenaddress/WalletCrx"
        screenshot: "greenaddressdesktop.png"
        check:
          control: "checkpasscontrolmulti"
          validation: "checkfailvalidationcentralized"
          transparency: "checkfailtransparencyremote"
          environment: "checkpassenvironmenttwofactor"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
