#!/bin/bash

REPO=git://github.com/bitcoin/bitcoin.org.git
DESTREPO=git@github.com:bitcoin/bitcoin.github.com.git

WORKDIR=`mktemp -d`
DESTDIR=`mktemp -d`

# Stop script in case a single command fails
set -e

# Cleanup on EXIT (even when a command fails)
trap "rm -rf $WORKDIR $DESTDIR; exit 1" EXIT

export PATH=/var/lib/gems/1.8/bin/:$PATH

git clone $REPO $WORKDIR        

cd $WORKDIR

git pull origin master
git reset --hard
git clean -x -f -d
mkdir _site/

jekyll

git clone $DESTREPO $DESTDIR

COMMITMSG="jekyll build on `date -R` from `git log --oneline|head -n1`"

cd $DESTDIR

git pull origin master
git reset --hard
git clean -x -f -d

rsync --exclude=.git/ --delete -a $WORKDIR/_site/ $DESTDIR

git add .
git commit -a -m "$COMMITMSG"
git push origin master

