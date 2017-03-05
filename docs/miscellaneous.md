## Miscellaneous

### Redirections

Redirections can be defined in ```_config.yml```.

```
  /news: /en/version-history
```

### Aliases For Contributors

Aliases for contributors are defined in ```_config.yml```.

```
aliases:
  s_nakamoto: Satoshi Nakamoto
  --author=Satoshi Nakamoto: Satoshi Nakamoto
```

### Developer PGP keys

The site hosts the PGP keys for several Bitcoin Core contributors. Here
are some notes about updating those keys based on previous experience:

1. If a key is revoked, update the key with the revocation immediately.
   Anyone with commit access to the site repository may do this without
   prior review, but they should post the commit ID to an open issue or
   PR so other people can review it. After the revoked key is uploaded,
   discussion about verifying/adding a replacement key may continue at a
   slower pace.
