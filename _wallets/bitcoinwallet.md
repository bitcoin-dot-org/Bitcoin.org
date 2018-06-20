---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitcoinwallet
title: "Bitcoin Wallet"
titleshort: "Bitcoin Wallet"
compat: "mobile android"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletbitcoinwallet"
        link: "https://play.google.com/store/apps/details?id=de.schildbach.wallet"
        source: "https://github.com/bitcoin-wallet/bitcoin-wallet"
        screenshot: "bitcoinwalletandroid.png?1528322191"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
