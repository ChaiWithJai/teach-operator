# ADHD Copilot — First Release Milestone

The release is done when it **literally does the ADHD job** for one real person (Jai),
extends to a second person, and runs across Codex, opencode, and Claude Code.

## Definition of done

### 1. Does the ADHD job for Jai (dogfood)

The headline job is **calendar organization + goal-setting**, driven by the course's own system:

- Codex uses Jai's real context and traces (current goal, bottleneck, open loops, and — with
  approval — his actual calendar) to **effectively organize the calendar**.
- It **sets the goal as a calendar event**, exactly as the Clarity module teaches: one
  short-term goal as an always-visible, high-contrast event the user can't miss.
- It applies the rest of the system to the calendar:
  - **Prioritization** → the single bottleneck is named on / beside the goal event.
  - **Time** → each open loop is do-it-now or dragged onto a concrete time block (opt-out).
  - **Routines** → protected morning/evening "my time" blocks, recurring, un-schedulable.
- Everything is a **draft first**; calendar writes happen only after Jai approves.
  Implemented via the Google Calendar tools, surfaced in the UI's Codex Channel.

Acceptance: from a fresh `state.json` + "Build my setup plan", Jai ends with a calendar that
has the goal event, the day's blocks, and protected routine windows — without leaving the loop.

### 2. Extends to a second person

- A new user can run `npm run dev`, click through onboarding, and get the same job done
  against *their* context — no Jai-specific hardcoding.
- `source-to-focus-state` can ingest a different curriculum/source into `course-modules.json`
  so the spine isn't locked to this one course.

### 3. Runs in Codex, opencode, and Claude Code

- Skills are plain `SKILL.md` (portable). Confirm discovery + invocation in each harness.
- The bridge (`npm run dev` + `/api`) is harness-agnostic; only skill discovery differs.
- Document the per-harness launch in the README.

## Dogfooding the whole curriculum again (rough loop)

1. **Re-watch by doing.** Open the console; each module card is the lesson distilled to
   decisions + one apprentice action. Walk Subtract → Add → Multiply in order.
2. **Subtract** (phone, environment): mark current reality; Codex drafts the notification
   audit + environment punch list. Apply the 10-minute changes.
3. **Add** (clarity, prioritization, time, execution):
   - Clarity → Codex writes the goal event to your calendar (approve).
   - Prioritization → Codex runs "what is stopping me?" and names the one bottleneck.
   - Time → dump open loops in the Loops step; Codex schedules them as blocks (approve).
   - Execution → hand Codex the stuck task; it returns first-step + reframe.
4. **Multiply** (routines, next-level): Codex drafts a minimal morning/evening routine and
   protected blocks; you approve them into the calendar. Mark setup complete (celebrate).
5. **Repeat the loop weekly** via `weekly-learning-loop`: what broke, one repair bet, one
   recurring friction to turn into a new skill. Each pass re-grounds you in the curriculum.

## Out of scope for v1

- Remote MCP / teach.chaiwithjai.com sync (local files stay authoritative).
- Multi-user accounts / hosting. This is local-first, single-machine.
