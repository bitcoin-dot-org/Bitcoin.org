---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: electrum
title: "Electrum"
titleshort: "Electrum"
compat: "desktop windows mac linux mobile android"
user: beginner
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletelectrum"
      link: "https://electrum.org"
      source: "https://github.com/spesmilo/electrum"
      screenshot: "electrum.png"
      features: "2fa bech32 hardware_wallet legacy_addresses lightning multisig segwit"
      check: &DEFAULT-CHECK
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
        check:
          <<: *DEFAULT-CHECK
          transparency: "checkgoodtransparencydeterministic"
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
        check:
          <<: *DEFAULT-CHECK
          transparency: "checkgoodtransparencydeterministic"
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletelectrum"
        link: "https://play.google.com/store/apps/details?id=org.electrum.electrum"
        source: "https://github.com/spesmilo/electrum"
        screenshot: "electrumandroid.png"
        features: "2fa bech32 legacy_addresses lightning multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
