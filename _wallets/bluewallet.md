---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bluewallet
title: "BlueWallet"
titleshort: "BlueWallet"
compat: "mobile desktop android ios mac"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    default: &DEFAULT-MOBILE
      text: "walletbluewallet"
      source: "https://github.com/BlueWallet/BlueWallet"
      features: "bech32 hardware_wallet legacy_addresses multisig segwit"
      check: &DEFAULT-MOBILE-CHECK
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationspvservers"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmentmobile"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
      privacycheck: &DEFAULT-PRIVACYCHECK
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: android
        <<: *DEFAULT-MOBILE
        link: "https://play.google.com/store/apps/details?id=io.bluewallet.bluewallet"
        screenshot: "bluewalletandroid.jpg"
      - name: ios
        <<: *DEFAULT-MOBILE
        link: "https://apps.apple.com/us/app/bluewallet-bitcoin-wallet/id1376878040"
        screenshot: "bluewalletios.jpg"
  - desktop:
    name: desktop
    os:
      - name: mac
        text: "walletbluewallet"
        link: "https://bluewallet.io/desktop-bitcoin-wallet"
        source: "https://github.com/BlueWallet/BlueWallet"
        screenshot: "bluewalletmac.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkfailenvironmentdesktop"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
