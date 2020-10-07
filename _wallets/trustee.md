---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
id: trustee
title: "Trustee Wallet"
titleshort: "Trustee"
compat: "mobile ios android"
user: beginner
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "wallettrustee"
        link: "https://apps.apple.com/ua/app/trustee-wallet/id1462924276"
        source: "https://github.com/trustee-wallet/trusteeWallet"
        screenshot: "trustee.png"
        features: "bech32 segwit legacy_addresses"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkfailprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "wallettrustee"
        link: "https://play.google.com/store/apps/details?id=com.trusteewallet"
        source: "https://github.com/trustee-wallet/trusteeWallet"
        screenshot: "trustee.png"
        features: "bech32 segwit legacy_addresses"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkgoodfeecontrolfull"
        privacycheck:
          privacyaddressreuse: "checkfailprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
