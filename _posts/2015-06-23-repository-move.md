---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

type: posts
layout: post
lang: en
category: blog

title: "Repository Move"
permalink: /en/posts/repository-move.html
date: 2015-06-23
author: |
  <a href="https://bitcoin.org/en/about-us#maintenance">Bitcoin.org Maintainers</a>
---
Bitcoin.org has moved our main git repository to the new
*bitcoin-dot-org* GitHub organization:
<https://github.com/bitcoin-dot-org/bitcoin.org>

We moved to an independent organization to make clear that Bitcoin.org
and Bitcoin Core are separate projects, even though we frequently have
the pleasure of working together.

Nothing besides the repository URL has changed---Bitcoin.org will
continue to provide all of the same information and resources as it did
before.  The [team of contributors][] is also staying the same.

Existing links to the old repository (including developer git
configurations) should continue to work, but we that suggest you upgrade
them to point to the new repository at your first convenience. Git users
can who have the Bitcoin.org repository as their `upstream` can run,

    cd bitcoin.org
    git remote set-url upstream 'https://github.com/bitcoin-dot-org/bitcoin.org'

All current [issues][] and [pull requests][] remain open, and any [forks hosted
on GitHub][] shouldn't need to be updated.

If you have any problems, please [open an issue][].

[team of contributors]: https://bitcoin.org/en/about-us#https://bitcoin.org/en/about-us#help
[issues]: https://github.com/bitcoin-dot-org/bitcoin.org/issues
[pull requests]: https://github.com/bitcoin-dot-org/bitcoin.org/pulls
[forks hosted on github]: https://github.com/bitcoin-dot-org/bitcoin.org/network
[open an issue]: https://github.com/bitcoin-dot-org/bitcoin.org/issues/new
