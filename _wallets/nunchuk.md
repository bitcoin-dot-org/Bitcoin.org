---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: nunchuk
title: "Nunchuk"
titleshort: "Nunchuk"
compat: "desktop windows mac linux"
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletnunchuk"
      link: "https://nunchuk.io/"
      source: "https://github.com/nunchuk-io/nunchuk-desktop/"
      screenshot: "nunchukdesktop.png"
      features: "bech32 hardware_wallet legacy_addresses multisig segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationservers"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkpassprivacybasic"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurespv"
        privacynetwork: "checkpassprivacynetworksupporttorproxy"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
---
