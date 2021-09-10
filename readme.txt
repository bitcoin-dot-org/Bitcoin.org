=== Bitcoin and Altcoin Wallets ===
Contributors: dashedslug
Donate link: https://flattr.com/profile/dashed-slug
Tags: wallet, bitcoin, cryptocurrency, altcoin, coin, money, e-money, e-cash, deposit, withdraw, account, API
Requires at least: 4.0
Tested up to: 4.9.8
Requires PHP: 5.6
Stable tag: 3.6.7
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Turn your blog into a bank: Let your users deposit, withdraw, and transfer bitcoins and altcoins on your site.

== Description ==

https://www.youtube.com/watch?v=j7kddOZOaqc

### Turn your blog into a bank: Let your users deposit, withdraw, and transfer bitcoins and altcoins on your site.

= At a glance =

[Bitcoin and Altcoin Wallets](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin) is a FREE WordPress plugin by [dashed-slug](https://dashed-slug.net).

Your users can perform financial transactions on your site via Bitcoins and other cryptocurrencies.


= Get the free PDF manual! =

1. Visit the dashed-slug [download area](https://dashed-slug.net/downloads).
2. Download the Bitcoin and Altcoin Wallets **bundle**. You will find the PDF file inside the ZIP download.
3. RTFM! :-)

= Bitcoin and Altcoin Wallets FREE plugin overview =

This is the *core plugin* that takes care of *basic accounting functionality*:

- **Accounting for your users.** Data is held on tables in your MySQL database.
- **A financial transaction [PHP API](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/php-api/)**:
  Calls that let the logged in user handle their cryptocurrencies.
- **A [JSON API](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/json-api/)**: JSON requests of the above, for logged in users.
- **[Simple shortcodes](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/shortcodes/)**:
  These let you display frontend UI elements to let logged-in users perform the following common tasks:
  - deposit from the blockchain,
  - withdraw to an external blockchain address,
  - transfer funds to other users (on-site transactions that bypass the blockchain),
  - view a history of past transactions
- **Widgets** the same UI elements available via shortcodes can also be used as widgets in your theme.
- Configure who has a wallet and who does what using WordPress capabilities.
- Configure e-mail notifications for users.
- Configure e-mail confirmations for transactions and optionally confirm transactions via the admin interface.
- **Backup and restore transactions**: An **import/export** functionality to backup transactions to and from [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) files.
- **Extensible architecture**
  - Easily install coin adapter plugins to use other cryprocurrencies besides Bitcoin.
  - Easily install extension plugins that talk to the PHP API to provide additional functionality such as payment gateways.

= Free coin adapter extensions =

 You can extend this plugin to work with other coins if you install coin adapters. Coin adapters are available for free to all [subscribers at dashed-slug](https://www.dashed-slug.net/dashed-slug/subscribe/) (you do not have to pay for membership).

- [block.io Cloud Wallet Adapter extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/block-io-cloud-wallet-adapter-extension/)
- [CoinPayments Adapter extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/coinpayments-adapter-extension/)
- [Full Node Multi Coin Adapter](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/full-node-multi-coin-adapter-extension/)
- [Litecoin Adapter extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/litecoin-adapter-extension/)

...plus more!

= Premium plugin extensions available today =

Premium [dashed-slug](https://www.dashed-slug.net) members enjoy unlimited access to all the premium extensions to this plugin (as well as extensions to the [SVG Logo and Text Effects](https://wordpress.org/plugins/slate/) FREE WordPress plugin).

Here are all the currently available premium app extensions to the Bitcoin and Altcoin Wallets FREE WordPress plugin:

- [Exchange extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/exchange-extension/)
- [Airdrop extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/airdrop-extension/)
- [Faucet extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/faucet-extension/)
- [ShapeShift Exchange extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/shapeshift-extension/)
- [Tip the Author extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/tip-the-author-extension/)
- [WooCommerce Cryptocurrency Payment Gateway extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/woocommerce-cryptocurrency-payment-gateway-extension/)
- [Events Manager Cryptocurrency Payment Gateway extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/events-manager-cryptocurrency-payment-gateway-extension/)
- [Author Payroll extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/author-payroll-extension/)

Premium members also get auto-updates for any installed extensions. [Instructions for how to set up auto-updates are here](https://www.dashed-slug.net/dashed-slug/extension-updates-activation/).

**The dashed-slug.net development is driven by your feedback. Send in your feature requests today.**

= follow the slime =

The dashed-slug is a social slug:

- Facebook: [https://www.facebook.com/dashedslug](https://www.facebook.com/dashedslug)
- Google+: [https://plus.google.com/103549774963556626441](https://plus.google.com/103549774963556626441)
- RSS feed: [https://www.dashed-slug.net/category/news/feed](https://www.dashed-slug.net/category/news/feed)
- SteemIt: [https://steemit.com/@dashed-slug.net](https://steemit.com/@dashed-slug.net)
- Youtube channel: [https://www.youtube.com/dashedslugnet](https://www.youtube.com/dashedslugnet)
- GitHub: [https://github.com/dashed-slug](https://github.com/dashed-slug)

== Installation ==

As a new user, you should first read the glossary section of the documentation to familiarize yourself with some basic concepts. The troubleshooting section for the main plugin is also found in the documentation. The support forum for the main plugin is at [WordPress.org](https://wordpress.org/support/plugin/wallets), but please first read [this notice](https://wordpress.org/support/topic/important-please-read-before-posting-an-issue/) before posting.

First, understand the tradeoff between setting up a full node or using the cloud wallets.

= Full node =

A **full node** is harder to setup and maintain, but gives you performance and freedom to control network fee settings. With a full node you do not rely on a third party to do transaction verification. If you are interested in connecting to your own custom coin you might be interested in setting up a full node.

If you are interested in installing a **full node**, then follow the instructions in the [YouTube video](https://www.youtube.com/watch?v=_dbkKHhEzRQ) or [article](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/installation-instructions/).

= Cloud wallets =

**Cloud wallets** on the other hand are easier to use and provide more coins, but are somewhat slower, and you rely on a third party service.

- If you are interested in installing the CoinPayments adapter:
  - TL;DR installation instructions are on the [coin adapter page](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/coinpayments-adapter-extension/).
  - More detailed step-by-step instructions are [on this page](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/installation-instructions-web-wallet/) and [in this YouTube video](https://www.youtube.com/watch?v=j7kddOZOaqc).
- If you prefer to install the block.io coin adapter then the installation instructions are on the [block.io coin adapter page](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/block-io-cloud-wallet-adapter-extension/).

There is a Troubleshooting section on the coin adapter pages. It lists common problems and their solutions.

The support forums for the two web wallet coin adapters are [here](https://www.dashed-slug.net/forums/forum/coinpayments-net-coin-adapter-extension-support/) and [here](https://www.dashed-slug.net/forums/forum/block-io-cloud-wallet-adapter-extension-support/).

= Disclaimer =

**By using this free plugin, you accept all responsibility for handling the account balances for all your users.**
Under no circumstances is **dashed-slug.net** or any of its affiliates responsible for any damages incurred by the use of this plugin.

Every effort has been made to harden the security of this plugin, but its safe operation depends on your site being secure overall.
You, the site administrator, must take all necessary precautions to secure your WordPress installation before you connect it to any live wallets.

You are strongly advised to take the following actions (at a minimum):

- [educate yourself about hardening WordPress security](https://codex.wordpress.org/Hardening_WordPress)
- [install a security plugin such as Wordfence](https://infinitewp.com/addons/wordfence/)
- **Enable SSL on your site** if you have not already done so.

By continuing to use the Bitcoin and Altcoin Wallets plugin, you indicate that you have understood and agreed to this disclaimer.

= Further reading =

- [https://codex.wordpress.org/Managing_Plugins#Installing_Plugins](https://codex.wordpress.org/Managing_Plugins#Installing_Plugins)
- [https://bitcoin.org/en/full-node](https://bitcoin.org/en/full-node)
- [https://en.bitcoin.it/wiki/Running_Bitcoin](https://en.bitcoin.it/wiki/Running_Bitcoin)


== Frequently Asked Questions ==

= Which coins are currently available? =

Using the built-in coin adapter you can connect to a Bitcoin core full node.

You can connect to any Bitcoin-like full node that you manage yourself using the *[Bitcoin and Altcoin Wallets: Full Node Multi Coin Adapter](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/full-node-multi-coin-adapter-extension/?utm_source=wallets&utm_medium=docs&utm_campaign=faq")*. This would include coins such as Litecoin, Dogecoin, etc.

Also, if you are OK with using a web wallet service, then you can install the *[CoinPayments adapter](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/coinpayments-adapter-extension/?utm_source=wallets&utm_medium=docs&utm_campaign=faq)*. You then automatically get [all of the coins that platform supports](https://www.coinpayments.net/supported-coins).

= Is it secure? =

The [Bitcoin and Altcoin Wallets](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) plugin is only as secure as your WordPress installation. Regardless of whether you choose to install this plugin, you should have already taken steps to secure your WordPress installation. At a minimum you should do the following:

- Install a security plugin such as [Wordfence](https://infinitewp.com/addons/wordfence/).
- Read the Codex resources on [Hardening WordPress](https://codex.wordpress.org/Hardening_WordPress).
- If you are connecting to an RPC API on a different machine than that of your WordPress server over an untrusted network,
  make sure to tunnel your connection via `ssh` or `stunnel`. [See here](https://en.bitcoin.it/wiki/Enabling_SSL_on_original_client_daemon).

= I am encountering some problem with the Bitcoin and Altcoin Wallets plugin =

You should first have a look at the *Troubleshooting* section of the documentation. Go to the [dashed-slug downloads area](https://www.dashed-slug.net/downloads/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) and grab the *bundle* package of the plugin. This includes the documentation in PDF form. Scroll to the troubleshooting section and see if your problem is listed. If not, read the *Contact* section for ways in which you can ask for support. Some additional [info about how to ask for support is found here](https://wordpress.org/support/topic/important-please-read-before-posting-an-issue/).

= I am encountering some problem with an Extension to the Bitcoin and Altcoin Wallets plugin =

You should first have a look at the extension's page on [dashed-slug.net](https://www.dashed-slug.net/?utm_source=wallets&utm_medium=docs&utm_campaign=faq). If your solution is not found there, you can also scan the appropriate subsection of [the support forums](http://dashed-slug.net/support/?utm_source=wallets&utm_medium=docs&utm_campaign=faq). You can also post your own question. Please use the appropriate forum and post a new thread for each distinct issue.

= Do I really need to run a full node? bitcoind is too resource-hungry for my server. =

Running a full node requires you to set up the daemon on a VPS or other machine that you own and administer. Normally the full blockchain needs to be downloaded, so you need to make sure that your server can handle the disk and network requirements.

**Cloud wallets**

Instead, you can choose to install one of the available coin adapters that are backed by cloud wallet services. These currently are:

- The [CoinPayments Adapter extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/coinpayments-adapter-extension/?utm_source=wallets&utm_medium=docs&utm_campaign=faq)
- The [block.io Cloud Wallet Adapter extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/block-io-cloud-wallet-adapter-extension/?utm_source=wallets&utm_medium=docs&utm_campaign=faq)

Study the services and their terms of service including what fees they charge before choosing to use them.

**bittiraha**

From version 1.1.0 onward, this plugin is compatible with the [bittiraha-walletd](https://github.com/prasos/bittiraha-walletd) wallet. From the project's description on GitHub:

> Lightweight Bitcoin RPC compatible HD wallet
> This project is meant as a drop-in replacement for bitcoind for use in lightweight servers.

This is a wallet based on `bitcoinj` and does not store the blockchain locally. You will have to install this on a VPS or other server via the shell.

A downside is that the `walletnotify` mechanism and the `listtransactions` command are not implemented. **This means that there is no easy way for the plugin to be notified of deposits.** Deposits will not be recorded in the transactions table. Users will not be emailed when they perform deposits and they will not be able to see their deposits in the `[wallets_transactions]` UI. Deposits will correctly affect users' balances. You have been warned.


= Can you install/configure the plugin for me? / I am having trouble with the bitcoin.conf file =

I am available to answer any specific questions if you attempt to install the plugin and you face some problem. Unfortunately I do not undertake installation and configuration of the plugin.

Keep in mind that no software is set-and-forget. Once you install software, it then needs to be maintained. If you find that you are having trouble installing the plugin or connecting it to a wallet, even with help, this is a good indication that you should not be running a wallet with people's money on it.

Remember that you have two options: stand-alone wallets or web wallets. Running a web wallet is considerably easier than a stand-alone wallet, as it does not require system administration skills. As a general rule, if you have trouble using Linux from the command line, you will be better off installing a web wallet.

= How can I integrate the plugin with my site? =

Just insert the [shortcodes](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/shortcodes/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) anywhere to create forms to let a logged in user:

- **deposit funds:** `[wallets_deposit]`
- **withdraw funds:** `[wallets_withdraw]`
- **transfer funds to other users:** `[wallets_move]`
- **view their balance:** `[wallets_balance]`
- **view past transactions:** `[wallets_transactions]`

These shortcodes render [knockout.js](http://knockoutjs.com/)-enabled forms. Read the shortcodes documentation for more details.

You can enter the same UI elements into your theme's widget area.
Simply go to *Appearance* &rarr; *Widgets* and use the provided front-end widgets.

You can also use a special menu item to display the user balances as part of a nav menu. See the *Frontend* section of the documentation for details.


= I don’t like the built-in forms. Can I change them or provide my own? =

1. First of all, the forms can be styled with CSS. They have convenient HTML classes that you can use.

2. If you wish to translate the form texts to a different language, see the *Localization* section of this manual.

3. If you wish to change the texts to something else, you may use the `wallets_ui_text_*` WordPress filters.

4. If you wish to create forms with completely different markup, you can provide your own views for these shortcodes.
Use the `wallets_views_dir` filter to override the directory where the views are stored (the default is `wallets/includes/views`).
Most people will not need to do this.

Read the *Frontend* &rarr; *Alternative knockout templates* section of the user manual for more details.

= I want to do transactions from JavaScript. I don’t want to use the provided shortcodes and their associated forms. =

The provided built-in forms talk to a JSON API that is available to logged in users.
If you choose to build your own front-end UI, you can do your AJAX calls directly to the JSON API.

Refer to the [JSON API documentation](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/json-api/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) for details.

= I want to do transactions from the PHP code of my theme or plugin. =

You can use the PHP API directly.

Refer to the [PHP API documentation](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/php-api/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) for details.

= I want to replace an adapter with another one. =

You can only have one coin adapter enabled per each coin. The plugin will warn you about this. To replace the adapter for a coin with a new adapter:

1. Deactivate the old adapter.
2. Install and configure the new adapter.
3. Enable the new adapter.
4. Got to *Wallets* &rarr; *Adapters*. Under the new adapter, select *Renew deposit addresses*. This will renew any user deposit addresses, as well as the cold storage deposit address for that coin.

= Can you add XYZ coin for me? =

Unfortunately no. I can no longer cater to requests to add new coin adapters. I can only provide assistance by answering specific questions to coin adapter developers.

If your coin's wallet has a standard RPC API that is a direct fork of Bitcoin core, then you should be able to use the [Full Node Multi Coin Adapter](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/full-node-multi-coin-adapter-extension/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) extension.

If your coin is an ERC-20 token then there is no support for that at the moment.

= Are you available for custom development work? =

Unfortunately I do not undertake custom projects. If you have an idea about a cool extension then please let me know about it. If it is a good fit for the project, it will be added to the backlog. When implemented, It will be available either to all users for free, or for dashed-slug premium members.

= Can I use an exchange to facilitate cryptocurrency trading on top of this plugin? =

Yes, an [Exchange extension](https://www.dashed-slug.net/cryptocurrency-exchange-plugin-wordpress/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) is now available to premium dashed-slug members. The relevant blog post announcement [is here](https://www.dashed-slug.net/cryptocurrency-exchange-plugin-wordpress/?utm_source=wallets&utm_medium=docs&utm_campaign=faq).

Alternatively you can use the [ShapeShift app extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/shapeshift-extension/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) that lets you display a front-end UI to the [ShapeShift.io](https://shapeshift.io/) service.

= I want to do a token sale. Can I use WooCommerce to do so? =

It is not recommended that you use WooCommerce and the [WooCommerce payment gateway extension](https://www.dashed-slug.net/bitcoin-altcoin-wallets-wordpress-plugin/woocommerce-cryptocurrency-payment-gateway-extension/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) to sell tokens or other coins.

Instead, consider using the [Exchange extension](https://www.dashed-slug.net/cryptocurrency-exchange-plugin-wordpress/?utm_source=wallets&utm_medium=docs&utm_campaign=faq) to provide a way for your users to buy or sell your token. This requires that you have a working *coin adapter* for your coin or token.

= In the adapters list view, why is the Hot Wallet Balance not equal to the Sum of User Balances? =

The Hot Wallet Balance and the Users Balances are not the same thing. The difference is explained in the *Glossary* section of the documentation.

Reasons why the two amounts would diverge:

1. As users pay fees for transactions, their total balances decrease but the wallet balance stays the same.
2. If you have used the cold storage feature, or alternatively if you have deposited/withdrawn directly from the wallet and not via the plugin, then the balances will not match. See the *Cold Storage* section in the documentation for more.

= My site was hacked and some funds were stolen. Can you help? =

I regret that I cannot help you. As you may know, cryptocurrency transactions are non-reversible. This is why the security disclaimer is there - you, as an administrator, are solely responsible for the security of your site. There is no way I could assume responsibility for lost funds. I do not hold private keys to any of your or your users' funds.

If you have evidence that your funds were stolen you should go to the police. In some situations it may be possible to track down the thieves.

= I want to pay for premium membership but cannot or do not want to pay via PayPal. =

I plan to build a plugin extension that will allow you to pay for membership via cryptocurrencies. When ready, this extension will also be made available as a dashed-slug premium extension. In the meantime, you may contact me directly at [info@dashed-slug.net](mailto:info@dashed-slug.net) if you wish to send a Bitcoin payment and I will activate your membership manually.

= How can I get support or submit feedback? =

Please use the [support forum on WordPress.org](https://wordpress.org/support/plugin/wallets) for all issues and inquiries regarding the plugin.

To get support on the provided extensions, subscribe to dashed-slug and go to the [support forums](https://www.dashed-slug.net/support/?utm_source=wallets&utm_medium=docs&utm_campaign=faq).

For all other communication, please contact [info@dashed-slug.net](mailto:info@dashed-slug.net).




== Screenshots ==

1. **Adapters list** - Go to the Wallets menu to see a list of installed coin adapters and their status.
2. **Capabilities matrix** - Easily control who can do what by assigning WordPress capabilities to your user roles.
3. **Confirmation settings** - Decide whether internal and external transfers need to be verified by the user over email, an administrator via the admin panel, or both.
4.  **Cron** - Control the recurring background tasks to finetune the plugin's performance.
5. **E-mails** - Use a simple templating format to edit the email notifications that users receive about their transactions.
6. **QR-Codes** - Turn on or off the display of QR-codes for deposit addresses.
7. **Bitcoin adapter settings** - Settings for communicating with the Bitcoin RPC API. If you install other coin adapters they will have similar panels with settings.
8. **Frontend - deposit** - The `[wallets_deposit]` shortcode displays a UI element that lets your users know which address they can send coins to if they wish to deposit to their account.
9. **Frontend - move** - The `[wallets_move]` shortcode displays a UI element that lets your users transfer coins to other users on the site.
10. **Frontend - withdraw** - The `[wallets_withdraw]` shortcode displays a UI element that lets your users withdraw coins from their account to an external address.
11. **Frontend - balance** - The `[wallets_balance]` shortcode displays your users' account balances.
12. **Frontend - transactions** - The `[wallets_transactions]` shortcode displays an AJAX-powered table of past transactions affecting the accounts of your users.
13. **Frontend - account value** - The `[wallets_account_value]` shortcode shows the account's total value expressed in the default fiat currency.
14. **Frontend - deposit as list** - Use `[wallets_deposit template="list"]` to display user deposit addresses as a list.
15. **Frontend - balances as list** - Use `[wallets_balance template="list"]` to display user balances as a list.
16. **Frontend - transactions as a list** - Use `[wallets_transactions template="rows"]` to display transactions as a list rather than a table.


== Changelog ==

= 3.6.7 =
Fix: Important bug in balance calculation, introduced in `3.6.5` regarding withdrawal fees. All fees are now being properly accounted for.

= 3.6.6 =
- Fix: Change in DB schema allows installation on very old MySQL databases that don't allow over 1000 characters in index. (Error 1071: Specified key was too long)
- Fix: Do not attempt to unlock RPC wallets with passphrase if coin adapter is disabled.

= 3.6.5 =
- Fix: Better balance algo, includes all trading fees in calculation.
- Add: Deposits can now have comments (needed for upcoming fiat coin adapter).
- Improve: moment.js localization now matches WordPress locale (affects all time translations, including faucet).
- Improve: In *Exchange Rates* admin menu, exchange rates in debug views are sorted alphabetically, allowing easier inspection.
- Improve: If plugin recieves notification about an invalid TXID or blockid, handles error silently, writing a warning to the logs.
- Add: In user profiles screen, deposit addresses also display extra info such as Payment ID, Memo, etc.
- Fix: In user profiles screen, deposit addresses are no longer shown as links if no explorer URI is available.

= 3.6.4 =
- Fix: Fees on deposits coming from the CoinPayments adapter were not subtracted from user balances. (Important!)
- Fix: When the recipient of an internal transaction gets an email notification, the email now displays a positive amount, minus any fees paid by the sender.
- Improve: DB table string columns are shorter. This allows for default Unicode collation to be used without hitting a limit on index size in MySQL < 5.6

- Add: New introductory YouTube video added to readme file.

= 3.6.3 =
- Add: New filter `wallets_user_data` allows for adding data to JavaScript global variable `walletsUserData`.
- Improve: Move and withdraw UIs are now based on an HTML table layout.
- Improve: AJAX calls no longer pass unneeded path info to the request URI.
- Improve: Safer loading of transaction UI fragments file (does not depend on current directory).
- Improve: Updated to latest versions of all 3rd party libraries: `bs58check` 2.1.2, `moment.js` 2.22.2, latest `jquery-qrcode`.
- Improve: Dismissible notices in the admin screens now respect the `DISABLE_NAG_NOTICES` constant.
- Fix: Can now set a minimum confirmation count in coin adapter settings when plugin is network-activated on a multisite install.
- Fix: All DB queries are now prepended by a flush of the DB object. Error reporting can no longer report stale DB errors from previous queries.
- Fix: Some minor HTML validation errors now fixed.
- Fix: Coin icons in dropdowns and menu items now all display in the same size.

= 3.6.2 =
- Fix: Invalid HTML in `[wallets_balance template="list"]` was causing problems with page layout.
- Add: `[wallets_deposit]` shortcode accepts optional argument `qrsize` to set dimension of QR code in pixels. e.g. `[wallets_deposit qrsize="120"]`
- Improve: `[wallets_transactions template="default"]` is now rendered more efficiently thanks to `<!-- ko if -->` statements.

= 3.6.1 =
- Improve: Import/export CSV function now lets an admin to export transactions and reimport them to a new system where the users have different user IDs. Users are represented by emails in the CSV file.
- Improve: Debug info in Dashboard screen is only shown to users with the `manage_wallets` or `activate_plugins` capability (i.e. admins).
- Fix: Typo in `[wallets_transactions]` shortcode where the "wa" string was erroneously included in the markup.

= 3.6.0 =
- Add: The `default` template of the `[wallets_transactions]` shortcode now accepts a list of columns as an optional argument.
- Add: New shortcode `[wallets_rates]` displays exchange rates of online coins.
- Add: New shortcode `[wallets_total_balances]` displays the total sum of user balances per each coin.
- Add: When a transaction fails due to an error, the admin or admins can be notified by email.
- Add: When a transaction requires admin confirmation, the admin or admins can be notified by email.
- Add: When a user is about to receive an internal transaction that is not yet approved, the recipient user can be notified by email.
- Add: Administrator can set all unconfirmed transactions to be auto-confirmed after a specified number of days.
- Add: *Transactions* page in admin screens now has a new column, amount without fees.
- Improve: In *Transactions* page, long tx comments are now displayed with ellipsis to save screen space. Hover with the mouse to see entire text.
- Add: The *Bitcoin and Altcoin Wallets* section in a user's profile screen can be hidden. A new capability, `view_wallets_profile` controls this.
- Add: Adapters list admin screen now has a new column that shows total amount of fees paid to the site wallet.
- Fix: Cryptocompare.com exchange rates provider no longer generates an invalid API call when no coins are enabled.


= 3.5.6 =
- Improve: Adapters list now warns user if more than 99% of hot wallet coins are not available, such as when staking entire balance.
- Improve: In RPC (full node) coin adapters, the calls `get_balance()` and `get_unavailable_balance()` are cached for performance.
- Improve: In RPC (full node) coin adapters, performance of the discovery of past TXIDs via `listtransactions` is vastly improved.
- Improve: In RPC (full node) coin adapters, discovery of past TXIDs no longer uses `listreceivedbyaddress` or `listunspent` as they are redundant.
- Change: DB schema now allows coin symbols with up to 8 characters (was 5).
- Fix: JSON API calls now allow coin symbols that contain digits (0-9).
- Add: Balances list view (`[wallets_balance view="list"]`) now also displays fiat amounts if possible.
- Fix: When a transaction is performed without a comment attached, the comment is now shown as 'n/a' in notifications.
- Add: Suggestion in admin screens footer for rating the plugin on WordPress.org.

= 3.5.5 =
- Add: User can explicitly select default fiat currency to be "none" or "site default".
- Add: Admin can explicitly select default fiat currency to be "none".
- Add: If effective fiat currency is "none", make sure that no fiat amounts are displayed.
- Fix: QR code in the `[wallets_deposit]` shortcode no longer exceeds boundaries if drawing area is small.
- Fix: Notification messages no longer display coin symbols twice next to transacted amounts.
- Add: Plugin "About" section and `readme.txt` now know about the Exchange extension.

= 3.5.4 =
- Add: Exchange rates provider for coingecko.com
- Add: Coin adapters list displays wallet balance unavailable for withdrawal next to available wallet balance.
- Improve: Successful cold storage withdrawals now report TXID. Message includes links for address and TXID to relevant blockexplorer.
- Fix: Bug in checkbox under full node coin adapter settings about skipping rewards generated from mining (introduced in 3.5.3).

= 3.5.3 =
- Add: Full node coin adapters now skip rewards generated from mining. PoS rewards must be skipped, PoW rewards can be included.

= 3.5.2 =
- Fix: Issue with generated rewards for PoS coins, that previously appeared as extra deposits.
- Add: Exchange rates provider for cryptocompare.com
- Change: Default exchange rates providers after first installing the plugin are fixer and cryptocompare.
- Add: Email notifications can be turned off for individual users via their profile admin page.
- Fix: User profile pages only display wallets-related section for users with `has_wallets` capability.
- Change: QR-code URIs for most coins only include address string and no name. This is safer. Coins that require a full URI still have it.

= 3.5.1 =
- Add: Can now hook to frontend events for running JavaScript after coin data is loaded. See documentation for details.
- Improve: Frontend UIs now start with 50% opacity while coin data is not yet loaded from the JSON API.

= 3.5.0 =
- Add: Support for keeping an "Audit Log" of transactions using the plugin "Simple History", if the plugin is installed.
- Add: Deposit address can be copied to clipboard in one click in the `[wallets_deposit]` shortcode UI.
- Add: Debug info in dashboard widget now lists versions of all installed extensions.
- Add: When clicking on "Renew deposit addresses" there is now a confirmation prompt.
- Change: Removed the unused `amount_str` and `fee_str` fields from the `get_coins_info` JSON API call to save bandwidth.
- Fix: Bug when renewing deposit addresses where action GET argument would remain in admin URL. Now argument is removed with redirect.
- Fix: Backend no longer inserts a request for withdrawal with no address specified.
- Fix: No longer uses USDT_BTC for USD_BTC exchange rate for Bittrex.
- Improve: "Cron job might be disabled" warning only shows after 4 hours of no cron. This avoids most false positives in dev environments.
- Fix: Added `rel="noopener noreferrer"` to all external redirect links with `target="_blank"`.
- Change: Added Google analytics tracking codes to all links to dashed-slug.net for BI.
- Improve: Added `required="required"` to admin input fields that are required to have a value.
- Improve: Added `required="required"` to frontend input fields that are required to have a value.
- Improve: Notifications code refactored and improved.
- Improve: Applied many code styling suggestions using CodeSniffer and the WordPress ruleset.
- Improve: Information in readme.txt is more up-to-date.

= 3.4.2 =
Fix: Race condition hazard that could compromise the security of this plugin now fixed. This is an IMPORTANT SECURITY UPDATE.

= 3.4.1 =
- Fix: Admin can now select to not use any exchange rates if not needed.
- Fix: More correct algorithm for calculating exchange rate between any two currencies. Does graph traversal and finds a path between known exchange rates.
- Change: If a fiat currency has the same symbol as a known cryptocurrency, its exchange rate data is discarded to avoid confusing the rate calculations.
- Fix: User preference for a fiat currency now takes precedence again over site-wide default.

= 3.4.0 =
- Change: To use the fixer.io service users must now provide an API key. This is now possible.
- Change: The fixer.io service is accessed at most once per hour.
- Improve: Can now enable multiple exchange rates providers simultaneously.
- Change: Simplified hooks for adding exchange rates manually. See https://gist.github.com/alex-georgiou/492196184f206002c864225180ca8fbb
- Improve: When an exchange rates provider is disabled, its data remains on the DB, while any data that comes from enabled providers is kept updated.
- Improve: Exchange rates admin page now displays data counts to aid debugging.

= 3.3.6 =
- Fix: Prevent SQL error on failed transactions "BIGINT UNSIGNED value is out of range".

= 3.3.5 =
- Fix: Prevent browser caches from retrieving old assets (js,css). Plugin version is now part of filenames as well as in the `ver` GET parameter. Solves problems with some CDNs and plugins that discard the version parameter.
- Add: Better schema index checks. Will report an error to the admin if any DB constraint is not in place.
- Improve: Withdrawals are now first marked as done and then actually performed. If wallet returns error then withdrawal is marked as failed. Prevents double spend in the very unlikely event of a network disconnect while the transaction is being sent to the wallet.
- Fix: Division by zero error fixed in the Cold Storage deposit screens.
- Fix: For coins that have extra info (e.g. Monero Payment ID, Ripple Destination Tag), display both in Cold Storage deposit screen.

= 3.3.4 =
- Fix: Bug that prevented updating confirmation counts of deposits coming from transactions with multiple outputs, introduced in 3.3.2.

= 3.3.3 =
- Improve: Front-end performance increase due to deferred updates in knockout framework.
- Fix: Erroneous "Insufficient Balance" validator message in frontend when balance is actually sufficient.
- Fix: A CSS issue with the frontend validator messages that would cause visual elements to jump up and down on the page.
- Improve: Updated packages moment.js library to the latest version.
- Improve: If a transaction cannot be inserted to the DB, also print out the last DB error message in the logs to assist debugging.

= 3.3.2 =
- Fix: Allow incoming transactions with multiple outputs, where the outputs are deposit addresses for more than one users of the plugin.

= 3.3.1 =
- Change: Transaction time in *Wallets* &rarr; *Transactions* list is now shown in local timezone, not UTC.
- Add: Transaction time in email notifications can now be shown in local timezone with value ###CREATED_TIME_LOCAL###.
- Add: Transaction time in email confirmations can now be shown in local timezone ###CREATED_TIME_LOCAL###.
- Add: Widgets can now be used with alternative UI templates.
- Add: The sender's name and address for email notifications and confirmations can now be set in the admin settings. If set, it overrides the default.
- Change: Proportional fees in all RPC adapters (including the multiadapter extension) now have five decimal places instead of three.

= 3.3.0 =
- Add: Suggests a text fragment for inclusion into the site's privacy policy (GDPR requirement).
- Add: Hooks into the personal data exporter tool and exports a user's deposit addresses and transaction IDs (GDPR requirement).
- Add: Hooks into the personal data eraser tool and deletes a user's deposit addresses and transaction IDs (GDPR requirement).
- Add: Admin transactions list can now be sorted by: status, admin confirmation, user confirmation. Thanks to James (Tiranad @ BTCDraft) for providing patch.
- Fix: When the `[wallets_move]` form fields are reset to empty, after a successful transaction request, the user field is also reset to empty.
- Improve: Hides some columns from upcoming "trade" transactions that will become relevant when the trading extension is released.

= 3.2.0 =
- Add: Shortcodes now take extra attribute, allow for choosing alternative UI templates.
- Add: Alternative transactions view with `[wallets_transactions template="rows"]`.
- Add: Alternative balances view as list with `[wallets_balance template="list"]`.
- Add: Alternative deposit addresses view as list with `[wallets_deposit template="list"]`.
- Add: Can now set minimum withdrawal amount as a coin adapter setting. Enforced in frontend validation and backend processing.
- Improve: Frontend withdraw and move UIs now validate amounts against max user balance.
- Change: `get_coins_info` JSON API now returns the list of coins sorted by name.
- Fix: Bug in cold storage admin screens for multisite intstallations.
- Fix: More cross-compatible DDL phrasing for enum value in SQL schema.

= 3.1.3 =
- Add: New shortcode `[wallets_account_value]` displays the total account value in the selected fiat currency.
- Improve: Display TXIDs and addresses as links only if they are alphanumeric, in frontent and backend transaction lists.
- Fix: Some strings now made translatable.

= 3.1.2 =
- Fix: Incompatibility with frontend JavaScript code and Internet Explorer 11.
- Improve: Old transaction aggregation is less verbose in the logs. Does not write anything if there are no transactions to aggregate.
- Improve: Frontend form submit buttons are not clickable while there are other pending queries. This prevents accidental multiple submits of the same tx.

= 3.1.1 =
- Fix: Non-default DB table prefix in old transaction aggregation cron job, introduced in 3.1.0.

= 3.1.0 =
- Add: Old transaction aggregation cron job to save DB space.
- Add: Easily refresh deposit addresses via the adapters list screen.
- Fix: Better guard clause in Bitcoin withdrawal address validator JavaScript.

= 3.0.3 =
- Fix: Better logic that controls flushing of JSON API rewrite rules. This had caused incompatibility with "multilanguage" plugin by BestWebSoft.
- Improve: The `[wallets_transactions]` UI no longer displays an empty table if there are no transactions to display. A dash is shown instead.
- Add: The debug info widget in the admin dashboard now reports the web server name and version.
- Change: Internal support for "trade" transactions. These will be needed for the upcoming exchange extension.

= 3.0.2 =
- Add: Exchange rates can now be pulled from the CoinMarketCap API.
- Add: Coin icons are now displayed in the front-end UIs.
- Fix: Safer exchange rates code in case of connectivity issues.
- Fix: No longer display "cancel" button next to deposits, since these cannot be cancelled.
- Fix: No longer reset the default coin in the frontend whenever the coin info is reloaded.
- Change: The readme now points to the new SEO-frinedly name for the YouTube channel.

= 3.0.1 =
- Fix: Do not throw an alert box error in frontend when an AJAX request is cancelled by the browser, if the user clicks on a new link while the request is in transit.

= 3.0.0 =
- Add: New improved PHP API for working with wallets, based on WordPress actions and filters. See documentation for details.
- Change: The previous PHP API is still functional but is now marked as deprecated.
- Add: The JSON APIs are now versioned, to allow for stable improvements.
- Add: New version 2 of the JSON API does not include the `get_users_info` call which divulged user login names. Accepts usernames or emails as destination user in `do_move` action.
- Change: Previous version 1 of the JSON API is available only if "legacy APIs" option is enabled in the frontend settings.
- Improve: Frontend no longer performs synchronous AJAX requests on the main thread. This fixes the issue where the UI would temporarily "freeze".
- Improve: The `[wallets_move]` shortcode now accepts the recipient user as a username or email. This was previously a dropdown and was causing scaling problems.
- Improve: The coins data structure in the wallets frontend is now indexed, resulting in better JavaScript performance throughout the frontend code.
- Fix: Nonces provided with the `get_nonces` JSON API call are no longer cached. Caching would sometimes cause stale nonces to be used, resulting in request forgery errors.
- Improve: The knockout JavaScript code now uses the `rateLimit` extender in favor of the deprecated `throttle` extender.

= 2.13.7 =
- Improve: More kinds of transactions can be cancelled via the admin interface.
- Improve: More kinds of transactions can be retried via the admin interface.
- Fix: Avoid race condition that sometimes prevented the fix to the Select2 issue originally addressed in 2.13.5 .
- Fix: Make sure that JavaScript withdrawal address validators are always functions before calling them.
- Fix: The option to switch off frontend reloading of coin info when page regains visibility can now be changed in multisite installs.

= 2.13.6 =
- Add: Added stocks.exchange exchange rates provider.
- Add: Option to switch off frontend reloading of coin info when page regains visibility.
- Add: Spanish language translation for frontend contributed by Javier Enrique Vargas Parra <jevargas@uniandes.edu.co>.
- Change: NovaExchange rates provider re-enabled after announcement that the exchange will not be decommissioned.
- Improve: Multiple calls to the same exchange rates API endpoint are no longer repeated.
- Improve: Suggested curl notify commands for full node wallets now include the -k switch to bypass problems with invalid SSL certificates.

= 2.13.5 =
- Fix: User no more allowed to enter invalid polling intervals such as an empty string, resulting in frontend slowdown.
- Fix: The filter `wallets__sprintf_pattern_XYZ` modifies the amounts display pattern in the `[wallets_transactions]` shortcode.
- Fix: The filter `wallets__sprintf_pattern_XYZ` modifies the amounts display pattern in the special balances menu item.
- Fix: Dropdowns in front-end are now not affected by the Select2 JavaScript library (compatibility with AdForest theme and possibly more).
- Add: Transaction category and status values are now translatable and filterable in the `[wallets_transactions]` shortcode.
- Improve: Updated Greek language translation to reflect changes above.

= 2.13.4 =
- Add: Frontend sprintf pattern for cryptocurrency amounts can now be overridden via a WordPress filter (see manual).
- Fix: Improved detection of wallet lock status for wallets that have support only for `getinfo` command and not `getwalletinfo`.

= 2.13.3 =
- Improve: No longer requires the mbstring PHP module to be installed.
- Add: Live polling on the frontend can now be turned off by setting the time intervals to 0.
- Add: The debug panel in the admin dashboard now reports if PHP modules relevant to the plugin are loaded or not.
- Add: The debug panel in the admin dashboard now reports which plugin extensions are activated or network-activated.

= 2.13.2 =
- Add: Admin option to manually disable JSON API response compression with zlib.
- Improve: Zlib compression status is not altered if HTTP response headers are already sent.

= 2.13.1 =
- Add: After confirming a transaction via an email link, the user can be redirected to a page that the admin indicates. See Wallets &rarr; Confirms &rarr; Redirect after confirmation.
- Improve: Semantic HTTP status codes returned after clicking on confirmation links.
- Improve: Frontend does not popup an error if some wallet capabilities are disabled.
- Improve: JSON API uses compressed encoding if the UA accepts it and the PHP zlib extension is installed.
- Improve: Some internal code improvements in the adapter list.

= 2.13.0 =
- Add: Coin adapters can be in a locked or unlocked state. Locked adapters cannot process withdrawals. Adapters can be unlocked by entering a secret PIN or passphrase.
- Add: All frontend text is now modifiable via WordPress filters. See the documentation for filter names and example code.
- Improve: Successful and failed transactions trigger WordPress actions. See the documentation for action names and example code.
- Fix: An incompatibility with PHP 5.4 is resolved. Note that it is not recommended to install the plugin on PHP versions that have reached end-of-life.
- Add: WordPress actions allow themes to add markup before and after any frontend UI form. See the documentation for action names.
- Fix: Internal transaction IDs no longer link to any block explorers.
- Add: After submitting a transaction, the user is notified to check their e-mail, if an e-mail confirmation is required.
- Add: Dismissible notice informing users to upgrade the cloud wallet adapters for compatibility with this version.

= 2.12.2 =
- Fix: Disallow internal transactions and withdrawals if amount - fees is negative.
- Fix: 'Invalid amount' error when withdrawing invalid amount to RPC adapters - contributed by https://github.com/itpao25
- Fix: Better CSS selector specificity in `[wallets_transactions]` rows. Solves issues with some themes.

= 2.12.1 =
- Improve: The `[wallets_balance]` shortcode shows fiat amounts below the actual crypto amount, not on mouse hover.
- Improve: The `[wallets_move]` and `[wallets_withdraw]` shortcodes do not show ugly NaN (Not a Number) values on insufficient data.
- Fix: The `[wallets_deposit]` shortcode would not show the QR-Code on first page load, before the current coin was changed. Now fixed.
- Fix: The exchange rates API is now extendable. For sample code see http://adbilty.me/HBVX5tx

= 2.12.0 =
- Add: Frontend now displays up-to-date information via polling. Polling intervals are controlled by the admin.
- Change: The QR-code on/off switch is now found in the new *Frontend Settings* admin screen.
- Add: Admin can now choose a default fiat currency for users who have not made a selection in their WordPress profile screens.
- Fix: Error when withdrawing from unlocked RPC wallets (i.e. without a passphrase)
- Add: Arabic language translation for frontend contributed by Ed <support@2gogifts.com>
- Improve: Nonces API is now filterable by extensions. Filter name is: `wallets_api_nonces`.

= 2.11.2 =
- Fix: Prices for Bitcoin cash reported by some exchanges as "BCC" are now changed to "BCH" to avoid confusion with BitConnect.
- Fix: Bug when saving buddypress notifications in multisite.
- Change: JSON API now does not throw when encountering an unknown action. Allows for extensions to define their own actions.

= 2.11.1 =
- Fix: Deposit fees were not being inserted to the DB (would affect the CoinPayments adapter).
- Improve: In network-activated multisite, exchange rates are now shared accross sites. Improves performance.
- Fix: When user has not selected a base currency in their profile, the default is now USD. Previously was undefined, which caused fiat amounts to not be displayed.
- Fix: When user profile displays deposit addresses, it can now also handle currencies with an extra payment id field in their deposit address. (affects Monero, Ripple, Steem, etc).
- Fix: The default withdraw fees for Bitcoin core are now set to 0.001 when first installing the plugin.

= 2.11.0 =
- Add: Addresses and TXIDs are now links to blockexplorer sites.
- Add: Cryptocurrency amounts are also shown in a user-selected fiat currency, default: USD.
- Improve: Comment fields are now multi-line, allow for more info.
- Add: All RPC adapters can now connect to wallets that are encrypted with a passphrase.
- Add: All RPC adapters can now connect to wallets via SSL RPC.
- Fix: Exchange rates caching mechanism would some times report stale data, is now fixed.

= 2.10.6 =
- Fix: Widget titles are now translatable.
- Fix: Exceptions thrown by coin adapters no longer break user profile rendering.
- Add: German translations for frontend contributed by eMark Team <kontakt@deutsche-emark.de>.

= 2.10.5 =
- Fix: Plugin now works even if theme causes the frontend `wp` JavaScript object to not exist.
- Fix: String localization is now working.
- Add: String localization now split into frontend and backend. See documentation for details.
- Add: Greek language translations for frontend.

= 2.10.4 =
- Fix: Setting capabilities in network-activated multisite installs now modifies capabilities accross the network.
- Add: Plugin warns user if needed PHP extensions are not installed.
- Add: Admins can now view their own deposit addresses and balances in their user profile screen.
- Improve: Bumped included `bs58check` library from 2.0.2 to 2.1.0.

= 2.10.3 =
- Add: Admins with `manage_wallets` can now view deposit addresses and balances of users in the user profile screen.
- Improve: Better cache control in the JSON API.
- Fix: Bug with the `get_transactions` API where data was not returned when using the friendly URI form instead of GET parameters.
- Fix: Warnings, errors and other notices that are relevant to wallet managers are now only shown to users with `manage_wallets`.
- Fix: Invalid `get_transactions` JSON API request with NaN argument while the frontend UI initializes.
- Add: Instructions for downloading the documentation added in the about section.

= 2.10.2 =
- Add: Exchange rates are now available over tor. Only enable this if running WordPress on an Onion hidden service.
- Add: Exchange rates can be turned off if not needed to improve performance.
- Add: User is warned if the DB table indices are corrupted.
- Improve: Adding/updating transaction rows does not depend on the DB constraints.
- Improve: Exchange rates are decompressed using PHP curl, not via the compress.zlib filter.
- Fix: Misleading textual description of the IP setting in RPC adapters.
- Fix: Small bug with error reporting in JSON adapters.

= 2.10.1 =
- Fix: More DB columns changed to ASCII. Saves space, plus fixes "Specified key was too long" on some databases and server locales.
- Improve: Frontend observables `withdraw_fee` and `move_fee` changed to camelCase to match other observables.
- Add: Debug log markers at uninstall script boundaries. Should aid in troubleshooting.

= 2.10.0 =
- Improve: Better knockout bindings in frontend. Bindings applied to UI elements only, not entire page. Allows for playing nice with other knockout code.
- Add: The wallets viewmodel is now available for inheritance under the global wp object. Allows for extensions that modify the UI.
- Add: Tradesatoshi added to list of available exchange rate providers.
- Fix: Issue where database tables were not created on new installs.
- Fix: Race condition between uninstall script and cron job that caused unaccepted transactions to transition into pending state.
- Improve: Bumped the included knockout distribution to latest version, 3.5.0-pre.

= 2.9.0 =
- Add: Notifications can now be sent either as emails or as BuddyPress private messages (or both).
- Fix: When upgrading database sche,a, suppress logging of some errors  that are to be expected.

= 2.8.2 =
- Fix: Bug introduced in 2.8.1 where deposits could be duplicated in some situations.

= 2.8.1 =
- Add: Changes throughout the plugin for currencies that use additional information in transactions besides a destination address (e.g. Monero, Ripple, etc).
- Fix: Some issues with language domains in translated strings.
- Fix: QR code only shown for currencies where deposit makes sense.
- Add: NovaExchange will be shown as unavailable as an exchange rate provider after 2018-02-28.

= 2.8.0 =
- Add: Admins can cancel internal transactions.
- Add: Admins can retry cancelled internal transactions.
- Improve: Exchange rates are now not slowing down the system. Better caching mechanism. Runs on PHP shutdown.
- Add: YoBit and Cryptopia exchanges added as exchange rate sources.
- Add: Exchange rate sources are now pluggable (see PDF documentation).
- Add: Dashboard debug info now includes commit hash and plugin version.
- Fix: Bug with failsafe mechanism for systems where WP Cron is not running, introduced in 2.7.4
- Improve: When not connected, the internal Bitcoin core plugin now suggests a salted password for the bitcoin.conf file, using the rpcauth= argument.

= 2.7.4 =
- Add: Failsafe mechanism for systems where WP Cron is not running.
- Add: Panel with useful system debug info in Dashboard area. Users can copy and paste it when requesting support.
- Add: Show warning about old WordPress or PHP versions.

= 2.7.3 =
- Fix: Incompatibility with PHP 5.3 introduced in 2.7.2.
- Improve: More efficient pulling of bittrex exchange rates.

= 2.7.2 =
- Add: Exchange rates API now uses a choice of Bittrex, Poloniex or Novaexchange APIs.
- Add: Blockchain.info donation button in about section.
- Add: SteamIt social link in about section.

= 2.7.1 =
- Fix: Bug where wrong coin address was displayed in cold storage section.
- Add: Cold storage section now links to wiki page.
- Add: All extensions now listed in About section.

= 2.7.0 =
- Add: Cold storage section, allowing easy addition and withdrawal of funds to and from external wallets.
- Improve: Uninstalling and re-installing the plugin now fixes the SQL table schemas if they are missing or damaged.

= 2.6.3 =
- Add: When coin adapters report a new status for an existing transaction, the plugin can now update the status of the transaction.

= 2.6.2 =
- Fix: SQL formatting issue.
- Add: Text descriptions for adapter HTTP settings.
- Add: JSON coin adapter base class now does more verbose error reporting on API communication errors.
- Improve: Actions in transactions list admin screen are now buttons.

= 2.6.1 =
- Fix: Query formatting issue.

= 2.6.0 =
- Fix: Added back Knockout.js that was missing due to changes in 2.5.4 (oops!)
- Add: Functions for pulling exchange rates are now in wallets core, available for all extensions.

= 2.5.4 =
- Fix: `do_move()` checks the balance of sender, not current user.
- Fix: Menu item now shows balance(s) of current user, not total wallet balance(s).
- Improve: Knockout.js assets are now local, not served from CDN.
- Add: FAQ section about supported coins.

= 2.5.3 =
- Fix: Issues with frontend JavaScript code that would prevent popups from being displayed.
- Fix: Issue where in some situations cached assets (JS, CSS) from older plugin versions were being used.
- Improve: Better markup for balances menu item.
- Add: Many common questions added to the FAQ section.

= 2.5.2 =
- Fix: Compatibility issue with PHP < 5.5
- Fix: More correct markup in balances nav menu item.

= 2.5.1 =
- Fix: Minor JavaScript issue that prevented the frontend from working correctly with some coin adapters.

= 2.5.0 =
- Add: Balance information can now be inserted into WordPress menus. See *Appearance* &rarr; *Menus*.
- Add: Pluggable validation mechanism for withdrawal addresses. Bitcoin addresses validated against `bs58check`.
- Add: Fees to be paid are now updated dynamically as soon as a user types in an amount.
- Improve: Massive refactoring in the knockout.js code.
- Fix: get_balance memoization now works correctly for multiple invocations of different users.

= 2.4.6 =
- Fix: Bug in balance checks.

= 2.4.5 =
- Improve: Paid fees are now deducted from the amount that users enter in the withdrawal and internal transfer UIs.
- Add: Fees now have a fixed component and a component that is proportional to the transacted amount.
- Add: Coin adapter settings now display descriptions.

= 2.4.4 =
- Improve: Adapters now live in their own special panel.
- Add: About page with social actions and latest news.
- Add: Doublecheck to see if WordPress cron is executing and inform user if not.

= 2.4.3 =
- Improve: Adapter list now shows both funds in wallets and funds in user accounts
- Improve: In adapters list, coin name, coin icon and coin symbol are now merged into one "Coin" column
- Add: Usernames in transaction list are links to user profiles
- Add: Link to support forum from plugin list
- Add: Added mention of Electrum coin adapter in FAQ section

= 2.4.2 =
- Improve: `get_new_address()` deprecated in favor of `get_deposit_address()`.
- Add: `do_move()` can now do a funds transfer from users other than the current one.
- Fix: Bug where a DB transaction started after a funds transfer is now fixed.

= 2.4.1 =
- Fix: When performing actions in transactions admin panel, redirect to that same panel without the action arguments (allows page refresh).
- Add: PHPdoc for new helper functions introduced in 2.4.0
- Add: Text warning about security best practices regarding RPC API communications over untrusted networks.


= 2.4.0 =
- Add: On multisite installs, the plugin can be *network-activated*.
- Add: Feature extensions (WooCommerce, EventsManager, Tip the Author, etc) can now place withdrawals or transfers that do not require confirmations.
- Fix: Broken "Settings" link in plugins list replaced with a working "Wallets" link.

= 2.3.6 =
- Add: When a user requests to withdraw to a known deposit address of another user, an internal move transaction is performed instead.
- Improve: Frontend transactions in `[wallets_transactions]` are sorted by descending created time.
- Improve: Admin transactions list defaults to sorted by descending created time.
- Add: If a coin adapter does not override the sprintf format for amounts, the format now includes the coin's symbol letters.
- Fix: Uncaught exception when user-unapproving a transaction in admin when it corresponds to a currently disabled adapter.
- Fix: Uncaught exception when performing `wallets_transaction` action on a currently disabled adapter.
- Fix: Suppress a logs warning in `Dashed_Slug_Wallets_Coin_Adapter::server_ip()`.

= 2.3.5 =
- Fix: Withdrawals to addresses that are also deposit addresses on the same system are no longer allowed.
- Fix: Email notifications for successful withdrawals now correctly report the transaction ID.
- Fix: Email notifications for failed withdrawals do not report a transaction ID since it does not exist.

= 2.3.4 =
- Improve: Confirmation links can be clicked even if user not logged in.
- Add: When a transaction is user unaccepted via admin, a new confirmation email is sent.
- Fix: Unused code cleanup

= 2.3.3 =
- Fix: Deposit notifications restored after being disabled in 2.3.2
- Fix: Only send confirmation emails if DB insert succeeds

= 2.3.2 =
- Fix: Issue introduced in 2.3.0 where pending (not executed) withdrawals to the same address would fail.
- Fix: Unhandled exception when sending a notification email while the corresponding adapter is disabled.
- Change: CSV import feature only imports transactions with "done" status to maintain DB consistency.

= 2.3.1 =
- Fix: Issue where on some systems MySQL tables were not being updated correctly, resulting in user balances appearing as 0.

= 2.3.0 =
- Add: Administrator panel to show all transactions in the system.
- Change: The `.csv` import functionality is now moved to the transactions admin panel.
- Change: Transaction requests are now decoupled from transaction executions. They are executed by cron jobs in batches of configurable size and frequency.
- Add: Transactions can require confirmation by an administrator with `manage_wallets`.
- Add: Transactions can require the user to click on a link sent by email.
- Add: Failed transactions are retried a configurable number of times.
- Add: Transaction retries can be reset by an administrator with `manage_wallets`.
- Add: Users can now be notified by email if their transaction fails.
- Add: Frontend transactions lists (wallets_transactions UI) now show the TXID.
- Add: Frontend transaction lists (wallets_transactions UI) are now color coded based on transaction state.
- Fix: The minimum number of confirmations reported by get_minconf() was always `1` instead of the user-supplied value.
- Change: Performance improvement in the code that calculates balances for users (function `get_balance()`).
- Change: Internal transfers that cause two row inserts are now surrounded by a DB lock and atomic transaction to ensure consistency even in case of an unexpected error.

= 2.2.5 =
- Fix: Administrator capabilities were erroneously being erased in 2.2.4 when editing other role capabilities

= 2.2.4 =
- Add: User is warned if DISABLE_WP_CRON is set.
- Fix: Administrator is now unable to remove capabilities from self for safety.
- Fix: Fees fields were being cleared when the clear button was pressed or after a successful transaction.
- Fix: Suppress duplicate warnings in logs when inserting existing user address
- Fix: Moment.js third-party lib was being reminified.

= 2.2.3 =
- Add: Multisite (aka network) installs now supported
- Improve: If user does not have wallets capability the frontend is not burdened with wallets scripts or styles
- Fix: Transactions table has horizontal scrolls (especially useful in the transactions widget)
- Fix: Added empty `index.php` files in all directories for added security.

= 2.2.2 =
- Fix: Do not popup error to users who are not logged in

= 2.2.1 =
- Add: Deposit addresses now also shown as QR-Codes
- Add: After import show both successful and unsuccessful transaction counts
- Fix: Users now are not allowed to transfer funds to self
- Fix: E-mail notifications withdrawals would show timestamps, now show human-readable date/time

= 2.2.0 =
- Change: Improved coin adapters API. All current adapters need update to the 2.2.0 API.
- Add: Accompanying PDF documentation now provides instructions for creating a coin adapter (for developers).
- Fix: Improved front-end error reporting in some cases.
- Fix: Plugin would not activate on MySQL DBs with collation utf8mb4*
- Improve: If the PHP cURL module is not installed, any RPC adapters are automatically disabled and the user is warned.

= 2.1.2 =
- Fix: Errors were not being reported on frontend. (JSON API now always returns status 200 OK even if carrying an error message.)

= 2.1.1 =
- Add: The capabilities matrix is now hookable by extensions
- Add: Internal transfers can now have unlimited descriptive tags assigned
- Fix: The `get_users_info` JSON API now retrieves only users who have capability `has_wallets`

= 2.1.0 =
- Add: Capabilities feature lets you assign capabilities to user roles
- Add: E-mail notifications are now admin-configurable
- Add: Frontend Widgets
- Change: Settings tab is now cron tab
- Change: Better code organisation

= 2.0.2 =
- Add: Link to homepage and settings page from plugin list
- Fix: When altering cron duration from admin screens cron job is correctly rescheduled
- Fix: Cron job is now unscheduled on plugin deactivation
- Fix: Uninstall script now correctly unschedules cron job
- Fix: Safer user ID detection (does not depend on `wp_load` action)
- Fix: Using `sprintf` format from adapter in error messages
- Fix: Typo in error message when insufficient balance for withdraw/move
- Improve: Better code organisation for admin screens
- Improve: Safer inserting of new addresses in `wallets_address` action

= 2.0.1 =
- Fix: Dates in the [wallets_transactions] UI were not showing correctly in Internet Explorer
- Improve: Refactored the withdrawal API for compatibility with changes to block.io adapter 1.0.2

= 2.0.0 =
- Add: Generalised `wp_cron` mechanism lets coin adapters perform any periodic checks via an optional `cron()` method.
- Improve: Various improvements to the coin adapter API. `list_transactions` was removed in favor of the generic `cron()` method.
- Add: The `bitcoind` and other RPC API coin adapters do not depend on the notification API to discover deposits.
- Add: Better admin UI explaining how fees operate.
- Add: Adapters can now optionally notify the plugin of user-address mappings with the `wallets_address` action
- Add: The plugin now warns the admin about using SSL.
- Fix: The `bitcoind` built-in adapter now works smoother with the `bittiraha` lightweight wallet.
- Fix: Improved user `get_balance()` in terms of performance and robustness.
- Fix: Bitcoin RPC API adapter only binds to notification API set to enabled.
- Fix: Catching an exception when notified about transaction to unknown address.
- Fix: When transaction tables are locked to perform atomic transactions, the `wp_options` table is available to coin adapters.

= 1.2.0 =
- Add: Multiple coin adapters per extension and per coin (see release notes)
- Add: Fail-safe mechanism that periodically checks for deposits that have not been recorded.
- Add: New setting panel in admin for settings that are not specific to any coin adapters.
- Fix: Exceptions thrown during failed deposit notifications are now caught.

= 1.1.0 =
- Add: Compatibility with the `prasos/bittiraha-walletd` lightweight wallet (see FAQ).
- Fix: Users who are not logged in are not nagged with an alert box. Shortcode UIs now display "Must be logged in" message instead.
- Simplified the adapters list. There will be an entire admin panel about the removed information in a future version.
- Add: Adapters list now gives meaningful errors for unresponsive coin adapters.

= 1.0.6 =
- Made compatible with PHP versions earlier than 5.5
- Added warning in readme about running on PHP versions that have reached end-of-life

= 1.0.5 =
- Deactivate button not shown for built in Bitcoin adapter
- Added video tutorial to readme

= 1.0.4 =
- Recommends the configurations needed in your `bitcoin.conf`
- Does not recommend command line arguments to `bitcoind` any more
- Updated install instructions in `readme.txt`

= 1.0.3 =
- Fixed issue where deactivating any plugin would fail due to nonce error

= 1.0.2 =
- Clearer disclaimer
- Fixed a broken link

= 1.0.1 =
- Fixed some string escaping issues

= 1.0.0 =
- Accounting
- bitcoind connectivity
- PHP API
- JSON API
- Front-end shortcodes
- CSV Import/Export

== Upgrade Notice ==

Version 3.6.7 includes an important bugfix introduced in 3.6.5 that affected balance calculations.

== Donating ==

This is a free plugin.

The dashed-slug is a [heroic (or maybe foolish?) one-man effort](https://www.dashed-slug.net/dashed-slug/team/) against the odds :-)

Showing your support helps the dashed-slug purchase the necessary coffee and energy drinks needed for designing, developing, testing, managing and supporting these and more quality WordPress plugins.

These are all the ways you can show your support, if you so choose:

1. **Become a registered [dashed-slug.net](https://www.dashed-slug.net) member**, and enjoy unlimited access to all the premium plugin extensions available, and priority support with any issues.
2. **Translate the plugin** and donate your translation. Your contribution will be mentioned in the changelog. See the manual entry on *Localization* for instructions.
2. **Report bugs and suggest features.**
3. **Spread the word** to your friends.
4. **If you wish, you may donate** any amount [via flattr](https://flattr.com/profile/dashed-slug) or via the following dashed-slug addresses:
	- Bitcoin: `1DaShEDyeAwEc4snWq14hz5EBQXeHrVBxy`
	- Litecoin: `LdaShEdER2UuhMPvv33ttDPu89mVgu4Arf`
	- Dogecoin: `DASHEDj9RrTzQoJvP3WC48cFzUerKcYxHc`
