## Adding Events, Release Notes and Alerts

### Events

If you're not comfortable with GitHub pull requests, please open a [new issue](https://github.com/bitcoin-dot-org/bitcoin.org/issues/new?title=New%20event&body=%20%20%20%20-%20date%3A%20YYYY-MM-DD%0A%20%20%20%20%20%20title%3A%20%22%22%0A%20%20%20%20%20%20venue%3A%20%22%22%0A%20%20%20%20%20%20address%3A%20%22%22%0A%20%20%20%20%20%20city%3A%20%22%22%0A%20%20%20%20%20%20country%3A%20%22%22%0A%20%20%20%20%20%20link%3A%20%22%22).

To create an event pull request, place the event in `_events.yml` and adhere to
this format:

```
- date: 2014-02-21
  title: "2014 Texas Bitcoin Conference"
  venue: "Circuit of the Americas™ - Technology and Conference Center"
  address: "9201 Circuit of the Americas Blvd"
  city: "Austin, TX"
  country: "United States"
  link: "http://texasbitcoinconference.com/"
```

### Release Notes

To create a new Bitcoin Core release, create a new file in the
`_releases/` directory. Any file name ending in `.md` is fine, but we
recommend naming it after the release, such as `0.10.0.md`

Then copy in the following YAML header (the part between the three dashes, ---):
```
---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

## Required value below populates the %v variable (note: % needs to be escaped
in YAML if it starts a value)
required_version: 0.10.0
## Optional release date.  May be filled in hours/days after a release
optional_date: 2015-02-16
## Optional title.  If not set, default is: Bitcoin Core version %v released
optional_title: Bitcoin Core version %v released
## Optional magnet link.  To get it, open the torrent in a good BitTorrent
client
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

2. Follow the instructions in the [Release
   Notes](https://github.com/bitcoin-dot-org/bitcoin.org/blob/master/docs/adding-events-release-notes-and-alerts.md#release-notes)
   section to create a new release.  You should leave the `optional_date` blank
   unless you happen to know the date of the planned release.

3. Push the branch to the https://github.com/bitcoin-dot-org/bitcoin.org
   repository so any contributor can edit it. **Don't** open a pull
   request yet.

4. Travis CI will build the site from the branch and then run the tests.
   The tests will fail because they expect the release binaries to be
   present and you're preparing this release request in advance of them
   being uploaded.

5. Open the failed Travis CI log.  At the end, it will say something like:
```
ERROR:
Error: Could not retrieve /bin/bitcoin-core-0.10.1/bitcoin-0.10.1-win64-setup.exe
Error: Could not retrieve /bin/bitcoin-core-0.10.1/bitcoin-0.10.1-win32-setup.exe
[...]
```
6. Copy the errors from above into a text file and remove everything
   except for the URLs so that what's left are lines that look like:
```
/bin/bitcoin-core-0.10.1/bitcoin-0.10.1-win64-setup.exe
/bin/bitcoin-core-0.10.1/bitcoin-0.10.1-win32-setup.exe
[...]
```
7. Optional, but nice: sort the lines into alphabetical order.

8. Now open a pull request from the `bitcoin-core-<VERSION>` branch to
   the `master` branch. We recommend that you use this title: "Releases:
   Add Bitcoin Core <VERSION>".

   We recommend that you use the following text with any changes you
   think are appropriate. **Note:** read all the way to the end of this
   enumerated point before submitting your pull request.
```
This updates the download links to point to <VERSION> and adds the <VERSION>
release notes to the site. I'll keep it updated throughout the RC cycle, but it
can be merged by anyone with commit access once <VERSION> final is released (see
TODO lists below).

CC: @laanwj
```

Essential TODO:

* [ ] Make sure the download links work. This is automatically checked as part
  of the Travis CI build, so trigger a rebuild and, if it passes, this should be
safe to merge.

Optional TODO (may be done in commits after merge):

* [ ] Add the actual release date to the YAML header in `_releases/0.10.1.md`
* [ ] Add the magnet URI to the YAML header in `_releases/0.10.1.md` (brief
  instructions for creating the link are provided as comments in that file)

Expected URLs for the Bitcoin Core binaries:

Underneath the line 'Expected URLs', paste the URLs you retrieved from Travis CI
earlier.

Note that @laanwj is Wladimir J. van der Laan, who is usually responsible for
uploading the Bitcoin Core binaries.  If someone else is responsible for this
release, CC them instead.  If you don't know who is responsible, ask in
#bitcoin-dev on Freenode.

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
{% comment %}

Your bitcoins are safe if you received them in transactions confirmed before 2015-07-06 00:00 UTC.

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
