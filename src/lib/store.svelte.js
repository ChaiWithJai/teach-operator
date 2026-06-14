// Reactive state (Svelte 5 runes) + the course spine + small helpers.
// The UI is deterministic compiled code; Codex is the apprentice that reacts to
// what the user captures here.

export const PHASES = { Subtract: "Remove friction", Add: "Build the system", Multiply: "Make it stick" };

// Compact course data, derived from state/course-modules.json (the canonical
// instructional-design artifact). Kept embedded so the app is self-contained.
export const MODULES = [
  { id: "phone", phase: "Subtract", title: "Phone Setup",
    objective: "Re-engineer the phone so the first thing you see drives focus, not distraction.",
    concepts: ["You're driven by external cues — the first thing on your home screen dictates the next behavior.", "Friction is a lever: make good defaults easy and impulse apps hard to reach."],
    checklist: [
      "Put a calendar widget on the first home screen",
      "Move or delete impulse apps from the home screen",
      "Audit notifications app-by-app and keep only true urgent channels",
      "Add friction before feeds: folders, extra pages, or app blockers"
    ],
    decisions: [
      { key: "home_screen", q: "Home screen is…", options: ["calendar_widget", "mixed", "cluttered_apps"], good: "calendar_widget" },
      { key: "notifications", q: "Notifications are…", options: ["near_zero", "some", "everything_on"], good: "near_zero" },
      { key: "impulse_apps", q: "Impulse apps (social) are…", options: ["buried_or_deleted", "one_swipe", "on_home"], good: "buried_or_deleted" }],
    apprentice: "Draft a per-app notification audit + a 10-minute home-screen layout." },
  { id: "environment", phase: "Subtract", title: "Environment Setup",
    objective: "Arrange the space so the right thing is the path of least resistance.",
    concepts: ["Environment is the precursor to execution; physical cues determine behavior.", "A persistent calendar + to-do surface offloads time-blindness and memory."],
    checklist: [
      "Make the desk and chair comfortable enough that you do not avoid them",
      "Keep calendar and tasks visible on a second screen or pinned startup surface",
      "Place the active goal somewhere you cannot miss",
      "Create one-press triggers for the main work surface"
    ],
    decisions: [
      { key: "desk", q: "Desk / chair are…", options: ["solid_comfortable", "okay", "flimsy_avoided"], good: "solid_comfortable" },
      { key: "always_visible_system", q: "Calendar / to-do are…", options: ["always_visible", "sometimes", "buried"], good: "always_visible" },
      { key: "goal_in_face", q: "Your goal is…", options: ["posted_visible", "in_my_head", "nowhere"], good: "posted_visible" }],
    apprentice: "Draft a one-page environment punch list (desk, always-on system, goal placement, triggers)." },
  { id: "clarity", phase: "Add", title: "Clarity",
    objective: "Pick one trusted system and one in-your-face short-term goal.",
    concepts: ["Trust requires ONE all-encompassing system; scattered tools can't be trusted.", "ADHD is a problem of WHEN and WHERE — tasks must live in a calendar.", "Short-term goals beat distant ones for dopamine and momentum."],
    checklist: [
      "Choose one trusted system for calendar plus tasks",
      "Write one short-term goal, ideally three months or less",
      "Put the goal in the calendar as a visible all-day or multi-day event",
      "If the goal is fuzzy, write what you do not want first"
    ],
    decisions: [
      { key: "system", q: "Your system is…", options: ["one_trusted", "scattered", "none"], good: "one_trusted" },
      { key: "goal_horizon", q: "Your active goal is…", options: ["short_term_3mo", "long_term_vague", "undefined"], good: "short_term_3mo" }],
    apprentice: "Help phrase one short-term goal and where it will live so it's unmissable." },
  { id: "prioritization", phase: "Add", title: "Prioritization",
    objective: "Always know what's next by naming the single bottleneck.",
    concepts: ["The algorithm: ask 'what is stopping me?' and attack only that.", "Relentless focus on one bottleneck beats spreading thin."],
    checklist: [
      "State the current goal",
      "Ask what is stopping it",
      "List missing assets, skills, decisions, people, constraints, or proof",
      "Pick the single bottleneck that most moves the goal"
    ],
    decisions: [
      { key: "bottleneck_named", q: "Your #1 bottleneck is…", options: ["named_clearly", "fuzzy", "unknown"], good: "named_clearly" }],
    apprentice: "Run 'what is stopping me?' on your goal and propose the single bottleneck to attack." },
  { id: "time", phase: "Add", title: "Time",
    objective: "Apply do-it-now-or-schedule-it (opt-out) to every task.",
    concepts: ["Opt-out, not opt-in: do it now or schedule a when — never leave it floating.", "Scheduling closes the loop and frees working memory."],
    checklist: [
      "For every open loop, ask whether it can be done now in under 10 minutes",
      "Schedule anything important that cannot be done now",
      "Give scheduled items a when and where",
      "Keep incoming/open loops separate from scheduled commitments"
    ],
    decisions: [
      { key: "tasks_have_when", q: "Your tasks…", options: ["all_have_a_when", "some", "float_indefinitely"], good: "all_have_a_when" },
      { key: "two_lists", q: "Opt-out + scheduled split is…", options: ["set_up", "partial", "not_set_up"], good: "set_up" }],
    apprentice: "Sort my open loops into do-now vs proposed scheduled time blocks." },
  { id: "execution", phase: "Add", title: "Execution",
    objective: "Start on demand: first step, ownership, sell yourself, self-love.",
    concepts: ["Think only of the FIRST step (a pebble, not a boulder) to summon dopamine.", "Reframe 'have to' → 'get to'. Never beat yourself up — blame the system, stay curious."],
    checklist: [
      "Shrink the active task to the smallest physical or digital first step",
      "Rewrite have-to language as choice or ownership",
      "Name the immediate benefit of doing the task",
      "Write the recovery line for a miss: diagnose the system, do not self-attack"
    ],
    decisions: [
      { key: "first_step_habit", q: "You think in…", options: ["first_steps", "mixed", "whole_projects"], good: "first_steps" },
      { key: "self_talk", q: "On a bad day you…", options: ["blame_the_system", "mixed", "beat_yourself_up"], good: "blame_the_system" }],
    apprentice: "Rewrite my stuck task as a first-step + ownership reframe + the immediate benefit." },
  { id: "routines", phase: "Multiply", title: "Routines",
    objective: "Minimal morning/evening structure that's fun and stick-to-able.",
    concepts: ["The morning begins in the evening.", "Start with an easy, likable first step; consistency over perfection (4–5/7 is a win).", "Protect 'my time' blocks nobody can schedule."],
    checklist: [
      "Draft an evening routine that sets up tomorrow",
      "Draft a morning routine that starts with an easy, likable step",
      "Protect morning and evening blocks on the calendar",
      "Pick tomorrow's one needle-mover the night before"
    ],
    decisions: [
      { key: "evening_routine", q: "Evening routine is…", options: ["simple_set", "too_complex", "none"], good: "simple_set" },
      { key: "protected_blocks", q: "Morning/evening 'my time' is…", options: ["protected", "interruptible", "none"], good: "protected" }],
    apprentice: "Draft a minimal morning + evening routine (easy first step, protected window, one needle-mover)." },
  { id: "next_level", phase: "Multiply", title: "Next Level",
    objective: "Lock the win and turn recurring friction into reusable systems.",
    concepts: ["ADHD thrives on positive reinforcement — celebrate finishing to build momentum.", "Recurring friction is a signal to build a reusable system (or Codex skill)."],
    checklist: [
      "Mark the setup as complete",
      "Celebrate the win before adding another demand",
      "Name one repeated breakdown",
      "Turn that breakdown into a Codex skill, checklist, or automation"
    ],
    decisions: [
      { key: "completion_marked", q: "Setup completion is…", options: ["celebrated", "ignored"], good: "celebrated" }],
    apprentice: "Summarize what's in place, celebrate it, and propose one breakdown to turn into a reusable skill." },
];

