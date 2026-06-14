# Automation: Daily Focus Brief

Every weekday morning, draft today's focus brief into `~/.adhd-copilot/outbox/` before the
8:30am deep-work block — the goal's one needle-mover, the protected blocks, 1–3 do-now items,
and one no-shame line. **Drafts only** — never modifies the calendar or sends email.

This closes the course's loop automatically: the system reminds you what to do, in time.

## Tier 1 — in-session (active now)

A recurring job runs at **8:12am on weekdays** while a Claude Code session is open and idle.
Session-scoped; re-create it each session, or use Tier 2 for always-on.

```
weekday 8:12am → daily-personal-action-plan → ~/.adhd-copilot/outbox/daily-brief-<date>.md
```

Cancel: ask Claude to delete the cron job, or just end the session.

## Tier 2 — always-on (macOS launchd)

Runs headless even when no session is open. Save as
`~/Library/LaunchAgents/com.adhd-copilot.daily-brief.plist`, then
`launchctl load ~/Library/LaunchAgents/com.adhd-copilot.daily-brief.plist`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.adhd-copilot.daily-brief</string>
  <key>StartCalendarInterval</key>
  <array>
    <dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>12</integer><key>Weekday</key><integer>1</integer></dict>
    <dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>12</integer><key>Weekday</key><integer>2</integer></dict>
    <dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>12</integer><key>Weekday</key><integer>3</integer></dict>
    <dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>12</integer><key>Weekday</key><integer>4</integer></dict>
    <dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>12</integer><key>Weekday</key><integer>5</integer></dict>
  </array>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string>
    <string>-lc</string>
    <string>cd ~/projects/teach-operator &amp;&amp; claude -p "ADHD Copilot daily automation (drafts only — never modify calendar or send email). Use daily-personal-action-plan: read today's Google Calendar and urgent email, draft today's focus brief into ~/.adhd-copilot/outbox/daily-brief-$(date +%%F).md — today's one needle-mover toward the active goal, protected blocks, 1-3 do-now items, one no-shame line."</string>
  </array>
  <key>StandardOutPath</key><string>/tmp/adhd-copilot-brief.log</string>
  <key>StandardErrorPath</key><string>/tmp/adhd-copilot-brief.err</string>
</dict>
</plist>
```

> Note: headless runs need the Google Calendar/Gmail connections available to the harness.
> If a connection isn't present, the brief still drafts from local `state.json` context.

## Tier 3 — cloud routine

For always-on without a local machine, promote to a cloud routine with `/schedule` (Claude
Code) — same prompt, runs server-side on cron.

## Weekly repair loop (companion)

Sunday evening: run `weekly-learning-loop` to draft the week's repair bet into the outbox.
Same pattern — swap the skill and use `0 19 * * 0`.
