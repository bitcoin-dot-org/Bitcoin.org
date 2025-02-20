---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: krux
title: "Krux"
titleshort: "Krux"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletkrux"
        link: "https://selfcustody.github.io/krux/"
        source: "https://github.com/selfcustody/krux"
        screenshot: "krux.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkpassenvironmentbyod"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---