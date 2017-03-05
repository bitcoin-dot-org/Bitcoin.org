## Working With GitHub

GitHub allows you to make changes to a project using git, and later submit them
in a "pull request" so they can be reviewed and discussed. Many online how-tos
exist so you can learn git, [here's a good
one](https://www.atlassian.com/git/tutorial/git-basics).

In order to use GitHub, you need to [sign up](http://github.com/signup) and [set
up git](https://help.github.com/articles/set-up-git). You will also need to
click the **Fork** button on the bitcoin.org [GitHub
page](https://github.com/bitcoin-dot-org/bitcoin.org) and clone your GitHub
repository into a local directory with the following command lines:

```
git clone (url provided by GitHub on your fork's page) bitcoin.org
cd bitcoin.org
git remote add upstream https://github.com/bitcoin-dot-org/bitcoin.org.git
```

**How to send a pull request**

1. Checkout to your master branch. `git checkout master`
2. Create a new branch from the master branch. `git checkout -b (any name)`
3. Edit files and [preview](#previewing) the result.
4. Track changes in files. `git add -A`
5. Commit your changes. `git commit -m '(short description for your change)'`
6. Push your branch on your GitHub repository. `git push origin (name of your
   branch)`
7. Click on your branch on GitHub and click the **Compare / pull request**
   button to send a pull request.

When submitting a pull request, please take required time to discuss your
changes and adapt your work. It is generally a good practice to split unrelated
changes into separate branches and pull requests.

**Travis Continuous Integration (CI)**

Shortly after your Pull Request (PR) is submitted, a Travis CI job will
be added to [our queue](https://travis-ci.org/bitcoin-dot-org/bitcoin.org). This
will build the site and run some basic checks. If the job fails, you
will be emailed a link to the build log and the PR will indicate a
failed job. Read the build report and try to correct the problem---but
if you feel confused or frustrated, please ask for help on the PR (we're
always happy to help).

If you don't want a particular commit to be tested, add `[ci skip]`
anywhere in its commit message.

If you'd like to setup Travis on your own repository so you can test
builds before opening a pull request, it's really simple:

1. Make sure the master branch of your repository is up to date with the
   bitcoin-dot-org/bitcoin.org master branch.

2. Open [this guide](http://docs.travis-ci.com/user/getting-started/)
   and perform steps one, two, and four. (The other steps are already
   done in our master branch.)

3. After you push a branch to your repository, go to your branches page
   (e.g. for user harding, github.com/harding/bitcoin.org/branches). A
   yellow circle, green checkmark, or red X will appear near the branch
   name when the build finishes, and clicking on the icon will take you
   to the corresponding build report.

**How to make additional changes in a pull request**

You simply need to push additional commits on the appropriate branch of your
GitHub repository. That's basically the same steps as above, except you don't
need to re-create the branch and the pull request.

**How to reset and update your master branch with latest upstream changes**

1. Fetch upstream changes. `git fetch upstream`
2. Checkout to your master branch. `git checkout master`
3. Replace your master branch by the upstream master branch. `git reset --hard
   upstream/master`
4. Replace your master branch on GitHub. `git push origin master -f`

**Advanced GitHub Workflow**

If you continue to contribute to Bitcoin.org beyond a single pull
request, you may want to use a more [advanced GitHub
workflow](https://gist.github.com/harding/1a99b0bad37f9498709f).
