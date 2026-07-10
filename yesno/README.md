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
    └── country-track.mp3 Looping country instrumental (background music)
```

## Voice

The narration uses the **browser's built-in speech** (`speechSynthesis`) — no external audio, no
API keys, nothing to generate. Every spoken line lives inline in `index.html` (the `INTRO_LINE`,
each deck entry's `say`, the yes/no reactions, and `COMPLETE_LINE`). The answer chimes are tiny
Web-Audio synth plucks. It prefers a warm US-English voice when one is available.

## Background music

`audio/country-track.mp3` loops in the background, ducks under the narration, and can be muted with
the ♪ button. To swap the track, just replace that file. If it's ever missing the game still runs —
just without music.

## Adding a question

Add a `{ text, say }` entry to the `DECK` array in `index.html` — `text` shows on the card, `say`
is what the voice reads aloud.
