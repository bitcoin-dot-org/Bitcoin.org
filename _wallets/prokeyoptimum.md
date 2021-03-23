---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: prokeyoptimum
title: "Prokey Optimum"
titleshort: "Prokey Optimum"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletprokeyoptimum"
        link: "https://prokey.io/"
        source: "https://github.com/prokey-io/prokey-optimum-firmware"
        screenshot: "prokeyoptimum.png"
        features: "hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---