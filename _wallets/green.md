---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: green
title: "Blockstream Green"
titleshort: "Green"
compat: "desktop windows mac linux mobile android ios"
level: 2 # If SPV is activated from app settings, txs are SPV validated (a la electrum) using a list of default electrum servers, and if a custom electrum server is set then it gets used for SPV validation
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletgreen"
        link: "https://play.google.com/store/apps/details?id=com.greenaddress.greenbits_android_wallet"
        source: "https://github.com/Blockstream/green_android/"
        screenshot: "greenandroid.png"
        features: "2fa bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull" # full control for singlesig accounts, eventual full control for 2of2_csv decaying into singlesig after 12 months for 2FA multisig accounts, full control for 2of3 2FA multisig accounts
          validation: "checkfailvalidationcentralized" # txs can be SPV validated (a la electrum) using the default electrum_url, and if a custom electrum server is set then it gets used for SPV validation
          transparency: "checkpasstransparencyopensource" # Android failing deterministic build as of 4.0.4
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic" # using a custom electrum server with a singlesig account and Tor, a user can reach a high level of privacy
          fees: "checkgoodfeecontrolfull" # users can choose amongst 3 fee estimates provided by bitcoin core, or set a custom feerate, later the user can bump the fee using RBF
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized" # the default reveals addresses to a Blockstream server, but it could be used with custom electrum server for singlesig accounts
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
      - name: ios
        text: "walletgreen"
        link: "https://apps.apple.com/us/app/green-bitcoin-wallet/id1402243590"
        source: "https://github.com/Blockstream/green_ios/"
        screenshot: "greenios.png"
        features: "2fa bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource" # iOS failing deterministic build as of 4.0.3
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletgreen"
      link: "https://blockstream.com/green"
      source: "https://github.com/Blockstream/green_qt/"
      screenshot: "greendesktop.png"
      features: "2fa bech32 hardware_wallet legacy_addresses segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkpasstransparencyopensource" # Qt failing deterministic build as of 1.1.8
        environment: "checkpassenvironmenttwofactor" # 2FA or a hardware signer might be used in the desktop environment to alleviate the risks that arise from operating on desktop
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
---
