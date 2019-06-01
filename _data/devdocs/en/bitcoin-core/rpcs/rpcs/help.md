{% comment %}
This file is licensed under the MIT License (MIT) available on
http://opensource.org/licenses/MIT.
{% endcomment %}
{% assign filename="_data/devdocs/en/bitcoin-core/rpcs/rpcs/help.md" %}

##### Help
{% include helpers/subhead-links.md %}

{% assign summary_help="list all commands, or get help for a specified command." %}

{% autocrossref %}

The `help` RPC {{summary_help}}

*Parameter #1---command*

{% itemplate ntpd1 %}
- n: "command"
  t: "string"
  p: "Optional<br>Default=all commands"
  d: "The command to get help on"

{% enditemplate %}

*Result*

{% itemplate ntpd1 %}
- n: "`result`"
  t: "string (hex)"
  p: "Required<br>(exactly 1)"
  d: "The help text"

{% enditemplate %}

{% endautocrossref %}
