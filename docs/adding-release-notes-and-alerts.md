## Adding Release Notes and Alerts

### Release Notes

To add a new Bitcoin Core release, create a new file in the
`_releases/` directory named after the release, such as `v29.4.md`.

The easiest way to get the format right is to copy the most recent
file in `_releases/` and update its frontmatter fields for the new
version: `required_version`, `title`, `id`, `name`, `permalink`,
`excerpt`, and the `release` array (one element per decimal place,
e.g. `29.4` becomes `[29, 4]`).

For `optional_date`, use the date bitcoincore.org announced the
release on its blog -- this is the convention the existing files
follow. The field may also be left blank and filled in later.

For the body, paste the release notes from the upstream Bitcoin Core
repository (`doc/release-notes/release-notes-<VERSION>.md` in
`bitcoin/bitcoin`). This site's Markdown parser commonly requires two
changes to that text:

1. Make sure both ordered and unordered lists are preceded by an
   empty (whitespace only) line.

2. Place bare URLs inside angle brackets, like
   `<https://bitcoincore.org/bin>`.

Download links update automatically: `_plugins/releases.rb` selects
the highest version present in `_releases/` as the site-wide download
version, and the download page links the binaries directly from
`https://bitcoincore.org/bin/` -- the canonical location where the
Bitcoin Core team publishes and signs releases -- so no binary uploads
to this site are required. If you ever need to change a download URL,
edit `_templates/download.html`.

Then open a pull request to the master branch; Travis CI will build
the site from the branch. We recommend the title "Add Bitcoin Core
<VERSION>".

To prepare a release in advance, create the file from the upstream
draft release notes, leave `optional_date` blank, and open the pull
request once the release is announced.

### Alerts

1. [Who to contact](#who-to-contact)
2. [Basic alert](#basic-alert) (emergency fast instructions)
3. [Detailed alert](#detailed-alert)
4. [Clearing an alert](#clearing-an-alert)

#### Who to Contact

The following people can publish alerts on Bitcoin.org.  Their email
addresses are on the linked GitHub profiles.

- Will Binns, [@wbnns](https://github.com/wbnns), wbnns on Freenode
- Wladimir van der Laan, [@laanwj](https://github.com/laanwj), wumpus on
  Freenode
- Theymos, [@theymos](https://github.com/theymos), theymos on Freenode

#### Basic Alert

1. Open your editor on a file named `_alerts/YYYY-MM-DD-short-title.md`
   (the alert will appear as
<https://bitcoin.org/en/alert/YYYY-MM-DD-short-title>).

2. Paste the following text into the top of the file:
```
---
## Title displayed on alert page
title: "11/12 March 2017 Chain Fork"
## Short URL for use in P2P network alerts: https://bitcoin.org/<shorturl>
shorturl: "chainfork"
## Active alerts will display the banner (below) on all bitcoin.org content pages
active: true
## Banner displayed if 'active: true'.  Can use HTML formatting banner: "<b>Chain fork</b> - Please stop mining on bitcoin version 0.14.1. Click here for more information."
## Date of the alert in YYYY-MM-DD format
date: 2017-03-11
---

{% comment %}
First paragraph should indicate whose bitcoins are safe, to avoid starting a panic.
{% endcomment %}

Your bitcoins are safe if you received them in transactions confirmed before 2015-07-06 00:00 UTC.

{% comment %}
Second paragraph should summarize the problem, and subsequent
text should indicate what people should do immediately.
Consider: users (by wallet type), merchants, and miners.
{% endcomment %}

However, there has been a problem with a planned upgrade. For
bitcoins received later than the time above, confirmation scores are
significantly less reliable then they usually are for users of
certain software:

- Lightweight (SPV) wallet users should wait an additional 30
  confirmations more than you would normally wait. Electrum users,
  please see this note.
```

- Edit the file.  It is written in [Markdown format](https://guides.github.com/features/mastering-markdown/).

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
title: "11/12 March 2017 Chain Fork"
## (Optional; display ASCII only) Short URL for use in P2P network alerts:
https://bitcoin.org/<shorturl>
shorturl: "chainfork"
## (Optional; default=false) Active alerts will display the banner (below) on
all bitcoin.org content pages
active: true
## (Optional; HTML text) Banner displayed if 'active: true'.  Can use HTML
formatting
banner: "<b>Chain fork</b> - Please stop mining on bitcoin version 0.14.1. Click
here for more information."
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
  <i>This notice last updated: Thu, 16 May 2017 01:37:00 UTC</i>
</div>
```

You may also want to create a page on the Wiki to allow anyone to
provide additional information.  If you do so, link to it from the
alert.

#### Clearing An Alert

To stop advertising an alert on every Bitcoin.org page, change the YAML
header field `active` to *false*:

```yaml
## (Optional; default=false) Active alerts will display the banner (below) on
all bitcoin.org content pages
active: false
```

Alternatively, for a few days you can change the message and set the
CSS `bannerclass` to *success* to indicate the problem has been resolved.

```yaml
## (Optional; HTML text) Banner displayed if 'active: true'.  Can use HTML
formatting
banner: "<b>Chain fork</b> - situation resolved"
## (Optional; default=alert) CSS class to set banner color
##   alert = red  |  warning = orange  |  success = green  | info = blue
bannerclass: success
```

[markdown format]: https://help.github.com/articles/markdown-basics/
