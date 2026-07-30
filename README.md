# J.A.R.V.I.S — Command Center

A cinematic, self-contained HUD dashboard: an animated 680-point particle
sphere (Fibonacci distribution) with orbital ring, rotating dashed arcs and
tick ring on a retina-aware canvas, overlaid with a live clock, connector
status, streaming activity log, glowing stat bars, headline figures, a
scrolling ticker and a voice-brief button. Orbitron and Share Tech Mono are
embedded as data URIs, so it works fully offline.

## Files

| File | Purpose |
|---|---|
| `dashboard.html` | The whole app — open it in any browser. |
| `jarvis_data.js` | All HUD copy: greeting, connectors, funnel, sponsors, priorities, headline, closer. Edit this to redress the dashboard. |
| `generate_brief_kokoro.js` | Speaks the brief with Kokoro-82M — free, offline, no API key. Saves `jarvis_brief.wav`. |
| `generate_brief.js` | Alternative: sends the brief text to Fish Audio TTS (paid API) and saves `jarvis_brief.mp3`. |
| `voice_sample.mp3` | Reference sample used to create the "rakip klon" voice on Fish Audio. |
| `jarvis_brief.wav` / `.mp3` | (generated) The spoken brief. If absent, BRIEF ME still animates via a synthetic speech envelope. |

## Run

Just open `dashboard.html`. Click **BRIEF ME** — the sphere pulses to a
speech envelope; if `jarvis_brief.wav` (or `.mp3`) exists it plays too.

## Talk to JARVIS

Click **🎙 TALK** (Chrome or Edge — uses the built-in Web Speech API) and speak.

- **Free command mode** — always on, no account needed. Understands: *brief
  me*, *what are my priorities*, *status report*, *read the headline*,
  *sponsors*, *what time is it*, *help*, *stop*. Answers come from
  `jarvis_data.js`, spoken in a British voice via the browser's own TTS.
- **Always-on mode** — double-click **TALK** (or say *"always on"*) and JARVIS
  keeps listening indefinitely: say **"Jarvis"** before each request — *"Jarvis,
  status report"*, *"Jarvis, open YouTube"* — and everything without the wake
  word is ignored. He mutes his own microphone while speaking, re-arms it if
  Chrome times it out, and remembers the mode across page reloads. Say
  *"Jarvis, stand down"* (or double-click again) to go back to push-to-talk.
  The tab keeps the mic active the whole time (red-dot indicator) — Chrome may
  end it when the tab is fully in the background, so keep the dashboard visible.
- **Browser commands** — JARVIS can drive the browser by voice: *open
  YouTube* (also Gmail, GitHub, Calendar, Drive, Stripe, Twitch, and more),
  *open some-site.com*, *search for &lt;anything&gt;*, *play &lt;something&gt; on
  YouTube*. Tabs open in the background — the first time, Chrome may show a
  blocked-pop-up icon in the address bar; click it and choose "always allow"
  for this page.
- **Full conversations (optional)** — say *"set API key"* and paste an
  Anthropic API key (console.anthropic.com → API keys). Anything outside the
  command set is then answered by Claude in the JARVIS persona, with the live
  dashboard data as context. The key is stored only in your browser's
  localStorage and sent only to api.anthropic.com; short replies cost well
  under a cent each. Say *"set API key"* again and leave it empty to clear.

## Generate the voice brief — Kokoro (free, offline)

```bash
npm install
node generate_brief_kokoro.js
```

- First run downloads the ~90 MB Kokoro-82M model from Hugging Face; after
  that it's fully offline. No account, no API key.
- Default voice is `bm_george` (British male). Pick another with
  `KOKORO_VOICE=bm_daniel node generate_brief_kokoro.js` — try `bm_lewis`,
  `bm_fable`, `am_michael`, `af_heart`, `bf_emma`.
- Pass custom text as a CLI argument to override the composed brief.

## Generate the voice brief — Fish Audio (voice clone)

```bash
FISH_API_KEY=<your key> FISH_VOICE_ID=<voice model id> node generate_brief.js
```

- Keys: https://fish.audio → API keys. API credit is billed separately from
  platform credit — top up at https://fish.audio/app/developers.
- `FISH_VOICE_ID` is a voice model id. The "rakip klon" clone created from
  `voice_sample.mp3` is `cc2aee27e1a34fb1875597c6e493ed30`.
- Omit `FISH_VOICE_ID` to use Fish Audio's default voice; pass custom text
  as a CLI argument to override the composed brief.
- Behind a corporate/agent proxy, Node's fetch needs `NODE_USE_ENV_PROXY=1`
  (Node ≥ 22.21).
