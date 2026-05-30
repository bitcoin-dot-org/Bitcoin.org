---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: nunchuk
title: "Nunchuk"
titleshort: "Nunchuk"
compat: "desktop windows mac linux mobile android ios"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletnunchuk"
        link: "https://play.google.com/store/apps/details?id=io.nunchuk.android"
        source: "https://github.com/nunchuk-io/nunchuk-android/"
        screenshot: "nunchukmobile.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkgoodprivacyimproved"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
      - name: ios
        text: "walletnunchuk"
        link: "https://apps.apple.com/us/app/nunchuk-bitcoin-wallet/id1563190073"
        source: "https://github.com/nunchuk-io/libnunchuk/"
        screenshot: "nunchukmobile.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationservers"
          transparency: "checkfailtransparencyclosedsource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkgoodprivacyimproved"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletnunchuk"
      link: "https://nunchuk.io/"
      source: "https://github.com/nunchuk-io/nunchuk-desktop/"
      screenshot: "nunchukdesktop.png"
      features: "bech32 hardware_wallet legacy_addresses multisig segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationservers"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkgoodprivacyimproved"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurespv"
        privacynetwork: "checkpassprivacynetworksupporttorproxy"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
---
