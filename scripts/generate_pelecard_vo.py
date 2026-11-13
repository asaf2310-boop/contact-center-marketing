# -*- coding: utf-8 -*-
"""Generate Hebrew Pelecard end-pitch VO (Edge TTS), then tone-convert to narrator."""
import asyncio
import subprocess
import sys
from pathlib import Path

import edge_tts

ROOT = Path(r"C:\Users\asaf2\Documents\s\contact-center-marketing\tmp-video-frames")
VO_HILA = ROOT / "vo_hila"
VO_CLONE = ROOT / "vo_clone"
REF = ROOT / "voice" / "ref_clean.wav"
VENV_PY = Path(r"C:\Users\asaf2\Documents\s\contact-center-marketing\.venv-tts\Scripts\python.exe")

VO_HILA.mkdir(parents=True, exist_ok=True)
VO_CLONE.mkdir(parents=True, exist_ok=True)

# Full package explanation — played only at the END of the demo
CLIPS = {
    "vo_package.mp3": (
        "ועכשיו — חבילת AllInCenter בשיתוף פלאקארד. "
        "הלקוח מקבל מערכת ניהול תורים או אתר מקצועי, יחד עם מערכת סליקה מאובטחת. "
        "המחיר: אלף שש מאות שקלים חד-פעמי, ועוד מאתיים ארבעים וחמישה שקלים לחודש. "
        "זה כולל הקמה, תחזוקה חודשית, וסליקה מקצועית. "
        "הצטרפו לרשת השותפים של AllInCenter, והתחילו למכור את החבילה עוד היום."
    ),
}

VOICE = "he-IL-HilaNeural"
RATE = "-5%"


async def gen_hila(name: str, text: str) -> Path:
    path = VO_HILA / name
    await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(path))
    print("hila wrote", path)
    return path


def convert_tone(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        str(VENV_PY),
        "-m",
        "openvoice_cli",
        "single",
        "-i",
        str(src),
        "-r",
        str(REF),
        "-o",
        str(dst),
        "-d",
        "cuda:0",
    ]
    print("convert:", " ".join(cmd))
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        # fallback CPU
        cmd[-1] = "cpu"
        print("cuda failed, retry cpu\n", r.stderr[-2000:] if r.stderr else r.stdout)
        r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout)
        print(r.stderr)
        raise SystemExit(f"openvoice failed: {r.returncode}")
    print("clone wrote", dst)
    if r.stdout:
        print(r.stdout[-500:])


async def main():
    for name, text in CLIPS.items():
        hila = await gen_hila(name, text)
        wav_name = name.replace(".mp3", ".wav")
        convert_tone(hila, VO_CLONE / wav_name)


if __name__ == "__main__":
    asyncio.run(main())
