---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
id: bitcoin-core-overview
columns: 1
lang: en
title: Bitcoin Core
breadcrumbs:
  - bitcoin
  - Bitcoin Core
---
{% assign date_sorted_releases = site.releases | sort: 'optional_date', 'last' %}
<link rel="alternate" type="application/rss+xml" href="/en/rss/releases.rss" title="Bitcoin Core releases">

# Bitcoin Core
{:.not-displayed}

![Bitcoin Core: Helping You Keep Bitcoin Decentralized](/img/bitcoin-core/en-big-logo.svg)

<br class="clear">
{% include bitcoin-core/download-bitcoin-core.html %}
<br class="clear">

<div class="show_less_more">
  <div class="show_less" markdown="block">
  Bitcoin Core is programmed to decide which block chain contains
  valid transactions. The users of Bitcoin Core only accept
  transactions for that block chain, making it the Bitcoin block
  chain that everyone else wants to use
  </div>

  <div class="show_more" markdown="block">
  It is these users who <b>keep Bitcoin decentralized.</b> They
  individually run their own Bitcoin Core full nodes, and each of
  those full nodes separately follows the exact same rules to decide
  which block chain is valid.

  There's no voting or other corruptible process involved: there's
  just individual software following identical rules—"math"—to
  evaluate identical blocks and coming to identical conclusions
  about which block chain is valid.

  This shared agreement (called consensus) allows people like you to
  only accept valid bitcoins, <b>enforcing Bitcoin's rules</b> against
  even the most powerful miners.

  In addition to improving Bitcoin's decentralization, Bitcoin Core users get
  [better security][bcc validation]
  for their bitcoins,
  [privacy features][bcc privacy]
  not available in other wallets, a choice of
  [user interfaces][bcc user interface]
  and several other powerful features.
  </div>

  <p class="center"><button class="toggle_show_more_less js not-displayed"><span class="fa fa-caret-down"></span> Read more</button></p>

</div>

<br>

<div markdown="block" class="two-column-list">
{:.fa-ul}
- <span class="fa-li fa fa-download fa-2x"></span>
  <b>[Download][bcc download]</b><br
  >Download Bitcoin Core&nbsp;{{ site.DOWNLOAD_VERSION }}

- <span class="fa-li fa fa-rocket fa-2x"></span>
  <b>[Features][bcc features]</b><br
  >Discover what Bitcoin Core offers

- <span class="fa-li fa fa-question fa-2x"></span>
  <b>[Get help][bcc help]</b><br
  >Documentation, forums, chat rooms

- <span class="fa-li fa fa-code-fork fa-2x"></span>
  <b>[Contribute][bcc contribute]</b><br
  >Code, translations, and more
</div>

<br class="clear">

### News

{% comment %}<!-- Capture all the releases into a string and convert it to an array -->{% endcomment %}
{% capture text_releases %}
{% for p in date_sorted_releases reversed %}
  {% if p.optional_date %}{{ p.optional_date | date:"%Y-%m-%d" }} - {% endif %}<a href="{{ p.url | replace:'.html','' }}">{{ p.title }}</a>::
 {% endfor %}
{% endcapture %}
{% assign array_releases = text_releases | strip_newlines | split: '::' %}

  - [New Bitcoin Core website](https://bitcoincore.org)
{% comment %}<!-- show the latest three releases -->{% endcomment %}
{% for release in array_releases %}
 {% if forloop.index <= 3 %}
  - {{ release }}
 {% endif %}
{% endfor %}

For more news, see the complete list of [Bitcoin Core releases][bcc
version history]. For notifications of new releases, <a
type="application/rss+xml" href="/en/rss/releases.rss">subscribe to the
RSS feed</a>.

<br class="clear">

<script>
if ( $( window ).width() > 400 && $( window ).height() > 600 ) {
  $(".show_more").removeClass("show_more");
  $(".toggle_show_more_less").removeClass("toggle_show_more_less");
}
</script>

{% include references.md %}
