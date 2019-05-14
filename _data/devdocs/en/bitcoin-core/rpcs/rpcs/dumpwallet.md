{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/dumpwallet.md" %}

##### DumpWallet
{% include helpers/subhead-links.md %}

{% assign summary_dumpWallet="dumps all wallet keys in a human-readable format to a server-side file." %}

{% autocrossref %}

The `dumpwallet` RPC {{summary_dumpWallet}}

This does not allow overwriting existing files.

Imported scripts are included in the dumpfile, but corresponding BIP173 addresses, etc. may not be added automatically by importwallet.

Note that if your wallet contains keys which are not derived from your HD seed (e.g. imported keys), these are not covered by
only backing up the seed itself, and must be backed up too (e.g. ensure you back up the whole dumpfile).

*Parameter #1---filename*

{% itemplate ntpd1 %}
- n: "filename"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The filename with path (either absolute or relative to bitcoind)"

{% enditemplate %}

*Result*

{% endautocrossref %}

    {                           (json object)
      "filename" : {        (string) The filename with full absolute path
    }

{% autocrossref %}

*Example*

{% highlight bash %}
bitcoin-cli dumpwallet "test"
{% endhighlight %}

*See also*

* [BackupWallet][rpc backupwallet]: {{summary_backupWallet}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}

{% endautocrossref %}
