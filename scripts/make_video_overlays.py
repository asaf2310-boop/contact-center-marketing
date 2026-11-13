# -*- coding: utf-8 -*-
"""Create overlay graphics for the Pelecard partner video."""
from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display
from pathlib import Path

ASSETS = Path(r"C:\Users\asaf2\Documents\s\contact-center-marketing\public\assets")
OUT = Path(r"C:\Users\asaf2\Documents\s\contact-center-marketing\tmp-video-frames\overlays")
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1440, 900


def he(text: str) -> str:
    return get_display(arabic_reshaper.reshape(text))


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", size)


def load_logo(name: str, height: int) -> Image.Image:
    im = Image.open(ASSETS / name).convert("RGBA")
    return im.resize((int(im.width * height / im.height), height), Image.Resampling.LANCZOS)


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def make_product_slide():
    img = Image.new("RGBA", (W, H), (238, 245, 247, 255))
    d = ImageDraw.Draw(img)
    d.ellipse((-100, -80, 520, 520), fill=(139, 47, 214, 36))
    d.ellipse((900, -40, 1500, 480), fill=(0, 183, 194, 40))
    d.ellipse((400, 520, 1100, 1000), fill=(225, 29, 122, 24))

    eyebrow = he("רשת השותפים · המוצר למכירה")
    title = he("מה השותפים מוכרים?")
    sub = he("חבילת AllInCenter בשיתוף פלאקארד")
    line1 = he("מערכת ניהול תורים או אתר עסקי")
    line2 = he("מערכת סליקה מקצועית עם פלאקארד")
    price = he("₪1,600 הקמה  ·  ₪245 לחודש")

    f_eye = font(28)
    f_title = font(64)
    f_sub = font(36)
    f_body = font(32)
    f_price = font(34)

    def center_text(text, y, fnt, fill):
        bb = d.textbbox((0, 0), text, font=fnt)
        tw = bb[2] - bb[0]
        d.text(((W - tw) // 2, y), text, font=fnt, fill=fill)

    center_text(eyebrow, 70, f_eye, (8, 121, 128, 255))
    center_text(title, 120, f_title, (11, 26, 46, 255))
    center_text(sub, 210, f_sub, (109, 31, 184, 255))

    aic = load_logo("allincenter-logo-clear.png", 170)
    pc = load_logo("pelecard-logo-clear.png", 78)
    join = he("בשיתוף")
    f_join = font(28)
    jbb = d.textbbox((0, 0), join, font=f_join)
    jw = jbb[2] - jbb[0] + 36
    gap = 28
    total = aic.width + gap + jw + gap + pc.width
    x0 = (W - total) // 2
    y_logos = 280
    img.alpha_composite(aic, (x0, y_logos))
    pill_x = x0 + aic.width + gap
    pill_y = y_logos + 55
    d.rounded_rectangle((pill_x, pill_y, pill_x + jw, pill_y + 48), radius=24, fill=(255, 255, 255, 240), outline=(11, 26, 46, 40), width=2)
    d.text((pill_x + 18, pill_y + 8), join, font=f_join, fill=(11, 26, 46, 255))
    img.alpha_composite(pc, (pill_x + jw + gap, y_logos + 60))

    # Feature pills
    for i, (txt, color) in enumerate([(line1, (109, 31, 184)), (line2, (0, 140, 150))]):
        bb = d.textbbox((0, 0), txt, font=f_body)
        tw = bb[2] - bb[0] + 48
        x = (W - tw) // 2
        y = 520 + i * 70
        d.rounded_rectangle((x, y, x + tw, y + 56), radius=16, fill=(255, 255, 255, 245), outline=(*color, 80), width=2)
        d.text((x + 24, y + 10), txt, font=f_body, fill=(11, 26, 46, 255))

    center_text(price, 680, f_price, (11, 26, 46, 255))
    note = he("המחירים אינם כוללים מע״מ")
    center_text(note, 740, font(22), (90, 106, 124, 255))

    path = OUT / "slide_product.png"
    img.convert("RGB").save(path, "PNG")
    print("wrote", path)


def make_lower_third():
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    bar_h = 120
    y0 = H - bar_h - 40
    d.rounded_rectangle((40, y0, W - 40, y0 + bar_h), radius=20, fill=(11, 26, 46, 230))

    pc = load_logo("pelecard-logo-clear.png", 44)
    # put logo on dark — pelecard has dark navy text, may be low contrast; add white plate
    plate_w = pc.width + 24
    d.rounded_rectangle((60, y0 + 28, 60 + plate_w, y0 + 92), radius=12, fill=(255, 255, 255, 245))
    img.alpha_composite(pc, (72, y0 + 38))

    title = he("שליחת הסכם AllInCenter × פלאקארד")
    sub = he("ניהול תורים / אתר + סליקה מאובטחת")
    d.text((60 + plate_w + 24, y0 + 28), title, font=font(34), fill=(255, 255, 255, 255))
    d.text((60 + plate_w + 24, y0 + 72), sub, font=font(24), fill=(126, 240, 247, 255))

    path = OUT / "lower_third.png"
    img.save(path, "PNG")
    print("wrote", path)


def make_end_card():
    img = Image.new("RGBA", (W, H), (238, 245, 247, 255))
    d = ImageDraw.Draw(img)
    d.ellipse((-80, -60, 480, 480), fill=(139, 47, 214, 34))
    d.ellipse((960, 200, 1560, 800), fill=(0, 183, 194, 36))

    aic = load_logo("allincenter-logo-clear.png", 140)
    pc = load_logo("pelecard-logo-clear.png", 70)
    join = he("בשיתוף")
    f_join = font(26)
    jbb = d.textbbox((0, 0), join, font=f_join)
    jw = jbb[2] - jbb[0] + 32
    gap = 24
    total = aic.width + gap + jw + gap + pc.width
    x0 = (W - total) // 2
    img.alpha_composite(aic, (x0, 160))
    pill_x = x0 + aic.width + gap
    d.rounded_rectangle((pill_x, 210, pill_x + jw, 258), radius=22, fill=(255, 255, 255, 245), outline=(11, 26, 46, 35), width=2)
    d.text((pill_x + 16, 218), join, font=f_join, fill=(11, 26, 46, 255))
    img.alpha_composite(pc, (pill_x + jw + gap, 210))

    def center_text(text, y, fnt, fill):
        bb = d.textbbox((0, 0), text, font=fnt)
        tw = bb[2] - bb[0]
        d.text(((W - tw) // 2, y), text, font=fnt, fill=fill)

    center_text(he("הצטרפו ומכרו את חבילת פלאקארד"), 360, font(52), (11, 26, 46, 255))
    center_text(he("רשת השותפים של AllInCenter"), 440, font(32), (90, 106, 124, 255))
    center_text("allincenter.co.il/allincenter-pelecard", 540, font(30), (8, 121, 128, 255))
    center_text(he("התחילו עכשיו"), 640, font(44), (109, 31, 184, 255))

    path = OUT / "slide_end.png"
    img.convert("RGB").save(path, "PNG")
    print("wrote", path)


if __name__ == "__main__":
    make_product_slide()
    make_lower_third()
    make_end_card()
