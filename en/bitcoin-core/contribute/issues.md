---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base-core
id: bitcoin-core-contribute-issues
columns: 1
lang: en
title: Issues - Contribute to Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - bcc contribute
  - Issues
---
# Contribute Bug Reports

If you discover a bug or other problem with Bitcoin Core, please report
it.  The are two different processes, [responsible disclosure](#disclosure) for
security bugs and [public issue tracking](#public-issue-tracking) for all other bugs.

<span class="fa fa-exclamation-triangle"></span> **Please don't open an
issue to ask for support.** See the [Get Help][bcc help] page instead.

<h2 id="disclosure">{% translate disclosure development %}</h2>

See the [Bitcoin Core contact page](https://bitcoincore.org/en/contact/) for reporting security issues.

## Public Issue Tracking

For non-security problems with Bitcoin Core, please [search for similar
issues][bcc issues] and, if you don't find any, [open a new issue][bcc
new issue] providing the information listed below.

1. A clear description of the problem. If possible, please describe how
   to reproduce the problem.  (For general guidelines on writing steps
   to reproduce, see [Mozilla's bug reporting documentation][].)

2. What version of Bitcoin Core you use (if you downloaded from
   Bitcoin.org) or what commit you built using (`git log -1`) plus any
   extra patches you applied.

3. Any relevant entries from your `debug.log` file. Note, this file can
   contain private information, so review it before posting or ask in
   the issue to email it directly to a developer rather than posting
   publicly. You can publicly post logs on a [0bin service][0bin]. By
   default, the `debug.log` can be found at the following locations:

    - Windows: `%APPDATA%\Bitcoin\debug.log`

    - OS X: `$HOME/Library/Application Support/Bitcoin/debug.log`

    - Linux: `$HOME/.bitcoin/debug.log`

The best strategy to get your issue fixed quickly is to make it as easy
as possible for the development team to track down the problem and
write a fix.  Providing more information and organizing it well helps
significantly.

<br class="clear big">
<div class="prevnext">
<span markdown="1">**Previous**<br>[Contribute overview][bcc contribute]</span>
<span markdown="1">**Next**<br>[Code][bcc contribute code]</span>
</div>
<br class="clear">

{% include references.md %}
