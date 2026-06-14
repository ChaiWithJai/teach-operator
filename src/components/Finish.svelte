<script>
  import { ui, MODULES, clearedCount, allCleared, focusScore, maxScore, moduleGrade, checklistCleared, checklistTotal, routineStreak, routineWeekCount, shareCardSvg, flash } from "../lib/store.svelte.js";
  let { go, ask, copyHandoff, tier } = $props();

  const cleared = $derived(clearedCount());
  const score = $derived(focusScore());
  const max = $derived(maxScore());
  const won = $derived(allCleared());
  const applied = $derived(checklistCleared());
  const applyTotal = $derived(checklistTotal());
  const streak = $derived(routineStreak());
  const weekCount = $derived(routineWeekCount());
  const label = (g) => (g === "gold" ? "Gold star" : g === "pass" ? "Cleared" : "Not yet");

  function downloadReportCard() {
    const blob = new Blob([shareCardSvg()], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "adhd-copilot-hyperfocus-report-card.svg";
    a.click();
    URL.revokeObjectURL(url);
    flash("Report card downloaded");
  }
</script>

<div class="card">
  <span class="eyebrow">Hand off · report card</span>
  <h2>{won ? "You finished. That counts." : "Send it to Codex"}</h2>
  <p class="obj">
    {#if won}
      You started something and finished it — that makes you a starter and a finisher. ADHD
      thrives on positive reinforcement, so take the win. Now let Codex make it real.
    {:else}
      You've cleared {cleared}/{MODULES.length}. Hand off what you have — or jump back to a
      ☆ module to bank more focus points first.
    {/if}
  </p>

  <div class="report">
    {#each MODULES as m (m.id)}
      {@const g = moduleGrade(m)}
      <button class="row" class:done={g} onclick={() => go(MODULES.indexOf(m) + 1)}>
        <span class="star {g || 'none'}">{g ? "★" : "☆"}</span>
        <span class="name">{m.title}</span>
        <span class="grade {g || 'none'}">{label(g)}</span>
      </button>
    {/each}
  </div>

  <div class="tally">
    <span>Focus points</span>
    <b>{score}<i>/{max}</i></b>
  </div>

  <div class="share-card" aria-label="Shareable Hyperfocus report card preview">
    <div>
      <span class="share-kicker">Hyperfocus Report Card</span>
      <strong>{score}/{max}</strong>
      <p>{cleared}/8 modules · {applied}/{applyTotal} actions · {streak} day streak · {weekCount}/7 routine days</p>
    </div>
    <button class="btn" onclick={downloadReportCard}>Download share card</button>
  </div>

  <div class="apprentice">
    <span class="lbl">What Codex will do</span>
    <p>Read your goal, bottleneck, module choices, and open loops; produce a bounded setup plan + first-24-hours brief in the channel on the right. You approve before anything touches your calendar, files, or phone.</p>
    {#if tier === "live"}
      <button class="btn pine" onclick={() => ask({ type: "setup_plan" })}>Build my setup plan</button>
    {:else}
      <button class="btn" onclick={copyHandoff}>Copy handoff for Codex</button>
    {/if}
  </div>

  <div class="nav">
    <button class="btn" onclick={() => go(ui.stepIndex - 1)}>← Back</button>
    <button class="btn primary" disabled>Done</button>
  </div>
</div>

<style>
  .report { display: grid; gap: 4px; margin: 4px 0 16px; }
  .row { display: grid; grid-template-columns: 26px 1fr auto; align-items: center; gap: 10px;
    background: var(--cream); border: 1px solid var(--line); border-radius: 10px; padding: 9px 12px;
    cursor: pointer; text-align: left; font: inherit; transition: background .12s; }
  .row:hover { background: var(--oat); }
  .row .star { font-size: 18px; line-height: 1; }
  .row .star.gold { color: #d9a441; }
  .row .star.pass { color: var(--olive); }
  .row .star.none { color: var(--line); }
  .row .name { font-weight: 600; font-size: 14px; color: var(--walnut); }
  .row .grade { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: var(--charcoal-soft); }
  .row .grade.gold { color: #b9831f; }
  .row .grade.pass { color: var(--olive); }
  .tally { display: flex; align-items: baseline; justify-content: space-between; padding: 10px 14px;
    background: rgba(217,164,65,.12); border: 1px solid rgba(217,164,65,.35); border-radius: 12px; margin-bottom: 4px; }
  .tally span { font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--charcoal-soft); }
  .tally b { font-family: var(--mono); font-size: 20px; color: var(--terracotta); }
  .tally b i { font-style: normal; font-size: 13px; color: var(--charcoal-soft); }
  .share-card {
    margin: 12px 0 4px;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid rgba(151,69,41,.25);
    background: linear-gradient(135deg, rgba(151,69,41,.13), rgba(217,164,65,.13));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
  }
  .share-kicker {
    display: block;
    color: var(--terracotta);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .share-card strong {
    display: block;
    font-family: var(--display);
    font-size: 34px;
    line-height: 1;
    margin-top: 5px;
    color: var(--walnut);
  }
  .share-card p { margin: 6px 0 0; color: var(--charcoal-soft); font-size: 13px; }
</style>
