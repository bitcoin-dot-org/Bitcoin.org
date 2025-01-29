---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: seedsigner
title: "Seedsigner"
titleshort: "Seedsigner"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletseedsigner"
        link: "https://seedsigner.com/hardware/"
        source: "https://github.com/SeedSigner/seedsigner"
        screenshot: "seedsigner.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentbyod"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---