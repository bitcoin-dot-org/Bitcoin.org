  ---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: atomicwallet
title: "Atomic Wallet"
titleshort: "Atomic Wallet"
compat: "mobile android desktop windows mac linux"
level: 2
platform:
- mobile:
    name: mobile
    os:
      - name: android
        text: "walletatomicwallet"
        link: "https://play.google.com/store/apps/details?id=io.atomicwallet"
        source: "https://github.com/Atomicwallet/atomicwallet.github.io"
        screenshot: "atomicwalletandroid.png"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkfailtransparencyclosedsource"
          environment: "checkfailenvironmentdesktop"
          privacy: "checkgoodprivacyimproved"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletatomicwallet"
      link: "https://atomicwallet.io/"
      source: "https://github.com/Atomicwallet/atomicwallet.github.io"
      screenshot: "atomicwalletandroid.png"
      check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvp2p"
          transparency: "checkfailtransparencyclosedsource"
          environment: "checkfailenvironmentdesktop"
          privacy: "checkgoodprivacyimproved"
          fees: "checkpassfeecontroldynamic"
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
