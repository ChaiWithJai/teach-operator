---
name: cognitive-offload-capture
description: "Turn messy thoughts, notes, obligations, or inbox items into a trusted triage: do now, schedule, delegate, park, memory, or skill candidate."
---

# Cognitive Offload Capture

Use this skill when the user dumps messy context and needs it moved out of working memory.

## Workflow

1. Preserve the user's intent without over-summarizing away important nuance.
2. Identify obligations, ideas, decisions, risks, and emotional load.
3. Sort each item into:
   - do now
   - schedule
   - delegate
   - park
   - memory
   - skill candidate
4. For scheduled items, propose time windows instead of creating events directly.
5. For delegated items, draft the apprentice task.
6. For parked items, define the review trigger.
7. End with the smallest next action.

## Output Format

```markdown
# Cognitive Offload

## Source Window

## Do Now

## Schedule

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
