## Developer Documentation

Most parts of the documentation can be found in the
[_includes](https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes)
directory. Updates, fixes and improvements are welcome and can submitted using
[pull requests](https://github.com/bitcoin-dot-org/bitcoin.org/blob/master/docs/working-with-github.md)
on GitHub.

**TODO List**: New content and suggestions for improvements can be submitted
to the [TODO
list](https://github.com/bitcoin-dot-org/bitcoin.org/wiki/Improving-Developer-Documentation#todo).
You are also welcome if you want to assign yourself to any task.

**Style Guide**: For better consistency, the [style
guide](https://github.com/bitcoin-dot-org/bitcoin.org/wiki/Improving-Developer-Documentation#style-guide)
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

## Style Guide

This style guide helps keep the Bitcoin.org developer documentation
consistent. It is a series of guidelines, with some parts being
mandatory and other parts being only advisory. You do not need to read
it before contributing---the people reviewing your pull request will let
you know if you break any important rules.

For all style matters not explicitly covered in this guide, the authority is the 
[Wikipedia Manual Of
Style](http://en.wikipedia.org/wiki/Wikipedia%3aManual_of_Style).

### Audience Description

Readers will primarily use this guide to build applications that use Bitcoin transactions. Therefore, the reader knows at least one full-featured programming language fairly well, including standard programming jargon, and will have received and sent at least one Bitcoin transaction using a common wallet application.

Readers will have read programming books before, so they will be prepared to skim over sections of examples and technical data during their first read, and will return to those sections of the guide when they need those details for implementation.

Readers are not expected to be an expert in any system used by Bitcoin,
such as cryptographic hashing, cryptographic signing, peer-to-peer
networking, stack programming, remote procedure calls, etc. However,
readers who do know about these things will get bored if they must read
a lengthy description of them, so brief descriptions or easy skimming
should be emphasized.

Finally, readers are expected to be motivated to learn, so they do not need to be entertained or otherwise motivated to keep reading; it is enough to give them the facts as quickly as possible.

### Code formatting

To make this document easier to read, text inside code blocks should be modified as follows:

**Shortening strings**: Inside a string, bracket-ellipsis-bracket indicates a range of consecutive non-whitespace characters were omitted. For example, the hash of an empty string is e3b0[...]b855.

**Shortening lists**: On a line by itself, bracket-ellipsis-bracket indicates a range of consecutive lines were omitted. For example:

~~~
$ seq 1 5
1
2
[...]
5
~~~

**Splitting large strings**: When long strings are shown in their entirety, backslash-newline indicates a single string has been printed across multiple lines. For example, this is the full version of the first standard transaction ever made:

~~~
0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25\
857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f\
4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd1290\
9d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b0000000043\
4104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa2\
8414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6c\
d84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a\
382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b\
64f9d4c03f999b8643f656b412a3ac00000000
~~~

@harding tries to wrap lines after the 64th character, as shown in the
example above.  However, lines of up to 76 characters seem to render
correctly in the current layout, so longer lines are tolerable.  When
possible, editors should try to format code so that the bottom scrollbar
doesn't appear in the code block.

**Code Before Descriptions:** when long code blocks are broken up to allow explanations in HTML paragraphs, the code fragment should come before the explanation.   For example:

~~~
> echo "Hello, World!"
~~~

Although the command above works in POSIX shell, it doesn't work as expected in the bash shell because the `!` (bang) character has special meaning.

~~~
> echo 'Hello, World!'
~~~~

When the bang character is used, it should be escaped or placed in single quotes to ensure it is interpreted literally.

*References:* the shortening and spiting conventions were discussed in [an old pull
request](https://github.com/saivann/bitcoin.org/pull/11).  Placing code
before descriptions was discussed in another [old pull
request](https://github.com/saivann/bitcoin.org/pull/74).

### Style

#### Capitalization In Headings, Subheads, Captions, And Abbreviation Expansions

The first letter of each word in headings, subheadings, captions, and
abbreviation expansions should be capitalized---this includes
prepositions.

* Heading/Subhead: "Capitalization In Headings, [...]"
* Captions: "Some Of The Data Signed By Default"
* Abbreviation Expansions: "Pay To PubKey Hash (P2PKH)"

*References:* this style was used without discussion since the first
section of the guide was written and is currently being used to avoid
a major revision for a minor issue.  Some discussion was held in [pull
request #589](https://github.com/bitcoin/bitcoin.org/pull/589#discussion-diff-18306278),
but a real discussion should be held about changing this before any
major revision of the docs.

#### First Paragraphs

The first paragraph of an header-level-2 (h2) section in the developer
guide should briefly describe the topic.  Subsections do not need to
follow this format, but it wouldn't hurt.

#### Linking

All links should use Markdown-style reference links, with the reference
definition being placed in the `_includes/references.md` file.  For
example:

~~~
My favorite Bitcoin library is [bitcoinj].
~~~

In the references.md file:

~~~
    [bitcoinj]: http://bitcoinj.org/
~~~

**Autocrossref** is the tool we use to automatically add cross-reference
style links. A definition link is created using Markdown reference-style
links using Kramdown IAL attribute definitions defining an id starting with
"term-" and a class of "term". For example: `[block
chain][]{:#term-block-chain}{:.term}`.  The link must also be added to
the references.md file using the above syntax and to the
_autocrossref.yaml file using the style described therewithin.

#### Hex

Hexadecimal byte strings should always be prefixed by "0x" and should be
in lowercase.  They should otherwise be treated like regular words, such
as adding punctuation after them.  For example: 0x0123456789abcdef.
The should not be put inside `code` spans or blocks unless representing
literal program input or output.

Long hex strings may be broken apart on byte boundaries to improve
readability.  For example: 0x0123 4567 89ab cdef.

Exception: program output or input should be in whatever format the
program uses.


#### References

**Internal Figures**: Figures included within the text shall be referred to by their relative position.  This is so the inclusion of a new figure, or the deletion of an old figure, does not force the re-numbering of all other figures and figure references.

* *The figure above shows the block chain*.
* *~~Figure 1 shows the block chain~~*.

#### Default Unit Of Value: Satoshis

Satoshis are the default unit of value.

* *I sent him satoshis.*
* *~~I sent him bitcoins.~~*

*References:* this was discussed in depth in [an old issue](https://github.com/saivann/bitcoin.org/issues/20).
#
### Punctuation

**Compound adjectives (hyphenation)**: Hyphenate them, unless the first part is an adverb (ending in "-ly", for example).

* *A UTXO used in multiple unconfirmed transactions is a likely sign of a double-spend attempt*.
* *Double-spend risk decreases with each confirmation*.
* *~~Successful miners receive a block reward of newly-created bitcoins~~*.

In these cases, "double-spend" is an adjective that modifies the word that follows it. However:

* *Criminals may attempt to double spend bitcoins to avoid payment*.
* *The Bitcoin protocol provides a confidence score as a guide to protect against double spends*. 

**Dashes**: Em dashes should be written as three hyphens---as in this
example---without surrounding spaces. En dashes (which show ranges of
values, such as 1--10) should be written as two hyphens with no
surrounding spaces. Intra-word or connective hyphens should, of course,
be written without any surrounding spaces.

**Periods**: One space after periods at the end of a sentence in pre-formatted text.  (This does not apply in Markdown or HTML text files.)

* "Every major style guide---including the Modern Language Association
  Style Manual and the Chicago Manual of Style---prescribes a single
  space after a period." ---Farhad Manjoo, Slate,
  http://www.slate.com/articles/technology/technology/2011/01/space_invaders.html

#### CamelCase Terms

Within regular text, treat camelCase terms as common nouns by using a lowercase first letter when not at the start of a sentence.  If used in literal code, use uppercase `CamelCase` as appropriate.

We do not have a rule for when to use a camelCase term or when to break apart the camel case into separate words.

### Glossary

#### Bitcoin 

1. Not capitalized when referring to value or currency. (But satoshi
should be used instead---see Default Unit Of Value section above.)  Follow the same rules as for "dollar" and "yen".
   * *I spent 0.05 bitcoins at the restaurant*.
   * *I love the feeling of bitcoins in my pocket*.
2. Capitalized when referring to something related to bitcoin that's *not* value. In these cases, treat it as if it's a proper name.
   * *I was 28 when I became involved in the Bitcoin community*.
   * *The Bitcoin white paper was a wake-up call*.
   * *The block chain provides Bitcoin's ledger*.
3. Pluralized in normal fashion.
   * *I spent 0.05 bitcoins at the restaurant*.
   * *I have 3 bitcoins in my wallet*.
   * *You can buy my car for 4.5 bitcoins*.
4. Refers only to a specific cryptocurrency. Never use it to refer to other cryptocurrencies, e.g. Litecoin, Dogecoin, etc..
   * *~~My favorite bitcoin is Primecoin~~*.

#### Block chain

Two words. Ordinary capitalization.

* *The block chain provides bitcoin’s ledger*.
* *His actions corrupted the block chain*.

*References:* most recent significant discussion was in a
[bitcoin-documentation mailing list
thread](https://groups.google.com/forum/#!topic/bitcoin-documentation/D9aqm8uDQG0).

#### Bloom Filter

Although named after Burton Howard Bloom, bloom filter shall be treated as a common noun.

* *Filterload loads a bloom filter.*
* *~~Filteradd adds a data element to a Bloom filter.~~*

#### Change [output|transaction]

When referring to the part of a transaction input which is returned to the spender, “change”, try to use it with a clarifying modifier (as seen in the examples below) so the word doesn’t get confused with the regular English verb and noun words, change.

* *I spent the change transaction*.
* *Always use a new public key for your change output*.
* *You can resend change back to the same address*.

#### Coinbase Transaction (Not Generation Transaction)

Use "coinbase transaction" instead of "generation transaction" to describe the first transaction in a block.

* *The coinbase transaction must claim the block subsidy and transaction fees.*
* ~*Pool miners are often paid in generation transactions.*~

*References:* 10 March 2014 email discussion between @saivann, @tgeller, @mikehearn, and @harding prior to bitcoin-documentation mailing list, and a later discussion on [pull #589](https://github.com/bitcoin/bitcoin.org/pull/589#discussion_r18310622).

#### Key pair

Two words.  Ordinary capitalization.

* *A private key and a public are the two parts of a key pair*.

#### Merkle Block

Two words when not the name of the `merkleblock` message.

#### Merkle [Tree|Root|Leaf|Branch|Link]

Although named after Ralph Merkle, merkle tree elements are treated as common nouns.

* *A block header includes a merkle root.*

*References:* discussed on [pull #589](https://github.com/bitcoin/bitcoin.org/pull/589#discussion-diff-18305822)

#### Money

Avoid using “money” when referring to bitcoin.  Use “bitcoin,” “millibit,” “satoshi,” or some other sub-bitcoin unit instead. 

* *Bitcoin transactions send ~~money~~ satoshis*.


#### PaymentRequest, PaymentDetails, Payment, PaymentACK

Messages belonging to the payment protocol.  Should always be capitalized and single words with camelCase as necessary.  When not too distracting, they should be followed by the word "message", as in "PaymentRequest message".  In particular, "Payment" should almost always be followed by "message" to disambiguate it from generic payments.

#### Pubkey, Signature, And Redeem Scripts

The various script parts of transactions.  Pubkey is capitalized as a
regular common noun (i.e., the K is not capitalized)---exception, when
used in an abbreviation (i.e. P2PKH means Pay-To-PubKey-Hash).

* *Outputs include a pubkey script.*
* *Inputs include a signature script or a coinbase.*
* *P2SH outputs pay a hashed redeem script.*

*References:* extensively discussed in pulls [#563](https://github.com/bitcoin/bitcoin.org/pull/563) and [#566](https://github.com/bitcoin/bitcoin.org/pull/566).

#### Stale Block (Not Orphan Or Orphan Block)

Blocks which are not part of the most difficult (best) block chain shall be called stale blocks to avoid confusion with true orphan blocks that don't have a known parent block.  Accordingly, forms of "orphan" shall not be used as a verb.

* *After the reorg, it became a stale block.*
* ~*Because of propagation delays, miners produce one to two orphan blocks a week.*~
* ~*The 0.8.0 blocks were orphaned by the 0.7.x chain.*~

*References:* discussed on [pull #589](https://github.com/bitcoin/bitcoin.org/pull/589#discussion_r18310486).

#### Standard Transaction & IsStandard()

A transaction which passes the Bitcoin Core IsStandard() test, indicating that it will be relayed or mined by default peers and miners.  Mainly Pay-To-PubkeyHash (P2PH) and Pay-To-ScriptHash (P2SH) transaction types.  Does not include genesis transactions.
IsStandard() always begins with a capital I, and always includes the
trailing parenthensis.

* *The first standard transaction appeared in block 170*.
* *It passed the IsStandard() checks.*

#### Timestamp

One word. Ordinary capitalization. Noun, but can be turned into a verb (timestamp, timestamped, timestamping...).

* *The timestamp showed that Gupta's transaction occurred before Smith's*.
* *The block chain provides a timestamped record of all confirmed transactions*.

### Images

Information about creating or changing illustrations can be found in
[the image
README](https://github.com/bitcoin/bitcoin.org/blob/master/img/dev/README).

SVG is the preferred file format for illustrations, but a corresponding
PNG file with the same basename should be created.  Bitmap images should
be in PNG unless a special file format is warranted.  All PNG images
should be optimized by the command, `optipng -o7 <basename>.png`

(Note: optipng overwrites your original image, so make sure you have a
backup before running it.)

## TODO

### Additions Or Improvements Being Made Now

~~~
* [ ] @<person> <estimated completion date YYYY-MM-DD>: <description>
    * <subtask>
~~~

* [x] @harding 2014-10-26: Expand P2P Networking & Operating Modes sections. (DevRef sections expanded; work on DevGuide sections delayed until changes for Bitcoin Core 0.10 implemented.)

#### Changes For Bitcoin Core 0.10

*Expected release date: ~January 2015.*

Thread: https://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg06395.html

* [x] Describe headers first 
* [x] **Describing floating fees. See pulls [#3959](https://github.com/bitcoin/bitcoin/pull/3959) and [#4250](https://github.com/bitcoin/bitcoin/pull/4250)**
* [x] Describe the HTTP REST interface in the API doc.  See pull #2844
* [ ] Mention new command `bitcoin-tx` or maybe fully document it
* [x] Describe watch-only



### Good Content For New Writers

To help contribute to the Bitcoin.org documentation, you can write about
one of the following topics.

* [ ] Multisig wallets like GreenAddress.it
* [x] Hardware wallets like Trezor
* [ ] Assurance contracts such as those created by [Lighthouse](http://blog.vinumeris.com/2014/05/17/lighthouse/)
    * [ ] Mention that the recipients of assurance contracts can pay to their own contract to guarantee that they meet their goal and receive the funds.
* [ ] Document BIP62 changes which will be soft fork introduced at some point in the future
* [ ] Prepare documentation for floating fees currently in the main branch and scheduled for the 0.10 release.



### New Content Proposals

Please use this section to suggest content to be written for future versions of the developer guide or the developer reference.  (Or the forthcoming developer cookbook/developer examples/or whatever we name it.)  Major suggestions or proposals to make large changes to any of the documentation should be discussed on the [mailing list][].


~~~
* [ ] <proposal> @<proposer>
~~~

* [ ] Add a section about handling bitcoin values. @gmaxwell says: "you do NOT want to handle them as floats [and] you often don't want to handle them as doubles. Use of floats can produce weird results due to rounding, [so] it's best to use 64 bit integers. (The RPC has special formating that always displays the trailing zeros.) A lot of people making bitcoin software make the mistake of using whatever random floating point values they have handy and then really bad things happen.
* [x] Describe the memory pool.  May require one section for the Guide and another section for the Reference. @harding
* [ ] Either add a section or find a document to link to about the basics of public key cryptography. @harding
* [ ] Add a subsection to contracts about fidelity bonds @harding
* [ ] How to run multiple nodes in regtest mode (see examples in qa/rpc-tests/) @harding
* [ ] Examples: how to parse a rawtransaction into its part (see code in Electrum or find some MIT-licensed code) @harding
* [ ] Examples: create a micropayment channel using bitcoinj @harding
* [ ] Examples: extend BIP70 example to handle receiving a Payment message and sending a PaymentACK message.
* [ ] Describe how an organization can setup a full node as a "border router" for communication with the full network and then use SPV nodes that connect to that router for managing wallets and other tasks.
* [ ] Describe DER encoding rules for signatures



## Improvements To Existing Content

* [ ] Point out that P2SH addresses start with a "3", and point out that the bitcoind create/addmultisig creates these style of addresses.


### Someday Content

* [ ] BIPs
* [ ] Threshold signatures (alternative multisig)
* [ ] Stealth addresses

### Recurring Todos

As long as new content is being actively added to the guide, some tasks will need to be repeated on occasion.

* [ ] Add autocrossref and manual cross-reference links from older content to recently-added content.
* [ ] Re-read documentation looking for inconsistencies in terminology, style, etc.  Be sure to also check illustrations.