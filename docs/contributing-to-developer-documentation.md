## Developer Documentation

Most parts of the documentation can be found in the
[_includes](https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes)
directory. Updates, fixes and improvements are welcome and can submitted using
[pull requests](https://github.com/bitcoin-dot-org/bitcoin.org/blob/master/docs/working-with-github.md)
on GitHub.

**Mailing List**: General discussions can take place on the
[mailing list](https://groups.google.com/forum/#!forum/bitcoin-documentation).

**TODO List**: New content and suggestions for improvements can be submitted
to the [TODO
list](https://github.com/bitcoin-dot-org/bitcoin.org/wiki/Documentation-TODO).
You are also welcome if you want to assign yourself to any task.

**Style Guide**: For better consistency, the [style
guide](https://github.com/bitcoin-dot-org/bitcoin.org/wiki/Documentation-Style-Guide)
can be used as a reference for terminology, style and formatting. Suggested
changes can also be submitted to this guide to keep it up to date.

**Cross-Reference Links**: Cross-reference links can be defined in
_includes/references.md. Terms which should automatically link to these
references are defined in _autocrossref.yaml .

### New Glossary Entries

Add new English glossary entries in the `_data/glossary/en/` directory.
Copy a previous glossary entry to get the correct YAML variables
(suggest using block.yaml as a template).

Non-English glossary entries are not currently supported.  You'll have
to update the glossary.rb plugin and templates to support them.

### New Developer Search terms

You can add new search terms or categories directly to the `devsearches`
array in `_config.yaml`.  Comments in that file should provide full
documentation.
