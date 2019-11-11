---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: edgewallet
title: "Edge Mobile Wallet"
titleshort: "Edge"
compat: "mobile android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletedgewallet"
        link: "https://play.google.com/store/apps/details?id=co.edgesecure.app"
        source: "https://github.com/EdgeApp/edge-react-gui"
        screenshot: "edgewalletandroid.png"
        features: "2fa legacy_addresses segwit"
        check:
          control: "checkpasscontrolhybrid"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
      - name: ios
        text: "walletedgewallet"
        link: "https://itunes.apple.com/us/app/edge-bitcoin-wallet/id1344400091"
        source: "https://github.com/EdgeApp/edge-react-gui"
        screenshot: "edgewalletios.png"
        features: "2fa legacy_addresses segwit"
        check:
          control: "checkpasscontrolhybrid"
          validation: "checkpassvalidationservers"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmentmobile"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroloverride"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosureaccount"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---

