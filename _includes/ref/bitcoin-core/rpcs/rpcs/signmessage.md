{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/ref/bitcoin-core/rpcs/rpcs/signmessage.md" %}

##### SignMessage
{% include helpers/subhead-links.md %}

{% assign summary_signMessage="signs a message with the private key of an address." %}

{% autocrossref %}

*Requires wallet support. Requires an unlocked wallet or an
unencrypted wallet.*

The `signmessage` RPC {{summary_signMessage}}

*Parameter #1---the address corresponding to the private key to sign with*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| Address            | string (base58) | Required<br>(exactly 1)     | A P2PKH address whose private key belongs to this wallet
{:.ntpd}

*Parameter #2---the message to sign*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| Message            | string          | Required<br>(exactly 1)     | The message to sign
{:.ntpd}

*Result---the message signature*

| Name               | Type            | Presence                    | Description
|--------------------|-----------------|-----------------------------|---------------
| `result`           | string (base64) | Required<br>(exactly 1)     | The signature of the message, encoded in base64.  Note that Bitcoin Core before 0.10.0 creates signatures with random *k* values, so each time you sign the same message, it will create a different signature
{:.ntpd}

*Example from Bitcoin Core 0.10.0*

Sign a the message "Hello, World!" using the following address:

{% highlight bash %}
bitcoin-cli -testnet signmessage mgnucj8nYqdrPFh2JfZSB1NmUThUGnmsqe \
    'Hello, World!'
{% endhighlight %}

Result:

{% highlight text %}
IL98ziCmwYi5pL+dqKp4Ux+zCa4hP/xbjHmWh+Mk/lefV/0pWV1p/gQ94jgExSmgH2/+PDcCCrOHAady2IEySSI=
{% endhighlight %}

*See also*

* [VerifyMessage][rpc verifymessage]: {{summary_verifyMessage}}

{% endautocrossref %}
