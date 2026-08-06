from collections import deque
from PIL import Image
import os

assets = r"C:\Users\asaf2\Documents\s\contact-center-marketing\public\assets"


def flood_clear(img, is_bg):
    w, h = img.size
    pixels = img.load()
    visited = [[False] * w for _ in range(h)]
    q = deque()

    for x in range(w):
        for y in (0, h - 1):
            if is_bg(pixels[x, y]):
                q.append((x, y))
                visited[y][x] = True
    for y in range(h):
        for x in (0, w - 1):
            if is_bg(pixels[x, y]) and not visited[y][x]:
                q.append((x, y))
                visited[y][x] = True

    while q:
        x, y = q.popleft()
        pixels[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx] and is_bg(pixels[nx, ny]):
                visited[ny][nx] = True
                q.append((nx, ny))
    return img


def crop_pad(img, pad=6):
    bbox = img.getbbox()
    if not bbox:
        return img
    w, h = img.size
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(w, x1 + pad)
    y1 = min(h, y1 + pad)
    return img.crop((x0, y0, x1, y1))


# Pelecard — remove black background
pc = Image.open(os.path.join(assets, "pelecard-logo.png")).convert("RGBA")


def pc_bg(px):
    r, g, b, a = px
    if a == 0:
        return True
    return r <= 28 and g <= 28 and b <= 35


pc = flood_clear(pc, pc_bg)
pixels = pc.load()
w, h = pc.size
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        # Remove pale Hebrew tagline that only worked on black
        if 90 <= r <= 180 and 100 <= g <= 190 and 130 <= b <= 210:
            sat = max(r, g, b) - min(r, g, b)
            if sat < 55 and (r + g + b) / 3 > 120:
                pixels[x, y] = (0, 0, 0, 0)

pc = crop_pad(pc, 4)
# Upscale for crisp display
pc = pc.resize((pc.width * 3, pc.height * 3), Image.Resampling.LANCZOS)
pc_out = os.path.join(assets, "pelecard-logo-clear.png")
pc.save(pc_out)
print("pelecard", pc.size, pc_out)

# AllInCenter — remove light gray background
aic = Image.open(os.path.join(assets, "allincenter-logo.png")).convert("RGBA")


def aic_bg(px):
    r, g, b, a = px
    if a == 0:
        return True
    if r >= 235 and g >= 235 and b >= 235:
        return True
    return r >= 220 and g >= 220 and b >= 225 and abs(r - g) < 12 and abs(g - b) < 12


aic = flood_clear(aic, aic_bg)
aic = crop_pad(aic, 8)
aic_out = os.path.join(assets, "allincenter-logo-clear.png")
aic.save(aic_out)
print("allincenter", aic.size, aic_out)
