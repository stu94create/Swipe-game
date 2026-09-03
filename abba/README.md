# Swiper Trouper

An ABBA-flavoured swipe game that lives alongside Ballycrann without touching it.
A voice asks, you swipe, and the swipe itself plays the band — every drag runs a
pentatonic run under your finger, and synthesised claps, shaker and brass stack
up as the rounds get faster.

Tap anywhere on the start screen to begin. Best with VoiceOver **off** — the page
speaks for itself, and there are no `aria` attributes for a screen reader to read
over the narration.

Play it at `/abba/` (GitHub Pages serves from the repo root).

## The five moves

| Gesture | Means |
|---|---|
| Swipe **left** | Yes |
| Swipe **right** | No |
| Swipe **up** | Love it |
| Swipe **down** | Not for me |
| **Double tap** | Hear the question again |

Four rounds unlock them in turn: two moves, then four, then all five, then all
five at speed on rapid-fire questions. Arrow keys and Enter work on desktop.

**Double tap is always a replay**, in every round and on every question — never
an answer, never a mistake. The one exception is the drill that teaches the
move itself.

Questions come in three kinds. An **opinion** has no wrong answer and feeds the
profile at the end. A **quiz** asks about ABBA: answer it wrongly and the game
says so and gives you the fact. A **drill** asks for a move, and a wrong one is
coached on technique. The move stats count drills only — getting a fact wrong
is not a botched swipe.

## Files

```
abba/
├── index.html        The whole game — HTML + CSS + JS in one file
├── audio/
│   └── track.mp3     Looping disco backing track
└── voice/
    ├── lines.json    Generated from index.html — do not edit by hand
    └── <id>.mp3      One ElevenLabs clip per line ID
```

## Voice

Every spoken line has a **stable ID**, and the game plays `voice/<id>.mp3` if it
exists, falling back to the browser's built-in voice if it doesn't. The ID is
never derived from the wording, so a line can be reworded without orphaning its
recording.

The wording lives in the `LINES` registry at the top of the script in
`index.html` — that file stays the single source of truth, and `voice/lines.json`
is generated from it.

Browse every line and its filename at [`/abba/#lines`](#).

### Regenerating

```sh
node scripts/extract-lines.mjs        # rebuild lines.json + check every ID resolves
LINES_FILE=abba/voice/lines.json OUT_DIR=abba/voice \
  ELEVENLABS_API_KEY=… node scripts/generate-audio.mjs
```

Or run the **Generate audio** workflow with `game: swiper-trouper`. Existing MP3s
are skipped, so re-running costs nothing; add `--force --only=<id>` to re-render
one line after changing its words.

`extract-lines.mjs` fails the run if a line ID is asked for but undefined, or
defined but never played — so a typo is caught before any credits are spent.

### The ending

Every spoken line has a clip, including the sign-off. The end screen shows the
exact figures ("You landed 9 of 34 moves first time. Strongest move: a swipe
left…"), but what it *says* is banded — a line picked by how the player did,
plus the move worth practising — so the game finishes in the same voice it
started in. Round names on screen are never spoken.
