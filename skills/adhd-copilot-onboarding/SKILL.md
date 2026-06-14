---
name: adhd-copilot-onboarding
description: Map a user's ADHD-aware focus system and create the first ADHD Copilot setup plan. Use when someone suspects ADHD, was diagnosed late, or wants an AI control plane across goals, bottlenecks, calendar, tasks, phone, computer, environment, and local memory.
---

# ADHD Copilot Onboarding

Use this skill to produce the first ADHD Copilot setup plan from a handoff packet.

## Interaction Style

**Deliver the UI, do not dump text.** When the user wants to onboard, the default move is
to launch the visual control plane via the `adhd-copilot-console` skill — a deterministic
Svelte app, not markdown you generate in chat. The user clicks through the four steps to
hyperfocus; their choices arrive as a handoff packet (an intent in
`$HOME/.adhd-copilot/intents.log` with the full `state` attached).

When you receive a `setup_plan` intent (or a pasted packet), produce the plan below and
**write it to `$HOME/.adhd-copilot/outbox/setup-plan.md`** so the UI renders it live in the
Codex Channel. Do not paste the empty section skeleton into chat — fill it from the packet,
or omit sections you have no data for.

If the user is genuinely chat-only (no UI), ask one short question at a time and fill the
same packet shape from `docs/generative-ui-control-plane.md`.

## Source Boundaries

Use bounded context only. Ask before reading email, calendar, Drive, Slack, local files, or account data. If the user wants a fast start, work from their answers and the current thread.

## Intake

Capture:

- ADHD relationship: suspicious, diagnosed late, formally diagnosed, self-identified, or just ADHD-curious
- current goal
- current bottleneck
- avoided or delayed commitments
- calendar and task system
- phone distraction patterns
- computer distraction patterns
- physical environment constraints
- best energy windows
- recurring shame loops or failure modes
- what the user wants Codex to handle as apprentice work

## Workflow

1. Read the handoff packet and module decisions.
2. Determine the first incomplete module in this exact order:
   - phone
   - environment
   - clarity
   - prioritization
   - time
   - execution
   - routines
   - next_level
3. If phone or environment is incomplete, recommend that before deeper planning.
4. Name the user's current focus JTBD.
5. Identify the likely system failure mode: unclear goal, unscheduled task, device distraction, environment mismatch, scope too large, missing cue, or motivation conflict.
6. Sort open loops into do now, schedule, delegate, or park using the opt-out rule.
7. Recommend only the next module's setup checklist plus one cross-module supporting action.
8. Identify what Codex can do next without taking external action.
9. Ask for approval before any calendar, task, document, email, file, or device change.
10. Propose a local continuity memory.

## Module Decision Rules

Use these gates to decide what the user needs next:

- Phone is complete only when the home screen points to calendar/tasks, impulse apps are removed/buried, and notifications are near-zero.
- Environment is complete only when calendar/tasks are always visible, the goal is visibly cued, and the workspace makes the first action easy.
- Clarity is complete only when one short-term goal lives in the trusted system.
- Prioritization is complete only when the single bottleneck is named.
- Time is complete only when every important open loop is do-now, scheduled, delegated, or parked.
- Execution is complete only when the current bottleneck task has a first step, ownership reframe, immediate benefit, and recovery script.
- Routines are complete only when morning/evening protected blocks exist and start with easy, likable steps.
- Next-level is complete only when the user marks the win and chooses one repeated breakdown to systematize.

## Output Format

Write this to `$HOME/.adhd-copilot/outbox/setup-plan.md` (the UI shows it live). Fill every
section from the packet; drop sections with no data rather than emitting empty placeholders.

```markdown
# ADHD Copilot Setup Plan

## Source Window

## ADHD Relationship

## Current Goal

## Bottleneck

## Focus System Diagnosis

## First Incomplete Module

## Required Next Checklist

## Open Loop Triage

## Phone Setup

## Computer Setup

## Calendar And Task Setup

## Environment Setup

## Apprentice Delegation

## First 24 Hours

## Proof Receipt

## Continuity Memory
```

## Guardrails

- Do not diagnose or treat ADHD.
- Treat follow-through as system design, not moral failure.
- Keep setup changes reversible and explicit.
- Do not modify external systems without approval.
