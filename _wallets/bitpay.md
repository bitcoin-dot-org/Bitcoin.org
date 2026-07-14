---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitpay
title: "BitPay Wallet"
titleshort: "BitPay"
compat: "mobile android ios"
user: beginner
level: 3
platform:
  - mobile:
    name: mobile
    default: &DEFAULT
      text: "walletbitpay"
      link: "https://bitpay.com/wallet"
      source: "https://github.com/bitpay/bitpay-app"
      screenshot: "bitpay.png"
      features: "legacy_addresses multisig"
      check:
        control: "checkgoodcontrolfull"
        validation: "checkfailvalidationcentralized"
        transparency: "checkpasstransparencyopensource"
        environment: "checkpassenvironmentmobile"
        privacy: "checkpassprivacybasic"
        fees: "checkpassfeecontroloverride"
      privacycheck:
        privacyaddressreuse: "checkpassprivacyaddressrotation"
        privacydisclosure: "checkfailprivacydisclosurecentralized"
        privacynetwork: "checkfailprivacynetworknosupporttor"
    os:
      - name: android
        <<: *DEFAULT
      - name: ios
        <<: *DEFAULT
---
