#!/bin/bash

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/bin

# Set variables and create temporary directories
LANGS=('ar' 'bg' 'bn' 'ca' 'cs' 'da' 'de' 'el' 'es' 'fa' 'fr' 'hi' 'hr' 'hu' 'id' 'it' 'ja' 'ko' 'lv' 'ml' 'nl' 'no' 'pl' 'pt_BR' 'ro' 'ru' 'sl' 'sr' 'sv' 'tr' 'uk' 'zh_CN' 'zh_TW')
WORKDIR=`mktemp -d`
LIVEDIR=`mktemp -d`
SITEDIR='/bitcoin.org/txpreview'
DESTDIR='/var/www/txpreview'
BITCOINORG_BUILD_TYPE='preview'

export BITCOINORG_BUILD_TYPE

# Stop script in case a single command fails
set -e

# Cleanup on EXIT (even when a command fails)
trap "rm -rf $WORKDIR $LIVEDIR; kill 0; exit 1;" EXIT
trap "rm -rf $WORKDIR $LIVEDIR; kill 0;" SIGINT

if [[ ! -d $SITEDIR/site || ! -d $SITEDIR/tx ]]; then
	echo 'Working folders missing'
	exit
fi

# Update translations
cd $SITEDIR/tx/
tx pull -a -s --skip

# Return if all updated languages were previously processed
update=false
for la in "${LANGS[@]}"
do
	checksum=`sha256sum $SITEDIR/tx/translations/bitcoinorg.bitcoinorg/$la.yml`
	checksum=(${checksum//" "/ })
	checksum=${checksum[@]:0:1}
	checksum=${checksum:0:10}
	if [[ -e $SITEDIR/site/_$checksum ]]; then
		continue
	fi
	update=true
done
if [[ $update == false ]]; then
	exit
fi

# Update git repository
cd $SITEDIR/site
git fetch -a
git reset --hard origin/master
git clean -x -f -d

# Copy files to temporary directory
rsync -rt --delete "$SITEDIR/site/" "$WORKDIR/"

# Get last modification time for _buildlock
touch "$SITEDIR/site/_buildlock"
lasttime=`stat -c %Y "$SITEDIR/site/_buildlock" | cut -d ' ' -f1`

# Create new checksum files
for la in "${LANGS[@]}"
do
	checksum=`sha256sum $SITEDIR/tx/translations/bitcoinorg.bitcoinorg/$la.yml`
	checksum=(${checksum//" "/ })
	checksum=${checksum[@]:0:1}
	checksum=${checksum:0:10}
	touch $SITEDIR/site/_$checksum
done

# Update languages and generate diff files
cd $WORKDIR
linecounten=`cat $SITEDIR/tx/translations/bitcoinorg.bitcoinorg/en.yml | grep -o '^ \+[a-z0-9]\+:' | wc -l`
echo '<h1>Needs updating</h1>' > $WORKDIR/diff.html
for la in "${LANGS[@]}"
do
	rsync -a $SITEDIR/tx/translations/bitcoinorg.bitcoinorg/$la.yml $WORKDIR/_translations/$la.yml
	ruby $WORKDIR/_contrib/updatetx.rb $la
	ruby $SITEDIR/addlang.rb $la
	if [[ ! -e $WORKDIR/$la ]]; then
		mkdir $WORKDIR/$la
	fi
	git diff --color-words master -- _translations/$la.yml | $SITEDIR/ansi2html > $WORKDIR/$la/diff.html
	diff=`git diff master -- _translations/$la.yml`
	linecount=`cat _translations/$la.yml | grep -o '^ \+[a-z0-9]\+:' | wc -l`
	if [[ $diff != '' && $linecount == $linecounten ]]; then
		echo "<a href=\"$la/diff.html\">$la</a><br>" >> $WORKDIR/diff.html
	fi
done

# Build website in a child process
(
source /etc/profile.d/rvm.sh
cd $WORKDIR
bundle install
ENABLED_PLUGINS='alerts redirects releases' make build && touch "$WORKDIR/_builddone" || touch "$WORKDIR/_buildfail"
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
		cd $LIVEDIR
		rsync --delete -zrt --exclude '/.git' $WORKDIR/_site/ $DESTDIR/
                echo "Upload done; terminating script"
		exit
	fi

	# Cancel script if a concurrent script has touched _buildlock
	time=0
	if [ -e "$SITEDIR/site/_buildlock" ]; then
		time=`stat -c %Y "$SITEDIR/site/_buildlock" | cut -d ' ' -f1`
	fi
	if [ $time != $lasttime ]; then
		echo "Build cancelled"
		exit
	fi
	sleep 1

done
