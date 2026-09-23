#!/usr/bin/env node
// List every line the Yes or No game can say and write yesno/voice/lines.json
// for the generator.
//
// The wording lives in yesno/index.html, between the @voice-lines-begin and
// @voice-lines-end markers. That block is plain JavaScript, so it runs here
// without a browser, and the game and this script name each clip with the
// same voiceId() function. A clip's name comes from its words, so rewording a
// line gives it a new name: the generator then records the new words, and the
// old recording is deleted here as no longer played.
//
// Usage:
//   node scripts/extract-yesno-lines.mjs            (write lines.json, delete unplayed clips)
//   node scripts/extract-yesno-lines.mjs --check    (report only, change nothing)

import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(ROOT, 'yesno/index.html');
const VOICE_DIR = resolve(ROOT, 'yesno/voice');
const OUT = resolve(VOICE_DIR, 'lines.json');
const checkOnly = process.argv.includes('--check');

const src = readFileSync(SRC, 'utf8');
const begin = src.indexOf('// @voice-lines-begin');
const end = src.indexOf('// @voice-lines-end');
if (begin === -1 || end === -1 || end < begin) throw new Error('voice-lines markers not found in yesno/index.html');

const context = {};
runInNewContext(src.slice(begin, end) + '\nthis.lines = allVoiceLines();', context);
const lines = context.lines;

// allVoiceLines() throws if two different lines would share a clip name.
const ids = Object.keys(lines);
const empty = ids.filter(id => !lines[id] || !lines[id].trim());
const chars = ids.reduce((n, id) => n + lines[id].length, 0);

const onDisk = existsSync(VOICE_DIR) ? readdirSync(VOICE_DIR).filter(f => f.endsWith('.mp3')) : [];
const unplayed = onDisk.filter(f => !(f.slice(0, -4) in lines));
const toRecord = ids.filter(id => !onDisk.includes(`${id}.mp3`));

console.log(`Lines:            ${ids.length}`);
console.log(`Characters:       ${chars}`);
console.log(`Still to record:  ${toRecord.length} (${toRecord.reduce((n, id) => n + lines[id].length, 0)} characters)`);
console.log(`No longer played: ${unplayed.length}`);
if (empty.length) {
  console.error(`\nEMPTY:\n  ${empty.join('\n  ')}\nRefusing to write lines.json.`);
  process.exit(1);
}
if (checkOnly) process.exit(0);

mkdirSync(VOICE_DIR, { recursive: true });
writeFileSync(OUT, JSON.stringify(lines, null, 2) + '\n');
console.log(`Wrote ${OUT.replace(ROOT + '/', '')}`);
for (const f of unplayed) {
  unlinkSync(resolve(VOICE_DIR, f));
  console.log(`Deleted ${f} (its line was reworded or removed)`);
}
