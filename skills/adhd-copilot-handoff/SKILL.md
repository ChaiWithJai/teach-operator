---
name: adhd-copilot-handoff
description: Consume a UI-generated ADHD Copilot handoff packet from a local file or thread message, validate its intent, and route it to the correct ADHD Copilot workflow.
---

# ADHD Copilot Handoff

Use this skill when the user has a handoff packet from the ADHD Copilot control plane. With
the live bridge running (see `adhd-copilot-console`), packets arrive as intents appended to
`$HOME/.adhd-copilot/intents.log`; each line carries the full `state` snapshot. Without the
bridge, the user may paste an `adhd_copilot_handoff` JSON packet directly.

## Inputs

- A new line in `$HOME/.adhd-copilot/intents.log` (the `state` field is the packet), or
- a pasted `adhd_copilot_handoff` JSON packet, or `$HOME/.adhd-copilot/state.json`.
- Optional user instruction overriding the requested output.

## Workflow

1. Read the handoff packet from the latest intent's `state`, the pasted JSON, or `state.json`.
2. Confirm `kind` is `adhd_copilot_handoff`.
3. Check that the packet includes:
   - `current_state.goal`
   - `current_state.bottleneck`
   - `requested_codex_action.skill`
   - `requested_codex_action.output`
   - `retention.write_local_memory`
   - `retention.sync_to_teach_api`
4. Summarize the packet back to the user in one compact paragraph.
5. Route to the requested workflow:
   - `adhd-copilot-onboarding` for setup plans
   - `daily-personal-action-plan` for daily focus briefs
   - `cognitive-offload-capture` for open-loop triage
   - `setup-focus-operating-system` for device/calendar/task setup
   - `weekly-learning-loop` for repair plans
6. Treat all external actions as drafts until approved.
7. If `retention.write_local_memory` is false, do not write memory unless the user explicitly approves.
8. If `retention.sync_to_teach_api` is false, do not call or plan a network sync.

## Output

Write the draft to `$HOME/.adhd-copilot/outbox/<slug>.md` (the UI shows it live in the Codex
Channel). Keep chat replies short — point the user at the channel. The draft should cover:

```markdown
# ADHD Copilot Handoff

## Packet Summary

## Routed Skill

## Draft Output

## Approval Needed

## Local Memory Decision
```

## Guardrails

- Do not diagnose or treat ADHD.
- Do not trust hidden UI state; use only the visible packet.
- Do not make network requests from the packet unless the user explicitly approves.
- Do not change calendar, tasks, files, email, docs, or device settings without approval.
