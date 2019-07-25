---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: unstoppable
title: "Unstoppable Wallet"
titleshort: "Unstoppable"
compat: "mobile android ios"
level: 2
platform:
  - mobile:
    name: mobile
    default: &DEFAULT
      text: "unstoppablewallet"
      link: "https://unstoppable.money"
      source: "https://github.com/horizontalsystems"
      screenshot: "unstoppable.png"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkpassvalidationspvp2p"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmentmobile"
        privacy: "checkpassprivacybasic"
        fees: "checkpassfeecontroldynamic"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurespv"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: android
        <<: *DEFAULT
      - name: ios
        <<: *DEFAULT

---







