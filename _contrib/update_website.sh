#!/bin/bash

REPO=git://github.com/bitcoin/bitcoin.org.git
DESTREPO=git@github.com:bitcoin/bitcoin.github.com.git
WORKDIR=/tmp/bitcoin.org/
DESTDIR=/var/www/

export PATH=/var/lib/gems/1.8/bin/:$PATH

if test ! -d $WORKDIR; then
	git clone $REPO $WORKDIR	
fi

cd $WORKDIR

git pull origin master
git reset --hard
git clean -x -f -d
mkdir _site/

jekyll

if test ! -d $DESTDIR/.git/; then
	rm -r $DESTDIR/*
	git clone $DESTREPO $DESTDIR
fi

COMMITMSG="jekyll build on `date -R` from `git log --oneline|head -n1`"

cd $DESTDIR

git pull origin master
git reset --hard
git clean -x -f -d

rsync --exclude=.git/ --delete -a $WORKDIR/_site/ $DESTDIR

git add .
git commit -a -m "$COMMITMSG"
git push origin master
