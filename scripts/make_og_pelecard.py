"""Generate WhatsApp/Open Graph image for AllInCenter × Pelecard."""
from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "public", "assets")
OUT = os.path.join(ASSETS, "og-allincenter-pelecard.png")


def he(text: str) -> str:
    return get_display(arabic_reshaper.reshape(text))


W, H = 1200, 630
img = Image.new("RGBA", (W, H), (238, 245, 247, 255))
od = ImageDraw.Draw(img)
od.ellipse((-80, -120, 520, 480), fill=(139, 47, 214, 40))
od.ellipse((720, -60, 1320, 460), fill=(0, 183, 194, 44))
od.ellipse((280, 360, 980, 780), fill=(225, 29, 122, 30))

aic = Image.open(os.path.join(ASSETS, "allincenter-logo-clear.png")).convert("RGBA")
pc = Image.open(os.path.join(ASSETS, "pelecard-logo-clear.png")).convert("RGBA")
aic_h = 260
aic = aic.resize((int(aic.width * aic_h / aic.height), aic_h), Image.Resampling.LANCZOS)
pc_h = 110
pc = pc.resize((int(pc.width * pc_h / pc.height), pc_h), Image.Resampling.LANCZOS)

font = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 28)
font_sm = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 32)

text = he("בשיתוף")
tb = od.textbbox((0, 0), text, font=font_sm)
tw = tb[2] - tb[0] + 40
th = 56
gap = 40
total = aic.width + gap + tw + gap + pc.width
x0 = (W - total) // 2

img.alpha_composite(aic, (x0, (H - aic.height) // 2 - 24))
pill_x = x0 + aic.width + gap
pill_y = (H - th) // 2 - 14
pd = ImageDraw.Draw(img)
pd.rounded_rectangle(
    (pill_x, pill_y, pill_x + tw, pill_y + th),
    radius=28,
    fill=(255, 255, 255, 245),
    outline=(11, 26, 46, 35),
    width=2,
)
pd.text((pill_x + (tw - (tb[2] - tb[0])) // 2, pill_y + 10), text, fill=(11, 26, 46, 255), font=font_sm)
img.alpha_composite(pc, (pill_x + tw + gap, (H - pc.height) // 2 - 14))

pd.rectangle((0, H - 78, W, H), fill=(11, 26, 46, 250))
left = he("ניהול תורים / אתר + סליקה")
mid = he("בשיתוף פלאקארד")
cap = f"AllInCenter   ·   {mid}   ·   {left}"
cb = pd.textbbox((0, 0), cap, font=font)
cw = cb[2] - cb[0]
pd.text(((W - cw) // 2, H - 52), cap, fill=(255, 255, 255, 255), font=font)

img.convert("RGB").save(OUT, "PNG", optimize=True)
print("wrote", OUT)
