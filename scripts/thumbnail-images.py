#!/usr/bin/env python3
# encoding: utf-8
"""
Thumbnail images to a maximum of 320px wide and 160px high
"""
import argparse
import glob

from PIL import Image  # pip install pillow

max_size = 320, 160

parser = argparse.ArgumentParser(
    description="Thumbnail images to a maximum size",
    formatter_class=argparse.ArgumentDefaultsHelpFormatter,
)
parser.add_argument("--inspec", default="assets/*.png", help="Input file specification")
args = parser.parse_args()

for infile in glob.glob("assets/*.png"):
    im = Image.open(infile)
    if im.width <= max_size[0] and im.height <= max_size[1]:
        continue

    size_before = im.size
    im.thumbnail(max_size)
    im.save(infile)

    print(f"Resized {infile} from {size_before} to {im.size}")
