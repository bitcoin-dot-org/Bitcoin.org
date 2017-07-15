---
id: electrum
title: "Electrum"
titleshort: "Electrum"
compat: "desktop windows mac linux mobile android"
level: 2
platform:
  desktop:
    text: "walletelectrum"
    link: "https://electrum.org"
    source: "https://github.com/spesmilo/electrum"
    screenshot: "electrum.png"
    os:
    - windows
    - mac
    - linux
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
  android:
    text: "walletelectrum"
    link: "https://play.google.com/store/apps/details?id=org.electrum.electrum"
    source: "https://github.com/spesmilo/electrum"
    screenshot: "electrumandroid.png"
    os:
    - android
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
