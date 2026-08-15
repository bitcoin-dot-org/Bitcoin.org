#!/usr/bin/env python3

# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

"""Unit tests for the deterministic BIP HTML generator."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path
import re
import sys
import tempfile
import unittest


GENERATOR = Path(__file__).with_name("generate_bips.py")
SPEC = importlib.util.spec_from_file_location("generate_bips", GENERATOR)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Unable to load {GENERATOR}")
BIPS = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = BIPS
SPEC.loader.exec_module(BIPS)


class BipGeneratorTests(unittest.TestCase):
    def write_source(self, name: str, content: str) -> Path:
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        path = Path(temporary.name) / name
        path.write_text(content, encoding="utf-8")
        return path

    def test_mediawiki_header_and_leading_notice_are_preserved(self) -> None:
        path = self.write_source(
            "bip-0110.mediawiki",
            """This proposal is retained for historical reference.

<pre>
  BIP: 110
  Layer: Consensus (soft fork)
  Title: Example proposal
  Authors: Alice Example <alice@example.test>
  Comments-URI: https://example.test/discussion
  Status: Draft
  Type: Standards Track
  Assigned: 2025-01-02
</pre>

==Abstract==
Example abstract.
""",
        )

        bip = BIPS.parse_bip(path)

        self.assertEqual(110, bip.number)
        self.assertEqual("Example proposal", bip.title)
        self.assertEqual("Consensus (soft fork)", bip.headers["Layer"])
        self.assertIn("historical reference", bip.body)
        self.assertNotIn("BIP: 110", bip.body)

    def test_markdown_header_and_continuation_line(self) -> None:
        path = self.write_source(
            "bip-0003.md",
            """```
  BIP: 3
  Title: Markdown proposal
  Authors: Alice Example <alice@example.test>
           Bob Example <bob@example.test>
  Status: Complete
  Type: Process
  Assigned: 2025-01-02
```

## Abstract

