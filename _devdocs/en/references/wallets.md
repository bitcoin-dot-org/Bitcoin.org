---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.
---

## Wallets

### Deterministic Wallet Formats
<!-- no subhead-links here -->

#### Type 1: Single Chain Wallets
<!-- no subhead-links here -->

Type 1 deterministic wallets are the simpler of the two, which can
create a single series of keys from a single seed. A primary weakness is
that if the seed is leaked, all funds are compromised, and wallet
sharing is extremely limited.

#### Type 2: Hierarchical Deterministic (HD) Wallets
<!-- no subhead-links here -->

![Overview Of Hierarchical Deterministic Key Derivation](/img/dev/en-hd-overview.svg)

For an overview of HD wallets, please see the [developer guide
section][devguide wallets].  For details, please see BIP32.

