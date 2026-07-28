---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: passport
title: "Passport Core"
titleshort: "Passport Core"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletpassport"
        link: "https://docs.foundation.xyz/passport/home/"
        source: "https://github.com/Foundation-Devices/passport2"
        screenshot: "passport.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit taproot"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkgoodtransparencydeterministic"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
