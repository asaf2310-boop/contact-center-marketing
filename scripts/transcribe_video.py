# -*- coding: utf-8 -*-
from faster_whisper import WhisperModel

model = WhisperModel("small", device="cpu", compute_type="int8")
segments, info = model.transcribe(
    r"C:\Users\asaf2\Documents\s\contact-center-marketing\tmp-video-frames\audio.wav",
    language="he",
    word_timestamps=False,
)
out = r"C:\Users\asaf2\Documents\s\contact-center-marketing\tmp-video-frames\transcript.txt"
with open(out, "w", encoding="utf-8") as f:
    f.write(f"lang={info.language} p={info.language_probability}\n")
    for s in segments:
        line = f"{s.start:6.2f}-{s.end:6.2f}\t{s.text.strip()}\n"
        f.write(line)
print("wrote", out)
