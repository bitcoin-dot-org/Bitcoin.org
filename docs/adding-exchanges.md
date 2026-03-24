## Adding Exchanges

Exchanges seeking to be added to Bitcoin.org should add themselves to the
respective area(s) they serve in `exchanges.html` in the `_templates` directory,
via [pull request](https://github.com/bitcoin-dot-org/bitcoin.org/pull/new/master).

Shortly after the pull request is made, a Travis CI job will be added to [our
queue](https://travis-ci.org/bitcoin-dot-org/bitcoin.org). This will build the
site and run some basic checks. If the job fails, you will be emailed a link to
the build log and the pull request will indicate a failed job. Please read the
build report and try to correct the problem.

If you're not comfortable with GitHub pull requests, please open a
[new issue](https://github.com/bitcoin-dot-org/bitcoin.org/issues/new) requesting
to be added.

### Review Criteria

Exchanges are reviewed before potentially being added to the site, focusing on
the following areas:

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
