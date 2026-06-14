---
name: source-to-focus-state
description: Convert bounded source material into a derived ADHD Copilot focus state store without retaining or republishing raw private content.
---

# Source To Focus State

Use this skill when the user wants to turn approved source material into a reusable focus operating model.

## Inputs

- Approved source window.
- User goal.
- Current bottleneck.
- Calendar/task/device/environment constraints.
- Permission boundary for retention.

Do not fetch, store, or republish copyrighted or private source material unless the user has rights and explicitly approves retention. Prefer derived summaries, protocols, and state objects.

## Workflow

1. Identify the source window and retention boundary.
2. Extract concepts, not raw source text.
3. Map concepts to focus-system primitives: goal, bottleneck, cue, schedule, task, environment, device rule, routine, repair loop, and skill candidate.
4. Produce a derived state store.
5. Label facts, inferences, and recommendations.
6. Identify which protocols should become ADHD Copilot skills.
7. Propose a local memory entry.

## Output Format

```markdown
# Focus State Store

## Source Boundary

## Derived Principles

## Operating Modules

## Setup Protocols

## Triage Rules

## Skill Candidates

## Retention Decision

## Continuity Memory
```

## Guardrails

- Do not include long excerpts or raw transcripts.
- Keep derived state separate from private source material.
- Ask before writing source-derived memory.
- Do not diagnose or treat ADHD.
