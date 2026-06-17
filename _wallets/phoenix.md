---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: phoenix
title: "Phoenix"
titleshort: "Phoenix"
compat: "mobile android ios"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    default: &DEFAULT
      text: "walletphoenix"
      source: "https://github.com/ACINQ/phoenix"
      features: "bech32 lightning segwit"
      check: &DEFAULT-CHECK
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationspvservers"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmentmobile"
        privacy: "checkpassprivacybasic"
        fees: "checkpassfeecontroloverride"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkpassprivacynetworksupporttorproxy"
    os:
      - name: android
        link: "https://play.google.com/store/apps/details?id=fr.acinq.phoenix.mainnet"
        <<: *DEFAULT
        screenshot: "phoenixandroid.png"
      - name: ios
        link: "https://apps.apple.com/app/phoenix-wallet/id1544097028"
        <<: *DEFAULT
        screenshot: "phoenixios.png"
---
