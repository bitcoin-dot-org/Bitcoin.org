---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bearby
title: "Bearby"
titleshort: "Bearby"
compat: "desktop mac linux mobile android ios"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletbearby"
        link: "https://play.google.com/store/apps/details?id=com.zilpaymobile"
        source: "https://github.com/bearbywallet/Bearby"
        screenshot: "bearbyandroid.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: ios
        text: "walletbearby"
        link: "https://apps.apple.com/app/bearby-wallet/id1547105860"
        source: "https://github.com/bearbywallet/Bearby"
        screenshot: "bearbyios.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletbearby"
      link: "https://bearby.io"
      source: "https://github.com/bearbywallet/Bearby"
      screenshot: "bearbymac.png"
      features: "bech32 hardware_wallet legacy_addresses segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
        screenshot: "bearbylinux.png"
---
