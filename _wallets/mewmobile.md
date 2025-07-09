---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: mewmobile
title: 'MEW Mobile'
titleshort: 'MEW Mobile'
compat: 'mobile ios'
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: 'walletmewmobile'
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
