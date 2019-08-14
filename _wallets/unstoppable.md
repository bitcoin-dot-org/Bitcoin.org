---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: unstoppable
title: "Unstoppable Wallet"
titleshort: "Unstoppable"
compat: "mobile android ios"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletunstoppable"
        link: "https://play.google.com/store/apps/details?id=io.horizontalsystems.bankwallet"
        source: "https://github.com/horizontalsystems/unstoppable-wallet-android"      
        screenshot: "unstoppable.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: ios
        text: "walletunstoppable"
        link: "https://itunes.apple.com/app/bank-bitcoin-wallet/id1447619907/"
        source: "https://github.com/horizontalsystems/unstoppable-wallet-ios"
        screenshot: "unstoppable.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"          
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
