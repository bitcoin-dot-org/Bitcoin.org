---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: msigna
title: "mSIGNA"
titleshort: "mSIGNA"
compat: "desktop windows mac linux"
level: 2
platform:
  - desktop:
    name: desktop
    default: &DEFAULT
      text: "walletmsigna"
      link: "https://ciphrex.com/redirect/?referer=bitcoin.org"
      source: "https://ciphrex.com/redirect/?url=https://github.com/ciphrex/CoinVault?referer=bitcoin.org"
      screenshot: "msigna.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkgoodvalidationfullnoderequired"
        transparency: "checkpasstransparencyopensource"
        environment: "checkfailenvironmentdesktop"
        privacy: "checkgoodprivacyimproved"
        fees: "checkfailfeecontrolstatic"
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
