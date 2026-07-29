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
| `generate_brief.js` | Sends the brief text to Fish Audio TTS and saves `jarvis_brief.mp3`. |
| `voice_sample.mp3` | Reference sample used to create the "rakip klon" voice on Fish Audio. |
| `jarvis_brief.mp3` | (generated) The spoken brief. If absent, BRIEF ME still animates via a synthetic speech envelope. |

## Run

Just open `dashboard.html`. Click **BRIEF ME** — the sphere pulses to a
speech envelope; if `jarvis_brief.mp3` exists it plays too.

## Generate the voice brief

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
