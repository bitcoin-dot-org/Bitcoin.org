# Requirements

Installing dependencies on Ubuntu 12.10

    sudo apt-get install jekyll node-less

Installing dependencies on older Ubuntu and Debian distributions

    sudo apt-get install rubygems ruby1.9.1-dev build-essential
    sudo gem install jekyll json less therubyracer

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
    
Then, you can overwrite any specific translation in the _translations folder by one of these files. You might also need to make sure that each .html files (including the layout) don't serve outdated content for those languages. You should also make sure that no urls or anchor has been changed.

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

You can easily put an alert on the website by changing the ALERT and ALERT\_CLASS variables in _config.yml.  
You can both set one fallback alert for all languages and many translated alerts for specific languages.

Example:

```
ALERT_CLASS:
  all: <strong>Security alert:</strong> Please upgrade to 0.8.1 as soon as possible!
  fr: <strong>Alerte de sécurité:</strong> Mettez Bitcoin à jour vers la version 0.8.1 sans délais!
ALERT:
  all: error
  fr: error
```

This will produce an english red alert box for all languages, and a translated red alert box for french language.  
Possible classes are: **error** (red), **info** (blue), **success** (green) and **warning** (yellow)

### Release Notes

Release notes should be placed in `_posts/releases/YEAR-MONTH-DAY-SHORTTITLE.md` and adhere to this format:

```
---
layout: post
title: Bitcoin version 0.3.24 released
src: http://sourceforge.net/mailarchive/message.php?msg_id=27771039
category: releases
---

Bitcoin v0.3.24 is now available for download at
<https://sourceforge.net/projects/bitcoin/files/Bitcoin/bitcoin-0.3.24/>

...
```
* `SHORTTITLE` is used to construct the URL. Something like `v0.3.24` will be fine
* `layout: post` important for Jekyll
* `title: ...` will be used as the title
* `src: ...` (optional) link to full annoucement
* `category: ...` category of post
** `releases`
** `events`

### Aliases for contributors

Aliases for contributors are defined in ```_config.yml```.

```
aliases:
  s_nakamoto: Satoshi Nakamoto
  --author=Satoshi Nakamoto: Satoshi Nakamoto
  gavinandresen: Gavin Andresen
```
