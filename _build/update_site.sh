#!/bin/bash

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/bin

AUTHORIZED_SIGNERS_DIR='/bitcoin.org/auto-build-committers.gnupg'
REPO='https://github.com/bitcoin-dot-org/bitcoin.org.git'
BUNDLE_DIR='/bitcoin.org/bundle'
SITEDIR='/bitcoin.org/site'
DESTDIR='build@bitcoinorgsite:/var/www/site'
LAST_SUCCESSFUL_BUILD_COMMITISH_FILE=/bitcoin.org/last-successful-build-commitish
WORKDIR=`mktemp -d`

## Parameters
BUILD_TYPE="${1:-nil}"
BUILD_COMMITISH="${2:-origin/master}"

export BUNDLE_DIR

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

# Get commit data
cd $SITEDIR
git fetch -a
LASTLOCALCOMMIT=`git log --format="%H" | head -n1`
LASTREMOTECOMMIT=`git log "$BUILD_COMMITISH" --format="%H" | head -n1`

# Update local branch
git reset --hard "$LASTREMOTECOMMIT"
git clean -x -f -d

## Whether to auto-build or force-build
case "$BUILD_TYPE" in
  auto)
    ## From git-log(1):
    ## %G?: show "G" for a Good signature, "B" for a Bad signature, "U"
    ## for a good, untrusted signature and "N" for no signature
    if ! GNUPGHOME=$AUTHORIZED_SIGNERS_DIR git log --format='%G?' -1 | egrep -q '^(G|U)$'
    then
      echo "Commit tree tip not signed by an authorized signer.  Terminating build."
      exit 1
    fi

    ## Don't auto build if we already had this commit
    if [ $LASTLOCALCOMMIT == $LASTREMOTECOMMIT ]; then
            exit
    fi
  ;;

  force)
    true
  ;;

  *)
    echo "$0 <auto|force>"
    echo
    echo "auto: only builds if the latest commit is GPG signed by an authorized key"
    echo "force: builds latest commit no matter what"
    exit 1
  ;;
esac

# Copy files to temporary directory
rsync -rt --delete "$SITEDIR/" "$WORKDIR/"

# Get last modification time for _buildlock
touch "$SITEDIR/_buildlock"
lasttime=`stat -c %Y "$SITEDIR/_buildlock" | cut -d ' ' -f1`

# Build website in a child process
(
source /etc/profile.d/rvm.sh
cd $WORKDIR
make deployment && touch "$WORKDIR/_builddone" || touch "$WORKDIR/_buildfail"
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
		find $WORKDIR/_site \( -iname '*.html' -o -iname '*.css' -o -iname '*.js' -o -iname '*.rss' -o -iname '*.xml' -o -iname '*.svg' -o -iname '*.ttf' \) -exec gzip -9 -k {} \;
		rsync --delete -zrt $WORKDIR/_site/ $DESTDIR/

                ## Save this commit's ID.  You can force rebuild the current commit using:
                ##   update_site.sh force $( cat </path/to/last-successful-build-commitish> )
                echo "$LASTREMOTECOMMIT" > $LAST_SUCCESSFUL_BUILD_COMMITISH_FILE

                echo "Upload done; terminating script"
		exit
	fi

	# Cancel script if a concurrent script has touched _buildlock
	if [ -e "$SITEDIR/_buildlock" ]; then
		time=`stat -c %Y "$SITEDIR/_buildlock" | cut -d ' ' -f1`
		if [ $time != $lasttime ]; then
			echo "Build cancelled"
			exit
		fi
	fi
	sleep 1

done
