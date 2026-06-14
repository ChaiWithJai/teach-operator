---
name: weekly-learning-loop
description: Synthesize daily focus briefs, action plans, or work logs into a weekly repair loop with repeated themes, completed actions, avoided actions, focus-system breakdowns, skill candidates, and one recommended bet for next week.
---

# Weekly Repair Loop

Use this skill to turn a week of work into a repair loop.

## Inputs

- Daily focus briefs.
- Calendar summary.
- Action plan status.
- Important emails/docs/thread summaries.
- User reflection.

Use bounded context. If source material is missing, work from what is available and label gaps.

## Workflow

1. Summarize the week.
2. Identify repeated themes.
3. Identify completed actions.
4. Identify avoided or delayed actions.
5. Diagnose which module broke:
   - phone: distraction or notification breach
   - environment: calendar/tasks/goal not visible
   - clarity: goal missing or too vague
   - prioritization: bottleneck not named
   - time: open loops floating without when/where
   - execution: task too large, no first step, hostile self-talk
   - routines: morning/evening block unprotected or too hard
   - next_level: no completion reinforcement or no skill extraction
6. Pick the earliest broken prerequisite in the module order.
7. Extract lessons without shaming the user.
8. Extract skill candidates.
9. Identify recurring mental models.
10. Name open loops and assign lanes.
11. Recommend one repair bet for next week tied to the broken module.
12. Create continuity memory.

## Output Format

```markdown
# Weekly Repair Loop

## Week Summary

## Repeated Themes

## Completed Actions

## Avoided Or Delayed Actions

## Focus System Breakdowns

## Earliest Broken Module

## Lessons

## Skill Candidates

## Mental Models

## Open Loops

## One Repair Bet For Next Week

Must include the exact setup change, the visible cue, and the done criterion.

## Continuity Memory
```
