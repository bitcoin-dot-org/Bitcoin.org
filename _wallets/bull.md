---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bull
title: "Bull Bitcoin"
titleshort: "BULL"
compat: "mobile android ios"
level: 2
platform:
  - mobile:
    name: mobile
    os:
      - name: android
        text: "walletbull"
        link: "https://play.google.com/store/apps/details?id=com.bullbitcoin.mobile"
        source: "https://github.com/SatoshiPortal/bullbitcoin-mobile"
        screenshot: "bull.png"
        features: "bech32 hardware_wallet legacy_addresses lightning segwit"
        check:
            control: "checkgoodcontrolfull"
            validation: "checkpassvalidationservers" # default Bull Bitcoin electrum server but support custom servers
            transparency: "checkpasstransparencyopensource"
            environment: "checkpassenvironmentmobile"
            privacy: "checkgoodprivacyimproved" # Payjoin v2 
            fees: "checkgoodfeecontrolfull" # rbf
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized" # the default reveals addresses to Bull electrum server, but it could be used with custom electrum servers
      - name: ios
        text: "walletbull"
        link: "https://apps.apple.com/us/app/bull-bitcoin/id6743380972"
        source: "https://github.com/SatoshiPortal/bullbitcoin-mobile"
        screenshot: "bull.png"
        features: "bech32 hardware_wallet legacy_addresses lightning segwit"
        check:
            control: "checkgoodcontrolfull"
            validation: "checkpassvalidationservers" # default Bull Bitcoin electrum server but support custom servers
            transparency: "checkpasstransparencyopensource"
            environment: "checkpassenvironmentmobile"
            privacy: "checkgoodprivacyimproved" # Payjoin v2 
            fees: "checkgoodfeecontrolfull" # rbf
        privacycheck:
          privacyaddressreuse: "checkpassprivacyaddressrotation"
          privacydisclosure: "checkfailprivacydisclosurecentralized" # the default reveals addresses to Bull electrum server, but it could be used with custom electrum servers
---
