#!/usr/bin/env bash
set -e

# pip install pillow
if [ ! -z $1 ]
then
    python3 scripts/thumbnail-images.py --inspec $1
else
    python3 scripts/thumbnail-images.py
fi

# https://pmt.sourceforge.io/pngcrush/
# On Mac: brew install pngcrush

# Options:
#   -ow     Overwrite
#   -brute  Use brute-force: try 176 different methods

if [ ! -z $1 ]
then
    pngcrush -ow -brute $1
else
    find . -iname '*.png' -exec pngcrush -ow -brute {} \;
fi
