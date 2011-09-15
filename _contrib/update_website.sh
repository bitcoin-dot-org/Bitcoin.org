#!/bin/bash

REPO=git://github.com/bitcoin/bitcoin.org.git
WORKDIR=/tmp/bitcoin.org/
DESTDIR=/var/www/

JEKYLL=/var/lib/gems/1.8/bin/jekyll

if test ! -d $WORKDIR; then
	git clone $REPO $WORKDIR	
fi

cd $WORKDIR

git pull origin master

git reset --hard

git clean -x -f

$JEKYLL

rsync --delete -a $WORKDIR/_site/ $DESTDIR

