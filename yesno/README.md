# Country Yes or No

A tiny, standalone swipe game that lives alongside Ballycrann without touching it.
A voice asks a handful of playful country-flavoured questions; the player answers by swiping.

**Swipe left for YES, swipe right for NO.** (Arrow keys and the on-screen Yes/No labels work on
desktop too.)

Play it at `/yesno/` once deployed (GitHub Pages serves from the repo root).

## Files

```
yesno/
├── index.html            The whole game — HTML + CSS + JS in one file
└── audio/
    ├── lines.json        Source of truth: every voice line, keyed by stable ID
    ├── yn-*.mp3          Generated ElevenLabs voice files (one per line ID)
    └── country-track.mp3 Looping background instrumental (you add this — see below)
```

## Voice

Narration uses the same ElevenLabs voice as Ballycrann. The runtime never calls ElevenLabs — it
plays pre-rendered MP3s and falls back to the browser's `speechSynthesis` when an MP3 is missing,
so the game is fully playable before any audio is generated.

**To generate the voice files:**

1. Ensure the `ELEVENLABS_API_KEY` secret is set (same one Ballycrann uses).
2. **Actions → Generate yes/no audio → Run workflow.** Inputs:
   - `force` — re-render lines whose MP3 already exists.
   - `only` — prefix filter (`yn-q` = all questions, `yn-yes` = the yes reactions). Blank = all.
3. The workflow renders any missing lines and commits the MP3s into `yesno/audio/`.

Locally: `ELEVENLABS_API_KEY=… node scripts/generate-yesno-audio.mjs` (add `--dry-run` to preview).

## Background music

Generate a country instrumental in [Suno](https://suno.com), download the MP3, and drop it at
`yesno/audio/country-track.mp3`. The game loops it, ducks it under the narration, and offers a mute
button (♪). If the file is absent the game runs fine — just without music.

## Adding a question

1. Add a `{ id, text }` entry to the `DECK` array in `index.html`.
2. Add the matching spoken line to `audio/lines.json` under the same ID.
3. Run the workflow to render the new MP3.
