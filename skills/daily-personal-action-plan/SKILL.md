---
name: daily-personal-action-plan
description: Create a private ADHD Copilot daily focus brief from bounded calendar, email, document, project, or thread context. Use when the user wants help choosing what to do next, scheduling action, offloading open loops, or creating continuity memory.
---

# Daily Focus Brief

Use this skill to turn bounded personal context into a daily focus brief.

## Source Boundaries

Do not sweep private systems broadly. Ask for or infer a narrow window:

- Calendar: last 24 hours and next 7 days.
- Gmail: explicit query only, such as `newer_than:3d -category:promotions`.
- Drive: explicit file, folder, or project keywords.
- Local files: current repo or user-selected folder.
- Codex: current thread or user-provided summary.

If the user has not approved reading a source, ask before using it.

## Workflow

1. Identify the source window and constraints.
2. Separate facts, inferences, and unknowns.
3. Read the trusted-system state: visible goal, current bottleneck, calendar blocks, task lanes, and last repair note.
4. If phone/environment/clarity are not set, make the missing setup step the first recommendation.
5. Name the user's JTBD: what progress are they trying to make now?
6. Identify the goal and bottleneck.
7. Extract open loops, obligations, opportunities, and energy drains.
8. Sort open loops into do now, schedule, delegate, or park:
   - `do_now`: can be completed now in under 10 minutes.
   - `schedule`: needs a concrete when/where.
   - `delegate`: needs a drafted ask.
   - `park`: does not serve the current goal or needs a later review trigger.
9. Pick one needle-mover that attacks the bottleneck.
10. Convert the needle-mover into a first step, ownership reframe, immediate benefit, and calendar/task destination.
11. Propose 3-7 actions, each with:
   - outcome
   - next physical/digital action
   - time estimate
   - source/evidence
   - cost of not doing it
12. Recommend the best action plan, but ask the user to choose.
13. Identify apprentice delegation: what Codex or an automation can do next.
14. Extract skill candidates from repeated work.
15. Write or propose a local continuity memory.

## Output Format

```markdown
# Daily Focus Brief

## Source Window

## Current State

## Goal And Bottleneck

## Open Loop Triage

## Today's Plan

## Needle Mover

## First Step And Self-Talk

## Apprentice Delegation

## Skill Candidates

## Mental Models

## Open Loops

## Proof Receipt

## Continuity Memory
```

## Guardrails

- Do not create calendar events, tasks, emails, docs, issues, or public artifacts without explicit approval.
- Do not turn every insight into a task.
- Keep private lessons separate from team-visible lessons.
- If sensitive data appears, summarize minimally and ask before retaining it.
- Do not diagnose or treat ADHD.
