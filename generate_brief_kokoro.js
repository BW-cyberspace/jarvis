#!/usr/bin/env node
// Speaks the J.A.R.V.I.S. brief with Kokoro-82M — free, offline, no API key.
// Saves jarvis_brief.wav (dashboard.html plays it when you click BRIEF ME).
//
// Usage:
//   npm install                      (once; first run also downloads the ~90 MB model)
//   node generate_brief_kokoro.js
//   KOKORO_VOICE=bm_daniel node generate_brief_kokoro.js
//   node generate_brief_kokoro.js "Custom text to speak"
//
// Voices: bm_george (default), bm_daniel, bm_lewis, bm_fable (British male),
// am_michael, am_adam (American male), af_heart, bf_emma (female), and more.

const fs = require("fs");
const vm = require("vm");

function briefText() {
  if (process.argv[2]) return process.argv.slice(2).join(" ");
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(`${__dirname}/jarvis_data.js`, "utf8"), sandbox);
  const d = sandbox.window.JARVIS_DATA;
  return [
    d.greeting,
    "Here is your brief.",
    ...d.priorities.map((p, i) => `Priority ${i + 1}: ${p}.`),
    d.closer,
  ].join(" ");
}

// Minimal 16-bit PCM mono WAV encoder.
function toWav(samples, rate) {
  const buf = Buffer.alloc(44 + samples.length * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + samples.length * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(rate, 24); buf.writeUInt32LE(rate * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE((s * 32767) | 0, 44 + i * 2);
  }
  return buf;
}

async function main() {
  const { KokoroTTS, TextSplitterStream } = require("kokoro-js");
  const voice = process.env.KOKORO_VOICE || "bm_george";

  console.log("Loading Kokoro-82M (first run downloads the model, ~90 MB)…");
  const tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
    dtype: "q8",
  });

  const text = briefText();
  console.log(`Speaking ${text.length} chars with voice "${voice}"…`);

  // Stream sentence-by-sentence — a single generate() call truncates long text.
  const splitter = new TextSplitterStream();
  const stream = tts.stream(splitter, { voice });
  splitter.push(text);
  splitter.close();

  const chunks = [];
  let rate = 24000;
  for await (const { text: sentence, audio } of stream) {
    chunks.push(audio.audio);
    rate = audio.sampling_rate;
    console.log(`  ✓ ${sentence.slice(0, 60)}${sentence.length > 60 ? "…" : ""}`);
  }

  const total = chunks.reduce((n, c) => n + c.length, 0);
  const pcm = new Float32Array(total);
  let off = 0;
  for (const c of chunks) { pcm.set(c, off); off += c.length; }

  const out = `${__dirname}/jarvis_brief.wav`;
  fs.writeFileSync(out, toWav(pcm, rate));
  console.log(`Saved ${out} (${(total / rate).toFixed(1)}s) — open dashboard.html and click BRIEF ME.`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
