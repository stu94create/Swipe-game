# Country Yes or No

A tiny, standalone swipe game that lives alongside Ballycrann without touching it.
A voice asks ten everyday yes-or-no questions (preferences, so there are no right answers); the
player answers by swiping, and the voice confirms each one with "You chose yes" or "You chose no".

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
each question, `YES_LINE` / `NO_LINE`, and the closing line in `finish()`). The answer chimes are tiny
Web-Audio synth plucks. It prefers a warm US-English voice when one is available.

## Background music

`audio/country-track.mp3` loops in the background, ducks under the narration, and can be muted with
the ♪ button. To swap the track, just replace that file. If it's ever missing the game still runs —
just without music.

## Questions

`QUESTION_POOL` in `index.html` holds 100 questions. Each string is both shown on the card and read
aloud. Each game draws 10 of them at random.

`TRIAL_QUESTIONS` is a hand-picked set for early trials. While it has questions in it, every game
plays exactly those, in that order, and the random pool isn't used. Empty it (`[]`) to switch to the
random draw.
