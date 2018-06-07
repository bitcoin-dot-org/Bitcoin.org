---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bither
title: "Bither"
titleshort: "Bither"
compat: "mobile ios android desktop windows mac linux"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletbither"
        link: "https://itunes.apple.com/us/app/bither/id899478936"
        source: "https://github.com/bither/bither-ios"
        screenshot: "bithermobile.png"
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
      - name: android
        text: "walletbither"
        link: "https://play.google.com/store/apps/details?id=net.bither"
        source: "https://github.com/bither/bither-android"
        screenshot: "bithermobile.png"
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
      screenshot: "bitherdesktop.png"
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
