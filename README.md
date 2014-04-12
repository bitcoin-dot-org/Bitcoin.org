## How to participate

You can report any problem or help to improve bitcoin.org by opening an issue or a [pull request](#working-with-github) on [GitHub](https://github.com/bitcoin/bitcoin.org). You can also help [translating bitcoin.org](#translation) on [Transifex](https://www.transifex.com/projects/p/bitcoinorg/).

### Working with GitHub

GitHub allows you to make changes to a project using git, and later submit them in a "pull request" so they can be reviewed and discussed. Many online how-tos exist so you can learn git, [here's a good one](https://www.atlassian.com/git/tutorial/git-basics).

In order to use GitHub, you need to [sign up](http://github.com/signup) and [set up git](https://help.github.com/articles/set-up-git). You will also need to click the **Fork** button on the bitcoin.org [GitHub page](https://github.com/bitcoin/bitcoin.org) and clone your GitHub repository into a local directory using the following command lines:

```
git clone (url provided by GitHub on your fork's page) bitcoin.org
cd bitcoin.org
git remote add upstream https://github.com/bitcoin/bitcoin.org.git
```

**How to send a pull request**

1. Checkout to your master branch. `git checkout master`
2. Create a new branch from the master branch. `git checkout -b (any name)`
3. Edit files and [preview](#previewing) the result.
4. Track changes in files. `git add -A`
5. Commit your changes. `git commit -m '(short description for your change)'`
6. Push your branch on your GitHub repository. `git push origin (name of your branch)`
7. Click on your branch on GitHub and click the **Compare / pull request** button to send a pull request.

When submitting a pull request, please take required time to discuss your changes and adapt your work. It is generally a good practice to split unrelated changes into separate branchs and pull requests.

**How to make additional changes in a pull request**

You simply need to push additionnal commits on the appropriate branch of your GitHub repository. That's basically the same steps as above, except you don't need to re-create the branch and the pull request.

**How to reset and update your master branch with latest upstream changes**

1. Fetch upstream changes. `git fetch upstream`
2. Checkout to your master branch. `git checkout master`
3. Replace your master branch by the upstream master branch. `git reset --hard upstream/master`
4. Replace your master branch on GitHub. `git push origin master -f`

### Previewing

**Easy preview**: Simple text changes can be previewed live on bitcoin.org. You only need to click anywhere on the page and hold your mouse button for one second. You'll then be able to edit the page just like a document. Changes will be lost as soon as the page is refreshed.

**Real preview**: Install [dependencies](#requirements), run jekyll (or "jekyll build" on older setups), and copy the output files from _site/ to the root of your web server. If you have no web server, run jekyll --server (or "jekyll serve" on older setups). This server requires you to add a trailing ".html" by hand in your browser address bar.

### Requirements

Installing dependencies on Ubuntu 12.10

    sudo apt-get install jekyll node-less ruby1.9.1-dev libicu-dev
    sudo gem install ffi-icu

Installing dependencies on older Ubuntu and Debian distributions

    sudo apt-get install rubygems ruby1.9.1-dev build-essential libicu-dev
    sudo gem install jekyll json less therubyracer ffi-icu

## Translation

### How to translate

You can join a translation team on [Transifex](https://www.transifex.com/projects/p/bitcoinorg/) and start translating or improving existing translations. Latest live previews and communications can be found on [this thread](https://bitcointalk.org/index.php?topic=349633.0).

* You must be a native speaker for the language you choose to translate.
* Please be careful to preserve the original meaning of each text.
* Sentences and popular expressions should sound native in your language.
* Translations need to be reviewed by a reviewer or coordinator before publication.
* Once reviewed, translations can be [submitted](#import-translations) in a pull request on GitHub.
* **In doubt, please open a discussion on Transifex with coordinators. That'll be much appreciated.**

### Import translations

**Update translations**: You can update the relevant language file in \_translations/ and from the root of the git repository run ./\_contrib/updatetx.rb to update layouts and templates for this language. You should also make sure that no url has been changed by translators. If any page needs to be moved, please add [redirections](#redirections).

**Add a new language**: You can put the language file from Transifex in \_translations and add the language in \_config.yml in the right display order for the language bar. Make sure to review all pages and check all links.

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

## Posts

### Events

Events should be placed in `_events/YYYY-MM-DD-SHORTTITLE.md` and adhere to this format:

```
---
date: 2014-02-21
title: "2014 Texas Bitcoin Conference"
venue: "Circuit of the Americas™ - Technology and Conference Center"
address: "9201 Circuit of the Americas Blvd"
city: "Austin, TX"
country: "United States"
link: "http://texasbitcoinconference.com/"
---
```

### Release Notes

Release notes should be placed in `_releases/YYYY-MM-DD-VERSION.md` and adhere to this format:

```
---
title: Bitcoin Core version 0.9.0 released
---

Bitcoin Core v0.9.0 is now available for download at
<https://bitcoin.org/bin/0.9.0/>

...
```
* `VERSION` is used to define the version and construct the URL. It should adhere to this format: `v0.3.24`.
* `title: ...` will be used as the title

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
* `alias: ...` (optional) a short alias for Bitcoin Core alerts. Ex. "dos" will produce /dos.html
* `active: ...` (true or false) define if the alert should appear as ongoing in the network status page.
* `banner: ...` (optional) a short text that will be displayed in a red alert banner and link to the alert page.
* `last updated: ...` should be kept up to date and be in RFC 2822 format ( date -uR ).

## Advanced Usage

### Redirections

Redirections can be defined in ```_config.yml```.

```
  /news: /en/version-history
```

### Aliases for contributors

Aliases for contributors are defined in ```_config.yml```.

```
aliases:
  s_nakamoto: Satoshi Nakamoto
  --author=Satoshi Nakamoto: Satoshi Nakamoto
  gavinandresen: Gavin Andresen
```
