## This file is licensed under the MIT License (MIT) available on
## http://opensource.org/licenses/MIT.

S=@  ## Silent: only print errors by default; 
     ## run `make S='' [other args]` to print commands as they're run

SITEDIR=_site
JEKYLL_LOG=._jekyll.log

#######################
## REGULAR ARGUMENTS ##
#######################

## `make` (no arguments): just build
default: build

## `make preview`: start the built-in Jekyll preview
preview:
	$S bundle exec jekyll serve

## `make test`: don't build, but do run all tests
test: pre-build-tests post-build-tests

## `make valid`: build and run fast tests
valid: pre-build-tests-fast build post-build-tests-fast

## `make all`: build and run all tests
all: pre-build-tests build post-build-tests

## `make deployment`: for use on build server
deployment: install-deps-deployment \
    valid

## `make travis`: for use with Travis CI
travis: travis-background-keepalive \
    install-deps-development \
    all




## Install dependencies (development version)
install-deps-development:
	bundle install

## Install dependencies (deployment version)
install-deps-deployment:
ifdef BUNDLE_DIR
	bundle install --deployment --without :slow_test --path=$(BUNDLE_DIR)
else
	bundle install --deployment --without :slow_test
endif

## Pre-build tests which, aggregated together, take less than 10 seconds to run on a typical PC
pre-build-tests-fast: check-for-non-ascii-urls check-for-wrong-filename-assignments \
    check-for-missing-rpc-summaries \
    check-for-missing-copyright-licenses \
    check-bundle \
    check-for-english-in-en-dir

## Post-build tests which, aggregated together, take less than 10 seconds to run on a typical PC
post-build-tests-fast: check-for-build-errors ensure-each-svg-has-a-png check-for-liquid-errors \
    check-for-missing-anchors check-for-broken-markdown-reference-links \
    check-for-broken-kramdown-tables check-for-duplicate-header-ids \
    check-for-headers-containing-auto-link check-for-missing-subhead-links \
    check-for-subheading-anchors \
    check-jshint \
    check-for-javascript-in-svgs

## All pre-build tests, including those which might take multiple minutes
pre-build-tests: pre-build-tests-fast
	@ true

## All post-build tests, including those which might take multiple minutes
post-build-tests: post-build-tests-fast \
    check-for-broken-bitcoin-core-download-links \
    check-html-proofer

## All manual updates to content that should be run by a human. This
## will create or update files which should then be diffed and commited.
## It's acceptable for this to overwrite existing content as long as the
## overwritten content is under version control
manual-updates: manual-update-summaries-file

## All manual checks that can be run by a human
manual-checks: manual-check-diff-sha256sums





#################
## SUB-TARGETS ##
#################
ERROR_ON_OUTPUT="sed '1s/^/ERROR:\n/' | if grep . ; then sed 1iERROR ; false ; else true ; fi"

## Always build using the default locale so log messages can be grepped.
## This should not affect webpage output.
build:
	$S export LANG=C.UTF-8 ; bundle exec jekyll build 2>&1 | tee $(JEKYLL_LOG)
	$S grep -r -L 'Note: this file is built non-deterministically' _site/ \
	  | egrep -v 'sha256sums.txt' \
	  | sort \
	  | xargs -d '\n' sha256sum > _site/sha256sums.txt
	$S git show --oneline > _site/commit.txt

## Jekyll annoyingly returns success even when it emits errors and
## exceptions, so we'll grep its output for error strings
#
## FIXME: temporarily ignoring errors from WEBrick because
## _plugin/remove-html-extension does something hackish until we upgrade
## to Jekyll 3.0.0
check-for-build-errors:
	$S egrep -i '(error|warn|exception)' $(JEKYLL_LOG) \
	    | grep -vi webrick.*filehandler \
	    | eval $(ERROR_ON_OUTPUT)


## Old browser support requires each SVG image also be available as a
## PNG with the same base name
ensure-each-svg-has-a-png:
	$S find $(SITEDIR)/img -name '*.svg' -type f | while read file \
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
	$S find $(SITEDIR) -name '*.html' -type f | xargs grep '\]\[' | eval $(ERROR_ON_OUTPUT)

check-for-non-ascii-urls:
## Always check all translated urls don't contain non-ASCII
## characters or spaces.
	$S find _translations -name '*.yml' -type f | while read file \
	    ; do grep -H . $$file | sed -n -e '/url:/,$$p' \
	    | grep -P ': +[a-z0-9\-]+: +.*([^\x00-\x7f]|[^a-z0-9\-"]).*$$' \
	; done | eval $(ERROR_ON_OUTPUT)

