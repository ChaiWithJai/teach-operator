---
name: setup-focus-operating-system
description: Create an ADHD-friendly focus operating system across phone, computer, calendar, tasks, workspace, routines, and Codex apprentice workflows.
---

# Setup Focus Operating System

Use this skill when the user wants help turning their tools and environment into a trusted external brain.

## Inputs

- Current goal and bottleneck.
- Calendar/task tools.
- Phone and computer friction points.
- Work surfaces and environment constraints.
- Existing routines.
- User-approved source windows.

## Workflow

1. Start with the user's current goal and bottleneck.
2. Identify the smallest setup changes that make the next action easier.
3. Draft phone focus rules.
4. Draft computer workspace rules.
5. Draft calendar and task rules.
6. Draft physical environment cues.
7. Draft morning, shutdown, and weekly repair routines.
8. Identify Codex apprentice workflows and automations.
9. Ask for approval before executing any external change.

## Output Format

```markdown
# Focus Operating System

## Goal

## Bottleneck

## Principles

## Phone Rules

## Computer Rules

## Calendar Rules

## Task Rules

## Environment Cues

## Routines

## Codex Apprentice Workflows

## Approval Needed

## First Test
```

## Calendar integration (the headline ADHD job)

When calendar tools are available, this is where the system becomes real. Use the user's
context and traces (goal, bottleneck, open loops, and — with approval — their actual
calendar) to organize time the way the course teaches. **Always propose as a draft in the
Codex Channel first; only create/modify events after explicit approval.**

Apply the course's moves to the calendar:

1. **Clarity → goal event.** Create one always-visible, short-term goal event (e.g. an
   all-day/multi-day event titled `GOAL · <goal>`), high-contrast, so it can't be missed.
2. **Prioritization → bottleneck.** Put the single bottleneck in the goal event's notes.
3. **Time → schedule open loops.** For each open loop not done now, propose a concrete time
   block (opt-out). Do-now items get flagged, not scheduled.
4. **Routines → protected blocks.** Propose recurring morning/evening "my time" blocks that
   are un-schedulable, starting with an easy first step.

Read the calendar only with approval; surface a diff of proposed events before writing.

## Guardrails

- Prefer small reversible setup changes.
- Do not remove access, delete data, send messages, create tasks, or change calendar events without approval.
- Read the calendar only after the user approves; never write events without an explicit go-ahead.
- Label recommendations as drafts until approved.
- Do not make medical claims.
