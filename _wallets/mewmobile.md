---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: mewmobile
title: 'MEW Mobile'
titleshort: 'MEW Mobile'
compat: 'mobile android ios'
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: 'mewmobile'
        link: 'https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet'
        source: 'https://github.com/MyEtherWallet/mew-wallet-android-kit'
        screenshot: 'mewmobile.png'
        features: 'bech32 legacy_addresses segwit'
        check:
          control: 'checkgoodcontrolfull'
          validation: 'checkpassvalidationspvp2p'
          transparency: 'checkpasstransparencyopensource'
          environment: 'checkpassenvironmentmobile'
          privacy: 'checkpassprivacybasic'
          fees: 'checkgoodfeecontrolfull'
        privacycheck:
          privacyaddressreuse: 'checkpassprivacyaddressrotation'
          privacydisclosure: 'checkfailprivacydisclosurespv'
          privacynetwork: 'checkfailprivacynetworknosupporttor'
      - name: ios
        text: 'mewmobile'
        link: 'https://apps.apple.com/us/app/mew-crypto-wallet-defi-web3/id1464614025'
        source: 'https://github.com/MyEtherWallet/mew-wallet-ios-kit'
        screenshot: 'mewmobile.png'
        features: 'bech32 legacy_addresses segwit'
        check:
          control: 'checkgoodcontrolfull'
          validation: 'checkpassvalidationspvp2p'
          transparency: 'checkpasstransparencyopensource'
          environment: 'checkpassenvironmentmobile'
          privacy: 'checkpassprivacybasic'
          fees: 'checkgoodfeecontrolfull'
        privacycheck:
          privacyaddressreuse: 'checkpassprivacyaddressrotation'
          privacydisclosure: 'checkfailprivacydisclosurespv'
          privacynetwork: 'checkfailprivacynetworknosupporttor'
---
