---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitcoinsafe
title: "Bitcoin Safe"
titleshort: "Bitcoin Safe"
compat: "desktop windows mac linux"
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletbitcoinsafe"
      link: "https://bitcoin-safe.org/"
      source: "https://github.com/andreasgriffin/bitcoin-safe/"
      screenshot: "bitcoinsafe.png"
      features: "bech32 hardware_wallet multisig segwit"
      check: &DEFAULT-CHECK
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationservers"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkgoodprivacyimproved"
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
---
