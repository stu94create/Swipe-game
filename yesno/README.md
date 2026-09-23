# Country Yes or No

A tiny, standalone swipe game that lives alongside Ballycrann without touching it.
A voice asks ten everyday yes-or-no questions (preferences, so there are no right answers); the
player answers by swiping, and the voice gives a short reply of its own for that question and
answer. Every reply starts with "Yes" or "No", so the player hears which way the swipe registered.

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
each question and its two replies, and the closing line in `finish()`). The answer chimes are tiny
Web-Audio synth plucks. It prefers a warm US-English voice when one is available.

## Background music

`audio/country-track.mp3` loops in the background, ducks under the narration, and can be muted with
the ♪ button. It plays through Web Audio (a decoded buffer on a gain node), not an `<audio>`
element: on iPhone the speech voice pauses a media element a second into the intro, and iOS ignores
an element's volume, so it could be neither kept quiet nor ducked. The page's audio session is left at its
default: setting it to `playback` made it exclusive on iPhone, and the music cut the speech voice
off. The catch is that the phone's silent switch mutes the music and chimes. To swap the track, just replace that file. If it's ever missing the game still runs —
just without music.

## Questions

`QUESTION_POOL` in `index.html` holds 100 questions, each written as
`[question, reply to a yes, reply to a no]`. The question is shown on the card and read aloud.
Start each reply with "Yes" or "No", and keep "no" replies accepting: they're preferences, not
wrong answers.

Games deal 10 at a time from a shuffled "bag" of all 100, so no question repeats until every one
has been asked. Then the bag is reshuffled, with the game just played moved to the back so it
isn't repeated straight away. The bag is kept in the browser's `localStorage`, so it carries on
across visits on the same device.

`TRIAL_QUESTIONS` is a hand-picked set for trials. While it has questions in it, every game plays
exactly those, in that order, and the random pool isn't used. It's empty by default.
