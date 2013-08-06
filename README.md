# Requirements

Installing dependencies on Ubuntu 12.10

    sudo apt-get install jekyll node-less ruby1.9.1-dev
    sudo gem install ffi-icu

Installing dependencies on older Ubuntu and Debian distributions

    sudo apt-get install rubygems ruby1.9.1-dev build-essential
    sudo gem install jekyll json less therubyracer ffi-icu

# Usage

* update DOWNLOAD\_VERSION in _config.yml
* run jekyll
* output will be in \_site/

## Translation

### How to translate

* Translations can be done on transifex https://www.transifex.com/projects/p/bitcoinorg/
* You must be a native speaker for the language you choose to translate.
* At least one other reviewer is required.
* Changing the meaning of any statement should be avoided. In doubt, you can open a discussion on transifex.
* Sentences and popular expressions should be adapted so that they sound native in your language.

### Add new translations

1. Begin, Add language code where required in _config.yml.
2. Import, Download the translated .yml file from transifex and put that file in _translations.
3. Images, Translate the few images that contain text with a vector image editing software like Inkscape. Translations for these images are at the end of the imported .yml translation file. Make sure to convert all texts to paths when saving final svg files.
4. Vocabulary, Add correct alphabetical order for your language in the vocabulary page.
5. Preview, Check if all pages are complete, test each links, check that texts with a limited size display nicely. For example, right side buttons and some titles have height or width restrictions.

### Update translations

You can import all translations (complete and incomplete) from transifex using the transifex client:

    tx init
    tx set --auto-remote https://www.transifex.com/projects/p/bitcoinorg/
    tx pull -a -s --skip
    
Then, you can overwrite any specific translation in the _translations folder by one of these files. You might also need to make sure that each .html files (in _layouts, _templates and _redirects) don't serve outdated content for those languages. You should also make sure that no urls or anchor has been changed by translators.

### Update source english strings

Any change in the english texts can be done through a pull request on github. If your changes affect the html layout of a page, you should apply fallback html code for other languages until they are updated.

    {% case page.lang %}
    {% when 'fr' %}
      (outdated french content)
    {% else %}
      (up to date english content)
    {% endcase %}
    
### Update source strings on transifex

**When translation is needed**: If you want all changes you've made to be re-translated, you can simply update the resource file (en.yml) on transifex.

**When translation is not needed**: If you are only pushing typo fixes and that you don't want translators to redo all their work again, you can use the transifex client to pull translations, update en.yml and push back all translations at once:

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
  <i>This notice last updated: Fri Mar 16 22:58:00 UTC 2012</i>
</div>

```
* `SHORTTITLE` is used to construct the URL.
* `title: ...` will be used as the title in the layout.
* `alias: ...` (optional) a short alias for Bitcoin-Qt alerts. Ex. "dos" will produce /dos.html
* `active: ...` (true or false) define if the alert should appear as ongoing in the network status page.
* `banner: ...` (optional) a short text that will be displayed in a red alert banner and link to the alert page.

### Release Notes

Release notes should be placed in `_releases/YYYY-MM-DD-SHORTTITLE.md` and adhere to this format:

```
---
title: Bitcoin version 0.3.24 released
src: http://sourceforge.net/mailarchive/message.php?msg_id=27771039
---

Bitcoin v0.3.24 is now available for download at
<https://sourceforge.net/projects/bitcoin/files/Bitcoin/bitcoin-0.3.24/>

...
```
* `SHORTTITLE` is used to construct the URL. Something like `v0.3.24` will be fine
* `title: ...` will be used as the title
* `src: ...` (optional) link to full annoucement

### Events

Events should be placed in `_events/YYYY-MM-DD-SHORTTITLE.md` and adhere to this format:

```
---
title: "Bitcoin 2013 The future of payments"
city: "San Jose"
country: "United States"
link: "http://bitcoin2013.com/"
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
