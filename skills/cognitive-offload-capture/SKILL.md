---
name: cognitive-offload-capture
description: "Turn messy thoughts, notes, obligations, or inbox items into a trusted triage: do now, schedule, delegate, park, memory, or skill candidate."
---

# Cognitive Offload Capture

Use this skill when the user dumps messy context and needs it moved out of working memory.

## Workflow

1. Preserve the user's intent without over-summarizing away important nuance.
2. Identify obligations, ideas, decisions, risks, and emotional load.
3. Anchor the capture to the visible goal and current bottleneck when available.
4. Apply the opt-out rule item by item:
   - If it is fast and concrete, mark `do_now`.
   - If it matters and cannot be done now, mark `schedule` with a proposed time window.
   - If another person/system should handle it, mark `delegate` and draft the ask.
   - If it is not for the current goal, mark `park` with a review trigger.
   - If it explains the user's system, mark `memory` only after retention approval.
   - If it repeats, mark `skill candidate`.
5. For scheduled items, include when/where and the first physical/digital action.
6. For delegated items, draft the apprentice task.
7. For parked items, define the review trigger.
8. End with the smallest next action and the system repair if the same kind of item keeps appearing.

## Output Format

```markdown
# Cognitive Offload

## Source Window

## Do Now

## Schedule

Each scheduled item must include `when`, `where`, and `first step`.

## Delegate

## Park

## Memory

## Skill Candidates

## Smallest Next Action

## Approval Needed
```

## Guardrails

- Do not create calendar events, tasks, files, emails, messages, or issues without approval.
- Do not turn every idea into an obligation.
- Separate action from reflection.
- Keep the user's language where it carries motivation or meaning.
