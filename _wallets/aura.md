---
# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

id: aura
title: "Aura Wallet"
titleshort: "Aura"
compat: "mobile ios"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletaura"
        link: "https://apps.apple.com/us/app/aura-bitcoin-wallet/id6749847943"
        source: "https://github.com/aurabitcoinwallet/aura-wallet"
        screenshot: "auraios.png"
        features: "bech32 legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationspvservers"
          transparency: "checkfailtransparencynew"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
