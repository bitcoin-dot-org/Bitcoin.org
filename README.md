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
