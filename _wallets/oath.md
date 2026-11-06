---
# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

id: oath
title: "Oath Wallet"
titleshort: "Oath"
compat: "mobile ios"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletoath"
        link: "https://apps.apple.com/app/id6780187283"
        source: "https://github.com/devdasx/oath-wallet"
        screenshot: "oathios.png"
        features: "bech32 legacy_addresses segwit taproot"
        check:
          control: "checkgoodcontrolfull"
          # Server-assisted verification; no full-node or SPV claim.
          validation: "checkfailvalidationcentralized"
          # Public release history is less than six months old.
          transparency: "checkfailtransparencynew"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          # RBF signalling alone does not establish a fee-bumping workflow.
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
