---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

id: bitcoin-core-contribute-documentation
lang: en
layout: base-core
columns: 1
title: Documentation - Contribute to Bitcoin Core
breadcrumbs:
  - bitcoin
  - bcc
  - bcc contribute
  - Documentation
---
# Writing Bitcoin Core Documentation

Bitcoin Core documentation is spread across three projects: Bitcoin
Core, the Bitcoin Wiki, and Bitcoin.org---and is further subdivided into
different parts. The sections below briefly describe what documentation
is available and how you can contribute.

## Bitcoin Core Docs Directory

The [docs directory][bitcoin core docs directory]
contains various files describing aspects of Bitcoin Core. Almost all of
the files are meant for developers and testers rather than users, although
some (such as the build instructions) may be used by power users.

The files are all written in Markdown, which can be easily edited in
GitHub's web interface:

1. Create a GitHub account, or if you already have one, log in.

2. Find the file you want to edit. For example, [build-unix.md][bitcoin
   core build unix]

3. Click the Edit icon (a pencil).

4. Make your change and click the Preview button to preview it. Revise
   and edit until you're happy with it.

5. At the bottom of the page, fill out the Propose File Change form and
   submit it.

*Need help getting started?  Stop by the [#bitcoin-dev][] IRC chatroom
and tell us what documentation you want to write.*

## Bitcoin.org Bandwidth Sharing Guide

The [Bitcoin.org bandwidth sharing guide][bandwidth sharing guide]
currently provides instructions for how to install Bitcoin Core on
multiple operating systems, configure it to automatically start at boot,
and manually open port 8333 so it accepts incoming connections.

To contribute, you can [edit the guide][edit bandwidth sharing
guide] using the same GitHub web interface as described in the
previous section.

*Need help getting started? You can [open an issue][] or email Bitcoin.org
documentation maintainer {{site.text.bitcoin_org_docs_maintainer_email_link}}.*

## Bitcoin Wiki

The Bitcoin Wiki uses the popular MediaWiki software, so you may already
know how to edit it and create new pages. To reduce spam, you need to
[create an account][wiki create account] and then follow the
[instructions to enable editing][wiki enable editing].

Current documentation can be found in the [Bitcoin Core documentation
category][wiki bitcoin core documentation].  If you create a new page,
be sure to add it to the [Bitcoin Core documentation template][wiki
template bitcoin core documentation] and then add the following code to
the very bottom of the page:

    {% raw %}{{Bitcoin Core documentation}}{% endraw %}

Adding the line above to a page will also add that page to the Bitcoin
Core documentation category.

*Need help getting started?  Stop by the [#bitcoin-wiki][] IRC chatroom and
tell us what documentation you want to write.*

## Bitcoin.org RPC/REST API Reference

The [Bitcoin.org developer reference][devref] contains over 100 printed
pages worth of documentation for the Bitcoin Core RPC and REST
interfaces, which are mainly used by Bitcoin Core command line users and
developers of apps depending on Bitcoin Core.

To contribute RPC edits, the easiest way is to:

1. Go to the [Bitcoin.org developer documentation main page][developer documentation].

2. Search for the RPC you want to edit.

3. Under the subheading for the RPC, click the Edit link.

To create new RPC/REST documentation or edit the REST documentation:

1. Follow [these instructions][open a pull request] to clone the Bitcoin.org repository.

2. RPC files are in the `_includes/ref/bitcoin-core/rpcs` directory.

    REST files are in the `_includes/ref/bitcoin-core/rest` directory.

    New files need to be added to the list in `en/developer-reference.md`

*Need help getting started? You can [open an issue][] or email
Bitcoin.org documentation maintainer {{site.text.bitcoin_org_docs_maintainer_email_link}}.*

<br class="clear big">
<div class="prevnext">
<span markdown="1">**Previous**<br>[Code][bcc contribute code]</span>
<span markdown="1">**Next**<br>[Translations][bcc contribute translations]</span>
</div>
<br class="clear">

{% include references.md %}
