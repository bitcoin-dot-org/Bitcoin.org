## Miscellaneous

### Redirects

Redirects are defined under the `redirects` key in `_config.yml` and are turned
into redirect pages at build time by `_plugins/redirects.rb`. Most existing
entries redirect paths whose content has moved to `developer.bitcoin.org`, and
there are also some internal slug renames. For example:

    redirects:
      /news: /en/version-history

### Aliases For Contributors

The site's contributor lists are generated from the GitHub contributor data for
`bitcoin/bitcoin` and `bitcoin-dot-org/bitcoin.org` (see
`_plugins/contributors.rb`). The `aliases` map in `_config.yml` normalizes the
names returned by GitHub to canonical display names. For example:

    aliases:
      s_nakamoto: Satoshi Nakamoto
      --author=Satoshi Nakamoto: Satoshi Nakamoto

### Developer PGP keys

The site hosts the PGP keys of several Bitcoin contributors. They are stored as
`.asc` files in the root of the repository, and include both individual
contributor keys and release-signing keys (such as `laanwj-releases.asc`).

Notes on updating these keys, based on past experience:

1. If a key is revoked, update the key with the revocation immediately. Anyone
   with commit access to the site repository may do this without prior review,
   but they should post the commit ID to an open issue or PR so other people can
   review it. After the revoked key is uploaded, discussion about
   verifying/adding a replacement key may continue at a slower pace.
