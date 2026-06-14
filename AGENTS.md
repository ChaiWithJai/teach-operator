# AGENTS.md — ADHD Copilot

Local-first, ADHD-aware focus control plane. The UI is a deterministic Vite + Svelte app;
the agent is the apprentice that reacts to local files. This file is read by Codex and
opencode; Claude Code reads the same `skills/` plus `CLAUDE.md`.

## What you (the agent) do here

1. **Launch the console** (skill: `adhd-copilot-console`): `npm install` (first run) then
   `npm run dev` → http://localhost:7890. Data store is `$HOME/.adhd-copilot/`.
2. **Watch** `$HOME/.adhd-copilot/intents.log`. Each line is a user action with the full
   `state` snapshot attached.
3. **Act** on intents and write drafts to `$HOME/.adhd-copilot/outbox/<slug>.md`. The UI
   long-polls and renders them live in the Codex Channel.
4. **Default surfaces (read-first):** Google Calendar, Gmail, Google Drive. Notion later.
   The headline job is organizing the calendar + setting the goal as a calendar event.

## Hard rules

- **Drafts first, always.** Never write/send/modify calendar, email, files, tasks, or device
  settings without explicit per-action approval. Surface a diff in the channel first.
- **Local-first.** `$HOME/.adhd-copilot/` files are the source of truth. No remote sync unless
  `retention.sync_to_teach_api` is true.
- **No shame, no diagnosis.** Treat misses as system diagnostics. Don't make medical claims.
- **Never regenerate the UI in chat.** The app is fixed code; you are the apprentice behind it.

## Skills (portable SKILL.md)

`adhd-copilot-console` (entry) · `adhd-copilot-onboarding` · `adhd-copilot-handoff` ·
`setup-focus-operating-system` (calendar-aware) · `daily-personal-action-plan` ·
`cognitive-offload-capture` · `weekly-learning-loop` · `source-to-focus-state`.

## Run / build

```bash
npm install
npm run dev      # console + file bridge on :7890
npm run build    # production build
```
