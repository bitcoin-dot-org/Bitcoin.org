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
- Website supports HTTPS and 301 redirects HTTP requests
- SSL certificate passes [Qualys SSL Labs SSL
  test](https://www.ssllabs.com/ssltest/)
- Website serving executable code or requiring authentication uses HSTS with a
  max-age of at least 180 days
- The identity of CEOs and/or developers is public
- Avoid address reuse by displaying a new receiving address for each transaction
  in the wallet UI
- Avoid address reuse by using a new change address for each transaction
- User has access to private keys
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

- Received independent security audit(s)
- Does not show "received from" Bitcoin addresses in the UI
- Uses deterministic ECDSA nonces (RFC 6979)
- Provides a bug reporting policy on the website
- Website serving executable code or requiring authentication is included in the
  [HSTS preload list](https://hstspreload.appspot.com/)
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
([will@bitcoin.org](mailto:will@bitcoin.org)) or Dave Harding ([dave@dtrt.org](mailto:dave@dtrt.org))
if you have any questions.

Wallets can be added by creating a Markdown file with a wallet name
in a `_wallets` folder, like this: `_wallets/[wallet_name].md`.

For examples refer to the existing wallet files or check
`quality-assurance/schemas/wallets.yaml` schema.

**Screenshot**: The png files must go in `/img/screenshots`, be 250 X 350 px and
optimized with `optipng -o7 file.png`.

**Icon**: The png file must go in `/img/wallet`, be 144 X 144 px and optimized
with `optipng -o7 file.png`. The icon must fit within 96 X 96 px inside the png,
or 85 X 85 px for square icons.

**Description**: The text must go in `_translations/en.yml` alongside other
wallets' descriptions.

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
