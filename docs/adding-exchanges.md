## Adding Exchanges

Exchanges seeking to be added to Bitcoin.org should add themselves to the
appropriate section(s) of `_templates/exchanges.html` and open a
[pull request](https://github.com/bitcoin-dot-org/bitcoin.org/pull/new/master).

If you are not comfortable opening a pull request, you can instead open a
[new issue](https://github.com/bitcoin-dot-org/bitcoin.org/issues/new)
requesting to be added.

### How the Listings Are Organized

`_templates/exchanges.html` is organized into ten top-level sections:

+ **International** and **Peer-to-Peer (P2P)** — non-geographic category
  sections. Exchanges are listed directly under the section heading, with
  no country subdivision.
+ **Asia**, **Europe**, **Africa**, **North America**, **Central America &
  Caribbean**, and **South America** — continental sections subdivided by
  country. Each country has its own `<h3>` heading and flag SVG, with exchanges
  listed underneath.
+ **Australia** and **New Zealand** — country-level sections (no continental
  grouping). Exchanges are listed directly under the section heading, same
  flat structure as International and P2P.

For sections with country subdivision, adding a new country requires placing
the country's flag SVG at `/img/flags/XX.svg` (where `XX` is the ISO 3166-1
alpha-2 code) and referencing it from the country block. Use an existing
country block as a guide.

### Build Checks

Once a pull request is opened, a [Travis CI](https://app.travis-ci.com/bitcoin-dot-org/bitcoin.org)
check runs against it. The status (passing or failing) is shown directly
on the pull request page; clicking through the check provides the full
build log. If the build fails, please read the log and address the issue
before requesting review.

### Review Criteria

Exchanges are reviewed before potentially being added to the site, focusing
on the following areas:

+ Site functionality
+ Operational processes
+ Rates and fees
+ Order book
+ Policies, terms and conditions
+ Press and community feedback
+ Leadership

Once added, exchanges are also re-reviewed at regular intervals in order to
maintain quality assurance in-line with the above, and may be removed should
severe and/or unresolved issues be encountered.
