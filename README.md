# Requirements

Installing dependencies

    sudo apt-get install rubygems ruby1.9.1-dev build-essential
    sudo gem install jekyll aquarium json less therubyracer

# Usage

* update DOWNLOAD\_VERSION in _config.yml
* run jekyll
* output will be in \_site/

## Translation

### Guidelines

* You must be a native speaker for the language you choose to translate.
* At least one other reviewer might be required and is highly recommanded.
* Try to avoid changing the meaning of any statements. If you need to change the meaning of anything, make a note of it and list that in the pull request.
* Sentences and popular expressions should be adapted so that they sound native in your language.

### How to translate

1. Begin, Run ./_contrib/translate (ISO 639-1 language code) (language name) to create your language. Ex : ./_contrib/translate fr "Français"
2. Texts, Open .html files in the appropriate folder and in _layouts and translate all human readable english dialogs (without touching the html tags and the page id).
3. Links, Update the name of each .html file so that it reflects your language and update the links in the .html files accordingly.
4. Sitemap, Add links to your translated pages in _config.yml under their equivalent english version.
5. Images, Update the few images that contain text with any vector image editing software like Inkscape.
6. Languages, Make sure that the languages are listed in alphabetical order in _config.yml

* A tips for translators, you can preview your work in a simple Google chrome browser with no HTTP server. Just go to the existing english page, open the javascript console with CTRL + SHIFT + J and use the following command to make the page editable : document.body.contentEditable=true

### Update

All changes made in the english version can be easily tracked on github.

## Advanced Usage

### Alerts

You can easily put a global alert on the website by changing the ALERT and ALERT\_CLASS variables in _config.yml.
And you can also set an alert specific to a language by appending the language code to the ALERT.

Example:

```
ALERT_CLASS: error
ALERT: <strong>Security alert:</strong> Please upgrade to 0.3.25 as soon as possible!
ALERT_fr: <strong>Alerte de sécurité:</strong> Mettez Bitcoin à jour vers la version 0.3.25 sans délais!
```

will produce an english red alert box for all languages, and a translated red alert box for french language.
Possible classes are: error (red), info (blue), success (green) and warning (yellow)

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

# Requirements

These ruby gems are required to build the website:

* jekyll
* aquarium
* json
* less
* therubyracer

