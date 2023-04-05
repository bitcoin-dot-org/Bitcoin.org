---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: airgapvault
title: "AirGap Vault"
titleshort: "AirGap Vault"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletairgapvault"
        link: "https://airgap.it/"
        source: "https://github.com/airgap-it/airgap-vault"
        screenshot: "airgapvault.png"
        features: "bech32 hardware_wallet legacy_addresses segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentmobile"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
