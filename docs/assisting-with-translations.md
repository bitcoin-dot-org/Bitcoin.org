# Assisting with Translations

This document provides information regarding translations for bitcoin.org.

## Table of Contents
* [Getting Started with the Translation Team](#getting-started-with-the-translation-team)
* [Responsibilities and Tasks for each User Role](#responsibilities-and-tasks-for-each-user-role)
* [Frequently Asked Questions](#frequently-asked-questions)
* [Handling Translations on GitHub](#handling-translations-on-github)


___

## Getting Started with the Translation Team

While the website itself is managed on [GitHub](https://github.com/bitcoin-dot-org/bitcoin.org/), the translations are handled through [Transifex](https://www.transifex.com/bitcoinorg/bitcoinorg/).
This section shall explain the first steps on Transifex for new volunteers who want to help with translating bitcoin.org.

General guidelines provided by Transifex itself can be found [here](https://docs.transifex.com/getting-started/translators).

### 1. Create a Transifex Account
* Follow this [link](https://www.transifex.com/signup/) and create an account. Creating a Transifex account is free and not much information is needed.

### 2. Login and join the Bitcoin.org Translation Team
* Follow this [link](https://www.transifex.com/bitcoinorg/bitcoinorg/) and click on “Join team”.
* Select the language you want to translate into.
* Your request to join a team will be accepted instantly, and you will be a translator for the language you selected.
* If your language is not available yet, close the pop-up, scroll down, and click on “Request language” on the right side. Please consider first if it is necessary that bitcoin.org is available in your language. There is a lot of content to be translated and especially for languages with a low number of native speakers, there won’t be many people available that are willing to assist you.

### 3. Get to know the Interface
* Play around with the interface. Transifex's interface can be a bit confusing and it cannot hurt to take a look around.
* An introduction, provided by Transifex, can be found [here](https://docs.transifex.com/translation/translating-with-the-web-editor/?utm_source=welcome&utm_medium=email&utm_content=translator).
* As Translator, you cannot cause any harm as you can only edit unreviewed strings. A complete history is saved for every string, making it impossible to destroy previous work.
* In the beginning, stay away from the Glossary as this can be edited by new translators but no history is saved.

### 4. Join our Telegram Group
* Join our [Telegram Group](https://t.me/bitcoinaroundtheworld).
* The Website Maintainer, both Team Leaders for translations, a number of language coordinators, and various translators are present in this group.
* We are happy to help in case you need assistance.

### 5. Choose what you want to translate
* Click on "Dashboard" on the top.
* Once you are on the "Dashboard", click on "Languages" on the left side and select your language.
* You will see a lot of different resources and their progress.
* Each resource consists of a number of strings, with a string being for example a paragraph or headline.
* Each string has three possible states: "untranslated", "translated but unreviewed", and "reviewed". Only the first state "untranslated" is relevant for new volunteers. However, if you find a "translated but unreviewed" string that contains obvious mistakes, you are free to correct them. "Reviewed" strings can only be changed or unreviewed by reviewers.
* **The first resource "bitcoin.org" contains all strings of the main page. If you are no Bitcoin expert, start here.**
* **Everything else that follows starts with "devdocs...", indicating that these files are part of the developer documentation. It is recommended that you only try to translate the developer documentation if you are an experienced Bitcoin user and/or developer with a profound understanding.**

### 6. Start translating
* You must be a native speaker for the language you choose to translate.
* Please be careful to preserve the original meaning of each text.
* Sentences and popular expressions should sound native in your language.
* Translations need to be reviewed by a reviewer or coordinator before
  publication.
* Once reviewed, coordinators will notify the Team Leaders that a certain translation is ready for publication.
* **In doubt, please contact coordinators on Transifex. That'll be much
  appreciated.**
  
### 7. Take a look at the Responsibilities and Tasks for each User Role
* The next section [Responsibilities and Tasks for each User Role](#responsibilities-and-tasks-for-each-user-role) outlines - as the title says - the responsibilities and tasks for each user role.

___

## Responsibilities and Tasks for each User Role

This section shall outline the responsibilities and tasks for each user role.

### 1. Team Leaders
Team Leader is currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel).

* Oversight on the complete translation efforts on Transifex.
* Keeping track on everything.
* Being a contact person for all sorts of questions that cannot be answered by language coordinators.
* Promoting or demoting users (e.g. promoting a reviewer to coordinator).
* Managing groups that have no active coordinator.

### 2. Coordinators
Various people across all language teams are coordinators. For a number of languages, no active coordinator exists. If there are any questions or you want to assist by becoming a coordinator, write one of the Team Leaders.
* When additional help is needed: Translating, thereby using translations provided by the glossary if applicable and striving for consistency across strings.
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
* Checking for consistency across translations (e.g. is “transaction malleability” translated consistently across all strings?).

### 4. Translators
* Translating, thereby using translations provided by the glossary if applicable and striving for consistency across strings.
* Extending the glossary with translations for necessary and general terms.
    
___

## Frequently Asked Questions

This FAQ intends to provide answers to some questions that might occur while translating bitcoin.org on Transifex. If you feel that some questions are missing, get in contact with Simon AKA “Komodorpudel” (Telegram: @Komodorpudel). He is happy to help, adding your question to the FAQ. 

### 1. What is Transifex? 

Transifex is a cloud-based localization platform, translation management software. It is used to manage the work on the various translations of bitcoin.org. 
     
### 2. I know how to speak a certain language and want to help – how can I get started? 

Just jump to the [Getting Started with the Translation Team](#getting-started-with-the-translation-team) section in this document. Everything is described there. 

### 3. Do I need to know how to use GitHub to translate? 

No, even though the website is managed on GitHub, it is only necessary to understand how to translate bitcoin.org on Transifex. Everything GitHub-related, such as creating a Pull Request to update a specific translation of bitcoin.org, is handled by cobra, the owner of bitcoin.org. However, if you are familiar with GitHub, you are welcome to create your own Pull Request to update specific translations of bitcoin.org. Just take a look at section [Handling Translations on GitHub](#handling-translations-on-github) in this document. 

### 4. How do I use Transifex? 

It is probably best if you take a look at the info provided by Transifex [here](https://docs.transifex.com/getting-started-1/translators) and [here](https://docs.transifex.com/translation/translating-with-the-web-editor/?utm_source=welcome&utm_medium=email&utm_content=translator). Everything beyond the basics is probably best learned by clicking through the menus of Transifex. 

### 5. What are resources? 

A resource consists of a number of strings, with a string being for example a paragraph or headline. The first resource "bitcoin.org" contains all strings of the main page. If you are no Bitcoin expert, start here. Everything else that follows starts with "devdocs...", indicating that these files are part of the developer documentation. It is recommended that you only try to translate the developer documentation if you are an experienced Bitcoin user and/or developer with a profound understanding. 

### 6. How and when are my translations put to use? 

Your translations are welcome and help to improve bitcoin.org, the unofficial but original website of Bitcoin. Bitcoin.org was originally registered and owned by Bitcoin's first two developers, Satoshi Nakamoto and Martti Malmi. Translations are usually only pushed to the website if:

1. the corresponding resource that contains the translations is 100% translated and 100% reviewed and 
2. a Team Leader (currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel) is notified about a resource being finished. 

### 7. A reviewed translation contains a mistake. What should I do? 

This depends on whether you are (a) a translator or (b) a reviewer or higher.

If (a) is true, you won’t be able to change the string yourself. Thus, make a comment about the issue and mention reviewers and/or coordinators within your language team from whom you know that they are active by using @username. If no one responsible in your team is active, link a Team Leader (currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel). 

If (b) is true, and you are sure that the translation contains a mistake, just edit the string. If you are not 100% sure, make a comment about the issue and mention reviewers and/or coordinators within your language team from whom you know that they are active by using @username. 
     
### 8. Will I be paid for translating bitcoin.org? 

In general, no, however there are periods like during the summer 2018, in which we were able to compensate many volunteers. Compensating volunteers from time to time for their efforts is something we strive to be able to continue to do. 

### 9. Who is responsible for the translation project on Transifex? 

Bitcoin.org itself is owned by cobra. The website is maintained by cobra with input from many other volunteers on GitHub. Cobra is also one of the project maintainers for the translation project on Transifex, with the effective oversight on translations done by Simon AKA “Komodorpudel” (Telegram: @Komodorpudel).

### 10. I found a mistake in the original English version. What should I do? 

Comment the mistake and mention one of the Team Leaders by using @username or contact a Team Leader directly via message. Team Leader is currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel).

### 11. How do I get in contact with other translators? 

You can join our [Telegram Group](https://t.me/bitcoinaroundtheworld). The Website Maintainer, both Team Leaders for translations, and a bunch of coordinators, reviewers, and translators are present in this group. 

If you only want to contact members of your language team on Transifex, click on "Teams" on the top and then on the small blue chat bubble symbol. By clicking on “New discussion”, you can create language specific discussions. Everyone in the language team will receive an (email) notification about this. 

Apart from that, you can obviously contact other translators by using the direct message function on Transifex. 

### 12. I translated a string completely. What’s next? 

Great work! Now that the string is translated, it has to be reviewed. If there are active reviewers in your team, just wait for them to review to string. Get in contact with them if you feel that this is necessary. If there are no active reviewers (and coordinators) in your team, get in contact with a Team Leader. Team Leader is currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel).  He can promote you to reviewer so that you can review your own strings as a last solution. 

### 13. I am not sure how to translate a string/word. Where can I get help? 

While it is possible to use the comment function on Transifex to ask for help, unfortunately no notification is sent out regarding a comment. Thus, your comment will probably stay unread until someone accidentally finds it. Therefore, we do not recommend using the comment function in this case. 

Instead, please ask your question in the [Telegram Group](https://t.me/bitcoinaroundtheworld) or contact a Team Leader. Team Leader is currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel). 
     
### 14. I can’t find a team for my own language. Who should I contact to add a new language? 

If you do not have a Transifex account yet, just look at point “2. Login and join the Bitcoin.org Translation Team” of the section [Getting Started with the Translation Team](#getting-started-with-the-translation-team) in this document. When your language request is accepted or denied you will receive a notification. 

You can also contact a Team Leader about this. Team Leader is currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel). 

### 15. A suggestion provided by the glossary does not make sense. What should I do? 

Don’t worry. Just ignore it and continue translating. Transifex will display a warning message that a glossary term is missing, but this has no impact on translations being published. 

### 16. I made a mistake in my own translation. What should I do? 

If your translation is not reviewed yet, just correct the mistake and save the new translation. 

If your translation was reviewed and the mistake not corrected in the process, correct the mistake if you are a reviewer yourself or contact the person that reviewed your translation. 

### 17. No one is reviewing the strings I translated. What should I do? 

Contact the reviewers in your language team and ask for a review; either through a direct message on Transifex or through Telegram if you have their Telegram-usernames. 

If the reviewers in your team are not active, contact the coordinator about this. Coordinators are either active native speakers or, if there is currently no active coordinator in place for your language, “Komodorpudel”, one of the Team Leaders, is set as coordinator. 

If you do not receive a reply from an active coordinator, contact Simon AKA “Komodorpudel” (Telegram: @Komodorpudel). If necessary, he can promote you to reviewer, so you can review your own strings. 

### 18. How to contact a member, reviewer, coordinator or team manager? 

Open the “Dashboard”, click on “Languages” and then on your specific language. Click on “View Members” on the top. 

From there, click on a member’s username to open the member’s profile page. There you can click on “Send Message” on the upper right section of the member profile screen and compose a message. 

### 19. Does a translated string have to have the same number of symbols and/or lines as the original English string? 

In general, no. Translated strings can be as long as they need to be. 

However, if a translated string is significantly longer than the English string, this could cause formatting issues. If this should be the case, we would notify you. 

### 20. Sometimes “Bitcoin” is written with a capital letter (“Bitcoin”) and other times with a small letter (“bitcoin). Why? 

"Bitcoin" is used when talking about the protocol itself: "You should create a new Bitcoin address for every payment". 

"bitcoin" is used when talking about actual units of bitcoin: "There is no fee to receive bitcoins" 

All together: "You should create a new Bitcoin address every time you want to receive bitcoins" 

Please note that the English version is not entirely consistent on this. If you find an issue, please contact a Team Leader. Team Leader is currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel).

### 21. A certain string is hard to translate without any context. Where can I get some? 

In the best case, on Transifex the “string instructions” field between the source text-field and the translation-field contains a link to the location of the string on the website. 

If no link can be found, click on “Context” below the field to enter the translation and use the code to navigate to the corresponding part of bitcoin.org  

Alternatively, you can just google parts of the string in English + "bitcoin.org" attached. Usually this leads to the part of bitcoin.org where the string is located. 

### 22. I finished a string but Transifex displays a warning. What should I do? 

The usual warning message you will see is “Glossary translation for term 'xyz' missing from translation”. However, this warning message can usually be ignored because in most cases it makes sense to translate certain words not according to the glossary. 

However, if you see an URL-related warning message, this must be corrected because otherwise it will cause issues while publishing the translations. Usually, the problem can easily be solved by checking all the links in the translated text. 

### 23. When and how should I open an Issue? 

You can open Issues by leaving a comment and flagging it as an “Issue”. 

We strongly recommend to not use this function at all. Instead, please contact either the coordinator for your language or a Team Leader directly. Team Leader is currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel).

### 24. I cannot find an answer to my problem in the FAQ. What should I do? 

Join our [Telegram Group](https://t.me/bitcoinaroundtheworld) and ask your question there. 

Alternatively, you can directly contact a Team Leaders. Team Leader is currently Simon AKA “Komodorpudel” (Telegram: @Komodorpudel).
___

## Handling Translations on GitHub

This section outlines how to handle translations on GitHub. In order to handle translations on GitHub, it's important that you have a fundamental understanding of [Ruby](https://ruby.github.io/TryRuby/), [HTML](https://www.w3schools.com/html/default.asp)/[CSS](https://www.w3schools.com/css/default.asp), [JavaScript](https://www.javascript.com/try), [Jekyll](https://jekyllrb.com/), [Git](https://guides.github.com/) and [Travis CI](https://travis-ci.org/bitcoin-dot-org/bitcoin.org). You should also be able to [set up your environment](https://github.com/bitcoin-dot-org/bitcoin.org/blob/master/docs/setting-up-your-environment.md).

**If you only want to help by translating content, simply navigate to [Getting Started with the Translation Team](#getting-started-with-the-translation-team) section.**

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
    