Example abstract.
""",
        )

        bip = BIPS.parse_bip(path)

        self.assertEqual("markdown", bip.source_format)
        self.assertEqual(
            "Alice Example <alice@example.test>\nBob Example <bob@example.test>",
            bip.headers["Authors"],
        )

    def test_named_references_create_one_note_and_multiple_backlinks(self) -> None:
        source = (
            "Text<ref name=sample>Reference body.</ref> and another use<ref name=sample/>.\n"
            "<references />"
        )

        processed = BIPS.preprocess_mediawiki_references(source)

        self.assertNotIn("<ref", processed.lower())
        self.assertEqual(1, processed.count('id="bip-note-1"'))
        self.assertIn("#bip-ref-1-1", processed)
        self.assertIn("#bip-ref-1-2", processed)

    def test_unindented_markdown_footnote_continuations_are_preserved(self) -> None:
        source = "Text[^1].\n\n[^1]: First line\ncontinued line\n[^2]: Other note\n"

        normalized = BIPS.normalize_markdown_footnotes(source)

        self.assertIn("[^1]: First line\n    continued line", normalized)
        self.assertIn("[^2]: Other note", normalized)

    def test_mediawiki_file_markup_becomes_an_accessible_figure(self) -> None:
        source = (
            "[[File:bip-0156/1-dandelion.png|framed|center|"
            "alt=An illustration|Figure 1]] Figure 1"
        )

        processed = BIPS.preprocess_mediawiki_files(source)

        self.assertIn('<figure class="bip-figure">', processed)
        self.assertIn('src="bip-0156/1-dandelion.png"', processed)
        self.assertIn('alt="An illustration"', processed)
        self.assertEqual(1, processed.count("Figure 1"))

        indented = BIPS.preprocess_mediawiki_files(
            "::[[File:bip-0443/example.png|framed|alt=Example|600px]]\n"
            "::'''Figure 2:''' A <code>UTXO</code> example."
        )
        self.assertIn("<figcaption>'''Figure 2:''' A <code>UTXO</code> example.</figcaption>", indented)

    def test_mediawiki_poem_tags_become_valid_html_blocks(self) -> None:
        processed = BIPS.preprocess_mediawiki_blocks(
            "<blockquote><poem>Quoted text.</poem></blockquote>"
        )

        self.assertEqual(
            '<blockquote><div class="bip-poem">Quoted text.</div></blockquote>',
            processed,
        )

    def test_tables_receive_a_scrollable_accessible_wrapper(self) -> None:
        wrapped = BIPS.wrap_document_tables(
            "<p>Before</p><table><tr><td>Value</td></tr></table><p>After</p>"
        )

        self.assertIn('class="bip-table-wrap"', wrapped)
        self.assertIn('tabindex="0"', wrapped)
        self.assertIn("<table><tr><td>Value</td></tr></table>", wrapped)

        nested = BIPS.wrap_document_tables(
            "<table><tr><td><table><tr><td>Nested</td></tr></table></td></tr></table>"
        )
        self.assertEqual(1, nested.count('class="bip-table-wrap"'))

    def test_unknown_placeholders_are_escaped_but_html_is_retained(self) -> None:
        rendered = '<p>Use <pubkey> and <hash value="x">.</p>'

        escaped = BIPS.escape_unknown_html_tags(rendered)

        self.assertEqual(
            '<p>Use &lt;pubkey&gt; and &lt;hash value="x"&gt;.</p>',
            escaped,
        )

    def test_duplicate_heading_anchors_are_normalized(self) -> None:
        rendered = (
            '<p><span id="abstract"></span></p><h2 id="abstract">Abstract</h2>'
            '<h3 id="example"><span id="example"></span>Example</h3>'
            '<p id="example">Text</p>'
        )

        normalized = BIPS.normalize_ids(rendered)

        self.assertEqual(1, normalized.count('id="abstract"'))
        self.assertEqual(1, normalized.count('id="example"'))
        self.assertIn('id="example-2"', normalized)

    def test_ids_with_spaces_and_underscores_become_safe_fragments(self) -> None:
        normalized = BIPS.normalize_ids(
            '<div id="Sign negation"></div><h2 id="low_s">Low S</h2>'
        )

        self.assertIn('id="sign-negation"', normalized)
        self.assertIn('id="low-s"', normalized)

    def test_generated_id_suffixes_cannot_collide_with_existing_ids(self) -> None:
        normalized = BIPS.normalize_ids(
            '<span id="code"></span><span id="code"></span><span id="code-2"></span>'
        )

        self.assertEqual(
            ['id="code"', 'id="code-2"', 'id="code-2-2"'],
            re.findall(r'id="[^"]+"', normalized),
        )

    def test_bip_links_and_fragments_use_pretty_local_routes(self) -> None:
        rendered = (
            '<a href="bip-0009.mediawiki#GetBlockTemplate_changes">BIP 9</a>'
            '<a href="#Abstract">Abstract</a>'
            '<a href="README.mediawiki">BIP index</a>'
        )
        identifiers = {9: {"getblocktemplate-changes"}, 110: {"abstract"}}

        rewritten = BIPS.rewrite_links(
            rendered,
            Path("/tmp/bips-source-does-not-need-to-exist"),
            "a" * 40,
            110,
            identifiers,
        )

        self.assertIn('href="/bip/9/#getblocktemplate-changes"', rewritten)
        self.assertIn('href="#abstract"', rewritten)
        self.assertIn('href="/bips/"', rewritten)

    def test_index_uses_plural_public_route(self) -> None:
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        output = Path(temporary.name) / "bip"
        output.mkdir()

        BIPS.write_index(output, [], "a" * 40)

        content = (output / "index.html").read_text(encoding="utf-8")
        self.assertIn('canonical_url: "https://bitcoin.org/bips/"', content)
        self.assertIn('permalink: "/bips/"', content)

    def test_legacy_github_and_reference_fragments_are_resolved(self) -> None:
        self.assertEqual(
            "#common-signature-message-extension",
            BIPS.resolve_fragment(
                "#user-content-Common_Signature_Message_Extension",
                {"common-signature-message-extension"},
                342,
            ),
        )
        self.assertEqual(
            "#bip-ref-22-1",
            BIPS.resolve_fragment("#cite_ref-22-0", {"bip-ref-22-1"}, 341),
        )
        self.assertEqual(
            "#bip-note-3",
            BIPS.resolve_fragment("#cite_note-3", {"bip-note-3"}, 118),
        )
        self.assertEqual(
            "#bech32",
            BIPS.resolve_fragment("#Bech32%7CBIP173", {"bech32"}, 173),
        )

    def test_remote_images_are_links_and_local_images_are_lazy(self) -> None:
        rendered = (
            '<img src="https://example.test/badge.svg" alt="Licence">'
            '<img src="/bip/1/assets/figure.png" alt="Figure">'
        )

        rewritten = BIPS.rewrite_links(
            rendered,
            Path("/tmp/bips-source-does-not-need-to-exist"),
            "a" * 40,
            1,
            {1: set()},
        )

        self.assertIn('class="bip-external-image"', rewritten)
        self.assertNotIn('<img src="https://', rewritten)
        self.assertIn('<img loading="lazy" decoding="async" src="/bip/1/assets/', rewritten)

    def test_unquoted_images_directories_and_wiki_links_are_rewritten(self) -> None:
        rendered = (
            '<img src=bip-0001/process.png></img>'
            '<a href="bip-0327">vectors</a>'
            '<a href="Protocol_specification#compactsize">types</a>'
            '<a href="BIP_0037">BIP 37</a>'
        )

        rewritten = BIPS.rewrite_links(
            rendered,
            Path("/tmp/bips-source-does-not-need-to-exist"),
            "a" * 40,
            1,
            {1: set(), 37: set()},
        )

        self.assertIn('src="/bip/1/assets/process.png"', rewritten)
        self.assertIn('alt="BIP 1 illustration: process"', rewritten)
        self.assertNotIn("</img>", rewritten)
        self.assertIn("https://github.com/bitcoin/bips/blob/", rewritten)
        self.assertIn("https://en.bitcoin.it/wiki/Protocol_specification#compactsize", rewritten)
        self.assertIn('href="/bip/37/"', rewritten)

    def test_unsafe_html_is_rejected(self) -> None:
        with self.assertRaises(BIPS.BuildError):
            BIPS.validate_rendered_html('<script src="evil.js"></script>', "test")
        with self.assertRaises(BIPS.BuildError):
            BIPS.validate_rendered_html('<a href="javascript:alert(1)">x</a>', "test")

    def test_description_uses_abstract_and_is_bounded(self) -> None:
        bip = BIPS.Bip(
            number=110,
            filename="bip-0110.mediawiki",
            source_path=Path("bip-0110.mediawiki"),
            source_format="mediawiki",
            headers={
                "BIP": "110",
                "Title": "Example proposal",
                "Authors": "Alice Example <alice@example.test>",
                "Status": "Draft",
                "Type": "Standards Track",
                "Assigned": "2025-01-02",
            },
            body="",
            rendered_html="<h2>Abstract</h2><p>A useful description of the proposal.</p>",
        )

        description = BIPS.description_for(bip)

        self.assertEqual(
            "BIP 110: Example proposal. A useful description of the proposal.",
            description,
        )
        self.assertLessEqual(len(description), 220)

    def test_output_inspector_scopes_links_and_alt_checks_to_bip_content(self) -> None:
        inspector = BIPS.OutputInspector()
        inspector.feed(
            '<head><meta name="description" content="Trusted site metadata"></head>'
            '<nav><a href="relative-menu-link">Menu</a></nav>'
            '<article class="article bip-document">'
            '<h2 id="abstract">Abstract</h2>'
            '<a href="/bip/9/#specification">BIP 9</a>'
            '<img src="/bip/9/assets/example.png">'
            '</article>'
        )

        self.assertTrue(inspector.found_bip_document)
        self.assertEqual([], inspector.unsafe_document_html)
        self.assertEqual(
            [
                ("href", "/bip/9/#specification"),
                ("src", "/bip/9/assets/example.png"),
            ],
            inspector.document_links,
        )
        self.assertEqual(["/bip/9/assets/example.png"], inspector.images_without_alt)
        self.assertIn("abstract", inspector.ids)

    def test_output_inspector_rejects_unsafe_html_inside_bip_content(self) -> None:
        inspector = BIPS.OutputInspector()
        inspector.feed(
            '<meta name="description" content="Trusted site metadata">'
            '<article class="article bip-document">'
            '<meta http-equiv="refresh" content="0; url=https://example.test">'
            '</article>'
        )

        self.assertEqual(["<meta"], inspector.unsafe_document_html)

    def test_output_check_scopes_unsafe_html_validation_to_bip_content(self) -> None:
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        root = Path(temporary.name)
        config = root / "bips-source.json"
        output = root / "bip"
        page = output / "110" / "index.html"
        page.parent.mkdir(parents=True)
        index_page = root / "bips" / "index.html"
        index_page.parent.mkdir(parents=True)
        index_page.write_text("BIP index", encoding="utf-8")
        config.write_text(
            json.dumps(
                {
                    "repository": "https://github.com/bitcoin/bips.git",
                    "commit": "a" * 40,
                    "cache_directory": "_cache/bitcoin-bips",
                    "output_directory": "bip",
                    "expected_bip_count": 1,
                    "expected_image_asset_count": 1,
                }
            ),
            encoding="utf-8",
        )
        trusted_head = '<head><meta name="description" content="BIP 110"></head>'
        article = (
            '<article class="article bip-document expanded">'
            '<h2 id="abstract">Abstract</h2><p>Example.</p>'
            '</article>'
        )
        page.write_text(trusted_head + article, encoding="utf-8")

        BIPS.check_output(config, output)

        page.write_text(
            trusted_head
            + article.replace(
                '<p>Example.</p>',
                '<meta http-equiv="refresh" content="0"><p>Example.</p>',
            ),
            encoding="utf-8",
        )
        with self.assertRaises(BIPS.BuildError):
            BIPS.check_output(config, output)


if __name__ == "__main__":
    unittest.main()
