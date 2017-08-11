## Translations

### How To Translate

You can join a translation team on
[Transifex](https://www.transifex.com/projects/p/bitcoinorg/) and start
translating or improving existing translations.

* You must be a native speaker for the language you choose to translate.
* Please be careful to preserve the original meaning of each text.
* Sentences and popular expressions should sound native in your language.
* Translations need to be reviewed by a reviewer or coordinator before
  publication.
* Once reviewed, translations can be [submitted](#import-translations) in a pull
  request on GitHub.
* **In doubt, please contact coordinators on Transifex. That'll be much
  appreciated.**

### Import Translations

**Update translations**: You can update the relevant language file in
\_translations/ and from the root of the git repository run
./\_contrib/updatetx.rb to update layouts and templates for this language. You
should also make sure that no url has been changed by translators. If any page
needs to be moved, please add [redirections](https://github.com/bitcoin-dot-org/bitcoin.org/blob/master/docs/miscellaneous.md#redirections).

**Add a new language**: You can put the language file from Transifex in
\_translations and add the language in \_config.yml in the right display order
for the language bar. Make sure to review all pages and check all links.

### Update English Strings

Any change in the English text can be done through a pull request on GitHub. If
your changes affect the HTML layout of a page, you should apply fallback HTML
code for other languages until they are updated.

    {% case page.lang %}
    {% when 'fr' %}
      (outdated french content)
    {% else %}
      (up to date english content)
    {% endcase %}

**When translation is needed**: If you want all changes you've made to be
re-translated, you can simply update the resource file (en.yml) on Transifex.

**When translation is not needed**: If you are only pushing typo fixes and that
you don't want translators to redo all their work again, you can use the
Transifex client to pull translations, update en.yml and push back all
translations at once:


    # Init Transifex project
    tx init
    
    # Setup Transifex local client to use a project created on Transifex
    tx set --auto-remote https://www.transifex.com/bitcoinorg/bitcoinorg/
    
    # Download all translations
    tx pull -a -s --skip
    
    # Set the translations/bitcoinorg.bitcoinorg/en.yml file
    # as a source that will be pushed back to the server after
    # updating the translation
    tx set --source -r bitcoinorg.bitcoinorg -l en translations/bitcoinorg.bitcoinorg/en.yml
    
    # (update en.yml)
    
    # Push changes back to Transifex
    tx push -s -t -f --skip --no-interactive
