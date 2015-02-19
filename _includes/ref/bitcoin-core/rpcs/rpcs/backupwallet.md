{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/backupwallet.md" %}

##### BackupWallet
{% include helpers/subhead-links.md %}

{% assign summary_backupWallet="safely copies `wallet.dat`<!--noref--> to the specified file, which can be a directory or a path with filename." %}

{% autocrossref %}

*Requires wallet support.*

The `backupwallet` RPC {{summary_backupWallet}}

*Parameter #1---destination directory or filename*

{{json_table}}

* Destination
* string
* Required (exactly 1)
* A filename or directory name.  If a filename, it will be created or overwritten.  If a directory name, the file `wallet.dat`<!--noref--> will be created or overwritten within that directory

*Result---`null` or error*

{{json_table}}

* `result`
* null
* Required (exactly 1)
* Always `null` whether success or failure.  The JSON-RPC error and message fields will be set if a failure occurred

*Example from Bitcoin Core 0.10.0*

{% highlight bash %}
bitcoin-cli -testnet backupwallet /tmp/backup.dat
{% endhighlight %}

*See also*

* [DumpWallet][rpc dumpwallet]: {{summary_dumpWallet}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}

{% endautocrossref %}
