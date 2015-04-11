#!/bin/bash

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/bin

export PATH=/var/lib/gems/1.8/bin/:$PATH

REPO='https://github.com/bitcoin/bitcoin.org.git'
SITEDIR='/bitcoin.org/site'
DESTDIR='build@bitcoinorgsite:/var/www/site'
WORKDIR=`mktemp -d`

# Stop script in case a single command fails
set -e

# Cleanup on EXIT and kill all subprocesses (even when a command fails)
trap "rm -rf $WORKDIR; kill 0; exit 1;" EXIT
trap "rm -rf $WORKDIR; kill 0;" SIGINT

# Clone repository if missing
if [ ! -d $SITEDIR ]; then
	git clone $REPO $SITEDIR
	cd $SITEDIR
	git reset --hard HEAD~1
fi

# Exit if no new commit is available
cd $SITEDIR
git fetch -a
LASTLOCALCOMMIT=`git log --format="%H" | head -n1`
LASTREMOTECOMMIT=`git log origin/master --format="%H" | head -n1`
if [ $LASTLOCALCOMMIT == $LASTREMOTECOMMIT ]; then
	exit
fi

# Update local branch
git reset --hard origin/master
git clean -x -f -d

# Copy files to temporary directory
rsync -rt --delete "$SITEDIR/" "$WORKDIR/"

# Get last modification time for _buildlock
touch "$SITEDIR/_buildlock"
lasttime=`stat -c %Y "$SITEDIR/_buildlock" | cut -d ' ' -f1`

# Build website in a child process
(
cd $WORKDIR
make valid && touch "$WORKDIR/_builddone" || touch "$WORKDIR/_buildfail"
)&

# Loop every 1 second to check status
while true
do

	# Exit if site has been failed to build
	if [ -e "$WORKDIR/_buildfail" ]; then
		echo "Build failed"
		exit
	fi

	# Update site and exit if site has been successfully built
	if [ -e "$WORKDIR/_builddone" ]; then
		rsync --delete -zrt $WORKDIR/_site/ $DESTDIR/
		exit
	fi

	# Cancel script if a concurrent script has touched _buildlock
	time=0
	if [ -e "$SITEDIR/_buildlock" ]; then
		time=`stat -c %Y "$SITEDIR/_buildlock" | cut -d ' ' -f1`
	fi
	if [ $time != $lasttime ]; then
		echo "Build cancelled"
		exit
	fi
	sleep 1

done
