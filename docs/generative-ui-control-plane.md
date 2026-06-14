# Generative UI Control Plane

ADHD Copilot should not rely on a long README or a long chat prompt for onboarding. The product needs a lightweight generative UI that helps the user make choices and then hands those choices back to Codex.

## Principle

The UI is a control surface, not the source of truth.

- UI state is temporary.
- The Codex thread is the active reasoning surface.
- Local handoff files are the bridge between UI clicks and Codex.
- Local memory files are the durable memory surface.
- Network sync is optional and explicit.
- External changes are drafts until approved.

## User Experience

The onboarding should be one decision at a time:

1. ADHD relationship: suspicious, diagnosed late, diagnosed, self-identified, or curious.
2. Current mode: deep work, admin, recovery, planning, team alignment, or shutdown.
3. Current goal.
4. Current bottleneck.
5. Open-loop capture.
6. Calendar/task/device/workspace friction.
7. Approval for the first Codex action.

Controls should prefer:

- chips for ADHD relationship and current mode
- toggles for connected surfaces
- sliders for energy and urgency
- short fields for goal and bottleneck
- buttons for do now, schedule, delegate, and park
- preview panels for the handoff packet and proposed memory

## Codex Handoff Packet

The UI should emit this packet into the Codex harness through a local file or thread message. The packet is the sync boundary. A web app database is not the source of truth.

```json
{
  "kind": "adhd_copilot_handoff",
  "version": "0.1.0",
  "user_profile": {
    "adhd_relationship": "suspicious | diagnosed_late | diagnosed | self_identified | curious",
    "working_style": ["founder", "operator", "creator"],
    "support_preference": "direct | gentle | structured"
  },
  "current_state": {
    "mode": "deep_work | admin | recovery | planning | team_alignment | shutdown",
    "goal": "",
    "bottleneck": "",
    "energy": 0,
    "urgency": 0
  },
  "surfaces": {
    "calendar": "none | connected | user_summary",
    "tasks": "none | connected | user_summary",
    "email": "none | connected | user_summary",
    "docs": "none | connected | user_summary",
    "phone": "not_configured | draft_rules | configured",
    "computer": "not_configured | draft_rules | configured"
  },
  "open_loops": [
    {
      "text": "",
      "lane": "do_now | schedule | delegate | park",
      "time_window": "",
      "approval_required": true
    }
  ],
  "requested_codex_action": {
    "skill": "adhd-copilot-onboarding | daily-personal-action-plan | cognitive-offload-capture | setup-focus-operating-system | weekly-learning-loop",
    "output": "setup_plan | daily_focus_brief | offload_triage | repair_plan | local_memory"
  },
  "retention": {
    "write_local_memory": false,
    "sync_to_teach_api": false
  }
}
```

## Local-First Memory

## Implementation: Vite + Svelte, file-bridge

The UI is a **deterministic compiled Svelte app** (Vite), not HTML generated each session.
A Vite plugin (`vite-plugin-adhd-bridge.js`) serves it and exposes `/api/*` over the local
dev server. Codex only ever touches files; the server is a browser-side convenience.

```
$HOME/.adhd-copilot/        single source of truth
  state.json                current handoff packet (UI autosaves here)
  intents.log               append-only; one JSON intent per line, each with the full state
  outbox/                   Codex's drafts; the UI long-polls and renders them live
  memory.md                 continuity memory (append only with approval)
```

API: `GET/POST /api/state`, `POST /api/intent`, `GET /api/intents`, `GET /api/outbox`,
`GET /api/events?since=<mtime>` (long-poll), `GET /api/health`.

Flow:

1. The UI collects clicks, fields, and short answers; autosaves to `state.json`.
2. "Ask Codex" / "Build my setup plan" appends an intent (with the state snapshot) to `intents.log`.
3. Codex (via `adhd-copilot-console`) watches `intents.log`, does the work, writes a draft to `outbox/`.
4. The UI's `/api/events` long-poll surfaces the draft in the Codex Channel within ~1s.
5. Codex asks before writing memory or changing external systems.

Two-tier graceful fallback: **live** (server up — invisible handoff) → **paste** (no server —
the app shows a one-shot packet to paste into Codex). Same packet shape either way.

When the user approves memory, Codex should write a small local artifact, not a web state store by default.

Suggested path:

```text
~/.adhd-copilot/memory/YYYY-MM-DD-<slug>.md
```

Memory should include:

- source window
- goal and bottleneck
- chosen plan
- open loops parked for review
- one system repair
- next trigger

## Generative UI Contract

The UI can be implemented as a ChatGPT App, Codex app surface, local webview, or native shell, but it must preserve this contract:

- every click produces inspectable structured state
- every generated recommendation can be edited before Codex acts
- Codex receives the handoff packet from a local file or in-thread fallback
- no hidden background sync
- no irreversible external changes without explicit approval

## First Prototype

Build the smallest useful control plane:

1. Onboarding panel.
2. Open-loop triage board.
3. Handoff preview.
4. "Save local handoff" action.
5. "Write local memory draft" action.

This is enough to test whether button-clicking lowers friction while keeping Codex as the reasoning engine.
