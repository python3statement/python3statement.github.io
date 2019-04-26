#!/usr/bin/env bash

# pip install pillow
python3 scripts/thumbnail-images.py

# https://pmt.sourceforge.io/pngcrush/
# On Mac: brew install pngcrush

# Options:
#   -ow     Overwrite
#   -brute  Use brute-force: try 176 different methods

find . -iname '*.png' -exec pngcrush -ow -brute {} \;