export const STEPS = [
  { id: "profile", phase: "Start", title: "You" },
  ...MODULES.map((m) => ({ id: m.id, phase: m.phase, title: m.title, module: m })),
  { id: "loops", phase: "Now", title: "Open Loops" },
  { id: "finish", phase: "Now", title: "Hand Off" },
];

// Named `model` (not `state`) on purpose: a store named `state` collides with the
// Svelte `$state` rune (`$state` would be read as a store auto-subscription).
export const model = $state({
  kind: "adhd_copilot_handoff",
  version: "0.2.0",
  user_profile: { adhd_relationship: "suspicious", working_style: ["founder"], support_preference: "direct" },
  current_state: { mode: "planning", goal: "", bottleneck: "", energy: 6, urgency: 6 },
  modules: {},
  open_loops: [],
  adherence: { routine_days: [], routine_marks: {}, last_checkin: "", streak: 0 },
  requested_codex_action: { skill: "adhd-copilot-onboarding", output: "setup_plan" },
  retention: { write_local_memory: false, sync_to_teach_api: false },
});

export const ui = $state({ stepIndex: 0, tier: "paste", drafts: {}, toast: "" });

export function hydrate(loaded) {
  if (!loaded || typeof loaded !== "object") return;
  // Merge server state without dropping reactivity of the root object.
  for (const k of Object.keys(loaded)) model[k] = loaded[k];
  if (!model.adherence) model.adherence = { routine_days: [], routine_marks: {}, last_checkin: "", streak: 0 };
  if (!model.adherence.routine_marks) model.adherence.routine_marks = {};
  if (!model.adherence.routine_days) model.adherence.routine_days = [];
}

