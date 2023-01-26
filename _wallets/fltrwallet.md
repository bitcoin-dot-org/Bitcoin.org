---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: fltrwallet
title: "fltrWallet Privacy First Bitcoin Wallet"
titleshort: "fltrWallet"
compat: "mobile ios desktop mac"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletfltr"
        link: "https://apps.apple.com/app/fltrwallet/id1620857882"
        source: "https://github.com/fltrWallet"
        screenshot: "fltrwallet_ios.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurefullnode"
          privacynetwork: "checkfailprivacynetworknosupporttor"
  - desktop:
    name: desktop
    os:
      - name: mac
        text: "walletfltr"
        link: "https://apps.apple.com/app/fltrwallet/id1620857882"
        source: "https://github.com/fltrWallet"
        screenshot: "fltrwallet_mac.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurefullnode"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
