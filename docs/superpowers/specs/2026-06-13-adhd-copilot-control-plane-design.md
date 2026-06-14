# ADHD Copilot — Generative UI Control Plane (Design)

Date: 2026-06-13
Status: Built.

## Amendment (during build)

Two decisions changed mid-build at the user's direction:

1. **Stack: Vite + Svelte, not Python.** The bridge is a Vite plugin
   (`vite-plugin-adhd-bridge.js`) exposing `/api/*`, not a Python `http.server`. Rationale
   ("deterministic AI"): the UI is a compiled Svelte app — fixed, deterministic — and Codex
   is the apprentice reacting to the local files, rather than the model regenerating HTML each
   session. Transports collapse to two tiers (live `/api` bridge → paste fallback); the File
   System Access middle tier is dropped since the dev server is the normal path.
2. **Visual identity matched to `vrindavan-learning-workbench` (TryDogfooding "Natural
   Intelligence" palette):** cream canvas, walnut ink, terracotta CTAs, olive accents,
   Source Serif 4 + Plus Jakarta Sans. Implicit "blank canvas / whiteboard / 80s classroom"
   feel via a faint graph-paper grid and a dark-green chalkboard Codex Channel (never named).

The architecture below stands; only the bridge implementation language and tier count changed.

## Problem (the bad eval)

Running `adhd-copilot-onboarding` emitted a **markdown wall of text** with empty
"To be captured" sections instead of delivering an interactive UI. The existing
`ui/control-plane.html` was a **static, hardcoded one-shot form** — not generated
per person, not aware of the 9 course modules, and its only sync-back path was
"save a JSON file / copy a message." It was a form, not a control plane.

Goal: the skill should **deliver an interactive, course-aware HTML console** whose
clicks write to a local store that Codex reads/writes — an invisible handoff —
instead of emitting markdown.

## Principles

- **Invisible handoff.** No "Save" button, no "now go read the file." Clicks just flow.
- **Local-first.** Nothing leaves the machine. No SaaS, no remote network, no web
  state store as source of truth. Local files are the source of truth.
- **Codex only ever talks to files.** The localhost server is a browser-side
  convenience; it changes the browser's reach, never Codex's contract.
- **Course-driven.** The 9 transcripts (Subtract → Add → Multiply) are the spine.
- **ADHD-friendly.** One decision at a time, low cognitive load, reward on completion,
  reversible setup, no shame.

## Architecture: one source of truth, three transports

```
$HOME/.adhd-copilot/            (gitignored by living outside the repo)
  state.json                    single source of truth (profile, current_state, surfaces, module progress)
  intents.log                   append-only: user actions that need Codex
  outbox/                       Codex drafts (setup plan, daily brief) pre-approval
  memory.md                     continuity memory

Codex  <-- reads/writes -->  these files        (always, every tier)
HTML   <-- best available transport -->  those files
```

### Fallback ladder (auto-detected at load, degrades silently)

| Tier | Condition | Experience |
|------|-----------|------------|
| 1. Live bridge (target) | `GET /state` on localhost answers | Clicks POST live; UI updates as Codex works. No buttons. Invisible. |
| 2. File bridge | no server, File System Access API present | HTML autosaves `state.json`; Codex polls. One folder-grant click, then silent. |
| 3. Paste token | neither | One-line token to paste. Always works. |

Same handoff packet shape across all three (existing schema).

### The bridge (`ui/bridge.py`)

Python stdlib `http.server`, zero deps. Serves the HTML and exposes:
- `GET /state` → current `state.json` (also the tier-1 probe)
- `POST /state` → replace `state.json` (autosave)
- `POST /intent` → append an action request to `intents.log`
- `GET /events?since=N` → long-poll; returns when `state.json` or `outbox/` changes
- `GET /outbox` → list + contents of drafts

The server only reads/writes `~/.adhd-copilot/` files; it holds no state. Codex runs
it via `run_in_background` and watches `intents.log`. New intent → Codex acts → writes
`state.json`/`outbox/` → long-poll pushes the update → UI reflects it.

## Course spine (instructional-design applied)

`state/course-modules.json` holds the 9 modules as labeled learning objects
(LEARNING_OBJECTIVE, CONCEPTs, SKILLs, MISCONCEPTIONs, TRANSFER_CONTEXT, plus the
clickable `decisions` and the `apprentice_action` Codex can do). Derived concepts
only — no raw transcript text (transcripts stay in gitignored `source-material/`).

Order (course's own): **Subtract** (phone, environment) → **Add** (clarity,
prioritization, time, execution) → **Multiply** (routines, next-level).

## Skills

- `adhd-copilot-console` (new) — start bridge, open browser, watch `intents.log`, act.
- `adhd-copilot-onboarding` — deliver the console (not markdown); setup plan becomes
  an artifact written to `outbox/` and rendered by the UI.
- `adhd-copilot-handoff` — consume an intent/handoff packet and route to a workflow.
- Others read/write the `~/.adhd-copilot/` store.

## Scope: two slices

- **Slice 1 (now):** invisible bridge + fallback ladder + onboarding wizard (9 modules
  as guided setup). Proves it works end to end.
- **Slice 2 (next):** same console becomes the daily/weekly management surface (today /
  open loops / repair loop). Built as additional views over the same store.

## Verification

Run the bridge, `curl GET /state`, `POST /intent`, confirm files update, screenshot UI.
</content>
</invoke>
