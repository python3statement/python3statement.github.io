#!/usr/bin/env bash
set -e

# pip install pillow
if [ ! -z $1 ]
then
    python3 scripts/thumbnail-images.py --file $1
else
    python3 scripts/thumbnail-images.py
fi

# http://optipng.sourceforge.net/
# On Mac: brew install optipng

# Optimization levels:
# -o7 -zm1-9    <=> -zc1-9 -zm1-9 -zs0-3 -f0-5  (1080 trials)

if [ ! -z $1 ]
then
    pngcrush -ow -brute $1
    optipng -o7 -zm1-9 $1
else
    optipng -o7 -zm1-9 assets/*.png
fi