export function moduleDone(m) {
  const saved = model.modules[m.id]?.decisions || {};
  return m.decisions.every((d) => saved[d.key]);
}

export function stepDone(step) {
  if (step.module) return moduleDone(step.module);
  if (step.id === "profile") return !!model.current_state.goal.trim();
  if (step.id === "loops") return true;
  return false;
}

export function setDecision(moduleId, key, value) {
  if (!model.modules[moduleId]) model.modules[moduleId] = { decisions: {} };
  model.modules[moduleId].decisions[key] = value;
}

export function setChecklist(moduleId, index, value) {
  if (!model.modules[moduleId]) model.modules[moduleId] = { decisions: {} };
  if (!model.modules[moduleId].checklist) model.modules[moduleId].checklist = {};
  model.modules[moduleId].checklist[index] = value;
}

export function checklistDone(m) {
  const saved = model.modules[m.id]?.checklist || {};
  return (m.checklist || []).filter((_, i) => saved[i]).length;
}

export function checklistTotal() {
  return MODULES.reduce((total, m) => total + (m.checklist?.length || 0), 0);
}

export function checklistCleared() {
  return MODULES.reduce((total, m) => total + checklistDone(m), 0);
}

// ── Game layer ──────────────────────────────────────────────────────────────
// The course preaches dopamine + gamification + celebrating completion, so the
// console scores itself: a gold star per cleared module, focus points per answer
// (bonus for the course-aligned "good" answer), acts that complete together.

export const ACTS = ["Subtract", "Add", "Multiply"];

export function clearedCount() {
  return MODULES.filter(moduleDone).length;
}

export function allCleared() {
  return MODULES.every(moduleDone);
}

export function actModules(phase) {
  return MODULES.filter((m) => m.phase === phase);
}

export function actCleared(phase) {
  const ms = actModules(phase);
  return ms.length > 0 && ms.every(moduleDone);
}

export function focusScore() {
  let pts = 0;
  for (const m of MODULES) {
    const saved = model.modules[m.id]?.decisions || {};
    for (const d of m.decisions) {
      if (saved[d.key]) pts += saved[d.key] === d.good ? 2 : 1;
    }
  }
  return pts;
}

export function maxScore() {
  let t = 0;
  for (const m of MODULES) t += m.decisions.length * 2;
  return t;
}

