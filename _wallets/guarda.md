---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: guarda
title: "Guarda Wallet"
titleshort: "Guarda"
compat: "web chrome desktop windows mac linux mobile android iOS"
user: beginner
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletguarda"
      link: "https://guarda.co/"
      source: "https://github.com/guardaco/"
      screenshot: "guarda.png"
      features: "bech32 hardware_wallet legacy_addresses multisig segwit"
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
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletguarda"
        link: "https://play.google.com/store/apps/details?id=com.crypto.multiwallet"
        source: "https://github.com/guardaco/"
        screenshot: "electrumandroid.png"
        features: "2fa bech32 legacy_addresses segwit"
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
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
