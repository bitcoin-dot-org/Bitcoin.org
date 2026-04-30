---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: keystone3pro
title: "Keystone 3 Pro"
titleshort: "Keystone 3 Pro"
compat: "hardware"
level: 2
platform:
  - hardware:
    name: hardware
    os:
      - name: hardware
        text: "walletkeystone3pro"
        link: "https://keyst.one/btc-only"
        source: "https://github.com/KeystoneHQ/keystone3-firmware"
        screenshot: "keystone3pro.png"
        features: "bech32 hardware_wallet legacy_addresses multisig segwit"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkneutralvalidationvariable"
          transparency: "checkpasstransparencyopensourcehardware"
          environment: "checkgoodenvironmenthardware"
          privacy: "checkneutralprivacyvariable"
          fees: "checkneutralfeecontrolvariable"
---