export function moduleGrade(m) {
  // null = not cleared; "gold" = all course-aligned; "pass" = cleared with off-book answers.
  if (!moduleDone(m)) return null;
  const saved = model.modules[m.id].decisions;
  return m.decisions.every((d) => saved[d.key] === d.good) ? "gold" : "pass";
}

function ymd(date) {
  return date.toISOString().slice(0, 10);
}

export function todayKey() {
  return ymd(new Date());
}

export function checkedInToday() {
  return routineDayComplete(todayKey());
}

export function routineMarks(day = todayKey()) {
  return model.adherence.routine_marks[day] || { morning: false, evening: false };
}

export function routineDayComplete(day = todayKey()) {
  const marks = routineMarks(day);
  return !!(marks.morning && marks.evening);
}

export function toggleRoutineMark(kind) {
  const today = todayKey();
  const marks = { ...routineMarks(today), [kind]: !routineMarks(today)[kind] };
  model.adherence.routine_marks[today] = marks;
  const days = new Set(model.adherence.routine_days);
  if (marks.morning || marks.evening) days.add(today);
  else days.delete(today);
  model.adherence.routine_days = Array.from(days).sort();
  model.adherence.last_checkin = marks.morning || marks.evening ? today : "";
  model.adherence.streak = routineStreak();
}

export function routineStreak() {
  let cursor = new Date();
  let streak = 0;
  while (routineDayComplete(ymd(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function routineWeekCount() {
  let count = 0;
  const cursor = new Date();
  for (let i = 0; i < 7; i += 1) {
    if (routineDayComplete(ymd(cursor))) count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

export function shareCardSvg() {
  const score = focusScore();
  const max = maxScore();
  const cleared = clearedCount();
  const checklist = checklistTotal() ? `${checklistCleared()}/${checklistTotal()}` : "0/0";
  const streak = routineStreak();
  const week = routineWeekCount();
  const goal = (model.current_state.goal || "Building my focus system").replace(/[<&>]/g, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f4ede1"/>
  <rect x="64" y="58" width="1072" height="514" rx="34" fill="#fbf5ea" stroke="#d9ccb2" stroke-width="3"/>
  <text x="104" y="128" fill="#974529" font-family="Georgia, serif" font-size="34" font-style="italic">ADHD Copilot</text>
  <text x="104" y="196" fill="#3b2a1e" font-family="Arial, sans-serif" font-size="58" font-weight="700">Hyperfocus Report Card</text>
  <text x="104" y="252" fill="#5c544a" font-family="Arial, sans-serif" font-size="28">${goal.slice(0, 64)}</text>
  <g font-family="Arial, sans-serif" font-weight="700">
    <text x="120" y="370" fill="#974529" font-size="74">${score}/${max}</text>
    <text x="120" y="416" fill="#5c544a" font-size="24">focus points</text>
    <text x="430" y="370" fill="#566630" font-size="74">${cleared}/8</text>
    <text x="430" y="416" fill="#5c544a" font-size="24">modules cleared</text>
    <text x="710" y="370" fill="#d9a441" font-size="74">${checklist}</text>
    <text x="710" y="416" fill="#5c544a" font-size="24">actions applied</text>
    <text x="990" y="370" fill="#3b2a1e" font-size="74">${streak}</text>
    <text x="990" y="416" fill="#5c544a" font-size="24">day streak</text>
  </g>
  <text x="104" y="486" fill="#3b2a1e" font-family="Arial, sans-serif" font-size="28" font-weight="700">Starter. Finisher. ${week}/7 routine days this week.</text>
  <text x="104" y="532" fill="#5c544a" font-family="Arial, sans-serif" font-size="24">Local-first. Drafts only. Built with Codex.</text>
</svg>`;
}

export function handoffMessage() {
  return (
    "Use ADHD Copilot. Consume this local-first handoff packet, draft the setup plan, " +
    "and ask before changing any file, task, calendar, email, or device.\n\n```json\n" +
    JSON.stringify(model, null, 2) +
    "\n```"
  );
}

let toastTimer;
export function flash(msg) {
  ui.toast = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (ui.toast = ""), 2200);
}
