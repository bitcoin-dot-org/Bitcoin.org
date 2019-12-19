---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
id: trustee
title: "Trustee"
titleshort: "Trustee"
compat: "mobile ios android"
user: beginner
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: ios
        text: "wallettrustee"
        link: "https://apps.apple.com/us/app/id1462924276"
        source: "https://github.com/trustee-wallet/trusteeWallet"
        screenshot: "trustee.png"
        features: "legacy_addresses"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkfailprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: android
        text: "wallettrustee"
        link: "https://play.google.com/store/apps/details?id=com.trusteewallet"
        source: "https://github.com/trustee-wallet/trusteeWallet"
        screenshot: "trustee.png"
        features: "legacy_addresses"
        check:
          control: "checkgoodcontrolfull"
          validation: "checkfailvalidationcentralized"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkfailprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
