---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: guarda
title: "Guarda Wallet"
titleshort: "Guarda"
compat: "web desktop windows mac linux mobile android ios chrome"
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
        validation: "checkgoodvalidationfullnoderequired"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmenttwofactor"
        privacy: "checkpassprivacybasic"
        fees: "checkpassfeecontrolfull"
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
        screenshot: "guarda.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkgoodvalidationfullnoderequired"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
      - name: ios
        text: "walletguarda"
        link: "https://apps.apple.com/app/apple-store/id1442083982"
        source: "https://github.com/guardaco/"
        screenshot: "guarda.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkgoodvalidationfullnoderequired"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
  - web:
    name: web
    os:
      - name: web
        text: "walletguarda"
        link: "https://guarda.co/"
        source: "https://github.com/guardaco/"
        screenshot: "guarda.png"
        features: "bech32 legacy_addresses hardware_wallet segwit multisig"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkgoodvalidationfullnoderequired"
          transparency: "checkpasstransparencyremote"
          environment: "checkpassenvironmentdesktop"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
