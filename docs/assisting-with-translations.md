Table of content

* [Handling Translations on GitHub](#handling-translations-on-gitHub)
* [Getting started with the Bitcoin.org Translation Team](#Getting-started-with-the-Bitcoin.org-Translation-Team)
* [Responsibilities and Tasks for each User Role](#Responsibilities-and-Tasks-for-each-User-Role)

[Go to Real Cool Heading section](#real-cool-heading)
___
___

#Real Cool Heading

## Handling Translations on GitHub

This section outlines how to handle translations on GitHub. If you only want to help by translating content, scroll down to section [B. Getting started with the Bitcoin.org Translation Team](#b.-getting-started-with-the-bitcoin.org-translation-team)

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
    
___
___

## Getting started with the Bitcoin.org Translation Team

While the website itself is managed on [GitHub](https://github.com/bitcoin-dot-org/bitcoin.org/), the translations are handled through [Transifex](https://www.transifex.com/bitcoinorg/bitcoinorg/).
This document shall explain the first steps on Transifex for new volunteers who want to help with translating bitcoin.org.

General guidelines provided by Transifex itself can be found [here](https://docs.transifex.com/getting-started/translators).

### 1. Create a Transifex Account
* Follow this [link](https://www.transifex.com/signup/) and create an account. Not much information is needed.

### 2. Login and join the Bitcoin.org Translation Team

* Follow this [link](https://www.transifex.com/bitcoinorg/bitcoinorg/) and click on “Join team”.
* Select the language you want to translate into.
* Your request to join a team will be accepted instantly, and you will be a translator for the language you selected.
* If your language is not available yet, close the pop-up, scroll down, and click on “Request language” on the right side. Please consider first if it is necessary that bitcoin.org is available in your language. There is a lot of content to be translated and especially for languages with a low number of native speakers, there won’t be many people available that are willing to assist you.

### 3.	Get to know the Interface
* Play around with the interface. Transifex's interface can be a bit confusing and it cannot hurt to take a look around.
* As Translator, you cannot cause any harm as you can only edit unreviewed strings. A complete history is saved for every string, making it impossible to destroy previous work.
* For the beginning, stay away from the Glossary as this can be edited by new translators but no history is saved.

### 4.	Join our Telegram Group
* Join our [Telegram Group](https://t.me/joinchat/Bgh47RC1BZb2YE6u8iznOg).
* The website maintainer, both Team Leaders for translations, a number of language coordinators, and various translators are present in this group.
* We are happy to help in case you need assistance.

### 5.	Choose what you want to translate
* Click on "Dashboard" on the top.
* Once you are on the "Dashboard", click on "Languages" on the left side and select your language.
* You will see a lot of different resources and their progress.
* Each resource consists of a number of strings, with a string being for example a paragraph or headline.
* Each string has three possible states: "untranslated", "translated but unreviewed", and "reviewed". Only the first state "untranslated" is relevant for new volunteers. However, if you find a "translated but unreviewed" string that contains obvious mistakes, you are free to correct them. "Reviewed" strings can only be changed or unreviewed by reviewers.
* **The first resource "bitcoin.org" contains all strings of the main page. If you are no Bitcoin expert, start here.**
* **Everything else that follows starts with "devdocs...", indicating that these files are part of the developer documentation. Is is recommended that you only try to translate the developer documentation if you are an experienced Bitcoin user and/or developer with a profound understanding.**

### 6.	Start translating
* You must be a native speaker for the language you choose to translate.
* Please be careful to preserve the original meaning of each text.
* Sentences and popular expressions should sound native in your language.
* Translations need to be reviewed by a reviewer or coordinator before
  publication.
* Once reviewed, coordinators will notify the Team Leaders that a certain translation is ready for publication.
* **In doubt, please contact coordinators on Transifex. That'll be much
  appreciated.**
  
### 7.	Take a look at the Responsibilities and Tasks for each User Role
* The next document in this folder, "2. responsibilities-and-tasks-for-each-user-role", outlines - as the title says - the responsibilities and tasks for each user role.

___
___

## Responsibilities and Tasks for each User Role

This document shall outline the responsibilities and tasks for each user role.

### 1. Team Leaders
Team Leaders are currently Simon AKA “Komodorpudel” (Telegram: “Komodorpudel”) and Apple AKA “ajsolbrilla”.

* Oversight on the complete translation efforts on Transifex.
* Keeping track on everything.
* Being a contact person for all sorts of questions that cannot be answered by language coordinators.
* Promoting or demoting users (e.g. promoting a reviewer to coordinator).
* Managing groups that have no active coordinator.

### 2.	Coordinators
Various people across all language teams are coordinators. For a number of languages, no active coordinator exists. If there are any questions or you want to assist by becoming a coordinator, write one of the Team Leaders.
* If man power is needed: Translating, thereby using translations provided by the glossary if applicable and striving for consistency across strings.
* Oversight on the complete translation efforts for a specific language.
* Notifying Team Leaders if a resource is ready to be put on the website.
* Being a contact person for the Team Leaders.
* Being a contact person for all reviewers and translators within a specific language team.
* Introducing and helping new volunteers.
* Promoting or demoting users (e.g. promoting a translator to reviewer).
* Kicking out users that do not behave (e.g. only use Google Translator) or are completely inactive.

### 3. Reviewers
* Translating, thereby using translations provided by the glossary if applicable and striving for consistency across strings.
* Reviewing strings (preferably not your own strings if possible).
* Checking translations for correctness regarding meaning and spelling.
* Checking for consistency across translations (e.g. is “transaction malleability” translated consistently across all string?).

### 4. Translators
* Translating, thereby using translations provided by the glossary if applicable and striving for consistency across strings.
* Extending the glossary with translations for necessary and general term
