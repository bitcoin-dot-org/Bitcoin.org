#!/usr/bin/env python3

# This file is licensed under the MIT License (MIT) available on
# https://opensource.org/licenses/MIT.

"""Build static, styled HTML pages from a pinned bitcoin/bips revision."""

from __future__ import annotations

import argparse
import collections
import dataclasses
import html
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import textwrap
from typing import Iterable
from urllib.parse import quote, unquote


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CONFIG = ROOT / "_build" / "bips-source.json"
IMAGE_EXTENSIONS = {".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}
REQUIRED_HEADERS = {"BIP", "Authors", "Assigned", "Status", "Title", "Type"}
UNSAFE_HTML = re.compile(
    r"<\s*(?:base|embed|form|iframe|input|link|meta|object|script|style)(?=[\s/>])"
    r"|\s+on[a-z]+\s*="
    r"|\s+(?:href|src)\s*=\s*['\"]\s*(?:data|javascript):",
    re.IGNORECASE,
)
UNSAFE_SVG = re.compile(
    r"<\s*(?:foreignObject|iframe|script)(?=[\s/>])"
    r"|\s+on[a-z]+\s*="
    r"|\s+(?:href|xlink:href)\s*=\s*['\"]\s*(?:data|javascript|https?):",
    re.IGNORECASE,
)

STANDARD_HTML_TAGS = {
    "a", "abbr", "aside", "b", "big", "blockquote", "br", "caption",
    "center", "cite", "code", "col", "colgroup", "dd", "del", "details",
    "div", "dl", "dt", "em", "figcaption", "figure", "font", "h1", "h2",
    "h3", "h4", "h5", "h6", "hr", "i", "img", "kbd", "li", "mark",
    "ol", "p", "pre", "q", "s", "samp", "section", "small", "span",
    "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td",
    "tfoot", "th", "thead", "tr", "tt", "u", "ul", "var",
}

# A few upstream documents contain historical fragment names which no longer
# match their target headings. Keep those links useful without modifying the
# canonical BIP text.
LEGACY_FRAGMENT_ALIASES = {
    23: {"block-proposals": "block-proposal"},
    36: {"variable-length-string": "specification"},
    94: {"time-warp-fix": "3-time-warp-attack-prevention"},
}


class BuildError(RuntimeError):
    """A deterministic BIP build failure."""


@dataclasses.dataclass
class Bip:
    number: int
    filename: str
    source_path: Path
    source_format: str
    headers: dict[str, str]
    body: str
    rendered_html: str = ""
    description: str = ""
    span_tables: dict[str, str] = dataclasses.field(default_factory=dict)

    @property
    def title(self) -> str:
        return self.headers["Title"]

    @property
    def status(self) -> str:
        return self.headers["Status"]

    @property
    def status_slug(self) -> str:
        return slug(self.status)

    @property
    def type_slug(self) -> str:
        return slug(self.headers["Type"])


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def load_config(path: Path) -> dict[str, object]:
    try:
        config = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise BuildError(f"Unable to read BIP source configuration {path}: {exc}") from exc

    commit = str(config.get("commit", ""))
    if not re.fullmatch(r"[0-9a-f]{40}", commit):
        raise BuildError("The configured BIP commit must be a full 40-character SHA-1")
    if str(config.get("repository", "")) not in {
        "https://github.com/bitcoin/bips",
        "https://github.com/bitcoin/bips.git",
    }:
        raise BuildError("The BIP repository must be the bitcoin/bips HTTPS repository")
    for key in ("expected_bip_count", "expected_image_asset_count"):
        try:
            value = int(config[key])
        except (KeyError, TypeError, ValueError) as exc:
            raise BuildError(f"The BIP source configuration requires an integer {key}") from exc
        if value < 1:
            raise BuildError(f"The BIP source configuration requires a positive {key}")
    return config


def run(command: list[str], cwd: Path | None = None, input_text: str | None = None) -> str:
    try:
        process = subprocess.run(
            command,
            cwd=cwd,
            input=input_text,
            text=True,
            encoding="utf-8",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=False,
        )
    except FileNotFoundError as exc:
        raise BuildError(f"Required command not found: {command[0]}") from exc

    if process.returncode != 0:
        detail = process.stderr.strip() or process.stdout.strip() or "unknown error"
        raise BuildError(f"Command failed ({' '.join(command)}): {detail}")
    if process.stderr.strip():
        print(process.stderr.strip(), file=sys.stderr)
    return process.stdout.strip()


MINIMUM_PANDOC_VERSION = (2, 9)


def parse_pandoc_version(version_output: str) -> tuple[int, int]:
    match = re.match(r"pandoc(?:\.exe)?\s+(\d+)\.(\d+)", version_output)
    if not match:
        raise BuildError(f"Unable to parse the Pandoc version from: {version_output!r}")
    return int(match.group(1)), int(match.group(2))


def ensure_pandoc_version() -> None:
    """Refuse to build with a Pandoc older than the tested range.

    The generator is exercised against Pandoc 2.9 (Ubuntu jammy), 3.1 and
    3.10; releases older than 2.9 have not been tested and may silently
    produce different HTML.
    """
    version_output = run(["pandoc", "--version"]).splitlines()[0]
    version = parse_pandoc_version(version_output)
    if version < MINIMUM_PANDOC_VERSION:
        minimum = ".".join(str(part) for part in MINIMUM_PANDOC_VERSION)
        raise BuildError(
            f"Pandoc {version[0]}.{version[1]} is older than the minimum tested "
            f"version {minimum}; found: {version_output}"
        )
    print(f"Using {version_output}")


def ensure_source(config: dict[str, object], explicit_source: Path | None = None) -> tuple[Path, str]:
    expected_commit = str(config["commit"])
    environment_source = os.environ.get("BIPS_SOURCE_DIR")
    source = explicit_source or (Path(environment_source) if environment_source else None)

    if source is not None:
        source = source.expanduser().resolve()
        if not (source / ".git").exists() or not (source / "README.mediawiki").is_file():
            raise BuildError(f"BIPS_SOURCE_DIR is not a bitcoin/bips checkout: {source}")
        actual_commit = run(["git", "rev-parse", "HEAD"], cwd=source)
        if actual_commit != expected_commit:
            raise BuildError(
                f"BIPS_SOURCE_DIR is at {actual_commit}, but {expected_commit} is pinned"
            )
        return source, actual_commit

    cache = ROOT / str(config["cache_directory"])
    repository = str(config["repository"])
    cache.parent.mkdir(parents=True, exist_ok=True)

    if cache.exists() and not (cache / ".git").exists():
        shutil.rmtree(cache)
    if not cache.exists():
        cache.mkdir()
        run(["git", "init", "--quiet"], cwd=cache)
        run(["git", "remote", "add", "origin", repository], cwd=cache)
    else:
        remotes = run(["git", "remote"], cwd=cache).splitlines()
        if "origin" not in remotes:
            run(["git", "remote", "add", "origin", repository], cwd=cache)
        else:
            run(["git", "remote", "set-url", "origin", repository], cwd=cache)

    try:
        actual_commit = run(["git", "rev-parse", "HEAD"], cwd=cache)
    except BuildError:
        actual_commit = ""

    if actual_commit != expected_commit:
        run(["git", "fetch", "--depth", "1", "origin", expected_commit], cwd=cache)
        run(["git", "checkout", "--detach", "--force", "FETCH_HEAD"], cwd=cache)

    actual_commit = run(["git", "rev-parse", "HEAD"], cwd=cache)
    if actual_commit != expected_commit:
        raise BuildError(f"Fetched BIP revision {actual_commit}; expected {expected_commit}")
    return cache, actual_commit


def tracked_source_files(source_root: Path) -> list[Path]:
    """Return only files committed in the pinned repository revision."""

    names = run(["git", "ls-files", "-z"], cwd=source_root).split("\0")
    return [source_root / name for name in names if name]


def header_blocks(text: str, source_format: str) -> Iterable[re.Match[str]]:
    if source_format == "mediawiki":
        return re.finditer(r"<pre>\s*\n(?P<header>.*?)\n</pre>", text, re.DOTALL)
    return re.finditer(r"```[^\n]*\n(?P<header>.*?)\n```", text, re.DOTALL)


def parse_header_lines(raw_header: str) -> dict[str, str]:
    headers: dict[str, str] = {}
    current_key: str | None = None

    for raw_line in raw_header.splitlines():
        match = re.match(r"^\s{2}([A-Za-z][A-Za-z-]*):\s*(.*)$", raw_line)
        if match:
            current_key = match.group(1)
            if current_key in headers:
                raise BuildError(f"Duplicate BIP header: {current_key}")
            headers[current_key] = match.group(2).strip()
            continue
        if current_key and re.match(r"^\s{3,}\S", raw_line):
            headers[current_key] += "\n" + raw_line.strip()
            continue
        if raw_line.strip():
            raise BuildError(f"Invalid BIP header line: {raw_line!r}")

    missing = sorted(REQUIRED_HEADERS - set(headers))
    if missing:
        raise BuildError(f"Missing required BIP headers: {', '.join(missing)}")
    return headers


def parse_bip(path: Path) -> Bip:
    source_format = "mediawiki" if path.suffix == ".mediawiki" else "markdown"
    text = path.read_text(encoding="utf-8-sig")
    selected: re.Match[str] | None = None

    for block in header_blocks(text, source_format):
        if re.search(r"^\s*BIP:\s*\d+\s*$", block.group("header"), re.MULTILINE):
            selected = block
            break
    if selected is None:
        raise BuildError(f"No RFC 822 BIP header found in {path.name}")

    headers = parse_header_lines(selected.group("header"))
    number = int(headers["BIP"])
    filename_match = re.fullmatch(r"bip-(\d{4})\.(?:mediawiki|md)", path.name)
    if filename_match is None or int(filename_match.group(1)) != number:
        raise BuildError(f"BIP number does not match filename: {path.name}")

    body = (text[: selected.start()].rstrip() + "\n\n" + text[selected.end() :].lstrip()).strip()
    return Bip(
        number=number,
        filename=path.name,
        source_path=path,
        source_format=source_format,
        headers=headers,
        body=body,
    )


def render_with_pandoc(bip: Bip, source_root: Path) -> str:
    if bip.source_format == "mediawiki":
        despanned, bip.span_tables = preprocess_mediawiki_spanned_tables(
            preprocess_mediawiki_table_spacing(bip.body)
        )
        body = preprocess_mediawiki_references(
            preprocess_mediawiki_blocks(preprocess_mediawiki_files(despanned))
        )
    else:
        body = normalize_markdown_footnotes(bip.body)
    input_format = "mediawiki+gfm_auto_identifiers" if bip.source_format == "mediawiki" else "gfm"
    output = run(
        [
            "pandoc",
            f"--from={input_format}",
            "--to=html5",
            "--wrap=none",
            "--strip-comments",
        ],
        cwd=source_root,
        input_text=body,
    )
    return output + "\n"


def normalize_html_with_pandoc(rendered: str, source_root: Path) -> str:
    """Reparse rendered fragments so malformed legacy inline HTML is balanced."""

    output = run(
        ["pandoc", "--from=html", "--to=html5", "--wrap=none"],
        cwd=source_root,
        input_text=rendered,
    )
    return output + "\n"


def wrap_document_tables(rendered: str) -> str:
    """Give wide protocol tables a keyboard- and touch-scrollable container."""

    wrapper = (
        '<div class="bip-table-wrap" tabindex="0" role="region" '
        'aria-label="Scrollable BIP table">'
    )
    output: list[str] = []
    cursor = 0
    depth = 0

    for match in re.finditer(r"</?table\b[^>]*>", rendered, re.IGNORECASE):
        output.append(rendered[cursor : match.start()])
        tag = match.group(0)
        closing = tag.lstrip().startswith("</")
        if not closing:
            if depth == 0:
                output.append(wrapper)
            depth += 1
            output.append(tag)
        else:
            output.append(tag)
            depth -= 1
            if depth == 0:
                output.append("</div>")
        cursor = match.end()

    output.append(rendered[cursor:])
    if depth != 0:
        raise BuildError("Unbalanced table markup after HTML normalization")
    return "".join(output)


SPAN_ATTRIBUTE = re.compile(r'\b(colspan|rowspan)\s*=\s*"?(\d+)"?', re.IGNORECASE)


def convert_wiki_cell_inline(content: str) -> str:
    """Minimally convert MediaWiki inline markup inside an HTML-converted cell."""
    # A rare <ref> inside a table cell becomes an inline parenthetical; the
    # protected table is substituted after reference preprocessing runs.
    content = re.sub(
        r"<ref[^>]*>(.*?)</ref\s*>", r" (\1)", content, flags=re.IGNORECASE | re.DOTALL
    )
    content = re.sub(r"<ref[^>]*/\s*>", "", content, flags=re.IGNORECASE)
    # Escape angle brackets that do not start an HTML tag, e.g. <33 byte ...>.
    content = re.sub(r"<(?![A-Za-z/!])", "&lt;", content)
    content = re.sub(r"\[\[([^|\]]+)\|([^\]]+)\]\]", r'<a href="\1">\2</a>', content)
    content = re.sub(r"\[\[([^\]]+)\]\]", r'<a href="\1">\1</a>', content)
    content = re.sub(r"'''(.+?)'''", r"<strong>\1</strong>", content)
    content = re.sub(r"''(.+?)''", r"<em>\1</em>", content)
    return content


def wiki_table_to_html(table: str) -> str:
    """Convert one complete MediaWiki table to a plain HTML table.

    Pandoc's MediaWiki reader fixes the column count from the first row and
    silently drops the remaining cells of wider rows (jgm/pandoc#1696), so
    tables using colspan/rowspan must bypass it entirely. Cell content may
    continue on following lines; those lines belong to the current cell.
    """
    lines = mask_protected_pipes(table).splitlines()
    caption = ""
    rows = []
    current = []

    def append_cells(raw: str, tag: str, separator: str) -> None:
        for cell in re.split(separator, raw):
            attributes = ""
            if "|" in cell:
                prefix, _, remainder = cell.partition("|")
                if "=" in prefix and "[[" not in prefix:
                    spans = SPAN_ATTRIBUTE.findall(prefix)
                    attributes = "".join(
                        f' {name.lower()}="{value}"' for name, value in spans
                    )
                    cell = remainder
            current.append([tag, attributes, convert_wiki_cell_inline(cell.strip())])

    for line in lines[1:-1]:
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith("|+"):
            caption = convert_wiki_cell_inline(stripped[2:].strip())
        elif stripped.startswith("|-"):
            if current:
                rows.append(current)
                current = []
        elif stripped.startswith("!"):
            append_cells(stripped[1:], "th", r"!!")
        elif stripped.startswith("|") and not stripped.startswith("|}"):
            append_cells(stripped[1:], "td", r"\|\|")
        elif current:
            # A single newline inside a MediaWiki cell is a soft wrap.
            current[-1][2] += " " + convert_wiki_cell_inline(stripped)
    if current:
        rows.append(current)
    body = "".join(
        "<tr>" + "".join(f"<{t}{a}>{c}</{t}>" for t, a, c in row) + "</tr>"
        for row in rows
        if row
    )
    caption_markup = f"<caption>{caption}</caption>" if caption else ""
    return f"<table>{caption_markup}{body}</table>"


def preprocess_mediawiki_table_spacing(source: str) -> str:
    """Insert a blank line before tables glued to a preceding raw-HTML line.

    Pandoc's MediaWiki reader treats a line such as <br/> as the start of a
    raw HTML block and swallows a directly following table as part of it,
    silently dropping the table (BIP 75). A preceding table-syntax line is
    left untouched so nested tables are unaffected.
    """
    return re.sub(
        r"^(?!\s*$)(?![|!{]).*\n(?=\{\|)",
        lambda match: match.group(0) + "\n",
        source,
        flags=re.MULTILINE,
    )


PROTECTED_PIPE_SPANS = re.compile(
    r"<(code|tt|nowiki)\b[^>]*>.*?</\1\s*>", re.IGNORECASE | re.DOTALL
)


def mask_protected_pipes(text: str) -> str:
    """Turn pipes inside inline code into entities before cell splitting.

    A cell such as <code>hash(A || B)</code> contains the OR operator, not
    two cell separators; the entity renders identically and keeps the code
    span within a single cell.
    """
    return PROTECTED_PIPE_SPANS.sub(
        lambda match: match.group(0).replace("|", "&#124;"), text
    )


def wiki_table_row_widths(table: str) -> list[int]:
    """Count the cells of each row, honouring multi-line cell content."""
    widths: list[int] = []
    current = 0
    for line in mask_protected_pipes(table).splitlines()[1:-1]:
        stripped = line.strip()
        if not stripped or stripped.startswith("|+"):
            continue
        if stripped.startswith("|-"):
            if current:
                widths.append(current)
                current = 0
        elif stripped.startswith("!"):
            # Structural width counts every cell, including empty ones —
            # an empty corner header is still a rendered column.
            current += len(re.split(r"!!", stripped[1:]))
        elif stripped.startswith("|") and not stripped.startswith("|}"):
            current += len(re.split(r"\|\|", stripped[1:]))
    if current:
        widths.append(current)
    return widths


def preprocess_mediawiki_spanned_tables(source: str) -> str:
    """Keep every column of tables that use colspan/rowspan.

    Most affected tables only use a single full-width colspan header as a
    visual title; converting that row to a MediaWiki caption lets Pandoc
    parse the rest of the table correctly. Tables with any remaining span
    are converted to plain HTML tables instead.
    """
    title_row = re.compile(
        r"^\{\|(?P<table_start>[^\n]*)\n"
        r"(?P<separator>\|-[^\n]*\n)?"
        r'!\s*colspan\s*=\s*"?\d+"?[^|\n]*\|\s*(?P<title>[^\n]*)\n',
        re.MULTILINE,
    )

    def to_caption(match: "re.Match[str]") -> str:
        title = match.group("title").strip()
        return "{|" + match.group("table_start") + "\n|+ " + title + "\n"

    tables: dict[str, str] = {}

    def transform_table(match: "re.Match[str]") -> str:
        table = match.group(0)
        widths = wiki_table_row_widths(table)
        # Pandoc locks the column count to the first row and silently drops
        # the extra cells of any wider row, whether the mismatch comes from
        # colspan/rowspan markup or from a header that is simply narrower
        # than the data rows (jgm/pandoc#1696).
        ragged = bool(widths) and max(widths) > widths[0]
        if not SPAN_ATTRIBUTE.search(table) and not ragged:
            # Pipes inside inline code split cells on some Pandoc versions
            # (2.9 drops whole tables of BIP 150); the entity renders the
            # same and parses identically everywhere.
            return mask_protected_pipes(table)
        table = title_row.sub(to_caption, table, count=1)
        widths = wiki_table_row_widths(table)
        ragged = bool(widths) and max(widths) > widths[0]
        if not SPAN_ATTRIBUTE.search(table) and not ragged:
            return mask_protected_pipes(table)
        # Protect the converted table from Pandoc entirely: its HTML reader
        # drops rowspan attributes when rebalancing rows, so the finished
        # table is substituted back after HTML normalization.
        token = f"BIPSPANTABLETOKEN{len(tables)}"
        # Apply the same unknown-tag escaping the rest of the document gets,
        # so placeholders such as <keytype> stay visible as text.
        tables[token] = escape_unknown_html_tags(wiki_table_to_html(table))
        return token

    source = re.sub(
        r"^\{\|.*?^\|\}", transform_table, source, flags=re.MULTILINE | re.DOTALL
    )
    return source, tables


def restore_spanned_tables(rendered: str, tables: dict[str, str]) -> str:
    """Substitute protected span tables back after Pandoc normalization."""
    for token, markup in tables.items():
        rendered = rendered.replace(f"<p>{token}</p>", markup)
        rendered = rendered.replace(token, markup)
    return rendered


def preprocess_mediawiki_blocks(source: str) -> str:
    """Replace extension-only block tags with standards-compliant HTML."""

    source = re.sub(
        r"<poem\b[^>]*>", '<div class="bip-poem">', source, flags=re.IGNORECASE
    )
    return re.sub(r"</poem\s*>", "</div>", source, flags=re.IGNORECASE)


def preprocess_mediawiki_files(source: str) -> str:
    """Turn MediaWiki File links into portable HTML figures."""

    pattern = re.compile(
        r"^[ \t]*(?::+[ \t]*)?\[\[File:(?P<path>bip-\d{4}/[^|\]]+)"
        r"(?P<options>(?:\|[^\]]*)?)\]\][ \t]*(?P<trailing>[^\n]*)"
        r"(?:\n(?P<following_line>[^\n]+))?$",
        re.IGNORECASE | re.MULTILINE,
    )

    def replace_file(match: re.Match[str]) -> str:
        path = match.group("path").strip()
        options = [part.strip() for part in match.group("options").split("|") if part.strip()]
        trailing = match.group("trailing").strip()
        following_line = (match.group("following_line") or "").strip()
        controls = {"border", "center", "frame", "framed", "left", "right", "thumb", "thumbnail"}
        explicit_alt = next(
            (part.split("=", 1)[1].strip() for part in options if part.lower().startswith("alt=")),
            "",
        )
        caption_options = [
            part for part in options
            if part.lower() not in controls
            and not part.lower().startswith(("alt=", "link=", "page=", "upright="))
            and not re.fullmatch(r"\d+(?:x\d+)?px", part, re.IGNORECASE)
        ]
        option_caption = caption_options[-1] if caption_options else ""
        following_caption = ""
        append_following = ""
        if following_line.startswith(":"):
            following_caption = following_line.lstrip(": ")
        elif following_line and following_line == option_caption:
            following_caption = following_line
        elif following_line:
            append_following = "\n" + following_line

        caption = trailing or following_caption or option_caption
        alt_text = re.sub(r"'{2,}", "", re.sub(r"<[^>]+>", "", caption))
        alt = explicit_alt or alt_text or "BIP illustration"
        escaped_path = html.escape(path, quote=True)
        figure = (
            f'<figure class="bip-figure"><a href="{escaped_path}">'
            f'<img src="{escaped_path}" alt="{html.escape(alt, quote=True)}"></a>'
        )
        if caption:
            caption_markup = caption if following_caption else html.escape(caption)
            figure += f"<figcaption>{caption_markup}</figcaption>"
        return figure + "</figure>" + append_following

    return pattern.sub(replace_file, source)


def normalize_markdown_footnotes(source: str) -> str:
    """Indent unindented continuation lines in GFM footnote definitions.

    A small number of BIPs use visually wrapped footnote definitions without
    Markdown's required four-space continuation indent. GitHub displays these
    as intended, but Pandoc otherwise truncates each note at its first line.
    """

    lines = source.splitlines()
    normalized: list[str] = []
    in_footnote = False

    for line in lines:
        if re.match(r"^\[\^[^]]+\]:", line):
            in_footnote = True
            normalized.append(line)
            continue
        if in_footnote and not line.strip():
            in_footnote = False
            normalized.append(line)
            continue
        if in_footnote and re.match(r"^\[[^]^]+\]:", line):
            in_footnote = False
        if in_footnote and line and not line.startswith((" ", "\t")):
            normalized.append("    " + line)
        else:
            normalized.append(line)

    trailing_newline = "\n" if source.endswith("\n") else ""
    return "\n".join(normalized) + trailing_newline


def reference_name(attributes: str) -> str | None:
    match = re.search(
        r"\bname\s*=?\s*(?:\"([^\"]+)\"|'([^']+)'|([^\s>]+))",
        attributes,
        re.IGNORECASE,
    )
    return next((value for value in match.groups() if value), None) if match else None


REF_TOKEN = re.compile(
    r"<ref(?P<self_attributes>\s[^>]*?)?\s*/>"
    r"|<ref(?P<open_attributes>\s[^>]*)?>"
    r"|</ref\s*>",
    re.IGNORECASE,
)


def find_reference_spans(source: str) -> list[dict]:
    """Locate top-level <ref> elements with balanced tag matching.

    The previous non-greedy regex paired an outer opening tag with the first
    closing tag it met, so a nested <ref>…</ref> scrambled the surrounding
    text (BIP 324) or broke newer Pandoc on the orphaned closer. A depth
    counter pairs each opener with its own closer instead; stray closers are
    consumed silently and an unterminated opener is treated as literal text.
    """
    spans: list[dict] = []
    depth = 0
    current: dict | None = None
    for token in REF_TOKEN.finditer(source):
        text = token.group(0)
        if text.lower().startswith("</"):
            if depth == 0:
                continue
            depth -= 1
            if depth == 0 and current is not None:
                current["end"] = token.end()
                current["content"] = source[current["content_start"] : token.start()]
                spans.append(current)
                current = None
        elif token.group("self_attributes") is not None or text.rstrip().endswith("/>"):
            if depth == 0:
                spans.append(
                    {
                        "start": token.start(),
                        "end": token.end(),
                        "attributes": token.group("self_attributes") or "",
                        "content": "",
                    }
                )
        else:
            if depth == 0:
                current = {
                    "start": token.start(),
                    "content_start": token.end(),
                    "attributes": token.group("open_attributes") or "",
                }
            depth += 1
    return spans


def convert_note_blocks(content: str) -> str:
    """Make block-level MediaWiki markup survive inside a raw-HTML note.

    Note bodies are emitted inside a raw <div>, where Pandoc no longer
    parses MediaWiki block syntax: tables vanished entirely (BIP 85) and
    indented code blocks collapsed into run-on text. Convert both to HTML
    here instead.
    """
    content = re.sub(
        r"^\{\|.*?^\|\}",
        lambda match: wiki_table_to_html(match.group(0)),
        content,
        flags=re.MULTILINE | re.DOTALL,
    )

    def to_pre(match: re.Match[str]) -> str:
        lines = [line[1:] for line in match.group(0).splitlines()]
        return "<pre>" + html.escape("\n".join(lines), quote=False) + "</pre>"

    content = re.sub(r"(?:^ \S[^\n]*\n?)+", to_pre, content, flags=re.MULTILINE)
    return content


def preprocess_mediawiki_references(source: str) -> str:
    """Replace MediaWiki references before Pandoc sees nested list markup.

    Pandoc understands simple <ref> elements, but can leave malformed DOM when
    a reference appears inside a nested MediaWiki list. BIPs use references
    heavily in exactly that way, so convert them to ordinary anchors and a
    notes list first.
    """

    reference_pattern = re.compile(
        r"<ref(?P<full_attributes>\s[^>]*)?>(?P<content>.*?)</ref\s*>"
        r"|<ref(?P<short_attributes>\s[^>]*)?\s*/>",
        re.IGNORECASE | re.DOTALL,
    )
    matches = find_reference_spans(source)
    if not matches:
        return re.sub(r"<references\b[^>]*>", "", source, flags=re.IGNORECASE)

    named_content: dict[str, str] = {}

    def collect_names(spans: list[dict]) -> None:
        for span in spans:
            name = reference_name(span["attributes"])
            content = span["content"].strip()
            if name and content and name not in named_content:
                named_content[name] = content
            if content:
                collect_names(find_reference_spans(content))

    collect_names(matches)

    notes: list[dict[str, object]] = []
    named_notes: dict[str, dict[str, object]] = {}
    output: list[str] = []
    cursor = 0

    def marker_for(attributes: str, content: str) -> str:
        name = reference_name(attributes)
        content = content.strip()
        note = named_notes.get(name) if name else None
        if note is None:
            if not content and name:
                content = named_content.get(name, "")
            # Reserve the number before recursing so notes are numbered in
            # reading order even when references nest.
            note = {"number": len(notes) + 1, "content": "", "uses": 0}
            notes.append(note)
            if name:
                named_notes[name] = note
            if not content:
                # Preserve a visible marker rather than silently inventing text
                # for a malformed upstream reference.
                content = "Reference text is not available in the source document."
            else:
                content = convert_note_blocks(replace_spans(content))
            note["content"] = content
        note["uses"] = int(note["uses"]) + 1
        number = int(note["number"])
        use = int(note["uses"])
        return (
            f'<sup><span id="bip-ref-{number}-{use}"></span>'
            f'&#91;[[#bip-note-{number}|{number}]]&#93;</sup>'
        )

    def replace_spans(text: str) -> str:
        pieces: list[str] = []
        position = 0
        for span in find_reference_spans(text):
            pieces.append(text[position : span["start"]])
            pieces.append(marker_for(span["attributes"], span["content"]))
            position = span["end"]
        pieces.append(text[position:])
        return "".join(pieces)

    for match in matches:
        output.append(source[cursor : match["start"]])
        output.append(marker_for(match["attributes"], match["content"]))
        cursor = match["end"]
    output.append(source[cursor:])
    processed = "".join(output)

    note_items = []
    for note in notes:
        number = int(note["number"])
        backlinks = " ".join(
            f'[[#bip-ref-{number}-{use}|↩]]' for use in range(1, int(note["uses"]) + 1)
        )
        note_items.append(
            f'<li><span id="bip-note-{number}"></span><div>{note["content"]}</div>'
            f'<span class="bip-note-backlinks">{backlinks}</span></li>'
        )
    notes_markup = '<div class="bip-footnotes"><ol>' + "".join(note_items) + "</ol></div>"

    references_pattern = re.compile(r"<references\b[^>]*>", re.IGNORECASE)
    if references_pattern.search(processed):
        processed = references_pattern.sub(notes_markup, processed, count=1)
        processed = references_pattern.sub("", processed)
    else:
        processed += "\n\n==Footnotes==\n\n" + notes_markup
    # A stray closer with no matching opener would abort newer Pandoc.
    return re.sub(r"</ref\s*>", "", processed, flags=re.IGNORECASE)


def escape_unknown_html_tags(rendered: str) -> str:
    """Show BIP placeholders such as <pubkey> instead of creating DOM tags."""

    def replace_tag(match: re.Match[str]) -> str:
        tag = match.group(2).lower()
        if tag in STANDARD_HTML_TAGS:
            return match.group(0)
        if tag == "nowiki":
            return ""
        if tag == "poem":
            return "</div>" if match.group(1) else '<div class="bip-poem">'
        if tag in {"ref", "references"}:
            return ""
        return html.escape(match.group(0), quote=False)

    return re.sub(r"<\s*(/?)\s*([A-Za-z][A-Za-z0-9:-]*)(?:\s[^<>]*?)?/?>", replace_tag, rendered)


def normalize_ids(rendered: str) -> str:
    # Many MediaWiki BIPs add a manual span before a heading to obtain the
    # same GitHub-style anchor Pandoc now creates. Keep one ID, not two.
    rendered = re.sub(
        r"<p><span id=\"([^\"]+)\"></span></p>\s*(<h[1-6] id=\"\1\">)",
        r"\2",
        rendered,
    )

    def remove_nested_span(match: re.Match[str]) -> str:
        opening, heading_id = match.group(1), match.group(2)
        return opening if match.group(3) == heading_id else match.group(0)

    rendered = re.sub(
        r"(<h[1-6] id=\"([^\"]+)\">)\s*<span id=\"([^\"]+)\"></span>",
        remove_nested_span,
        rendered,
    )

    used: set[str] = set()

    def unique_id(match: re.Match[str]) -> str:
        original = html.unescape(match.group(1)).replace("_", " ")
        base = slug(original) or "section"
        value = base
        suffix = 1
        while value in used:
            suffix += 1
            value = f"{base}-{suffix}"
        used.add(value)
        return f'id="{value}"'

    return re.sub(r'id="([^"]+)"', unique_id, rendered)


def github_path_url(source_root: Path, relative: str, commit: str) -> str:
    clean = relative.removeprefix("./").split("#", 1)[0]
    fragment = relative[len(relative.split("#", 1)[0]) :]
    candidate = source_root / clean
    action = "tree" if candidate.is_dir() or clean.endswith("/") else "blob"
    return f"https://github.com/bitcoin/bips/{action}/{commit}/{quote(clean, safe='/')}" + fragment


def resolve_fragment(fragment: str, target_ids: set[str], target_number: int) -> str:
    if not fragment:
        return ""

    identifier = unquote(fragment.removeprefix("#")).split("|", 1)[0]
    identifier = re.sub(r"^user-content-", "", identifier, flags=re.IGNORECASE)
    normalized = slug(identifier.replace("_", " "))
    alternatives = [
        identifier,
        identifier.replace("_", "-"),
        normalized,
    ]

    legacy_reference = re.fullmatch(r"cite-ref-(\d+)-(\d+)", normalized)
    if legacy_reference:
        alternatives.append(
            f"bip-ref-{legacy_reference.group(1)}-{int(legacy_reference.group(2)) + 1}"
        )
    legacy_note = re.fullmatch(r"cite-note-(\d+)(?:-\d+)?", normalized)
    if legacy_note:
        alternatives.append(f"bip-note-{legacy_note.group(1)}")

    alias = LEGACY_FRAGMENT_ALIASES.get(target_number, {}).get(normalized)
    if alias:
        alternatives.append(alias)

    for alternative in alternatives:
        if alternative in target_ids:
            return "#" + alternative

    compact = re.sub(r"[^a-z0-9]", "", normalized)
    compact_matches = [
        target for target in target_ids
        if re.sub(r"[^a-z0-9]", "", target) == compact
    ]
    if len(compact_matches) == 1:
        return "#" + compact_matches[0]

    singular_matches = [
        target for target in target_ids
        if re.sub(r"[^a-z0-9]", "", target).removesuffix("s") == compact.removesuffix("s")
    ]
    if len(singular_matches) == 1:
        return "#" + singular_matches[0]
    return fragment


def rewrite_links(
    rendered: str,
    source_root: Path,
    commit: str,
    current_number: int,
    identifiers_by_bip: dict[int, set[str]],
) -> str:
    main_relative = re.compile(r"^(?:\./)?bip-(\d{4})\.(?:mediawiki|md)(#[^\s]*)?$")
    main_github = re.compile(
        r"^https://github\.com/bitcoin/bips/blob/(?:master|[0-9a-f]{40})/"
        r"bip-(\d{4})\.(?:mediawiki|md)(#[^\s]*)?$"
    )
    auxiliary = re.compile(r"^(?:\./)?(bip-(\d{4})(?:/(.*))?)$")

    # Categories are MediaWiki metadata rather than page content. Also undo a
    # MediaWiki-reader false positive where a literal "Message:\n" in source
    # code is interpreted as a link.
    rendered = re.sub(
        r'<p>\s*<a\s+href="Category:[^"]+"[^>]*>.*?</a>\s*</p>',
        "",
        rendered,
        flags=re.IGNORECASE | re.DOTALL,
    )
    rendered = re.sub(
        r'<a\s+href="Message:[^"]*"[^>]*>(.*?)</a>',
        r"\1",
        rendered,
        flags=re.IGNORECASE | re.DOTALL,
    )

    def replace_attribute(match: re.Match[str]) -> str:
        attribute = match.group(1)
        url = next(value for value in match.groups()[1:] if value is not None)

        main_match = main_relative.fullmatch(url) or main_github.fullmatch(url)
        if main_match:
            number = int(main_match.group(1))
            if number not in identifiers_by_bip:
                if url.startswith("https://"):
                    return match.group(0)
                return f'{attribute}="{github_path_url(source_root, url, commit)}"'
            fragment = resolve_fragment(
                main_match.group(2) or "", identifiers_by_bip[number], number
            )
            return f'{attribute}="/bip/{number}/{fragment}"'

        if url.startswith("#"):
            fragment = resolve_fragment(
                url, identifiers_by_bip[current_number], current_number
            )
            return f'{attribute}="{fragment}"'

        if url in {"README.mediawiki", "./README.mediawiki"}:
            return f'{attribute}="/bips/"'

        auxiliary_match = auxiliary.fullmatch(url)
        if auxiliary_match:
            relative, padded_number, remainder = auxiliary_match.groups()
            extension = Path((remainder or "").split("#", 1)[0]).suffix.lower()
            if extension in IMAGE_EXTENSIONS:
                number = int(padded_number)
                target = quote(str(remainder), safe="/#")
                return f'{attribute}="/bip/{number}/assets/{target}"'
            return f'{attribute}="{github_path_url(source_root, relative, commit)}"'

        shorthand = re.fullmatch(r"BIP[_-]0*(\d+)", url, re.IGNORECASE)
        if shorthand and int(shorthand.group(1)) in identifiers_by_bip:
            return f'{attribute}="/bip/{int(shorthand.group(1))}/"'

        if url.lower().startswith("bitcoin:"):
            return f'{attribute}="bitcoin:{url.split(":", 1)[1]}"'

        if re.fullmatch(r"bip-[A-Za-z0-9_-]+\.(?:mediawiki|md)(?:#.*)?", url):
            return f'{attribute}="{github_path_url(source_root, url, commit)}"'

        # Old MediaWiki page references are external to the BIP repository.
        # Point them at the Bitcoin Wiki instead of creating broken relative
        # links on bitcoin.org.
        if attribute == "href" and not re.match(r"^[A-Za-z][A-Za-z0-9+.-]*:", url):
            page, separator, fragment = url.partition("#")
            wiki_page = quote(page.replace(" ", "_"), safe="_-.()")
            wiki_fragment = "#" + quote(fragment, safe="_-.") if separator else ""
            return f'{attribute}="https://en.bitcoin.it/wiki/{wiki_page}{wiki_fragment}"'

        return match.group(0)

    rendered = re.sub(
        r"\b(href|src)=(?:\"([^\"]*)\"|'([^']*)'|([^\s>]+))",
        replace_attribute,
        rendered,
        flags=re.IGNORECASE,
    )

    # Avoid making a visitor's browser contact an unrelated image host. The
    # single current use is a licence badge; the linked licence remains.
    def external_image_link(match: re.Match[str]) -> str:
        tag = match.group(0)
        source_match = re.search(r'\bsrc="(https?://[^"]+)"', tag, re.IGNORECASE)
        alt_match = re.search(r'\balt="([^"]*)"', tag, re.IGNORECASE)
        assert source_match is not None
        label = alt_match.group(1).strip() if alt_match else "View externally hosted image"
        if not label:
            label = "View externally hosted image"
        return f'<a class="bip-external-image" href="{source_match.group(1)}">{label}</a>'

    rendered = re.sub(
        r'<img\b(?=[^>]*\bsrc="https?://[^"]+")[^>]*>',
        external_image_link,
        rendered,
        flags=re.IGNORECASE,
    )
    rendered = re.sub(
        r"<img\b(?![^>]*\bloading=)",
        '<img loading="lazy" decoding="async"',
        rendered,
        flags=re.IGNORECASE,
    )
    rendered = re.sub(r"</img\s*>", "", rendered, flags=re.IGNORECASE)

    def add_image_alt(match: re.Match[str]) -> str:
        tag = match.group(0)
        if re.search(r"\balt=", tag, re.IGNORECASE):
            return tag
        source_match = re.search(r'\bsrc="([^"]+)"', tag, re.IGNORECASE)
        filename = Path(source_match.group(1).split("?", 1)[0]).stem if source_match else "diagram"
        label = re.sub(r"[_-]+", " ", unquote(filename)).strip() or "diagram"
        alt = html.escape(f"BIP {current_number} illustration: {label}", quote=True)
        return re.sub(r"\s*/?>$", lambda end: f' alt="{alt}"{end.group(0)}', tag)

    rendered = re.sub(r"<img\b[^>]*>", add_image_alt, rendered, flags=re.IGNORECASE)
    return rendered


MASKED_INLINE = re.compile(
    r"<(code|tt|nowiki)\b[^>]*>.*?</\1\s*>", re.IGNORECASE | re.DOTALL
)
STRIPPED_BLOCKS = re.compile(
    r"<!--.*?-->|<pre\b[^>]*>.*?</pre\s*>", re.IGNORECASE | re.DOTALL
)


def count_source_table_cells(body: str) -> int:
    """Count the table cells a faithful rendering of this document must show.

    Comments and literal <pre> examples are excluded; pipes inside inline
    code are masked so an || operator is not miscounted as a cell separator.
    The count is a lower bound: renderers may add padding cells but must
    never drop content cells.
    """
    body = STRIPPED_BLOCKS.sub(" ", body)
    body = MASKED_INLINE.sub(lambda match: match.group(0).replace("|", " "), body)
    cells = 0
    for table in re.finditer(r"^\{\|.*?^\|\}", body, re.MULTILINE | re.DOTALL):
        for line in table.group(0).splitlines():
            line = line.strip()
            if not line or line.startswith(("{|", "|}", "|-", "|+")):
                continue
            if line.startswith("!"):
                # A lone full-width colspan header is rendered as a table
                # caption, not as a cell, so it is excluded from the bound.
                if re.match(r"!\s*colspan\s*=", line) and "!!" not in line:
                    continue
                parts = re.split(r"!!", line[1:])
            elif line.startswith("|"):
                parts = re.split(r"\|\|", line[1:])
            else:
                continue
            # Empty cells (upstream double-separator typos) are not required.
            cells += sum(1 for part in parts if part.strip())
    return cells


def validate_table_cell_parity(bip: "Bip") -> None:
    """Fail the build if rendering lost table cells (see jgm/pandoc#1696)."""
    expected = count_source_table_cells(bip.body)
    if not expected:
        return
    rendered = len(re.findall(r"<t[dh]\b", bip.rendered_html))
    if rendered < expected:
        raise BuildError(
            f"Table cells lost in {bip.filename}: the source contains "
            f"{expected} cells but only {rendered} were rendered"
        )


def validate_rendered_html(rendered: str, context: str) -> None:
    unsafe = UNSAFE_HTML.search(rendered)
    if unsafe:
        raise BuildError(f"Unsafe HTML in {context}: {unsafe.group(0)!r}")
    if "{% endraw %}" in rendered:
        raise BuildError(f"Liquid raw-block terminator found in {context}")

    identifiers = re.findall(r'\bid="([^"]+)"', rendered)
    duplicates = [name for name, count in collections.Counter(identifiers).items() if count > 1]
    if duplicates:
        raise BuildError(f"Duplicate HTML IDs in {context}: {', '.join(duplicates[:10])}")


class AbstractExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_h2 = False
        self.h2_text: list[str] = []
        self.after_abstract = False
        self.in_paragraph = False
        self.paragraph_text: list[str] = []
        self.result = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "h2" and not self.result:
            self.in_h2 = True
            self.h2_text = []
        elif tag == "p" and self.after_abstract and not self.result:
            self.in_paragraph = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "h2" and self.in_h2:
            heading = " ".join(self.h2_text).strip().lower()
            self.after_abstract = heading == "abstract"
            self.in_h2 = False
        elif tag == "p" and self.in_paragraph:
            self.result = re.sub(r"\s+", " ", " ".join(self.paragraph_text)).strip()
            self.in_paragraph = False

    def handle_data(self, data: str) -> None:
        if self.in_h2:
            self.h2_text.append(data)
        elif self.in_paragraph:
            self.paragraph_text.append(data)


def description_for(bip: Bip) -> str:
    extractor = AbstractExtractor()
    extractor.feed(bip.rendered_html)
    prefix = f"BIP {bip.number}: {bip.title}."
    description = f"{prefix} {extractor.result}" if extractor.result else prefix
    return textwrap.shorten(description, width=220, placeholder="…")


def parse_authors(raw: str) -> list[dict[str, str]]:
    authors = []
    for line in raw.splitlines():
        match = re.fullmatch(r"(.+?)\s*<([^<>]+)>", line.strip())
        if not match:
            raise BuildError(f"Unable to parse BIP author: {line!r}")
        authors.append({"name": match.group(1).strip(), "email": match.group(2).strip()})
    return authors


def parse_discussions(headers: dict[str, str]) -> list[dict[str, str]]:
    discussions = []
    for key in ("Discussion", "Comments-URI"):
        for line in headers.get(key, "").splitlines():
            match = re.search(r"https?://\S+", line)
            if not match:
                continue
            url = match.group(0)
            label = line[: match.start()].strip().rstrip(":") or key.replace("-", " ")
            discussions.append({"label": label, "url": url})
    return discussions


def parse_bip_numbers(value: str) -> list[int]:
    return [int(number) for number in re.findall(r"\b\d+\b", value)]


def yaml_value(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def page_front_matter(bip: Bip, commit: str, previous: Bip | None, following: Bip | None) -> str:
    headers = bip.headers
    source_url = f"https://github.com/bitcoin/bips/blob/{commit}/{bip.filename}"
    history_url = f"https://github.com/bitcoin/bips/commits/master/{bip.filename}"
    values: list[tuple[str, object]] = [
        ("layout", "bip"),
        ("lang", "en"),
        ("id", "bip"),
        ("hide_language_selector", True),
        ("title", f"BIP {bip.number}: {bip.title}"),
        ("description", bip.description),
        ("canonical_url", f"https://bitcoin.org/bip/{bip.number}/"),
        ("permalink", f"/bip/{bip.number}/"),
        ("bip_number", bip.number),
        ("bip_title", bip.title),
        ("bip_status", bip.status),
        ("bip_status_slug", bip.status_slug),
        ("bip_type", headers["Type"]),
        ("bip_layer", headers.get("Layer", "")),
        ("bip_assigned", headers["Assigned"]),
        ("bip_version", headers.get("Version", "")),
        ("bip_license", headers.get("License", "Not specified")),
        ("bip_license_code", headers.get("License-Code", "")),
        ("bip_authors", parse_authors(headers["Authors"])),
        ("bip_discussions", parse_discussions(headers)),
        ("bip_requires", parse_bip_numbers(headers.get("Requires", ""))),
        ("bip_replaces", parse_bip_numbers(headers.get("Replaces", ""))),
        ("bip_proposed_replacement", parse_bip_numbers(headers.get("Proposed-Replacement", ""))),
        ("bip_source_url", source_url),
        ("bip_history_url", history_url),
        ("bip_source_commit", commit),
        ("bip_previous", {"number": previous.number, "title": previous.title} if previous else None),
        ("bip_next", {"number": following.number, "title": following.title} if following else None),
    ]
    lines = ["---"]
    lines.extend(f"{key}: {yaml_value(value)}" for key, value in values)
    lines.append("---")
    return "\n".join(lines)


def write_bip_page(
    output_root: Path,
    bip: Bip,
    commit: str,
    previous: Bip | None,
    following: Bip | None,
) -> None:
    destination = output_root / str(bip.number) / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    front_matter = page_front_matter(bip, commit, previous, following)
    generated_note = (
        f"<!-- Generated from bitcoin/bips {commit}; the document retains "
        f"its declared {bip.headers.get('License', 'source')} licence. -->"
    )
    destination.write_text(
        f"{front_matter}\n{generated_note}\n{{% raw %}}\n"
        f"{bip.rendered_html}{{% endraw %}}\n",
        encoding="utf-8",
    )


def status_counts(bips: list[Bip]) -> collections.Counter[str]:
    return collections.Counter(bip.status for bip in bips)


def index_body(bips: list[Bip], commit: str) -> str:
    counts = status_counts(bips)
    status_options = "".join(
        f'<option value="{slug(status)}">{html.escape(status)} ({count})</option>'
        for status, count in sorted(counts.items())
    )
    rows = []
    for bip in bips:
        searchable = (
            f"{bip.number} {bip.title} {bip.status} {bip.headers['Type']} "
            f"{bip.headers.get('Layer', '')}"
        ).lower()
        rows.append(
            f'<tr class="bip-index-row" data-search="{html.escape(searchable, quote=True)}" '
            f'data-status="{bip.status_slug}" data-type="{bip.type_slug}">'
            f'<td class="bip-index-number"><a href="/bip/{bip.number}/">BIP {bip.number}</a></td>'
            f'<td class="bip-index-title"><a href="/bip/{bip.number}/">{html.escape(bip.title)}</a></td>'
            f'<td>{html.escape(bip.headers["Type"])}</td>'
            f'<td><span class="bip-status bip-status--{bip.status_slug}">'
            f"{html.escape(bip.status)}</span></td>"
            "</tr>"
        )

    return f"""
<section class="bip-index-intro" aria-labelledby="bip-index-heading">
  <div class="container">
    <p id="bip-index-heading">Browse {len(bips)} proposals mirrored from the
      <a href="https://github.com/bitcoin/bips">bitcoin/bips repository</a>.</p>
    <p class="bip-index-revision">Source revision
      <a href="https://github.com/bitcoin/bips/tree/{commit}"><code>{commit[:12]}</code></a>.</p>
  </div>
</section>

<section class="bip-index-browser" aria-label="BIP directory">
  <div class="container">
    <div class="bip-index-controls">
      <div class="bip-index-field bip-index-field--search">
        <label for="bip-search">Search by number, title, type or layer</label>
        <input id="bip-search" type="search" inputmode="search" autocomplete="off"
          placeholder="For example: 110, wallets, consensus">
      </div>
      <div class="bip-index-field">
        <label for="bip-status-filter">Status</label>
        <select id="bip-status-filter">
          <option value="">All statuses ({len(bips)})</option>
          {status_options}
        </select>
      </div>
    </div>

    <p id="bip-result-count" class="bip-result-count" aria-live="polite">Showing all {len(bips)} BIPs</p>
    <div class="bip-index-table-wrap">
      <table class="bip-index-table">
        <thead>
          <tr><th scope="col">Number</th><th scope="col">Title</th>
            <th scope="col">Type</th><th scope="col">Status</th></tr>
        </thead>
        <tbody>{''.join(rows)}</tbody>
      </table>
    </div>
    <p id="bip-no-results" class="bip-no-results" hidden>No BIPs match those filters.</p>
  </div>
</section>
""".strip()


def write_index(output_root: Path, bips: list[Bip], commit: str) -> None:
    front_matter = "\n".join(
        [
            "---",
            f"layout: {yaml_value('bip-index')}",
            f"lang: {yaml_value('en')}",
            f"id: {yaml_value('bip')}",
            "hide_language_selector: true",
            f"title: {yaml_value('Bitcoin Improvement Proposals')}",
            "description: "
            + yaml_value(
                "Browse Bitcoin Improvement Proposals by number, title, type and "
                "current repository status."
            ),
            f"canonical_url: {yaml_value('https://bitcoin.org/bips/')}",
            f"permalink: {yaml_value('/bips/')}",
            f"bip_count: {len(bips)}",
            f"bip_source_commit: {yaml_value(commit)}",
            "---",
        ]
    )
    (output_root / "index.html").write_text(
        f"{front_matter}\n{{% raw %}}\n{index_body(bips, commit)}\n{{% endraw %}}\n",
        encoding="utf-8",
    )


def validate_svg(path: Path) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    unsafe = UNSAFE_SVG.search(text)
    if unsafe:
        raise BuildError(f"Unsafe SVG construct in {path}: {unsafe.group(0)!r}")


def copy_assets(source_root: Path, output_root: Path, tracked_files: list[Path]) -> int:
    count = 0
    for source in tracked_files:
        relative_to_root = source.relative_to(source_root)
        if len(relative_to_root.parts) < 2:
            continue
        directory = relative_to_root.parts[0]
        directory_match = re.fullmatch(r"bip-(\d{4})", directory)
        if (
            directory_match is None
            or not source.is_file()
            or source.is_symlink()
            or source.suffix.lower() not in IMAGE_EXTENSIONS
        ):
            continue
        if source.suffix.lower() == ".svg":
            validate_svg(source)
        relative = Path(*relative_to_root.parts[1:])
        destination = output_root / str(int(directory_match.group(1))) / "assets" / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        count += 1
    return count


def build(
    config_path: Path,
    explicit_source: Path | None = None,
    output_override: Path | None = None,
) -> None:
    config = load_config(config_path)
    output_root = output_override or ROOT / str(config["output_directory"])

    if output_root.exists():
        shutil.rmtree(output_root)

    enabled_plugins = os.environ.get("ENABLED_PLUGINS")
    if enabled_plugins is not None and "bips" not in enabled_plugins.split():
        print("BIPs disabled")
        return

    ensure_pandoc_version()
    source_root, commit = ensure_source(config, explicit_source)
    tracked_files = tracked_source_files(source_root)
    source_paths = sorted(
        path for path in tracked_files
        if re.fullmatch(r"bip-\d{4}\.(?:mediawiki|md)", path.name)
        and path.parent == source_root
    )
    bips = sorted((parse_bip(path) for path in source_paths), key=lambda item: item.number)

    duplicate_numbers = [
        number
        for number, count in collections.Counter(bip.number for bip in bips).items()
        if count > 1
    ]
    if duplicate_numbers:
        raise BuildError(f"Duplicate BIP numbers: {duplicate_numbers}")
    expected_bip_count = int(config["expected_bip_count"])
    if len(bips) != expected_bip_count:
        raise BuildError(
            f"Found {len(bips)} BIPs, expected {expected_bip_count}; refusing a partial build"
        )

    output_root.mkdir(parents=True)
    for bip in bips:
        rendered = render_with_pandoc(bip, source_root)
        rendered = escape_unknown_html_tags(rendered)
        rendered = normalize_html_with_pandoc(rendered, source_root)
        rendered = restore_spanned_tables(rendered, bip.span_tables)
        rendered = wrap_document_tables(rendered)
        rendered = normalize_ids(rendered)
        validate_rendered_html(rendered, bip.filename)
        bip.rendered_html = rendered

    identifiers_by_bip = {
        bip.number: set(re.findall(r'\bid="([^"]+)"', bip.rendered_html)) for bip in bips
    }
    for bip in bips:
        bip.rendered_html = rewrite_links(
            bip.rendered_html,
            source_root,
            commit,
            bip.number,
            identifiers_by_bip,
        )
        validate_rendered_html(bip.rendered_html, bip.filename)
        validate_table_cell_parity(bip)
        bip.description = description_for(bip)

    for index, bip in enumerate(bips):
        previous = bips[index - 1] if index else None
        following = bips[index + 1] if index + 1 < len(bips) else None
        write_bip_page(output_root, bip, commit, previous, following)

    write_index(output_root, bips, commit)
    asset_count = copy_assets(source_root, output_root, tracked_files)
    expected_asset_count = int(config["expected_image_asset_count"])
    if asset_count != expected_asset_count:
        raise BuildError(
            f"Copied {asset_count} image assets, expected {expected_asset_count}; "
            "refusing a partial build"
        )
    print(f"Generated {len(bips)} BIP pages and copied {asset_count} image assets from {commit[:12]}")


class OutputInspector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.legacy_links: list[str] = []
        self.document_links: list[tuple[str, str]] = []
        self.images_without_alt: list[str] = []
        self.unsafe_document_html: list[str] = []
        self.found_bip_document = False
        self.in_bip_document = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        classes = (attributes.get("class") or "").split()
        if tag == "article" and "bip-document" in classes:
            self.found_bip_document = True
            self.in_bip_document = True
        if self.in_bip_document:
            unsafe = UNSAFE_HTML.search(self.get_starttag_text() or "")
            if unsafe:
                self.unsafe_document_html.append(unsafe.group(0))
        if attributes.get("id"):
            self.ids.append(str(attributes["id"]))
        for name in ("href", "src"):
            value = attributes.get(name) or ""
            if re.match(r"(?:\./)?bip-\d{4}(?:\.(?:md|mediawiki)|/)", value):
                self.legacy_links.append(value)
            if self.in_bip_document and value:
                self.document_links.append((name, value))
        if self.in_bip_document and tag == "img" and "alt" not in attributes:
            self.images_without_alt.append(str(attributes.get("src") or "unknown image"))

    def handle_endtag(self, tag: str) -> None:
        if tag == "article" and self.in_bip_document:
            self.in_bip_document = False


def check_output(config_path: Path, output_root: Path) -> None:
    config = load_config(config_path)
    enabled_plugins = os.environ.get("ENABLED_PLUGINS")
    if enabled_plugins is not None and "bips" not in enabled_plugins.split():
        print("BIP output check disabled")
        return

    pages = sorted(output_root.glob("[0-9]*/index.html"))
    expected_bip_count = int(config["expected_bip_count"])
    if len(pages) != expected_bip_count:
        raise BuildError(
            f"Found {len(pages)} rendered BIP pages in {output_root}; "
            f"expected {expected_bip_count}"
        )
    index_page = output_root.parent / "bips" / "index.html"
    if not index_page.is_file() or not (output_root / "110" / "index.html").is_file():
        raise BuildError("The BIP index or BIP 110 page was not rendered")

    inspectors: dict[int, OutputInspector] = {}
    identifiers_by_bip: dict[int, set[str]] = {}
    for page in pages:
        content = page.read_text(encoding="utf-8")
        inspector = OutputInspector()
        inspector.feed(content)
        if not inspector.found_bip_document:
            raise BuildError(f"Missing BIP document in {page}")
        if inspector.unsafe_document_html:
            raise BuildError(
                f"Unsafe HTML in BIP document {page}: "
                f"{inspector.unsafe_document_html[0]!r}"
            )
        duplicates = [name for name, count in collections.Counter(inspector.ids).items() if count > 1]
        if duplicates:
            raise BuildError(f"Duplicate IDs in {page}: {', '.join(duplicates[:10])}")
        if inspector.legacy_links:
            raise BuildError(f"Unrewritten BIP link in {page}: {inspector.legacy_links[0]}")
        if inspector.images_without_alt:
            raise BuildError(f"Image without alt text in {page}: {inspector.images_without_alt[0]}")
        number = int(page.parent.name)
        inspectors[number] = inspector
        identifiers_by_bip[number] = set(inspector.ids)

    for source_number, inspector in inspectors.items():
        for attribute, value in inspector.document_links:
            asset = re.fullmatch(r"/bip/(\d+)/assets/([^?#]+)(?:[?#].*)?", value)
            if asset:
                asset_root = output_root / asset.group(1) / "assets"
                asset_path = (asset_root / unquote(asset.group(2))).resolve()
                try:
                    asset_path.relative_to(asset_root.resolve())
                except ValueError as exc:
                    raise BuildError(f"Unsafe BIP asset path in BIP {source_number}: {value}") from exc
                if not asset_path.is_file():
                    raise BuildError(f"Missing BIP asset linked from BIP {source_number}: {value}")
                continue

            route = re.fullmatch(r"/bip/(\d+)/(?:#([^?]+))?", value)
            if route:
                target_number = int(route.group(1))
                if target_number not in identifiers_by_bip:
                    raise BuildError(f"Missing BIP route linked from BIP {source_number}: {value}")
                fragment = unquote(route.group(2) or "")
                if fragment and fragment not in identifiers_by_bip[target_number]:
                    raise BuildError(f"Missing BIP fragment linked from BIP {source_number}: {value}")
                continue

            if value.startswith("#"):
                fragment = unquote(value[1:])
                if fragment and fragment not in identifiers_by_bip[source_number]:
                    raise BuildError(f"Missing local fragment in BIP {source_number}: {value}")
                continue

            if not value.startswith("/") and not re.match(
                r"^[A-Za-z][A-Za-z0-9+.-]*:", value
            ):
                raise BuildError(
                    f"Ambiguous relative {attribute} URL in BIP {source_number}: {value}"
                )
    print(f"Verified {len(pages)} rendered BIP pages")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--source", type=Path, help="Use this exact pinned bitcoin/bips checkout")
    parser.add_argument("--output", type=Path, help="Override the generated source directory")
    parser.add_argument("--check-output", type=Path, help="Validate an already-rendered _site/bip directory")
    args = parser.parse_args()

    try:
        if args.check_output:
            check_output(args.config.resolve(), args.check_output.resolve())
        else:
            build(
                args.config.resolve(),
                args.source.resolve() if args.source else None,
                args.output.resolve() if args.output else None,
            )
    except BuildError as exc:
        print(f"BIP build error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
