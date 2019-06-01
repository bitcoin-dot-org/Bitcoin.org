{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/backupwallet.md" %}

##### BackupWallet
{% include helpers/subhead-links.md %}

{% assign summary_backupWallet="safely copies current wallet file to destination, which can be a directory or a path with filename." %}

{% autocrossref %}

*Requires wallet support.*

The `backupwallet` RPC {{summary_backupWallet}}

*Parameter #1---destination*

{% itemplate ntpd1 %}
- n: "destination"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The destination directory or file"

{% enditemplate %}

*Result---`null` on success*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "JSON `null` when the command was successfull or a JSON with an error field on error."

{% enditemplate %}

*Example*

{% highlight bash %}
bitcoin-cli backupwallet "backup.dat"
{% endhighlight %}

*See also*

* [DumpWallet][rpc dumpwallet]: {{summary_dumpWallet}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}

{% endautocrossref %}
