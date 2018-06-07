---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: arcbit
title: "ArcBit"
titleshort: "ArcBit"
compat: "mobile desktop android ios windows mac linux"
level: 3
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletarcbit"
      link: "https://chrome.google.com/webstore/detail/arcbit-bitcoin-wallet/dkceiphcnbfahjbomhpdgjmphnpgogfk"
      source: "https://github.com/arcbit/arcbit-web"
      screenshot: "arcbitdesktop.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkfailtransparencyremote"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkpassprivacybasic"
        fees: "checkpassfeecontroloverride"
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
      - name: ios
        text: "walletarcbit"
        link: "https://itunes.apple.com/app/arcbit-bitcoin-wallet/id999487888"
        source: "https://github.com/arcbit/arcbit-ios"
        screenshot: "arcbitios.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "walletarcbit"
        link: "https://play.google.com/store/apps/details?id=com.arcbit.arcbit"
        source: "https://github.com/arcbit/arcbit-android"
        screenshot: "arcbitios.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
