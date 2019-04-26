#!/usr/bin/env python3
# encoding: utf-8
"""
Thumbnail images to a maximum of 160px wide and 80px high
"""
import glob

from PIL import Image  # pip install pillow

max_size = 160, 80

for infile in glob.glob("assets/*.png"):
    im = Image.open(infile)
    im.thumbnail(max_size)
    im.save(infile)
