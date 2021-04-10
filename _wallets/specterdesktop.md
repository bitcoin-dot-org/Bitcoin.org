---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: specterdesktop
title: "Specter Desktop"
titleshort: "Specter"
compat: "desktop windows mac linux"
level: 1
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletspecterdesktop"
      link: "https://specter.solutions/"
      source: "https://github.com/cryptoadvance/specter-desktop"
      screenshot: "specterdesktop.png"
      features: "bech32 full_node hardware_wallet multisig segwit"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkgoodvalidationfullnode"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkgoodprivacyimproved"
        fees: "checkgoodfeecontrolfull"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkpassprivacydisclosurefullnode"
        privacynetwork: "checkpassprivacynetworksupporttorproxy"
    os:
      - name: windows
        <<: *DEFAULT
      - name: mac
        <<: *DEFAULT
      - name: linux
        <<: *DEFAULT
