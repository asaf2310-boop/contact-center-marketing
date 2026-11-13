# -*- coding: utf-8 -*-
"""Clone narrator voice with Coqui XTTS v2 and synthesize Hebrew lines."""
import os
import sys
from pathlib import Path

os.environ.setdefault("COQUI_TOS_AGREED", "1")

from TTS.api import TTS

ROOT = Path(r"C:\Users\asaf2\Documents\s\contact-center-marketing\tmp-video-frames")
REF = ROOT / "voice" / "ref_clean.wav"
OUT_DIR = ROOT / "vo_clone"
OUT_DIR.mkdir(parents=True, exist_ok=True)

LINES = {
    "vo_product.wav": (
        "מה השותפים מוכרים? חבילת AllInCenter בשיתוף פלאקארד. "
        "מערכת ניהול תורים או אתר, יחד עם מערכת סליקה מקצועית."
    ),
    "vo_cta.wav": (
        "הצטרפו לרשת השותפים של AllInCenter, "
        "והתחילו למכור את חבילת פלאקארד עוד היום."
    ),
}

print("Loading XTTS v2 (first run downloads the model)...")
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to("cuda")

# Probe language options
langs = getattr(tts, "languages", None) or getattr(getattr(tts, "synthesizer", None), "tts_model", None)
print("model ready")

# Prefer Hebrew if supported; else try Arabic (same script family) then English
candidates = ["he", "iw", "heb", "ar", "en"]

def synth(text: str, out_path: Path, language: str):
    tts.tts_to_file(
        text=text,
        speaker_wav=str(REF),
        language=language,
        file_path=str(out_path),
    )

# Pick working language with a short probe
probe = OUT_DIR / "_probe.wav"
chosen = None
for lang in candidates:
    try:
        print(f"trying language={lang}...")
        synth("שלום, זה בדיקת קול.", probe, lang)
        chosen = lang
        print(f"OK language={lang}")
        break
    except Exception as e:
        print(f"fail language={lang}: {e}")

if not chosen:
    print("No language worked", file=sys.stderr)
    sys.exit(1)

for name, text in LINES.items():
    out = OUT_DIR / name
    print(f"generating {name}...")
    synth(text, out, chosen)
    print(f"wrote {out}")

print("DONE lang=", chosen)
