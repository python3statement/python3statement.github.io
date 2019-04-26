#!/usr/bin/env bash

# pip install pillow
python3 scripts/thumbnail-images.py

# https://pngquant.org/
# On Mac: brew install pngquant

# Options:
#   --ext .png  Output to same filename, don't append anything else
#   --force     Overwrite existing output files
#   --speed 1   Slow speed, best quality
#   --strip     Remove optional metadata

pngquant --ext .png --force --speed 1 --strip assets/*.png img/*.png
