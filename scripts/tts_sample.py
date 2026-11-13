# -*- coding: utf-8 -*-
import asyncio
import edge_tts

OUT = r"C:\Users\asaf2\Documents\s\contact-center-marketing\tmp-video-frames\hila-sample.mp3"


async def main():
    await edge_tts.Communicate(
        "שלום, זה בדיקת קול של הילה.",
        "he-IL-HilaNeural",
    ).save(OUT)
    print("ok", OUT)


asyncio.run(main())
