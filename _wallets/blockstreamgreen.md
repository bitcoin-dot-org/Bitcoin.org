---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: blockstreamgreen
title: "Blockstream Green Wallet"
titleshort: "Blockstream Green"
compat: "mobile android ios"
level: 3
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "blockstreamgreen"
        link: "https://play.google.com/store/apps/details?id=com.greenaddress.greenbits_android_wallet"
        source: "https://github.com/Blockstream/green_android"
        screenshot: "blockstreamgreen.png"
        features: "2fa bech32 multisig segwit hardware_wallet full_node"
        check:
          control: "checkpasscontrolfull"
          validation: "checkpassvalidationspvp2ptxt"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmenttwofactortxt"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkpassprivacydisclosurefullnode"
          privacynetwork: "checkpassprivacynetworksupporttorproxy"
      - name: ios
        text: "blockstreamgreen"
        link: "https://apps.apple.com/app/id1402243590"
        source: "https://github.com/Blockstream/green_ios"
        screenshot: "blockstreamgreen.png"
        features: "2fa bech32 multisig segwit hardware_wallet full_node"
        check:
          control: "checkpasscontrolfull"
          validation: "checkpassvalidationspvp2ptxt"
          transparency: "checkpasstransparencyopensource"
          environment: "checkpassenvironmenttwofactortxt"
          privacy: "checkpassprivacybasic"
          fees: "checkpassfeecontroldynamic"
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurespv"
          privacynetwork: "checkfailprivacynetworknosupporttor"
---
