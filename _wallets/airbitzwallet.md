---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: airbitzwallet
title: "Airbitz Bitcoin Wallet"
titleshort: "Airbitz"
compat: "mobile android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletairbitzwallet"
        link: "https://play.google.com/store/apps/details?id=com.airbitz"
        source: "https://github.com/Airbitz"
        screenshot: "airbitzwalletandroid.png"
        check:
          control: "checkpasscontrolhybrid"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: ios
        text: "walletairbitzwallet"
        link: "https://itunes.apple.com/us/app/bitcoin-wallet-map-directory/id843536046?mt=8"
        source: "https://github.com/Airbitz"
        screenshot: "airbitzwalletios.png"
        check:
          control: "checkpasscontrolhybrid"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
