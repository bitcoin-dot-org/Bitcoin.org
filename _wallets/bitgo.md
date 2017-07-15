---
id: bitgo
title: "BitGo"
titleshort: "BitGo"
compat: "web desktop windows mac linux"
level: 3
platform:
  desktop:
    text: "walletbitgo"
    link: "https://chrome.google.com/webstore/detail/bitgo/jlgeogaipkoajobchncghcojanffjfhl"
    source: "https://github.com/BitGo/bitgo-chrome"
    screenshot: "bitgo.png"
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
      fees: "checkpassfeecontroldynamic"
    privacycheck:
      privacyaddressreuse: "checkpassprivacyaddressrotation"
      privacydisclosure: "checkfailprivacydisclosureaccount"
      privacynetwork: "checkpassprivacynetworksupporttorproxy"
  web:
    text: "walletbitgo"
    link: "https://www.bitgo.com/"
    screenshot: "bitgo.png"
    os:
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
