#!/usr/bin/env node
// Generate ElevenLabs audio for every line in audio/lines.json.
// Skips lines whose MP3 already exists, so re-running won't burn credits.
//
// Usage:
//   ELEVENLABS_API_KEY=... node scripts/generate-audio.mjs
//   node scripts/generate-audio.mjs --dry-run     (no API calls, just plan)
//   node scripts/generate-audio.mjs --force       (re-generate even if file exists)
//   node scripts/generate-audio.mjs --only=t-     (only IDs starting with prefix)

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const AUDIO_DIR = resolve(ROOT, 'audio');
const LINES_PATH = resolve(AUDIO_DIR, 'lines.json');

const VOICE_ID = process.env.VOICE_ID || 'UwtFVYnvYG6hxAbc4I6T';
const MODEL_ID = process.env.MODEL_ID || 'eleven_multilingual_v2';
const API_KEY = process.env.ELEVENLABS_API_KEY;

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const force = args.has('--force');
const onlyArg = [...args].find(a => a.startsWith('--only='));
// String *prefix* match — --only=t-mini matches all t-mini-* lines, --only=w-
// matches every wander line, --only=w-bridie matches that position's lines.
// Pair with --force when re-rendering an existing file.
const onlyPrefix = onlyArg ? onlyArg.slice('--only='.length) : null;

if (!dryRun && !API_KEY) {
  console.error('ERROR: ELEVENLABS_API_KEY is not set.');
  process.exit(1);
}

mkdirSync(AUDIO_DIR, { recursive: true });

const lines = JSON.parse(readFileSync(LINES_PATH, 'utf8'));
const entries = Object.entries(lines).filter(([id]) => !onlyPrefix || id.startsWith(onlyPrefix));

const toGenerate = entries.filter(([id]) => force || !existsSync(resolve(AUDIO_DIR, `${id}.mp3`)));
const totalChars = toGenerate.reduce((sum, [, text]) => sum + text.length, 0);

console.log(`Voice:           ${VOICE_ID}`);
console.log(`Model:           ${MODEL_ID}`);
console.log(`Lines total:     ${entries.length}`);
console.log(`Lines to render: ${toGenerate.length}`);
console.log(`Characters:      ${totalChars}`);
console.log(`Dry run:         ${dryRun}`);
console.log('');

if (dryRun || toGenerate.length === 0) {
  if (toGenerate.length === 0) console.log('Nothing to do.');
  process.exit(0);
}

async function generate(id, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const body = {
    text,
    model_id: MODEL_ID,
    voice_settings: { stability: 0.5, similarity_boost: 0.75 }
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} for ${id}: ${errText.slice(0, 300)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(resolve(AUDIO_DIR, `${id}.mp3`), buf);
  return buf.length;
}

let done = 0;
let failed = 0;
const startedAt = Date.now();

for (const [id, text] of toGenerate) {
  const label = `[${++done}/${toGenerate.length}] ${id}`;
  try {
    const bytes = await generate(id, text);
    console.log(`${label}  ${bytes} bytes`);
  } catch (e) {
    failed++;
    console.error(`${label}  FAILED — ${e.message}`);
    // Keep going so we don't lose progress on subsequent lines
  }
}

const seconds = Math.round((Date.now() - startedAt) / 1000);
console.log('');
console.log(`Generated ${done - failed}/${toGenerate.length} in ${seconds}s. Failures: ${failed}.`);
if (failed > 0) process.exit(1);
