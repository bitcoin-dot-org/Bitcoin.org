{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_includes/devdoc/bitcoin-core/rpcs/rpcs/help.md" %}

##### Help
{% include helpers/subhead-links.md %}

{% assign summary_help="lists all available public RPC commands, or gets help for the specified RPC.  Commands which are unavailable will not be listed, such as wallet RPCs if wallet support is disabled." %}

{% autocrossref %}

The `help` RPC {{summary_help}}

*Parameter---the name of the RPC to get help for*

{% itemplate ntpd1 %}
- n: "RPC"
  t: "string"
  p: "Optional<br>(0 or 1)"
  d: "The name of the RPC to get help for.  If omitted, Bitcoin Core 0.9x will display an alphabetical list of commands; Bitcoin Core 0.10.0 will display a categorized list of commands"

{% enditemplate %}

*Result---a list of RPCs or detailed help for a specific RPC*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string"
  p: "Required<br>(exactly 1)"
  d: "The help text for the specified RPC or the list of commands.  The `bitcoin-cli` command will parse this text and format it as human-readable text"

{% enditemplate %}

*Example from Bitcoin Core 0.10.0*

Command to get help about the `help` RPC:

{% highlight bash %}
bitcoin-cli -testnet help help
{% endhighlight %}

Result:

{% highlight text %}
help ( "command" )

List all commands, or get help for a specified command.

Arguments:
1. "command"     (string, optional) The command to get help on

Result:
"text"     (string) The help text

{% endhighlight %}

*See also*

* The [RPC Quick Reference][section RPC quick reference]

{% endautocrossref %}