check-for-broken-kramdown-tables:
## Kramdown tables are easy to break. When broken, they produce a
## paragraph starting with a | (pipe). I can't imagine any reason we'd
## have a regular paragraph starting with a pipe, so error on any occurences.
	$S grep '<p[^>]*>|' _site/en/developer-* | eval $(ERROR_ON_OUTPUT)


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
	$S find . -name '*.md' -type f \
	   | xargs grep 'assign *filename' \
	   | grep -v '^\./\(.*\):{.*filename=.\1"' \
	   | eval $(ERROR_ON_OUTPUT)

check-for-missing-copyright-licenses:
## Error on any files in the _includes directory that don't include a
## statement that looks like a copyright license. (It doesn't have to
## say MIT license, but it has to say something.) This can be extended
## to include other directories by adding them after "_includes/"
	$S git grep -iL 'This file is licensed' _includes/ | eval $(ERROR_ON_OUTPUT)
	$S git ls-files | grep -v '^_alerts' \
          | while read file ; do \
            if sed -n 1p $$file | grep -q '^---$$' ; then \
              grep -iL 'This file is licensed' $$file ; \
            fi ; \
          done | eval $(ERROR_ON_OUTPUT)

check-for-missing-rpc-summaries:
## Make sure the Quick Reference section has a summary for each RPC we
## have documented
	$S for f in _includes/ref/bitcoin-core/rpcs/rpcs/*.md ;\
	do grep -q "\[$$( grep '^##### ' $$f | sed 's/^##### *\([a-zA-Z]*\).*/\1/')\]\[" _includes/ref/bitcoin-core/rpcs/quick-ref.md \
	|| echo 'missing summary for '$$f', you need to add the summary to _includes/ref/bitcoin-core/rpcs/quick-ref.md and run make manual-updates' \
	; done | eval $(ERROR_ON_OUTPUT)

manual-update-summaries-file:
## A manually-run command to update the summaries file (currently only
## used for RPC summaries, but maybe used for other summaries in the
## future)
	$S echo "{%comment%}AUTOMATICALLY-GENERATED FILE: DO NOT EDIT THIS FILE" > _includes/helpers/summaries.md
	$S echo "This file is licensed under the terms of its source texts{%endcomment%}" >> _includes/helpers/summaries.md
	$S grep -rh --exclude='*summaries.md' 'assign summary_' _includes/ | LANG=UTF-8 sort >> _includes/helpers/summaries.md

manual-check-diff-sha256sums:
## A manually-run command to check the locally-built
## _site/sha256sums.txt file against the same file on the webserver to
## see if any files were built differently upstream from what we have
## locally
	$S echo "Files listed below (if any) have different hashes"
	$S curl -s -o- https://bitcoin.org/sha256sums.txt \
	  | sort - _site/sha256sums.txt \
	  | uniq -u \
	  | sort -k2

check-for-broken-bitcoin-core-download-links:
## Ensure that the links from the Download page to the current Bitcoin
## Core binaries are correct
	$S grep 'class="dl"' _site/en/download.html \
	  | sed 's/.*href="//; s/".*//' \
	  | while read url ; do \
	    if [ "$${url##http*}" ]; then \
	      curl -sI "https://bitcoin.org$$url" ; \
	    else \
	      curl -sI "$$url" ; \
	    fi | grep -q '200 OK' || echo "Error: Could not retrieve $$url" ; \
	  done | eval $(ERROR_ON_OUTPUT)

check-html-proofer:
	$S bundle exec ruby _contrib/bco-htmlproof

check-jshint:
	$S bundle exec ruby _contrib/jshint | eval $(ERROR_ON_OUTPUT)

check-bundle:
## Ensure all the dependencies are installed. If you build without this
## check, you'll get confusing error messages when your deps aren't up
## to date
	$S ! bundle check | grep -v "The Gemfile's dependencies are satisfied"

travis-background-keepalive:
	$S { while ps aux | grep -q '[m]ake' ; do echo "Ignore me: Travis CI keep alive" ; sleep 1m ; done ; } &

check-for-subheading-anchors:
## Ensure all subheadings on the site have anchors so the Javascript
## function addAnchorLinks() can add anchor link affordance to each
## subhead
	$S grep -r -i --include \*.html -L 'Note: this file exempt from check-for-subheading-anchors check' _site/ \
	  | xargs grep '<h[23456]' \
	  | grep -v '<h[23456][^>]* id=' | eval $(ERROR_ON_OUTPUT)

check-for-javascript-in-svgs:
## Security check: don't allow any SVGs that contain Javascript.
	$S find _site/ -name '*.svg' -type f | xargs grep '<script' | eval $(ERROR_ON_OUTPUT)

check-for-english-in-en-dir:
## All pages must have page.lang set to work properly with the site templates
	$S grep -rl -- '---' en/ | xargs grep -L '^ *lang: *en' | eval $(ERROR_ON_OUTPUT)
