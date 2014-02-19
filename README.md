# Usage

**Easy preview**: Simple changes in the texts can be previewed live on bitcoin.org with any recent browser. You only need to click anywhere on the page and hold your mouse button for one second. You'll then be able to edit the page just like a document. Changes will be lost as soon as the page is refreshed.

**Real preview**: Install dependencies, edit the files, run jekyll (or "jekyll build" on older setups), and copy the output files from _site/ at the root of your web server. If you have no web server, run jekyll --server (or "jekyll serve" on older setups). This server requires you to add a trailing ".html" by hand in your browser window.

## Requirements

Installing dependencies on Ubuntu 12.10

    sudo apt-get install jekyll node-less ruby1.9.1-dev
    sudo gem install ffi-icu

Installing dependencies on older Ubuntu and Debian distributions

    sudo apt-get install rubygems ruby1.9.1-dev build-essential
    sudo gem install jekyll json less therubyracer ffi-icu

## Translation

### How to translate

* Translations can be done on Transifex https://www.transifex.com/projects/p/bitcoinorg/
* You must be a native speaker for the language you choose to translate.
* At least one other reviewer is required.
* Changing the meaning of any statement should be avoided. In doubt, you can open a discussion on Transifex.
* Sentences and popular expressions should be adapted so that they sound native in your language.

### Import translations

**Update translations**: You can overwrite each language files in _translations by their updated version from Transifex. You should make sure that each .html files (in _layouts, _templates) don't serve outdated content for those languages. You should also make sure that no url has been changed by translators. If one page has been replaced or moved, a redirection can be added in _config.yml.

**Add a new language**: You can put the language file from Transifex in _translations and add the language in _config.yml in the right display order for the language bar. Make sure to review all pages and check all links.

### Update english strings

Any change in the english texts can be done through a pull request on GitHub. If your changes affect the html layout of a page, you should apply fallback html code for other languages until they are updated.

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

## Advanced Usage

### Alerts

Network alerts should be placed in `_alerts/YYYY-MM-DD-SHORTITLE.html` and adhere to this format:

```
---
title: "11/12 March 2013 Chain Fork"
alias: "chainfork"
active: true
banner: "<b>Chain fork</b> - Please stop mining on bitcoin version 0.8.0. Click here for more information."
---

<p>
A chain fork is happening. Please stop mining on bitcoin version 0.8.0. Your bitcoins are safe but it is recommended that you postpone your Bitcoin transactions for the next hours.
</p>
<p>
More information will follow.
</p>
<div style="text-align:right">
  <i>This notice last updated: Thu, 16 May 2013 01:37:00 UTC</i>
</div>

```
* `SHORTTITLE` is used to construct the URL.
* `title: ...` will be used as the title in the layout.
* `alias: ...` (optional) a short alias for Bitcoin-Qt alerts. Ex. "dos" will produce /dos.html
* `active: ...` (true or false) define if the alert should appear as ongoing in the network status page.
* `banner: ...` (optional) a short text that will be displayed in a red alert banner and link to the alert page.
* `last updated: ...` should be kept up to date and be in RFC 2822 format ( date -uR ).

### Release Notes

Release notes should be placed in `_releases/YYYY-MM-DD-VERSION.md` and adhere to this format:

```
---
title: Bitcoin version 0.3.24 released
src: http://sourceforge.net/mailarchive/message.php?msg_id=27771039
---

Bitcoin v0.3.24 is now available for download at
<https://sourceforge.net/projects/bitcoin/files/Bitcoin/bitcoin-0.3.24/>

...
```
* `VERSION` is used to define the version and construct the URL. It should adhere to this format: `v0.3.24`.
* `title: ...` will be used as the title
* `src: ...` (optional) link to full annoucement

### Events

Events should be placed in `_events/YYYY-MM-DD-SHORTTITLE.md` and adhere to this format:

```
---
title: "2014 Texas Bitcoin Conference"
venue: "Circuit of the Americas™ - Technology and Conference Center"
address: "9201 Circuit of the Americas Blvd"
city: "Austin, TX"
country: "United States"
link: "http://texasbitcoinconference.com/"
---
```

### Aliases for contributors

Aliases for contributors are defined in ```_config.yml```.

```
aliases:
  s_nakamoto: Satoshi Nakamoto
  --author=Satoshi Nakamoto: Satoshi Nakamoto
  gavinandresen: Gavin Andresen
```
