---
id: greenaddress
title: "GreenAddress"
titleshort: "Green<br>Address"
compat: "mobile desktop web android ios windows mac linux"
level: 3
platform:
  mobile:
    text: "walletgreenaddress"
    link: "https://play.google.com/store/apps/details?id=it.greenaddress.cordova"
    source: "https://github.com/greenaddress/WalletCordova"
    screenshot: "greenaddressandroid.png"
    os:
    - android
    - ios
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
  desktop:
    text: "walletgreenaddress"
    link: "https://chrome.google.com/webstore/detail/greenaddressit/dgbimgjoijjemhdamicmljbncacfndmp"
    source: "https://github.com/greenaddress/WalletCrx"
    screenshot: "greenaddressdesktop.png"
    os:
    - windows
    - mac
    - linux
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
  web:
    text: "walletgreenaddress"
    link: "https://chrome.google.com/webstore/detail/greenaddressit/dgbimgjoijjemhdamicmljbncacfndmp"
    source: "https://github.com/greenaddress/WalletCrx"
    screenshot: "greenaddressdesktop.png"
    os:
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
  ios:
    text: "walletgreenaddress"
    link: "https://itunes.apple.com/app/id1206035886"
    source: "https://github.com/greenaddress/WalletCordova"
    screenshot: "greenaddressandroid.png"
    os:
    - android
    - ios
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
  android:
    text: "walletgreenaddress"
    link: "https://play.google.com/store/apps/details?id=it.greenaddress.cordova"
    source: "https://github.com/greenaddress/WalletCordova"
    screenshot: "greenaddressandroid.png"
    os:
    - android
    - ios
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
---
