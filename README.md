# ADHD Copilot

ADHD Copilot is a Codex plugin for people who suspect ADHD, were diagnosed late, or have a founder/high-agency brain that works better with external structure.

It is not a diagnosis or treatment tool. It is a local-first personal control plane for working with AI: capture what is in your head, make the next action visible, schedule what belongs in time, and turn recurring friction into reusable Codex skills.

## Promise

Use Codex as an ADHD-aware copilot that helps you:

- understand your current goal and bottleneck
- triage open loops into do now, schedule, delegate, or park
- set up phone, computer, calendar, tasks, and workspace rules
- create daily focus briefs and weekly repair loops
- keep local continuity memory without making a web app the source of truth
- discover repeated workflows that should become skills

## Product Shape

The plugin should feel less like a long prompt library and more like a generative UI on top of Codex.

The intended user experience is:

1. A small onboarding control plane asks one decision at a time.
2. Button clicks, chips, sliders, and short fields produce a structured handoff packet.
3. The packet is saved as a local handoff file or inserted into the Codex thread for the user to approve.
4. Codex runs the selected skill against that packet.
5. Outputs stay inspectable: drafts first, external changes only after approval.

See [Generative UI Control Plane](docs/generative-ui-control-plane.md) for the contract.

The control plane is a **Vite + Svelte** app (deterministic compiled UI, not HTML generated
each session). A Vite plugin bridges the browser to a local file store at
`$HOME/.adhd-copilot/`; Codex watches those files and writes drafts back. Nothing leaves the
machine. The handoff is invisible: clicks autosave, "Ask Codex" appends an intent, and the
drafted result appears live in the Codex Channel.

## Included Skills

- `adhd-copilot-console` — launch the control-plane UI and run the apprentice loop (start here).
- `adhd-copilot-onboarding` — turn a handoff packet into the first setup plan (written to `outbox/`).
- `adhd-copilot-handoff` — consume a UI intent / handoff packet and route it to the right workflow.
- `setup-focus-operating-system` — draft phone, computer, calendar, tasks, workspace, and routine rules.
- `daily-personal-action-plan` — create a bounded daily focus brief from calendar/email/docs/thread context.
- `cognitive-offload-capture` — sort messy thoughts and obligations into do now, schedule, delegate, or park.
- `source-to-focus-state` — convert bounded source material into derived focus state without retaining raw private content.
- `thread-to-teach-pack` — turn a Codex thread or project notes into a teachable operating artifact.
- `skill-candidate-extractor` — identify repeated work that should become reusable skills.
- `weekly-learning-loop` — diagnose breakdowns and pick one repair bet for next week.

## Run the control plane

```bash
npm install      # first run only
npm run dev      # serves http://localhost:7890 with the file bridge
```

Open the URL, click through the four steps to hyperfocus, and press **Build my setup plan**.
The data store lives at `$HOME/.adhd-copilot/` (override with `ADHD_COPILOT_DIR`).

Then, in a Codex thread:

```text
Use ADHD Copilot. Launch the console and act as the apprentice on my intents.
```

Codex watches `$HOME/.adhd-copilot/intents.log` and writes drafts to `outbox/`, which the UI
renders live. Drafts first — nothing touches your calendar, files, or devices without approval.

## Install as a Codex plugin

```bash
codex plugin marketplace add https://github.com/ChaiWithJai/teach-operator
codex plugin add teach-operator@teach-operator
```

## Guardrails

- Do not diagnose, treat, or make medical claims about ADHD.
- Use bounded source windows.
- Ask before reading sensitive sources.
- Keep personal-private and team-visible artifacts separate.
- Label facts, inferences, and recommendations.
- Draft external changes before execution.
- Treat follow-through as system design, not moral failure.
