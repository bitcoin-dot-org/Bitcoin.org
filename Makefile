## Optional Makefile: only used for testing & maintainer automation;
##                    not used to build live site

S=@  ## Silent: only print errors by default; 
     ## run `make S='' [other args]` to print commands as they're run

## Old versions of jekyll must not call "build".  If you have one of
## these versions, either run make like this: make JEKYLL_COMMAND=jekyll
## or create the JEKYLL_COMMAND environmental variable:
# echo 'export JEKYLL_COMMAND=jekyll' >> ~/.bashrc
# exec bash
# make
JEKYLL_COMMAND ?= "bundle exec jekyll build"
SITEDIR=_site
JEKYLL_LOG=._jekyll.log

#######################
## REGULAR ARGUMENTS ##
#######################

## `make` (no arguments): just build
default: build

## `make test`: don't build, but do run all tests
test: pre-build-tests post-build-tests

## `make valid`: build and run fast tests
valid: pre-build-tests-fast build post-build-tests-fast

## `make all`: build and run all tests
all: pre-build-tests build post-build-tests



## Pre-build tests which, aggregated together, take less than 5 seconds to run on a typical PC
pre-build-tests-fast: check-for-non-ascii-urls check-for-wrong-filename-assignments

## Post-build tests which, aggregated together, take less than 5 seconds to run on a typical PC
post-build-tests-fast: check-for-build-errors ensure-each-svg-has-a-png check-for-liquid-errors \
    check-for-missing-anchors check-for-broken-markdown-reference-links \
    check-for-broken-kramdown-tables check-for-duplicate-header-ids \
    check-for-headers-containing-auto-link check-for-missing-subhead-links

## All pre-build tests, including those which might take multiple minutes
pre-build-tests: pre-build-tests-fast
	@ true

## All post-build tests, including those which might take multiple minutes
post-build-tests: post-build-tests-fast
	@ true ## SOMEDAY: use linkchecker to find broken links 
	@      ## after this bug is fixed: https://github.com/wummel/linkchecker/issues/513





#################
## SUB-TARGETS ##
#################
ERROR_ON_OUTPUT="sed '1s/^/ERROR:\n/' | if grep . ; then sed 1iERROR ; false ; else true ; fi"

## Always build using the default locale so log messages can be grepped.
## This should not affect webpage output.
build:
	$S export LANG=C.UTF-8 ; eval $(JEKYLL_COMMAND) 2>&1 | tee $(JEKYLL_LOG)


## Jekyll annoyingly returns success even when it emits errors and
## exceptions, so we'll grep its output for error strings
check-for-build-errors:
	$S egrep -i '(error|warn|exception)' $(JEKYLL_LOG) \
	    | eval $(ERROR_ON_OUTPUT)


## Old browser support requires each SVG image also be available as a
## PNG with the same base name
ensure-each-svg-has-a-png:
	$S find $(SITEDIR)/img -name '*.svg' | while read file \
	    ; do test -f $${file%.svg}.png || echo "$$file missing corresponding PNG" \
	; done | eval $(ERROR_ON_OUTPUT)

	
## Some Jekyll errors leave error messages in the text
check-for-liquid-errors:
	$S grep -r 'Liquid syntax error:' $(SITEDIR)/ | eval $(ERROR_ON_OUTPUT)


## Report missing anchors for local links defined in the references file.
#
## Takes less than 1 second here as of 2014-05-16 -harding
check-for-missing-anchors:
	$S sed -n 's!^\[[^]]*]: \+!!; s/ .*//; /#/s!^/!!p' _includes/references.md \
	    | sort -u \
	    | while read link ; do file="$(SITEDIR)/$${link%#*}.html" \
	        ; anchor="$${link##*#}" \
	        ; egrep -ql '(id|name)=.'$$anchor'[^a-zA-Z0-9_-]' $$file \
	        || echo "$$file#$$anchor not found" \
	    ; done | eval $(ERROR_ON_OUTPUT)

check-for-broken-markdown-reference-links:
## Report Markdown reference-style links which weren't converted to HTML
## links in the output, indicating there's no reference definition
	$S find $(SITEDIR) -name '*.html' | xargs grep '\]\[' | eval $(ERROR_ON_OUTPUT)

check-for-non-ascii-urls:
## Always check all translated urls don't contain non-ASCII
## characters or spaces.
	$S find _translations -name '*.yml' | while read file \
	    ; do grep -H . $$file | sed -n -e '/url:/,$$p' \
	    | grep -P ': +[a-z0-9\-]+: +.*([^\x00-\x7f]|[^a-z0-9\-"]).*$$' \
	; done | eval $(ERROR_ON_OUTPUT)

check-for-broken-kramdown-tables:
## Kramdown tables are easy to break. When broken, they produce a
## paragraph starting with a | (pipe). I can't imagine any reason we'd
## have a regular paragraph starting with a pipe, so error on any occurences.
	$S grep '<p>|' _site/en/developer-* | eval $(ERROR_ON_OUTPUT)


check-for-duplicate-header-ids:
## When Kramdown automatically creates header id tags, it avoids using
## the same id="" as a previous header by silently appending '-1' to the
## second-occuring header. We want an error when this happens because
## all links which previously pointed to the second-occuring header now
## point to the first-occuring header. (Example: before this test was
## written, links pointing to the ping RPC were silently redirected when
## the P2P ping message was added to the page.) The pattern below will
## report a false positive if we legitimately have an id ending in '-1',
## but that should be easy to work around if it ever happens.
	$S grep '<h[1-6][^>]\+id="[^"]\+-1"' _site/en/developer-* | eval $(ERROR_ON_OUTPUT)

check-for-headers-containing-auto-link:
## The autocrossref plugin can mess up subheadings (h2, etc), so ensure
## none of the generated subheadings contain the string
## 'class="auto-link"' produced by autocrossref
	$S grep '<\(h[2-6]\).*\?>[^>]\+class="auto-link".*</\1>' _site/en/developer-* | eval $(ERROR_ON_OUTPUT)

check-for-missing-subhead-links:
## Make sure each subhead (h2-h6) either has the subhead links
## (edit,issue,etc) or something like <!-- no subhead-links here -->
	$S egrep -n -A1 '<h[2-6]' _site/en/developer-* \
	   | egrep -v 'developer-documentation|<h[2-6]|^--|subhead-links' \
	   | eval $(ERROR_ON_OUTPUT)

check-for-wrong-filename-assignments:
## Make sure whenever we use {% assign filename="some-file" %} that the
## filename assignment matches the actual filename. This will, in
## particular, help catch mistakes when we move files
	$S find . -name '*.md' \
	   | xargs grep 'assign *filename' \
	   | grep -v '^\./\(.*\):{.*filename=.\1"' \
	   | eval $(ERROR_ON_OUTPUT)
