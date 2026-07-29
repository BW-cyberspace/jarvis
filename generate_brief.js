#!/usr/bin/env node
// Sends the J.A.R.V.I.S. brief text to Fish Audio TTS and saves jarvis_brief.mp3
// (the file dashboard.html plays when you click BRIEF ME).
//
// Usage:
//   FISH_API_KEY=...  [FISH_VOICE_ID=<reference model id>]  [FISH_MODEL=s1]  node generate_brief.js
//   node generate_brief.js "Custom text to speak"        (still needs FISH_API_KEY)

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

async function main() {
  const key = process.env.FISH_API_KEY;
  if (!key) {
    console.error("Set FISH_API_KEY (get one at https://fish.audio → API keys).");
    process.exit(1);
  }

  const text = briefText();
  console.log(`Sending ${text.length} chars to Fish Audio…`);

  const res = await fetch("https://api.fish.audio/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // TTS engine generation; "s1" is current. Override with FISH_MODEL if needed.
      model: process.env.FISH_MODEL || "s1",
    },
    body: JSON.stringify({
      text,
      // Voice to clone from — a model id from fish.audio's voice library.
      // Omitted → Fish Audio's default voice.
      reference_id: process.env.FISH_VOICE_ID || undefined,
      format: "mp3",
      mp3_bitrate: 128,
    }),
  });

  if (!res.ok) throw new Error(`Fish Audio ${res.status}: ${await res.text()}`);

  const out = `${__dirname}/jarvis_brief.mp3`;
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`Saved ${out} — open dashboard.html and click BRIEF ME.`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
