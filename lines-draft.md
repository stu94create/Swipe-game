# Voice line draft — new gestures

All lines below are **draft text for review** — none of these are in `audio/lines.json` yet, and no audio has been generated. Red-pen anything that sounds off, then I'll commit them to the manifest and re-run the generator.

Convention:
- `[ID]` — the line ID I'd use in code; pick any you'd rather rename.
- Quotation marks around speech inside narration. Em-dashes for asides.

---

## 1. Tutorial — three new practice scenes

Slotted into "A Morning Walk" between the existing double-tap scene (scene 6) and the mini-scene (find Pat's dog). The player therefore knows *all* gestures by the time they go looking for the dog, and the mini-scene uses the new pickup gesture to take Spot home.

### Scene: Stepping inside

- `[t-inside-intro]` Sometimes there's a door open to you. To step inside — or back out again — place two fingers on the screen and tap twice together.
- `[t-inside-vignette-1]` Through the threshold, into the warm. The hum of someone humming.
- `[t-inside-vignette-2]` Out again, into the air. The smell of the sea finds you.
- `[t-inside-vignette-3]` Inside once more. Wooden floor under your feet, a clock ticking somewhere.

### Scene: Picking up

- `[t-pickup-intro]` If there's something at your feet you'd like to take, place two fingers on the screen and swipe down together.
- `[t-pickup-vignette-1]` A small sea-pebble, smooth and grey. Into your pocket it goes.
- `[t-pickup-vignette-2]` A blackbird's feather, blue-black where it catches the light.
- `[t-pickup-vignette-3]` A bramble leaf, curled at the edges. Saved for later.

### Scene: Reaching up

- `[t-reach-intro]` And if there's something within reach overhead, two fingers on the screen and swipe up together.
- `[t-reach-vignette-1]` A blackberry, ripe enough to fall at a touch.
- `[t-reach-vignette-2]` A spray of honeysuckle from the bramble. The scent on your fingers after.
- `[t-reach-vignette-3]` A leaf, late autumn-yellow, ready to come away.

### Mini-scene update (replaces 2 existing lines)

The dog is now lifted, not greeted. New IDs to avoid re-running unchanged audio:

- `[t-mini-bark-cue-v2]` There — you can hear him. Two fingers, swipe down to bend and pick him up.
- `[t-mini-almost-greet-v2]` Almost — two fingers, swipe down to lift him.

---

## 2. Cues / reprompts / almost — for the three new gestures

Standard four lines per gesture, mirroring the existing pattern.

### Two-finger double tap

- `[cue-once-more-two-finger-double-tap]` Once more, two fingers, tap twice together.
- `[cue-again-two-finger-double-tap]` Two fingers, tap twice again.
- `[reprompt-two-finger-double-tap]` Try two fingers, tap twice.
- `[almost-two-finger-double-tap]` Almost — both fingers on the screen, then tap twice together.

### Two-finger swipe up

- `[cue-once-more-two-finger-swipe-up]` Once more, two fingers, swipe up.
- `[cue-again-two-finger-swipe-up]` Two fingers up again.
- `[reprompt-two-finger-swipe-up]` Try two fingers, swipe up.
- `[almost-two-finger-swipe-up]` Almost — two fingers together, swipe upward.

### Two-finger swipe down

- `[cue-once-more-two-finger-swipe-down]` Once more, two fingers, swipe down.
- `[cue-again-two-finger-swipe-down]` Two fingers down again.
- `[reprompt-two-finger-swipe-down]` Try two fingers, swipe down.
- `[almost-two-finger-swipe-down]` Almost — two fingers together, swipe downward.

---

## 3. Generic fallbacks

- `[already-taken]` You've already got that one.
- `[w-no-door]` There's no door open here, just the open air.
- `[w-nothing-to-take]` Nothing at your feet here to take.
- `[w-nothing-to-reach]` Nothing within reach overhead just here.

---

## 4. Outdoor pickups / reaches per wander position

| Position | At feet (`pickup`) | Overhead (`reach`) |
|---|---|---|
| Harbour | heart-shaped stone | — |
| Bakery | — | rosemary |
| Bridie's | hairpin | egg |
| Post office | stamp | parcel string |
| Schoolhouse | marble | conker |
| Brian | — | — |
| Chapel | hymn-book page | holly berry |
| Catherine's | button | dried lavender |
| Doctor | — | — |
| Pub | beer mat | hop bine |
| James + lane | **Spot the dog** | — |

Lines:

- `[w-harbour-pickup]` A stone shaped like a small heart, smoothed by the sea. Yours to keep.
- `[w-bakery-reach]` A sprig of rosemary tied to the door-post. Eileen won't miss one.
- `[w-bridie-pickup]` A hairpin Bridie dropped earlier. She'd rather it didn't get trodden on.
- `[w-bridie-reach]` An egg, brown and warm from the basket. Bridie nods — take it.
- `[w-post-pickup]` A postage stamp under the bench, edge curled. Saved.
- `[w-post-reach]` A length of parcel string still tied in a slip-knot. Useful.
- `[w-school-pickup]` A marble, the kind with a blue spiral inside. Saved for a child later.
- `[w-school-reach]` A conker on a string hung from the railing. It comes loose easily.
- `[w-chapel-pickup]` A hymn-book page, blown loose on the path. You fold it small and keep it.
- `[w-chapel-reach]` A holly berry above the porch, bright red, ready to fall at a touch.
- `[w-catherine-pickup]` A pearl-grey button from Catherine's hem, fallen as she leaned. Saved for her.
- `[w-catherine-reach]` A sprig of dried lavender from the bunch above. The scent on your fingers.
- `[w-pub-pickup]` A beer mat, edges curled, with someone's darts score on the back. Folded into your pocket.
- `[w-pub-reach]` A length of hop bine from the bracket above the door. Bitter-green when you brush it.
- `[w-james-pickup]` You bend down. Spot the dog comes happily into your arms — Pat's lost dog, found.

---

## 5. Interiors — seven enterable places, two states each

Each interior has a "by the door" state (where you arrive) and a "deeper in" state (one swipe right). Swipe left to come back to the door. Two-finger double tap to step out from either state.

Every state has its own description, look-up, look-down, greet, and one item (pickup *or* reach). Ambient sound plays under Mary's voice on entry and keeps going.

### Bakery (Eileen)

**By the door** — ambient: oven crackling, Eileen humming.
- `[w-bakery-door-desc]` You step in. The warmth hits first — and the smell of bread. Eileen at the counter, dusting her hands on her apron.
- `[w-bakery-door-up]` A line of empty bread paddles hung by their handles. Cobwebs in the rafter-corners.
- `[w-bakery-door-down]` Flour-prints across the floorboards. A black cat asleep by the radiator.
- `[w-bakery-door-greet]` Eileen brightens. "Come in, come in. There's a fresh batch coming out in a minute."
- `[w-bakery-door-pickup]` A still-warm scone has rolled off the edge of a tray. Eileen waves you on — yours.

**Deeper in** — by the oven.
- `[w-bakery-deep-desc]` Past the counter, by the great black oven. The crackle of it close up. A schedule chalked on the wall in Eileen's hand.
- `[w-bakery-deep-up]` The chimney pipe, sooty, climbing up through the ceiling. A long peel on a hook.
- `[w-bakery-deep-down]` Wooden floorboards worn pale where Eileen stands all day. A few flour-tracks from a barn-cat.
- `[w-bakery-deep-greet]` Eileen calls from the oven. "Mind your eyebrows — she's hot."
- `[w-bakery-deep-reach]` A bag-tie of waxed string hanging from a nail. She nods — take it.

### Bridie McGregor

**By the door** — ambient: kettle on the hob, just coming to the boil.
- `[w-bridie-door-desc]` You step into Bridie's kitchen. A kettle on the hob, just coming to the boil. The window full of geraniums.
- `[w-bridie-door-up]` A horseshoe over the door, points up for luck. A clutch of dried bay leaves on a string.
- `[w-bridie-door-down]` Flagstones, swept clean. Her cat by the threshold, surveying you.
- `[w-bridie-door-greet]` Bridie pours water into the pot. "Sit, sit. The tea won't be a minute."
- `[w-bridie-door-pickup]` A button from her sewing, fallen by the doormat. Bridie laughs — "That'd be lost forever. Thank you."

**Deeper in** — the parlour.
- `[w-bridie-deep-desc]` Deeper in, past the kitchen table to the parlour. A peat fire, very low. A framed picture of her late husband on the mantel.
- `[w-bridie-deep-up]` Smoke-stained ceiling, a brass lamp hanging unlit. Wallpaper roses fading.
- `[w-bridie-deep-down]` A peg-rug in front of the fire, made from old coats. Bridie's slippers by the chair.
- `[w-bridie-deep-greet]` Bridie follows you in. "That's Tom in the picture. He'd have liked you."
- `[w-bridie-deep-reach]` A clothes-peg from the row above the fire, painted faded red. Yours, she nods.

### Post office (Patrick)

**By the door** — ambient: clock ticking too loudly, wireless humming.
- `[w-post-door-desc]` You step in. The little bell above the door rings, late. Patrick already turning round behind the counter.
- `[w-post-door-up]` A clock with Roman numerals, ticking too loudly. Notices pinned everywhere.
- `[w-post-door-down]` Worn linoleum, a black-and-white checkerboard, scuffed pale at the counter.
- `[w-post-door-greet]` Patrick beams. "Welcome to the centre of everything. What can I do for you?"
- `[w-post-door-pickup]` An inkpad on the counter-edge, lid askew. Patrick pushes it toward you — "Take it. I've two more."

**Deeper in** — the back room.
- `[w-post-deep-desc]` Past the counter, into Patrick's back room. Stacks of brown paper, a bicycle leaning by the door. The wireless humming.
- `[w-post-deep-up]` Bare bulb under a tin shade. Postal regulations, framed, from 1962.
- `[w-post-deep-down]` Floorboards, a pencil rolled into the corner. A spider unimpressed.
- `[w-post-deep-greet]` Patrick follows. "This is where I do my proper work — letters to the council, mostly."
- `[w-post-deep-reach]` A stick of sealing wax on a high shelf. Patrick says, "Go on. You'll get more use from it than I will."

### Schoolhouse (Mr Breen)

**By the door** — ambient: children's voices from outside (PE), chalk on board.
- `[w-school-door-desc]` You step in. Chalk in the air, the smell of pencil shavings. Empty between lessons. Mr Breen at his desk.
- `[w-school-door-up]` A line of paper bunting from someone's birthday. A clock with a slow second-hand.
- `[w-school-door-down]` Wooden floor, dark with feet. A dropped pencil under a bench.
- `[w-school-door-greet]` Mr Breen looks up. "Welcome in. The children are at PE — we have a quiet moment."
- `[w-school-door-pickup]` A piece of chalk, broken short. Mr Breen smiles. "Keep it. It's no good for the board now."

**Deeper in** — front of the class.
- `[w-school-deep-desc]` Past the rows of benches to the front. The blackboard, half-cleaned. A globe with several countries that no longer exist.
- `[w-school-deep-up]` A map of Ireland on the wall, age-yellowed. A faint draught from above.
- `[w-school-deep-down]` Mr Breen's desk-mat, scuffed. A child's blotter forgotten on his chair.
- `[w-school-deep-greet]` Mr Breen comes to stand by you. "This is where I do my best teaching — when there's no one to teach."
- `[w-school-deep-reach]` A goose-feather quill in a cup, very old. "Take it," Mr Breen says. "I keep meaning to throw it out."

### Chapel (Mary Mooney)

**By the door** — ambient: piano practice, candles.
- `[w-chapel-door-desc]` You step in. Cool stone, the candle-smell of an old chapel. The piano still going, somewhere out of sight.
- `[w-chapel-door-up]` A stained-glass window — two saints whose names you've forgotten. Light puddling on the stone.
- `[w-chapel-door-down]` Flagstones polished by Sunday shoes. A hymn-book left open on the back pew.
- `[w-chapel-door-greet]` The piano stops. Mary Mooney pokes her head out from behind a pillar. "You came in. That's nice."
- `[w-chapel-door-pickup]` A votive candle-stub on the porch ledge, wax cooled. Mary nods — yours.

**Deeper in** — by the piano.
- `[w-chapel-deep-desc]` Down the aisle, towards the piano. Mary Mooney at the keys, the music starting again — quietly, with you there.
- `[w-chapel-deep-up]` Wooden roof-beams. A swift's nest in the corner above the choir-stalls.
- `[w-chapel-deep-down]` A brass plaque set in the floor, a name worn almost to nothing.
- `[w-chapel-deep-greet]` Mary plays one more chord, then stops. "This bit — it's a kind of half-chord. I don't know if I'll finish it."
- `[w-chapel-deep-reach]` A holly sprig tucked into the lectern, left from Christmas. Yours if you want.

### Catherine O'Reilly

**By the door** — ambient: two clocks ticking out of sync, cats purring faintly.
- `[w-catherine-door-desc]` You step into Catherine's parlour. A clock ticking. Lace curtains, three of her cats arranged on chairs.
- `[w-catherine-door-up]` A picture-rail with framed photographs all the way around. Two grandfather clocks ticking out of sync.
- `[w-catherine-door-down]` A Persian rug, very old, very loved. One corner curled where a cat has worried it.
- `[w-catherine-door-greet]` Catherine looks up from her embroidery. "Sit down. Don't mind the cats — they were here first."
- `[w-catherine-door-pickup]` A bookmark on the floor — silk, embroidered roses. Catherine sees you spot it. "Keep it. I never finish a book anyway."

**Deeper in** — the back room.
- `[w-catherine-deep-desc]` Deeper in, the back room. Sunlight, a sewing table, an old radio playing something orchestral very quietly.
- `[w-catherine-deep-up]` A bunch of dried lavender pinned to the rafter. The scent settles on you.
- `[w-catherine-deep-down]` Floorboards laid by her father, she'll tell you if you ask. A black cat watching.
- `[w-catherine-deep-greet]` Catherine joins you. "This is the room I like best. Don't tell the front room."
- `[w-catherine-deep-reach]` A brass thimble hanging on a thread. "My mother's," Catherine says. "You take it. She wouldn't have wanted it gathering dust."

### Pub (Barney)

**By the door** — ambient: low chat, fire crackling, glass on wood.
- `[w-pub-door-desc]` You step into the pub. Dark wood, the smell of last night's fire still in the chairs. Barney behind the bar, polishing a glass.
- `[w-pub-door-up]` A bracket of dried hop-bines above the bar. A mounted trout, very old, very dusty.
- `[w-pub-door-down]` Sawdust on the floor, a few rings where stout glasses have stood.
- `[w-pub-door-greet]` Barney grins. "Come in, come in. It's quiet — you can have any seat in the house."
- `[w-pub-door-pickup]` A beer mat curling at the edges, with a darts score on the back. Barney waves — "Take it. They're free."

**Deeper in** — the snug.
- `[w-pub-deep-desc]` Past the bar, into the snug. A small fire just lit. A grandfather clock chiming the half-hour.
- `[w-pub-deep-up]` A mantelshelf of dusty bottles, a horse-brass, a postcard from Margaret's sister in Boston.
- `[w-pub-deep-down]` Flagstones, a worn red rug. A black cat with white paws asleep on the hearth.
- `[w-pub-deep-greet]` Barney follows. "This is the snug. The serious drinkers come here. The talkers stay at the bar."
- `[w-pub-deep-reach]` A bottle of stout from a hook above the bar, dark glass. "On the house," Barney says. "Don't tell Margaret."

---

## 6. Ambient interior sounds (one per place)

These would be short loopable MP3s, not voice. We can either generate via ElevenLabs Sound Effects, find royalty-free clips, or skip ambient sounds for now and rely on Mary's narration alone.

| Place | Sound |
|---|---|
| Bakery | oven crackling + faint humming |
| Bridie's | kettle whistle just starting |
| Post office | clock ticking + wireless humming |
| Schoolhouse | chalk on board + faint children outside |
| Chapel | piano practice |
| Catherine's | two ticking clocks |
| Pub | low chat + fire crackling |

Flag this if you want sound — I'd recommend trying ElevenLabs **Sound Effects** (also on Starter plan) and pre-generating ~5–10s clips per place.

---

## Totals

| Category | New lines |
|---|---|
| Tutorial intros + vignettes | 12 |
| Mini-scene updated lines | 2 |
| Cues / reprompts / almost | 12 |
| Generic fallbacks | 4 |
| Outdoor pickups / reaches | 15 |
| Interior states (7 × 2 × 5) | 70 |
| **Total** | **115** |

Roughly **8,500 characters** of new generation. Comfortable on Starter.

---

## How to review

Read straight through. Mark anything that's wrong in any of these ways:
- **Tone**: doesn't sound like Mary, or doesn't sound like a sane Irish villager
- **Content**: wrong item, wrong character, factual oddity ("Mr Breen wouldn't say that")
- **Length**: too long, too short
- **Order**: vignette order should change
- **Missing**: should add a state, an item, a person

Once you've signed off (or marked changes), I'll commit the final text into `audio/lines.json`, wire the new gestures into `index.html`, add the tutorial scenes, wire the wander interiors, and you'll re-run the workflow to generate the new audio.
