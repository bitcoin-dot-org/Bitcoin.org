---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: armory
title: "Armory"
titleshort: "Armory"
compat: "desktop windows mac linux"
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletarmory"
      link: "https://btcarmory.com/"
      source: "https://github.com/goatpig/BitcoinArmory"
      screenshot: "armory.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkgoodvalidationfullnoderequired"
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
---
