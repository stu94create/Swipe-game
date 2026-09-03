#!/usr/bin/env node
// Read the LINES registry out of abba/index.html, check every ID the game can
// ask for actually exists, and write abba/voice/lines.json for the generator.
//
// The game is one self-contained file, so index.html stays the source of truth
// for the wording and lines.json is a build artifact. Run this after editing
// any line, before generating audio.
//
// Usage:
//   node scripts/extract-lines.mjs            (check + write lines.json)
//   node scripts/extract-lines.mjs --check    (check only, non-zero on problems)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(ROOT, 'abba/index.html');
const OUT = resolve(ROOT, 'abba/voice/lines.json');
const checkOnly = process.argv.includes('--check');

const src = readFileSync(SRC, 'utf8');

// The registry is a plain object literal so it can be lifted out without a browser.
const open = src.indexOf('const LINES = {');
if (open === -1) throw new Error('LINES registry not found in abba/index.html');
const close = src.indexOf('\n  };', open);
const literal = src.slice(src.indexOf('{', open), close + 4).replace(/;\s*$/, '');
const LINES = runInNewContext('(' + literal + ')');

// Every ID the game can ask for. Two passes, because they reach the engine by
// several routes: a strict one over the call shapes that must name a real line
// (so a typo is caught), and a loose one over every string left in the file
// (so a line nobody wired up is caught).
const GESTURES = ['left', 'right', 'up', 'down', 'doubletap'];
const rest = src.slice(0, open) + src.slice(close);
const wanted = new Set();

for (const m of src.matchAll(/\bT\('([a-z0-9-]+)'\)/g)) wanted.add(m[1]);            // T('sys-welcome')
for (const m of src.matchAll(/\bop\('([a-z0-9-]+)'/g)) wanted.add(m[1]);              // op('q-car')
for (const m of src.matchAll(/\bop\('[a-z0-9-]+',\s*\{([^}]*)\}/g))                  // op('q-wedding', { left: 'q-wedding-l' })
  for (const r of m[1].matchAll(/'([a-z0-9-]+)'/g)) wanted.add(r[1]);
for (const m of src.matchAll(/\bdrill\('[a-z]+'((?:,\s*'[a-z0-9-]+')*)\)/g))          // drill('left', 'f-sweden', 'f-sweden-a')
  for (const r of m[1].matchAll(/'([a-z0-9-]+)'/g)) wanted.add(r[1]);
for (const m of src.matchAll(/\[([^\]]*)\]\.map\(T\)/g))                             // ['praise-1', …].map(T)
  for (const r of m[1].matchAll(/'([a-z0-9-]+)'/g)) wanted.add(r[1]);

// Built from a gesture name at the moment they're spoken.
for (const g of GESTURES) {
  wanted.add(`locked-${g}`);
  wanted.add(`m-${g}`);
  wanted.add(`pr-intro-${g}`);
  wanted.add(`end-practise-${g}`);
  for (const w of GESTURES) if (w !== g) wanted.add(`fix-${g}-${w}`);
}
wanted.add('pr-intro-all');

const mentioned = new Set([...rest.matchAll(/['"`]([a-z0-9-]{2,})['"`]/g)].map(m => m[1]));

const missing = [...wanted].filter(id => !(id in LINES)).sort();
const orphans = Object.keys(LINES).filter(id => !wanted.has(id) && !mentioned.has(id)).sort();
const empty = Object.entries(LINES).filter(([, t]) => !t || !t.trim()).map(([id]) => id);
const chars = Object.values(LINES).reduce((n, t) => n + t.length, 0);

console.log(`Lines:      ${Object.keys(LINES).length}`);
console.log(`Characters: ${chars}`);
if (missing.length) console.error(`\nMISSING (the game asks for these, LINES has no text):\n  ${missing.join('\n  ')}`);
if (orphans.length) console.error(`\nORPHANED (in LINES, nothing ever plays them):\n  ${orphans.join('\n  ')}`);
if (empty.length) console.error(`\nEMPTY:\n  ${empty.join('\n  ')}`);

if (missing.length || orphans.length || empty.length) {
  console.error('\nRefusing to write lines.json.');
  process.exit(1);
}
console.log('Every ID resolves, nothing orphaned.');

if (checkOnly) process.exit(0);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(LINES, null, 2) + '\n');
console.log(`Wrote ${OUT.replace(ROOT + '/', '')}`);
