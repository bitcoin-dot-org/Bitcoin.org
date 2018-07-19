---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bither
title: "Bither"
titleshort: "Bither"
compat: "mobile android desktop windows mac linux"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletbither"
        link: "https://play.google.com/store/apps/details?id=net.bither"
        source: "https://github.com/bither/bither-android"
        screenshot: "bithermobile.png?1528322191"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkfailprivacyweak"
          fees: "checkfailfeecontrolstatic"
        privacycheck:
          privacyaddressreuse: "checkfailprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletbither"
      link: "https://bither.net"
      source: "https://github.com/bither/bither-desktop-java"
      screenshot: "bitherdesktop.png?1528322191"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationspvp2p"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkfailprivacyweak"
        fees: "checkfailfeecontrolstatic"
      privacycheck:
        privacyaddressreuse: "checkfailprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurespv"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
---
