![Build Status](https://travis-ci.org/bitcoin-dot-org/bitcoin.org.svg?branch=master)

## How To Participate

*Bitcoin.org needs volunteers like you!*  Here are some ways you can help:

* "[Watch](https://github.com/bitcoin-dot-org/bitcoin.org/subscription)" this
  repository to be notified of issues and Pull Requests (PRs) that could use
  your attention. Scroll to the top of this page and click the *Watch* button to
  get notifications by email and on your GitHub home page.

    Alternatively, email volunteer coordinators Will Binns
    <will@bitcoin.org> or Dave Harding <dave@dtrt.org> with a short list
    of your interests and skills, and they will email you when there's an
    issue or PR that could use your attention.

* Help [write new documentation][] for the [developer
  documentation pages][] or [full node page][], or **review [PRs
  adding new documentation][].** You don't need to be a Bitcoin expert
  to review a PR---these docs are written for non-experts, so we need to
  know if non-experts find them confusing or incomplete. If you review a
  PR and don't find any problems worth commenting about, leave a "Looks
  Good To Me (LGTM)" comment.

* [Submit new wallets][] for the [Choose Your Wallet page][], or
  help us [review wallet submissions][].

* [Translate Bitcoin.org into another language][] using [Transifex][] or
  help review new and updated translations.

* Add Bitcoin events to the [events page][] either by [editing `_events.yml`][edit events]
  according to the [event instructions][] or by filling in a [pre-made
  events issue][].

* Help improve Bitcoin.org using your unique skills. We can always use
  the help of writers, editors, graphic artists, web designers, and anyone
  else to enhance Bitcoin.org's [current content][] or to add new
  content. See the **list of [recommended starter projects][]** or email
  volunteer coordinators Will Binns <will@bitcoin.org> or Dave Harding <dave@dtrt.org>
  to start a conversation about how you can help Bitcoin.org.

You can always report problems or help improve bitcoin.org by opening a [new issue][] or [pull request][] on [GitHub][].

[choose your wallet page]: https://bitcoin.org/en/choose-your-wallet
[current content]: https://bitcoin.org/
[developer documentation pages]: https://bitcoin.org/en/developer-documentation
[edit events]: https://github.com/bitcoin-dot-org/bitcoin.org/edit/master/_events.yml
[event instructions]: #events
[events page]: https://bitcoin.org/en/events
[GitHub]: https://github.com/bitcoin-dot-org/bitcoin.org
[new issue]: https://github.com/bitcoin-dot-org/bitcoin.org/issues/new
[pre-made events issue]: https://github.com/bitcoin-dot-org/bitcoin.org/issues/new?title=New%20event&body=%20%20%20%20-%20date%3A%20YYYY-MM-DD%0A%20%20%20%20%20%20title%3A%20%22%22%0A%20%20%20%20%20%20venue%3A%20%22%22%0A%20%20%20%20%20%20address%3A%20%22%22%0A%20%20%20%20%20%20city%3A%20%22%22%0A%20%20%20%20%20%20country%3A%20%22%22%0A%20%20%20%20%20%20link%3A%20%22%22
[PRs adding new documentation]: https://github.com/bitcoin-dot-org/bitcoin.org/pulls?q=is%3Aopen+label%3A%22Dev+Docs%22+is%3Apr
[pull request]: #working-with-github
[recommended starter projects]: https://github.com/bitcoin-dot-org/bitcoin.org/wiki/Starter-Projects
[review wallet submissions]: https://github.com/bitcoin-dot-org/bitcoin.org/pulls?q=is%3Aopen+label%3Awallet+is%3Apr
[submit new wallets]: #adding-a-wallet
[transifex]: https://www.transifex.com/projects/p/bitcoinorg/
[translate Bitcoin.org into another language]: #how-to-translate
[full node page]: https://bitcoin.org/en/full-node
[write new documentation]: #developer-documentation

## Wallets

The wallet list is based on the personal evaluation of the maintainer(s) and regular contributors of this site, according to the criteria detailed below.

These requirements are meant to be updated and strengthened over time. Innovative wallets are exciting and encouraged, so if your wallet has a good reason for not following some of the rules below, please submit it anyway and we'll consider updating the rules.

Basic requirements:

- Sufficient users and/or developers feedback can be found without concerning issues, or independent security audit(s) is available
- No indication that users have been harmed considerably by any issue in relation to the wallet
- No indication that security issues have been concealed, ignored, or not addressed correctly in order to prevent new or similar issues from happening in the future
- No indication that the wallet uses unstable or unsecure libraries
- No indication that changes to the code are not properly tested
- Wallet was publicly announced and released since at least 3 months
- No concerning bug is found when testing the wallet
- Website supports HTTPS and 301 redirects HTTP requests
- SSL certificate passes [Qualys SSL Labs SSL test](https://www.ssllabs.com/ssltest/)
- Website serving executable code or requiring authentication uses HSTS with a max-age of at least 180 days
- The identity of CEOs and/or developers is public
- Avoid address reuse by displaying a new receiving address for each transaction in the wallet UI
- Avoid address reuse by using a new change address for each transaction
- If private keys or encryption keys are stored online:
  - Refuses weak passwords (short passwords and/or common passwords) used to secure access to any funds, or provides an aggressive account lock-out feature in response to failed login attempts along with a strict account recovery process.
- If user has no access over its private keys:
  - Provides 2FA authentication feature
  - Reminds the user to enable 2FA by email or in the main UI of the wallet
  - User session is not persistent, or requires authentication for spending
  - Provides account recovery feature
- If user has exclusive access over its private keys:
  - Allows backup of the wallet
  - Restoring wallet from backup is working
  - Source code is public and kept up to date under version control system
- If user has no access to some of the private keys in a multi-signature wallet:
  - Provides 2FA authentication feature
  - Reminds the user to enable 2FA by email or in the main UI of the wallet
  - User session is not persistent, or requires authentication for spending
  - Gives control to the user over moving their funds out of the multi-signature wallet
- For hardware wallets:
  - Uses the push model (computer malware cannot sign a transaction without user input)
  - Protects the seed against unsigned firmware upgrades
  - Supports importing custom seeds
  - Provides source code and/or detailed specification for blackbox testing if using a closed-source Secure Element

Optional criteria (some could become requirements):

- Received independent security audit(s)
- Does not show "received from" Bitcoin addresses in the UI
- Uses deterministic ECDSA nonces (RFC 6979)
- Provides a bug reporting policy on the website
- Website serving executable code or requiring authentication is included in the [HSTS preload list](https://hstspreload.appspot.com/)
- If user has no access over its private keys:
  - Full reserve audit(s)
  - Insurance(s) against failures on their side
  - Reminds the user to enable 2FA in the main UI of the wallet
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
Basic Requirements listed above, or open a [new issue][] to request an
exemption or policy change. Feel free to email Will Binns <will@bitcoin.org>
or Dave Harding <dave@dtrt.org> if you have any questions.

Wallets can be added in `_templates/choose-your-wallet.html`. Entries are ordered by levels and new wallets must be added after the last wallet on the same level.

* Level 1 - Full nodes
* Level 2 - SPV, Random servers
* Level 3 - Hybrid, Multisig wallets
* Level 4 - Web wallets

**Screenshot**: The png files must go in `/img/screenshots`, be 250 X 350 px and optimized with `optipng -o7 file.png`.

**Icon**: The png file must go in `/img/wallet`, be 144 X 144 px and optimized with `optipng -o7 file.png`. The icon must fit within 96 X 96 px inside the png, or 85 X 85 px for square icons.

**Description**: The text must go in `_translations/en.yml` alongside other wallets' descriptions.

### Score

Each wallet is assigned a score for five criteria. For each of them, the appropriate text in `_translations/en.yml` needs to be chosen.

**Control** - What control the user has over his bitcoins?

To get a good score, the wallet must provide the user with full exclusive control over their bitcoins.

To get a passing score, the wallet must provide the user with exclusive control over their bitcoins. Encrypted online backups are accepted so long as only the user can decrypt them. Multisig wallets are accepted so long as only the user can spend without the other party's permission.

**Validation** - How secure and « zero trust » is payment processing?

To get a good score, the wallet must be a full node and need no trust on other nodes.

To get a passing score, the wallet must rely on random nodes, either by using the SPV model or a pre-populated list or servers.

**Transparency** - How transparent and « zero trust » is the source code?

To get a good score, the wallet must deserve a passing score and be built deterministically.

To get a passing score, the wallet must be open-source, under version control and releases must be clearly identified (e.g. by tags or commits). The codebase and final releases must be public since at least 6 months and previous commits must remain unchanged.

**Environment** - How secure is the environment of the wallet?

To get a good score, the wallet must run from an environment where no apps can be installed.

To get a passing score, the wallet must run from an environment that provides app isolation (e.g. Android, iOS), or require two-factor authentication for spending.

**Privacy**: Does the wallet protect users' privacy?

To get a good score, the wallet must avoid address reuse by using a new change address for each transaction, avoid disclosing information to peers or central servers and be compatible with Tor.

To get a passing score, the wallet must avoid address reuse by using a new change address for each transaction.


## Advanced Usage

### Redirections

Redirections can be defined in ```_config.yml```.

```
  /news: /en/version-history
```

### Aliases For Contributors

Aliases for contributors are defined in ```_config.yml```.

```
aliases:
  s_nakamoto: Satoshi Nakamoto
  --author=Satoshi Nakamoto: Satoshi Nakamoto
  gavinandresen: Gavin Andresen
```

### Blog Posts

Posts for the [Bitcoin.org Site Blog][] should be added to the `_posts`
directory with the naming convention:
`YEAR-MONTH-DAY-ARBITRARY_FILE_NAME` (with year, month, and day as
two-digit numbers).  The YAML front matter should be similar to this:

    ---
    type: posts
    layout: post
    lang: en
    category: blog

    title: "Quarterly Report March 2015"
    permalink: /en/posts/quarterly-report-march-2015.html
    date: 2015-03-05
    author: >
      David A. Harding (<a href="mailto:dave@dtrt.org">email</a>, <a
      href="https://github.com/harding">GitHub</a>,
      <a href="http://www.reddit.com/user/harda/">Reddit</a>)
    ---

The type, layout, and category should always be as specified above. The
other parameters should be set to values specific to that post, but the
permalink must end in '.html'.

Below the YAML front matter, enter the content of the post in Markdown
format.  Images should be placed in `img/blog/free` if they are
MIT-licensed or `img/blog/nonfree` if they have a more restrictive
copyright license.

### Developer PGP keys

The site hosts the PGP keys for several Bitcoin Core contributors. Here
are some notes about updating those keys based on previous experience:

1. If a key is revoked, update the key with the revocation immediately.
   Anyone with commit access to the site repository may do this without
   prior review, but they should post the commit ID to an open issue or
   PR so other people can review it. After the revoked key is uploaded,
   discussion about verifying/adding a replacement key may continue at a
   slower pace.

### Code of Conduct

Contributors to Bitcoin.org are expected to adhere to the project's [Code of
Conduct](https://github.com/bitcoin-dot-org/bitcoin.org/blob/master/CODE_OF_CONDUCT.md).
