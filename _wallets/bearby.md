---
# This file is licensed under the GNU General Public License v3 (GPL-3.0)
# https://www.gnu.org/licenses/gpl-3.0.html

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
          validation: "checkpassvalidationspv"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknotor"
      - name: ios
        text: "walletbearby"
        link: "https://apps.apple.com/app/bearby-wallet/id1547105860"
        source: "https://github.com/bearbywallet/Bearby"
        screenshot: "bearbyios.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspv"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknotor"
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
        environment: "checkpassenvironmentdesktop"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknotor"
    os:
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
        screenshot: "bearbylinux.png"
---
