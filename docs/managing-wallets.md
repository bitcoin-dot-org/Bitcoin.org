## Wallets

The wallet list is based on the personal evaluation of the maintainer(s) and
regular contributors of this site, according to the criteria detailed below.

These requirements are meant to be updated and strengthened over time.
Innovative wallets are exciting and encouraged, so if your wallet has a good
reason for not following some of the rules below, please submit it anyway and
we'll consider updating the rules.

Basic requirements:

- Sufficient users and/or developers feedback can be found without concerning
  issues, or independent security audit(s) is available
- No indication that users have been harmed considerably by any issue in
  relation to the wallet
- No indication that security issues have been concealed, ignored, or not
  addressed correctly in order to prevent new or similar issues from happening
in the future
- No indication that the wallet uses unstable or unsecure libraries
- No indication that changes to the code are not properly tested
- Wallet was publicly announced and released since at least 3 months
- No concerning bug is found when testing the wallet
- Provides a bug reporting method on the website and/or in the app
- Website supports HTTPS and 301 redirects HTTP requests
- SSL certificate passes [Qualys SSL Labs SSL
  test](https://www.ssllabs.com/ssltest/)
- Website serving or linking to executable code or requiring authentication uses HSTS
  - Existing listings: With a max-age of at least 180 days
  - New listings: With a max-age of at least 1 year, and preload and includeSubDomains directives to qualify for browser preload list inclusion
  `e.g. Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- The identity of CEOs and/or developers is public
- Avoid address reuse by displaying a new receiving address for each transaction
  in the wallet UI
- Avoid address reuse by using a new change address for each transaction
- Uses deterministic ECDSA nonces (RFC 6979)
- User has access to private keys for all major components of the wallet
- If private keys or encryption keys are stored online:
  - Refuses weak passwords (short passwords and/or common passwords) used to
    secure access to any funds, or provides an aggressive account lock-out
feature in response to failed login attempts along with a strict account
recovery process.
- If user has exclusive access over its private keys:
  - Allows backup of the wallet
  - Restoring wallet from backup is working
  - Source code is public and kept up to date under version control system
- If user has no access to some of the private keys in a multi-signature wallet:
  - Provides 2FA authentication feature
  - Reminds the user to enable 2FA by email or in the main UI of the wallet
  - User session is not persistent, or requires authentication for spending
  - Gives control to the user over moving their funds out of the multi-signature
    wallet
- For hardware wallets:
  - Uses the push model (computer malware cannot sign a transaction without user
    input)
  - Protects the seed against unsigned firmware upgrades
  - Supports importing custom seeds
  - Provides source code and/or detailed specification for blackbox testing if
    using a closed-source Secure Element

Optional criteria (some could become requirements):

- Does not show "received from" Bitcoin addresses in the UI
- Website serving executable code or requiring authentication is included in the
  [HSTS preload list](https://hstspreload.org/)
- If user has exclusive access over its private keys:
  - Supports HD wallets (BIP32)
  - Provides users with step to print or write their wallet seed on setup
  - Uses a strong KDF and key stretching for wallet storage and backups
  - On desktop platform:
    - Encrypt the wallet by default
- For hardware wallets:
  - Prevents downgrading the firmware

### Adding a wallet

*Before adding a wallet,* please make sure your wallet meets all of the
Basic Requirements listed above, or open a [new issue](https://github.com/bitcoin-dot-org/bitcoin.org/issues/new)
to request an exemption or policy change. Feel free to email Will Binns
([will@bitcoin.org](mailto:will@bitcoin.org)) if you have any questions.

You should follow the guidelines of the [Wikipedia Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Trademarks) for trademark capitalization.  For example, if you call your wallet **WEAKBOX wallet** it should be listed as **Weakbox wallet**.

Wallets can be added by creating a Markdown file with a wallet name
in a `_wallets` folder, like this: `_wallets/[wallet_name].md`.

For examples refer to the existing wallet files or check
`quality-assurance/schemas/wallets.yaml` schema.

**Screenshot**: The png files must go in `/img/screenshots`, be 250 X 350 px and
optimized with `optipng -o7 file.png`.

**Features**: Each wallet must properly specify its available features. The
following features are available for assignment:

* 2fa
* bech32
* full_node
* hardware_wallet
* legacy_addresses
* lightning
* mixing_shuffling
* multisig
* segwit

To determine whether a wallet supports a feature, we've described each one
below:

* 2fa: Two-factor authentication (2FA) is a way to add additional security to
  your wallet. The first 'factor' is your password for your wallet. The second
  'factor' is a verification code retrieved via text message or from an app on a
  mobile device. 2FA is conceptually similar to a security token device that banks
  in some countries require for online banking. It likely requires relying on the
  availability of a third party to provide the service.

  - To qualify for supporting this feature, the wallet must be able authorize the spending of funds based on factors of authentication other than and in addition to the wallet password or PIN.

* bech32: Bech32 is a special address format made possible by SegWit (see the
  feature description for SegWit for more info). This address format is also
  known as 'bc1 addresses'. Some bitcoin wallets and services do not yet support
  sending and/or receiving to or from Bech32 addresses.

  - To qualify for supporting this feature, the wallet must be able to send and receive Bech32 format addresses.  Bech32 does not need to be the default receive address format, but it should be easy and obvious for users to generate a Bech32 format receive address.

* full_node: Some wallets fully validate transactions and blocks. Almost all
  full nodes help the network by accepting transactions and blocks from other
  full nodes, validating those transactions and blocks, and then relaying them to
  further full nodes.

  - To qualify for supporting this feature, the wallet must fully validate transactions and blocks and by default maintain a local private representation of the blockchain.

* hardware_wallet: Some wallets can pair and connect to a hardware wallet in
  addition to being able to send to them. While sending to a hardware wallet is
  something most all wallets can do, being able to pair with one is a unique
  feature. This feature enables you to be able to send and receive directly to and
  from a hardware wallet.

  - To qualify for supporting this feature, the wallet must support using a hardware wallet listed on bitcoin.org for signing transactions.

* legacy_addresses: Most wallets have the ability to send and receive legacy
  bitcoin addresses. Legacy addresses start with 1 or 3 (as opposed to starting
  with bc1). Without legacy address support you may not be able to receive bitcoin
  from older wallets or exchanges.

    - To qualify for supporting this feature, the wallet must be able to send and receive legacy format addresses.  This does not need to be the default receive address format, but it should be easy and obvious for users to generate a legacy format receive address.


* lightning: Some wallets support transactions on the Lightning Network. The
  Lightning Network is new and somewhat experimental. It supports transferring
  bitcoin without having to record each transaction on the blockchain, resulting
  in faster transactions and lower fees.

  - To qualify for supporting this feature, the wallet must be able to send and receive lightning network transactions.

* mixing_shuffling: Some wallets support coin mixing and/or shuffling, which
  pools transactions from multiple parties in order to increase privacy and
  reduce traceability.

  - To qualify for supporting this feature, the wallet must be able to participate in transactions which mix or shuffle funds with funds from other users.

* multisig: Some wallets have the ability to require more than one key to
  authorize a transaction. This can be used to divide responsibility and control
  over multiple parties.

  - To qualify for supporting this feature, the wallet must give the user the ability to delegate authority to other users participating in multiple party transactions.  While some services provide authorization features (such as 2FA) based on multisignature technology, that is not this feature.

* segwit: Some wallets support SegWit, which uses block chain space more
  efficiently. This helps reduce fees paid by helping the Bitcoin network scale
  and sets the foundation for second layer solutions such as the Lightning
  Network.

  - To qualify for supporting this feature, the wallet must be able to receive SegWit transactions (with either Bech32 format or legacy format addresses).

Assignment of the features are done below the `screenshot` field and assigning
multiple features can be done like so, for example:

`features: "bech32 legacy_addresses mixing_shuffling segwit"`

**Icon**: The png file must go in `/img/wallet`, be 144 X 144 px and optimized
with `optipng -o7 file.png`. The icon must fit within 96 X 96 px inside the png,
or 85 X 85 px for square icons.

**Description**: The text must go in `_translations/en.yml` alongside other
wallets' descriptions.  The description must be less than 320 characters and
be consistent in style with the other descriptions.  Do not use superlatives
or exclusive phrases.  For example, you might want to comment on ease of use.
Don't write  "This wallet is the easiest to use" or "This wallet is extremely
easy to use"; write "This wallet is easy to use."

**Level**: Each wallet must have a level property assigned. A value must be in a range
between 1 and 4. Level represents a category of a wallet:

* Level 1 - Full nodes
* Level 2 - SPV, Random servers
* Level 3 - Hybrid, Multisig wallets
* Level 4 - Web wallets

### Score

Each wallet is assigned a score for five criteria. For each of them, the
appropriate text in `_translations/en.yml` needs to be chosen (_see `choose-your-wallet` section_).

**Control** - What control the user has over his bitcoins?

To get a good score, the wallet must provide the user with full exclusive
control over their bitcoins.

To get a passing score, the wallet must provide the user with exclusive control
over their bitcoins. Encrypted online backups are accepted so long as only the
user can decrypt them. Multisig wallets are accepted so long as only the user
can spend without the other party's permission.

**Validation** - How secure and « zero trust » is payment processing?

To get a good score, the wallet must be a full node and need no trust on other
nodes.

To get a passing score, the wallet must rely on random nodes, either by using
the SPV model or a pre-populated list or servers.

**Transparency** - How transparent and « zero trust » is the source code?

To get a good score, the wallet must deserve a passing score and be built
deterministically.

To get a passing score, the wallet must be open-source, under version control
and releases must be clearly identified (e.g. by tags or commits). The codebase
and final releases must be public since at least 6 months and previous commits
must remain unchanged.

**Environment** - How secure is the environment of the wallet?

To get a good score, the wallet must run from an environment where no apps can
be installed.

To get a passing score, the wallet must run from an environment that provides
app isolation (e.g. Android, iOS), or require two-factor authentication for
spending.

**Privacy**: Does the wallet protect users' privacy?

To get a good score, the wallet must avoid address reuse by using a new change
address for each transaction, avoid disclosing information to peers or central
servers and be compatible with Tor.

To get a passing score, the wallet must avoid address reuse by using a new
change address for each transaction.

### Schema validation

Wallet entries are validated against the schema in
`quality-assurance/schemas/wallets.yaml` and you will find a
description of every available option in that file.

### TODO

+ Review existing instructions
+ Add instructions for declaring features alongside wallet additions
+ Update instructions for declaring criteria
