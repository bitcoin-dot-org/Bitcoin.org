---
id: btc
title: "BTC.com Bitcoin Wallet"
titleshort: "BTC.com"
compat: "mobile web android ios"
level: 3
platform:
  mobile:
    text: "walletbtccom"
    link: "https://play.google.com/store/apps/details?id=com.blocktrail.mywallet"
    source: "https://github.com/blocktrail/blocktrail-wallet"
    screenshot: "btccomwallet.png"
    os:
    - android
    - ios
    check:
      control: "checkpasscontrolmulti"
      validation: "checkfailvalidationcentralized"
      transparency: "checkpasstransparencyopensource"
      environment: "checkpassenvironmenttwofactor"
      privacy: "checkpassprivacybasic"
      fees: "checkpassfeecontroldynamic"
    privacycheck:
      privacyaddressreuse: "checkpassprivacyaddressrotation"
      privacydisclosure: "checkfailprivacydisclosureaccount"
      privacynetwork: "checkfailprivacynetworknosupporttor"
  web:
    text: "walletbtccom"
    link: "https://wallet.btc.com"
    source: "https://github.com/blocktrail/blocktrail-webwallet"
    screenshot: "btccomwallet.png"
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
  ios:
    text: "walletbtccom"
    link: "https://itunes.apple.com/us/app/blocktrail-bitcoin-wallet/id1019614423"
    source: "https://github.com/blocktrail/blocktrail-wallet"
    screenshot: "btccomwallet.png"
    os:
    - ios
    check:
      control: "checkpasscontrolmulti"
      validation: "checkfailvalidationcentralized"
      transparency: "checkpasstransparencyopensource"
      environment: "checkpassenvironmenttwofactor"
      privacy: "checkpassprivacybasic"
      fees: "checkpassfeecontroldynamic"
    privacycheck:
      privacyaddressreuse: "checkpassprivacyaddressrotation"
      privacydisclosure: "checkfailprivacydisclosureaccount"
      privacynetwork: "checkfailprivacynetworknosupporttor"
  android:
    text: "walletbtccom"
    link: "https://play.google.com/store/apps/details?id=com.blocktrail.mywallet"
    source: "https://github.com/blocktrail/blocktrail-wallet"
    screenshot: "btccomwallet.png"
    os:
    - android
    check:
      control: "checkpasscontrolmulti"
      validation: "checkfailvalidationcentralized"
      transparency: "checkpasstransparencyopensource"
      environment: "checkpassenvironmenttwofactor"
      privacy: "checkpassprivacybasic"
      fees: "checkpassfeecontroldynamic"
    privacycheck:
      privacyaddressreuse: "checkpassprivacyaddressrotation"
      privacydisclosure: "checkfailprivacydisclosureaccount"
      privacynetwork: "checkfailprivacynetworknosupporttor"
---
