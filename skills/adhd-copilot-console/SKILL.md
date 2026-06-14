---
name: adhd-copilot-console
description: Launch the ADHD Copilot generative UI control plane (Vite + Svelte) and run the apprentice loop that turns the user's clicks into drafted Codex work. Use when the user wants the visual control plane, the dashboard, the UI, or to start ADHD Copilot.
---

# ADHD Copilot Console

This is the front door. The UI is a **deterministic compiled Svelte app**, not HTML you
generate each session. Your job is to launch it and act as the apprentice that reacts to
what the user captures — never to re-author the interface.

## Architecture (read once)

```
$HOME/.adhd-copilot/         single source of truth (created by the bridge plugin)
  state.json                 current control-plane state (the handoff packet)
  intents.log                append-only: user actions awaiting you, one JSON per line
  outbox/                    where you write drafts; the UI shows them live
  memory.md                  continuity memory (append only with approval)
```

A Vite plugin (`vite-plugin-adhd-bridge.js`) serves the app and exposes `/api/*` that
reads/writes those files. **You only ever touch the files.** Nothing leaves the machine.

## Launch

1. From the repo root, ensure deps: `npm install` (first run only).
2. Start the server in the background: `npm run dev` (defaults to http://localhost:7890,
   data dir `$HOME/.adhd-copilot`; override with `ADHD_COPILOT_DIR`).
3. Tell the user to open the printed URL. The page auto-detects the live bridge; the tier
   pill should read "live · invisible handoff".

## Apprentice loop

Watch `$HOME/.adhd-copilot/intents.log` for new lines (read it at the start of each turn,
or poll in the background). Each line is an intent:

```json
{ "type": "setup_plan", "state": { ...full handoff packet... }, "ts": 0 }
{ "type": "apprentice", "module": "phone", "action": "Draft a per-app notification audit…", "state": { … } }
```

For each new intent:

1. Read the attached `state` snapshot (goal, bottleneck, module decisions, open loops).
2. Do the requested work:
   - `setup_plan` → run `adhd-copilot-onboarding` against the packet.
   - `apprentice` → produce the specific module draft named in `action`.
3. Write the result as markdown to `$HOME/.adhd-copilot/outbox/<slug>.md`. The UI long-poll
   surfaces it in the Codex Channel within ~1s. No need to message the file contents into chat.
4. Keep everything a **draft**. Do not change calendar, tasks, email, files, or device
   settings without explicit approval.

## Guardrails

- Do not diagnose or treat ADHD.
- Drafts first; reversible, explicit changes only after approval.
- Honor `retention`: don't write `memory.md` unless `write_local_memory` is true or the user
  approves; never plan a network sync unless `sync_to_teach_api` is true.
- Never regenerate the UI in chat. The app is fixed code; you are the apprentice behind it.
