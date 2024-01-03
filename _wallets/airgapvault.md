---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: airgapvault
title: "AirGap Vault"
titleshort: "AirGap Vault"
compat: "mobile ios android"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "walletairgapvault"
        link: "https://apps.apple.com/us/app/airgap-vault-secure-secrets/id1417126841"
        source: "https://github.com/airgap-it/airgap-vault"
        screenshot: "airgapvault.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentmobile"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurefullnode"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
      - name: android
        text: "walletairgapvault"
        link: "https://play.google.com/store/apps/details?id=it.airgap.vault&hl=pt"
        source: "https://github.com/airgap-it/airgap-vault"
        screenshot: "airgapvault.png"
        features: "bech32 legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentmobile"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurefullnode"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
---
