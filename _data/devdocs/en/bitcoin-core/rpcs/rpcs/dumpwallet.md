{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/dumpwallet.md" %}

##### DumpWallet
{% include helpers/subhead-links.md %}

{% assign summary_dumpWallet="creates or overwrites a file with all wallet keys in a human-readable format." %}

{% autocrossref %}

*Requires wallet support.  Requires an unlocked wallet or an unencrypted
wallet.*

The `dumpwallet` RPC {{summary_dumpWallet}}

*Parameter #1---a filename*

{% itemplate ntpd1 %}
- n: "Filename"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The file in which the wallet dump will be placed.  May be prefaced by an absolute file path.  An existing file with that name will be overwritten"

{% enditemplate %}

*Result---`null` or error*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "null"
  p: "Required<br>(exactly 1)"
  d: "Always `null` whether success or failure.  The JSON-RPC error and message fields will be set if a failure occurred"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Create a wallet dump and then print its first 10 lines.

{% highlight bash %}
bitcoin-cli -testnet dumpwallet /tmp/dump.txt
head /tmp/dump.txt
{% endhighlight %}

Results (only showing the first 10 lines):

{% highlight bash %}
# Wallet dump created by Bitcoin v0.9.1.0-g026a939-beta (Tue, 8 Apr 2014 12:04:06 +0200)
# * Created on 2014-04-29T20:46:09Z
# * Best block at time of backup was 227221 (0000000026ede4c10594af8087748507fb06dcd30b8f4f48b9cc463cabc9d767),
#   mined on 2014-04-29T21:15:07Z

cTtefiUaLfXuyBXJBBywSdg8soTEkBNh9yTi1KgoHxUYxt1xZ2aA 2014-02-05T15:44:03Z label=test1 # addr=mnUbTmdAFD5EAg3348Ejmonub7JcWtrMck
cQNY9v93Gyt8KmwygFR59bDhVs3aRDkuT8pKaCBpop82TZ8ND1tH 2014-02-05T16:58:41Z reserve=1 # addr=mp4MmhTp3au21HPRz5waf6YohGumuNnsqT
cNTEPzZH9mjquFFADXe5S3BweNiHLUKD6PvEKEsHApqjX4ZddeU6 2014-02-05T16:58:41Z reserve=1 # addr=n3pdvsxveMBkktjsGJixfSbxacRUwJ9jQW
cTVNtBK7mBi2yc9syEnwbiUpnpGJKohDWzXMeF4tGKAQ7wvomr95 2014-02-05T16:58:41Z change=1 # addr=moQR7i8XM4rSGoNwEsw3h4YEuduuP6mxw7
cNCD679B4xi17jb4XeLpbRbZCbYUugptD7dCtUTfSU4KPuK2DyKT 2014-02-05T16:58:41Z reserve=1 # addr=mq8fzjxxVbAKxUGPwaSSo3C4WaUxdzfw3C
{% endhighlight %}

*See also*

* [BackupWallet][rpc backupwallet]: {{summary_backupWallet}}
* [ImportWallet][rpc importwallet]: {{summary_importWallet}}

{% endautocrossref %}
