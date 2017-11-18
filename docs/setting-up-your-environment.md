## Setting Up Your Environment

#### Preview Small Text Changes

Simple text changes can be previewed live on bitcoin.org. You only need to click
anywhere on the page and hold your mouse button for one second. You'll then be
able to edit the page just like a document. Changes will be lost as soon as the
page is refreshed.

#### Build The Site Locally

For anything more than simple text previews, you will need to build the
site. If you can't do this yourself using the instructions below, please
[open a pull request](https://github.com/bitcoin-dot-org/bitcoin.org/compare)
with your suggested change and one of the site developers will create a preview
for you.

To build the site, you need to go through a one-time installation
procedure that takes 15 to 30 minutes.  After that you can build the
site an unlimited number of times with no extra work.

##### Install The Dependencies

Before building the site, you need to install the following
dependencies and tools, which are pretty easy on any modern Linux:

**Install binary libraries and tools**

On recent versions of Ubuntu and Debian, you can run the following
command to ensure you have the required libraries, headers, and tools:

    sudo apt-get install build-essential git libicu-dev zlib1g-dev

**Install RVM**

Install RVM using either the [easy instructions](https://rvm.io/) or the
[more secure instructions](https://rvm.io/rvm/security).

Read the instructions printed to your console during setup to enable the
`rvm` command in your shell.  After installation, you need to run the
following command:

    source ~/.rvm/scripts/rvm

**Install Ruby 2.4.1**

To install Ruby 2.4.1, simply run this command:

    rvm install 2.4.1

Sometimes this will find a pre-compiled Ruby package for your Linux
distribution, but sometimes it will need to compile Ruby from scratch
(which takes about 15 minutes).

After Ruby 2.4.1 is installed, make it your default Ruby:

    rvm alias create default ruby-2.4.1

And tell your system to use it:

    rvm use default

(Note: you can use a different default Ruby, but if you ever change
your default Ruby, you must re-run the `gem install bundle` command
described below before you can build the site. If you ever receive a
"eval: bundle: not found" error, you failed to re-run `gem install
bundle`.)

**Install Bundle**

When you used RVM to install Ruby, it also installed the `gem` program.
Use that program to install bundle:

    gem install bundle

**Install the Ruby dependencies**

Ensure you checked out the site repository as described in [Working with
GitHub](https://github.com/bitcoin-dot-org/bitcoin.org/blob/master/docs/working-with-github.md).
Then change directory to the top-level of your local repository (replace
`bitcoin.org` with the full path to your local repository clone):

    cd bitcoin.org

And install the necessary dependencies using Bundle:

    bundle install

Note that some of the dependencies (particularly nokogiri) can take a
long time to install on some systems, so be patient.

Once Bundle completes successfully, you can preview or build the site.

##### Preview The Site

To preview the website in your local browser, make sure you're in the
`bitcoin.org` directory and run the following command:

    make preview

This will compile the site (takes 5 to 10 minutes; see [the speed-up
instructions](#fast-partial-previews-or-builds)) and then print a
message like this:

    Server address: http://0.0.0.0:4000
    Server running... press ctrl-c to stop.

Visit the indicated URL in your browser to view the site.

##### Build The Site

To build the site exactly like we do for the deployment server, make
sure you're in the `bitcoin.org` directory and run:

    make

The resulting HTML for the entire site will be placed in the `_site`
directory.  The following alternative options are available:

    ## After you build the site, you can run all of the tests (may take awhile)
    make test

    ## Or you can build the site and run some quick tests with one command:
    make valid

    ## Or build the site and run all tests
    make all

#### Fast Partial Previews Or Builds

In order to preview some changes faster, you can disable all plugins and
languages except those you need by prefixing the `ENABLED_LANGS` and
`ENABLED_PLUGINS` environment variables to your command line.  For
example, do this to disable everything:

    ## Fast preview, takes less than 30 seconds
    ENABLED_PLUGINS="" ENABLED_LANGS="" make preview

    ## Fast build and tests, takes less than 50 seconds
    ## Some tests may fail in fast mode; use -i to continue despite them
    ENABLED_PLUGINS="" ENABLED_LANGS="" make -i valid

Then to enable some plugins or languages, you can add them back in.
For example:

    ## Slower (but still pretty fast) build and test
    ENABLED_PLUGINS="events autocrossref" ENABLED_LANGS="en fr" make -i valid

Plugins include:

| Plugin       | Seconds | Remote APIs    | Used For
|--------------|---------|----------------|------------------------
| alerts       | 5       | --             | Network alert pages
| autocrossref | 90      | --             | Developer documentation
| contributors | 5       | GitHub.com     | Contributor listings
| events       | 5       | Google Maps    | Events page
| glossary     | 30      | --             | Developer glossary
| redirects    | 20      | --             | Redirects from old URLs
| releases     | 10      | --             | Bitcoin Core release notes; Download
page
| sitemap      | 10      | --             | /sitemap.xml

Notes: some plugins interact with each other or with translations; for example
running
'autocrossref' and 'glossary' takes longer than running each other
separately. Also, plugins that use remote APIs may take a long time to
run if the API site is running slow.

For a list of languages, look in the `_translations` directory.

#### Publishing Previews

You can publish your previews online to any static hosting service.
[GitHub pages](https://pages.github.com/) is a free service available to
all GitHub users that works with Bitcoin.org's site hierarchy.

Before building a preview site, it is recommended that you set the
environmental variable `BITCOINORG_BUILD_TYPE` to "preview".  This will
enable some content that would otherwise be hidden and also create a
robots.txt file that will help prevent the site from being indexed by
search engines and mistaken for the actual Bitcoin.org website.

In the bash shell, you can do this by running the following command line
before building you preview:

    export BITCOINORG_BUILD_TYPE=preview

You can also add this line to your `~/.bashrc` file if you frequently
build site previews so that you don't have to remember to run it for
each shell.
