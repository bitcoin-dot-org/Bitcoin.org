#!/bin/bash

REPO='https://github.com/bitcoin/bitcoin.org.git'
WORKDIR='/bitcoin.org'
DESTDIR='/var/www/bitcoinorg'

# Stop script in case a single command fails
set -e

export PATH=/var/lib/gems/1.8/bin/:$PATH

# Clone repository if missing
if [ ! -d $WORKDIR ]; then
	git clone $REPO $WORKDIR
	cd $WORKDIR
	git reset --hard HEAD~1
fi

cd $WORKDIR

# Exit if no new commit is available
git fetch -a
LASTLOCALCOMMIT=`git log --format="%H" | head -n1`
LASTREMOTECOMMIT=`git log origin/master --format="%H" | head -n1`
if [ $LASTLOCALCOMMIT == $LASTREMOTECOMMIT ]; then
	exit
fi

# Update local branch
git reset --hard origin/master
git clean -x -f -d

# Build website
jekyll
rsync --delete -a $WORKDIR/_site/ $DESTDIR/
