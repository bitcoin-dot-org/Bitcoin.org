#!/bin/bash

# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

# bitcoinstats.rb can be found here:
# https://github.com/saivann/bitcoinstats

WORKDIR='/bitcoin.org/stats'
LOGDIR='build@bitcoinorglog:/var/log/nginx'
DSTDIR='build@bitcoinorgstats:/var/www/stats'

rsync -rtz --delete --exclude="error.*" --exclude="*.gz" $LOGDIR/ $WORKDIR/srclogs/
ruby $WORKDIR/stats.rb
rsync -rtz --delete  $WORKDIR/stats/ $DSTDIR/
