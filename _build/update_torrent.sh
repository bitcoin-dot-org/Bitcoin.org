#!/bin/bash

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")

BINDIR='/var/www/bin'
DATADIR='/bitcoin.org/torrent'
PREFIX='bitcoin-core-'

# Stop script in case a single command fails
set -e

# Create last hash file if it doesn't exist.
if [[ ! -e $DATADIR/lasthash ]]; then
	touch $DATADIR/lasthash
fi

# Find latest version.
version=''
for f in `find "$BINDIR" -maxdepth 1 ! -path "$BINDIR"`; do

	f=${f##*/}

	# Ignore directories that don't end with a version number.
	if [[ $f =~ [^0-9]$ ]]; then
		continue
	fi

	# Isolate version number.
	f="${f/$PREFIX/}"

	version="$(echo "$version $f" | tr " " "\n" | sort -V | tail -n 1)"

done

# Get current last modification time for the torrent.
lasttorrenttime=0
if [[ -e "$BINDIR/$PREFIX$version/bitcoin-$version.torrent" ]]; then
	lasttorrenttime=`stat -c%Y "$BINDIR/$PREFIX$version/bitcoin-$version.torrent"`
fi

# Get current last modification time for binary files.
lastfilestime=0
for f in `find "$BINDIR/$PREFIX$version" -maxdepth 1 ! -path "$BINDIR/$PREFIX$version"`; do

	f=${f##*/}

	# Ignore torrent file and directories.
	if [[ $f =~ \.torrent$ || -d "$BINDIR/$PREFIX$version/$f" ]]; then
		continue
	fi

	time=`stat -c%Y "$BINDIR/$PREFIX$version/$f"`
	if [[ $time > $lastfilestime ]]; then
		lastfilestime=$time
	fi

done

# Abort if directory is empty.
if [[ $lastfilestime == 0 ]]; then
	exit
fi

# Get last version and combined hash for binary files.
lasthash=`cat $DATADIR/lasthash`

# Abort if binary files have been modified in the last minute.
lastminute=`date +%s`
lastminute=$[lastminute-60]
if [[ $lastfilestime > $lastminute ]]; then
	exit
fi

# Abort if torrent file exists, version is unchanged and binary files are unchanged.
if [[ -e "$BINDIR/$PREFIX$version/bitcoin-$version.torrent" && $lasthash == "$version;"* && $lasttorrenttime > $lastfilestime ]]; then
	exit
fi

# Get current combined hash for binary files.
currenthash="$version;"
for f in `find "$BINDIR/$PREFIX$version" -maxdepth 1 ! -path "$BINDIR/$PREFIX$version" | sort -V`; do
	f=${f##*/}
	if [[ $f =~ \.torrent$ || -d "$BINDIR/$PREFIX$version/$f" ]]; then
		continue
	fi
	currenthash="$currenthash$f:`sha256sum "$BINDIR/$PREFIX$version/$f" | cut -d " " -f1`;"
done

# Update torrent modification time and abort if files are unchanged.
if [[ $currenthash == $lasthash && -e "$BINDIR/$PREFIX$version/bitcoin-$version.torrent" ]]; then
	touch "$BINDIR/$PREFIX$version/bitcoin-$version.torrent"
	exit
fi

# Save previous torrent file.
if [[ -e "$BINDIR/$PREFIX$version/bitcoin-$version.torrent" ]]; then
	n=0
	while [[ -e $DATADIR/bitcoin-$version.torrent.$n ]]; do
		n=$[n+1]
	done
	mv "$BINDIR/$PREFIX$version/bitcoin-$version.torrent" "$DATADIR/bitcoin-$version.torrent.$n"
fi

# Copy files non-recursively to temporary directory.
tmpdir=`mktemp -d`
rsync -rt -f '- /*/' --delete "$BINDIR/$PREFIX$version/" "$tmpdir/$PREFIX$version/"

# Build new torrent file.
buildtorrent -a "udp://tracker.openbittorrent.com:80/announce" -A "udp://tracker.openbittorrent.com:80/announce,udp://tracker.coppersurfer.tk:6969" -w "https://bitcoin.org/bin/" -D -C "$tmpdir/$PREFIX$version" "$BINDIR/$PREFIX$version/bitcoin-$version.torrent"

# Update last combined hash and version.
echo $currenthash > $DATADIR/lasthash

# Delete temporary directory
rm -R "$tmpdir"

# Reset IFS.
IFS=$SAVEIFS
