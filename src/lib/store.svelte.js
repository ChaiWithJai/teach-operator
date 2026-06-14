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
    decisions: [
      { key: "home_screen", q: "Home screen is…", options: ["calendar_widget", "mixed", "cluttered_apps"], good: "calendar_widget" },
      { key: "notifications", q: "Notifications are…", options: ["near_zero", "some", "everything_on"], good: "near_zero" },
      { key: "impulse_apps", q: "Impulse apps (social) are…", options: ["buried_or_deleted", "one_swipe", "on_home"], good: "buried_or_deleted" }],
    apprentice: "Draft a per-app notification audit + a 10-minute home-screen layout." },
  { id: "environment", phase: "Subtract", title: "Environment Setup",
    objective: "Arrange the space so the right thing is the path of least resistance.",
    concepts: ["Environment is the precursor to execution; physical cues determine behavior.", "A persistent calendar + to-do surface offloads time-blindness and memory."],
    decisions: [
      { key: "desk", q: "Desk / chair are…", options: ["solid_comfortable", "okay", "flimsy_avoided"], good: "solid_comfortable" },
      { key: "always_visible_system", q: "Calendar / to-do are…", options: ["always_visible", "sometimes", "buried"], good: "always_visible" },
      { key: "goal_in_face", q: "Your goal is…", options: ["posted_visible", "in_my_head", "nowhere"], good: "posted_visible" }],
    apprentice: "Draft a one-page environment punch list (desk, always-on system, goal placement, triggers)." },
  { id: "clarity", phase: "Add", title: "Clarity",
    objective: "Pick one trusted system and one in-your-face short-term goal.",
    concepts: ["Trust requires ONE all-encompassing system; scattered tools can't be trusted.", "ADHD is a problem of WHEN and WHERE — tasks must live in a calendar.", "Short-term goals beat distant ones for dopamine and momentum."],
    decisions: [
      { key: "system", q: "Your system is…", options: ["one_trusted", "scattered", "none"], good: "one_trusted" },
      { key: "goal_horizon", q: "Your active goal is…", options: ["short_term_3mo", "long_term_vague", "undefined"], good: "short_term_3mo" }],
    apprentice: "Help phrase one short-term goal and where it will live so it's unmissable." },
  { id: "prioritization", phase: "Add", title: "Prioritization",
    objective: "Always know what's next by naming the single bottleneck.",
    concepts: ["The algorithm: ask 'what is stopping me?' and attack only that.", "Relentless focus on one bottleneck beats spreading thin."],
    decisions: [
      { key: "bottleneck_named", q: "Your #1 bottleneck is…", options: ["named_clearly", "fuzzy", "unknown"], good: "named_clearly" }],
    apprentice: "Run 'what is stopping me?' on your goal and propose the single bottleneck to attack." },
  { id: "time", phase: "Add", title: "Time",
    objective: "Apply do-it-now-or-schedule-it (opt-out) to every task.",
    concepts: ["Opt-out, not opt-in: do it now or schedule a when — never leave it floating.", "Scheduling closes the loop and frees working memory."],
    decisions: [
      { key: "tasks_have_when", q: "Your tasks…", options: ["all_have_a_when", "some", "float_indefinitely"], good: "all_have_a_when" },
      { key: "two_lists", q: "Opt-out + scheduled split is…", options: ["set_up", "partial", "not_set_up"], good: "set_up" }],
    apprentice: "Sort my open loops into do-now vs proposed scheduled time blocks." },
  { id: "execution", phase: "Add", title: "Execution",
    objective: "Start on demand: first step, ownership, sell yourself, self-love.",
    concepts: ["Think only of the FIRST step (a pebble, not a boulder) to summon dopamine.", "Reframe 'have to' → 'get to'. Never beat yourself up — blame the system, stay curious."],
    decisions: [
      { key: "first_step_habit", q: "You think in…", options: ["first_steps", "mixed", "whole_projects"], good: "first_steps" },
      { key: "self_talk", q: "On a bad day you…", options: ["blame_the_system", "mixed", "beat_yourself_up"], good: "blame_the_system" }],
    apprentice: "Rewrite my stuck task as a first-step + ownership reframe + the immediate benefit." },
  { id: "routines", phase: "Multiply", title: "Routines",
    objective: "Minimal morning/evening structure that's fun and stick-to-able.",
    concepts: ["The morning begins in the evening.", "Start with an easy, likable first step; consistency over perfection (4–5/7 is a win).", "Protect 'my time' blocks nobody can schedule."],
    decisions: [
      { key: "evening_routine", q: "Evening routine is…", options: ["simple_set", "too_complex", "none"], good: "simple_set" },
      { key: "protected_blocks", q: "Morning/evening 'my time' is…", options: ["protected", "interruptible", "none"], good: "protected" }],
    apprentice: "Draft a minimal morning + evening routine (easy first step, protected window, one needle-mover)." },
  { id: "next_level", phase: "Multiply", title: "Next Level",
    objective: "Lock the win and turn recurring friction into reusable systems.",
    concepts: ["ADHD thrives on positive reinforcement — celebrate finishing to build momentum.", "Recurring friction is a signal to build a reusable system (or Codex skill)."],
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
  requested_codex_action: { skill: "adhd-copilot-onboarding", output: "setup_plan" },
  retention: { write_local_memory: false, sync_to_teach_api: false },
});

export const ui = $state({ stepIndex: 0, tier: "paste", drafts: {}, toast: "" });

export function hydrate(loaded) {
  if (!loaded || typeof loaded !== "object") return;
  // Merge server state without dropping reactivity of the root object.
  for (const k of Object.keys(loaded)) model[k] = loaded[k];
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
