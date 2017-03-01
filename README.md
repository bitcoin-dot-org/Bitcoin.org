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

## Developer Documentation

Most parts of the documentation can be found in the [_includes](https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes)
directory. Updates, fixes and improvements are welcome and can submitted using [pull requests](#working-with-github) on GitHub.

**Mailing List**: General discussions can take place on the
[mailing list](https://groups.google.com/forum/#!forum/bitcoin-documentation).

**TODO List**: New content and suggestions for improvements can be submitted
to the [TODO list](https://github.com/bitcoin-dot-org/bitcoin.org/wiki/Documentation-TODO).
You are also welcome if you want to assign yourself to any task.

**Style Guide**: For better consistency, the [style guide](https://github.com/bitcoin-dot-org/bitcoin.org/wiki/Documentation-Style-Guide)
can be used as a reference for terminology, style and formatting. Suggested changes
can also be submitted to this guide to keep it up to date.

**Cross-Reference Links**: Cross-reference links can be defined in
_includes/references.md. Terms which should automatically link to these
references are defined in _autocrossref.yaml .

### New Glossary Entries

Add new English glossary entries in the `_data/glossary/en/` directory.
Copy a previous glossary entry to get the correct YAML variables
(suggest using block.yaml as a template).

Non-English glossary entries are not currently supported.  You'll have
to update the glossary.rb plugin and templates to support them.

### New Developer Search terms

You can add new search terms or categories directly to the `devsearches`
array in `_config.yaml`.  Comments in that file should provide full
documentation.

## Translation

### How To Translate

You can join a translation team on [Transifex](https://www.transifex.com/projects/p/bitcoinorg/) and start translating or improving existing translations.

* You must be a native speaker for the language you choose to translate.
* Please be careful to preserve the original meaning of each text.
* Sentences and popular expressions should sound native in your language.
* You can check the result on the [live preview](http://bitcointx.us.to/) and [test small changes](#preview-small-text-changes).
* Translations need to be reviewed by a reviewer or coordinator before publication.
* Once reviewed, translations can be [submitted](#import-translations) in a pull request on GitHub.
* **In doubt, please contact coordinators on Transifex. That'll be much appreciated.**

### Import Translations

**Update translations**: You can update the relevant language file in \_translations/ and from the root of the git repository run ./\_contrib/updatetx.rb to update layouts and templates for this language. You should also make sure that no url has been changed by translators. If any page needs to be moved, please add [redirections](#redirections).

**Add a new language**: You can put the language file from Transifex in \_translations and add the language in \_config.yml in the right display order for the language bar. Make sure to review all pages and check all links.

### Update English Strings

Any change in the English text can be done through a pull request on GitHub. If your changes affect the HTML layout of a page, you should apply fallback HTML code for other languages until they are updated.

    {% case page.lang %}
    {% when 'fr' %}
      (outdated french content)
    {% else %}
      (up to date english content)
    {% endcase %}

**When translation is needed**: If you want all changes you've made to be re-translated, you can simply update the resource file (en.yml) on Transifex.

**When translation is not needed**: If you are only pushing typo fixes and that you don't want translators to redo all their work again, you can use the Transifex client to pull translations, update en.yml and push back all translations at once:

    tx init
    tx set --auto-remote https://www.transifex.com/projects/p/bitcoinorg/
    tx pull -a -s --skip
    tx set --source -r bitcoinorg.bitcoinorg -l en translations/bitcoinorg.bitcoinorg/en.yml
    (update en.yml)
    tx push -s -t -f --skip --no-interactive

## Posts

### Events

If you're not comfortable with GitHub pull requests, please submit an
event using the button near the bottom of the [Events
page](https://bitcoin.org/en/events).

To create an event pull request, place the event in `_events.yml` and adhere to this format:

```
- date: 2014-02-21
  title: "2014 Texas Bitcoin Conference"
  venue: "Circuit of the Americas™ - Technology and Conference Center"
  address: "9201 Circuit of the Americas Blvd"
  city: "Austin, TX"
  country: "United States"
  link: "http://texasbitcoinconference.com/"
```

Events that have a [Meetup.com](http://www.meetup.com/) page with a
publicly-viewable address and "Bitcoin" in the event title should
already be displayed on the [events page][]. (Please open a [new
issue][] if a Bitcoin meetup event isn't displayed.)

### Release Notes

To create a new Bitcoin Core release, create a new file in the
`_releases/` directory. Any file name ending in `.md` is fine, but we
recommend naming it after the release, such as `0.10.0.md`

Then copy in the following YAML header (the part between the three dashes, ---):
~~~
---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## Required value below populates the %v variable (note: % needs to be escaped in YAML if it starts a value)
required_version: 0.10.0
## Optional release date.  May be filled in hours/days after a release
optional_date: 2015-02-16
## Optional title.  If not set, default is: Bitcoin Core version %v released
optional_title: Bitcoin Core version %v released
## Optional magnet link.  To get it, open the torrent in a good BitTorrent client
## and View Details, or install the transmission-cli Debian/Ubuntu package
## and run: transmission-show -m <torrent file>
#
## Link should be enclosed in quotes and start with: "magnet:?
optional_magnetlink:

## The --- below ends the YAML header. After that, paste the release notes.
## Warning: this site's Markdown parser commonly requires you make two
## changes to the release notes from the Bitcoin Core source tree:
##
## 1. Make sure both ordered and unordered lists are preceded by an empty
## (whitespace only) line, like the empty line before this list item.
##
## 2. Place URLs inside angle brackets, like <http://bitcoin.org/bin>

---
```

Then start at the top of the YAML header and read the comments, filling
in and replacing information as necessary, and then reformatting the
release notes (if necessary) as described by the last lines of the YAML
header.

Download links will automatically be set to the defaults using the current
release version number, but if you need to change any download URL, edit
the file `_templates/download.html`

You can then create a pull request to the
master branch and Travis CI will automatically build it and make sure
the links you provided return a "200 OK" HTTP header. (The actual files
will not be downloaded to save bandwidth.) Alternatively, you can build
the site locally with `make all` to run the same quality assurance tests.

The file can be edited later to add any optional information (such as a
release date) that you didn't have when you created the file.

#### Preparing a release in advance

It's nice to prepare a release pull request in advance so that the
Bitcoin Core developers can just click "Merge Pull Request" when the new
version is released.  Here's the recommended recipe, where `<VERSION>`
is the particular version:

1. Create a new branch named `bitcoin-core-<VERSION>`.  You can either
   do this locally or in GitHub's web GUI.

2. Follow the instructions in the [Release Notes][] section to create a
   new release.  You should leave the `optional_date` blank unless you
   happen to know the date of the planned release.

3. Push the branch to the https://github.com/bitcoin-dot-org/bitcoin.org
   repository so any contributor can edit it. **Don't** open a pull
   request yet.

4. Travis CI will build the site from the branch and then run the tests.
   The tests will fail because they expect the release binaries to be
   present and you're preparing this release request in advance of them
   being uploaded.

5. Open the failed Travis CI log.  At the end, it will say something like:

        ERROR:
        Error: Could not retrieve /bin/bitcoin-core-0.10.1/bitcoin-0.10.1-win64-setup.exe
        Error: Could not retrieve /bin/bitcoin-core-0.10.1/bitcoin-0.10.1-win32-setup.exe
        [...]

6. Copy the errors from above into a text file and remove everything
   except for the URLs so that what's left are lines that look like:

        /bin/bitcoin-core-0.10.1/bitcoin-0.10.1-win64-setup.exe
        /bin/bitcoin-core-0.10.1/bitcoin-0.10.1-win32-setup.exe
        [...]

7. Optional, but nice: sort the lines into alphabetical order.

8. Now open a pull request from the `bitcoin-core-<VERSION>` branch to
   the `master` branch. We recommend that you use this title: "Releases:
   Add Bitcoin Core &lt;VERSION>".

   We recommend that you use the following text with any changes you
   think are appropriate. **Note:** read all the way to the end of this
   enumerated point before submitting your pull request.

        This updates the download links to point to <VERSION> and adds the
        <VERSION> release notes to the site. I'll keep it updated throughout
        the RC cycle, but it can be merged by anyone with commit access
        once <VERSION> final is released (see TODO lists below).

        CC: @laanwj

        Essential TODO:

        * [ ] Make sure the download links work. This is automatically checked as part of the Travis CI build, so trigger a rebuild and, if it passes, this should be safe to merge.

        Optional TODO (may be done in commits after merge):

        * [ ] Add the actual release date to the YAML header in `_releases/0.10.1.md`
        * [ ] Add the magnet URI to the YAML header in `_releases/0.10.1.md` (brief instructions for creating the link are provided as comments in that file)

        Expected URLs for the Bitcoin Core binaries:

    Underneath the line 'Expected URLs', paste the URLs you retrieved
    from Travis CI earlier.

    Note that @laanwj is Wladimir J. van der Laan, who is usually
    responsible for uploading the Bitcoin Core binaries.  If someone
    else is responsible for this release, CC them instead.  If you don't
    know who is responsible, ask in #bitcoin-dev on Freenode.

9. After creating the pull request, use the Labels menu to assign it the
   "Releases" label. This is important because it's what the Bitcoin
   Core release manager will be looking for.

10. After each new Release Candidate (RC) is released, update the
    release notes you created in the `_releases` directory. (But don't
    worry about this too much; we can always upload updated release
    notes after the release.)

### Alerts

1. [Who to contact](#who-to-contact)
2. [Basic alert](#basic-alert) (emergency fast instructions)
3. [Detailed alert](#detailed-alert)
4. [Clearing an alert](#clearing-an-alert)

#### Who to Contact

The following people can publish alerts on Bitcoin.org.  Their email
addresses are on the linked GitHub profiles.

- Will Binns, [@wbnns](https://github.com/wbnns), wbnns on Freenode
- Saïvann Carignan, [@saivann](https://github.com/saivann), saivann on Freenode
- Dave Harding, [@harding](https://github.com/harding), harding on Freenode
- Wladimir van der Laan, [@laanwj](https://github.com/laanwj), wumpus on Freenode
- Theymos, [@theymos](https://github.com/theymos), theymos on Freenode

Several of the above are only occasionally on Freenode.  Alert
coordination is usually conducted in #bitcoin-dev on Freenode.

#### Basic Alert

1. Open your editor on a file named `_alerts/YYYY-MM-DD-short-title.md`
   (the alert will appear as <https://bitcoin.org/en/alert/YYYY-MM-DD-short-title>).

2. Paste the following text into the top of the file:

    ```
    ---
    ## Title displayed on alert page
    title: "11/12 March 2013 Chain Fork"
    ## Short URL for use in P2P network alerts: https://bitcoin.org/<shorturl>
    shorturl: "chainfork"
    ## Active alerts will display the banner (below) on all bitcoin.org content pages
    active: true
    ## Banner displayed if 'active: true'.  Can use HTML formatting
    banner: "<b>Chain fork</b> - Please stop mining on bitcoin version 0.8.0. Click here for more information."
    ## Date of the alert in YYYY-MM-DD format
    date: 2015-03-11
    ---

    {% comment %}
    First paragraph should indicate whose bitcoins are safe, to avoid
    starting a panic.
    {% comment %}

    Your bitcoins are safe if you received them in transactions
    confirmed before 2015-07-06 00:00 UTC.

    {% comment %}
    Second paragraph should summarize the problem, and subsequent
    text should indicate what people should do immediately.
    Consider: users (by wallet type), merchants, and miners.
    {% comment %}

    However, there has been a problem with a planned upgrade. For
    bitcoins received later than the time above, confirmation scores are
    significantly less reliable then they usually are for users of
    certain software:

    - Lightweight (SPV) wallet users should wait an additional 30
      confirmations more than you would normally wait. Electrum users,
      please see this note.
    ```

- Edit the file.  It is written in [Markdown format][].

- Commit it.

    - **Note:** the commit must be signed by one of the people in the
      [Who to Contact](#who-to-contact) section for site
      auto-building to work.

- Push the commit to the master branch. Rebuilding the site occurs
  automatically and takes 7 to 15 minutes.

    - **Note:** do not push additional commits until the alert is
      displayed on the live site.  The site build aborts and starts over
      when new commits are found.

- Give the `shorturl` URL (`bitcoin.org/<shorturl>`) to the P2P alert message
  key holders to use in any alert messages they send.

- Proceed to the next section to improve the alert.

#### Detailed Alert

In addition to providing more information about how users should respond
to the situation, you can enhance the alert in several ways described
below.

The following fields may be defined in the the alert YAML header:

```yaml
---
## (Required; HTML text) Title displayed on alert page
title: "11/12 March 2013 Chain Fork"
## (Optional; display ASCII only) Short URL for use in P2P network alerts: https://bitcoin.org/<shorturl>
shorturl: "chainfork"
## (Optional; default=false) Active alerts will display the banner (below) on all bitcoin.org content pages
active: true
## (Optional; HTML text) Banner displayed if 'active: true'.  Can use HTML formatting
banner: "<b>Chain fork</b> - Please stop mining on bitcoin version 0.8.0. Click here for more information."
## (Optional; default=alert) CSS class to set banner color
##   alert = red  |  warning = orange  |  success = green  | info = blue
bannerclass: alert
---
```

The time of the last update should be placed on the page somewhere. UTC
should be used for all dates, and RFC 2822 format ( date -uR ) is
recommended for long dates. For example, place the date in the footer of
the document:

```html
<div style="text-align:right">
  <i>This notice last updated: Thu, 16 May 2013 01:37:00 UTC</i>
</div>
```

You may also want to create a page on the Wiki to allow anyone to
provide additional information.  If you do so, link to it from the
alert.

#### Clearing An Alert

To stop advertising an alert on every Bitcoin.org page, change the YAML
header field `active` to *false*:

```yaml
## (Optional; default=false) Active alerts will display the banner (below) on all bitcoin.org content pages
active: false
```

Alternatively, for a few days you can change the message and set the
CSS `bannerclass` to *success* to indicate the problem has been resolved.

```yaml
## (Optional; HTML text) Banner displayed if 'active: true'.  Can use HTML formatting
banner: "<b>Chain fork</b> - situation resolved"
## (Optional; default=alert) CSS class to set banner color
##   alert = red  |  warning = orange  |  success = green  | info = blue
bannerclass: success
```

[markdown format]: https://help.github.com/articles/markdown-basics/

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
