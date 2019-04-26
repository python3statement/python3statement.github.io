from pathlib import Path
from PIL import Image

# The logos are constrained in CSS to 160 px by 80 px. We allow up to double
# that size, as high-resolution displays may display more than one pixel in a
# CSS pixel.
MAX_WIDTH = 160 * 2
MAX_HEIGHT = 80 * 2

ASSETS_DIR = Path(__file__).parent / 'assets'

for filename in ASSETS_DIR.glob('*.png'):
    im = Image.open(filename)
    w, h = im.size
    if w <= MAX_WIDTH and h <= MAX_HEIGHT:
        # This image is already small enough
        continue
    
    # It should fit in both dimensions, so take the smaller scale from them.
    w_scale = MAX_WIDTH / w
    h_scale = MAX_HEIGHT / h
    scale = min(w_scale, h_scale)

    new_w = int(w * scale)
    new_h = int(h * scale)

    print(f"Resizing {filename} from {w}×{h} to {new_w}×{new_h}.")

    im.resize((new_w, new_h)).save(filename)
