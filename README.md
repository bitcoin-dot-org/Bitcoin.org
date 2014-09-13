## How To Participate

You can report problems or help improve bitcoin.org by opening an issue or a [pull request](#working-with-github) on [GitHub](https://github.com/bitcoin/bitcoin.org). You can also help by [translating](#translation) bitcoin.org's text on [Transifex](https://www.transifex.com/projects/p/bitcoinorg/).

### Working With GitHub

GitHub allows you to make changes to a project using git, and later submit them in a "pull request" so they can be reviewed and discussed. Many online how-tos exist so you can learn git, [here's a good one](https://www.atlassian.com/git/tutorial/git-basics).

In order to use GitHub, you need to [sign up](http://github.com/signup) and [set up git](https://help.github.com/articles/set-up-git). You will also need to click the **Fork** button on the bitcoin.org [GitHub page](https://github.com/bitcoin/bitcoin.org) and clone your GitHub repository into a local directory with the following command lines:

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

You simply need to push additional commits on the appropriate branch of your GitHub repository. That's basically the same steps as above, except you don't need to re-create the branch and the pull request.

**How to reset and update your master branch with latest upstream changes**

1. Fetch upstream changes. `git fetch upstream`
2. Checkout to your master branch. `git checkout master`
3. Replace your master branch by the upstream master branch. `git reset --hard upstream/master`
4. Replace your master branch on GitHub. `git push origin master -f`

### Previewing

#### Preview Small Text Changes

Simple text changes can be previewed live on bitcoin.org. You only need to click anywhere on the page and hold your mouse button for one second. You'll then be able to edit the page just like a document. Changes will be lost as soon as the page is refreshed.

#### Build Site With Jekyll From Bundler

Make sure you have ruby 2.0. If you don't, we recommend
[installing it with RVM](https://www.digitalocean.com/community/articles/how-to-install-ruby-on-rails-on-ubuntu-14-04-using-rvm),
which can usually be done by running the following three commands:

    \curl -sSL https://get.rvm.io | bash -s stable
    source ~/.rvm/scripts/rvm
    rvm install ruby-2.0.0

Next, you need to install bundler, and let it install all gems you need
to build the site. You must run the last command from within your local
bitcoin.org repository:

    gem install bundler
    bundle install

Finally, you can build the website in _site/:

    bundle exec jekyll build

You can then copy the output files from _site/ to the root of your web server.
If you have no web server, run `bundle exec jekyll serve` and visit
http://127.0.0.1:4000/. This server requires you to add a trailing ".html"
by hand in your browser address bar.

#### Build Site With Jekyll From APT

The instructions in the section above will ensure that you use the same
versions of the same software we use to build the website, but you can
also install dependencies from your Linux distribution. For example:

Installing dependencies on Ubuntu 12.10:

    sudo apt-get install jekyll node-less ruby1.9.1-dev libicu-dev
    sudo gem install ffi-icu

Installing dependencies on older Ubuntu and Debian distributions:

    sudo apt-get install rubygems ruby1.9.1-dev build-essential libicu-dev
    sudo gem install jekyll json less therubyracer ffi-icu

Finally build the website in _site/:

    jekyll

...Or `jekyll build` on recent versions. You can then copy the output files
from _site/ to the root of your web server. If you have no web server, run
`jekyll --server` (or `jekyll serve` on recent versions) and visit
http://127.0.0.1:4000/. This server requires you to add a trailing ".html"
by hand in your browser address bar.

#### Building With Make

After you've installed Jekyll and the other dependencies, you can
optionally use GNU Make to automatically build the site and run several
tests. You will first need to install Make using your package manager;
for example:

    sudo apt-get install make

Then in your local bitcoin.org repository, run one of the following
commands:

    ## To just build the site, the equivalent of: bundle exec jekyll build
    make

    ## After you build the site, you can run all of the tests (may take awhile)
    make test

    ## Or you can build the site and run some quick tests with one command:
    make valid

    ## Or build the site and run all tests
    make all

## Developer Documentation

Each part of the documentation can be found in the [_includes](https://github.com/bitcoin/bitcoin.org/tree/master/_includes)
directory. Updates, fixes and improvements are welcome and can submitted using [pull requests](#working-with-github) on GitHub.

**Mailing List**: General discussions can take place on the
[mailing list](https://groups.google.com/forum/#!forum/bitcoin-documentation).

**TODO List**: New content and suggestions for improvements can be submitted
to the [TODO list](https://github.com/bitcoin/bitcoin.org/wiki/Documentation-TODO).
You are also welcome if you want to assign yourself to any task.

**Style Guide**: For better consistency, the [style guide](https://github.com/bitcoin/bitcoin.org/wiki/Documentation-Style-Guide)
can be used as a reference for terminology, style and formatting. Suggested changes
can also be submitted to this guide to keep it up to date.

**Cross-Reference Links**: Cross-reference links can be defined in
_includes/references.md. Terms which should automatically link to these
references are defined in _autocrossref.yaml .

## Translation

### How To Translate

You can join a translation team on [Transifex](https://www.transifex.com/projects/p/bitcoinorg/) and start translating or improving existing translations. Latest live previews and communications can be found on [this thread](https://bitcointalk.org/index.php?topic=349633.0).

* You must be a native speaker for the language you choose to translate.
* Please be careful to preserve the original meaning of each text.
* Sentences and popular expressions should sound native in your language.
* You can check the result on live previews and [test small changes](#preview-small-text-changes).
* Translations need to be reviewed by a reviewer or coordinator before publication.
* Once reviewed, translations can be [submitted](#import-translations) in a pull request on GitHub.
* **In doubt, please open a discussion on Transifex with coordinators. That'll be much appreciated.**

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

## Wallets

Wallets can be added in `_templates/choose-your-wallet.html`. Entries are ordered by levels and new wallets must be added after the last wallet on the same level.

* Level 1 - Full nodes
* Level 2 - SPV, Random servers
* Level 3 - Hybrid, Multisig wallets
* Level 4 - Web wallets

**Screenshot**: The png files must go in `/img/screenshots`, be 250 X 350 px and optimized with `optipng -o7 file.png`.

**Icon**: The png file must go in `/img/wallet`, be 144 X 144 px and optimized with `optipng -o7 file.png`. The icon must fit within 96 X 96 px inside the png, or 85 X 85 px for square icons.

**Description**: The text must go in `_translations/en.yml` alongside other wallets' descriptions.

### Score

Each wallet is assigned a score for five criterias. For each of them, the appropriate text in `_translations/en.yml` needs to be choosen.

**Control** - What control the user has over his bitcoins?

To get a good score, the wallet must provide the user with full exclusive control over their bitcoins.

To get a passing score, the wallet must provide the user with exclusive control over their bitcoins. Encrypted online backups are accepted so long as only the user can decrypt them. Multisig wallets are accepted so long as only the user can spend without the other party's permission.

**Decentralization** - How secure and « zero trust » is payment processing?

To get a good score, the wallet must be a full node and need no trust on other nodes.

To get a passing score, the wallet must rely on random nodes, either by using the SPV model or a pre-populated list or servers.

**Transparency** - How transparent and « zero trust » is the source code?

To get a good score, the wallet must deserve a passing score and be built deterministically.

To get a passing score, the wallet must be open-source, under version control and releases must be clearly identified (e.g. by tags or commits). The codebase and final releases must be public since at least 6 months and previous commits must remain unchanged.

**Environment** - How secure is the environment of the wallet?

To get a good score, the wallet must run from an environment where no apps can be installed.

To get a passing score, the wallet must run from an environment that provides app isolation (e.g. Android, iOS), or require two-factor authentication for spending.

**Privacy**: Does the wallet protect users' privacy?

To get a good score, the wallet must rotate addresses, avoid disclosing information to peers or central servers and be compatible with Tor.

To get a passing score, the wallet must rotate addresses.

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
