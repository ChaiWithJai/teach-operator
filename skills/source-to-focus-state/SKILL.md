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
3. Extract procedures, not just principles. Every module should yield:
   - ordered steps
   - completion gate
   - visible cue
   - failure mode
   - apprentice action
4. Map procedures to the ADHD Copilot spine:
   - phone
   - environment
   - clarity
   - prioritization
   - time
   - execution
   - routines
   - next_level
5. Convert each module into runtime gates and checklists, not loose advice.
6. Produce or update a derived state store.
7. Label facts, inferences, and recommendations.
8. Identify which protocols should become ADHD Copilot skills.
9. Propose a local memory entry.

## Quality Bar

Reject loose distillation. A useful state object must answer:

- What exact module comes next?
- What does the user physically or digitally change?
- What visible cue proves the change exists?
- What counts as done?
- What does Codex draft or inspect?
- What must not be done without approval?

## Output Format

```markdown
# Focus State Store

## Source Boundary

## Derived Principles

## Operating Modules

## Setup Protocols

Each protocol must include ordered steps and done criteria.

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
